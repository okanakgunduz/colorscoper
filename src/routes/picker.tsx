import { Link } from "react-router-dom";

// Index Route
export default function Picker() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="">Home</h1>
      <Link to="/analysis" className="border py-2 px-4 rounded">
        To Details
      </Link>
    </div>
  );
}
