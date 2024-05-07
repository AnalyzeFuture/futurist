/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./checkit.css";


const CheckIt = ({ setProgress, location, placed, formDatafinal }) => {
  const navigate = useNavigate();
  const handlegotoStart = () => {
    navigate("/");
  };

  useEffect(() => {
    setProgress(45);
    setTimeout(() => {
      setProgress(100);
    }, 1500);
  }, [setProgress]);

  // const formDatafinal = location.state ? location.state.responseData : null;
  console.log("resposedata:", formDatafinal);
  console.log(placed, formDatafinal);
  // CGPA     Projects  Workshops/Certifications  skill_count
  // 8.400000     3.000000                  2.000000    55.000000

  const parameters_to_improve = {
    CGPA: 8.4,
    Projects: 3,
    WorkshopsCertifications: 2,
    skill_count: 55,
    ExtracurricularActivities: 2,
  };

  return (
    <>
      <div className="relative flex flex-col justify-center items-center mt-40 w-full mx-10 text-5xl h-screen">
        {placed == 1 ? (
          <div className="flex relative flex-col justify-center items-center gap-5">
          <div className=" text-green-500 font-thin text-5xl pt-16">
            <p className="pb-7">You're ready for place !!</p>
          </div>
          
            <button
              className="primary-button"
              type="button"
              onClick={handlegotoStart}
            >
              OKAY GOT IT
            </button>
          </div>
            // You need Improvement !!

        ) : (
          <div className="flex relative flex-col justify-center items-center mt-10 gap-5">
          <div className=" text-rose-500 font-thin text-5xl pt-16">
            <p className="pb-7">You're ready for place !!</p>
          </div>
         
            <button
              className="primary-button"
              type="button"
              onClick={handlegotoStart}
            >
              OKAY GOT IT
            </button>
          </div>
        
        )}

        {formDatafinal && placed == 0 && (
          <div className="flex flex-col justify-center items-center text-center mt-10 gap-5 text-xl font-sans ">
            {formDatafinal.CGPA <= parameters_to_improve.CGPA && (
              <div>CGPA: <span className="text-rose-600">{parameters_to_improve.CGPA - formDatafinal.CGPA}</span></div>
            )}
            {formDatafinal.Projects < parameters_to_improve.Projects && (
              <div>Projects:<span className="text-rose-600"> {formDatafinal.Projects}</span></div>
            )}
            {formDatafinal.WorkshopsCertifications <
              parameters_to_improve.WorkshopsCertifications && (
              <div>
                Workshops/Certifications:<span className="text-rose-600">{" "}
                {parameters_to_improve.WorkshopsCertifications -
                  formDatafinal.WorkshopsCertifications}</span>
              </div>
            )}
            {formDatafinal.skill_count < parameters_to_improve.skill_count && (
              <div>
               You Need To Improve <span className="text-rose-600 ">Technical Skills</span>
                {/* {parameters_to_improve.skill_count - formDatafinal.skill_count} */}
              </div>
            )}
            {formDatafinal.ExtracurricularActivities <
              parameters_to_improve.ExtracurricularActivities && (
              <div>
                Add Extracurricular Activities:<span className="text-rose-600">{" "}
                {parameters_to_improve.ExtracurricularActivities -
                  formDatafinal.ExtracurricularActivities}
                  </span>
              </div>
            )}
            
          </div>
        )}
        
        <div className=" relative flex flex-col w-full  h-full mt-2">
          <div className=" relative flex flex-row gap-2 py-5  items-center justify-center ">
            <img
              src="https://res.cloudinary.com/dhedlkgfi/image/upload/v1714378447/Screenshot_2024-04-29_134105_tcdj7f.png"
              className="rounded-lg w-1/2 h-1/2 "
            />

            <img
              src="https://res.cloudinary.com/dhedlkgfi/image/upload/v1714378447/Screenshot_2024-04-29_134126_wzzs12.png"
              className="rounded-lg w-1/4 h-1/2"
            />
          </div>
          <div className=" relative flex flex-row gap-2 py-5 items-center  justify-center ">
            <img
              src="https://res.cloudinary.com/dhedlkgfi/image/upload/v1714378448/Screenshot_2024-04-29_133947_yxlxnm.png"
              className="rounded-lg w-1/4 - h-1/2"
            />

            <img
              src="https://res.cloudinary.com/dhedlkgfi/image/upload/v1714378447/Screenshot_2024-04-29_134149_dq2e65.png"
              className="rounded-lg w-1/3 h-1/2 "
            />
          </div>
          <div className=" relative flex flex-row gap-2 py-5 items-center justify-center ">
            <img
              src="https://res.cloudinary.com/dhedlkgfi/image/upload/v1714378447/Screenshot_2024-04-29_134115_y9x0xv.png"
              className="rounded-lg w-1/3 h-1/3"
            />

            <img
              src="https://res.cloudinary.com/dhedlkgfi/image/upload/v1714378447/Screenshot_2024-04-29_134138_zthx4c.png"
              className="rounded-lg w-1/3 h-1/3"
            />
          </div>
        </div>
      </div>
    </>
  );
};

CheckIt.propTypes = {
  setProgress: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default CheckIt;
