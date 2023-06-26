import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from '../features/user/userSlice';
import Meta from '../components/Meta';

const Orders = () => {
  const dispatch=useDispatch()
  const orderState=useSelector(state=>state?.auth?.getorderedProduct?.orders)
  console.log(orderState,"orderState")

  useEffect(()=>{
    dispatch(getOrders())
  },[])
  return (
   <>
      <Meta title={"Order"} />

      <BreadCrumb title="My Order" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-3">
                        <h5>ORDER iD</h5>
                    </div>
                    <div className="col-3">
                        <h5>AMOUNT</h5>
                    </div>
                    <div className="col-3">
                        <h5>TOTAL AMOUNT AFTER DISCOUNT</h5>
                    </div>
                    <div className="col-3">
                        <h5>STATUS</h5>
                    </div>
                </div>
                
            </div>

            <div className="col-12 mt-3">
            {
                orderState&& orderState?.map((item,index)=>{
                    return(
                        <div style={{backgroundColor:"#febd69"}} className="row my-3 pt-3" key={index}>
                        <div className="col-3">
                            <p>{item._id}</p>
                        </div>
                        <div className="col-3">
                            <p>{item.totalPrice}</p>
                        </div>
                        <div className="col-3">
                        <p>{item.totalPriceAfterDiscount}</p>

                        </div>
                        <div className="col-3">
                        <p>{item.orderStatus}</p>

                        </div>
                        <div className="col-12">
                            <div className="row py-3" style={{backgroundColor:"#232f3e"}} >
                            <div className="col-3">
                            <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-3">
                            <h6 className="text-white">quantity</h6>
                        </div>
                        <div className="col-3">
                            <h6 className="text-white">Price</h6>
                        </div>
                        <div className="col-3">
                            <h6 className="text-white">Total</h6>
                        </div>
                     {
                       item&& item?.orderItems?.map((i,index)=>{
                            return(
                                <div className="col-12">
                                <div className="row  p-3"  >
                                <div className="col-3">
                                <p className="text-white">{i?.product?.title}</p>
                            </div>
                            <div className="col-3">
                                <p className="text-white">{i?.quantity}</p>
                            </div>
                            <div className="col-3">
                                <p className="text-white">{i?.price}</p>
                            </div>
                            <div className="col-3 text-white">
                                <p>{i?.quantity*i?.price}</p>
                            </div>
        
                                </div>
                            </div>
                            )
                        })
                     }
    
                            </div>
                        </div>
                    </div>
                    )
                })
            }
           
           
            </div>
        </div>
      </Container>

   </>
  )
}

export default Orders