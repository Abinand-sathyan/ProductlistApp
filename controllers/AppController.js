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

  let categoryid = parentcategory[0]._id;

  return res.status(200).send({ parentcategory, categoryid, success: true });
};

const getproducts = async (req, res) => {
  let porducts = await productDB.find({});
  return res.status(200).send({ porducts, success: true });
};

const getsubproduct = async (req, res) => {
  let regexPattern;
  const subcategoryid = req.body.categryId;

  const catogory = await categoryDB.find({ _id: subcategoryid });
  const catname = catogory[0].categoryname;
  if (catname == "Electronics") {
    const subcategory = await categoryDB.find();
    const products = await productDB.find();
    return res
      .status(200)
      .send({ subcategory, products, catname, success: true });
  } else {
    regexPattern = new RegExp(`.*${subcategoryid}.*`);
    const subcategory = await categoryDB.find({
      path: { $regex: regexPattern },
    });
    const subcategoryIds = subcategory.map((category) => category.categoryname);
    const products = await productDB.find({
      Category: { $in: subcategoryIds },
    });

    return res
      .status(200)
      .send({ subcategory, products, catname, success: true });
  }
};

module.exports = {
  CreateCategory,
  getCategory,
  Addproduct,
  getparentcategory,
  getproducts,
  getsubproduct,
};
