import header from "./header.module.scss";
import { Link, withRouter } from "react-router-dom";
import { paths } from "../../constances";
import { LogoDark, LogoLight } from "../../assets/images";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Divider, Switch } from "antd";
import { ClickOutside } from "../../hooks/ClickOutside";

const Header = ({ location }) => {
  const { pathname } = location;
  const ref = useRef();

  const isAtHome = pathname === paths.HOME;
  const isAtResults = pathname === paths.RESULTS;
  const isAtListingView =
    pathname.slice(0, paths.LISTING_VIEW_nId.length) === paths.LISTING_VIEW_nId;
  const isHost = pathname.slice(0, paths.HOSTING.length) === paths.HOSTING;

  const [isAccBtnActive, setIsAccBtnActive] = useState(false);

  useEffect(() => {
    if (isAccBtnActive) {
      setIsAccBtnActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  ClickOutside({ ref: ref, onClickOutside: () => setIsAccBtnActive(false) });

  const handleSwitch = () => {
    const path = isHost ? paths.HOME : paths.HOSTING;

    setTimeout(() => {
      window.location.href = path;
    }, 500);
  };

  return (
    <div className={header[isAtHome ? "container-home" : "container"]}>
      <Link className="logo" to={isHost ? paths.HOSTING : paths.HOME}>
        <img src={isAtHome ? LogoDark : LogoLight} alt="" />
      </Link>

      {(isAtResults || isAtListingView) && (
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
            <>
              <div className="switch">
                <span>Khách</span>
                <Switch defaultChecked={isHost} onChange={handleSwitch} />
                <span>Chủ nhà</span>
              </div>

              <Divider className="divider" />

              {isHost ? (
                <>
                  <Link
                    className={`dropdown-btn${
                      pathname === paths.LISTINGS ? " active" : ""
                    }`}
                    to={paths.LISTINGS}
                  >
                    Quản lý nhà/phòng cho thuê
                  </Link>

                  <Link
                    className={`dropdown-btn${
                      pathname === paths.LISTING_NEW ? " active" : ""
                    }`}
                    to={paths.LISTING_NEW}
                  >
                    Tạo mục cho thuê mới
                  </Link>

                  <Link
                    className={`dropdown-btn${
                      pathname === paths.HISTORY ? " active" : ""
                    }`}
                    to={paths.HISTORY}
                  >
                    Lịch sử giao dịch
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className={`dropdown-btn${
                      pathname === paths.FAV_LIST ? " active" : ""
                    }`}
                    to={paths.FAV_LIST}
                  >
                    Danh sách yêu thích
                  </Link>

                  <Link
                    className={`dropdown-btn${
                      pathname === paths.TRIPS ? " active" : ""
                    }`}
                    to={paths.TRIPS}
                  >
                    Chuyến đi
                  </Link>
                </>
              )}

              <Divider className="divider" />

              <Link
                className={`dropdown-btn${
                  pathname === paths.PROFILE ? " active" : ""
                }`}
                to={paths.PROFILE}
              >
                Hồ sơ
              </Link>

              <Link
                className={`dropdown-btn${
                  pathname === paths.ACCOUNT ? " active" : ""
                }`}
                to={paths.ACCOUNT}
              >
                Tài khoản
              </Link>

              <Divider className="divider" />

              <span className="dropdown-btn">Đăng xuất</span>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
