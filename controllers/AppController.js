const categoryDB = require("../models/categorySchema");
const productDB = require("../models/productschmea");




const Addproduct = async (req, res) => {
  const { productname, quantity, prize, discription, image, category } =
    req.body.data;

  const productata = new productDB({
    ProductName: productname,
    quantity: quantity,
    Discription: discription,
    Prize: prize,
    Category: category,
    ImageURL: image,
  });
  await productata.save();
  return res.status(200).send({ success: true });
};





const CreateCategory = async (req, res) => {
  let parentCategory = req.body.parentCategory;
  let categoryName = req.body.categoryName;

  if (
    parentCategory == null ||
    parentCategory == "No Parent (Top-level Category)"
  ) {
    if (categoryName) {
      const Regex = new RegExp(categoryName, "i");
      let DBcategory = await categoryDB.findOne({
        CategoryName: { $regex: Regex },
      });
      if (!DBcategory) {
        const newcategory = new categoryDB({
          categoryname: categoryName,
        });
        await newcategory.save();
      }
      let category = await categoryDB.find({});
      return res.status(200).send({ category, success: true });
    }
  } else {
    if (categoryName) {
      const Regex = new RegExp(categoryName, "i");
      let DBcategory = await categoryDB.findOne({
        CategoryName: { $regex: Regex },
      });
      if (!DBcategory) {
        const newcategory = new categoryDB({
          categoryname: categoryName,
        });
        await newcategory.save();
      }

      let getparentCategory = await categoryDB.find({ _id: parentCategory });
      let Category = await categoryDB.find({ categoryname: categoryName });
      let parentpath = getparentCategory[0].path;
      let newcategoryid = Category[0]._id;

      await categoryDB.findByIdAndUpdate(
        { _id: newcategoryid },
        { path: `${parentpath}/${newcategoryid}` }
      );

      return res.status(200).send({ Category, success: true });
    }
  }
};




const getCategory = async (req, res) => {
  let category = await categoryDB.find({});
  return res.status(200).send({ category, success: true });
};

const getparentcategory = async (req, res) => {
  let parentcategory = await categoryDB.find({ path: "0" });

  return res.status(200).send({ parentcategory, success: true });
};

const getproducts = async (req, res) => {
  let porducts = await productDB.find({});

  return res.status(200).send({ porducts, success: true });
};





const getsubproduct = (req, res) => {
  console.log(req.body, "just check");
  const categoryId = req.body.categryId;
  console.log(categoryId, "last check");

  categoryDB
    .find({
      $or: [{ _id: categoryId }, { path: { $regex: `^${categoryId}/` } }],
    })
    .exec()
    .then((categories) => {
    
      const subcategoryIds = categories.map((category) => category._id);
      console.log(subcategoryIds, "sucessssss");
      return Product.find({ category: { $in: subcategoryIds } }).exec();
    })
    .then((products) => {
      // You have the list of products associated with the specified category and its subcategories
      // Handle and return the products as needed
    })
    .catch((err) => {
      // Handle any errors that occur during the query
    });
};

module.exports = {
  CreateCategory,
  getCategory,
  Addproduct,
  getparentcategory,
  getproducts,
  getsubproduct,
};
