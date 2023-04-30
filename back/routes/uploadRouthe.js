const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl.js");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {uploadPhoto,productImgResize}=require("../middlewares/uploadImage.js");
const router = express.Router();

router.post("/",uploadPhoto.array("images",10),productImgResize,uploadImages);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
