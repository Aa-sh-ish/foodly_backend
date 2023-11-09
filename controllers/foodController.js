const Food = require('../models/food')

module.exports={
    addFood: async(req,res) => {
        const newFood = new Food(req.body);
        try {
            await newFood.save();
            res.status(200).json({status:true,message:"Food Added Succesfully"});
        } catch (error) {
            res.status(500).json({status:false,message:"Food Items Not Added"})
        }
    },

    getFoodById :async(req,res)=>{
        const id = req.params.id;
        try {
            const food = await Food.findById(id);
            if(!food){
                return res.status(404).json({status: false , message:'No Food Found'});
            }
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({status:false,message:"Failed to get food Items"});
        }
    },

    
}