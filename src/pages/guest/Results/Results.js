import { listingListSample } from "../../../constances/data";
import results from "./results.module.scss";
import {
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { paths, searchKeys } from "../../../constances";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Results = () => {
  const history = useHistory();
  const query = useQuery();

  const handleFav = (id) => {};

  console.log(searchKeys.DESTINATION, query.get(searchKeys.DESTINATION));
  console.log(searchKeys.CHECKIN, query.get(searchKeys.CHECKIN));
  console.log(searchKeys.CHECKOUT, query.get(searchKeys.CHECKOUT));
  console.log(searchKeys.ADULTS, query.get(searchKeys.ADULTS));
  console.log(searchKeys.CHILDREN, query.get(searchKeys.CHILDREN));
  console.log(searchKeys.INFANTS, query.get(searchKeys.INFANTS));

  return (
    <div className={results.container}>
      <div className="list">
        <p>300 chỗ ở</p>
        <h1>Chỗ ở tại Hà Nội</h1>

        <div className="filters">
          <div className="btn active">
            <span>Loại nơi ở</span>
          </div>

          <div className="btn">
            <span>Giá</span>
          </div>

          <div className="btn">
            <span>Bộ lọc khác</span>
          </div>
        </div>

        {listingListSample.map((listing) => (
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

        <div className="pagination">
          <button
            className="btn"
            onClick={() => console.log("object")}
            disabled
          >
            <LeftOutlined />
          </button>

          <button className="btn active">
            <span>1</span>
          </button>

          <button className="btn">
            <span>2</span>
          </button>

          <button className="btn">
            <RightOutlined />
          </button>
        </div>
      </div>

      <div className="map">
        <h1>Map</h1>
      </div>
    </div>
  );
};
