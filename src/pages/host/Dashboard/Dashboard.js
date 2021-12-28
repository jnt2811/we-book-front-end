import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, notification, Row, Table } from "antd";
import dashboard from "./dashboard.module.scss";
import { requestGet, requestPatch } from "../../../helpers/requestHandler";
import { apis } from "../../../constants";
import { useEffect, useState } from "react";
import moment from "moment";
import { milliToMoment } from "../../../helpers/formatter";

export default function Dashboard() {
  const columns = [
    {
      title: "Thời gian đặt",
      key: "create_at",
      dataIndex: "create_at",
      render: (create_at) =>
        moment(create_at).utcOffset(14).format("DD/MM/YYYY HH:mm"),
    },
    { title: "Khách thuê", key: "guest_name", dataIndex: "guest_name" },
    { title: "Nhà ở", key: "listing_name", dataIndex: "listing_name" },
    {
      title: "Ngày đến",
      key: "checkin",
      dataIndex: "checkin",
      render: (checkin) =>
        milliToMoment(checkin).utcOffset(14).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày đi",
      key: "checkout",
      dataIndex: "checkout",
      render: (checkout) =>
        milliToMoment(checkout).utcOffset(14).format("DD/MM/YYYY"),
    },
    {
      title: "Số lượng khách",
      key: "guests",
      dataIndex: "guests",
      render: (guests) => `${guests} người`,
    },
    {
      title: "Tổng tiền",
      key: "total",
      dataIndex: "total",
      render: (total) => `${total} đ`,
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <Row gutter={10}>
          <Col>
            <Button
              icon={<CheckOutlined />}
              type="primary"
              onClick={() => apiUpdateBooking(id, false)}
            ></Button>
          </Col>

          <Col>
            <Button
              icon={<CloseOutlined />}
              type="primary"
              danger
              onClick={() => apiUpdateBooking(id, true)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    apiGetAllBooking();
  }, []);

  const apiGetAllBooking = async () => {
    try {
      setLoadingTable(true);

      const response = await requestGet(apis.BOOKING);

      if (response.data.status) {
        setDataSource(
          response.data.result.map((booking) => ({
            ...booking,
            key: booking.id,
          }))
        );

        setLoadingTable(false);
      } else {
        console.log("Get all booking fail", response.data);
        setLoadingTable(false);
      }
    } catch (error) {
      console.log("Get all booking error", error);
      setLoadingTable(false);
    }
  };

  const apiUpdateBooking = async (id, is_denied) => {
    try {
      setLoadingTable(true);

      const requestData = {
        id,
        is_denied,
      };

      const response = await requestPatch(apis.BOOKING, requestData);

      if (response.data.status) {
        setDataSource(
          response.data.result.map((booking) => ({
            ...booking,
            key: booking.id,
          }))
        );

        setLoadingTable(false);

        notification.success({
          message: `Bạn đã ${
            is_denied ? "từ chối" : "chấp nhận"
          } yêu cầu đặt phòng`,
          placement: "bottomLeft",
        });
      } else {
        console.log("Update booking fail", response.data);
        setLoadingTable(false);
      }
    } catch (error) {
      console.log("Update booking error", error);
      setLoadingTable(false);
    }
  };

  return (
    <div className={dashboard["container"]}>
      <h1>Bảng điều khiển</h1>

      <br />

      <h3>Thống kê doanh thu</h3>
      <br />

      <h3>Danh sách đặt phòng</h3>
      <br />
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loadingTable}
      />
    </div>
  );
}
