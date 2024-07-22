import { useEffect, useState } from "react";
import ArticleBlock from "./ArticleBlock";
import FeaturedSidebar from "./FeaturedSidebar";
import { getRecentArticles } from "../services/getRecentArticles";
import "../styles/LandingPage.css";

function LandingPage({ users }) {
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getRecentArticles();
        setRecentArticles(data);
      } catch (error) {
        console.log("error fetching articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <h3>Loading ...</h3>;
  }

  return (
    <>
      <main className="content-grid">
        <div className="featured-article">
          {recentArticles.slice(0, 2).map((article, index) => {
            return <ArticleBlock key={index} article={article} users={users} />;
          })}
        </div>
        <ul className="article-list">
          {recentArticles.slice(2).map((article, index) => {
            return <ArticleBlock key={index} article={article} users={users} />;
          })}
        </ul>
        <FeaturedSidebar users={users} />
      </main>
    </>
  );
}

export default LandingPage;
