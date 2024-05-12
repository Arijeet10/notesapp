import { useEffect } from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

import { useParams } from "react-router-dom"

//import environment variables
const apiUrl=import.meta.env.VITE_API_URL;

const Verify=()=>{

    const {token}=useParams()
    const navigate=useNavigate()

    const verifyUser=async()=>{
        try {
            const res=await fetch(`${apiUrl}/auth/verify/${token}`)
            const response=await res.json();
            if(res.ok){
                toast.success(response.message)
                navigate("/login")
            }else{
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Verification Error")
        }

    }

    useEffect(() => {
      verifyUser();
    }, [])


    

    return(
        <>
            <div>
                Verify Email
            </div>
        </>
    )
}

export default Verify;
