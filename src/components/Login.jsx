import { useState, useEffect, useContext } from "react";
import { loginAPI } from "../services/UserService";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {

    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token")
        if(token){
            navigate("/");
        }
    }, [])

    const handLogin = async() => {
        if(!email || !password){
            toast.error("Missing!");
            return;
        }
        setLoadingAPI(true);
        let res = await loginAPI(email, password);
        if(res && res.token){
            loginContext(email, res.token);
            toast.success("Log in successed");
            navigate("/");
        } else{
            if(res && res.status === 400){
                toast.error(res.data.error);
            }
        }
        setLoadingAPI(false);
    }

    const handleGoBack = () => {
        navigate("/");
    }

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title"> Log in </div>
                <div className="text"> Email or username </div>
                <input type="text" placeholder="Email or username..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="input-2">
                    <input type={isShowPassword === true ? "text" : "password"} placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={(e) => setIsShowPassword(!isShowPassword)}></i>
                </div>
                <button className={email && password ? "active" : ""} disabled={(email && password) ? false : true} onClick={() => handLogin()}> 
                    {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>} 
                    &nbsp; Log in
                </button>
                <div className="back"> 
                    <i className="fa-solid fa-angles-left"></i> 
                    <span onClick={() => handleGoBack()}> &nbsp; Go back </span>
                </div>
            </div>
        </>
    )
}

export default Login