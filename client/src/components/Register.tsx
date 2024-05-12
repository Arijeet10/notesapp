import { useNavigate } from "react-router-dom";
import RegisterForm from "./forms/RegisterForm";
import { useEffect } from "react";
import { getToken } from "../utils/getToken";


const Register=()=>{

    const navigate=useNavigate();

    useEffect(() => {
      const token=getToken();
      if(token){
        navigate("/")
      }
    }, [])
    

    return (
        <>
            <div className="sm:h-[100vh] flex flex-col sm:flex-row items-center sm:justify-center">
                <div className=" sm:w-[70vw]">
                    <img 
                        src="/sign-up.png"
                        alt="sign up image"
                        className=""
                    />
                </div>
                <div className=" max-w-[90%] w-[80vw] sm:w-[30vw]">
                    <RegisterForm />
                </div>
            </div>
        </>
    )
}

export default Register;