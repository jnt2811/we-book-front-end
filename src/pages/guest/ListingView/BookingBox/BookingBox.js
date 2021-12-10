/* eslint-disable no-unused-vars */
import { Button, Col, Divider, Row } from "antd";
import { memo, useRef, useState } from "react";
import bookingBox from "./bookingBox.module.scss";
import { DownOutlined } from "@ant-design/icons";
import cn from "classnames";
import PickDateRange from "./PickDateRange/PickDateRange";
import { ClickOutside } from "../../../../hooks";

const BookingBox = ({ price = 0 }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(0);
  const [visiblePickDate, setVisiblePickDate] = useState(false);
  const [visiblePickGuest, setVisiblePickGuest] = useState(false);
  const dateRangeRef = useRef();

  ClickOutside({
    ref: dateRangeRef,
    onClickOutside: () => setVisiblePickDate(false),
  });

  return (
    <div className={bookingBox["container"]}>
      <Row align="middle" justify="space-between">
        <h3 className={bookingBox["price"]}>
          {price} <span>đ / đêm</span>
        </h3>

        <span>2 đánh giá</span>
      </Row>

      <Row
        className={cn(
          bookingBox["pick-date"],
          visiblePickDate && bookingBox["active"]
        )}
        onClick={() => setVisiblePickDate(true)}
        ref={dateRangeRef}
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

        {visiblePickDate && <PickDateRange />}
      </Row>

      <Divider
        style={{
          margin: 0,
          backgroundColor: `#000000${
            !visiblePickDate && !visiblePickGuest ? "30" : ""
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
        onClick={() => setVisiblePickGuest(true)}
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

      <Button block className={bookingBox["book-btn"]}>
        Đặt phòng
      </Button>

      <div className={bookingBox["price-cal"]}>
        <Row align="middle" justify="space-between" gutter={10}>
          <Col>1000000đ x 4 đêm</Col>
          <Col>4000000đ</Col>
        </Row>

        <Row align="middle" justify="space-between" gutter={10}>
          <Col>Thuế</Col>
          <Col>100000đ</Col>
        </Row>

        <Divider style={{ marginBlock: 15 }} />

        <Row
          align="middle"
          justify="space-between"
          gutter={10}
          className={bookingBox["total"]}
        >
          <Col>Tổng</Col>
          <Col>4100000đ</Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(BookingBox);
