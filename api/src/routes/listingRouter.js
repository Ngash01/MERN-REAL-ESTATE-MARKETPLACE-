import express from "express"
import { SearchListings, UpdateListing, createListing, deleteListing, getListings, getSingleListing } from "../controller/listingController.js"

const router = express.Router()

router.get('/', (req,res)=>{
    res.status(200).send("This is the listing's home")
})

// create a listing
router.post('/create', createListing)

// get listings
router.get('/get-all/:id', getListings)

// delete listing
router.delete('/delete/:id', deleteListing)

// Update listing
router.put('/update/:id', UpdateListing)

// get a single listing
router.get('/get-one/:id', getSingleListing)

// api search router
router.get("/search", SearchListings)

export default router;


