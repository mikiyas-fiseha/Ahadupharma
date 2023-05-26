import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
import { deleteAProductSubCategory, getSubCategories } from "../features/subcategory/subcategorySlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => b.key - a.key,
    
  },
  {
    title: "ID",
    dataIndex: "id",
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
    title: "Action",
    dataIndex: "action",
  },
];

const SubCategorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getSubCategories());
  }, []);
  const subCatStat = useSelector((state) => state?.subCategory?.subCategories);
  console.log(subCatStat);
  const data1 = [];
  for (let i = 0; i < subCatStat?.length; i++) {
    data1.push({
      key: i + 1,
      id: subCatStat[i]?._id,

      name: subCatStat[i]?.name,
      action: (
        <>
          <Link
            to={`/admin/subcategory/${subCatStat[i]?._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
     onClick={() => showModal(subCatStat[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCategory = async(e) => {
   await dispatch(deleteAProductSubCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSubCategories());
    }, 100);
  };

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setFilteredData(selectedKeys[0] ? data1.filter((record) => record.name.toLowerCase().includes(selectedKeys[0].toLowerCase())) : []);
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
    if (col.dataIndex === 'name') {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex),
      };
    }
    return col;
  });
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default SubCategorylist;
