import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage articles={articles} setArticles={setArticles} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
