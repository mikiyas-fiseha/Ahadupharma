const express=require("express")
const { creatBLog, updateBlog, getBlog, getallBlog, deleteBlog, liketheBlog, disliketheBlog, uploadImages } = require("../controller/blogCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImage");
const router=express.Router()
router.put("/likes", authMiddleware, liketheBlog);
router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 2),
    blogImgResize,
    uploadImages
  );
router.put("/dislikes", authMiddleware, disliketheBlog);
router.post("/",authMiddleware,isAdmin,creatBLog)

router.put("/:id",authMiddleware,isAdmin,updateBlog)
router.get("/",getallBlog)
router.get("/:id",getBlog)
router.delete("/:id",authMiddleware,isAdmin,deleteBlog)
module.exports=router