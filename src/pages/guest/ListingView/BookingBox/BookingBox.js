import { Col, Divider, Row } from "antd";
import { memo, useState } from "react";
import bookingBox from "./bookingBox.module.scss";
import Calendar from "../../../../components/Calendar/Canlendar";
import { DownOutlined } from "@ant-design/icons";
import cn from "classnames";

const BookingBox = ({ price = 0 }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(0);
  const [visiblePickDate, setVisiblePickDate] = useState(false);
  const [visiblePickGuest, setVisiblePickGuest] = useState(false);

  return (
    <div className={bookingBox["container"]}>
      <h3 className={bookingBox["price"]}>
        {price} <span>đ / đêm</span>
      </h3>

      <Row
        className={cn(
          bookingBox["pick-date"],
          visiblePickDate && bookingBox["active"]
        )}
      >
        <Col span={12} className={bookingBox["left-col"]}>
          <label>Nhận phòng</label>
          <p
            className={cn(
              bookingBox["data"],
              checkin !== "" && bookingBox["filled"]
            )}
          >
            Thêm ngày
          </p>
        </Col>

        <Col span={12} className={bookingBox["right-col"]}>
          <label>Trả phòng</label>
          <p
            className={cn(
              bookingBox["data"],
              checkout !== "" && bookingBox["filled"]
            )}
          >
            Thêm ngày
          </p>
        </Col>
      </Row>

      <Divider
        style={{
          margin: 0,
          backgroundColor: `#000000${
            !visiblePickDate && !visiblePickGuest && "30"
          }`,
        }}
      />

      <Row
        className={cn(
          bookingBox["pick-guest"],
          visiblePickGuest && bookingBox["active"]
        )}
        align="middle"
        justify="space-between"
      >
        <Col>
          <label>Khách</label>
          <p
            className={cn(
              bookingBox["data"],
              guests !== 0 && bookingBox["filled"]
            )}
          >
            {guests === 0 ? "Thêm khách" : `${guests} khách`}
          </p>
        </Col>

        <Col>
          <DownOutlined />
        </Col>
      </Row>

      <Calendar offset={1} className={bookingBox["calendar"]} />
    </div>
  );
};

export default memo(BookingBox);
