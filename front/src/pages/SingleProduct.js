import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { addRating, getAllProducts, getAProduct } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProdTOCart, getUserCart } from "../features/user/userSlice";
import PopularProduct from "../components/PopularProduct";
import { toast } from "react-toastify";
const SingleProduct = () => {
  const location=useLocation()
  const navigate=useNavigate()
  const getProductId=location.pathname.split("/")[2]
  const [quantity,setQuantity]=useState(1)
const [alreadyadded,seAtlreadyadded]=useState(false)

  console.log(getProductId)
  const dispatch=useDispatch()
  let pcounter=0
  
  const uploadCart=()=>{
    dispatch(addProdTOCart({quantity,price: productState&&productState?.price,productId:productState&&productState?._id}))
  navigate("/cart")
  }
  const productState = useSelector((state) => state.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);

  const CartState=useSelector(state=>state.auth?.cartProducts)
  console.log(CartState,'io')


  console.log( productState?.ratings)
  useEffect(()=>{
    dispatch(getAProduct(getProductId))
    dispatch(getUserCart())
dispatch(getAllProducts())
    
},[])

useEffect(()=>{
  if (CartState) {
    for (let index = 0; index < CartState.length; index++) {
      if (getProductId === CartState[index]?.productId?._id)
        seAtlreadyadded(true)
    }
  }
},[CartState])

 
  // const props = {
  //   width: 594,
  //   height: 600,
  //   zoomWidth: 600,

  //   img:productState?.images[0].url
  // };

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => {};

  const [star,setStar]=useState(null)
  const [comment,setComment]=useState(null)
const addRatingToPtoduct=()=>{
  if(star===null){
    toast.error("please add Rating")
    return false
  }
  if(comment===null){
    toast.error("please add comment")
    return false

  }else{
    dispatch(addRating({star:star,comment:comment,prodId:getProductId}))
    // setTimeout(() => {
    // dispatch(getAProduct(getProductId))
      
    // }, 300);
  }
}
  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              {/* <div>
                <ReactImageZoom
                 width={594}
                 height={ 600}
                 zoomWidth={600}
             
                 img={productState&&productState?.images[0].url }
                 />
              </div> */}
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images&&productState?.images.map((item,index)=>{
                return(
                  <div key={index}>
                  <img
                    src={item.url}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                )
              })}
             
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                {productState&&productState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$    {productState&&productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value=   {productState&&productState?.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">   {productState&&productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">   {productState&&productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">In Stock</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color />
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
               {
                alreadyadded===false &&<>
                   <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      onChange={(e)=>setQuantity(e.target.value)}
                    />
                  </div>
                  </>
               }
                  <div className={alreadyadded?"ms-0":"d-flex align-items-center gap-30 ms-5"}>
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={()=>{alreadyadded?navigate("/cart"):uploadCart()}}
                    >
                      {alreadyadded?"View cart":"Add to Cart"}
                      
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
              dangerouslySetInnerHTML={{__html:productState&&productState?.title}}
              >
             
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e)=>{
                        setStar(e)
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={(e)=>{
                        setComment(e.target.value)
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="button border-0" onClick={addRatingToPtoduct} type='button'>Submit Review</button>
                  </div>
              </div>
              <div className="reviews mt-4">
              {
                productState&&productState?.ratings.map((item,index)=>{
               return(
                <div key={index} className="review">
                <div className="d-flex gap-10 align-items-center">
                  {/* <h6 className="mb-0">Navdeep</h6> */}
                  <ReactStars
                    count={5}
                    size={24}
                    value={5}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <p className="mt-3">
                 {
                  item.comment
                 }
                </p>
              </div>
               )
                })
               }
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
        {
                   productsState && productsState?.map((item,index)=>{
  if (item.tags === "popular" && pcounter < 4) {
    pcounter++;
    return (
      <PopularProduct key={index}
        brand={item.brand} 
        title={item.title} 
        price={item.price}
        image={item.images[0].url}
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

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={watch} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
