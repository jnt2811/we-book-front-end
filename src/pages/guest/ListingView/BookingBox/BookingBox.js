/* eslint-disable no-unused-vars */
import { Button, Col, Divider, Row } from "antd";
import { memo, useRef, useState } from "react";
import bookingBox from "./bookingBox.module.scss";
import { DownOutlined } from "@ant-design/icons";
import cn from "classnames";
import PickDateRange from "./PickDateRange/PickDateRange";
import { ClickOutside } from "../../../../hooks";
import PickGuest from "./PickGuest/PickGuest";

const tax_percent = 10;

const BookingBox = ({ price = 0 }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(0);
  const [visiblePickDate, setVisiblePickDate] = useState(false);
  const [visiblePickGuest, setVisiblePickGuest] = useState(false);
  const dateRangeRef = useRef();
  const guestRef = useRef();

  ClickOutside({
    ref: dateRangeRef,
    onClickOutside: () => {
      setVisiblePickDate(false);
    },
  });

  ClickOutside({
    ref: guestRef,
    onClickOutside: () => {
      setVisiblePickGuest(false);
    },
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
            {checkin !== "" ? checkin.format("DD/MM/YYYY") : "Thêm ngày"}
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
            {checkout !== "" ? checkout.format("DD/MM/YYYY") : "Thêm ngày"}
          </p>
        </Col>

        {visiblePickDate && (
          <PickDateRange
            checkin={checkin}
            checkout={checkout}
            updateCheckin={setCheckin}
            updateCheckout={setCheckout}
          />
        )}
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
        ref={guestRef}
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

        {visiblePickGuest && (
          <PickGuest guests={guests} updateGuests={setGuests} />
        )}
      </Row>

      <Button block className={bookingBox["book-btn"]}>
        Đặt phòng
      </Button>

      {checkin !== "" && checkout !== "" && guests !== 0 && (
        <div className={bookingBox["price-cal"]}>
          <Row align="middle" justify="space-between" gutter={10}>
            <Col>
              {price}đ x {checkout.diff(checkin, "days")} đêm
            </Col>
            <Col>{price * checkout.diff(checkin, "days")}đ</Col>
          </Row>

          <Row align="middle" justify="space-between" gutter={10}>
            <Col>Phụ phí</Col>
            <Col>0đ</Col>
          </Row>

          <Divider style={{ marginBlock: 15 }} />

          <Row
            align="middle"
            justify="space-between"
            gutter={10}
            className={bookingBox["total"]}
          >
            <Col>Tổng</Col>
            <Col>{Math.round(price * checkout.diff(checkin, "days"))}đ</Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default memo(BookingBox);
