import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder, getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "SubCity",
    dataIndex: "sub",
  },
  
  {
    title: "HONO",
    dataIndex: "other",
  },

  {
    title: "image",
    dataIndex: "image",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  console.log(orderId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singelorder?.orders);
  console.log(orderState);
   const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
       count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
      city: orderState?.shippinginfo?.city,
      sub: orderState?.shippinginfo?.state,
      sub: orderState?.shippinginfo?.state,
      other: orderState?.shippinginfo?.pincode,
      // action: (
      //   <>
      //     <Link to="/" className=" fs-3 text-danger">
      //       <BiEdit />
      //     </Link>
      //     <Link className="ms-3 fs-3 text-danger" to="/">
      //       <AiFillDelete />
      //     </Link>
      //   </>
      // ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
