import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { Link } from 'react-router-dom'


const Blog = () => {
  const dispatch=useDispatch()
  const blogState = useSelector((state) => state?.blog?.blog);
   //console.log(blogState)

useEffect(()=>{
  getBlogs()
},[])
  const getBlogs=()=>{
      dispatch(getAllBlogs())
  }
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div class1="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Blogs Here</h3>
              <div>
                <ul className="ps-0">
                {
                blogState&&blogState?.map((item,index)=>{
                  return(
                    <>
                     <Link className="text-dark" to={`/blog/${item._id}`}>{item.title}</Link>
                  </>
                  )
                 
                })
              }
                 
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-sm-12">
            <div className="row">
              {
                blogState&&blogState?.map((item,index)=>{
                  return(
                    <div index={item._id} className="col-6 mb-3">
                    <BlogCard
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    createdAt={item.createdAt}
                   image={item.images[0]&&item.images[0]?.url}
  
  
                     />
                  </div>
                  )
                 
                })
              }
             
              
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
