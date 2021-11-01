import results from "./results.module.scss";
import { apis, paths, searchKeys } from "../../../constants";
import { useQuery } from "../../../hooks";
import ListingCard from "./components/ListingCard/ListingCard";
import ResultMap from "./components/ResultMap/ResultMap";
import FilterBar from "./components/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { requestPost } from "../../../helpers/requestHandler";
import { Col, Row, Skeleton } from "antd";
// import PaginationBar from "./components/PaginationBar/PaginationBar";

export default function Results() {
  const query = useQuery();
  const history = useHistory();

  const destination = query.get(searchKeys.DESTINATION);
  // const checkin = query.get(searchKeys.CHECKIN);
  // const checkout = query.get(searchKeys.CHECKOUT);
  // const guests = query.get(searchKeys.GUESTS);

  const [listingList, setListingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (destination === null || destination === "") history.push(paths.HOME);
    setIsLoading(true);
    requestPost(apis.LISTING_GUEST, { destination }).then((result) => {
      setListingList(result.data.data);
      setIsLoading(false);
    });
  }, [destination, history]);

  return (
    <div className={results["container"]}>
      <div className="list">
        <p>{listingList.length} chỗ ở</p>

        <h1>Chỗ ở tại {destination}</h1>

        <FilterBar />

        {isLoading ? (
          <Row style={{ marginTop: 20 }} gutter={25}>
            <Col>
              <Skeleton.Avatar
                active={isLoading}
                shape="square"
                style={{ borderRadius: 10, width: 300, height: 250 }}
              />
            </Col>

            <Col>
              <Skeleton.Button
                active={isLoading}
                size="large"
                style={{ borderRadius: 10 }}
              />
            </Col>
          </Row>
        ) : (
          listingList.map((listing) => (
            <ListingCard listing={listing} key={listing.id} />
          ))
        )}

        {/* <PaginationBar /> */}
      </div>

      <ResultMap />
    </div>
  );
}
