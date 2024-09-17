import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

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
                <button className={email && password ? "active" : ""} disabled={email && password ? false : true}> 
                    Log in 
                </button>
                <div className="back"> 
                    <i className="fa-solid fa-angles-left"></i> 
                    Go back 
                </div>
            </div>
        </>
    )
}

export default Login