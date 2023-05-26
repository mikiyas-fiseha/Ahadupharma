// import React, { useEffect } from "react";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { getOrders, updateAOrder } from "../features/auth/authSlice";
// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//     sorter: (a, b) => b.key - a.key,
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//   },

//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

// const Orders = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getOrders());
//   }, []);
//   const orderState = useSelector((state) => state.auth?.orders?.orders);
// console.log(orderState);
//   const data1 = [];
//   for (let i = 0; i < orderState?.length; i++) {
//     data1.push({
//       key: i + 1,
//       name: orderState[i]?.shippinginfo?.firstName,
//       product: (
//         <Link to={`/admin/order/${orderState[i]?._id}`}>
//           View Orders
//         </Link>
//       ),
//       amount: orderState[i]?.totalPrice,
//       date: new Date(orderState[i]?.createdAt).toLocaleString(),
//       action: (
//         <>
//            <select name="" defaultValue={orderState[i]?.orderStatus} onClick={(e)=>updateOrderStatus(orderState[i]?._id,e.target.value)} className="form-control form-select">
//             <option value="Confirmed">Confirmed</option>
//             <option value="Pending"  selected >Pending</option>
//             <option value="Rejected"  selected >Rejected</option>
//             <option value="Out for delivery">Out for delivery</option>
//             <option value="Deliverd">Deliverd</option>
//           </select>
//         </>
//       ),
//     });
//   }

//   const updateOrderStatus=(a,b)=>{
// console.log(a,b);
//     dispatch(updateAOrder({id:a,status:b}))
//   }
//   // const reversedData = [...data].reverse();
//   return (

//     <div>
//       <h3 className="mb-4 title">Orders</h3>
//       <div>{<Table columns={columns} dataSource={data1} />}</div>
//     </div>
//   );
// };

// export default Orders;










import React, { useEffect,useState } from "react";
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: "Name",
    dataIndex: "name",
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search name"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this?.searchInput.select());
      }
    },
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setFilteredData(selectedKeys[0] ? data1.filter((record) => record.name.toLowerCase().includes(selectedKeys[0].toLowerCase())) : []);
  };

  const handleReset = (clearFilters) => {

    clearFilters();
    setFilteredData([]);
    dispatch(getOrders());

  };

  const searchInput = React.createRef();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) => filteredData.length > 0 ? (
      filteredData.find((record) => record[dataIndex] === text) ? (
        <span style={{ color: 'red' }}>{text}</span>
      ) : (
        text
      )
    ) : (
      text
    ),
  });

  const columnsWithSearch = columns.map((col) => {
    if (col.dataIndex === 'name') {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex),
      };
    }
    return col;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth?.orders?.orders);
console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.shippinginfo?.firstName,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
           <select name="" defaultValue={orderState[i]?.orderStatus} onClick={(e)=>updateOrderStatus(orderState[i]?._id,e.target.value)} className="form-control form-select">
            <option value="Confirmed">Confirmed</option>
            <option value="Pending"  selected >Pending</option>
            <option value="Rejected"  selected >Rejected</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Deliverd">Deliverd</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus=(a,b)=>{
console.log(a,b);
    dispatch(updateAOrder({id:a,status:b}))
  }
  return (

    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
