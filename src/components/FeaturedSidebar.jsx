import { Link } from "react-router-dom";
import { findUser } from "../assets/utils";
import { getTopArticles } from "../services/getTopArticles";
import { useEffect, useState } from "react";
import "../styles/FeaturedSidebar.css";

function FeaturedSidebar({ users }) {
  const [topArticles, setTopArticles] = useState([]);

  useEffect(() => {
    const fetchTopArticles = async () => {
      try {
        const data = await getTopArticles();
        setTopArticles(data);
      } catch (error) {
        console.log("Error fetching top articles");
      } finally {
      }
    };
    fetchTopArticles();
  }, []);

  return (
    <aside className="featured-sidebar">
      <h4>Featured</h4>
      <ul className="featured-list">
        {topArticles.map((article) => {
          const user = findUser(article, users);
          return (
            <li key={article.article_id} className="featured-item">
              <Link
                to={`/articles/${article.article_id}`}
                className="featured-link"
              >
                <img
                  src={article.article_img_url}
                  alt={article.title}
                  className="featured-img"
                />
                <div className="featured-content">
                  <h4>{article.title}</h4>
                  <p className="featured-author">{user.name}</p>
                  <p className="featured-votes">{article.votes} votes</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default FeaturedSidebar;
