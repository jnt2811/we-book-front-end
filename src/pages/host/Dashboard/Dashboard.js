import dashboard from "./dashboard.module.scss";
import BookingList from "./BookingList/BookingList";

export default function Dashboard() {
  return (
    <div className={dashboard["container"]}>
      <h1>Bảng điều khiển</h1>

      <br />

      <h3>Thống kê doanh thu</h3>
      <br />

      <BookingList />
    </div>
  );
}
