import { useParams } from "react-router-dom";
import listingView from "./listingView.module.scss";
import { useState, useEffect } from "react";
import { requestGet } from "../../../helpers/requestHandler";
import { apis } from "../../../constants";
import { Col, Row } from "antd";

export default function ListingView() {
  const { id } = useParams();

  const [listing, setListing] = useState({ gallery: "[]" });

  useEffect(() => {
    requestGet(apis.LISTING_GUEST + "/" + id).then((result) => {
      const data = result.data;

      if (data.status) {
        setListing(data.data[0]);
      }
    });
  }, [id]);

  return (
    <div className={listingView["container"]}>
      <div className={listingView["top"]} justify="space-between">
        <h1 className={listingView["head"]}>{listing.name}</h1>

        <Row justify="space-between">
          <p className={listingView["sub-head"]}>{listing.address}</p>

          <span>Lưu</span>
        </Row>
      </div>

      <div className={listingView["gallery"]}>
        {JSON.parse(listing.gallery).map((src) => (
          <img src={src} alt="" className={listingView["gallery-item"]} />
        ))}
      </div>
    </div>
  );
}
