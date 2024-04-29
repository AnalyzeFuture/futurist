import PropTypes from 'prop-types';
import { useEffect } from "react";

const CheckIt = ({ setProgress, location }) => {
  useEffect(() => {
    setProgress(45);
    setTimeout(() => {
      setProgress(100);
    }, 1500);
  }, [setProgress]);

  const responseData = location.state ? location.state.responseData : null;
  console.log('resposedata:',responseData);
  return (
    <>
      <div className="relative flex flex-col justify-center items-center pt-10 w-full text-5xl h-screen">
        <h1>HELLOO</h1>
        {responseData && (
          <div className="mt-5">
            <p>CGPA: {responseData.CGPA}</p>
            <p>Projects: {responseData.Projects}</p>
            <p>Workshops/Certifications: {responseData.WorkshopsCertifications}</p>
            <p>Skill Count: {responseData.skill_count}</p>
            <p>Extracurricular Activities: {responseData.ExtracurricularActivities}</p>
          </div>
        )}
      </div>
    </>
  );
};

CheckIt.propTypes = {
  setProgress: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default CheckIt;
