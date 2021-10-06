import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useState } from "react";
import { useLocation } from "react-router";
import { paths } from "../../../constants";
import { Calendar } from "../../Calendar/Canlendar";
import searchBar from "./searchPopup.module.scss";

export const DateRangePopup = ({
  checkin,
  checkout,
  updateCheckin,
  updateCheckout,
  isCheckinActive = false,
  isCheckoutActive = false,
}) => {
  const [offset, setOffset] = useState(0);
  const { pathname } = useLocation();
  const isAtHome = pathname === paths.HOME;

  const handleSelectDate = (val) => {
    if (isCheckinActive) updateCheckin(val);
    else if (isCheckoutActive) updateCheckout(val);
  };

  return (
    <div
      className={
        searchBar["pop-up"] +
        " " +
        searchBar["date-range"] +
        " " +
        (isAtHome ? "home" : "")
      }
    >
      <Row justify="space-between" align="middle">
        <button
          className="nav-btn"
          onClick={() => setOffset((i) => i - 1)}
          disabled={offset === 0}
        >
          <LeftOutlined />
        </button>

        <button className="nav-btn" onClick={() => setOffset((i) => i + 1)}>
          <RightOutlined />
        </button>
      </Row>

      <Row justify="space-between" gutter={{ sm: 50 }}>
        <Col span={12}>
          <Calendar
            offset={offset}
            chosenDate={checkin}
            onClick={handleSelectDate}
          />
        </Col>

        <Col span={12}>
          <Calendar
            offset={offset + 1}
            chosenDate={checkout}
            onClick={handleSelectDate}
          />
        </Col>
      </Row>
    </div>
  );
};
