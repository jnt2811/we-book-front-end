import { SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { GuestsPopup } from "../popups";
import { cellId } from "../searchBarKeys";
import { CellContainer } from "../components/CellContainer";

export const GuestsCell = forwardRef(
  (
    {
      adults,
      children,
      infants,
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
      if (cellContainerProps.cellActive === cellId.guests) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    const popupContent = (
      <GuestsPopup
        adults={adults}
        children={children}
        infants={infants}
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
            {adults + children + infants > 0 ? (
              <p className="data">{adults + children + infants} khách</p>
            ) : (
              <p className="placeholder">Thêm người</p>
            )}
          </Col>

          <Col
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              visible && setVisible(false);
              handleSearch();
            }}
            flex="45px"
          >
            <SearchOutlined className="icon" />
          </Col>
        </Row>
      </CellContainer>
    );
  }
);
