const express = require('express');
const cors = require('cors');
const {connect} = require('mongoose');
require("dotenv").config();
const path = require('path');


const userRoutes = require('./routes/userRoutes')
const pdfRoutes = require('./routes/pdfRoutes')

const {notFound,errorHandler} = require('./middleware/errorMiddleware')



const app = express();



app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
    credentials: true,
    origin: "https://pdf-extractor-client.vercel.app",
  })
);




app.use('/user',userRoutes);
app.use("/pdf",pdfRoutes);

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(
    app.listen(5000, () =>
      console.log(`server connected on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));