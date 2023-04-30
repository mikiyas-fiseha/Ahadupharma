import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("FirstName is required"),
  lasttname: yup.string().required("LastName is required"),
  
  email: yup.string().nullable().email("Email Should be valid").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  password:yup.string().required("Password is required")
});
const Signup = () => {
const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lasttname: '',
      email: '',
      mobile:'',
      password:''
    },
    validationSchema:signUpSchema,
    onSubmit: values => {
      dispatch(registerUser(values))
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <div class1="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">

        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
              <CustomInput type="text" 
                name="firstname" 
                placeholder="First name"
                value={formik.values.firstname} 
                onChange={formik.handleChange("firstname")}
                 onBlrur={formik.handleBlur("firstname")}
                 />
                  <div className="error mt-2">
                 {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <CustomInput 
  type="text" 
  name="lasttname" 
  placeholder="Last name"
  value={formik.values.lasttname} 
  onChange={formik.handleChange("lasttname")}
  onBlur={formik.handleBlur("lasttname")}
/>
                  <div className="error mt-2">
                 {formik.touched.lasttname && formik.errors.lasttname}
                  </div>

                <CustomInput 
                type="email" 
                name="email" 
                placeholder="Email"
                value={formik.values.email} 
                onChange={formik.handleChange("email")}
                 onBlrur={formik.handleBlur("email")}
                 />
                  <div className="error mt-2">
                 {formik.touched.email && formik.errors.email}
                  </div>
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile} 
                onChange={formik.handleChange("mobile")}
                 onBlrur={formik.handleBlur("mobile")}
                 />
                  <div className="error mt-2">
                 {formik.touched.mobile && formik.errors.mobile}
                  </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password} 
                onChange={formik.handleChange("password")}
                 onBlrur={formik.handleBlur("password")}
                 />
                  <div className="error mt-2">
                 {formik.touched.password && formik.errors.password}
                  </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
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

export default Signup;
