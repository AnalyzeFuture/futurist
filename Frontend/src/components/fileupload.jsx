import React from 'react';
import './fileudt.css'; // Assuming you have your CSS file in the same directory
import { useState } from 'react';
import uploadpng from '../assets/upload.png';
import axios from 'axios';
function FileUploadForm() {
    
    function uploadfile(){
        const data = new FormData();
        data.append("file")
        data.append(
            "upload_pereset","fdbjitkg"
        );
        try{
            let cloudName = "dhedlkgfi";
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

            const res = axios.post(api,data);
            const {secure_url} = res.data
            return secure_url;
        }
         catch(error){
            console.log(error);
         }
    }
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
    <form onSubmit={uploadfile} className="file-upload-form">
      <label htmlFor="file" className="file-upload-label">
        <div className="file-upload-design">
            <img src={uploadpng} alt='png-upload' className='w-20 h-20' />
          <p>Drag and Drop</p>
          <p>or</p>
          <p>Browse File</p>
          {/* <span className="browse-button">Browse file</span> */}
        </div>
        <input id="file" accept='image/*' type="file" />
        
      </label>
    </form>
    <button type='submit' className=" w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out">
    <span className="font-medium text-[#333] group-hover:text-white">Upload</span>
    </button>
  

    </div>  

    
  );
}

export default FileUploadForm;
