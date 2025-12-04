import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div>
      <h1>Error 403: User Not authorized to see this page</h1>
      <Link to="/login">Please login first</Link>
    </div>
  );
}