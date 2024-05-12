import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../context/NotesProvider";
import toast from "react-hot-toast";

//import environment variables
const apiUrl = import.meta.env.VITE_API_URL;

const Search = () => {
  const { setNotes, fetchUserNotes } = useContext(NotesContext);

  const [showSearch, setShowSearch] = useState(false);

  const [searchInput, setSearchInput] = useState("");


  // debounce function to delay API call
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };


  //function to fetch the notes as per search input
  const getSearchedNotes = async () => {
    try {
      const res = await fetch(`${apiUrl}/searchnotes/?search=${searchInput}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const response = await res.json();
      if (res.ok) {
        toast.success(response.message);
        setNotes(response.resultNotes);
        fetchUserNotes();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };



  //debouncing for 3 seconds
  const debouncedGetSearchedNotes = debounce(getSearchedNotes, 3000);


  useEffect(() => {
    if(searchInput){
        debouncedGetSearchedNotes(searchInput);
    }
  }, [searchInput]);

  const closeSearch=()=>{
    setShowSearch(false)
    setSearchInput("");
  }

  return (
    <>
      <div>
        {/* Search icon */}
        <div
          className={`${
            showSearch && "hidden"
          } p-1 hover:rounded-full hover:bg-slate-100`}
        >
          <IoSearch
            onClick={() => setShowSearch(true)}
            className="text-[#3A244A]"
          />
        </div>

        {/* Search Section */}
        <div
          className={`${
            !showSearch && "hidden"
          } p-1 border shadow-sm rounded-sm flex items-center`}
        >
          <div className="p-1 hover:rounded-full hover:bg-slate-100">
            <FaArrowLeft
              onClick={() => closeSearch()}
              className="text-[#3A244A]"
            />
          </div>
          <div>
            <input
              type="text"
              required
              className="w-full focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
