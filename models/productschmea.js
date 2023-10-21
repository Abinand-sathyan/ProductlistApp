const mongoose=require("mongoose")
const addproductschema=mongoose.Schema({
    ProductName:{
        type:String,
        // require:true,
       },
    quantity:{
        type:Number,
        // require:true,
    },
    Discription:{
        type:String,
        // require:true,
    },
    Prize:{
        type:Number,
        // require:true,
    },
  
    Category:{
        type:String,
        // require:true,
    },
    ImageURL:{
        type:String,
        // require:true,
        },
   },{
    timestamps:true
})
let addproduct=mongoose.model("addproduct",addproductschema)
module.exports=addproduct;
