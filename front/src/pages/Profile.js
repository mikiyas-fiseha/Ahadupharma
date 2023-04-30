import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import {FiEdit} from 'react-icons/fi'
import Meta from '../components/Meta';
const profileSchema = yup.object({
    firstname: yup.string().required("FirstName is required"),
    lasttname: yup.string().required("LastName is required"),
    
    email: yup.string().nullable().email("Email Should be valid").required("Email is required"),
    mobile: yup.string().required("Mobile is required"),
    
  });
const Profile = () => {
    const dispatch=useDispatch()
  const userState=useSelector(state=>state?.auth?.user)
const [edit,setEdit]=useState(true)
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      firstname: userState?.firstname,
      lasttname:userState?.lasttname,
      email: userState?.email,
      mobile:userState?.mobile,
      
    },
    validationSchema:profileSchema,
    onSubmit: values => {
     dispatch(updateProfile(values))
     setEdit(true)
    },
  });

  return (
   <>
      <Meta title={"Porfile"} />

    <BreadCrumb title="My Profile" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="my-3">UPdate profile</h3>
                    <FiEdit className='fs-3' onClick={()=>setEdit(false)}/>
                </div>
            </div>
            <div className="col-12">
            <form  onSubmit={formik.handleSubmit}>
            <div className="form-group">
    <label htmlFor="example1">First Name</label>
    <input type="text" name='firstname'  disabled={edit} className="form-control" id="example1" placeholder="Enter First Name"
     value={formik.values.firstname} 
     onChange={formik.handleChange("firstname")}
      onBlur={formik.handleBlur("firstname")}
      />
       <div className="error mt-2">
      {formik.touched.firstname && formik.errors.firstname}
       </div>
  </div>
  <div className="form-group">
    <label htmlFor="example2">Last Name</label>
    <input type="text" name='lastname'  disabled={edit} className="form-control" id="example2" placeholder="Enter Last Name"
   value={formik.values.lasttname} 
   onChange={formik.handleChange("lasttname")}
   onBlur={formik.handleBlur("lasttname")}
 />
                   <div className="error mt-2">
                  {formik.touched.lasttname && formik.errors.lasttname}
                   </div>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" name='email'  disabled={edit} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
     value={formik.values.email} 
     onChange={formik.handleChange("email")}
      onBlur={formik.handleBlur("email")}
      />
       <div className="error mt-2">
      {formik.touched.email && formik.errors.email}
       </div>
   
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail2">Mobile</label>
    <input type="number" name='mobile' disabled={edit}  className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter Mobile"
    value={formik.values.mobile} 
    onChange={formik.handleChange("mobile")}
     onBlur={formik.handleBlur("mobile")}
     />
      <div className="error mt-2">
     {formik.touched.mobile && formik.errors.mobile}
      </div>
  </div>
  {edit===false&& <button type="submit" className="btn btn-primary">save</button>}
</form>
            </div>
        </div>
        </Container>
        
        
        </>
  )
}

export default Profile