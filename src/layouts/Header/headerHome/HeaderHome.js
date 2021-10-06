import { Link } from "react-router-dom";
import headerHome from "./headerHome.module.scss";
import { paths } from "../../../constants";
import { LogoDark } from "../../../assets/images";
import { useRef, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import UserPopup from "../userPopup/UserPopup";
import { ClickOutside } from "../../../hooks/ClickOutside";

const HeaderHome = () => {
  const userBtnRef = useRef();
  const userPopupRef = useRef();

  const [isUserBtnActive, setIsUserBtnActive] = useState(false);

  ClickOutside({
    ref: userBtnRef,
    onClickOutside: () => {
      userPopupRef.current && userPopupRef.current.hidePopup();
      setIsUserBtnActive(false);
    },
  });

  return (
    <div className={headerHome["container"]}>
      <Link className="logo" to={paths.HOME}>
        <img src={LogoDark} alt="" />
      </Link>

      <div ref={userBtnRef}>
        <div
          className={`user-btn${isUserBtnActive ? " active" : ""}`}
          onClick={() => {
            userPopupRef.current && userPopupRef.current.displayPopup();
            setIsUserBtnActive((bool) => !bool);
          }}
        >
          <UserOutlined className="icon" />
        </div>

        <UserPopup ref={userPopupRef} />
      </div>
    </div>
  );
};

export default HeaderHome;
