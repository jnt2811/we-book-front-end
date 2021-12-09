import { Tabs, Table } from "antd";
import { apis } from "../../../constants";
import { requestGet } from "../../../helpers/requestHandler";
import { useState, useEffect } from "react";
import transactions from "./transactions.module.scss";
export default function Transactions() {
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
  const current = [
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

  const [completedPayout, setCompletedPayout] = useState([]);
  const [upcomingPayout, setUpcomingPayout] = useState([]);
  const [currentPayout, setCurrentPayout] = useState([]);

  useEffect(() => {
    requestGet(apis.TRANSACTIONS_HOST_CURRENT).then((result) => {
      const data = result.data;
      console.log(result);
      if (data.status) {
        setCurrentPayout(
          data.result.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);

  useEffect(() => {
    requestGet(apis.TRANSACTIONS_HOST_PAST).then((result) => {
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
    requestGet(apis.TRANSACTIONS_HOST_UPCOMING).then((result) => {
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
    <div className={transactions["container"]}>
      <div className={transactions["top"]}>
        <h1>Lịch sử giao dịch</h1>
      </div>
      <Tabs type="card">
        <TabPane tab="Completed Payout" key="1">
          <Table dataSource={completedPayout} columns={completed} />
        </TabPane>

        <TabPane tab="Upcoming Payout" key="2">
          <Table dataSource={upcomingPayout} columns={upcoming} />
        </TabPane>

        <TabPane tab="Current Payout" key="2">
          <Table dataSource={currentPayout} columns={upcoming} />
        </TabPane>
      </Tabs>
    </div>
  );
}
