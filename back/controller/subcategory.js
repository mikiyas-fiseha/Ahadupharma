const Category = require("../model/prodcategoryModel");

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const SubCategory = require("../model/subCategorySchema");


const addSubCategory = async (req, res) => {
    const { name, categoryName } = req.body;
  
    try {
      // Find the parent category by name
      const category = await Category.findOne({ title: categoryName });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      // Create the subcategory
      const subcategory = new SubCategory({ name, category: category._id });//Categoty befor
      await subcategory.save();
  
      // Associate the subcategory with the parent category
      category.subcategories.push(subcategory);
      await category.save();
  
      res.status(201).json({ message: "Subcategory created successfully" });
    } catch (error) {
      console.error("Error creating subcategory:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  
// Update a subcategory
const updateSubCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const subcategory = await SubCategory.findByIdAndUpdate(id, { name }, { new: true });
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
  
      res.json({ message: "Subcategory updated successfully", subcategory });
    } catch (error) {
      console.error("Error updating subcategory:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  
  // Delete a subcategory
  const deleteSubCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const subcategory = await SubCategory.findByIdAndRemove(id);
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
  
      // Remove the subcategory from its parent category's subcategories array
      await Category.findByIdAndUpdate(subcategory.Category, { $pull: { subcategories: subcategory._id } });
  
      res.json({ message: "Subcategory deleted successfully" });
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  
  // Get a single subcategory by ID
  const getSubCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const subcategory = await SubCategory.findById(id);
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
  
      res.json(subcategory);
    } catch (error) {
      console.error("Error retrieving subcategory:", error);
      res.status(500).json(error);
    }
  };
  
  // Get all subcategories
  const getAllSubCategories = async (req, res) => {
    try {
      const subcategories = await SubCategory.find()
      res.json(subcategories);
    } catch (error) {
      console.error("Error retrieving subcategories:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  
  module.exports = {
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategory,
    getAllSubCategories,
  };