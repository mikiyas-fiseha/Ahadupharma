const express=require("express")
const { creatCategory, createCategory, updateCategory, deleteCategory, getCategory, getallCategory } = require("../controller/prodcategoryCtrl");
const { addSubCategory, updateSubCategory, deleteSubCategory, getSubCategory, getAllSubCategories } = require("../controller/subcategory");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const router=express.Router()

router.post("/", addSubCategory);
router.post("/", addSubCategory);

// Update a subcategory
router.put("/:id", updateSubCategory);

// Delete a subcategory
router.delete("/:id", deleteSubCategory);

// Get a single subcategory
router.get("/:id", getSubCategory);

// Get all subcategories
router.get("/", getAllSubCategories);
module.exports=router 