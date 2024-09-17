import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleLoginRedux } from '../redux/action/userAction';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);

    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const [isShowPassword, setIsShowPassword] = useState(false);
    useEffect(() => {
        if(account && account.auth === true){
            navigate("/");
        }
    }, [account])

    const handLogin = async() => {
        if(!email || !password){
            toast.error("Missing!");
            return;
        }
        dispatch(handleLoginRedux(email, password))
    }

    const handleGoBack = () => {
        navigate("/");
    }

    const handlePressEnter = (e) => {
        if (e && e.key === 'Enter'){
            handLogin();
        }
    }

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title"> Log in </div>
                <div className="text"> Email or username </div>
                <input type="text" placeholder="Email or username..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="input-2">
                    <input 
                        type={isShowPassword === true ? "text" : "password"} 
                        placeholder="Password..." value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onKeyDown={(e) => handlePressEnter(e)}
                    />
                    <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={(e) => setIsShowPassword(!isShowPassword)}></i>
                </div>
                <button className={email && password ? "active" : ""} disabled={(email && password) ? false : true} onClick={() => handLogin()}> 
                    {isLoading && <i className="fa-solid fa-sync fa-spin"></i>} 
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