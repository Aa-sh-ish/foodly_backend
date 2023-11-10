const jwt = require('jsonwebtoken');

const verifyTocken =async(req,res,next)=>{
    const authHeaders = req.headers.authorization;
    if(authHeaders){
        const token = authHeaders.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,async(err,user)=>{
            if(err){
               return res.status(403).json({status :false,message:"invalid tocken"})
            }
            req.user = user;
            console.log(user);
            next();
        });

    }
    else{
        return res.status(403).json({status :false,message:"Cant Connect"});

    }
}


const verifyAndAuthorization = async(req,res,next)=>{    
    verifyTocken(req,res,()=>{
        if(req.user.userType==="Client"||
        req.user.userType==="Vendors"||
        req.user.userType==="Admin"||
        req.user.userType==="Driver"){
            console.log("here com");

            next();
        }else{
            res.status(403).json({status:false,message:"You Are Not Authorized and verifed user"})
        }
    })
}

const verifyVendor = (req,res,next)=>{
    verifyTocken(req,res,()=>{
        if(
        req.user.userType==="Vendors"||
        req.user.userType==="Admin"
        ){
            next();
        }else{
            res.status(403).json({status:false,message:"You Are Not Authorized vendor"})
        }
    })
}

const verifyDriver = (req,res,next)=>{
    verifyTocken(req,res,()=>{
        if(
        req.user.userType==="Admin"||
        req.user.userType==="Driver"){
            next();
        }else{
            res.status(403).json({status:false,message:"You Are Not Authorized driver"})
        }
    })
}

const verifyAdmin = (req,res,next)=>{
    verifyTocken(req,res,()=>{
        if(
        req.user.userType==="Admin"){
            next();
        }else{
            res.status(403).json({status:false,message:"You Are Not Authorized admin"})
        }
    })
}

module.exports = {verifyTocken,verifyAndAuthorization,verifyVendor,verifyDriver,verifyAdmin}