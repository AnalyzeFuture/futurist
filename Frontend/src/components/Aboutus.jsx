import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactTextTransition, { presets } from "react-text-transition";
import abt1 from "../assets/aboutimg1.jpg";
import abt2 from "../assets/aboutimg2.jpg";
import abt3 from "../assets/aboutimg3.jpg";
import abt4 from "../assets/aboutimg4.jpg";
import bgimg from "../assets/aboutimg5.jpg";

const About = ({ setProgress }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  useEffect(() => {
    setProgress(45);
    setTimeout(() => {
      setProgress(100);
    }, 1500);
  }, []);
  const texts = ["CV", "Resume"];

  const paragraphs = ["We Elevate your CV with precision analysis, unlocking doors to unparalleled career opportunities.", "Transform your resume into a powerful asset with insightful analysis, paving the way for your professional success."];

  useEffect(() => {
    let interval = setInterval(() => {
      setParagraphIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-center items-center w-full pt-32 px-20">
        <div className="flex relative flex-col  space-y-20 ">
          <div className="flex relative flex-row gap-32 justify-center ">
            <img src={abt1} className="rounded-lg sm:w-1/5  xl:w-1/3 " />
            <div className="flex flex-col space-y-10 justify-center items-center">
              <section>
                <span className="text-xl sm:text-2xl md:text-4xl xl:text-6xl font-inter ">
                {" "}
                Welcome to <br />{" "}
                <span className="text-orange-500">
                  <ReactTextTransition
                    springConfig={presets.gentle}
                    style={{ margin: "0 4px" }}
                    inline
                  >
                    {texts[textIndex]}{" "}
                  </ReactTextTransition>
                </span>
                Analyzer
              </span>
              <p className="text-sm md:text-xl xl:text-3xl font-sans mt-7 xl:mt-20 ">
                <ReactTextTransition springConfig={presets.slow} >
                  {paragraphs[paragraphIndex]}
                </ReactTextTransition>{" "}
              </p>
                </section>
            </div>
          </div>
          <div className=" relative flex flex-row gap-10 py-10 justify-center ">
            <img src={abt2} className="rounded-lg w-1/3 h-1/3 " />
            <img src={abt3} className="rounded-lg w-1/3 h-1/3" />
            <img src={abt4} className="rounded-lg w-1/3 h-1/3" />
          </div>
        </div>
      </div>
    </>
  );
};

About.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default About;
