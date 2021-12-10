import pickDateRange from "./pickDateRange.module.scss";
import Calendar from "../../../../../components/Calendar/Canlendar";
import { Button, Col, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PickDateRange = ({ ref }) => {
  return (
    <div className={pickDateRange["container"]} ref={ref}>
      <Row justify="space-between" align="middle">
        <button
          className="nav-btn"
          // onClick={() => setOffset((i) => i - 1)}
          // disabled={offset === 0}
        >
          <LeftOutlined />
        </button>

        <button
          className="nav-btn"
          //  onClick={() => setOffset((i) => i + 1)}
        >
          <RightOutlined />
        </button>
      </Row>

      <Row justify="space-between" gutter={{ sm: 50 }}>
        <Col span={12}>
          <Calendar
            // offset={offset}
            // chosenDate={[checkin, checkout]}
            // onClick={handleSelectDate}
            className={pickDateRange["calendar"]}
          />
        </Col>

        <Col span={12}>
          <Calendar
            // offset={offset + 1}
            // chosenDate={[checkin, checkout]}
            // onClick={handleSelectDate}
            className={pickDateRange["calendar"]}
          />
        </Col>
      </Row>

      <Row justify="end">
        <Button className={pickDateRange["del-btn"]}>Xoá ngày</Button>
      </Row>
    </div>
  );
};

export default PickDateRange;
