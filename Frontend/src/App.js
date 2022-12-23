import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CreatePage from "./Pages/CreatePage";
import Home from "./Pages/Home";
import UpdatePage from "./Pages/UpdatePage";


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/update" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
