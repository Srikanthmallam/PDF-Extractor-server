const {model,Schema, default: mongoose} = require('mongoose');

const userSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
});

module.exports = model('User',userSchema)