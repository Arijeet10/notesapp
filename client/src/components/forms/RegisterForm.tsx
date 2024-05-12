import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


//import environment variables
const apiUrl=import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  //to store form inputs
  const [signupData, setSignupData] = useState({
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


  //function to submit sign up data
  const handleSubmit=async(e:React.SyntheticEvent)=>{
    e.preventDefault();
    //console.log(signupData)

    //check if required data is provided
    if(signupData.email==""||signupData.password==""){
      toast.error("Enter all the data to register")
    }else{
      //submit signup data api request
      try {
        setLoading(true);
        const res= await fetch(`${apiUrl}/auth/register`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          mode: "cors",
          cache:"no-store",
          body:JSON.stringify(signupData)
        })
        const response=await res.json()
        //console.log(response)
        if(res.ok){
            toast.custom(response.message,{duration:6000})
            setSignupData({
              email:"",
              password:""
            })
            return <div className="fixed inset-0 text-center text-[3vw]">{response.message}</div>
        }else{
          toast.error(response.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Error in Signing Up")
      }finally{
        setLoading(false)
      }
    }

  }


  return (
    <>
      <div className="px-[2vw] py-[2vh] border rounded-lg shadow-lg text-[3vw] sm:text-[1.2vw]">
        {/* Form Header */}
        <div className="flex items-end justify-between">
          <div className="font-bold text-[6vw] sm:text-[2.5vw] text-[#3A244A]">
            Let us know <span className="text-[#D72638]">!</span>
          </div>

          {/* link to go to Sign in page */}
          <Link to="/login" className=" relative font-medium ">
            <button
              onClick={() => {}}
              className="z-50 flex items-center text-[#3A244A] "
            >
              <span className="">Sign</span>{" "}
              <span className="text-[#D72638] ">In</span>
            </button>

            {/* underline the link text effect */}
            <div className="absolute bottom-[0.5vh] w-full h-[1px]  bg-gradient-to-r from-[#3A244A] from-70% to-[#D72638] to-30%" />

          </Link>
        </div>

        <form onSubmit={(e)=>handleSubmit(e)}>

        {/*-------- FORM INPUT ------- */}
        <div className="py-[4vh] flex flex-col gap-4">
          {/* email input */}
          <div className="border-b">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full focus:outline-none"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
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
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
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

        <div className="font-medium flex flex-col gap-2">
          {loading ? (
            <div className="p-2 text-center rounded-lg bg-[#3A244A] text-[#ffffff]">
              Creating account...
            </div>
          ) : (
            <>
              {/* Sign up button */}
              <input
                type="submit"
                name="Sign Up"
                className="p-2 rounded-lg bg-[#3A244A] hover:bg-[#532a70] text-[#ffffff]"
              />
            </>
          )}
        </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
