import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


//import environment variables
const apiUrl=import.meta.env.VITE_API_URL;


const LoginForm = () => {

  const navigate=useNavigate()


  const [loading, setLoading] = useState(false);

  //to store form inputs
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  //to set input type of password
  const [inputType, setInputType] = useState("password");

  //to show or hide password button
  const [showPassword, setShowPassword] = useState(false);

  //function to show or hide password
  const handleShowHidePassword = () => {
    if (inputType == "password") {
      setInputType("text");
      setShowPassword(true);
    } else {
      setInputType("password");
      setShowPassword(false);
    }
  };

  //function to submit sign in credentials
  const handleSubmit=async(e:React.SyntheticEvent)=>{
    e.preventDefault();
    //console.log(signinData)
    try {
      const res=await fetch(`${apiUrl}/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        mode: 'cors',
        credentials:"include",
        cache:"no-store",
        body:JSON.stringify(signinData)
      })
      const response=await res.json();
      //console.log(response)
      if(res.ok){
        toast.success(response.message)

        //reset form data
        setSigninData({
          email:"",
          password:""
        })
        const now=new Date();
        const tokenItem={
          token:response.token,
          expiry:now.getTime()+24 * 60 * 60 * 1000
        }
        //set token in local storage
         localStorage.setItem("token",JSON.stringify(tokenItem))
        
        const userData={
          email:response.user.email,
          expiry:now.getTime()+24 * 60 * 60 * 1000
        }
        //set user data in local storage
         localStorage.setItem("user",JSON.stringify(userData))

        //go to homepage
        navigate("/")
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in Logging in")
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
    <Toaster />
      <form onSubmit={(e)=>handleSubmit(e)} className="px-[2vw] py-[2vh] border rounded-lg shadow-lg">
        {/* Form Header */}
        <div className="font-bold text-[6vw] sm:text-[2.5vw]">
          <div className="text-[#3A244A]">
            Fill what we know <span className="text-[#D72638]">!</span>
          </div>
        </div>

        {/*-------- FORM INPUT ------- */}
        <div className="py-[4vh] flex flex-col gap-4 text-[3vw] sm:text-[1.2vw]">
          {/* email input */}
          <div className="border-b">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full focus:outline-none"
              value={signinData.email}
              onChange={(e) =>
                setSigninData({ ...signinData, email: e.target.value })
              }
            />
          </div>

          {/* password input */}
          <div className="border-b flex items-center justify-between">
            <input
              type={inputType}
              placeholder="Password"
              className="w-full focus:outline-none "
              required
              value={signinData.password}
              onChange={(e) =>
                setSigninData({ ...signinData, password: e.target.value })
              }
            />

            {/* button to show or hide password */}
            <span onClick={() => handleShowHidePassword()} className="">
              {showPassword ? (
                <PiEyeSlash className="text-[#D72638]" />
              ) : (
                <PiEyeLight className="text-[#D72638]" />
              )}
            </span>
          </div>
        </div>

        {/* Sign in and Sign up buttons */}
        <div className="font-medium flex flex-col gap-2">
          {loading ? (
            <div className="p-2 text-center rounded-lg bg-[#3A244A] text-[#ffffff] text-[3vw] sm:text-[1.2vw]">
              Logging in...
            </div>
          ) : (
            <>
              {/* Sign in button */}
              <input
                type="submit"
                value="Sign in"
                className="p-2 rounded-lg bg-[#3A244A] hover:bg-[#532a70] text-[#ffffff] text-[3vw] sm:text-[1.2vw]"
              />

              {/* Sign up button to go Sign in page */}
              <Link
                to="/register"
                className="p-2 text-center rounded-lg border border-[#3A244A] hover:bg-[#3A244A] hover:text-[#ffffff] text-[#3A244A] text-[3vw] sm:text-[1.2vw]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
