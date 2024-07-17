import { Link } from "react-router-dom";
import { findUser } from "../assets/utils";
import "../styles/ArticleBlock.css";

function ArticleBlock({ article, users, featured = false }) {
  const date = new Date(article.created_at);
  const format = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);

  const user = findUser(article, users);

  return (
    <>
      <li className={`article-block ${featured ? "featured" : ""}`}>
        <img src={article.article_img_url} alt={article.title} />
        <div className="article-content">
          <p className="topic">{article.topic}</p>
          <Link
            className="article-title-link-large"
            to={`/articles/${article.article_id}`}
          >
            <h3>{article.title}</h3>
          </Link>
          <div className="article-meta">
            <p className="author">{user.name}</p>
            <p className="date">{formattedDate}</p>
          </div>
          <div className="article-stats">
            <p>Comments ({article.comment_count})</p>
            <p>{article.votes} votes</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default ArticleBlock;
