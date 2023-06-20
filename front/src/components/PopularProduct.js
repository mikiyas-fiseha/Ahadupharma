import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addTOWishlist } from "../features/products/productSlice";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
const PopularProduct = (props) => {
  const { grid ,brand,title,price,image,tags,totalrating,id} = props;
  //console.log(grid,brand,title,price,image,tags);
  let location = useLocation();
  const navigate=useNavigate()

  const dispatch=useDispatch()
  const addToWish=(id)=>{

    dispatch(addTOWishlist(id))
  }

  return (
    <>
      
      <div
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : " col-lg-3 col-sm-3"
        } `}
      >
        <div
          // to={`/product/${id}`}
          className="product-card position-relative m-2"
        >
          <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent" onClick={(e)=>{addToWish(id)}}>
                <img src={wish} alt="wishlist" />
              </button>
          </div>
          <div className="product-image">
            <img src={image} className="img-fluid" alt="product image" />
          <img src={watch} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{brand}</h6>
            <h5 className="product-title">
              {title}
            </h5>
           
    <ReactStars
              count={5}
              size={24}
              value={parseFloat(totalrating)}
              edit={false}
              activeColor="#ffd700"
            />
            
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">${price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              {/* <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button> */}
              <Link to={"/product/"+id} className="border-0 bg-transparent">
   
              <img 
             // onClick={()=>navigate("/product/"+item?._id)} 
               src={view} alt="view" />
              </Link>
              {/* <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProduct;
