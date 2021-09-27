import { listingListSample } from "../../../constances/data";
import results from "./results.module.scss";
import { HeartOutlined, StarFilled } from "@ant-design/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../../constances";

export const Results = () => {
  const history = useHistory();

  const [listings, setListings] = useState(listingListSample);

  const handleFav = (id) => {};

  return (
    <div className={results.container}>
      <div className="list">
        <p>300 chỗ ở</p>
        <h1>Chỗ ở tại Hà Nội</h1>

        {listings.map((listing) => (
          <div
            className="card"
            key={listing.id}
            onClick={() => history.push(paths.LISTING_VIEW_nId + listing.id)}
          >
            <div className="thumbnail">
              <img src={listing.thumbnail} alt="" />
            </div>

            <div className="content">
              <span>{listing.type}</span>
              <h3>{listing.name}</h3>

              <div className="divider" />

              <div className="rating">
                <StarFilled className="icon" />
                <p>5 (12 đánh giá)</p>
              </div>

              <p className="pricing">
                <span>{listing.price} VND</span> / đêm
              </p>

              <div
                className="fav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFav(listing.id);
                }}
              >
                <HeartOutlined className="icon" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="map">
        <h1>Map</h1>
      </div>
    </div>
  );
};
