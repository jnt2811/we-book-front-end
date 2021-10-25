import fieldContainer from "./fieldContainer.module.scss";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Col, Row } from "antd";

export default function FieldContainer({ children, label, value, onSave }) {
  const [editVisible, setEditVisible] = useState(false);

  return (
    <Row className={fieldContainer["row"]} align="middle">
      <Col flex="200px" className={fieldContainer["cell"]}>
        <label>{label}</label>
      </Col>

      <Col flex="auto" className={fieldContainer["cell"]}>
        <span>{value}</span>
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
}
