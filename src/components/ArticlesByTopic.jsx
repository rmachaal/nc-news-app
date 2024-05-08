import { useLocation } from "react-router-dom";
import ArticleBlock from "./ArticleBlock";
import ArticleBlockSmall from "./ArticleBlockSmall";

function ArticlesByTopic({ articles }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic");

  const articlesByTopic = articles.filter((article) => {
    return article.topic === topic;
  });

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
