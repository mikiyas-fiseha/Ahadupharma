const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var prodcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    subcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    }],
  },
  
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("PCategory", prodcategorySchema);
