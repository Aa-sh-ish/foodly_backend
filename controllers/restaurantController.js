const Restaurant = require('../models/restaurant')

module.exports = {
    addRestaurant: async(req,res)=>{

        const newRestaurant = new Restaurant(req.body);

        try {
            await newRestaurant.save()
            res.status(201).json({status:true,message:'Restaurant Succesfully created'});
        } catch (error) {
            res.status(500).json({status:false,message:'Error Creating restaurant',error:error.message})
        }
    },

    serviceAvaibility : async(req,res)=>{
        const restaurantId = req.params.id;
        try {
            const restaurant  = await Restaurant.findById(restaurantId);
            if(!restaurant){
                return res.status(403).json({status:false,message:"Resturant Not Found"})
            }

            restaurant.isAvailable = !restaurant.isAvailable;

            await restaurant.save();
            res.status(200).json({status:true,message:"Availability Succesfully Toggled",isAvailable:restaurant.isAvailable});
        } catch (error) {
            res.status(500).json({message:"Error Toggling Resturant Availability"})
            
        }
    },

    deleteRestaurant: async(req,res)=>{
        const restaurantId = req.params.id;
        try {
            const restaurant  = await Restaurant.findById(restaurantId);
            if(!restaurant){
                return res.status(403).json({status:false,message:"Resturant Not Found"})
            }
            await Restaurant.findByIdAndDelete(restaurantId);
            res.status(200).json({status:true,message:"Restaurant Deleted Succesfully"});

        } catch (error) {
            res.status(500).json({message:"Error Deleting Restaurant"})
        }
    },

    getRestaurant : async(req,res)=>{
        const restaurantId = req.params.id;
        try {
            const restaurant  = await Restaurant.findById(restaurantId);
            if(!restaurant){
                return res.status(403).json({status:false,message:"Resturant Not Found"})
            }
            res.status(200).json({restaurant})
        } catch (error) {
            res.status(500).json({message:"Error Retriving Restutant"})
        }
    },

    getRandomResturants:async(req,res)=>{
        try {
            let randomRestaurant =[];

            if(req.params.code){
                randomRestaurant = await Restaurant.aggregate([
                    {$match:{code:req.params.code}},
                    {$sample: {size:5}},
                    {$project:{__v:0}}

                ])
            }

            if(!randomRestaurant.length){
                randomRestaurant=await Restaurant.aggregate([
                    {$sample: {size:5}},
                    {$project:{__v:0}},
                ]);
            }

            if(randomRestaurant.length){
                res.status(200).json(randomRestaurant)
            }
        } catch (error) {
            res.status(500).json({message:"Error Finding Restutant"})

        }
    },
}
