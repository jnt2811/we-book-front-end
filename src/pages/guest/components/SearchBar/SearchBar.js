import searchBar from "./searchBar.module.scss";
import { Row } from "antd";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { paths, searchKeys } from "../../../../constances";
import { cellId, hoverType } from "./searchBarKeys";
import {
  CheckinCell,
  CheckoutCell,
  DestinationCell,
  GuestsCell,
} from "./cells";
import { DateRangePopup } from "./popups";

export const SearchBar = () => {
  const history = useHistory();

  const destinationKey = searchKeys.DESTINATION;
  const checkinKey = searchKeys.CHECKIN;
  const checkoutKey = searchKeys.CHECKOUT;
  const adultsKey = searchKeys.ADULTS;
  const childrenKey = searchKeys.CHILDREN;
  const infantsKey = searchKeys.INFANTS;

  const destinationRef = useRef();
  const checkinRef = useRef();
  const checkoutRef = useRef();
  const guestsRef = useRef();

  const [cellListHover, setCellListHover] = useState([]);
  const [cellListActive, setCellListActive] = useState([]);
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
      const checkinSearch = `${checkinKey}=${searchData[checkinKey]}`;
      const checkoutSearch = `${checkoutKey}=${searchData[checkoutKey]}`;
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
    if (type === hoverType.in) setCellListHover([id, id + 1]);
    else setCellListHover([]);
  };

  const handleActiveCell = (id) => {
    if (!!id) {
      if (id === cellId.destination) destinationRef.current.displayPopup();
      else if (id === cellId.checkinDate) checkinRef.current.displayPopup();
      else if (id === cellId.checkoutDate) checkoutRef.current.displayPopup();
      else if (id === cellId.guests) guestsRef.current.displayPopup();

      setCellListActive([id, id + 1]);
    } else setCellListActive([]);
  };

  const handleSearchData = (key, val) =>
    setSearchData({ ...searchData, [key]: val });

  const cellContainerProps = {
    cellListHover,
    cellListActive,
    handleHoverCell,
    handleActiveCell,
  };

  return (
    <>
      <Row className={searchBar["container"]}>
        <DestinationCell
          ref={destinationRef}
          destination={searchData[destinationKey]}
          updateDestination={(val) => handleSearchData(destinationKey, val)}
          cellContainerProps={cellContainerProps}
        />

        <CheckinCell
          ref={checkinRef}
          checkin={searchData[checkinKey]}
          cellContainerProps={cellContainerProps}
        />

        <CheckoutCell
          ref={checkoutRef}
          checkout={searchData[checkoutKey]}
          cellContainerProps={cellContainerProps}
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

      <DateRangePopup />
    </>
  );
};
