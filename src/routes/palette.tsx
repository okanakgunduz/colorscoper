import { Link, useNavigate } from "react-router-dom";

export default function Palette() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="">Palette</h1>
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="border py-2 px-4 rounded">
          Back
        </button>
        <Link to="/" className="border py-2 px-4 rounded">
          To Home
        </Link>
      </div>
    </div>
  );
}
