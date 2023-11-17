const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    UserId: { 
        type: mongoose.Schema.ObjectId,ref:"User",
        required: true 
    },
    ProductId:{
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
    total:{
        type:Number,
        required:true
    }
},{
    timestamps:true,
}
);
module.exports = mongoose.model('Cart',cartSchema)