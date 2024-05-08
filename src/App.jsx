import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import ArticlesByTopic from "./components/ArticlesByTopic";
import Article from "./components/Article";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://news-api-project-hj1l.onrender.com/api/users")
      .then((response) => {
        const { users } = response.data;
        setUsers(users);
      });
  }, []);

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
        <Route
          path="/articles"
          element={<ArticlesByTopic articles={articles} />}
        />
        <Route
          path="/articles/:article_id"
          element={<Article users={users} />}
        />
      </Routes>
    </>
  );
}

export default App;
