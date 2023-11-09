const mongoose = require('mongoose')
const restaurantSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    time:{
        type:String ,
        required:true,
    },
    imageUrl:{type:String ,
        required:true,
    },
    foods: { 
        type: Array, 
    },
    pickup: { 
        type: Boolean, 
        required: false,
        default:true
    },
    deliver: { 
        type: Boolean, 
        required: false,
        default:true
    },
    owner: { 
        type: String,
        required: true 
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    code: { 
        type: String,
        required: true 
    },
    logoUrl: {
        type: String, 
        required: false,
        default:"https://i.pinimg.com/736x/b2/54/ea/b254ea1ec256b93c61aecb2aca62e277.jpg"
    },
    rating: { 
        type: Number, 
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    coords:{
        id:{
            type:String,
            required:true
        },
        lattitude:{
            type:Number,
            required:true
        },
        longitude:{
            type:Number,
            required:true,
        },
        lattitudeDelta:{
            type:Number,
            required:true,
            default:0.221
        },
        lattitudeDelta:{
            type:Number,
            required:true,
            default:0.0221
        },
        address:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        }
    }
},
{timestamps:true});
module.exports = mongoose.model('Restaurant',restaurantSchema)