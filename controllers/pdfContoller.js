const { PDFDocument, PDFDocumentFactory } = require("pdf-lib");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PDF = require("../models/psfModel");
const User = require('../models/userModel')
const HttpError = require("../models/errorModel");
const path = require("path");

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//process and upload pdf to cloud route
//the pdf is uploaded to clous only if user is logedin
const uploadPdf = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const pdfFile = req.file;

    if (!pdfFile) {
      return next(new HttpError("PDF file is required"));
    }

    if(!req.body.pageNumbers){
      return next(new HttpError("please select atleast one page",422))
    }

    const pageNumberString = req.body.pageNumbers;
    const pageNumbers = pageNumberString.split(",").map(Number);

    const originalPdfBytes = pdfFile.buffer;

    const originalPdfDoc = await PDFDocument.load(originalPdfBytes);

    //extracting pages from origianal pdf and creating a newpdf
    const newPdfDoc = await PDFDocument.create();
    try {
      const copiedPages = await newPdfDoc.copyPages(
        originalPdfDoc,
        pageNumbers
      );
      for (const page of copiedPages) {
        newPdfDoc.addPage(page);
      }
    } catch (error) {
      console.error(error);
      return next(new HttpError("failed to copy page", 500));
    }

    const newPdfBytes = await newPdfDoc.save();

    //save processed pdf locally
    const uploadDirectory = path.join(__dirname, "..", "uploads");
    const processedFileName = pdfFile.originalname.replace(
      ".pdf",
      "_processed.pdf"
    );
    const localFilePath = path.join(uploadDirectory, processedFileName);
    fs.writeFileSync(localFilePath, newPdfBytes);

    let processedFileUrl;

    //if user loggedin then we saev the processed pdf
    if (authToken) {
      const token = authToken.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.jWT_SECRET);
      const userId = decodedToken.id;

      cloudinary.uploader.upload(
        localFilePath,
        { resource_type: "raw" },
        async (error, result) => {
          if (error) {
            console.error("Error uploading PDF:", error);
          } else {

            const newPdf = new PDF({
              name: processedFileName,
              url: result.secure_url,
              owner: userId,
              cloudinaryId:result.public_id,
            });


            await newPdf.save();

            const downloadUrl = result.secure_url;

            res.status(201).json({
              processedFileUrl: downloadUrl,
            });
          }
        }
      );
    } else {
      processedFileUrl = `/uploads/${processedFileName}`;
      res.status(200).json({processedFileUrl: processedFileUrl});
    }
  } catch (error) {
    return next(new HttpError("internal server Error :", error));
  }
};

const userPdfs = async(req,res,next)=>{
    try {
        const {id} = req.params;

        const user = await User.findById(id).select("-password");
        if(!user){
            return next(new HttpError("user not found",422));
        }

        const pdfs = await PDF.find({owner:id});
        if(!pdfs){
            return next(new HttpError("No files found",422));
        }
        res.status(200).json({pdfs});

    } catch (error) {
        return next(new HttpError(error) );
    }
}

const deletePdf = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const pdf = await PDF.findById(id);

        if(!pdf){
            return next(new HttpError("Pdf Not Found",404));
        }
        
        await cloudinary.uploader.destroy(pdf.cloudinaryId);

        await PDF.findByIdAndDelete(id);

        res.status(200).json("pdf fiel deleted")
    } catch (error) {
        return next(new HttpError("internal server Error",500))
    }
}

module.exports = { uploadPdf,userPdfs,deletePdf};
