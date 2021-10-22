import { SearchBar } from "../../../components/SearchBar/SearchBar";
import home from "./home.module.scss";
import { useClickOutside } from "jnt-hooks";
import { useRef, useState } from "react";

export default function Home() {
  const [isBlue, setIsBlue] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => setIsBlue(false));

  console.log("object");

  return (
    <div className={home["container"]}>
      <SearchBar />
    </div>
  );
}
