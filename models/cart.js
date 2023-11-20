const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.ObjectId,ref:"User",
        required: true 
    },
    productId:{
        type:mongoose.Schema.ObjectId,ref:"Foods",
        required:true
    },
    additives:{
        type:[],
    },
    instruCtions:{
        type:String,
    },
    quantity:{
        type:Number,
        default:1
    },
    totalPrice:{
        type:Number,
        required:true
    }
},{
    timestamps:true,
}
);
module.exports = mongoose.model('Cart',cartSchema)