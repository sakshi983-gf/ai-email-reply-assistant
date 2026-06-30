import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default NotFound;