import UserLayout from "./component/Layout/UserLayout.jsx"
import { NoPage } from "./component/Page_not_found/NoPage.jsx"
import Profile from "./component/Profile/Profile.jsx"
import Search from "./component/Search/Search.jsx"
import { Form } from "./component/Signin_signup/Form.jsx"
import { SignUpForm } from "./component/Signin_signup/SignUpForm.jsx"
import { Button } from "./components/ui/button.jsx"
import { Routes, Route, Link } from "react-router-dom"

function App() {
    return (
    <>
    {/* <Form/> */}
    {/* <SignUpForm/> */}
    
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route path="/search" element={<Search />}/>
        <Route path="/profile" element={<Profile />}/>
      </Route>
        <Route path="/signin" element={<Form/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
      <Route path="*" element={<NoPage/>}/>
    </Routes>
    </>
  )
}

export default App
