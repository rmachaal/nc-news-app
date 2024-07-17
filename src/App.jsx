import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import ArticlesByTopic from "./components/ArticlesByTopic";
import Article from "./components/Article";
import axios from "axios";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://news-api-project-hj1l.onrender.com/api/users")
      .then((response) => {
        const { users } = response.data;
        setUsers(users);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://news-api-project-hj1l.onrender.com/api/topics")
      .then((response) => {
        const { topics } = response.data;
        setTopics(topics);
      });
  }, []);

  return (
    <>
      <Header topics={topics} setTopics={setTopics} />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              users={users}
            />
          }
        />
        <Route
          path="/articles"
          element={
            <ArticlesByTopic
              users={users}
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={<Article users={users} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
