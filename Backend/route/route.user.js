const User=require("../model/user")
const express=require("express")
const UserRouter=express.Router()


UserRouter.get("/",async(req,res)=>{
   
        let data=await User.findAll()
        res.status(200).json({data})
   
})
UserRouter.get("/:id",async(req,res)=>{
    let {id}=req.params
    let data=await User.findOne({where:{id:id}})
        res.status(200).json({data})
})



UserRouter.post("/add",(req,res)=>{
    let data=User.create(req.body)
    res.status(201).json({data})

})

module.exports=UserRouter