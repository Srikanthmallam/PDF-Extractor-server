const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const HttpError = require('../models/errorModel');
const jwt = require("jsonwebtoken");

const register = async(req,res,next) => {
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return next(new HttpError("fill in all the feilds",422))
        }

        const newEmail = email.toLowerCase();


        const emailExits = await User.findOne({email:newEmail});

        if(emailExits){
            return next(new HttpError("Email already Exists",422));
        }

        if((password.trim()).length < 6){
            return next(new HttpError("password should be atleast 6 charecters"))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        const newUser = await User.create({username,email:newEmail,password:hashedPass})

        res.status(201).json(`new user with ${newUser.email} is registered`);
    }catch(error){
        return next(new HttpError("user registration failed ",422));
    }
}

const Login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
    
        if(!email || !password){
            return next(new HttpError('please fill in all the details',422));
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({email:newEmail});

        if(!user){
            return next(new HttpError("Invalid creadentials",422))
        }

        const comparePassword = await bcrypt.compare(password,user.password);
        console.log(comparePassword);
        if(!comparePassword){
            return next(new HttpError("worng Password",422));
        }

        const{_id:id,username} = user

        const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"1d"});


        res.status(200).json({token,id,username});
        
    } catch (error) {
        return next(new HttpError(error));
    }
}

const getUser = async(req,res,next)=>{
    try {
      const { id } = req.params;
      const user = await User.findById(id).select("-password");
      if (!user) {
        return next(new HttpError("user not found", 404));
      }
      res.status(200).json({ user });
    } catch (error) {
      return next(new HttpError(error));
    }
}

module.exports = {register,Login,getUser};