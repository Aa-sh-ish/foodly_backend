const mongoose = require('mongoose')
const orderItemSchema = new mongoose.Schema({
    foodId: { 
        type: mongoose.Schema.Types.ObjectId,ref:"Food",
        required: true 
    },
    quantity:{
        type:Number ,
        required:true,
    },
    price:{
        type:Number ,
        required:true,
    },
    additives: { 
        type: [],
    },
    instructions: { 
        type: String,
        default:'...'
    },
});


const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,ref:"User",
        required: true 
    },
    orderItem: { 
        type: [orderItemSchema],
        required: true 
    },
    orderTotal:{
        type:Number,
        required:true,
    },
    deliveryFee:{
        type:Number ,
        required:true,
    },
    grandTotal: { 
        type: Number,
        required: true 
    },
    delivaryaddress: { 
        type: mongoose.Schema.Types.ObjectId,ref:"Address",
        required: true 
    },
    paymentMethod:{
        type:String,
    },
    PaymentStatus: { 
        type: String,
        default:"Pending",
        enum:["pending","Completed","Failed"]
    },
    orderStatus: { 
        type: String,
        default:"Pending",
        enum:["placed","Preparing","Out For Delivary","Deliverd"]
    },
    orderDate:{
        type: Date,
        default:Date.now()
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Restaurant",
        required:true
    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Driver"
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    feedback:{
        type:String
    },
    promocode:{
        type:String
    },
    discountAmount:{
        type:Number
    },
    motes:{
        type:String
    }
});
module.exports = mongoose.model('Order',orderSchema)