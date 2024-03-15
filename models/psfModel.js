const {model,Schema, default: mongoose} = require('mongoose');

const pdfSchema = new Schema({
    name:String,
    url:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    cloudinaryId:String,
})

module.exports = model('PDF',pdfSchema);