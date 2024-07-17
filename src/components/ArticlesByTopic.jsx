import { useLocation } from "react-router-dom";
import ArticleBlockSmall from "./ArticleBlockSmall";
import ErrorPage from "./ErrorPage";
import { getArticlesByTopic } from "../services/getArticlesByTopic";
import { useEffect, useState } from "react";

function ArticlesByTopic({ users }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic");
  const [filter, setFilter] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticlesByTopic(topic, limit, filter, order);
        setArticlesByTopic(data);
      } catch (error) {
        setError("Topic not found");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [topic, limit, filter, order]);

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
    setLoading(false);
    window.scrollTo(0, currentScrollPosition);
    setLimit((currLimit) => {
      return currLimit + 3;
    });
  }

  if (error) {
    return <ErrorPage />;
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
      <h3 className="topic-title">{topic}</h3>
      <ul className="topic-page">
        {articlesByTopic.map((article, index) => {
          return (
            <ArticleBlockSmall key={index} article={article} users={users} />
          );
        })}
      </ul>
      <div className="load-more">
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <button onClick={handleLoadMore}>Load more</button>
        )}
      </div>
    </>
  );
}

export default ArticlesByTopic;
