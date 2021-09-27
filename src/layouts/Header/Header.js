import header from "./header.module.scss";
import { Link, withRouter } from "react-router-dom";
import { paths } from "../../constances";
import { LogoDark, LogoLight } from "../../assets/images";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Header = ({ location }) => {
  const { pathname } = location;

  const isAtHome = pathname === paths.HOME;

  const [isAccBtnActive, setIsAccBtnActive] = useState(false);

  useEffect(() => {
    if (isAccBtnActive) {
      setIsAccBtnActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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

      <div
        className={`btn acc-btn${isAccBtnActive ? " active" : ""}`}
        onClick={() => setIsAccBtnActive((bool) => !bool)}
      >
        <UserOutlined className={header.icon} />
      </div>
    </div>
  );
};

export default withRouter(Header);
