import { Divider, Switch } from "antd";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../../constants";
import {} from "react-router-dom";
import userPopupHome from "./userPopupHome.module.scss";
import userPopupCommon from "./userPopupCommon.module.scss";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const UserPopup = forwardRef((props, ref) => {
  const { pathname } = useLocation();

  const isHost = pathname.slice(0, paths.HOSTING.length) === paths.HOSTING;
  const isAtHome = pathname === paths.HOME;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  useImperativeHandle(ref, () => ({
    displayPopup() {
      setVisible(true);
    },
    hidePopup() {
      setVisible(false);
    },
  }));

  const handleSwitch = () => {
    const path = isHost ? paths.HOME : paths.HOSTING;

    setTimeout(() => {
      window.location.href = path;
    }, 500);
  };

  return (
    visible && (
      <div
        className={
          isAtHome ? userPopupHome["container"] : userPopupCommon["container"]
        }
      >
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
      </div>
    )
  );
});

export default UserPopup;
