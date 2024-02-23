const {Sequelize}=require("sequelize")

const sequelize=new Sequelize("cointab","admin","Mazhar2803",{
    host: 'database-3.c1m4gciss3ih.ap-south-1.rds.amazonaws.com',
    dialect:"mysql",
   

})

module.exports=sequelize