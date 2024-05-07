import "./fileudt.css";
import UploadFile from "./fileuploadnew";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactTextTransition, { presets } from "react-text-transition";
import { FaRegCopyright } from "react-icons/fa";
import SliderComponent from "./SliderLogo";

const HomePg = ({ setProgress, setFormDatafinal, placed, setPlaced }) => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["CV ", "Resume "];

  useEffect(() => {
    let interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setProgress(45);
    setTimeout(() => {
      setProgress(100);
    }, 1500);
  }, []);

  return (
    <div className="relative">
      <div className="hidden md:block fixed bg-orange-600 z-20 w-4 h-20 xl:w-7 xl:h-36 top-1/2 left-0 ">
        <div className="flex flex-row gap-2 -rotate-90 text-center justify-center items-center top-0 relative left-1/2 transform -translate-x-2 translate-y-6 xl:-translate-x-4 xl:translate-y-14 text-white font-mono text-xs xl:text-lg">
          <span>
            <FaRegCopyright className="w-2 h-2 xl:w-4 xl:h-4" />
          </span>
          <span className="">2024</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center relative mt-7 px-10 w-full h-fit  overflow-hidden ">
        <div className="flex relative justify-center">
          <section className="inline font-inter text-xl sm:text-3xl md:text-5xl xl:text-7xl  text-zinc-700 ">
            Welcome to
            <ReactTextTransition
              springConfig={presets.molasses}
              style={{ margin: "0 4px" }}
              inline
              className="text-orange-500"
            >
              {texts[textIndex]}
            </ReactTextTransition>
            Analyzer
          </section>
        </div>
        <div className="relative mt-7 w-1/2 h-0.1 bg-rose-500"></div>

        <div className="flex relative flex-col w-full">
          <UploadFile
            // formData={formData}
            setFormDatafinal={setFormDatafinal}
            placed={placed}
            setPlaced={setPlaced}
          />
        </div>
        <div className="flex relative justify-center my-10">
          <SliderComponent />
        </div>
      </div>
    </div>
  );
};

HomePg.propTypes = {
  setProgress: PropTypes.func.isRequired,
};
export default HomePg;
