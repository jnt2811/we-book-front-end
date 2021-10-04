import searchBar from "./searchBar.module.scss";
import { Row } from "antd";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { paths, searchKeys } from "../../../../constances";
import { cellId, hoverType } from "./searchBarKeys";
import { DateRangeCell, DestinationCell, GuestsCell } from "./cells";
import { CellDivider } from "./components/CellDivider";

export const SearchBar = () => {
  const history = useHistory();

  const destinationKey = searchKeys.DESTINATION;
  const checkinKey = searchKeys.CHECKIN;
  const checkoutKey = searchKeys.CHECKOUT;
  const adultsKey = searchKeys.ADULTS;
  const childrenKey = searchKeys.CHILDREN;
  const infantsKey = searchKeys.INFANTS;

  const destinationRef = useRef();
  const guestsRef = useRef();
  const dateRangeRef = useRef();

  const [cellHover, setCellHover] = useState();
  const [cellActive, setCellActive] = useState();
  const [searchData, setSearchData] = useState({
    [destinationKey]: "",
    [checkinKey]: "",
    [checkoutKey]: "",
    [adultsKey]: 0,
    [childrenKey]: 0,
    [infantsKey]: 0,
  });

  const handleSearch = () => {
    if (!!searchData[destinationKey]) {
      const destinationSearch = `${destinationKey}=${searchData[destinationKey]}`;
      const checkinSearch = `${checkinKey}=${searchData[checkinKey].format(
        "DD/MM/YYYY"
      )}`;
      const checkoutSearch = `${checkoutKey}=${searchData[checkoutKey].format(
        "DD/MM/YYYY"
      )}`;
      const adultsSearch = `${adultsKey}=${searchData[adultsKey]}`;
      const childrenSearch = `${childrenKey}=${searchData[childrenKey]}`;
      const infantsSearch = `${infantsKey}=${searchData[infantsKey]}`;

      history.push({
        pathname: paths.RESULTS,
        search: `?${destinationSearch}&${checkinSearch}&${checkoutSearch}&${adultsSearch}&${childrenSearch}&${infantsSearch}`,
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
      <Row className={searchBar["container"]} align="middle" wrap={false}>
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
          adults={searchData[adultsKey]}
          children={searchData[childrenKey]}
          infants={searchData[infantsKey]}
          updateAdults={(val) => handleSearchData(adultsKey, val)}
          updateChildren={(val) => handleSearchData(childrenKey, val)}
          updateInfants={(val) => handleSearchData(infantsKey, val)}
          cellContainerProps={cellContainerProps}
          handleSearch={handleSearch}
        />
      </Row>
    </>
  );
};
