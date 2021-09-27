import { BrowserRouter } from "react-router-dom";
import { Header } from "../layouts";
import { GuestRoutes } from "./GuestRoutes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <GuestRoutes />
    </BrowserRouter>
  );
};
