import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import cross from "../components/images/cross.svg"
import watch from  "../components/images/watch.jpg"
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addTOWishlist } from "../features/products/productSlice";

const Wishlist = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
    getWishlistFromDb()
},[])
    const getWishlistFromDb=()=>{
        dispatch(getUserProductWishlist())
    }
    const wishlistState = useSelector((state) => state.auth.gwishlist?.wishlist);
    console.log(wishlistState)
    const removeFromWishlist=(id)=>{
      dispatch(addTOWishlist(id))
      setTimeout(()=>{
        dispatch(getUserProductWishlist())
      },300)
    }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <div class1="wishlist-wrapper home-wrapper-2 py-5 ">
        <div className="container-xxl">
        <div className="row ">
         {/* {
          wishlistState.length===0 && <div className="nowishlist text-center fs-3 mb-5">noting in the wish list</div>
         } */}
        {
        wishlistState&& wishlistState?.map((item,index)=>{
          return(
            
          <div className="col-3" key={index}>
          <div className="wishlist-card position-relative">
            <img
            onClick={()=>{removeFromWishlist(item?._id)}}
              src={cross}
              alt="cross"
              className="position-absolute cross img-fluid"
            />
            <div className="wishlist-card-image">
              <img
                src={item?.images[0]?.url}
                className="img-fluid w-100"
                alt="watch"
              />
            </div>
            <div className="py-3 px-3">
              <h5 className="title">
                {item.title}
              </h5>
              <h6 className="price">$ {item.price}</h6>
            </div>
          </div>
        </div>
          )
        })
       } 
          
        </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
