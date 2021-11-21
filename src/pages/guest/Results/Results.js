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
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    price: { min: "", max: "" },
    places: [],
    amenities: [],
  });

  // Tìm kiếm khi data tìm kiếm thay đổi
  useEffect(() => {
    if (!destination || destination === "") history.push(paths.HOME);

    requestPost(apis.LISTING_GUEST, {
      destination,
      checkin,
      checkout,
      guests,
      offset: 0,
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
  }, [checkin, checkout, destination, guests, history]);

  // Tìm kiếm khi thay đổi pagination
  useEffect(() => {
    if (!destination || destination === "") history.push(paths.HOME);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return !isLoading ? (
    <div className={results["container"]}>
      <div className="list">
        <p>{totalResults} chỗ ở</p>

        <h1>Chỗ ở tại {destination}</h1>

        <FilterBar />

        <br />

        <Row gutter={[20, 20]}>
          {listingList.map((listing) => (
            <Col span={8} key={listing.id}>
              <ListingCard listing={listing} />
            </Col>
          ))}
        </Row>

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
  ) : (
    <div className={results["container-preview"]}>
      <Skeleton.Button active shape="round" className={results["sub-title"]} />
      <Skeleton.Button
        active
        shape="round"
        size="large"
        className={results["title"]}
      />

      <Row>
        <Skeleton.Button
          active
          shape="round"
          size="large"
          className={results["btn"]}
        />

        <Skeleton.Button
          active
          shape="round"
          size="large"
          className={results["btn"]}
        />

        <Skeleton.Button
          active
          shape="round"
          size="large"
          className={results["btn"]}
        />
      </Row>

      <Row className={results["gallery"]} wrap={false} gutter={20}>
        <Col span={8}>
          <Skeleton.Button
            active
            shape="round"
            className={results["card-image"]}
          />
          <Skeleton active round />
        </Col>

        <Col span={8}>
          <Skeleton.Button
            active
            shape="round"
            className={results["card-image"]}
          />
          <Skeleton active round />
        </Col>

        <Col span={8}>
          <Skeleton.Button
            active
            shape="round"
            className={results["card-image"]}
          />
          <Skeleton active round />
        </Col>
      </Row>
    </div>
  );
}
