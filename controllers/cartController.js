const Cart  = require('../models/cart');

module.exports={
    addProductToCart: async(req,res)=>{
        const userId = req.user.id;
        const{productId,totalPrice,quantity} = req.body;
        let count;
        try {
            const existingProduct = await Cart.findOne({userId,productId});
            count = await Cart.countDocuments({userId});

            if(existingProduct){
                existingProduct.quantity +=1;
                existingProduct.totalPrice +=totalPrice;
                await existingProduct.save();
            }else{
                const newCart = new Cart({
                    userId:userId,
                    productId:req.body.productId,
                    additives:req.body.additives,
                    instruCtions:req.body.instruCtions,
                    quantity:req.body.quantity,
                    totalPrice:req.body.totalPrice,
                    
                });
                await newCart.save();
                count = await Cart.countDocuments({userId});
            }
            res.status(200).json({status:true,count:count,message:"Product added Succesfully to the Cart"});
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    },

    removeProductFromCart: async(req,res)=>{
        const itemId = req.params.productId
        const userId = req.user.id;
        try {
            const cartItem = await Cart.find({productId:itemId});

            if(!cartItem){
                return res.status(404).json({status:false,message:'No Item To Remove'});
            }
            await Cart.findOneAndDelete({productId:itemId});
            count = await Cart.countDocuments({userId});
            res.status(200).json({status:true,CartCount:count,message:"Product Succesfully Removed Form the Cart"});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },

    fetchUserCart: async(req,res)=>{
        const userId = req.user.id;
        try {
            const userCart = await Cart.find({
                userId:userId
            }).populate({
                path:'productId',
                select:'title  imageUrl restaurant rating raatingCount',
            });
            res.status(200).json({userCart});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },

    clearUserCart: async(req,res)=>{
        const userId = req.user.id;
        try {
            await Cart.deleteMany({userId:userId});
          count = await Cart.countDocuments({userId});
            res.status(200).json({status:true,count:count,message:"Your Cart Has Been Cleared Successfully!"});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },

    getCartCount: async(req,res)=>{
        const userId = req.user.id;
        try {
            count = await Cart.countDocuments({userId});
            res.status(200).json({status:true,CartCount:count});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },

    decrementProductQty: async (req, res) => {
        const productId = req.params.productId;
        const userId = req.user.id;
        console.log(productId, userId);
    
        try {
            const cartItem = await Cart.find({ userId: userId, productId: productId });
    
            if (cartItem.length === 0) {
                return res.status(404).send({ status: false, message: 'No item found in Cart' });
            }
            const productPrice = cartItem[0].totalPrice / cartItem[0].quantity;
            if (cartItem[0].quantity > 1) {
                cartItem[0].quantity -= 1;
                cartItem[0].totalPrice -= productPrice;
                await cartItem[0].save();
                return res.status(200).json({ status: true, message: "Quantity Decreased" });
            } else if (cartItem[0].quantity === 1) {
                await Cart.findOneAndDelete({ userId: userId, productId: productId });
                const count = await Cart.countDocuments({ userId: userId });
                return res.status(200).json({ status: true, cartCount: count, message: "Product Item Removed Successfully" });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
    

}