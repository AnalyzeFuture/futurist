import { Link} from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect , useState} from "react";

import LoadingBar from "react-top-loading-bar";
const Logo =({setActiveTab})=>{
    const [progress, setProgress] = useState(0)
    useEffect(()=>{
        setProgress(45);
        setTimeout(() => {
            setProgress(100);
        }, 1500);
    },[]);

    return(
        <div className="flex flex-col justify-center items-center px-5 sm:ml-8">
         <LoadingBar
        color='#ff6500'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        /> 
        <Link
        
          to={`/`}
          onClick={() => {
            setActiveTab();
            setProgress();
          }
          
          }>
            
        
          <div className=" ">
             <img src={logo} className="w-20 h-20" alt="Logo" />
            </div>
            <div className=" text-xs mt-2 hover:text-orange-400 text-center  font-mono">
              <span className="text-orange-600">F</span>UTURIST
            </div>
        </Link>
      </div>
    )


}

export default Logo 
