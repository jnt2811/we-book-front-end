import { forwardRef, useImperativeHandle, useState } from "react";
import { DateRangePopup } from "../popups";
import { cellId } from "../searchBarKeys";
import { CellContainer } from "./CellContainer";

export const CheckoutCell = forwardRef(
  ({ checkout, cellContainerProps }, ref) => {
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

          {checkout !== "" ? (
            <p className="data">{checkout}</p>
          ) : (
            <p className="placeholder">Chọn ngày</p>
          )}
        </div>
      </CellContainer>
    );
  }
);
