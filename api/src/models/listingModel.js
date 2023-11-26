import mongoose from "mongoose";

const ListingSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
        require:true
    },
    type:{
        type: String,
        required:true
    },
    offer:{
        type: Boolean,
        required:true
    },
    imageUrls:{
        type:Array,
        required:true,
        default:[]
    },
    userRef:{
        type:String,
        required: true
    }
},
{
    timestamps:true
})


const Listings = mongoose.model("listing", ListingSchema)
export default Listings;