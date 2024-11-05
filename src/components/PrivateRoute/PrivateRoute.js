import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Assuming your useAuth hook provides user state
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
