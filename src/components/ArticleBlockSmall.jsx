import { Link } from "react-router-dom";
import { findUser } from "../assets/utils";

function ArticleBlockSmall({ article, users }) {
  const date = new Date(article.created_at);
  const format = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);

  const user = findUser(article, users);

  return (
    <>
      <li className="article-block-small">
        <img src={article.article_img_url} alt={article.title} />
        <div className="article-details-small">
          <Link
            className="article-title-link"
            to={`/articles/${article.article_id}`}
          >
            <h3>{article.title}</h3>
          </Link>
          <div className="author-date">
            <p>{user.name}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default ArticleBlockSmall;
