const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    composition: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    prescriptionRequired: {
      type: Boolean,
      required: true,
    },
    dosageForm: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      ref: "PCategory",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory", // Reference to the SubCategory model
    },
    brand: {
      type: String,
      required: true,
    },
    
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        username:String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
