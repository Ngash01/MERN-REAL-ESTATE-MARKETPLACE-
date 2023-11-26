import Listings from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";


// create Listing
export const createListing = async(req, res)=>{
    try{
        const listing = await Listings.create({
            title: req.body.title,
            description: req.body.description,
            address: req.body.address,
            regularPrice: req.body.regularPrice,
            discountedPrice: req.body.discountedPrice,
            bathrooms: req.body.bathrooms,
            bedrooms: req.body.bedrooms,
            furnished: req.body.furnished,
            parking: req.body.parking,
            type: req.body.type,
            offer: req.body.offer,
            imageUrls: req.body.imageUrls,
            userRef: req.body.userRef
        })
        res.status(200).send({msg: "Listing created successfully!",listing})

    }catch(err){
        res.status(403).send(err)
    }
}


// get all listings
export const getListings = async(req, res)=>{
        try{
            const allListings = await Listings.find({userRef: req.params.id})
            res.status(200).send(allListings)

        }catch(err){
            res.status(403).send(err)
            console.log(err)
        }
    }


// delete Listing
export const deleteListing = async(req, res)=>{
    try{
        const deleted = await Listings.findByIdAndDelete(req.params.id)
        res.status(200).send("Listing deleted successfully!")
    }catch(err){
        res.status(403).send(err)
    }
}


// update Listing
export const UpdateListing = async(req, res)=>{
        try{3
            const newListing = await Listings.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            res.status(200).send(newListing)

        }catch(err){
            console.log(err)
            res.status(403).send(err)
        } 
}

// get a single listing
export const getSingleListing = async(req, res)=>{
     try{
        const listing = await Listings.findById(req.params.id) 
        res.status(200).send(listing)
    }catch(err){
        res.status(403).send(err)
    }
}


// get Searched Listings
export const SearchListings = async(req, res)=>{
    const limit = parseInt(req.query.limit) || 9
    const startIndex = req.query.startIndex || 0

    let offer = req.query.offer
    if(offer === undefined || offer === false){
        offer = {$in: ["false", "true"]}
    }

    let furnished = req.query.furnished
    if(furnished === undefined || furnished === false){
        furnished = {$in: ['false', 'true']}
    }

    let parking = req.query.parking
    if(parking === undefined || parking === false){
        parking = {$in: ["false", "true"]}
    }

    let type = req.query.type
    if(type === undefined || type === "all"){
        type = {$in : ["rent", "sale"]}
    }

    const searchTerm = req.query.searchTerm || ""
    const sort = req.query.sort || "createdAt"
    const order = req.query.order || "desc" 
    
    const searchListings = await Listings.find({
        title: {$regex : searchTerm, $options: "i"},
        offer, 
        parking,
        furnished,
        type
    }).sort({[sort]:order}).limit(limit).skip(startIndex)
    
    res.status(200).json(searchListings)
}






