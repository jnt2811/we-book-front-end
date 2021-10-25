import { Button, Drawer, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";

const PasswordDrawer = forwardRef((props, ref) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    openDrawer() {
      setDrawerVisible(true);
    },
  }));

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Drawer
      visible={drawerVisible}
      onClose={() => setDrawerVisible(false)}
      width={350}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <h2>Đổi mật khẩu</h2>

        <br />

        <Form.Item label="Mật khẩu cũ" name="oldPass">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Mật khẩu mới" name="newPass">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Nhập lại mật khẩu mớI" name="retypeNewPass">
          <Input.Password />
        </Form.Item>

        <br />

        <Form.Item>
          <Button htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default PasswordDrawer;
