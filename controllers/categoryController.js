const Category = require('../models/categories');
const { UpdateUser } = require('./userController');

module.exports = {
    createCategory : async(req,res)=>{
        const newCategory = new Category(req.body);
        try {
            await  newCategory.save();
            res.status(200).json({status:true,message:"Category Save Succesfully"});
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    },

    updateCategory: async(req,res)=>{
        const id = req.params.id;
        const {title,value,imageurl} = req.body;
        try {
            const updatedCategory= await Category.findByIdAndUpdate(id,{
                title:title,
                value:value,
                imageurl:imageurl
            },{new:true});
            
            if(!updatedCategory){ 
                return res.status(404).json({message:"No category found"});
            }
            res.status(200).json({status:true, message:"Category Updated"});
        } catch (error) {
            res.status(500).json({status:false, message:error.message});
        }
    },

    deleteCategory:async(req,res)=>{
        const id = req.params.id;
        try {
            const category =await Category.findByIdAndDelete(id);
            if (!category){
                return res.status(404).json({message:"No Category Found"});
            }
            res.status(200).json({status:true, message:"Deletion Successful"});
            } catch (error) {
            res.status(500).json({status:false, message:error.message});}
    },

    getAllCategories :async (req,res)=>{
        try {
            const categories= await Category.find({},{__v:0});
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json({status:true, message: error.message})
        }
    },

    patchCategoryImage: async(req,res)=>{
        const id = req.params.id;
        const imgUrl = req.body.imageUrl;
        try {
            const exstingCategory = await Category.findById(id);
            
            if(!exstingCategory){
                return res.status(403).json({status:false,message:"Category Not Found"})
            }
            exstingCategory.imageUrl = imgUrl;
            await exstingCategory.save();
            res.status(200).json({status:true,message:"Category Image Updated Succesfully"});
        } catch (error) {
            res.status(500).json({status:false, message:error.message});
        }
    },

    getRandomCategories: async(req,res)=>{
        try {
            let categories = await Category.aggregate([
                {$match:{value:{$ne:'more'}}},
                {$sample:{size:7}},
            ]);

            const moreCategory= await Category.findOne({value:"more"});
            console.log(moreCategory)
            if(moreCategory){
                categories.push(moreCategory);
            }
            res.status(200).json(categories);
        } catch (error) {
           res.status(500).json({status:false, message:error.message}); 
        }
    }
}