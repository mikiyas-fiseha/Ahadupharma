const express=require("express")
const { creatCategory, createCategory, updateCategory, deleteCategory, getCategory, getallCategory, findCategoryByName } = require("../controller/prodcategoryCtrl")
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const router=express.Router()

router.post("/",authMiddleware,isAdmin,createCategory)

router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);
router.post("/findbyname", findCategoryByName);


module.exports=router 