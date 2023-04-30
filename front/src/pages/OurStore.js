import BreadCrumb from "../components/BreadCrumb"
import { Helmet } from "react-helmet";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import watch from '../components/images/watch.jpg';

import React, { useEffect, useState } from "react";
import gr4 from "../components/images/gr4.svg"
import gr3 from "../components/images/gr3.svg"
import gr2 from "../components/images/gr2.svg"
import gr1 from "../components/images/gr.svg"

import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";



const OurStore = () => {
    const [grid, setGrid] = useState(4);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const productState = useSelector((state) => state?.product?.product);
    const [brands,setBrand]=useState([])
    const [categories,setCategories]=useState([])
    const [tags,setTages]=useState([])

    //filter state
    const [category,setCategory]=useState(null)
    const [tag,setTag]=useState(null)
    const [brand,setBrands]=useState(null)
    const [minprice,setMinPrice]=useState(null)
    const [maxprice,setMaxPrice]=useState(null)
    const [sort,setSort]=useState(null)



     console.log(sort)
useEffect(()=>{
    let newbrand=[]
    let category=[]
    let newtags=[]

    for (let index = 0; index < productState?.length; index++) {
        const element = productState[index];
        newbrand.push(element.brand)
        category.push(element.category)
        newtags.push(element.tags)
    }
    setBrand(newbrand)
    setCategories(category)
    setTages(newtags)
},[productState])
console.log([...new Set (brands)],[...new Set (categories)],[...new Set(tags)]);
useEffect(()=>{
    getProducts()
},[sort,tag,brand,category,minprice,maxprice])
    const getProducts=()=>{
        dispatch(getAllProducts({sort,tag,brand,category,minprice,maxprice}))
    }
    return (
        <>
            <Meta title={"Our Store"} />
            <BreadCrumb title="Our Store" />

            <section className="store-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Shop By Categories</h3>
                                <div>
                                    <ul className="ps-0">
                                       {
                                        categories&&[...new Set (categories)].map((item,index)=>{
                                            return<li key={index} onClick={()=>setCategory(item)}>{item}</li>
                                        })
                                       }
                                    </ul>
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Filter By</h3>
                                <div>
                                    <h5 className="sub-title">Availablity</h5>
                                    <div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id=""
                                            />
                                            <label className="form-check-label" htmlFor="">
                                                In Stock (1)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id=""
                                            />
                                            <label className="form-check-label" htmlFor="">
                                                Out of Stock(0)
                                            </label>
                                        </div>
                                    </div>
                                    <h5 className="sub-title">Price</h5>
                                    <div className="d-flex align-items-center gap-10">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="minprice"
                                                id="floatingInput"
                                                placeholder="From"
                                                onChange={(e)=>setMinPrice(e.target.value)}
                                            />
                                            <label htmlFor="floatingInput">From</label>
                                        </div>
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                name="maxprice"

                                                className="form-control"
                                                id="floatingInput1"
                                                placeholder="To"
                                                onChange={(e)=>setMaxPrice(e.target.value)}

                                            />
                                            <label htmlFor="floatingInput1">To</label>
                                        </div>
                                    </div>
                                   
                                   
                                </div>
                            </div>
                            <div className="mt-4 mb-3">
                                <h3 className="sub-title">Product Tags</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                    {
                                        tags&&[...new Set (tags)].map((item,index)=>{
                                            return(
                                                <span key={index} onClick={()=>setTag(item)} className=" badge bg-light text-secondary rounded-3 py-2 px-3">
                                                {item}
                                            </span>
                                            )
                                        })
                                       }
                                        
                                    </div>
                                </div>
                            </div>


                            <div className="mt-4 mb-3">
                                <h3 className="sub-title">Product Tags</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                    {
                                        brands&&[...new Set (brands)].map((item,index)=>{
                                            return(
                                                <span key={index} onClick={()=>setBrands(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                {item}
                                            </span>
                                            )
                                        })
                                       }
                                        
                                    </div>
                                </div>
                            </div>

                            {/* <div className="filter-card mb-3">
                                <h3 className="filter-title">Random Product</h3>
                                <div>
                                    <div className="random-products mb-3 d-flex">
                                        <div className="w-50">
                                            <img
                                                src={watch}
                                                className="img-fluid"
                                                alt="watch"
                                            />
                                        </div>
                                        <div className="w-50">
                                            <h5>
                                                Kids headphones bulk 10 pack multi colored for students
                                            </h5>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={4}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <b>$ 300</b>
                                        </div>
                                    </div>
                                    <div className="random-products d-flex">
                                        <div className="w-50">
                                            <img
                                                src={watch}
                                                className="img-fluid"
                                                alt="watch"
                                            />
                                        </div>
                                        <div className="w-50">
                                            <h5>
                                                Kids headphones bulk 10 pack multi colored for students
                                            </h5>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={4}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <b>$ 300</b>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-9">
                            <div className="filter-sort-grid mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-10">
                                        <p className="mb-0 d-block" style={{ width: "100px" }}>
                                            Sort By:
                                        </p>
                                        <select
                                            name=""
                                            defaultValue={"manula"}
                                            className="form-control form-select"
                                            id=""
                                            onChange={(e)=>setSort(e.target.value)}
                                        >
                                            {/* <option value="manual">Featured</option>
                                            <option value="best-selling">Best selling</option> */}
                                            <option value="title">Alphabetically, A-Z</option>
                                            <option value="-title">
                                                Alphabetically, Z-A
                                            </option>
                                            <option value="price">Price, low to high</option>
                                            <option value="-price">Price, high to low</option>
                                            <option value="createdAt">Date, old to new</option>
                                            <option value="-createdAt">Date, new to old</option>
                                        </select>
                                    </div>
                                    <div className="d-flex align-items-center gap-10">
                                        <p className="totalproducts mb-0">{productState.length} Products</p>
                                        <div className="d-flex gap-10 align-items-center grid">
                                            <img
                                                onClick={() => {
                                                    setGrid(3);
                                                }}
                                                src={gr4}
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(4);
                                                }}
                                                src={gr3}
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(6);
                                                }}
                                                src={gr2}
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />

                                            <img
                                                onClick={() => {
                                                    setGrid(12);
                                                }}
                                                src={gr1}
                                                className="d-block img-fluid"
                                                alt="grid"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="products-list pb-5">
                                <div className="d-flex gap-10 flex-wrap">
                                    <ProductCard 
                                    data={productState?productState:[]} 
                                    grid={grid} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurStore;

