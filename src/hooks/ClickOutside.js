import { useEffect } from "react";

export const ClickOutside = ({ ref, onClickOutside }) => {
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) onClickOutside();
    return;
  };
};
