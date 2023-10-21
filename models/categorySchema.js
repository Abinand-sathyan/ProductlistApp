const mongoose = require("mongoose");
const categoryschema=new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: '0', 
  },
          
},{ timestamps: true });
let Category =mongoose.model('Category',categoryschema)
module.exports=Category;