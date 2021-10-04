import { Col, Divider, Row } from "antd";
import searchBar from "./searchPopup.module.scss";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

export const GuestsPopup = ({
  adults,
  children,
  infants,
  updateAdults,
  updateChildren,
  updateInfants,
}) => {
  return (
    <div className={searchBar["pop-up"] + " " + searchBar["guest"]}>
      <Row className="wrap" align="middle" justify="space-between">
        <Col>
          <p>Người lớn</p>
          <span>Từ 13 tuổi trở lên</span>
        </Col>

        <Col>
          <button
            disabled={adults === 0}
            onClick={() => updateAdults(adults - 1)}
          >
            <MinusCircleOutlined />
          </button>
          <span className="data">{adults}</span>
          <button onClick={() => updateAdults(adults + 1)}>
            <PlusCircleOutlined />
          </button>
        </Col>
      </Row>

      <Divider className="divider" />

      <Row className="wrap" align="middle" justify="space-between">
        <Col>
          <p>Trẻ em</p>
          <span>Từ 2 - 12 tuổi</span>
        </Col>

        <Col>
          <button
            disabled={children === 0}
            onClick={() => updateChildren(children - 1)}
          >
            <MinusCircleOutlined />
          </button>
          <span className="data">{children}</span>
          <button onClick={() => updateChildren(children + 1)}>
            <PlusCircleOutlined />
          </button>
        </Col>
      </Row>

      <Divider className="divider" />
      <Row className="wrap" align="middle" justify="space-between">
        <Col>
          <p>Em bé</p>
          <span>Dưới 2 tuổi</span>
        </Col>

        <Col>
          <button
            disabled={infants === 0}
            onClick={() => updateInfants(infants - 1)}
          >
            <MinusCircleOutlined />
          </button>
          <span className="data">{infants}</span>
          <button onClick={() => updateInfants(infants + 1)}>
            <PlusCircleOutlined />
          </button>
        </Col>
      </Row>
    </div>
  );
};
