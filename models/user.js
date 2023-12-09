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
    uid:{type:String ,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    address: { 
        type: Array, 
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
    Profile: { 
        type: String, 
        required: true,
        default:"https://i.pinimg.com/736x/b2/54/ea/b254ea1ec256b93c61aecb2aca62e277.jpg"
    }



},
{timestamps:true});
module.exports = mongoose.model('User',UserSchema)