import "./App.css";
import Navbar, { CountryProvider } from "./components/Sections/Navbar";
import Hero from "./components/Sections/Hero";
import Sales from "./components/Sections/Sales";
import Plans from "./components/Sections/Plans";
import Footer from "./components/Sections/Footer";

function App() {
  return (
    <CountryProvider>
      <div className="font-sans">
        <Navbar />
        <Hero />
        <Sales />
        <Plans />
        <Footer/>
      </div>
    </CountryProvider>
  );
}

export default App;
