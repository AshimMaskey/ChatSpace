import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute1=({element})=>{
	const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
	return isAuthenticated?<Navigate to='/profile'/>:element;
}
export default PrivateRoute1;