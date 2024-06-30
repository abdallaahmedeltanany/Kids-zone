import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Componants/Navbar/Navbar";
import Hero from "./Componants/Hero/Hero";
import Services from "./Componants/Services/Services";
import Footer from "./Componants/Footer/Footer";
import OurTeam from "./Componants/OurTeam/OurTeam";
import AboutUs from "./Componants/AboutUs/AboutUs";
import Home from "./Screens/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnLetter from "./Screens/LearnLetter/LearnLetter";
import ChooseLang from "./Componants/ChooseLang/ChooseLang";
import LearnLetterA from "./Screens/LearnLetter/LearnLetterA";
import LearnNumber from "./Screens/LearnNumber/LearnNumber";
import LearnNumberA from "./Screens/LearnNumber/LearnNumberA";
import ScrollToTop from "./scrollTop";
import Feedbacks from "./Screens/Feedbacks/Feedbacks";
import Profile from "./Screens/Profile/Profile";
import WriteWord from "./Screens/WriteWord/WriteWord";
import WriteWordA from "./Screens/WriteWord/WriteWordA";
import Draw from "./Screens/Draw/Draw";
import ArabicStory from "./Screens/Story/ArabicStory";
import EnglishStory from "./Screens/Story/EnglishStory";
import StoryContent from "./Screens/Story/StoryContent";
import ArabicStoryContent from "./Screens/Story/ArabicStoryContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chooselanguage" element={<ChooseLang/>} />
          <Route path="/learnletter" element={<LearnLetter/>} />
          <Route path="/learnletterarabic" element={<LearnLetterA/>} />
          <Route path="/learnnumber" element={<LearnNumber/>} />
          <Route path="/learnnumberarabic" element={<LearnNumberA/>} />
          <Route path="/feedbacks" element={<Feedbacks/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/word" element={<WriteWord/>} />
          <Route path="/wordarabic" element={<WriteWordA/>}/>
          <Route path="/draw" element={<Draw/>}/>
          <Route path="/arabicstory" element={<ArabicStory/>}/>
          <Route path="/englishstory" element={<EnglishStory/>}/>
          <Route path="/Storycontent" element={<StoryContent/>}/>
          <Route path="/arabicstorycontent" element={<ArabicStoryContent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
