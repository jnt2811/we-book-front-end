import { useParams } from "react-router";

export default function ListingView() {
  const { id } = useParams();

  return (
    <div className="listing-view">
      <h1>Listing ID: {id}</h1>
    </div>
  );
}
