import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../components/images/blog-1.jpg";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from '../features/blogs/blogSlice';

function SingleBlog() {
  const dispatch=useDispatch()
  const blogState = useSelector((state) => state?.blog?.singleBlog);
 
   const location = useLocation();
   const getBlogId = location.pathname.split("/")[2];
 console.log(getBlogId)
useEffect(()=>{
  getBlog()
},[])
  const getBlog=()=>{
      dispatch(getABlog(getBlogId))
  }
  return (
    <>
    <Meta title={blogState&& blogState?.title} />
      <BreadCrumb title={blogState?.title}/>
      <div class1="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
        <div className="row">
        <Link to="/blogs" className="d-flex align-items-center gap-10 text-dark mb-4">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
          <div className="col-12">
            <div className="single-blog-card">
            <h3 className="title">{blogState?.title}</h3>
            <img src={blogState?.images[0]&&blogState?.images[0]} className="img-fluid w-100 my-4" alt="blog" />
                <p
              dangerouslySetInnerHTML={{__html:blogState?.description}}></p>
            </div>

          </div>
         
        </div>
        </div>
      </div>
      </>
  )
}

export default SingleBlog