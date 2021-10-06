import { Col } from "antd";

export const CellDivider = ({ cellActive, cellHover, id1, id2, style }) => (
  <Col flex="1px" style={{ marginRight: "-1px" }}>
    <div
      className={`divider-v${
        cellActive === id1 ||
        cellActive === id2 ||
        cellHover === id1 ||
        cellHover === id2
          ? " active"
          : ""
      }`}
      style={style}
    />
  </Col>
);
