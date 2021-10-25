import { Avatar } from "antd";

export default function AvatarUser({ src, txt }) {
  return (
    <Avatar size={150} src={src}>
      {txt}
    </Avatar>
  );
}
