import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main.js";
import ScrollButton from "./components/scroll/ScrollButton";
import PropertyPage from "./components/PropertyPage.js";
import Records from "./properties.json";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route path="/" element={<Main />} />

        {/* Property Details Page */}
        <Route
          path="/product/:id"
          element={<PropertyPage properties={Records.properties} />}
        />
      </Routes>
      <ScrollButton />
    </Router>
  );
}

export default App;
