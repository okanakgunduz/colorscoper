import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="">Home</h1>
      <Link to="/analysis" className="border py-2 px-4 rounded">
        To Details
      </Link>
    </div>
  );
}
