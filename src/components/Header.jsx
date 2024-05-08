import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import user from "../assets/hardcodedUser";

function Header() {
  const [topics, setTopics] = useState([]);

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
      <header>
        <div className="header">
          <Link to={"/"}>
            <h1>Northcoders' News</h1>
          </Link>
          <div className="user-icon">
            <img src={user.avatar_url} alt="User avatar." />
            <h2>{user.name}</h2>
          </div>
        </div>
        <nav>
          {topics.map((topic, index) => {
            return (
              <Link to={`/articles?topic=${topic.slug}`} key={index}>
                <p>{topic.slug}</p>
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}

export default Header;
