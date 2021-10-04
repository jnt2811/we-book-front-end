import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";
import searchBar from "./searchPopup.module.scss";

export const DestinationPopup = ({
  onSelectResult,
  isPlacePredictionsLoading,
  placePredictions,
  recentSearch,
}) => {
  return (
    <div className={searchBar["pop-up"] + " " + searchBar["destination"]}>
      {placePredictions.length ? (
        <>
          <h3 style={{ marginBottom: "10px" }}>Kết quả tìm kiếm</h3>

          {isPlacePredictionsLoading ? (
            <LoadingOutlined
              style={{ fontSize: "20px", textAlign: "center" }}
            />
          ) : (
            <>
              {placePredictions.map((item) => (
                <div
                  className="search-item"
                  onClick={() => onSelectResult(item.description)}
                  key={placePredictions.indexOf(item)}
                >
                  <EnvironmentOutlined />
                  <p>{item.description}</p>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <h3 style={{ marginBottom: "10px" }}>Tìm kiếm gần đây</h3>

          {recentSearch.length > 0 ? (
            <>
              {recentSearch
                .slice(0)
                .reverse()
                .map((item) => (
                  <div
                    className="search-item"
                    onClick={() => onSelectResult(item)}
                    key={recentSearch.indexOf(item)}
                  >
                    <EnvironmentOutlined />
                    <p>{item}</p>
                  </div>
                ))}
            </>
          ) : (
            <span>Không có tìm kiếm nào gần đây</span>
          )}
        </>
      )}
    </div>
  );
};
