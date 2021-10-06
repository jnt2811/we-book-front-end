import header from "./header.module.scss";
import { Link, withRouter } from "react-router-dom";
import { paths } from "../../constants";
import { LogoDark, LogoLight } from "../../assets/images";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { ClickOutside } from "../../hooks/ClickOutside";
import { AccountPopup } from "./AccountPopup";
import { SearchBar } from "../../components/SearchBar/SearchBar";

const Header = ({ location }) => {
  const { pathname } = location;
  const ref = useRef();

  const isAtHome = pathname === paths.HOME;
  const isAtResults = pathname === paths.RESULTS;
  const isAtListingView =
    pathname.slice(0, paths.LISTING_VIEW_nId.length) === paths.LISTING_VIEW_nId;
  const isHost = pathname.slice(0, paths.HOSTING.length) === paths.HOSTING;

  const [isAccBtnActive, setIsAccBtnActive] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  useEffect(() => {
    if (isAccBtnActive) {
      setIsAccBtnActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  ClickOutside({ ref: ref, onClickOutside: () => setIsAccBtnActive(false) });

  return (
    <div className={header[isAtHome ? "container-home" : "container"]}>
      <div className="main">
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
            <AccountPopup isHost={isHost} pathname={pathname} />
          )}
        </div>
      </div>

      {isActiveSearch && <SearchBar />}
    </div>
  );
};

export default withRouter(Header);
