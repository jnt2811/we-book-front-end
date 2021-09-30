import { SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { GuestsPopup } from "../popups";
import { cellId } from "../searchBarKeys";
import { CellContainer } from "./CellContainer";

export const GuestsCell = forwardRef(
  (
    {
      adultsVal,
      childrenVal,
      infantsVal,
      updateAdults,
      updateChildren,
      updateInfants,
      cellContainerProps,
      handleSearch,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      displayPopup() {
        setVisible(true);
      },
    }));

    const handleClickOutside = () => {
      if (cellContainerProps.cellListActive[0] === cellId.guests) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    const popupContent = (
      <GuestsPopup
        adults={adultsVal}
        children={childrenVal}
        infants={infantsVal}
        updateAdults={updateAdults}
        updateChildren={updateChildren}
        updateInfants={updateInfants}
      />
    );

    return (
      <CellContainer
        {...cellContainerProps}
        span={6}
        id={cellId.guests}
        visiblePopup={visible}
        onClickOutside={handleClickOutside}
        popupContent={popupContent}
      >
        <Row className="cell">
          <Col flex="auto">
            <label>Khách</label>
            {adultsVal + childrenVal + infantsVal > 0 ? (
              <p className="data">
                {adultsVal + childrenVal + infantsVal} khách
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
    );
  }
);
