import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Agenda from "./pages/Agenda";
import { IconButton } from "@mui/material";
import MenuButton from "./MenuButton";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div></div>
        <span className="header-title">
          Portail familial de Bourniquel
        </span>{" "}
        <MenuButton />
      </div>

      <div className="calendar-container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Agenda />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
