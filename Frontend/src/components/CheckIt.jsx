import PropTypes from "prop-types";
import { useEffect } from "react";

const CheckIt = ({ setProgress, location, placed, formDatafinal }) => {
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
          <h1 className="text-6xl font-inter text-green-400">
            You're Ready for Placement !!
          </h1>
        ) : (
          <h1 className="text-6xl font-inter text-red-400">
            You need Improvement !!
          </h1>
        )}

        {formDatafinal && placed == 0 && (
          <div className="mt-5 space-y-2 text-3xl font-inter ">
            {formDatafinal.CGPA <= parameters_to_improve.CGPA && (
              <p>CGPA: {parameters_to_improve.CGPA - formDatafinal.CGPA}</p>
            )}
            {formDatafinal.Projects < parameters_to_improve.Projects && (
              <p>Projects: {formDatafinal.Projects}</p>
            )}
            {formDatafinal.WorkshopsCertifications <
              parameters_to_improve.WorkshopsCertifications && (
              <p>
                Workshops/Certifications:{" "}
                {parameters_to_improve.WorkshopsCertifications -
                  formDatafinal.WorkshopsCertifications}
              </p>
            )}
            {formDatafinal.skill_count < parameters_to_improve.skill_count && (
              <p>
                Need To Improve More Technical Skills
                {/* {parameters_to_improve.skill_count - formDatafinal.skill_count} */}
              </p>
            )}
            {formDatafinal.ExtracurricularActivities <
              parameters_to_improve.ExtracurricularActivities && (
              <p>
                Extracurricular Activities:{" "}
                {parameters_to_improve.ExtracurricularActivities -
                  formDatafinal.ExtracurricularActivities}
              </p>
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
