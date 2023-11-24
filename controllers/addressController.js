const Address = require("../models/address");
module.exports={
    createAddres : async(req,res)=>{
        
        const address = new Address({
            userId: req.user.id,
            addressLine1:req.body.addressLine1,
            city:req.body.city,
            state:req.body.state,
            district:req.body.district,
            postalCode:req.body.postalCode,
            country:req.body.country,
            delivaryInstructions:req.body.delivaryInstructions,
            default:req.body.default,
        });
        try {
            if(req.body.default){
                await Address.updateMany({userId:req.user.id},{default:false});
            }

            await address.save();
            res.status(200).json({status:true,message: "Address Added Succesfully"})
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    deleteAddress : async(req,res)=>{
        const addressId = req.params.id;
        try {

            const address = await Address.findById(addressId);
            if(!address){
                return res.status(404).json({status:false,message:"No Address Found"});
            }
            await Address.findByIdAndDelete(addressId);
            res.status(200).json({status:true,message:"Address Deleted Successfuly"});
        } catch (error) {
            res.status(500).json({status:false, message:error.message});
        }
    },

    getDefaultAddress : async(req,res)=>{
        const userId = req.user.id;
        try {
            const defaultAddress = await Address.findOne({userId,default:true});
            res.status(200).json(defaultAddress);

        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    getUserAddresses : async(req,res)=>{
        const userId = req.user.id;
        try {
            const addresses = await Address.find({userId});
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    updateAddress : async(req,res)=>{
        const addressId = req.params.id;
        const address = new Address({
            userId: req.user.id,
            AddressLine1:req.body.AddressLine1,
            city:req.body.city,
            state:req.body.state,
            postalCode:req.body.postalCode,
            country:req.body.country,
            delivaryInstructions:req.body.delivaryInstructions,
            default:req.body.default,
        },{_id:0}
        );

        try {
            if(req.body.default){
                await Address.updateMany({userId:req.user.id},{default:false});
            }
            await Address.findByIdAndUpdate(addressId,address,{new:true});
            res.status(200).json({status:true,message: "Address Updated Succesfully"})
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },
    setDefaultAddess : async(req,res)=>{
        const addressId = req.body.id;
        const userId = req.user.id;
        try {
            await Address.updateMany({userId},{default:false});

            const updateAddress  = Address.findByIdAndUpdate(addressId,{default:false},{new:true});

            if(updateAddress){
                return res.status(200).json({status:true,message:"Successfully Set Default Address"});
            }else{
                return res.status(404).json({status:false,message:"Address Not Found"});
            }
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },



}