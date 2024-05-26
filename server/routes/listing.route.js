const express = require('express');
const Property =  require('../controllers/listing.controller.js');
const verifyToken = require('../utils/verifyUser.js');

const router = express.Router();

router.post('/create', verifyToken, Property.createListing);
router.delete('/delete/:id', verifyToken, Property.deleteListing);
router.post('/update/:id', verifyToken, Property.updateListing);
router.get('/get/:id', Property.getListing);
router.get('/get', Property.getListings);


module.exports = router;