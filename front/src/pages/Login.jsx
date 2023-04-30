import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

const loginSchema = yup.object({
  email: yup.string().email("Email Should be valid").required("Email is required"),
  password:yup.string().required("Password is required")
});
const Login = () => {
  const dispatch=useDispatch()
  const authState = useSelector((state) => state?.auth);

  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
       email: '',
      password:''
    },
    validationSchema:loginSchema,
    onSubmit: values => {
      dispatch(loginUser(values))
      setTimeout(()=>{
        if (authState?.isSuccess) {
              navigate("/");
           } 
      },50)
    },
  });


  // const {  user,isSuccess} = authState.auth;

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/",{ state: { name: user.firstname } });
  //   } else {
   
  //   }
  // }, [user,isSuccess]);
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <div class1="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
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
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
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

export default Login;
