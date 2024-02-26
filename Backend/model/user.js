const sequelize=require("./index")
const {DataTypes}=require("sequelize")

let User=sequelize.define("Userdata",{
    id:{
     type:DataTypes.INTEGER,
     allowNull:false,
     primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    address:{
        type:DataTypes.JSON,
        allowNull:false

    },
    phone:{type:DataTypes.STRING,allowNull:false},
    website:{type:DataTypes.STRING,allowNull:false},
    company:{
        type:DataTypes.JSON,
        allowNull:false
    }
        
        
    }


)

module.exports=User