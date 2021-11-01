import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import newListing from "./newListing.module.scss";
import { requestGet } from "../../../../../helpers/requestHandler";
import { apis } from "../../../../../constants";

const NewListing = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    requestGet(apis.Place).then((result) => {
      if (result.data.status) {
        setPlaceData(result.data.data);
      }
      console.log(placeData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(placeData);

  const onFinish = (values) => {
    values.gallery = JSON.parse(values.gallery);
    console.log(values);
  };

  return (
    <Drawer
      className={newListing["container"]}
      visible={visible}
      title="Tạo mới nơi ở"
      onClose={() => setVisible(false)}
      width={800}
    >
      <Form onFinish={onFinish} layout="vertical">
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên nơi ở"
              rules={[{ required: true, message: "Điền tên nơi ở" }]}
            >
              <Input placeholder="Please enter  name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="beds" label="Số giường">
              <Select placeholder="Please select a number">
                {array.map((i) => (
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Giá/đêm"
              rules={[{ required: true, message: "Điền giá/đêm" }]}
            >
              <Input placeholder="Please enter price" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="bedrooms" label="Số phòng ngủ">
              <Select placeholder="Please select a number">
                {array.map((i) => (
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Điền địa chỉ" }]}
            >
              <Input placeholder="Please enter  address" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="bathrooms" label="Số phòng tắm">
              <Select placeholder="Please select a number">
                {array.map((i) => (
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="desc"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: "Điền mô tả",
                },
              ]}
            >
              <Input.TextArea placeholder="Please enter  description" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="guests" label="Số khách">
              <Select placeholder="Please select a number">
                {array.map((i) => (
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="gallery" label="gallery fake (tạm thời)">
              <Select placeholder="Please select a number">
                {placeData.map((i) => {
                  console.log(JSON.stringify(i));
                  return (
                    <Select.Option key={i.id} value={JSON.stringify(i)}>
                      {i.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Button htmlType="submit">Tạo mới</Button>
      </Form>
    </Drawer>
  );
});

export default NewListing;
