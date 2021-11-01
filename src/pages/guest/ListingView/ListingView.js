import { useParams } from "react-router-dom";
import listingView from "./listingView.module.scss";
import { useState, useEffect } from "react";
import { requestGet } from "../../../helpers/requestHandler";
import { apis } from "../../../constants";
import { Avatar, Col, Divider, Row, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function ListingView() {
  const { id } = useParams();

  const [listing, setListing] = useState({
    gallery: "[]",
    place: {},
    amenity: [],
    host: {},
  });

  useEffect(() => {
    requestGet(apis.LISTING_GUEST + "/" + id).then((result) => {
      const data = result.data;

      if (data.status) {
        setListing(data.data);
      }
    });
  }, [id]);

  return (
    <div className={listingView["container"]}>
      <div className={listingView["top"]} justify="space-between">
        <h1 className={listingView["head"]}>{listing.name}</h1>

        <Row justify="space-between">
          <p className={listingView["sub-head"]}>{listing.address}</p>

          {/* <span>Lưu</span> */}
        </Row>
      </div>

      <div className={listingView["gallery"]}>
        {JSON.parse(listing.gallery).map((src, i) => (
          <img
            src={src}
            alt=""
            className={listingView["gallery-item"]}
            key={i}
          />
        ))}
      </div>

      <Row className={listingView["mid"]}>
        <Col span={16} style={{ paddingRight: 100 }}>
          <Row align="middle">
            <h2>{listing.place.name}</h2>
            <Tooltip placement="top" title={listing.place.desc}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Row>

          <Row>
            <span className={listingView["num"]}>{listing.guests} khách</span>

            <span className={listingView["num"]}>
              {listing.bedrooms} phòng ngủ
            </span>

            <span className={listingView["num"]}>{listing.beds} giường</span>

            <span className={listingView["num"]}>
              {listing.bathrooms} phòng tắm
            </span>
          </Row>

          <Divider />

          <h2 style={{ marginBottom: 10 }}>Mô tả</h2>
          <p className={listingView["desc"]}>{listing.desc}</p>

          <Divider />

          <h2 style={{ marginBottom: 10 }}>Tiện nghi</h2>
          <Row gutter={[20, 10]}>
            {listing.amenity.map((item) => (
              <Col span={12} key={item.id}>
                <span className={listingView["amenity"]}>{item.name}</span>
              </Col>
            ))}
          </Row>

          <Divider />

          <Row align="middle">
            <Avatar size={60} src={listing.host.avatar}>
              {listing.host.name}
            </Avatar>

            <h3 style={{ marginLeft: 20 }}>Chủ nhà {listing.host.name}</h3>
          </Row>

          {/* <Divider />

          <h2>Đánh giá</h2> */}
        </Col>

        <Col span={8}>
          <h2>Kiểm tra tình trạng</h2>
        </Col>
      </Row>
    </div>
  );
}
