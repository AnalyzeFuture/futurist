
const Footer = () => {
    return (
      <footer className=" bottom-0 left-0 right-0  relative flex flex-col items-center p-1 bg-black text-white">
        <div className="relative flex gap-10 md:gap-20 flex-row pt-10">
         
        
        </div>
        <div className="relative lg:mx-12 mt-6 w-11/12 h-px bg-gray-300">
          <br />
        </div>
        <div className="relative flex flex-col justify-center items-center font-mono font-medium py-4 sm:py-7 sm:p-8 lg:p-5 text-6xl sm:text-8xl md:text-9xl xl:text-10xl" >
          <a>
          FUTURIST
          </a>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
        text-center pt-2 font-mono text-gray-200 text-sm pb-8 space-x-20"
        >
  
          <span>©<span className="text-orange-500"> 2024</span>,</span>
          <span>provides <span className="text-orange-500">CV</span> Analysis</span>
          <span>Explore Our Terms & Privacy</span>
        </div>
      </footer>
    );
  };
  
  export default Footer;