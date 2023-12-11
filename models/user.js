const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true 
    },
    email:{
        type:String ,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    address: { 
        type: String, 
        required: false
    },
    phone: { 
        type: String, 
        required: false
    },
    userType: {
        type: String, 
        required: true,
        default:"Client",
        enum:['Admin','Driver','Client','Vendors']
    },
},
{timestamps:true});
module.exports = mongoose.model('User',UserSchema)