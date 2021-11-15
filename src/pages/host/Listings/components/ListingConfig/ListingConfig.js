import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import listingConfig from "./listingConfig.module.scss";
import { requestGet } from "../../../../../helpers/requestHandler";
import { apis } from "../../../../../constants";
import { useForm } from "antd/lib/form/Form";
import UploadGallery from "../UploadGallery/UploadGallery";

const fields = {
  NAME: "name",
  PRICE: "price",
  ADDRESS: "address",
  DETAIL: "detail",
  GUESTS: "guests",
  BEDROOMS: "bedrooms",
  BATHROOMS: "bathrooms",
  BEDS: "beds",
  PLACE: "place",
  AMENITY: "amenity",
  GALLERY: "gallery",
};

const ListingConfig = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [gallery, setGallery] = useState([]);

  useImperativeHandle(ref, () => ({
    open(listing) {
      if (!!listing) {
        form.setFields(
          Object.keys(fields).map((key) => {
            if (fields[key] === fields.GALLERY) {
              if (!!listing.gallery) setGallery(JSON.parse(listing.gallery));
              return {};
            }
            return {
              name: [fields[key]],
              value: listing[fields[key]],
            };
          })
        );
        setIsEditListing(true);
      }

      setVisible(true);
    },
  }));

  console.log(gallery);

  const [placeList, setPlaceList] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [isEditListing, setIsEditListing] = useState(false);

  useEffect(() => {
    requestGet(apis.PLACE).then((result) => {
      if (result.data.status) {
        setPlaceList(result.data.data);
      }
    });
    requestGet(apis.AMENITY).then((result) => {
      if (result.data.status) {
        setAmenityList(result.data.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    form.resetFields();
    setGallery([]);
    setIsEditListing(false);
    setVisible(false);
  };

  const onFinish = (values) => {
    if (values.gallery.length < 3) {
      form.setFields([
        { name: fields.GALLERY, errors: ["Hãy tải lên ít nhất 3 bức ảnh"] },
      ]);
    } else {
      values.gallery = JSON.stringify(gallery);
      values.place = JSON.parse(values.place);
      if (!!values.amenity) {
        values.amenity = values.amenity.map((item) => JSON.parse(item));
      } else values.amenity = [];
      console.log(values);
    }
  };

  return (
    <Drawer
      className={listingConfig["container"]}
      visible={visible}
      title={!isEditListing ? "Tạo mới nơi ở" : "Chỉnh sửa nơi ở"}
      onClose={onClose}
      width={401}
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={() => form.submit()} type="primary">
              {!isEditListing ? "Tạo mới" : "Lưu thay đổi"}
            </Button>
          </Col>
          <Col>
            <Button onClick={onClose} danger>
              {!isEditListing ? "Huỷ bỏ" : "Quay lại"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          name={fields.NAME}
          label="Tên nơi ở"
          rules={[{ required: true, message: "Hãy điền tên nơi ở" }]}
        >
          <Input placeholder="Điền tên nơi ở" />
        </Form.Item>

        <Form.Item
          name={fields.PRICE}
          label="Giá/đêm (đ)"
          rules={[{ required: true, message: "Hãy điền giá/đêm" }]}
        >
          <Input placeholder="Điền giá nơi ở" />
        </Form.Item>

        <Form.Item
          name={fields.ADDRESS}
          label="Địa chỉ"
          rules={[{ required: true, message: "Hãy điền địa chỉ nơi ở" }]}
        >
          <Input placeholder="Điền địa chỉ nơi ở" />
        </Form.Item>

        <Form.Item
          name={fields.DETAIL}
          label="Mô tả"
          rules={[
            {
              required: true,
              message: "Hãy điền mô tả nơi ở",
            },
          ]}
        >
          <Input.TextArea placeholder="Điền mô tả nơi ở" rows={4} />
        </Form.Item>

        <Form.Item
          name={fields.GUESTS}
          label="Số lượng khách"
          initialValue="1"
          rules={[
            {
              required: true,
              message: "Hãy điền số lượng khách",
            },
          ]}
        >
          <Input type="number" min="1" placeholder="Điền số lượng khách" />
        </Form.Item>

        <Form.Item
          name={fields.BEDROOMS}
          label="Số phòng ngủ"
          initialValue="1"
          rules={[
            {
              required: true,
              message: "Hãy điền số phòng ngủ",
            },
          ]}
        >
          <Input type="number" min="1" placeholder="Điền số phòng ngủ" />
        </Form.Item>

        <Form.Item
          name={fields.BATHROOMS}
          label="Số phòng tắm"
          initialValue="1"
          rules={[
            {
              required: true,
              message: "Hãy điền số phòng tắm",
            },
          ]}
        >
          <Input type="number" min="1" placeholder="Điền số phòng tắm" />
        </Form.Item>

        <Form.Item
          name={fields.BEDS}
          label="Số giường ngủ"
          initialValue="1"
          rules={[
            {
              required: true,
              message: "Hãy điền số giường ngủ",
            },
          ]}
        >
          <Input type="number" min="1" placeholder="Điền số giường ngủ" />
        </Form.Item>

        <Form.Item
          name={fields.PLACE}
          label="Loại hình nơi ở"
          rules={[
            {
              required: true,
              message: "Điền chọn loại hình nơi ở",
            },
          ]}
        >
          <Select placeholder="Chọn loại hình nơi ở" showSearch>
            {placeList.map((item) => (
              <Select.Option key={item.id} value={JSON.stringify(item)}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name={fields.AMENITY} label="Tiện ích">
          <Select placeholder="Chọn các tiện ích" showSearch mode="multiple">
            {amenityList.map((item) => (
              <Select.Option key={item.id} value={JSON.stringify(item)}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name={fields.GALLERY} label="Ảnh">
          <UploadGallery gallery={gallery} setGallery={setGallery} />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default ListingConfig;
