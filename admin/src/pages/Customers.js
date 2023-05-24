import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletUsers, getUsers } from "../features/cutomers/customerSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
    title: "Name",
    dataIndex: "name",
    // sorter: (a, b) => a.name.length - b.name.length,
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
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state?.customer?.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i].firstname + " " + customerstate[i].lasttname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        action: (
          <>
            {/* <Link to={`/admin/user/${customerstate[i]._id}`} className=" fs-3 text-danger">
              <BiEdit />
            </Link> */}
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(customerstate[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }
const deleteUser = async(e) => {
   await dispatch(deletUsers(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
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
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteUser(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default Customers;
