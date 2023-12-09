const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jwt  = require('jsonwebtoken')
const admin = require('firebase-admin')

module.exports = {
    createUser : async (req,res)=>{
        const user = req.body;
        try {
            await admin.auth().getUserByEmail(user.email);
            res.status(400).json({message:"Email already Registered"})
        } catch (error) {
            if(error.code ==='auth/user-not-found'){
                try {
                    const UserResponse = await admin.auth().createUser({
                        email:user.email,
                        password:user.password,
                        emailVerified:false,
                        disabled:false
                    })

                    const newUser = new User({
                        username : user.username,
                        email: user.email,
                        password: CryptoJS.AES.encrypt(user.password,process.env.SECRET).toString(),
                        uid : UserResponse.uid,
                        userType :user.userType
                    })

                    
                    await newUser.save();
                    res.status(201).json({status:true})
                } catch (error) {
                    res.status(500).json({status:false, error :error.message})
                }
            }
        }
    },

    LoginUser : async(req,res)=>{
        try {
            const user = await User.findOne({email : req.body.email},{_v:0, updatedAt:0,createdAt:0})
            if (!user ) {
                res.status(401).json("Wrong Credentials")
            } 

            const decryptedPassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET)
            const decrypted = decryptedPassword.toString(CryptoJS.enc.Utf8);
            if (decrypted!=req.body.password) {
                res.status(401).json("Wrong Password")
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