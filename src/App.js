import logo from "./logo.svg";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import FileContext from "./Context/FileContext";
import { useState } from "react";
import OPALayout from "./Components/ConfigureOPA/OPALayout/OPALayout";

function App() {
  const [file, setFile] = useState();
  return (
    <FileContext.Provider value={[file, setFile]}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/addOPA" element={<OPALayout />} />
      </Routes>
    </FileContext.Provider>
  );
}

export default App;
