const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const User = require('../models/user.model.js');
const Listing = require('../models/listing.model.js');

 const test = (req, res) => {
    res.json({
      message: 'Api route is working!',
    });
  };

   const updateUser =async (req,res,next)=>{
    if (req.user.id !== req.params.userId) {
         return next(errorHandler(403, 'You are not allowed to update this user'));
      }
    if (req.body.password){
        if(req.body.password.length <6){
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // username must be checked
    if(req.body.username){
        //check username lenght
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(
              errorHandler(400, 'Username must be between 7 and 20 characters')
            );
          }
          //find user use space contain or not
          if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
          }
          //user doesn't use lowercase
          if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
          }
          //user do not use special for that check
          if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
              errorHandler(400, 'Username can only contain letters and numbers')
            );
          }
    }
    /* -------------------------- */
    try {
        const updatedUser =await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set:{// we need to set this only allow user to update
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password, 
                },
            },{new :true} //new update 
        );
        const { password, ...rest } = updatedUser._doc;//seperate password and rest
        res.status(200).json(rest);
        
    } catch (error) {
        next(error);
    }

};

/* --------------------deleteUser--------------------------- */

 const deleteUser =async (req, res, next) =>{
  if (!req.user && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }

};

/* -------------------------sign Out functionality-------------------------------- */

 const signout = (req, res, next) => {
  try {
    
    res
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

/* --------getUserListing-------------- */
const getUserListings =async (req,res,next) =>{
  if (req.user.id === req.params.id){
    try {
      const listings =await Listing.find({userRef:req.params.id});
      res.status(200).json(listings);
      
    } catch (error) {
      next(error);
    }

  }else{
    return next (errorHandler(401,'You can only view your own listings!'))
  }
}

/* ---getUser if the user is true then show contact */

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, 'User not found!'));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser,
  getUserListings,
  signout,
  deleteUser,
  updateUser,
  test
}