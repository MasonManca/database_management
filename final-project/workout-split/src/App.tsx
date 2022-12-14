import React from 'react';
import Navbar from './main-page-components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import MainInputs from './main-page-components/MainInputs';
import Exercises from './pages/Exercises/Exercises';
import ScientificResearch from './pages/ScientificResearch/ScientificResearch';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tips from './pages/Tips/Tips';
import AllSplits from './pages/AllSplits/AllSplits';
import YourSplit from './pages/YourSplit/YourSplit';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Exercises" element={<Exercises/>} /> 
          <Route path="/Scientific" element={<ScientificResearch/>} />
          <Route path="/Tips" element={<Tips/>} />
          <Route path="/AllSplits" element={<AllSplits/>} />
          <Route path="/YourSplit/:id" element={<YourSplit/>}></Route>
        </Routes>
  </Router>
  );
}

export default App;
