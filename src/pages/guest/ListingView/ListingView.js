import { useParams } from "react-router-dom";
import listingView from "./listingView.module.scss";

export default function ListingView() {
  const { id } = useParams();

  return (
    <div className={listingView["container"]}>
      <h1>Listing ID: {id}</h1>
    </div>
  );
}
