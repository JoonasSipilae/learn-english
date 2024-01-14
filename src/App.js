//Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Nav from "./Nav";
import Main from "./Main";
import Info from "./Info";
import ManagePanel from "./ManagePanel";



//Navbar with router
function App() {
  return (
    <Router>
      <div className="Home-bg">
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="main" element={<Main />} />
          <Route path="info" element={<Info />} />
          <Route path="panel" element={<ManagePanel />} />
          <Route component={NoMatchPage} />
        </Routes>
      </div>
    </Router>
  );
}

//404 error
const NoMatchPage = () => {
  return (
    <h1>
      <b>404 - Not found</b> <br></br> <i>Seriously, What did you expect?</i>
    </h1>
  );
};

//Main page / Todo page
<div classname="Wholepage">
  <Main />
</div>;

export default App;
