const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const User = require('../models/user.model.js'); 
const jwt = require('jsonwebtoken');

//It's for signup page 
const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
       // check  if user already exists in the database
      if(!username || !email || !password || username==='' || email ==='' || password===''){
    /* return res.status(400).json({msg:'Please fill out all fields.'}); */
    //added from errorhandler
      next(errorHandler(400,"Please fill out all fields"));
      }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };

  /* ------------************-------------------- */
  /* It's for sign in  */

  const signin =async (req,res,next) => {
    const { email, password } =req.body;
    if(!email || !password || email ==='' || password===''){
      next(errorHandler(400,'All fields are required'));
   }
   try {
    //it will find the valid email and store it 
    const validUser =await User.findOne({email});

    if(!validUser){
      return next(errorHandler(404,'User not found'));
   }
    

    //it will help us to compare the password and then hash the password
    const validPassword =bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(400,'Invalid password'));
    }
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //we dont want to see hash password also in database for that
    const {password:pass, ...rest} =validUser._doc;
    res.status(200).cookie('accress_token',token,{
      httpOnly :true}).json(rest);

    
   } catch (error) {
    next(error);
   }
  }

  //****--------------google  login----------------********//
  const google= async (req,res,next)=>{
    const {email, name, googlePhotoUrl} =req.body;
    try {
       //we need find user exist or not
       const user =await User.findOne({email});
       
       if(user){
        const token =jwt.sign({id : user._id },process.env.JWT_SECRET ) ;
        const {password ,...rest}= user._doc;
        res.status(200).cookie("access_token",token,{
         "httpOnly": true,
      }).json( rest);
       }
       else{
        const generatedPassword =Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
        const hashedPassword =bcryptjs.hashSync(generatedPassword,10);
        const newUser =new User({
          username: name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture:googlePhotoUrl,

       });

       await newUser.save();
       const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET );
       const {password,...rest} =newUser._doc;
       res
             .status(200)
             .cookie('access_token',token, {
               httpOnly:true,
             }).json(rest); //send into  registerd user

       }
      
    } catch (error) {
      next(error);      
    }

  }


module.exports = {
  google,
  signin,
  signup
}