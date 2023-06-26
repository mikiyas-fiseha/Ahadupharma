import React from "react";
import watch from '../components/images/watch.jpg';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
    const {brand,title,price,sold,quantity,image ,totalrating,id}=props
    //console.log(brand,title,sold,quantity ,image, price,totalrating)
    return (
        <>
            <div className="col-6 mb-3">
                <div className="special-product-card">
                    <div className="d-flex justify-content-between">
                        <div>
                            <img src={image} className="img-fluid" alt="watch" />
                        </div>
                        <div className="special-product-content">
                            <h5 className="brand">{brand}</h5>
                            <h6 className="title">
                                {title}
                            </h6>
      
    <ReactStars
                                count={5}
                                size={24}
                                value={parseFloat(totalrating)}
                                edit={false}
                                activeColor="#ffd700"
                            />
                            <p className="price">
                                <span className="red-p">{price} ETB</span> &nbsp; <strike>{price+((20 / 100) * price)} </strike>
                            </p>
                            <div className="discount-till d-flex align-items-center gap-10">
                                <p className="mb-0 text-white">
                                    <b>5 </b>days
                                </p>
                                <div className="d-flex gap-10 align-items-center">
                                    <span className="badge rounded-circle p-3  mb-0 text-white">1</span>
                                    <span className="badge rounded-circle p-3 ">1</span>
                                    <span className="badge rounded-circle p-3 ">1</span>
                                </div>
                            </div>
                            
                            <Link className="button" to={'/product/'+id}>View</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpecialProduct;
