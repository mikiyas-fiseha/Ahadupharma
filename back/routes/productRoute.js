const express=require("express")
const { creatProduct, getaProduct, getAllProduct, updateproduct, deleteproduct, addToWishlist, rating, uploadImages } = require("../controller/productCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { productImgResize } = require("../middlewares/uploadImage");
const { uploadPhoto } = require("../middlewares/uploadImage");
const router=express.Router()

router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
  );
router.post("/",authMiddleware,isAdmin,creatProduct)

router.get("/:id",getaProduct)
router.put("/wishlist",authMiddleware,addToWishlist)
router.put("/rating",authMiddleware,rating)
router.get("/",getAllProduct)

router.put("/:id",authMiddleware,isAdmin,updateproduct)

router.delete("/:id",authMiddleware,isAdmin,deleteproduct)
module.exports=router 