import filterBar from "./filterBar.module.scss";

export default function FilterBar() {
  return (
    <div className={filterBar["container"]}>
      <div className="btn active">
        <span>Loại nơi ở</span>
      </div>

      <div className="btn">
        <span>Giá</span>
      </div>

      <div className="btn">
        <span>Bộ lọc khác</span>
      </div>
    </div>
  );
}
