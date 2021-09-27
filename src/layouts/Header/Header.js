import header from "./header.module.scss";
import { Link, withRouter } from "react-router-dom";
import { paths } from "../../constances";
import { LogoDark, LogoLight } from "../../assets/images";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Divider, Switch } from "antd";

const Header = ({ location }) => {
  const { pathname } = location;
  const ref = useRef();

  const isAtHome = pathname === paths.HOME;

  const [isAccBtnActive, setIsAccBtnActive] = useState(false);

  useEffect(() => {
    if (isAccBtnActive) {
      setIsAccBtnActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) {
      setIsAccBtnActive(false);
    }
    return;
  };

  return (
    <div className={header[isAtHome ? "container-home" : "container"]}>
      <Link className="logo" to={paths.HOME}>
        <img src={isAtHome ? LogoDark : LogoLight} alt="" />
      </Link>

      {!isAtHome && (
        <div className="search-bar">
          <div className="content">
            <p>Tìm kiếm ngay...</p>
          </div>

          <div className="btn">
            <SearchOutlined className="icon" />
          </div>
        </div>
      )}

      <div ref={ref}>
        <div
          className={`btn acc-btn${isAccBtnActive ? " active" : ""}`}
          onClick={() => setIsAccBtnActive((bool) => !bool)}
        >
          <UserOutlined className={header.icon} />
        </div>

        {isAccBtnActive && (
          <div className="dropdown">
            <div className="switch">
              <span>Khách</span>
              <Switch />
              <span>Chủ nhà</span>
            </div>

            <Divider className="divider" />

            <Link className="dropdown-btn">Danh sách yêu thích</Link>
            <Link className="dropdown-btn">Chuyến đi</Link>
            <Link className="dropdown-btn">Tài khoản</Link>

            <Divider className="divider" />

            <span className="dropdown-btn">Đăng xuất</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
