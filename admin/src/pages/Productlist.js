import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => b.key - a.key,

  },
  {
    title: "Title",
    dataIndex: "title",
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
    onFilter: (value, record) => record?.title?.toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this?.searchInput.select());
      }
    },
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Sold",
    dataIndex: "sold",
    sorter: (a, b) => a.sold - b.sold,

  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
    
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  console.log(productState?.quantity,'productSthate');
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      sold: productState[i].sold,
      quantity:productState[i].quantity >= 1 ? productState[i].quantity : "Out of Stock",
      price: `${productState[i].price}`,
      action: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = async(e) => {
   await dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };


  
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setFilteredData(selectedKeys[0] ? data1.filter((record) => record.title.toLowerCase().includes(selectedKeys[0].toLowerCase())) : []);
  };

  const handleReset = (clearFilters) => {

    clearFilters();
    setFilteredData([]);

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
    if (col.dataIndex === 'title') {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex),
      };
    }
    return col;
  });
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default Productlist;
