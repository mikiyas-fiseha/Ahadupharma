import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createSubCategory,
  getAProductSubCategory,
  resetState,
  updateAProductSubCategory,
} from "../features/subcategory/subcategorySlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
let schema = yup.object().shape({
name: yup.string().required("SUb Category Name is Required"),
categoryName: yup.string().required("Referance is Required"),

});
const AddSubCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newsubCategory = useSelector((state) => state.subCategory);
  useEffect(() => {
    //dispatch(resetState())
  
    dispatch(getCategories());
 
  }, []);

  const catState = useSelector((state) => state?.pCategory?.pCategories);
console.log(catState);
  const {
    isSuccess,
    isError,
    isLoading,
    createdsubCategory,
    subcategoryName,
    updatedsubCategory,
    categoryName
  } = newsubCategory;
  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductSubCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);
  useEffect(() => {
    if (isSuccess && createdsubCategory) {
      toast.success("Sub Category Added Successfullly!");
    }
    if (isSuccess && updatedsubCategory) {
      toast.success("Sub Category Updated Successfullly!");
      navigate("/admin/list-subcategory");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    
    enableReinitialize: true,
    initialValues: {
      name: subcategoryName || "",
      categoryName: categoryName || "",
    },
    
    validationSchema: schema,
    onSubmit: (values) => {
        console.log("formik");
      if (getPCatId !== undefined) {
       
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductSubCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createSubCategory(values));
        //alert(JSON.stringify(values));
         formik.resetForm();
        // setTimeout(() => {
        //   dispatch(resetState());
        // }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4  title">
        {getPCatId !== undefined ? "Edit" : "Add"} Sub Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Sub Category"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            id="subcat"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <select
            name="categoryName"
            onChange={formik.handleChange("categoryName")}
            onBlur={formik.handleBlur("categoryName")}
            value={formik.values.categoryName}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState?.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.categoryName && formik.errors.categoryName}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getPCatId !== undefined ? "Edit" : "Add"} Sub Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubCat;
