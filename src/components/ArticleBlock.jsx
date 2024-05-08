import { Link } from "react-router-dom";

function ArticleBlock({ article }) {
  const date = new Date(article.created_at);
  const format = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);

  return (
    <>
      <li className="article-block">
        <img src={article.article_img_url} alt={article.title} />
        <p className="topic">{article.topic}</p>
        <Link
          className="article-title-link-large"
          to={`/articles/${article.article_id}`}
        >
          <h3>{article.title}</h3>
        </Link>
        <div className="author-date">
          <p>{article.author}</p>
          <p>{formattedDate}</p>
        </div>
      </li>
    </>
  );
}

export default ArticleBlock;
