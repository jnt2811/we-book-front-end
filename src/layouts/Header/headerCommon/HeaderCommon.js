import { Link, withRouter } from "react-router-dom";
import headerCommon from "./headerCommon.module.scss";
import { paths, searchKeys } from "../../../constants";
import { LogoLight } from "../../../assets/images";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import UserPopup from "../userPopup/UserPopup";
import { ClickOutside, useQuery } from "../../../hooks";
import SearchBar from "../../../components/SearchBar/SearchBar";

const HeaderCommon = ({ location }) => {
  const userBtnRef = useRef();
  const userPopupRef = useRef();
  const query = useQuery();

  const destination = query.get(searchKeys.DESTINATION);
  const checkin = query.get(searchKeys.CHECKIN);
  const checkout = query.get(searchKeys.CHECKOUT);
  const guests = query.get(searchKeys.GUESTS);

  const { pathname } = location;

  const isHost = pathname.slice(0, paths.HOSTING.length) === paths.HOSTING;
  const isAtResults = pathname === paths.RESULTS;
  const isAtListingView =
    pathname.slice(0, paths.LISTING_VIEW_nId.length) === paths.LISTING_VIEW_nId;

  const [isUserBtnActive, setIsUserBtnActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    setIsSearchActive(false);
    setIsUserBtnActive(false);
  }, [location]);

  ClickOutside({
    ref: userBtnRef,
    onClickOutside: () => {
      userPopupRef.current && userPopupRef.current.hidePopup();
      setIsUserBtnActive(false);
    },
  });

  return (
    <>
      <div
        className={
          headerCommon["container"] +
          " " +
          (isSearchActive ? "active-search" : "")
        }
        onClick={() => isSearchActive && setIsSearchActive(false)}
      >
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <div className="main">
            <Link className="logo" to={isHost ? paths.HOSTING : paths.HOME}>
              <img src={LogoLight} alt="" />
            </Link>

            {(isAtResults || isAtListingView) && !isSearchActive && (
              <div
                className="mini-search-bar"
                onClick={() => !isSearchActive && setIsSearchActive(true)}
              >
                <div className="content">
                  <p>Tìm kiếm ngay...</p>
                </div>

                <div className="btn">
                  <SearchOutlined className="icon" />
                </div>
              </div>
            )}

            <div ref={userBtnRef} className="user-wrap">
              <div
                className={`user-btn${isUserBtnActive ? " active" : ""}`}
                onClick={() => {
                  userPopupRef.current && userPopupRef.current.displayPopup();
                  setIsUserBtnActive((bool) => !bool);
                  setIsSearchActive(false);
                }}
              >
                <UserOutlined className="icon" />
              </div>

              <UserPopup ref={userPopupRef} />
            </div>
          </div>

          {isSearchActive && (
            <>
              <SearchBar
                destination={destination}
                checkin={checkin}
                checkout={checkout}
                guests={guests}
              />
              <div style={{ height: "35px" }} />
            </>
          )}
        </div>
      </div>

      <div className={headerCommon["sp-fixed"]} />
    </>
  );
};

export default withRouter(HeaderCommon);
