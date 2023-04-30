import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "../components/CustomInput";
import { forgotPasswoedToken } from "../features/user/userSlice";
const emailSchema = yup.object({
  email: yup.string().email("Email Should be valid").required("Email is required"),
});
const Forgotpassword = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
       email: '',
    },
    validationSchema:emailSchema,
    onSubmit: values => {
      dispatch(forgotPasswoedToken(values))
    },
  });

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
       <div class1="login-wrapper py-5 home-wrapper-2">
<div className="container-xxl">

        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form action=""  onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="Email" 
                 value={formik.values.email} 
                 onChange={formik.handleChange("email")}
                 onBlur={formik.handleBlur("email")}
                  />
                   <div className="error mt-2">
                  {formik.touched.email && formik.errors.email}
                   </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
        </div>
    </>
  );
};

export default Forgotpassword;
