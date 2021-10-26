import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import paginationBar from "./paginationBar.module.scss";

export default function PaginationBar() {
  return (
    <div className={paginationBar["container"]}>
      <button className="btn" onClick={() => console.log("object")} disabled>
        <LeftOutlined />
      </button>

      <button className="btn active">
        <span>1</span>
      </button>

      <button className="btn">
        <span>2</span>
      </button>

      <button className="btn">
        <RightOutlined />
      </button>
    </div>
  );
}
