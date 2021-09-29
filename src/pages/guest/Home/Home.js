import { SearchBar } from "../components/SearchBar/SearchBar";
import home from "./home.module.scss";

export const Home = () => {
  return (
    <div className={home.container}>
      <SearchBar />
    </div>
  );
};
