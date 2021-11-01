import listings from "./listings.module.scss";
import { Table, Row, Button, Tag, Col } from "antd";
import { useState, useEffect, useRef } from "react";
import { requestGet } from "../../../helpers/requestHandler";
import { apis } from "../../../constants";
import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import ListingConfig from "./components/ListingConfig/ListingConfig";
import moment from "moment";

export default function Listings() {
  const configRef = useRef();

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

  const columns = [
    { title: "Tên nơi ở", key: "name", dataIndex: "name" },
    {
      title: "Trạng thái",
      key: "active",
      dataIndex: "active",
      render: (active) =>
        active > 0 ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Tạm dừng</Tag>
        ),
    },
    { title: "Vị trí", key: "address", dataIndex: "address" },
    {
      title: "Giá/đêm",
      key: "price",
      dataIndex: "price",
      render: (price) => `${price} đ`,
    },
    {
      title: "Sửa đổi lần cuối",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (updated_at) => moment(updated_at).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "",
      key: "action",
      dataIndex: "active",
      render: (active, listing) => (
        <Row gutter={10}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => configRef.current.open(listing)}
            ></Button>
          </Col>

          <Col>
            <Button icon={<SyncOutlined />} type="primary" danger></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className={listings["container"]}>
      <Row justify="space-between" className={listings["top"]}>
        <h1>Danh sách nơi ở</h1>

        <Button
          className={listings["btn"]}
          onClick={() => configRef.current.open()}
          type="primary"
        >
          Tạo mới
        </Button>
      </Row>

      <Table dataSource={listingList} columns={columns} />

      <ListingConfig ref={configRef} />
    </div>
  );
}
