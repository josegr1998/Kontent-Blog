import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer/Footer";
import SingleArticle from "./Components/SingleArticle/SingleArticle";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/posts/:slug' element={<SingleArticle />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
