const express = require('express');
const User = require('../controllers/user.controller.js');
const verifyToken= require('../utils/verifyUser.js');

const router = express.Router();

router.get('/test',User.test);
router.put('/update/:userId',verifyToken, User.updateUser); //put  request to update user info by id
router.delete('/delete/:userId', verifyToken, User.deleteUser);
router.post('/signout', User.signout);
router.get('/listings/:id', verifyToken, User.getUserListings)
router.get('/:id', verifyToken, User.getUser)

module.exports = router;