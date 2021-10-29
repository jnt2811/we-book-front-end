import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import newListing from "./newListing.module.scss";
import { requestPost, requestGet } from "../../../../../helpers/requestHandler";
import { apis } from "../../../../../constants";

const NewListing = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const array = ["a", "b", "c", "d", "e", "f"];

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));
  const [listingList, setListingList] = useState([]);

  useEffect(() => {
    requestGet(apis.LISTING_HOST).then((result) => {
      const data = result.data;

      if (data.status) {
        setVisible(false);
        setListingList(
          data.data.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);
  const onFinish = (values) => {
    console.log(values);
    // requestPost(apis.LISTING_HOST, values).then((result) => {
    //   const data = values.data;
    //   if (data.status) {
    //     setListingList(
    //       data.data.map((item) => ({
    //         ...item,
    //         key: item.id,
    //       }))
    //     );
    //   }
    // });
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
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="11">11</Select.Option>
                <Select.Option value="12">12</Select.Option>
                <Select.Option value="13">13</Select.Option>
                <Select.Option value="14">14</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="16">16</Select.Option>
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
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="11">11</Select.Option>
                <Select.Option value="12">12</Select.Option>
                <Select.Option value="13">13</Select.Option>
                <Select.Option value="14">14</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="16">16</Select.Option>
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
              <Input.TextArea
                // rows={4}
                placeholder="Please enter  description"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="guests" label="Số khách">
              <Select placeholder="Please select a number">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="11">11</Select.Option>
                <Select.Option value="12">12</Select.Option>
                <Select.Option value="13">13</Select.Option>
                <Select.Option value="14">14</Select.Option>
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="16">16</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="gallery" label="gallery fake (tạm thời)">
              <Select placeholder="Please select a number">
                <Select.Option value="15">15</Select.Option>
                <Select.Option value="16">16</Select.Option>
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
