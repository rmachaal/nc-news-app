import axios from "axios";
import { useEffect, useState } from "react";
import ArticleBlock from "./ArticleBlock";
import FeaturedSidebar from "./FeaturedSidebar";
import { getRecentArticles } from "../services/getRecentArticles";

function LandingPage({ users }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const filter = "created_at";
  const order = "DESC";
  const limit = 5;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getRecentArticles(limit, filter, order);
        setArticles(data);
      } catch (error) {
        console.log("error fetching articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [limit, filter, order]);

  if (loading) {
    return <h3>Loading ...</h3>;
  }

  return (
    <>
      <div className="content-grid">
        <main className="main-content">
          <div className="featured-article">
            {articles.length > 0 && (
              <ArticleBlock
                article={articles[0]}
                users={users}
                featured={true}
              />
            )}
          </div>
          <ul className="article-list">
            {articles.slice(1).map((article, index) => {
              return (
                <ArticleBlock key={index} article={article} users={users} />
              );
            })}
          </ul>
        </main>
        <FeaturedSidebar users={users} />
      </div>
    </>
  );
}

export default LandingPage;
