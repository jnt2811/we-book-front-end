import results from "./results.module.scss";
import { apis, paths, searchKeys } from "../../../constants";
import { useQuery } from "../../../hooks";
import ListingCard from "./components/ListingCard/ListingCard";
import FilterBar from "./components/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { requestPost } from "../../../helpers/requestHandler";
import { Col, Row, Skeleton } from "antd";
import PaginationBar from "./components/PaginationBar/PaginationBar";

export default function Results() {
  const query = useQuery();
  const history = useHistory();

  const destination = query.get(searchKeys.DESTINATION);
  const checkin = query.get(searchKeys.CHECKIN);
  const checkout = query.get(searchKeys.CHECKOUT);
  const guests = query.get(searchKeys.GUESTS);

  const [pageSize, setPageSize] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(0);
  const [listingList, setListingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!destination || destination === "") history.push(paths.HOME);
    setIsLoading(true);
    requestPost(apis.LISTING_GUEST, {
      destination,
      checkin,
      checkout,
      guests,
      offset: offset,
    }).then((result) => {
      const { status } = result.data;

      if (status) {
        const { size, total, listings } = result.data.data;

        setPageSize(size);
        setTotalResults(total);
        setListingList(listings);
      }

      setIsLoading(false);
    });
  }, [checkin, checkout, destination, guests, history, offset]);

  return (
    <div className={results["container"]}>
      <div className="list">
        <p>{totalResults} chỗ ở</p>

        <h1>Chỗ ở tại {destination}</h1>

        <FilterBar />

        <br />

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
          <Row gutter={[20, 20]}>
            {listingList.map((listing) => (
              <Col span={8} key={listing.id}>
                <ListingCard listing={listing} />
              </Col>
            ))}
          </Row>
        )}

        {!isLoading && (
          <PaginationBar
            offset={offset}
            pageSize={pageSize}
            totalResults={totalResults}
            setOffset={setOffset}
          />
        )}
      </div>
    </div>
  );
}
