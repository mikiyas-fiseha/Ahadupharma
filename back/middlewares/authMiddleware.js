const User=require("../model/userModel")
const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler")

const authMiddleware=asyncHandler(async(req,res,next)=>{
    let token
    if(req?.headers?.authorization?.startsWith("Bearer")){
       token=req.headers.authorization.split(" ")[1]
      try{
        if(token){
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findById(decode?.id)
            req.user=user
         
            
            next()
            
           }
      }catch{
        throw new Error("invalid token or expired,please login again")
      }
      
    }else{
        throw new Error("there is no token attached to header")
    }
})
const isAdmin=asyncHandler(async(req,res,next)=>{
  const {email}=req.user
  const adminUser=await User.findOne({email})

  if(adminUser.role !=="admin"){
    throw new Error(" You are not an admin")
  }else{
    next()
  }
})
module.exports={authMiddleware,isAdmin}