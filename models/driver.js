const mongoose  = require('mongoose');

const driverSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,ref:'User',
        required: true
    },
    vehichleType:{
        type: String,
        required: true,
        emun:['Bike','Scooter','Car','Cycle']
    },
    vehichleNumber:{
        type: String,
        required: true
    },
    currntLocation:{
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        latitudeDelta:{type:Number,required:true,default:0.0221},
        longitudeDelta:{type:Number,required:true,default:0.0221},
    },
    isAvailable:{
        type:Boolean,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        default:1
    },
    totalDeliveries:{
        type:Number,
        default:0
    },
},{
    timestamps:true
});

module.exports = mongoose.model('Driver', driverSchema);