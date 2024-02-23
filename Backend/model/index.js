const {Sequelize}=require("sequelize")
require("dotenv").config()


const sequelize=new Sequelize("cointab","admin",process.env.Password,{
    host: 'database-1.c1m4gciss3ih.ap-south-1.rds.amazonaws.com',
    dialect:"mysql",
   

})

module.exports=sequelize