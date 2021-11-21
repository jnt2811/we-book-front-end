import { StarFilled } from "@ant-design/icons";
import { memo } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../../constants";
import listingCard from "./listingCard.module.scss";

const ListingCard = ({ listing }) => {
  return (
    <Link
      className={listingCard["container"]}
      to={paths.LISTING_VIEW_nId + listing.id}
    >
      <div className="thumbnail">
        <img
          src={!!listing.gallery ? JSON.parse(listing.gallery)[0] : undefined}
          alt=""
        />
      </div>

      <div className="content">
        <div className="rating">
          <StarFilled className="icon" />
          {/* <p>5 (12 đánh giá)</p> */}
          <p>(Chưa có đánh giá)</p>
        </div>

        <h3>{listing.name || "Unknowned Name"}</h3>

        <p>{listing.type || "Unknowned Type"}</p>

        <p>{listing.address || "Unknowned Address"}</p>

        <p className="pricing">
          <span>{listing.price || "0"} VND</span> / đêm
        </p>
      </div>
    </Link>
  );
};

export default memo(ListingCard);
