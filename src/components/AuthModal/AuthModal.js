import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import authModal from "./authModal.module.scss";

const AuthModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    displayModal() {
      setVisible(true);
    },
  }));

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      className={authModal["container"]}
    >
      <h1>Modal</h1>
    </Modal>
  );
});

export default AuthModal;
