import { forwardRef, useImperativeHandle, useState } from "react";
import { DateRangePopup } from "../popups";
import { cellId } from "../searchBarKeys";
import { CellContainer } from "./CellContainer";

export const CheckoutCell = forwardRef(
  ({ checkoutVal, cellContainerProps }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      displayPopup() {
        setVisible(true);
      },
    }));

    const handleClickOutside = () => {
      if (cellContainerProps.cellListActive[0] === cellId.checkoutDate) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    const popupContent = <DateRangePopup />;

    return (
      <CellContainer
        {...cellContainerProps}
        span={5}
        id={cellId.checkoutDate}
        visiblePopup={visible}
        onClickOutside={handleClickOutside}
        popupContent={popupContent}
      >
        <div className="cell">
          <label>Trả phòng</label>

          {checkoutVal !== "" ? (
            <p className="data">{checkoutVal}</p>
          ) : (
            <p className="placeholder">Chọn ngày</p>
          )}
        </div>
      </CellContainer>
    );
  }
);
