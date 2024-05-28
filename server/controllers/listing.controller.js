const Listing = require('../models/listing.model.js');
const { errorHandler } = require('../utils/error.js');

/* --------Create Listing Properties----------------- */
const createListing = async (req, res, next) => {
    try {
        const newBody = {
            userRef: req.user.id,
            ...req.body
          }  
        console.log(newBody)
        const listing = await Listing.create(newBody);
        return res.status(201).json(listing);

    } catch (error) {
        next(error);
    }

};

/* ------------------deleteListing----------------------- */

const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, "No listing found with that id"));
    }

    if(req.user.id !== listing.userRef){
        return  next(errorHandler(401, "You can only delete your own listings!"))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted')
    } catch (error) {
        next(error)
    }
};

/* ----------UpdateListing or Edit Listing------------------- */
const updateListing = async (req, res, next) => {
    const listing =await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'Listing not found!'));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,'Unauthorized You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id, 
            req.body ,
            {new:true}
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
};


/* -------Get listing ------------- */

const getListing = async (req,res,next) =>{
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return next(errorHandler(404,'Listing not found!'))
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}

/* --------Geting  all the listings by (Search)---------*/

const getListings = async (req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer =req.query.offer;

        if(offer === undefined || offer === 'false')
        {
            offer ={ $in : [false,true]};
        }
        let furnished =req.query.furnished;

        if(furnished === undefined || furnished ==='false'){
            furnished ={ $in : [false,true]};
        }

        let parking =  req.query.parking;

        if(parking ===undefined || parking === 'false'){
            parking ={$in :[false,true]};
        }

        let type =req.query.type;

        if(type ===undefined || type ==='all'){
            type ={$in : ['sale','rent']};
        }

        const SearchTerm =req.query.SearchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name:{$regex :SearchTerm, $options: "i" },
            offer,
            furnished,
            parking,
            type,

        }).sort({[sort]:order}).skip(startIndex).limit(limit);
        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }

}


module.exports = {
    getListings,
    getListing,
    createListing,
    updateListing,
    deleteListing

}

