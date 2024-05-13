import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Search from "./Search";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

//import environment variables
const apiUrl = import.meta.env.VITE_API_URL;

const Header = () => {
  const navigate = useNavigate();

  const { user, setLoggedInUser } = useContext(UserContext);

  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    setLoggedInUser();
  }, []);

  //logout user
  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/logout`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      const response = await res.json();
      //console.log(response)
      if (res.ok) {
        //remove user and token from localstorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout Unsuccessful");
    }
  };

  return (
    <>
      <Toaster />
      <header>
        <nav className="px-[1vw] py-[0.5vh] flex items-center justify-between font-medium text-[2vw] sm:text-[1.5vw] shadow-md">
          <div>
            <Link to="/">
              <div className=" text-[4vw] sm:text-[3vw] font-bold uppercase">
                Notes <span className=" text-[#D72638]">App</span>
              </div>
            </Link>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:flex items-center justify-center gap-[2vw]">
            <div>
              <Search />
            </div>

            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "text-[#D72638]" : "text-slate-600"
                } p-1 rounded-sm border border-transparent hover:bg-[#3A244A] hover:border-[#3A244A] hover:text-[#ffffff]`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive ? "text-[#D72638]" : "text-slate-600"
                } p-1 rounded-sm border border-transparent hover:bg-[#3A244A] hover:border-[#3A244A] hover:text-[#ffffff]`
              }
            >
              About
            </NavLink>

            <div className="p-1 rounded-sm border border-transparent  hover:bg-[#3A244A] hover:border-[#3A244A] hover:text-white">
              <span className="text-[#D72638]">User: </span>
              {user}
            </div>

            <button
              onClick={() => handleLogout()}
              className="border border-transparent  rounded-sm p-1 font-bold hover:bg-red-700 hover:border-red-700 hover:text-white uppercase"
            >
              Log Out
            </button>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden text-[3vw]">
            {sidebar ? (
              <IoClose onClick={() => setSidebar(false)} />
            ) : (
              <RxHamburgerMenu
              onClick={() => setSidebar(true)}
              className={`}`}
            />
            )}

            <div className={`w-[60vw] h-full bg-[#ffffff] fixed top-8 right-0 z-50 ${!sidebar && "hidden"} px-2 py-10 flex flex-col items-center gap-[3vh]`}>
              <div className="">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-[#D72638]" : "text-slate-600"
                    } p-1 rounded-sm border border-transparent hover:bg-[#3A244A] hover:border-[#3A244A] hover:text-[#ffffff]`
                  }
                >
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-[#D72638]" : "text-slate-600"
                    } p-1 rounded-sm border border-transparent hover:bg-[#3A244A] hover:border-[#3A244A] hover:text-[#ffffff]`
                  }
                >
                  About
                </NavLink>
              </div>
              <div className="p-1 rounded-sm border border-transparent  hover:bg-[#3A244A] hover:border-[#3A244A] hover:text-white">
                <span className="text-[#D72638]">User: </span>
                {user}
              </div>
              <div>
                <button
                  onClick={() => handleLogout()}
                  className="border border-transparent  rounded-sm p-1 font-bold hover:bg-red-700 hover:border-red-700 hover:text-white uppercase"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
