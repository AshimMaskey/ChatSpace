import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute1 = ({ element }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const user_id = user?.user_id;

  if (isAuthenticated && user_id) {
    return <Navigate to={`/profile/${user_id}`} />;
  }

  return element;
};

export default PrivateRoute1;
