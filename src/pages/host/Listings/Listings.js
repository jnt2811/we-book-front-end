import listings from "./listings.module.scss";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { requestDelete, requestGet } from "../../../helpers/requestHandler";
import { apis } from "../../../constants";
import { DeleteOutlined } from "@ant-design/icons";

export default function Listings() {
  function deleteRequest(id) {
    requestDelete(apis.LISTING_HOST + "/" + id).then((result) => {
      const data = result.data;

      if (data.status) {
        setListingList(
          data.data.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }
  const columns = [
    { title: "ID", key: "id", dataIndex: "id" },
    { title: "Tên nơi ở", key: "name", dataIndex: "name" },
    {
      title: "Giá/đêm",
      key: "price",
      dataIndex: "price",
      render: (price) => `${price} đồng`,
    },
    {
      title: "Hoạt động",
      key: "active",
      dataIndex: "active",
      render: (active) => (active === 1 ? "Hoạt động" : "Tạm dừng"),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "active",
      render: (text, record) => (
        <div>
          <a
            className={listings["deleteIcon"]}
            onClick={() => {
              deleteRequest(record.id);
            }}
          >
            <DeleteOutlined />
          </a>
        </div>
      ),
    },
  ];

  const [listingList, setListingList] = useState([]);

  useEffect(() => {
    requestGet(apis.LISTING_HOST).then((result) => {
      const data = result.data;

      if (data.status) {
        setListingList(
          data.data.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);

  return (
    <div className={listings["container"]}>
      <h1>Danh sách nơi ở</h1>
      <div className={listings["containerOfTable"]}>
        <Table dataSource={listingList} columns={columns} />;
      </div>
    </div>
  );
}
