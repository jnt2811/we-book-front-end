import fieldContainer from "./fieldContainer.module.scss";

export default function FieldContainer({ children, label, value, onSave }) {
  return (
    <div className={fieldContainer["row"]}>
      <div className={fieldContainer["cell"]}>
        <label>{label}</label>
      </div>

      <div className={fieldContainer["cell"]}>
        <span>{value}</span>
      </div>

      <div className={fieldContainer["cell"]}>
        <span>Chỉnh sửa</span>
      </div>
    </div>
  );
}
