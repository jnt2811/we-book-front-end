import { Button, Drawer, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import { apis } from "../../../../../constants";
import { requestPost } from "../../../../../helpers/requestHandler";
import { codeFormatter } from "../../../../../helpers/formatter";

const PasswordDrawer = forwardRef((props, ref) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    openDrawer() {
      setDrawerVisible(true);
    },
  }));

  const onFinish = (values) => {
    console.log(values);

    const { currentPass, newPass, retypePass } = values;

    if (newPass !== retypePass) {
      form.setFields([
        { name: "retypePass", errors: ["Mật khẩu nhập lại không khớp"] },
      ]);
    } else {
      setIsLoading(true);

      requestPost(apis.USER, { currentPass, newPass }).then((result) => {
        const data = result.data;

        if (!data.status) {
          setIsLoading(false);
          form.setFields([
            {
              name: "currentPass",
              errors: [codeFormatter(data.code)],
            },
          ]);
        } else {
          setIsLoading(false);
          setDrawerVisible(false);
        }
      });
    }
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

        <Form.Item label="Mật khẩu cũ" name="currentPass">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Mật khẩu mới" name="newPass">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Nhập lại mật khẩu mớI" name="retypePass">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={isLoading}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default PasswordDrawer;
