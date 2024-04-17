import { useState, useEffect } from "react";
import "./fileudt.css";
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

      const imgData = await response.json();
      const imageURL = imgData.url.toString();
      setImagePreview(null);
      setUploadSuccess(true);
      setIsLoading(false);
      alert(imageURL);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <form
          onSubmit={uploadImage}
          className="file-upload-form flex-col my-10"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="file" className="file-upload-label flex flex-col">
            <div className="file-upload-design">
              <img
                src={uploadpng}
                alt="png-upload"
                className="w-20 h-20"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
              <p>Drag and Drop</p>
              <p>or</p>
              <p>Browse File</p>
            </div>
            <input
              id="file"
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <p className="flex flex-col pt-10">
            {isLoading ? (
              "Uploading..."
            ) : (
              <button
                type="submit"
                className="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out"
              >
                <span className="font-medium text-[#333] group-hover:text-white">
                  Upload
                </span>
              </button>
            )}
          </p>
        </form>
        {uploadSuccess && <p>Uploaded successfully!</p>}
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {imagePreview && (
          <img className="w-44 " src={imagePreview} alt="image-cv" />
        )}
      </div>
    </>
  );
};

export default UploadFile;
