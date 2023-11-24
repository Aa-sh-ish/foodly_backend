const Order = require('../models/order');

module.exports = {
    placeOrder : async(req,res)=>{
        const order = new Order(req.body);

        try {
            await order.save();
            res.status(200).json({status:true, message:'Order placed successfully'});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    getOrderDetail: async(req,res)=>{
        const orderId = req.params.id

        try {
            const order = await Order.findById(orderId).populate({
                path:'userId',
                select:'name email phone'
            }).populate({
                path:'delivaryaddress',
                select:'addressLine1 city state postalCode'
            }).populate({
                path:'restaurantId',
                select:'name location',
            }).populate({
                path:'driverId',
                select:'name phone'
            });
            if(order){
                return res.status(200).json(order);
            }else{
                return res.status(404).json({status:false, message:'Order Not Found'});
            }
        } catch (error) {
            res.status(500).json({status:true, message:error.message});
        }
    },
    getUserOrder: async(req,res)=>{
        const userId=req.user.id;

        try {
            const orders = await Order.find({userId}).populate({
                path:'userId',
                select:'name email phone'
            }).populate({
                path:'restaurantId',
                select:'name location',
            }).populate({
                path:'driverId',
                select:'name phone'
            });

            if(orders){
                return res.status(200).json(orders);
            }else{
                return res.status(404).json({status:false, message:'Orders not found'})
            }
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    rateOrders: async(req,res)=>{

        const orderId = req.params.id;
        const {rating,feedback}=req.body;

        try {
            const updateOrder = await Order.findByIdAndUpdate(orderId,{rating,feedback},{new:true});

            if(updateOrder){
                return res.status(200).json({status:true, message:"Order Updated Succesfully"});
            }else{
                return res.status(404).json({status:true,message:"Failde to update Order"});
            }
        } catch (error) {
            res.status(500).json({status:true, message:error.message});
        }
    },
    UpateOrderStatus: async(req,res)=>{
        const orderId = req.params.id;
        const {orderStatus}=req.body;

        try {
            const updateOrder = await Order.findByIdAndUpdate(orderId,{orderStatus},{new:true});

            if(updateOrder){
                return res.status(200).json({status:true, message:"Order Satatus Updated Succesfully"});
            }else{
                return res.status(404).json({status:true,message:"Failde to update Order Status"});
            }
        } catch (error) {
            res.status(500).json({status:true, message:error.message});
        }

    },
    updatePaymentStatus: async(req,res)=>{
        const orderId = req.params.id;
        const {paymentStatus}=req.body;

        try {
            const updateOrder = await Order.findByIdAndUpdate(orderId,{paymentStatus},{new:true});

            if(updateOrder){
                return res.status(200).json({status:true, message:`${paymentStatus}`});
            }else{
                return res.status(404).json({status:true,message:"Failde to proceed to payment"});
            }
        } catch (error) {
            res.status(500).json({status:true, message:error.message});
        }
    },
}