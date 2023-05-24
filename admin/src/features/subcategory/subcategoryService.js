import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProductSubCategories = async () => {
  const response = await axios.get(`${base_url}subcategory/`,config);
console.log(response);
  return response.data;
};
const createSubCategory = async (category) => {
  console.log(category);
  const response = await axios.post(`${base_url}subcategory/`, category, config);

  return response.data;
};

const getProductSubCategory = async (id) => {
  const response = await axios.get(`${base_url}subcategory/${id}`, config);

  return response.data;
};

const deleteProductSubCategory = async (id) => {
  const response = await axios.delete(`${base_url}subcategory/${id}`, config);

  return response.data;
};
const updateProductSubCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}subcategory/${category.id}`,
    { name: category.pCatData.name },
    config
  );

  return response.data;
};
const subCategoryService = {
  getProductSubCategories,
  createSubCategory,
  getProductSubCategory,
  deleteProductSubCategory,
  updateProductSubCategory,
};

export default subCategoryService;
