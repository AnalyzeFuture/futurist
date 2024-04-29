import { useState } from "react";
import uploadpng from "../assets/upload2.png";
import defaultImage from "../assets/template.png";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import axios from "axios";

const UploadFile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    CGPA: 0,
    Projects: 0,
    WorkshopsCertifications: 0,
    skill_count: 0,
    ExtracurricularActivities: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleStartAnalysis = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const formDataInt = {
      ...formData,
      CGPA: parseInt(formData.CGPA),
      Projects: parseInt(formData.Projects),
      WorkshopsCertifications: parseInt(formData.WorkshopsCertifications),
      skill_count: parseInt(formData.skill_count),
      ExtracurricularActivities: parseInt(formData.ExtracurricularActivities),
    };

    // Check if any of the conversion failed
  if (
    Object.values(formDataInt).some((value) => isNaN(value))
  ) {
    console.error("One or more fields contain invalid numbers");
    return;
  }

    try {
      // Send updated data to backend

      const response = await axios.post(`http://127.0.0.1:8000/predict_cv/`,
      formDataInt,
      {
        headers:{
          'Content-Type': 'application/json',
        },
      }
    );
      console.log(response.data);
      if (response.status == 200) {
        console.log("Updated successfully !!");
        setResponseData(response.data);
        console.log(response.data);
        navigate("/checkit",{ state: { responseData } });
        
      }
      else{
        throw new Error("Failed to update data");
      }
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const imageFile = e.dataTransfer.files[0];
    setProfileImage(imageFile);
    setImagePreview(URL.createObjectURL(imageFile));
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    if (!profileImage) {
      alert("Please select an image");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("cloud_name", "dhedlkgfi");
      formData.append("upload_preset", "fdbjitkg");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dhedlkgfi/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const imgData = await response.json();
      const imageURL = imgData.secure_url;
      const payload = { url: imageURL };

      const RunBackendOnPost = await axios.post(
        `http://127.0.0.1:8000/extract_info/`,
        payload,
        {
          headers:{
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = RunBackendOnPost.data;
      const dataType = typeof responseData;
      console.log(dataType);
      console.log('Response data:', responseData);
      const jsonData = JSON.stringify(responseData);
      console.log(jsonData);
      
      //Assign value 
      setFormData({
        
        CGPA: responseData.CGPA || 0,
        Projects: responseData.Projects || 0,
        WorkshopsCertifications: responseData.WorkshopsCertifications || 0,
        skill_count: responseData.skill_count || 0,
        ExtracurricularActivities: responseData.ExtracurricularActivities || 0,
      });
      setUploadSuccess(true);
      setImagePreview(null);
      if (!RunBackendOnPost) {
        throw new Error("Failed to send image URL to backend");
      }
    } catch (error) {
      console.error(error);
      // alert("An error occurred while uploading the image");
    } finally {
      setIsLoading(false);
    }
  };

  const resetStates = () => {
    setProfileImage("");
    setUploadSuccess(false);
    setImagePreview(null);
    setIsEditing(false);
    // Do not reset uploadSuccess here
  };

  return (
    <div className="flex relative pt-16 mx-20 flex-row justify-center items-center gap-20">
      {isEditing ? null : uploadSuccess ? (
        <div className="flex relative flex-col justify-center items-center gap-5">
          <div className=" text-green-500 font-thin text-5xl">
            <p className="pb-7">Uploaded successfully !!</p>
          </div>
          <div className="button-borders">
            <button
              className="primary-button"
              type="button"
              onClick={handleStartAnalysis}
            >
              START ANALYSIS
            </button>
          </div>
          <button
            onClick={resetStates}
            className="pt-10 text-xs font-mono cursor-pointer duration-200 hover:scale-125 active:scale-100"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              className="stroke-blue-300"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M11 6L5 12M5 12L11 18M5 12H19"
              ></path>
            </svg>
            BACK
          </button>
        </div>
      ) : (
        <>
          <div className="flex relative flex-col justify-center items-center gap-5">
            <form
              onSubmit={uploadImage}
              className="flex flex-col items-center "
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col bg-e6e3e3 justify-center items-center p-14 rounded-3xl border-dotted border-2  border-gray-600 shadow-lg">
                  <img
                    src={uploadpng}
                    alt="png-upload"
                    className="w-10 h-10"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  />
                  <p className="text-center">Drag and Drop</p>
                  <p className="text-center">or</p>
                  <p className="text-center">Browse File</p>
                </div>
                <input
                  id="file"
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="pt-7">
                {isLoading ? (
                  <div className="loader mt-32"></div>
                ) : (
                  <div className="button-borders">
                    <button className="primary-button" type="submit">
                      UPLOAD
                    </button>
                  </div>
                )}
              </p>
            </form>
          </div>
          <div className="flex border-emerald-300 border relative  justify-center items-center">
            {profileImage && !isEditing ? (
              <img
                className="w-80"
                src={imagePreview ? imagePreview : defaultImage}
                alt="image-cv"
              />
            ) : !isEditing && (
              <img className="w-80" src={defaultImage} alt="default-image" />
            )}
          </div>
        </>
      )}

      {isEditing && (
        <div className="flex relative flex-col justify-center items-center gap-5">
          <div className="flex flex-col gap-2 font-mono justify-center text-center items-center text-4xl  ">
            <p> EDITING <span className="text-green-400"> WIN</span>DOW </p>
            <div className="w-1/2 h-0.1 bg-teal-400">
              </div>
            </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center font-mono space-y-7"
          >
            
            <div>
              <label
                className="block text-gray-800 font-semibold text-sm"
              >
                CGPA / SGPA 
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="CGPA"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-orange-500"
                  value={formData.CGPA}
                onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-gray-800 font-semibold text-sm"
              >
                PROJECTS
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="Projects"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-orange-500"
                  value={formData.Projects}
                onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-gray-800 font-semibold text-sm"
              >
                WORKSHOPS/CERTIFICATIONS
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="WorkshopsCertifications"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-orange-500"
                  value={formData.WorkshopsCertifications}
                onChange={handleInputChange}
                />
              </div>
            </div>
        
             <div>
              <label
                className="block text-gray-800 font-semibold text-sm"
              >
                EXTRACURRICULAR ACTIVITES
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="ExtracurricularActivities"
                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-orange-500"
                  value={formData.ExtracurricularActivities}
                onChange={handleInputChange}
                />
              </div>
            </div>       
            <div className="button-borders">
            <button
              className="primary-button"
              type="submit"
              onClick={handleStartAnalysis}
            >
              FINAL SUBMIT
            </button>
          </div>
          
          </form>
          <button
            onClick={resetStates}
            className="pt-10 text-xs font-mono cursor-pointer duration-200 hover:scale-125 active:scale-100"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              className="stroke-blue-300"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M11 6L5 12M5 12L11 18M5 12H19"
              ></path>
            </svg>
            RESTART
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
