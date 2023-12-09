const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jwt  = require('jsonwebtoken')
module.exports = {
    createUser : async (req,res)=>{
        const user = req.body;
        try {
            await User.findOne(user.email);
            res.status(400).json({message:"Email already Registered"})
        } catch (error) {
                try {
                    const newUser = new User({
                        username : user.username,
                        email: user.email,
                        password: CryptoJS.AES.encrypt(user.password,process.env.SECRET).toString(),
                        userType :user.userType
                    })
                    await newUser.save();
                    res.status(201).json({status:true})
                } catch (error) {
                    res.status(500).json({status:false, error :error.message})
                }
        }
    },

    LoginUser : async(req,res)=>{
        try {
            const user = await User.findOne({email : req.body.email},{_v:0, updatedAt:0,createdAt:0})
            if (!user ) {
               return res.status(401).json({message:"Wrong Credentials"})
            } 

            const decryptedPassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET)
            const decrypted = decryptedPassword.toString(CryptoJS.enc.Utf8);
            if (decrypted!=req.body.password) { 
               return res.status(401).json({message:"Wrong Password"})
            }
            const userToken = jwt.sign({
                id:user.id,
                email:user.email,
                userType:user.userType
            },process.env.JWT_SEC,{expiresIn:'21d'});

            const {password, email,...others} = user._doc;
            res.status(200).json({...others,userToken})
        } catch (error) {
            res.status(500).json({status:false, error :error.message});
        }
    },
}