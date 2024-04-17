import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
// import logo from "../assets/logo.png";
import { Link as ScrollLink } from "react-scroll";
// import { slides } from "./data";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (linkName) => {
    if (linkName === "start1") {
      // Reset active link when "Debuggers' Club" link is clicked
      setActiveLink(null);
    } else {
      setActiveLink(linkName);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className=" fixed top-0 left-0 right-0 z-50">
      <nav className="bg-white md:px-5 lg:px-10 pt-3 pb-5 flex flex-col items-center md:flex-row justify-between">
        <div className="pt-2 flex items-center">
          {/* <img src={logo} className="w-14 h-14 ml-2 mr-7" alt="logo" /> */}
          <ScrollLink
            to="start1"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() => handleLinkClick("start1")}
          >
            <div className=" font-sans font-light sm:text-lg md:text-xl lg:text-3xl">
              Futurist
            </div>
          </ScrollLink>
        </div>

        <div className="md:hidden">
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
          } flex-col md:flex-row justify-center items-center space-y-1 sm:space-y-0  md:flex `}
        >
          <ScrollLink
            to="upload"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
            onClick={() => handleLinkClick("upload")}
            className={`sm:text-sm md:text-base xl:text-lg font-extralight hover:font-semibold hover:text-black mr-0 lg:mx-14 md:mx-10  ${
              activeLink === "event1" ? "underline font-semibold" : ""
            }`}
          >
            Upload
          </ScrollLink>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
            onClick={() => handleLinkClick("about")}
            className={`sm:text-sm md:text-base xl:text-lg font-extralight hover:font-semibold hover:text-black mr-0 lg:mx-14 md:mx-10  ${
              activeLink === "event1" ? "underline font-semibold" : ""
            }`}
          >
            About
          </ScrollLink>

          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
            onClick={() => handleLinkClick("contact")}
            className={`sm:text-sm md:text-base xl:text-lg font-extralight hover:font-semibold lg:w-full lg:h-full  md:w-20 md:h-full hover:text-black lg:mx-14 md:mx-10 ${
              activeLink === "contact1" ? "underline font-semibold" : ""
            }`}
          >
            Contact us
          </ScrollLink>
        </div>
      </nav>
      <div className="p-1 sm:p-0.5 bg-gradient-to-r from-neutral-800 from-10%  via-neutral-600  via-50% to-netural-400 to-100%"></div>
    </div>
  );
}

export default NavBar;
