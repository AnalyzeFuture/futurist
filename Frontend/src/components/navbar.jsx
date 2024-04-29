import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaUserAstronaut } from "react-icons/fa";

import Logo from "./Logo";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (tab) => {
    if (activeTab === tab) {
      window.location.reload();
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="w-screen relative mt-20 ">
        <nav className=" bg-white fixed font-inter top-0 left-0 right-0 z-50 flex flex-col items-center sm:flex-row justify-between px-4 py-2">
      <Logo setActiveTab={setActiveTab} />
      <div className="sm:hidden">
        <button
          onClick={handleMenuToggle}
          className="block text-gray-600 focus:outline-none"
        >
          <FiChevronDown />
        </button>
      </div>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col sm:flex-row items-center space-y-5 sm:space-y-0  sm:flex `}
      >
        <NavLink
          to="/aboutUsPage"
          className={`text-lg font-extralight hover:font-semibold hover:text-orange-500 mr-0 sm:mr-24  ${
            activeTab === "homePage"
              ? "text-orange-500 font-semibold"
              : "text-lg font-extralight text-black"
          }`}
          onClick={() => handleNavLinkClick("homePage")}
        >
          DISCOVER
        </NavLink>
        <NavLink
          to="/"
          className={`text-lg  sm:mr-24 font-extralight  hover:font-semibold hover:text-orange-500  ${
            activeTab === "aboutUsPage"
              ? "text-orange-500 font-semibold"
              : "text-lg font-extralight text-black"
          }`}
          onClick={() => handleNavLinkClick("aboutUsPage")}
        >
          ANALYZE
        </NavLink>
        <NavLink
          to="/contactus"
          className={`text-lg font-extralight hover:font-semibold hover:text-orange-500 ${
            activeTab === "mainPage"
              ? "text-orange-500 font-semibold"
              : "text-lg font-extralight text-black"
          }`}
          onClick={() => handleNavLinkClick("mainPage")}
        >
          CONNECT
        </NavLink>
      </div>
      <div className={`${isMenuOpen ? "flex" : "hidden"} sm:flex sm:mr-16`}>
        <NavLink
          to="/cart"
          className={`flex mt-3 sm:mt-0 text-lg pr-2 font-extralight hover:font-semibold hover:text-orange-500 ${
            activeTab === "cart"
              ? "text-orange-500 font-semibold"
              : "text-lg font-extralight text-black"
          }`}
          onClick={() => handleNavLinkClick("cart")}
        >
          <FaUserAstronaut className="w-10 h-10" />

          </NavLink>
      </div>
          
    </nav>
          <div className=" relative mt-24 xl:left-80  2xl:left-1/4   bg-gray-900 w-full md:w-full xl:w-1/2 h-0.1">
      
      </div>
      </div>

  );
}

export default NavBar;
