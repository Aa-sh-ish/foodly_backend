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

    getFoodByRestaurant: async(req, res) =>{
        console.log("hello");
        const restaurant=req.params.restaurant;
        console.log("hello");
        try {
            const foods = await Food.find({restaurant:restaurant});
            if(!foods|| foods.length===0){
                res.status(404).json({status:false, message:"No Foods Found"});
            }
             res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },

    deletefoodByID: async(req, res)=>{
        const id = req.params.id;

        try {
            const food = await Food.findById(id);
            if (!food) {
                return res.status(404).json({ status: false, message: "No Food found!" });
            }
            await Food.findByIdAndDelete(id);
            res.status(200).json({ status: true, message: "Food Deleted Successfully!" });
        } catch (error) {
            res.status(500).json({status:false, message:error.message});
        }
    },

    foodAvaliability: async(req,res)=>{
        const foodId = req.params.id;

        try {
            const food =  await Food.findById(foodId);
            if(!food){
                return res.status(404).json({status:false,message:"No Food Found"})
            }
            food.isAvailable =!food.isAvailable;
            await food.save();
            res.status(200).json({status:true,message:"Food Availability Changed"});
        } catch (error) {
            res.status(500).json({status:false, message:error.message});
        }
    },

    updateFoodById : async(req, res)=>{
        const foodId = req.params.id;
        try {
            const updatedFood = await Food.findById(
                foodId,
                req.body,
                {new:true, runValidators : true});
        if(!updatedFood){
            return res.status(404).json({status:false, message:'No Food Found'});
        }
        res.status(200).json({status:true, message:"Food Item Updated Succesfully"});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },

    addFoodTags: async (req,res)=>{
        const foodId=req.params.id;
        const {foodTags}=req.body;

        try {
            const food = await Food.findById(foodId);
            if(!food){
                return res.status(404).json({status:false,message:"No Food Found"});
            }
            if(food.foodTags.includes(foodTags)){
                return res.status(400).json({status:false,message:`${foodTags} is already added to this food`});
            }
            food.foodTags.push(foodTags);
            await food.save();
            res.status(200).json({status:true,message:"Food Tag Added Successfully"})
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    getRandomFoodByCode: async (req,res)=>{
        try {
            const randomFoodItem = await Food.aggregate([
                {$match:{code:req.params.code}},
                {$sample:{size:5}},
                {$project:{_id:0}}
            ]);

            res.status(200).json(randomFoodItem);
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    addFoodType: async (req,res)=>{
        const foodId = req.params.id;

        const foodType = req.params.foodType;
        try {
            const food = await Food.findById(foodId);
            if (!food) {
                return res.status(404).json({ status: false, message: "No Food Found!" });
            }
            if(food.foodType.includes(foodType)){
                return res.status(400).json({status:false,message:`${foodType} is already exist.`})
            }
            food.foodType.push(foodType);
            await Food.save();
            res.status(200).json({status:true,message:"Type Added Succesfully"});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    getRandomFoodByCodeAndCategory: async (req,res)=>{
        const {category , code} = req.params;

        try {
            let food = await Food.aggregate([
                {$match:{code:code, category:category}},
                {$sample:{size:10}},
            ]);
            if(!food|| food.length===0){
                food = await Food.aggregate([
                    {$match:{code:code}},
                    {$sample:{size:10}},
                ]);
            }else{
                food = await Food.aggregate([
                    {$sample:{size:10}},
                ]);
            }
            res.status(200).json(food);

        } catch (error) {
            res.status(500).json({status:false, message:error.message});
        }
    }
}