import { SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { localKeys, paths, searchKeys } from "../../../../constances";
import searchBar from "./searchBar.module.scss";
import { ClickOutside } from "../../../../hooks/ClickOutside";
import { DestinationPopup } from "./DestinationPopup";
import { DateRangePopup } from "./DateRangePopup";
import { GuestsPopup } from "./GuestsPopup";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useEffect } from "react";

const hoverType = {
  in: "IN",
  out: "OUT",
};

const cellId = {
  destination: 1,
  checkinDate: 2,
  checkoutDate: 3,
  guests: 4,
};

export const SearchBar = () => {
  const history = useHistory();

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: "AIzaSyCS_vxW9_sL_plgf0mxmCO40TAaNN94_z4",
    });

  const [cellListHover, setCellListHover] = useState([]);
  const [cellListActive, setCellListActive] = useState([]);
  const [visibleDestination, setVisibleDestination] = useState(false);
  const [visibleStart, setVisibleStart] = useState(false);
  const [visibleDue, setVisibleDue] = useState(false);
  const [visibleGuest, setVisibleGuest] = useState(false);
  const [searchData, setSearchData] = useState({
    [searchKeys.DESTINATION]: "",
    [searchKeys.CHECKIN]: "",
    [searchKeys.CHECKOUT]: "",
    [searchKeys.ADULTS]: 0,
    [searchKeys.CHILDREN]: 0,
    [searchKeys.INFANTS]: 0,
  });
  const [recentSearch, setRecentSearch] = useState(
    localStorage.getItem(localKeys.RECENT_SEARCH)
      ? JSON.parse(localStorage.getItem(localKeys.RECENT_SEARCH))
      : []
  );

  useEffect(() => {
    localStorage.setItem(localKeys.RECENT_SEARCH, JSON.stringify(recentSearch));
  }, [recentSearch]);

  const handleSearch = () => {
    history.push({
      pathname: paths.RESULTS,
      search: `?${searchKeys.DESTINATION}=${
        searchData[searchKeys.DESTINATION]
      }&${searchKeys.CHECKIN}=${searchData[searchKeys.CHECKIN]}&${
        searchKeys.CHECKOUT
      }=${searchData[searchKeys.CHECKOUT]}&${searchKeys.ADULTS}=${
        searchData[searchKeys.ADULTS]
      }&${searchKeys.CHILDREN}=${searchData[searchKeys.CHILDREN]}&${
        searchKeys.INFANTS
      }=${searchData[searchKeys.INFANTS]}`,
    });
  };

  const handleHoverCell = (type, id) => {
    if (type === hoverType.in) {
      setCellListHover([id, id + 1]);
    } else setCellListHover([]);
  };

  const handleActiveCell = (id) => {
    if (id === cellId.destination) setVisibleDestination(true);
    else if (id === cellId.checkinDate) setVisibleStart(true);
    else if (id === cellId.checkoutDate) setVisibleDue(true);
    else if (id === cellId.guests) setVisibleGuest(true);

    setCellListActive([id, id + 1]);
  };

  const hanldeSearch = (e) => {
    const { value } = e.target;
    getPlacePredictions({ input: value });
    setSearchData({
      ...searchData,
      [searchKeys.DESTINATION]: value,
    });
  };

  const handleSelectDesination = (val) => {
    let arr = [...recentSearch];

    setSearchData({
      ...searchData,
      [searchKeys.DESTINATION]: val,
    });

    if (recentSearch.includes(val)) {
      arr.splice(arr.indexOf(val), 1);
    } else if (recentSearch.length === 5) {
      arr.shift();
    }

    arr.push(val);
    setRecentSearch(arr);

    setVisibleDestination(false);
    setCellListHover([]);
    setCellListActive([]);
  };

  const cellContainerProps = {
    cellListHover,
    cellListActive,
    handleHoverCell,
    handleActiveCell,
  };

  return (
    <Row className={searchBar["container"]}>
      <CellContainer
        {...cellContainerProps}
        span={8}
        id={cellId.destination}
        visiblePopover={visibleDestination}
        onClickOutside={() => {
          if (cellListActive[0] === cellId.destination) {
            setVisibleDestination(false);
            setCellListActive([]);
          }
        }}
        abortOnClick
        popupContent={
          <DestinationPopup
            placePredictions={placePredictions}
            isPlacePredictionsLoading={isPlacePredictionsLoading}
            onSelectResult={handleSelectDesination}
            recentSearch={recentSearch}
          />
        }
      >
        <div className="cell">
          <label>Địa điểm</label>
          <input
            type="text"
            value={searchData[searchKeys.DESTINATION]}
            placeholder="Chọn điểm đến"
            onFocus={() => handleActiveCell(cellId.destination)}
            onChange={hanldeSearch}
          />
        </div>
      </CellContainer>

      <CellContainer
        {...cellContainerProps}
        span={5}
        id={cellId.checkinDate}
        visiblePopover={visibleStart}
        onClickOutside={() => {
          if (cellListActive[0] === cellId.checkinDate) {
            setVisibleStart(false);
            setCellListActive([]);
          }
        }}
        popupContent={<DateRangePopup />}
      >
        <div className="cell">
          <label>Nhận phòng</label>

          {searchData[searchKeys.CHECKIN] !== "" ? (
            <p className="data">{searchData[searchKeys.CHECKIN]}</p>
          ) : (
            <p className="placeholder">Chọn ngày</p>
          )}
        </div>
      </CellContainer>

      <CellContainer
        {...cellContainerProps}
        span={5}
        id={cellId.checkoutDate}
        visiblePopover={visibleDue}
        onClickOutside={() => {
          if (cellListActive[0] === cellId.checkoutDate) {
            setVisibleDue(false);
            setCellListActive([]);
          }
        }}
        popupContent={<DateRangePopup />}
      >
        <div className="cell">
          <label>Trả phòng</label>

          {searchData[searchKeys.CHECKOUT] !== "" ? (
            <p className="data">{searchData[searchKeys.CHECKOUT]}</p>
          ) : (
            <p className="placeholder">Chọn ngày</p>
          )}
        </div>
      </CellContainer>

      <CellContainer
        {...cellContainerProps}
        span={6}
        id={cellId.guests}
        visiblePopover={visibleGuest}
        onClickOutside={() => {
          if (cellListActive[0] === cellId.guests) {
            setVisibleGuest(false);
            setCellListActive([]);
          }
        }}
        popupContent={
          <GuestsPopup
            adults={searchData[searchKeys.ADULTS]}
            children={searchData[searchKeys.CHILDREN]}
            infants={searchData[searchKeys.INFANTS]}
            updateAdults={(val) =>
              setSearchData({ ...searchData, [searchKeys.ADULTS]: val })
            }
            updateChildren={(val) =>
              setSearchData({ ...searchData, [searchKeys.CHILDREN]: val })
            }
            updateInfants={(val) =>
              setSearchData({ ...searchData, [searchKeys.INFANTS]: val })
            }
          />
        }
      >
        <Row className="cell">
          <Col flex="auto">
            <label>Khách</label>
            {searchData[searchKeys.ADULTS] +
              searchData[searchKeys.CHILDREN] +
              searchData[searchKeys.INFANTS] >
            0 ? (
              <p className="data">
                {searchData[searchKeys.ADULTS] +
                  searchData[searchKeys.CHILDREN] +
                  searchData[searchKeys.INFANTS]}{" "}
                khách
              </p>
            ) : (
              <p className="placeholder">Thêm người</p>
            )}
          </Col>

          <Col className="btn" onClick={handleSearch} flex="45px">
            <SearchOutlined className="icon" />
          </Col>
        </Row>
      </CellContainer>
    </Row>
  );
};

const CellContainer = ({
  children,
  id,
  visiblePopover,
  onClickOutside,
  cellListHover,
  cellListActive,
  handleHoverCell,
  handleActiveCell,
  span,
  abortOnClick = false,
  popupContent,
  ...props
}) => {
  const ref = useRef();

  ClickOutside({
    ref: ref,
    onClickOutside: onClickOutside,
  });

  return (
    <Col
      {...props}
      ref={ref}
      span={span}
      className={`cell-wrap${cellListHover.includes(id) ? " hover" : ""}${
        visiblePopover && cellListActive[0] === id
          ? " active"
          : cellListActive.includes(id)
          ? " active-next"
          : ""
      }`}
      onMouseEnter={() => handleHoverCell(hoverType.in, id)}
      onMouseLeave={() => handleHoverCell(hoverType.out)}
      onClick={() => !abortOnClick && handleActiveCell(id)}
    >
      {children}
      {visiblePopover && popupContent}
    </Col>
  );
};
