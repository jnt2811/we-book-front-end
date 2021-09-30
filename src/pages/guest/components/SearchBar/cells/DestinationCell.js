import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DestinationPopup } from "../popups";
import { cellId } from "../searchBarKeys";
import { CellContainer } from "./CellContainer";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { localGet, localSet } from "../../../../../helpers/localHelper";
import { localKeys } from "../../../../../constances";

export const DestinationCell = forwardRef(
  ({ destinationVal, handleSearchData, cellContainerProps }, ref) => {
    const { placePredictions, isPlacePredictionsLoading, getPlacePredictions } =
      usePlacesService({
        apiKey: process.env.GOOGLE_API_KEY,
      });

    const [visible, setVisible] = useState(false);
    const [recentSearch, setRecentSearch] = useState(
      localGet(localKeys.RECENT_SEARCH, [])
    );

    useEffect(() => {
      localSet(localKeys.RECENT_SEARCH, recentSearch);
    }, [recentSearch]);

    useImperativeHandle(ref, () => ({
      displayPopup() {
        setVisible(true);
      },
    }));

    const handleClickOutside = () => {
      if (cellContainerProps.cellListActive[0] === cellId.destination) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    const hanldeSearch = (e) => {
      const { value } = e.target;
      getPlacePredictions({ input: value });

      handleSearchData(value);
    };

    const handleSelectDesination = (val) => {
      let arr = [...recentSearch];

      handleSearchData(val);

      if (recentSearch.includes(val)) {
        arr.splice(arr.indexOf(val), 1);
      } else if (recentSearch.length === 5) {
        arr.shift();
      }

      arr.push(val);
      setRecentSearch(arr);

      setVisible(false);
      cellContainerProps.handleActiveCell();
      cellContainerProps.handleHoverCell();
    };

    const popUpContent = (
      <DestinationPopup
        placePredictions={placePredictions}
        isPlacePredictionsLoading={isPlacePredictionsLoading}
        onSelectResult={handleSelectDesination}
        recentSearch={recentSearch}
      />
    );

    return (
      <CellContainer
        {...cellContainerProps}
        span={8}
        id={cellId.destination}
        visiblePopup={visible}
        onClickOutside={handleClickOutside}
        abortOnClick
        popupContent={popUpContent}
      >
        <div className="cell">
          <label>Địa điểm</label>
          <input
            type="text"
            placeholder="Chọn điểm đến"
            value={destinationVal}
            onFocus={() =>
              cellContainerProps.handleActiveCell(cellId.destination)
            }
            onChange={hanldeSearch}
          />
        </div>
      </CellContainer>
    );
  }
);
