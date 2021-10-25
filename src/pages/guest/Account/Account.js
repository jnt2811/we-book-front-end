import account from "./account.module.scss";
import AvatarUser from "./components/avatarUser/AvatarUser";
import FieldContainer from "./components/fieldContainer/FieldContainer";

export default function Account() {
  return (
    <div className={account["container"]}>
      <h1>Quản lý tài khoản</h1>

      <div className={account["avatar"]}>
        <AvatarUser />
      </div>

      <div className={account["field-container"]}>
        <FieldContainer label="Họ và tên" value="TQN"></FieldContainer>
      </div>
    </div>
  );
}
