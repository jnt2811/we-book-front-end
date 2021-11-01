// import { HeartOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { paths } from "../../../../../constants";
import listingCard from "./listingCard.module.scss";

export default function ListingCard({ listing }) {
  return (
    <Link
      className={listingCard["container"]}
      to={paths.LISTING_VIEW_nId + listing.id}
    >
      <div className="thumbnail">
        <img src={listing.thumbnail} alt="" />
      </div>

      <div className="content">
        {/* <span>{listing.type}</span> */}
        <h3>{listing.name}</h3>

        <div className="divider" />

        <div className="rating">
          {/* <StarFilled className="icon" />
          <p>5 (12 đánh giá)</p> */}
        </div>

        <p className="pricing">
          <span>{listing.price} VND</span> / đêm
        </p>

        <div
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation();
            // handleFav(listing.id);
          }}
        >
          {/* <HeartOutlined className="icon" /> */}
        </div>
      </div>
    </Link>
  );
}
