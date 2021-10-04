import { Col } from "antd";
import { useRef } from "react";
import { ClickOutside } from "../../../../../hooks/ClickOutside";
import { hoverType } from "../searchBarKeys";

export const CellContainer = ({
  children,
  id,
  visiblePopup,
  onClickOutside,
  cellActive,
  handleHoverCell,
  handleActiveCell,
  span,
  popupContent,
  abortOnClick = false,
}) => {
  const ref = useRef();

  onClickOutside !== null &&
    ClickOutside({
      ref: ref,
      onClickOutside: onClickOutside,
    });

  return (
    <Col
      ref={ref}
      span={span}
      className={`cell-wrap${cellActive === id ? " active" : ""}`}
      onMouseEnter={() => handleHoverCell(hoverType.in, id)}
      onMouseLeave={() => handleHoverCell(hoverType.out)}
      onClick={() => !abortOnClick && handleActiveCell(id)}
    >
      <div className="cell">
        {children}
        {visiblePopup && popupContent}
      </div>
    </Col>
  );
};
