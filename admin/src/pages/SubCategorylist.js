import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
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
