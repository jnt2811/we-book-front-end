import { Col } from "antd";
import { useRef } from "react";
import { ClickOutside } from "../../../../../hooks/ClickOutside";
import { hoverType } from "../searchBarKeys";

export const CellContainer = ({
  children,
  id,
  visiblePopup,
  onClickOutside,
  cellListHover,
  cellListActive,
  handleHoverCell,
  handleActiveCell,
  span,
  abortOnClick = false,
  popupContent,
  ...props
}) => {
  const ref = useRef();

  ClickOutside({
    ref: ref,
    onClickOutside: onClickOutside,
  });

  return (
    <Col
      {...props}
      ref={ref}
      span={span}
      className={`cell-wrap${cellListHover.includes(id) ? " hover" : ""}${
        visiblePopup && cellListActive[0] === id
          ? " active"
          : cellListActive.includes(id)
          ? " active-next"
          : ""
      }`}
      onMouseEnter={() => handleHoverCell(hoverType.in, id)}
      onMouseLeave={() => handleHoverCell(hoverType.out)}
      onClick={() => !abortOnClick && handleActiveCell(id)}
    >
      {children}
      {visiblePopup && popupContent}
    </Col>
  );
};
