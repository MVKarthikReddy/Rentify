import { useEffect, useState } from "react";
import logo1 from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, TextInput, Dropdown } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Provider } from 'react-redux';
import { store } from "../redux/store";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  /* Sign out function */
  const handleSignout = async () => {
    console.log(import.meta.env.VITE_BACKEND_API_URL)
    console.log('I am Done!')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    
    <header   className="sticky top-0 z-30  bg-slate-200 shadow-lg w-full bg-opacity-80  backdrop-blur-sm">
      <div className="relative  flex justify-between items-center max-w-7xl mx-auto p-3 ">
        <Link to="/" className="flex item gap-2 ">
          <img src={logo1} alt="logo" className="w-9 h-9 object-contain " />
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap  items-center ">
            <span className="text-green-500">Rent</span>
            <span className="text-slate-600">ify</span>
          </h1>
        </Link>
        {/* <form onSubmit={handleSubmit} className="flex items-center">
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="hidden lg:inline   cursor-pointer"
          />
        </form> */}
        {/* <Link to="/search">
          <Button
            type="button"
            className=" w-10 h-10 lg:hidden flex items-center justify-center mx-auto"
            color="gray"
            pill
          >
            <AiOutlineSearch className="cursor-pointer " />
          </Button>
        </Link> */}

        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:text-blue-500 transition duration-200">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:text-blue-500 transition duration-200">
              About
            </li>
          </Link>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded className=''/>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="greenToBlue" outline>
                  <span className="text-cyan-500 hover:text-white">Sign In</span>
              </Button>
            </Link>
          )}
        
        </ul>
        
      </div>
       
    </header>
    
  );
}
