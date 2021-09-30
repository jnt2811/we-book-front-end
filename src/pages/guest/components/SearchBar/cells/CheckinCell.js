import { forwardRef, useImperativeHandle, useState } from "react";
import { DateRangePopup } from "../popups";
import { cellId } from "../searchBarKeys";
import { CellContainer } from "./CellContainer";

export const CheckinCell = forwardRef(
  ({ checkinVal, cellContainerProps }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      displayPopup() {
        setVisible(true);
      },
    }));

    const handleClickOutside = () => {
      if (cellContainerProps.cellListActive[0] === cellId.checkinDate) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    const popupContent = <DateRangePopup />;

    return (
      <CellContainer
        {...cellContainerProps}
        span={5}
        id={cellId.checkinDate}
        visiblePopup={visible}
        onClickOutside={handleClickOutside}
        popupContent={popupContent}
      >
        <div className="cell">
          <label>Nhận phòng</label>

          {checkinVal !== "" ? (
            <p className="data">{checkinVal}</p>
          ) : (
            <p className="placeholder">Chọn ngày</p>
          )}
        </div>
      </CellContainer>
    );
  }
);
