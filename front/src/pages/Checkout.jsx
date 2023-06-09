import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../components/images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios'
import { config } from "../utils/axiosconfig";
import { creatAnOrder, emptyUserCart } from "../features/user/userSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";

const shippingSchema = yup.object({
firstName: yup.string().required("First Name is required").max(25, 'First Name must not exceed 25 characters'),
lastName: yup.string().required("Last name is required").max(25, 'Last Name must not exceed 25 characters'),
address: yup.string().required("Address is required"),
city: yup.string().required("City is required"),
state: yup.string().required("State is required"),
country: yup.string().required("Country is required"),
pincode: yup.string().required("Pincode is required"),
other:yup.string().required("other is required"),
mobile:yup.string().required("mobile is required").matches(/^(\+)?\d+$/, 'Mobile must contain only numbers or a plus sign'),
});
const Checkout = () => {
  const dispatch=useDispatch()
  const [totalAmount,setTotalAmount]=useState(null)
  const [shippinginfo,setshippinginfo]=useState(null);
  const [paymentInfo,setPaymentInfo]=useState({razorpayPaymentId:"pay_Lere748iKXyzWc",razorpayOrderId:"pay_Lere748iKXyzWc"})
  const [cartProductState,setCartProductState]=useState([])
  const [prescriptionrequreid,setPrescriptionRequired]=useState(null)

  const cartState=useSelector(state=>state.auth?.cartProducts)
  const imgState = useSelector((state) => state?.upload?.images);
  const authState = useSelector((state) => state?.auth);
console.log(authState?.isSuccess,'order');

  //console.log(cartProductState,'cartProductState')
 //console.log(cartState,"info")
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

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
     address: '',
     city: '',
     state: '',
     country: '',
     mobile:'',
    pincode: '',
    other: '',
    images:'',
    },
    validationSchema:shippingSchema,
    onSubmit: values => {
     // alert(JSON.stringify(values, null, 2));
      setshippinginfo(values)
      //console.log(shippinginfo,"useshippinginfo")
    
    
      //alert(JSON.stringify(values));

      // setTimeout(()=>{
      //   checkOutHandler()

      // },500)

      //dispatch(creatAnOrder({shippinginfo,totalPrice:totalAmount,totalPriceAfterDiscount:totalAmount,orderItems:cartProductState,paymentInfo}))


    },
  });
  useEffect(() => {
      dispatch(creatAnOrder({shippinginfo,totalPrice:totalAmount,totalPriceAfterDiscount:totalAmount,orderItems:cartProductState,paymentInfo}))
      // .then(() => {
      //   emptyCart();
      // });
    
  }, [shippinginfo]);
  
  
  const emptyCart=()=>{
    if (authState?.orderedProduct !== null && authState?.isError === false) {
          dispatch(emptyUserCart(config2))
        }
  }
  const loadScript=(src)=>{
    return new Promise((resolve)=>{
      const script=document.createElement("script")
      script.src=src
      script.onload=()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  useEffect(()=>{
    let items=[]
  
      for (let index = 0; index < cartState?.length; index++) {
      items.push({product:cartState[index].productId._id,quantity:cartState[index].quantity,price:cartState[index].price})
       }
       setCartProductState(items)
    
    },[])
    
  const checkOutHandler=async()=>{
    const res= await loadScript("http://checkout.razorpay.com/v1/checkout.js")
    if(!res){
      alert("Razorpay sdk fails to load ")
      return;
    } 

    const resualt=await axios.post("http://localhost:5000/api/user/order/checkout",'',config)
    if(!resualt){
      alert("sth went wrong")
      return;
    }
    const {amount,id:order_id,currency}=resualt.data.order
    
    const options = {
      key: "rzp_test_8zGNhabZS2i9Wv", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "mikiyas.",
      description: "Test Transaction",
      
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data,config);
          
          setPaymentInfo({razorpayPaymentId: response.razorpay_payment_id,razorpayOrderId: response.razorpay_order_id,})

      },
      prefill: {
          name: "Mikiyas",
          email: "Mikiyas@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "Bole",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

  }

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    //formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [ imgState]);

  
useEffect(()=>{
  let sum=0
  if(cartState){
    for (let index = 0; index <cartState?.length; index++) {
      sum=sum+(Number(cartState[index]?.quantity)*cartState[index].price)
       setTotalAmount(sum)
     }
  }
  },[cartState])


 useEffect(() => {
  if (cartState) {
    const hasPrescriptionRequired = cartState.some(item => item.productId.prescriptionRequired === true);
    setPrescriptionRequired(hasPrescriptionRequired);
  }
}, [cartState]);

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-lg-7 order-2 order-md-1 col-sm-12">
            <div className="checkout-left-data">
              {/* <h3 className="website-name">Mikiyas</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Mikiyas Fiseha (mikiyasfiseha097@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4> */}
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                   name="country"
                   value={formik.values.country}
                   onChange={formik.handleChange("country")}
                   onBlur={formik.handleBlur("country")}
                  
                    className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="Ethiopia"  >
                    Ethiopia
                    </option>
                   
                  </select>
                  <div className="error ms-2 my-1">
                 {formik.touched.country && formik.errors.country}
                  </div>
                </div>
               
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error ms-2 my-1">
                 {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error ms-2 my-1">
                 {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
               
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error ms-2 my-1">
                 {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                  name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                 {formik.touched.city && formik.errors.city}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <select 
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange("state")}
                  onBlur={formik.handleBlur("state")}
                  className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="lideta">Lideta</option>
                    <option value="bole">Bole</option>
                    <option value="nifas-silk-lafto">Nifas Silk-Lafto</option>
                    <option value="kirkos">Kirkos</option>
                    <option value="yeka">Yeka</option>
                    <option value="arada">Arada</option>
                    <option value="gulele">Gulele</option>
                    <option value="kolfe-keranio">Kolfe Keranio</option>
                    <option value="addis-ketema">Addis Ketema</option>
                    <option value="akaki-kality">Akaki-Kality</option>
                  </select>
                  <div className="error ms-2 my-1">
                 {formik.touched.state && formik.errors.state}
                  </div>
                </div>

                {/* to do if not */}
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="House number "
                    className="form-control"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                 {formik.touched.pincode && formik.errors.pincode}
                  </div>
                  </div>
                  <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="lastName"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                 {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="error ms-2 my-1">
                 {formik.touched.other && formik.errors.other}
                  </div>
                </div>
               

                  {
                    prescriptionrequreid?<>       <div className="bg-white border-1 p-5 text-center">
                    <Dropzone
                      onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              Drag 'n' drop some files here, or click to select files
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>
                  <div className="showimages d-flex flex-wrap gap-3">
                    {imgState?.map((i, j) => {
                      return (
                        <div className=" position-relative" key={j}>
                          <button
                            type="button"
                            onClick={() => dispatch(delImg(i.public_id))}
                            className="btn-close position-absolute"
                            style={{ top: "10px", right: "10px" }}
                          ></button>
                          <img src={i.url} alt="" width={200} height={200} />
                        </div>
                      );
                    })}
                  </div></>:""
                  }
           


                
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/product" className="button">
                      Continue to Shopping
                    </Link>

                    <button className="button button2 border-0" type="submit" >Place Order</button>

                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 order-1 order-md-2  col-sm-12">
            <div className="border-bottom py-4">
              {
                cartState&&cartState?.map((item,index)=>{
                  return(
                    <div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {item.quantity}
                    </span>
                    <img className="img-fluid" src={item?.productId?.images[0]?.url} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">{item?.productId?.title}</h5>
                    {/* <p className="total-price">s / #agfgfd</p> */}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total"> {item.price *item.quantity } ETB</h5>
                </div>
              </div>
                  )
                })
              }
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Sub total</p>
                <p className="total-price"> {totalAmount?totalAmount:0} ETB</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Payment Method</p>
                <p className="mb-0 total-price">COD</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price"> {totalAmount?totalAmount:0} ETB</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
