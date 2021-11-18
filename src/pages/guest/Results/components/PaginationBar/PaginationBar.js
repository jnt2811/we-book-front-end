import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import paginationBar from "./paginationBar.module.scss";
import cn from "classnames";
import { useMemo } from "react";

export default function PaginationBar({
  offset = 0,
  pageSize = 1,
  totalResults = 0,
  setOffset = () => {},
}) {
  const pageArr = useMemo(
    () =>
      pageSize > 0
        ? [
            ...Array.apply(null, Array(parseInt(totalResults / pageSize))).map(
              (_, i) => i + 1
            ),
          ]
        : [],
    [pageSize, totalResults]
  );

  return (
    <div className={paginationBar["container"]}>
      <button
        className="btn"
        onClick={() => setOffset((val) => val - 1)}
        disabled={pageArr[0] === offset + 1}
      >
        <LeftOutlined />
      </button>

      {pageArr.map((item) => (
        <button
          className={cn("btn", item === offset + 1 && "active")}
          key={item}
          onClick={() => setOffset(item - 1)}
        >
          <span>{item}</span>
        </button>
      ))}

      <button
        className="btn"
        disabled={pageArr[pageArr.length - 1] === offset + 1}
        onClick={() => setOffset((val) => val + 1)}
      >
        <RightOutlined />
      </button>
    </div>
  );
}
