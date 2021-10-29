import listings from "./listings.module.scss";
import { Table, Row, Button } from "antd";
import { useState, useEffect, useRef } from "react";
import { requestDelete, requestGet } from "../../../helpers/requestHandler";
import { apis } from "../../../constants";
import { DeleteOutlined } from "@ant-design/icons";
import NewListing from "./components/NewListing/NewListing";

export default function Listings() {
  const newListingRef = useRef();
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
          <span
            className={listings["deleteIcon"]}
            onClick={() => {
              deleteRequest(record.id);
            }}
          >
            <DeleteOutlined />
          </span>
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
      <Row justify="space-between" className={listings["top"]}>
        <h1>Danh sách nơi ở</h1>

        <Button
          className={listings["btn"]}
          onClick={() => newListingRef.current.open()}
        >
          Tạo mới
        </Button>
      </Row>

      <Table dataSource={listingList} columns={columns} />

      <NewListing ref={newListingRef} />
    </div>
  );
}
