import { useState, useEffect } from "react";
import uploadpng from "../assets/upload.png";

const UploadFile = () => {
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (uploadSuccess) {
      timer = setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [uploadSuccess]);

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

      const finalDataToBackend = await fetch(`http://127.0.0.1:8000/api/post/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!finalDataToBackend.ok) {
        throw new Error("Failed to send image URL to backend");
      }
      

      const RunBackendOnPost = await fetch(`http://127.0.0.1:8000/gemini-analysis/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!RunBackendOnPost.ok) {
        throw new Error("Failed to send image URL to backend");
      }
      
      setImagePreview(null);
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the image");
    } finally {
      setIsLoading(false);
    }


    
  };
  
  

  return (
    <div className="flex relative flex-row justify-center items-center gap-20">
      <div className="flex relative mt-40  flex-col justify-center items-center gap-5">
        <form
          onSubmit={uploadImage}
          className="flex flex-col items-center my-7"
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
          <p className="pt-10">
            {isLoading ? (
              "Uploading..."
            ) : (
              <button className="border text-white duration-300 relative group cursor-pointer overflow-hidden h-16 w-48 rounded-md bg-gray-800 p-2 font-extrabold hover:bg-gray-900">
                <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-yellow-500"></div>
                <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-orange-500"></div>
                <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-pink-500"></div>
                <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-red-600"></div>
                <p className="z-10 absolute bottom-2 left-2">Upload</p>
              </button>
            )}
          </p>
        </form>
        {uploadSuccess && <p>Uploaded successfully!</p>}
      </div>
      <div className="flex relative mt-20 w-full justify-center items-center">
        {imagePreview && (
          <img className="w-8/12 " src={imagePreview} alt="image-cv" />
        )}
      </div>
    </div>
  );
};

export default UploadFile;
