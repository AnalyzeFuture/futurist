import { UploadDropzone } from "@bytescale/upload-widget-react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
  apiKey: "public_W142iZbE5ZmgTyubGNmmihyRe3PQ", // Get API key: https://www.bytescale.com/get-started
  maxFileCount: 1,
  showFinishButton: false, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  
  styles: {
    colors: {
      primary: "#377dff"
    }
  }
};

const MyuploadedFiles = () => (
  <UploadDropzone options={options}
                  onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                  onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
                  width="700px"
                  height="450px" />
)

export default MyuploadedFiles;