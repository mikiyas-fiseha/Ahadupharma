const Product=require("../model/productModel")
const fs = require("fs");
const User=require("../model/userModel")
const SubCategory=require("../model/subCategorySchema")

const asyncHandler=require("express-async-handler")
const slugify =require("slugify")
const {cloudinaryUploadImg}=require("../utils/cloudinary")
const { json } = require("body-parser")


// const creatProduct=asyncHandler(async(req,res)=>{
//     try {
//         if(req.body.title){
//             req.body.slug=slugify(req.body.title)
//         }
//         const newProduct= await Product.create(req.body)
//         res.json(newProduct)
//     } catch (error) {
//         throw new Error(error)
//     }

// })
const creatProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    // Retrieve the subcategory ObjectId based on its name
    const subcategory = await SubCategory.findOne({ name: req.body.subcategory });

    if (!subcategory) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }

    // Add the subcategory ObjectId to the product's subcategory field
    req.body.subcategory = subcategory._id;

    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});


//get a product
const getaProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params
    

    const findProduct=await Product.findById(id).populate("subcategory")
    res.json(findProduct)
})

//get a product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });
//update product 
const updateproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
   
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});


//delete product 
const deleteproduct=asyncHandler(async(req,res)=>{
    const { id }=req.params
console.log(id)
    try {
        if(req.body.title){
            req.body.slug=slugify(req.body.title)
        }
        const deletedUser=await Product.findOneAndDelete({ _id: id })
        console.log("deletedUser",deletedUser);
        res.json(deletedUser)
    } catch (error) {
        throw new Error(error)
    }
})


const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  
  const { prodId } = req.body;
  
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        },
       
      );
     
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});


const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment,username } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment,"ratings.$.username":username },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
              username:username,
            },
          },
        },
        {
          new: true,
        }
        
      );

    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  console.log(req.files)
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports={
creatProduct,
getaProduct,
getAllProduct,
updateproduct,
deleteproduct,
addToWishlist,
rating,
uploadImages
}