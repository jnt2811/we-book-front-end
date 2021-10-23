import searchBar from "./searchBar.module.scss";
import { Row } from "antd";
import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { paths, searchKeys } from "../../constants";
import { cellId, hoverType } from "./searchBarKeys";
import { DateRangeCell, DestinationCell, GuestsCell } from "./cells";
import CellDivider from "./components/CellDivider";
import moment from "moment";

export default function SearchBar({
  destination = "",
  checkin = "",
  checkout = "",
  guests = 0,
}) {
  const history = useHistory();
  const { pathname } = useLocation();

  const isAtHome = pathname === paths.HOME;

  const destinationKey = searchKeys.DESTINATION;
  const checkinKey = searchKeys.CHECKIN;
  const checkoutKey = searchKeys.CHECKOUT;
  const guestsKey = searchKeys.GUESTS;

  const destinationRef = useRef();
  const guestsRef = useRef();
  const dateRangeRef = useRef();

  const [cellHover, setCellHover] = useState();
  const [cellActive, setCellActive] = useState();
  const [searchData, setSearchData] = useState({
    [destinationKey]: destination,
    [checkinKey]: checkin !== "" ? moment(checkin) : "",
    [checkoutKey]: checkout !== "" ? moment(checkout) : "",
    [guestsKey]: guests,
  });

  const handleSearch = () => {
    if (!!searchData[destinationKey]) {
      const destinationSearch = `${destinationKey}=${searchData[destinationKey]}`;
      const checkinSearch = `${checkinKey}=${
        searchData[checkinKey] !== ""
          ? searchData[checkinKey].toISOString()
          : ""
      }`;
      const checkoutSearch = `${checkoutKey}=${
        searchData[checkoutKey] !== ""
          ? searchData[checkoutKey].toISOString()
          : ""
      }`;
      const guestsSearch = `${guestsKey}=${searchData[guestsKey]}`;

      history.push({
        pathname: paths.RESULTS,
        search: `?${destinationSearch}&${checkinSearch}&${checkoutSearch}&${guestsSearch}`,
      });
    } else destinationRef.current.displayPopup();
  };

  const handleHoverCell = (type, id) => {
    if (type === hoverType.in) setCellHover(id);
    else setCellHover();
  };

  const handleActiveCell = (id) => {
    if (!!id) {
      if (id === cellId.destination) destinationRef.current.displayPopup();
      else if (id === cellId.checkinDate) dateRangeRef.current.displayPopup();
      else if (id === cellId.checkoutDate) dateRangeRef.current.displayPopup();
      else if (id === cellId.guests) guestsRef.current.displayPopup();

      setCellActive(id);
    } else setCellActive();
  };

  const handleSearchData = (key, val) =>
    setSearchData({ ...searchData, [key]: val });

  const cellContainerProps = {
    cellHover,
    cellActive,
    handleHoverCell,
    handleActiveCell,
  };

  return (
    <>
      <Row
        className={searchBar[`container${isAtHome ? "-home" : ""}`]}
        align="middle"
        wrap={false}
      >
        <DestinationCell
          ref={destinationRef}
          destination={searchData[destinationKey]}
          updateDestination={(val) => handleSearchData(destinationKey, val)}
          cellContainerProps={cellContainerProps}
        />

        <CellDivider
          cellActive={cellActive}
          cellHover={cellHover}
          id1={cellId.destination}
          id2={cellId.checkinDate}
        />

        <DateRangeCell
          ref={dateRangeRef}
          checkin={searchData[checkinKey]}
          checkout={searchData[checkoutKey]}
          cellContainerProps={cellContainerProps}
          updateCheckin={(val) => handleSearchData(checkinKey, val)}
          updateCheckout={(val) => handleSearchData(checkoutKey, val)}
        />

        <CellDivider
          cellActive={cellActive}
          cellHover={cellHover}
          id1={cellId.checkoutDate}
          id2={cellId.guests}
        />

        <GuestsCell
          ref={guestsRef}
          guests={searchData[guestsKey]}
          updateGuests={(val) => handleSearchData(guestsKey, val)}
          cellContainerProps={cellContainerProps}
          handleSearch={handleSearch}
        />
      </Row>
    </>
  );
}
