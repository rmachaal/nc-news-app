import axios from "axios";
import { useEffect, useState } from "react";
import ArticleBlock from "./ArticleBlock";

function LandingPage({ articles, setArticles }) {
  const [filter, setFilter] = useState("created_at");
  const [order, setOrder] = useState("DESC");

  useEffect(() => {
    axios
      .get(
        `https://news-api-project-hj1l.onrender.com/api/articles?sort_by=${filter}&&order=${order}`
      )
      .then((response) => {
        const { articles } = response.data;
        setArticles(articles);
      });
  }, [filter, order]);

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  function handleOrder(e) {
    setOrder(e.target.value);
  }

  return (
    <>
      <div className="article-filter">
        <label htmlFor="article-filter">Filter</label>
        <select id="article-filter" value={filter} onChange={handleFilter}>
          <option value="created_at">date</option>
          <option value="comment_count">comment count</option>
          <option value="votes">votes</option>
        </select>
        <label htmlFor="order">Order</label>
        <select id="order" value={order} onChange={handleOrder}>
          <option value="DESC">descending</option>
          <option value="ASC">ascending</option>
        </select>
      </div>
      <ul>
        {articles.map((article, index) => {
          return <ArticleBlock key={index} article={article} />;
        })}
      </ul>
    </>
  );
}

export default LandingPage;
