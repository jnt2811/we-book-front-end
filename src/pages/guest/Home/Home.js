import home from "./home.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { paths } from "../../../constances";

export const Home = () => {
  const history = useHistory();

  const handleSearch = () => {
    history.push({
      pathname: paths.RESULTS,
      search: `?destination=hanoi`,
    });
  };

  return (
    <div className={home.container}>
      <div className={home.search_bar}>
        <div className={home.cell}>
          <label>Địa điểm</label>
          <p className={home.input}>Chọn điểm đến</p>
        </div>

        <div className={home.cell}>
          <label>Nhận phòng</label>
          <p className={home.input}>Chọn ngày</p>
        </div>

        <div className={home.cell}>
          <label>Trả phòng</label>
          <p className={home.input}>Chọn ngày</p>
        </div>

        <div className={home.cell}>
          <label>Khách</label>
          <p className={home.input}>Thêm người</p>
        </div>

        <div className={home.btn} onClick={handleSearch}>
          <SearchOutlined className={home.icon} />
        </div>
      </div>
    </div>
  );
};
