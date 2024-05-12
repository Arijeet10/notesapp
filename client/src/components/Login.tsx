import { useNavigate } from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import { getToken } from "../utils/getToken";
import { useEffect } from "react";

const Login=()=>{

    const navigate=useNavigate();

    useEffect(() => {
      const token=getToken();
      if(token){
        navigate("/")
      }
    }, [])
    

    return(
        <>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center">
                <div className="   sm:w-[70vw]">
                    <img 
                        src="/sign-in.png"
                        alt="sign in image"
                        className=""
                    />
                </div>
                <div className="  max-w-[90%] w-[80vw]  sm:w-[30vw]">
                    <LoginForm />
                </div>
            </div>
        </>
    )
}

export default Login;