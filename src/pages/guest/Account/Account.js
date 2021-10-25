import { LockOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import account from "./account.module.scss";
import AvatarUser from "./components/avatarUser/AvatarUser";
import FieldContainer from "./components/fieldContainer/FieldContainer";
import { localGet } from "../../../helpers/localHandler";
import { localKeys } from "../../../constants/keys";
import { useRef } from "react";
import PasswordDrawer from "./components/passwordDrawer/PasswordDrawer";

export default function Account() {
  const userData = localGet(localKeys.USER, {});
  const drawerRef = useRef();

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

      <div className={account["field-container"]}>
        <FieldContainer
          label="Họ và tên"
          value={userData.name}
        ></FieldContainer>

        <FieldContainer
          label="Giới tính"
          value={userData.gender}
        ></FieldContainer>

        <FieldContainer label="Ngày sinh" value={userData.dob}></FieldContainer>

        <FieldContainer label="Email" value={userData.email}></FieldContainer>

        <FieldContainer
          label="Số điện thoại"
          value={userData.phone}
        ></FieldContainer>

        <FieldContainer
          label="Địa chỉ"
          value={userData.address}
        ></FieldContainer>
      </div>

      <PasswordDrawer ref={drawerRef} />
    </div>
  );
}
