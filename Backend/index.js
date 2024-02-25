const express=require("express")
const app=express()
const sequelize=require("./model/index")
const error=require("./middleware/error")
const UserRouter=require("./route/route.user")
const PostRouter=require("./route/route.post")
require("dotenv").config()
const cors=require("cors")
app.use(error)
app.use(express.json())
app.use(cors());


app.use("/user",UserRouter)
app.use("/post",PostRouter)




app.listen(process.env.PORT,async(err)=>{
    await sequelize.sync()
    console.log("server is running on port 4500")
})

