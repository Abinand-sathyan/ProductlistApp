const express = require('express')
const router = express.Router()
const {CreateCategory,
    getCategory,
    Addproduct,
    getparentcategory,
    getproducts,
    getsubproduct}=require("../controllers/AppController")


router.post("/createcategory",CreateCategory)
router.get("/getcategory",getCategory)
router.post("/Addproduct",Addproduct)
router.get("/getparentcategory",getparentcategory)
router.get("/getproducts",getproducts)
router.post("/getsubproduct",getsubproduct)


module.exports= router