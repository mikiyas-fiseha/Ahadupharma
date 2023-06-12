import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories, getsubbyname } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, getAProduct, resetState, updateAProduct } from "../features/product/productSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  //add
  instruction: yup.string().required("Instruction is Required"),
  composition: yup.string().required("Composition is Required"),
  expiryDate: yup.string().required("Expiry Date is Required"),
  prescriptionRequired: yup.string().required("This Fild is Required"),
  dosageForm: yup.string().required("This Fild is Required"),
  subcategory:yup.string().required("This Fild is Required"),
  //
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
 
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory,"selectedCategory");
  //console.log(color);
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
     // img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state?.brand?.brands);
  const catState = useSelector((state) => state?.pCategory?.pCategories);
  const colorState = useSelector((state) => state?.color?.colors);
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);
  // console.log(typeof(newProduct?.Productimages[0]));
  console.log(brandState);

  const { isSuccess, isError, isLoading, createdProduct,updatedProduct,
ProductName,
ProductDesc,
ProductPrice,
ProductBrand,
ProductCategory,
ProductTags,
ProductColor,
ProductQuantity,
Productimages,
Productinstruction,
Productcomposition,
ProductexpiryDate,
ProductprescriptionRequired,
ProductdosageForm,
ProductSubcategory
} = newProduct;

console.log(ProductexpiryDate?.split("T")[0],'ProductexpiryDate');
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
   
    if (isSuccess && updatedProduct) {
      toast.success("Product updated Successfullly!");
      navigate("/admin/list-product")

    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    //formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [ imgState]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title:ProductName || "",
      description:ProductDesc || "",
      price:ProductPrice || "",
      brand:ProductBrand || "",
      category:ProductCategory ||"",
      tags:ProductTags || "",
      color:ProductColor || "",
      quantity:ProductQuantity || "",
      images:Productimages||  "",
      instruction :Productinstruction||"",
      composition :Productcomposition||"",
      expiryDate :ProductexpiryDate?.split("T")[0]||"",
      prescriptionRequired :ProductprescriptionRequired||"",
      dosageForm :ProductdosageForm||"",
      subcategory :ProductSubcategory||"",

    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getProductId !== undefined ){
        const data={id:getProductId,productData:values}
        dispatch(updateAProduct(data))
       alert(JSON.stringify(values));

       // dispatch(resetState());

      }else{
        dispatch(createProducts(values));
       alert(JSON.stringify(values));

        formik.resetForm();
        setColor(null);
        // setTimeout(() => {
        //   dispatch(resetState());
        // }, 300);
      }
    
    },
  });
  const handleColors = (e) => {
    setColor(e);
   // console.log(color);
  };
  //for category
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    formik.handleChange("category")(event); // Invoke formik.handleChange
    setSelectedCategory(selectedValue); // Set selected category
  };
  useEffect(()=>{
dispatch(getsubbyname(selectedCategory))
  },[selectedCategory])

  const subcatState = useSelector((state) => state?.pCategory?.categoryByName?.subcategories);
  
  console.log(subcatState?.subcategories?.map((i)=>console.log(i.name)),"subcatState");
  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">

            <ReactQuill
              theme="snow"
              name="description"
              placeholder="Enter Description"

              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="">
            <ReactQuill
              theme="snow"
              name="instruction"
           
              placeholder="Enter instruction"
              onChange={formik.handleChange("instruction")}
              value={formik.values.instruction}
            />
          </div>
          <div className="error">
            {formik.touched.instruction && formik.errors.instruction}
          </div>

          <div className="">

            <ReactQuill
              theme="snow"
              name="composition"
              placeholder="Enter composition"

              onChange={formik.handleChange("composition")}
              value={formik.values.composition}
            />
          </div>
          <div className="error">
            {formik.touched.composition && formik.errors.composition}
          </div>
          <CustomInput
            type="date"
            label="Enter Product Expiry Date"
            name="expiryDate"
            onChng={formik.handleChange("expiryDate")}
            onBlr={formik.handleBlur("expiryDate")}
            val={formik.values.expiryDate}
          />
          <div className="error">
            {formik.touched.expiryDate && formik.errors.expiryDate}
          </div>


          <select
            name="prescriptionRequired"
            onChange={formik.handleChange("prescriptionRequired")}
            onBlur={formik.handleBlur("prescriptionRequired")}
            value={formik.values.prescriptionRequired}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" >Select Productprescription Required</option>
            <option value="true">true</option>
            <option value="false">false</option>

           
          </select>
          <div className="error">
            {formik.touched.prescriptionRequired && formik.errors.prescriptionRequired}
          </div>

          <CustomInput
            type="text"
            label="Enter Product dosageForm"
            name="dosageForm"
            onChng={formik.handleChange("dosageForm")}
            onBlr={formik.handleBlur("dosageForm")}
            val={formik.values.dosageForm}
          />
          <div className="error">
            {formik.touched.dosageForm && formik.errors.dosageForm}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState?.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={handleCategoryChange}
           onBlur={formik.handleBlur("category")}
            value={formik.values.category}
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

          <select
            name="subcategory"
            onChange={formik.handleChange("subcategory")}

           onBlur={formik.handleBlur("subcategory")}
            value={formik.values.subcategory}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select subcategory</option>
            {subcatState&&subcatState?.map((i, j) => {
              return (
                <option key={j} value={i.name}>
                  {i.name}
                </option>
              );
            })}
          </select>

          <div className="error">
            {formik.touched.subcategory && formik.errors.subcategory}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
                   {getProductId !== undefined ? "Edit" : "Add"} Product

          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
