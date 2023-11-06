import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Agenda from "./pages/Agenda";
import { Drawer } from "@mui/material";
import Connexion from "./pages/Connexion";
import Regles from "./pages/Regles";

function App() {
  const [down, setDown] = useState(false);

  return (
    <div className="App">
      <div className="App-header">
        <div className="header-placeholder"></div>
        <span className="header-title">
          Portail familial de Bourniquel
        </span>{" "}
        <span
          className={`menuButton-span ${down ? "change" : ""}`}
          onClick={(e) => setDown(!down)}
        >
          ⮛
        </span>
      </div>
      <Drawer anchor="top" open={down} onClose={() => setDown(!down)}>
        <div className="menu">
          <div className="menu-item">Agenda</div>
          <div className="menu-item">Règles de vie</div>
          <div className="menu-close" onClick={() => setDown(!down)}>
            X
          </div>
        </div>
      </Drawer>

      <div className="calendar-container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Agenda />} />
            <Route path="/" element={<Connexion />} />
            <Route path="regles" element={<Regles />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
