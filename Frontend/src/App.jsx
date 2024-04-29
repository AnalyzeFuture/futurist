import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingBar from 'react-top-loading-bar';
import NavBar from './components/navbar';
import HomePage from './components/homepage';
import AboutUsPage from './components/Aboutus';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import CheckIt from './components/CheckIt';
function App() {
  
  const [progress, setProgress] = useState(0);
  const {user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

 return (
    
      <main className="body relative  w-screen h-screen bg-white ">
        <BrowserRouter>

          <NavBar  />
          <LoadingBar color="#FF6500" progress={progress} onLoaderFinished={() => setProgress(0)} />
           
            <Routes>
            <Route path="/" element={<HomePage setProgress={setProgress} />} />
            <Route path="/aboutUsPage" element={<AboutUsPage setProgress={setProgress} />} />
            <Route path="/contactus" element={<ContactUs setProgress={setProgress} />} />
            <Route path="/checkit" element={<CheckIt setProgress={setProgress} location={location}/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>
    
  );
}

export default App;
