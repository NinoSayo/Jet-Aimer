import { Route, Routes } from "react-router-dom";
import Login from "../Components/Users/Login";
import SignUp from "../Components/Users/SignUp";

export default function AuthRouter(){
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<SignUp/>} />
            </Routes>
        </div>
    );
}