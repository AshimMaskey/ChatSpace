import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute=({element})=>{
	const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
	return isAuthenticated?element:<Navigate to='/signin'/>;
}
export default PrivateRoute;