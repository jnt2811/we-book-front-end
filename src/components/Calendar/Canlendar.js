import { Col, Row } from "antd";
import calendar from "./calendar.module.scss";
import moment from "moment";
import { useMemo } from "react";

const dayNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export default function Calendar({ offset = 0, onClick, chosenDate }) {
  const currentTime = useMemo(() => moment().add(offset, "month"), [offset]);

  const dayList = useMemo(
    () => [
      ...Array.apply(null, Array(42)).map((_, i) => ({
        key: i,
        value: moment(currentTime)
          .startOf("month")
          .day(i + 1),
      })),
    ],
    [currentTime]
  );

  return (
    <div className={calendar["container"]}>
      <h3 className="title">
        tháng {currentTime.format("M")} năm {currentTime.format("YYYY")}
      </h3>

      <Row className="head">
        {dayNames.map((item) => (
          <Col flex={`${100 / 7}%`} key={dayNames.indexOf(item)}>
            <span>{item}</span>
          </Col>
        ))}
      </Row>

      <Row>
        {dayList.map((item) => (
          <Col
            flex={`${100 / 7}%`}
            key={item.key}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="day-wrap">
              <button
                className={`day${
                  item.value.isSame(moment(chosenDate), "day") ? " active" : ""
                }${
                  item.value.format("M") === currentTime.format("M")
                    ? " in-month"
                    : ""
                }${item.value.isSame(moment(), "day") ? " today" : ""}`}
                disabled={item.value.isBefore(moment())}
                onClick={() => onClick(item.value)}
              >
                {item.value.format("D")}
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
