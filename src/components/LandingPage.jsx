import axios from "axios";
import { useEffect, useState } from "react";
import ArticleBlock from "./ArticleBlock";

function LandingPage({ articles, setArticles, users }) {
  const [filter, setFilter] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://news-api-project-hj1l.onrender.com/api/articles?limit=${limit}&&sort_by=${filter}&&order=${order}`
      )
      .then((response) => {
        const { selectedArticles } = response.data;
        setArticles(selectedArticles);
        setLoading(false);
      });
  }, [limit, filter, order]);

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  function handleOrder(e) {
    setOrder(e.target.value);
  }

  function handleLoadMore(event) {
    event.preventDefault();
    const currentScrollPosition = window.scrollY;

    setLoading(true);

    axios
      .get(
        `https://news-api-project-hj1l.onrender.com/api/articles?limit=${
          limit + 3
        }&&sort_by=${filter}&&order=${order}`
      )
      .then((response) => {
        const { selectedArticles } = response.data;
        setArticles(selectedArticles);
        setLoading(false);
        window.scrollTo(0, currentScrollPosition);
      });

    setLimit((currLimit) => {
      return currLimit + 3;
    });
  }

  // if (loading) {
  //   return <h3>Loading ...</h3>;
  // }

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
          return <ArticleBlock key={index} article={article} users={users} />;
        })}
      </ul>
      <div>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <button onClick={handleLoadMore}>Load more</button>
        )}
      </div>
    </>
  );
}

export default LandingPage;
