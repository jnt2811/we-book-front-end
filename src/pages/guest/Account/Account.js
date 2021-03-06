import { LockOutlined } from "@ant-design/icons";
import { Button, Input, Row, Form, Select, DatePicker } from "antd";
import account from "./account.module.scss";
import AvatarUser from "./components/avatarUser/AvatarUser";
import FieldContainer from "./components/fieldContainer/FieldContainer";
import { useMemo, useRef, useState } from "react";
import PasswordDrawer from "./components/passwordDrawer/PasswordDrawer";
import { useForm } from "antd/lib/form/Form";
import { useSelector, useDispatch } from "react-redux";
import { doEditUser, resetAuth } from "../../../ducks/slices/authSlice";
import { authCodes } from "../../../constants";
import {
  milliToDate,
  milliToMoment,
  momentToMilli,
} from "../../../helpers/formatter";

const fieldKeys = {
  AVATAR: "avatar",
  NAME: "name",
  GENDER: "gender",
  DOB: "dob",
  EMAIL: "email",
  PHONE: "phone",
  ADDRESS: "address",
};

export default function Account() {
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentActiveField, setCurrentActiveField] = useState();
  const drawerRef = useRef();
  const [form] = useForm();

  const fieldRefs = {
    [fieldKeys.NAME]: useRef(),
    [fieldKeys.GENDER]: useRef(),
    [fieldKeys.DOB]: useRef(),
    [fieldKeys.EMAIL]: useRef(),
    [fieldKeys.PHONE]: useRef(),
    [fieldKeys.ADDRESS]: useRef(),
  };

  const userData = useMemo(
    () => {
      if (!!authReducer.isOk) {
        if (authReducer.message === authCodes["010"]) {
          if (!!currentActiveField) {
            fieldRefs[currentActiveField].current.toggleOff();
            setCurrentActiveField();
          }
          dispatch(resetAuth());
        }
        return authReducer.user;
      }
      return {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authReducer]
  );

  const onFinish = (values) => {
    if (Object.keys(values)[0] === fieldKeys.DOB) {
      values[fieldKeys.DOB] = momentToMilli(values[fieldKeys.DOB]);
    }
    console.log(values);
    fieldRefs[Object.keys(values)[0]].current.loadingOn();
    dispatch(doEditUser(values));
  };

  const handleToggle = (key) => {
    if (!!currentActiveField) fieldRefs[currentActiveField].current.toggleOff();

    if (key === fieldKeys.DOB && !!userData[key]) {
      form.setFields([{ name: key, value: milliToMoment(userData[key]) }]);
    } else form.setFields([{ name: key, value: userData[key] }]);

    fieldRefs[key].current.toggleOn();

    setCurrentActiveField(key);
  };

  return (
    <div className={account["container"]}>
      <Row justify="space-between">
        <h1>T??i kho???n</h1>

        <Button
          icon={<LockOutlined />}
          className={account["pass-btn"]}
          onClick={() => drawerRef.current.openDrawer()}
        >
          ?????i m???t kh???u
        </Button>
      </Row>

      <div className={account["avatar"]}>
        <AvatarUser
          src={userData[fieldKeys.AVATAR]}
          txt={userData[fieldKeys.NAME]}
        />
      </div>

      <Form
        className={account["field-container"]}
        form={form}
        onFinish={onFinish}
      >
        <FieldContainer
          label="H??? v?? t??n"
          value={userData[fieldKeys.NAME]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.NAME]}
          onClickEdit={() => handleToggle(fieldKeys.NAME)}
        >
          <Form.Item
            name={fieldKeys.NAME}
            rules={[
              {
                required: true,
                message: "H??y ??i???n ?????y ????? h??? v?? t??n",
              },
            ]}
          >
            <Input placeholder="??i???n h??? v?? t??n c???a b???n" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Gi???i t??nh"
          value={userData[fieldKeys.GENDER]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.GENDER]}
          onClickEdit={() => handleToggle(fieldKeys.GENDER)}
        >
          <Form.Item
            name={fieldKeys.GENDER}
            rules={[
              {
                required: true,
                message: "H??y ch???n gi???i t??nh",
              },
            ]}
          >
            <Select placeholder="Ch???n gi???i t??nh c???a b???n">
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="N???">N???</Select.Option>
              <Select.Option value="Kh??c">Kh??c</Select.Option>
            </Select>
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Ng??y sinh"
          value={
            !!userData[fieldKeys.DOB]
              ? milliToDate(userData[fieldKeys.DOB])
              : ""
          }
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.DOB]}
          onClickEdit={() => handleToggle(fieldKeys.DOB)}
        >
          <Form.Item
            name={fieldKeys.DOB}
            rules={[
              {
                required: true,
                message: "H??y ch???n ng??y th??ng n??m sinh",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Email"
          value={userData[fieldKeys.EMAIL]}
        ></FieldContainer>

        <FieldContainer
          label="S??? ??i???n tho???i"
          value={userData[fieldKeys.PHONE]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.PHONE]}
          onClickEdit={() => handleToggle(fieldKeys.PHONE)}
        >
          <Form.Item
            name={fieldKeys.PHONE}
            rules={[
              {
                required: true,
                message: "H??y ??i???n s??? ??i???n tho???i",
              },
              {
                pattern: /^[0]?[35789]\d{8}$/,
                message: "H??y ??i???n ????ng ?????nh d???ng s??? ??i???n tho???i",
              },
            ]}
          >
            <Input placeholder="??i???n s??? ??i???n tho???i c???a b???n" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="?????a ch???"
          value={userData[fieldKeys.ADDRESS]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.ADDRESS]}
          onClickEdit={() => handleToggle(fieldKeys.ADDRESS)}
        >
          <Form.Item
            name={fieldKeys.ADDRESS}
            rules={[
              {
                required: true,
                message: "H??y ??i???n ?????a ch???",
              },
            ]}
          >
            <Input placeholder="??i???n ?????a ch??? sinh s???ng c???a b???n" />
          </Form.Item>
        </FieldContainer>
      </Form>

      <PasswordDrawer ref={drawerRef} />
    </div>
  );
}
