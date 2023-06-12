import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";
import PopularProduct from "../components/PopularProduct";
import FeaturedProduct from "../components/FeaturedProduct";
import Meta from "../components/Meta";
import { Carousel } from 'react-bootstrap';
import baby from "../images/baby.jpg"
import {  Row, Col } from 'react-bootstrap';
//import { services } from "../utils/Data";

const Home = () => {
  const dispatch=useDispatch()
let counter=0
let pcounter=0

  const blogState = useSelector((state) => state?.blog?.blog);
   //console.log(blogState)
   const productState = useSelector((state) => state?.product?.product);
   //console.log(productState)

useEffect(()=>{
  getBlogs()
  getProducts()
},[])
  const getBlogs=()=>{
      dispatch(getAllBlogs())
  }
  const getProducts=()=>{
    dispatch(getAllProducts())
}

const data = [
  { image: 'images/medicin.jpg', cardName: 'Medicine' ,url:"main-products/Medicine"},
  { image: 'images/personalcare.jpg', cardName: 'Personal Care' ,url:"main-products/Personal care"},
  { image: 'images/baby.jpg', cardName: 'Baby and Child Care' ,url:"main-products/Baby and Child Care"},
  { image: 'images/wellness.jpg', cardName: 'Health and Wellness' ,url:"main-products/Health and Wellness"},
  { image: 'images/main-banner-1.jpg', cardName: 'Card 1' ,url:"main-products/"},
  { image: 'images/main-banner-1.jpg', cardName: 'Card 6' ,url:"main-products/"},
];
  return (
    <>
    <Meta title={"Home"} />

      <Container class1="home-wrapper-1 py-5">


      <Carousel fade indicators={false} controls={window.innerWidth > 576} pauseOnHover={false} interval={5000}>
      <Carousel.Item>
      <div className="banner-image">
      <img
          className="d-block w-100 h-lg-auto"
          src="images/catbanner-01.jpg"
          alt="Banner 1"
        />
      </div>
       
        {window.innerWidth > 576 && (
          <Carousel.Caption className="text-center">
            <h2>Banner 1 Title</h2>
            <p>Banner 1 Description</p>
          </Carousel.Caption>
        )}
      </Carousel.Item>
      <Carousel.Item>
      <div className="banner-image">
      <img
          className="d-block w-100 h-lg-auto"
          src="https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80"
          alt="Banner 2"
        />
     </div>
       
        {window.innerWidth > 576 && (
          <Carousel.Caption className="text-center">
            <h2>Banner 2 Title</h2>
            <p>Banner 2 Description</p>
          </Carousel.Caption>
        )}
      </Carousel.Item>
      <Carousel.Item>
      <div className="banner-image">

        <img
          className="d-block w-100 h-lg-auto"
          src="images/main-banner-1.jpg"
          alt="Banner 3"
        />
        </div>
        {window.innerWidth > 576 && (
          <Carousel.Caption className="text-center">
            <h2>Banner 3 Title</h2>
            <p>Banner 3 Description</p>
          </Carousel.Caption>
        )}
      </Carousel.Item>
    </Carousel>

    
{/* cards cat */}
              <div className="">
                <h5 className="card-title text-center mb-0">Always here for you</h5>
              </div>
              <div className="card-body">
                <p className="card-text text-center">with all the health essentials you need for you and your family</p>
              </div>
    <div className="container">
    
      <div className="row row-cols-2 row-cols-lg-6">
        {data.map((item) => (
          <div key={item.id} className="col mb-4">
           <Link to={item?.url}>
           <div className="card">
            <img src={item.image} className="card-img-top img-fluid rounded" alt={item.name} style={{ objectFit: 'cover', height: '180px' }} />

              <div className="card-body">
                <h5 className="card-text text-center">{item.cardName}</h5>
              </div>
            </div>
           </Link>
          </div>
        ))}
      </div>
    </div>

{/*card end */}



        <div className="row d-none d-md-block">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sake</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            {/* <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </Container>
     
     
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
  


      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <div className="row row-cols-2">
        
        {
                   productState && productState?.map((item,index)=>{
  if (item.tags === "featured" && counter < 8) {
    counter++;
    return (
      <FeaturedProduct key={index}
        brand={item.brand} 
        title={item.title} 
        price={item.price}
        image={item.images[0]?.url}
        tags={item.tags}
        id={item._id}
      />
    );
  }
})}
          
        </div>
        </div>
      </Container>

      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {
            productState && productState?.map((item,index)=>{
              if(item.tags==="special"){
                return(
                  <SpecialProduct key={index}
                  id={item?._id}
                  brand={item?.brand}
                  title={item?.title}
                  price={item?.price}
                   totalrating={item.totalrating}
                   sold={item?.sold}
                   image={item?.images[0]?.url}

                  quantity={item?.quantity}
                  
                  />
                )
              }
             
            })
          }
         
          
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row row-cols-2">
        
        {
                   productState && productState?.map((item,index)=>{
  if (item.tags === "popular" && pcounter < 4) {
    pcounter++;
    return (
      <PopularProduct key={index}
        brand={item.brand} 
        title={item.title} 
        price={item.price}
        image={item.images[0]?.url}
        tags={item.tags}
        id={item._id}
      />
    );
  } else {
    return null; // if the tags prop is not "popular", do not render the component
  }
})}
          
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row row-cols-2">
          
          {
                blogState&&blogState?.map((item,index)=>{
                if(index<4){
                  return(
                    <div key={index} className=" col-lg-3 col-sm-6 mb-3">
                    <BlogCard
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    createdAt={item.createdAt}
                   image={item.images[0]&&item.images[0]?.url}
  
  
                     />
                  </div>
                  )
                 
                }
                })
              }
        </div>
      </Container>
    </>
  );
};

export default Home;
