import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Read from "../src/components/Pdf/Read";
import Dsa from "../src/components/Pdf/Dsa";
import Os from "../src/components/Pdf/Os";
import Toc from "../src/components/Pdf/Toc";
import Web from "../src/components/Pdf/Web";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/read" element={<Read />} />
        <Route path="/dsa" element={<Dsa/>} />
        <Route path="/os" element={<Os/>} />
        <Route path="/toc" element={<Toc/>} />
        <Route path="/wt" element={<Web/>} /> 
        
        <Route path="/*" element={
          <>  {/* All other routes get header/footer */}
            <Header />
            <Routes> {/* Nested routes for other pages */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/courses" element={<CourseHome />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/pricing" element={<Pricing />} />
              <Route exact path="/journal" element={<Blog />} />
              <Route exact path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
