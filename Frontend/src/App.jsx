import "./App.css";
import HomePg from "./components/homepage";
import NavBar from "./components/navbar";
function App() {
  return (
    <div className="main-body w-screen h-screen bg-white">
      <NavBar />
      <HomePg />
    </div>
  );
}

export default App;
