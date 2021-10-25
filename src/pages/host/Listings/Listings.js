import listings from "./listings.module.scss";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { requestGet } from "../../../helpers/requestHandler";
import { apis } from "../../../constants";

export default function Listings() {
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
      <Table dataSource={listingList} columns={columns} />;
    </div>
  );
}
