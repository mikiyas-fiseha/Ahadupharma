import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAllProducts, getAProduct } from "../features/products/productSlice";
import Menu from '../navbar/Menu'
import { getUserCart } from "../features/user/userSlice";
import { useGlobalContext } from '../navbar/context';
import { AppProvider } from '../navbar/context';
const Header = () => {
  
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [total,setTotal]=useState(null)
  const CartState=useSelector(state=>state?.auth?.cartProducts)
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.product);
  const [productOtp, setProductOtp] = useState([]);

  const [paginate, setPaginate] = useState(true);

// useEffect(()=>{
//   dispatch(getAllProducts())

// },[productState])

//add
const getTokenFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer"))
: null;

const config2 = {
headers: {
  Authorization: `Bearer ${
    getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
  }`,
  Accept: "application/json",
},
};

useEffect(()=>{
  dispatch(getUserCart(config2))
  
},[])
// add
  useEffect(()=>{
    let sum=0
    
      for (let index = 0; index < CartState?.length; index++) {
        sum=sum+(Number(CartState[index]?.quantity)* Number(CartState[index].price) )
         setTotal(sum)
       }
    
    },[CartState])
  // console.log(CartState);
    useEffect(()=>{
      let data=[]
      for (let index = 0; index < productState?.length; index++) {
        const element = productState[index];
        data.push({id:index,prod:element?._id,name:element?.title})
      }
      setProductOtp(data)
    },[productState])

    // const handelLogOut=()=>{
    //   localStorage.clear()
    //   window.location.reload()
    // }
    const isMobile = window.innerWidth <= 768;
  return (
    <>
     
     <header className="header-top-strip py-3 d-none d-md-block" >
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center justify-content-center">
            {/* logo */}
            <div className="col-sm-6 col-lg-2 div1 order-1 order-md-1 d-none d-md-block">
              <h2>
                <Link className="text-white logo">Ahadu</Link>
              </h2>
            </div>
           
           
            {/* cart and */}
            <div className="col-sm-12 col-lg-5 div2 order-2 order-md-3 ">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {
                  isMobile ? (
                    <div className="col-sm-1" style={{ width: '15px' }}>
  <Menu />
</div>
                  ) : ''
                }
              <div  className="col-sm-4 col-lg-2 div1 float-start">
              <h2>
                <Link to={"/"} className="text-white logo d-md-none d-lg-none">Ahadu</Link>
              </h2>
            </div>
                 <div className="d-none d-md-block">
                     <Link to="/wishlist" class="d-flex align-items-center gap-10 text-white">
                    <img src={wishlist} alt="wishlist" />
                     <p class="mb-0">
                        Favourite <br /> wishlist
                      </p>
                     </Link>
                 </div>
                <div>
                  <Link
                    to={authState.user===null? "/login":"/user-info"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                   {
                    authState.user===null? <p className="mb-0">
                    Log in <br /> My Account
                  </p>: <p className="mb-0">
                      Welcome<br/>{authState?.user?.firstname}
                    </p>
                   }
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{CartState?.length ?CartState?.length:0}</span>
                      <p className="mb-0">$ {total ?total:0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-lg-5 div13 order-2 col-md-4">
              <div className="input-group search">
              <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        onChange={(selected)=>{
          navigate(`/product/${selected[0]?.prod}`)
          dispatch(getAProduct(selected[0]?.prod))
        }}
        options={productOtp}
        paginate={paginate}
        minLength={1}//same caracter
        labelKey={"name"}
        placeholder="Search product here..."
      />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {
                  isMobile ? (
              ''
                  ) :   <Menu />

                }
         
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-20 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/" className='d-none d-md-block'>Home</NavLink>
                    <NavLink to="/product" >Our Store</NavLink>
                    <NavLink to="/blogs" >Blogs</NavLink>
                    {/* <NavLink to="/my-orders">My ORDERD</NavLink> */}

                    <NavLink to="/contact" className='d-none d-md-block'>Contact</NavLink>
                    {/* <button onClick={handelLogOut} className="border border-0 bg-transparent text-white text-uppercase" type="button">LogOut</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
     
    </>
  );
};

export default Header;
