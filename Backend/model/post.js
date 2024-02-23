const sequelize=require("./index")
const {DataTypes}=require("sequelize")



let Post=sequelize.define("Posts",{
    id:{
     type:DataTypes.INTEGER,
     allowNull:false,
     primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    body:{
        type:DataTypes.STRING,
        allowNull:false,
    }
        
    }


)

module.exports=Post

module.exports=Post