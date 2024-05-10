import { useLocation } from "react-router-dom";
import ArticleBlockSmall from "./ArticleBlockSmall";
import ErrorPage from "./ErrorPage";

function ArticlesByTopic({ articles, topics }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic");

  const articlesByTopic = articles.filter((article) => {
    return article.topic === topic;
  });

  if (!topics.some((item) => item.slug === topic)) {
    return <ErrorPage />;
  }

  return (
    <>
      <h3 className="topic-title">{topic}</h3>
      <ul>
        {articlesByTopic.map((article, index) => {
          return <ArticleBlockSmall key={index} article={article} />;
        })}
      </ul>
    </>
  );
}

export default ArticlesByTopic;
