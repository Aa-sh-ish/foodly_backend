const Driver = require('../models/driver');

module.exports = {
    registerDriver: async(req,res)=>{
        const driver = new Driver(req.body);
        try {
            await driver.save();
            res.status(200).json({status:true,message:'Driver Registered Succesfully'});
        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    },

    setDriverAvailability: async(req,res)=>{
        const driverId = req.params.id;
        try {
            const driver = await Driver.findById(driverId); 
            if (!driver) {
                return res.status(404).json({status:false, message:'Driver Not found'});
            }
            driver.isAvailable = !driver.isAvailable;
            
            await driver.save();
            res.status(200).json({status:true,message:'Status Updated Succesfully'});

        } catch (error) {
            res.status(500).json({status:false,message:error.message});
        }
    }
}