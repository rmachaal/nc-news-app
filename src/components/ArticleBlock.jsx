import { Link } from "react-router-dom";
import { findUser } from "../assets/utils";

function ArticleBlock({ article, users }) {
  const date = new Date(article.created_at);
  const format = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);

  const user = findUser(article, users)
  
  return (
    <>
      <li className="article-block">
        <img src={article.article_img_url} alt={article.title} />
        <p className="topic">{article.topic}</p>
        <div className="title-comments-votes">
          <Link
            className="article-title-link-large"
            to={`/articles/${article.article_id}`}
          >
            <h3>{article.title}</h3>
          </Link>
          <p>Comments ({article.comment_count})</p>
          <p>{article.votes} votes</p>
        </div>

        <div className="author-date">
          <p>{user.name}</p>
          <p>{formattedDate}</p>
        </div>
      </li>
    </>
  );
}

export default ArticleBlock;
