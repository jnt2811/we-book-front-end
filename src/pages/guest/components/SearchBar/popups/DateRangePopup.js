import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useState } from "react";
import { Calendar } from "../../Calendar/Canlendar";
import searchBar from "../searchBar.module.scss";

export const DateRangePopup = () => {
  const [offset, setOffset] = useState(0);

  return (
    <div className={searchBar["pop-up"] + " " + searchBar["date-range"]}>
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
          <Calendar offset={offset} />
        </Col>

        <Col span={12}>
          <Calendar offset={offset + 1} />
        </Col>
      </Row>
    </div>
  );
};
