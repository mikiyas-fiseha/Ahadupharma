import React, { useEffect ,useState} from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder, getOrderByUser, getOrders } from "../features/auth/authSlice";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Modal from 'react-modal';
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
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      maxWidth: '1000%',
      maxHeight: '100%',
      overflow: 'hidden',
    },
  };
const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  console.log(orderId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singelorder?.orders);
  const imagesstatr = useSelector((state) => state?.auth?.singelorder?.orders?.shippinginfo?.images);
console.log(imagesstatr);
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
      mobile: orderState?.shippinginfo?.mobile,

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


  

  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      

    <div className="image-gallery">
      <h2>Prescription Paper</h2>
    <div className="row">
  {imagesstatr && imagesstatr.map((image, index) => (
    <div key={index} className="col-md-2 mb-2">
      <img
        key={index}
        src={image.url}
        alt={`Image ${index + 1}`}
        className="gallery-image img-thumbnail rounded m-2"
        onClick={() => openImage(image.url)}
      />
    </div>
  ))}
</div>

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeImage}
        style={customModalStyles}
        size="xl"
      >
        <img
          src={selectedImage}
          alt="Zoomed Image"
          className="zoomed-image"
        />
      </Modal>
    </div>
    </div>
  );
};

export default ViewOrder;
