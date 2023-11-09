const mongoose = require('mongoose')
const CataegorySchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    value:{
        type:String ,
        required:true,
    },
    imageUrl:{type:String ,
        required:true,
    },
});
module.exports = mongoose.model('Cataegory',CataegorySchema)