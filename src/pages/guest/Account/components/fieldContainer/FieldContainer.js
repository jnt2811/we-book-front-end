import fieldContainer from "./fieldContainer.module.scss";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Col, Row } from "antd";

const FieldContainer = forwardRef(({ children, label, value, onSave }, ref) => {
  const [editVisible, setEditVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle() {
      setEditVisible((val) => !val);
    },
  }));

  return (
    <Row className={fieldContainer["row"]}>
      <Col flex="160px" className={fieldContainer["cell"]}>
        <label>{label}</label>
      </Col>

      <Col flex="auto" className={fieldContainer["cell"]}>
        {editVisible ? (
          <>
            {children}
            <Button onClick={onSave}>Lưu</Button>
          </>
        ) : (
          <span>{value}</span>
        )}
      </Col>

      <Col flex="0px" className={fieldContainer["cell"]}>
        {!editVisible ? (
          <EditOutlined
            onClick={() => setEditVisible(true)}
            className={fieldContainer["btn"]}
          />
        ) : (
          <CloseOutlined
            onClick={() => setEditVisible(false)}
            className={fieldContainer["btn"]}
          />
        )}
      </Col>
    </Row>
  );
});

export default FieldContainer;
