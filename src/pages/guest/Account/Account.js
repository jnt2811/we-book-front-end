import { LockOutlined } from "@ant-design/icons";
import { Button, Input, Row, Form, Select } from "antd";
import account from "./account.module.scss";
import AvatarUser from "./components/avatarUser/AvatarUser";
import FieldContainer from "./components/fieldContainer/FieldContainer";
import { localGet } from "../../../helpers/localHandler";
import { localKeys } from "../../../constants/keys";
import { useRef } from "react";
import PasswordDrawer from "./components/passwordDrawer/PasswordDrawer";
import { useForm } from "antd/lib/form/Form";

const fieldKeys = {
  NAME: "name",
  GENDER: "gender",
  DOB: "dob",
  EMAIL: "email",
  PHONE: "phone",
  ADDRESS: "address",
};

export default function Account() {
  const userData = localGet(localKeys.USER, {});
  const drawerRef = useRef();
  const fieldRefs = {
    [fieldKeys.NAME]: useRef(),
    [fieldKeys.GENDER]: useRef(),
    [fieldKeys.DOB]: useRef(),
    [fieldKeys.EMAIL]: useRef(),
    [fieldKeys.PHONE]: useRef(),
    [fieldKeys.ADDRESS]: useRef(),
  };
  const [form] = useForm();

  const onFinish = (values) => {
    console.log(values);
    fieldRefs.nameRef.current.toggle();
  };

  const handleToggle = (key) => {
    fieldRefs[fieldKeys[key]].current.toggle();
  };

  return (
    <div className={account["container"]}>
      <Row justify="space-between">
        <h1>Tài khoản</h1>

        <Button
          icon={<LockOutlined />}
          className={account["pass-btn"]}
          onClick={() => drawerRef.current.openDrawer()}
        >
          Đổi mật khẩu
        </Button>
      </Row>

      <div className={account["avatar"]}>
        <AvatarUser src={userData.avatar} txt={userData.name} />
      </div>

      <Form
        className={account["field-container"]}
        form={form}
        onFinish={onFinish}
      >
        <FieldContainer
          label="Họ và tên"
          value={userData.name}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.NAME]}
        >
          <Form.Item name="name" initialValue={userData.name}>
            <Input placeholder="Điền họ và tên của bạn" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Giới tính"
          value={userData.gender}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.GENDER]}
        >
          <Form.Item name="gender" initialValue={userData.gender}>
            <Select placeholder="Chọn giới tính của bạn">
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
              <Select.Option value="Khác">Khác</Select.Option>
            </Select>
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Ngày sinh"
          value={userData.dob}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.DOB]}
        >
          <Form.Item name="dob" initialValue={userData.dob}>
            <Input placeholder="DD/MM/YYYY" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Email"
          value={userData.email}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.EMAIL]}
        >
          <Form.Item name="email" initialValue={userData.email}>
            <Input placeholder="Điền email của bạn" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Số điện thoại"
          value={userData.phone}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.PHONE]}
        >
          <Form.Item name="phone" initialValue={userData.phone}>
            <Input placeholder="Điền số điện thoại của bạn" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Địa chỉ"
          value={userData.address}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.ADDRESS]}
        >
          <Form.Item name="address" initialValue={userData.address}>
            <Input placeholder="Điền địa chỉ sinh sống của bạn" />
          </Form.Item>
        </FieldContainer>
      </Form>

      <PasswordDrawer ref={drawerRef} />
    </div>
  );
}
