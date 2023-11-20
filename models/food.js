const mongoose = require('mongoose')
const FoodSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    foodTags:{
        type:Array,
        required:true,
    },
    foodType:{
        type:Array,
        required:true,
    },
    category:{
        type:String ,
        required:true,
    },
    code:{
        type:String ,
        required:true,
    },
    isAvailable:{
        type:Boolean ,
        required:true,
        default:true
    },
    restaurant :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },
    raatingCount:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    additives:{
        type:Array,
        required:true,
    },
    imageUrl:{
        type:Array ,
        required:true,
    }
});
module.exports = mongoose.model('Foods',FoodSchema)