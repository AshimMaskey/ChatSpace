import UserLayout from "./component/Layout/UserLayout.jsx"
import { NoPage } from "./component/Page_not_found/NoPage.jsx"
import Profile from "./component/Profile/Profile.jsx"
import Search from "./component/Search/Search.jsx"
import { Form } from "./component/Signin_signup/Form.jsx"
import { SignUpForm } from "./component/Signin_signup/SignUpForm.jsx"
import { Routes, Route, Link } from "react-router-dom"
import PrivateRoute from "./component/PrivateRoute/PrivateRoute.jsx"
import PrivateRoute1 from "./component/PrivateRoute/PrivateRoute1.jsx"
import Notification from "./component/Notification/Notification.jsx"

function App() {
    return (
    <>    
    <Routes>
      <Route path="/" element={<PrivateRoute element={<UserLayout/>}/>}>
        <Route path="/search" element={<Search />}/>
        <Route path="/notification" element={<Notification />}/>
        <Route path="/profile/:user_id" element={<Profile />}/>
      </Route>
      <Route path="/signin" element={<PrivateRoute1 element={<Form/>}/>}/>
      <Route path="/signup" element={<PrivateRoute1 element={<SignUpForm/>}/>}/>
      <Route path="*" element={<NoPage/>}/>
    </Routes>
    </>
  )
}

export default App
