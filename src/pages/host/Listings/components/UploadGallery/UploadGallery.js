import { Upload, notification } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { storage } from "../../../../../firebase";

export default function UploadGallery({ gallery = [], setGallery }) {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setFileList(
      gallery.map((img, i) => ({
        uid: i,
        name: "",
        status: "done",
        url: img,
      }))
    );
  }, [gallery]);

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const beforeUpload = (file) => {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      notification.error({ message: "Chỉ được upload ảnh" });
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      notification.error({ message: "Kích thước ảnh phải nhỏ hơn 5MB" });
    }
    return isImage && isLt5M;
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    try {
      const storageRef = storage.ref();
      const imgFile = storageRef.child(
        `images/listing/${file.name}_${new Date().getTime()}`
      );
      const image = await imgFile.put(file);

      await imgFile.getDownloadURL().then((url) => {
        let tempArr = [...gallery];
        tempArr.push(url);
        setGallery(tempArr);
      });

      onSuccess(null, image);
      console.log(`${file.name} is uploaded!`);
    } catch (error) {
      onError(null, error);
      console.log(error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      customRequest={customUpload}
    >
      {uploadButton}
    </Upload>
  );
}
