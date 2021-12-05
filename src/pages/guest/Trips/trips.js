import { Tabs, Table, Row, Button } from "antd";
import { apis } from "../../../constants";
import { requestGet } from "../../../helpers/requestHandler";
import { useState, useEffect, useRef } from "react";
import trips from "./trips.module.scss";
export default function Trips() {
  const completed = [
    { title: "ID", key: "guest_id", dataIndex: "guest_id" },

    { title: "CheckIn", key: "checkin", dataIndex: "checkin" },

    { title: "CheckOut", key: "checkout", dataIndex: "checkout" },

    {
      title: "Giá/đêm",
      key: "price",
      dataIndex: "price",
      render: (price) => `${price} đồng`,
    },
    {
      title: "Số khách",
      key: "guests",
      dataIndex: "guests",
    },
    {
      title: "Review",
      key: "review",
      dataIndex: "review",
    },
    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
    },
  ];

  //
  const upcoming = [
    { title: "ID", key: "guest_id", dataIndex: "guest_id" },

    { title: "CheckIn", key: "checkin", dataIndex: "checkin" },

    { title: "CheckOut", key: "checkout", dataIndex: "checkout" },

    {
      title: "Số khách",
      key: "guests",
      dataIndex: "guests",
    },
    {
      title: "Review",
      key: "review",
      dataIndex: "review",
    },
    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
    },
  ];

  const [completedPayout, setCompletedPayout] = useState([]);
  const [upcomingPayout, setUpcomingPayout] = useState([]);

  useEffect(() => {
    requestGet(apis.TRIPS_GUEST_PAST).then((result) => {
      const data = result.data;
      console.log(result);
      if (data.status) {
        setCompletedPayout(
          data.result.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);

  useEffect(() => {
    requestGet(apis.TRIPS_GUEST_UPCOMING).then((result) => {
      const data = result.data;
      console.log(result);
      if (data.status) {
        setUpcomingPayout(
          data.result.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);

  const { TabPane } = Tabs;
  return (
    <div className={trips["container"]}>
      <div className={trips["top"]}>
        <h1>Chuyến đi</h1>
      </div>
      <Tabs type="card">
        <TabPane tab="Completed Payout" key="1">
          <Table dataSource={completedPayout} columns={completed} />
        </TabPane>

        <TabPane tab="Upcoming Payout" key="2">
          <Table dataSource={upcomingPayout} columns={upcoming} />
        </TabPane>
      </Tabs>
    </div>
  );
}
