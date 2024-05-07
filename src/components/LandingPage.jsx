import axios from "axios";
import { useEffect } from "react";
import ArticleBlock from "./ArticleBlock";

function LandingPage({ articles, setArticles }) {
  useEffect(() => {
    axios
      .get("https://news-api-project-hj1l.onrender.com/api/articles")
      .then((response) => {
        const { articles } = response.data;
        setArticles(articles);
      });
  }, []);

  console.log(articles);

  return (
    <>
      <ul>
        {articles.map((article, index) => {
          return <ArticleBlock key={index} article={article} />;
        })}
      </ul>
    </>
  );
}

export default LandingPage;
