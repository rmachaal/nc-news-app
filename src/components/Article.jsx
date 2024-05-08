import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../assets/utils";

function Article({ users }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchArticle = axios.get(
      `https://news-api-project-hj1l.onrender.com/api/articles/${article_id}`
    );

    const fetchComments = axios.get(
      `https://news-api-project-hj1l.onrender.com/api/articles/${article_id}/comments`
    );

    Promise.all([fetchArticle, fetchComments]).then((response) => {
      const { article } = response[0].data;
      const { comments } = response[1].data;
      setArticle(article);
      setComments(comments);
      setLoading(false);
    });
  }, [article_id]);

  if (loading) {
    return (
      <div>
        <h3>Loading ...</h3>;
      </div>
    );
  }

  const userIndex = users.findIndex((user) => {
    return user.username === article.author;
  });
  const user = users[userIndex];

  return (
    <>
      <article>
        <p className="topic">{article.topic}</p>
        <h3 className="article-title-individual">{article.title}</h3>
        <div className="article-details-individual">
          <img
            src={user.avatar_url}
            alt="User avatar"
            className="article-user-icon"
          />
          <div className="author-date-individual">
            <p>{user.name}</p>
            <p>{formatDate(article.created_at)}</p>
          </div>
          <p>Votes {article.votes}</p>
        </div>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
      </article>
      <section>
        <h4 className="comments-header">Comments</h4>
        {comments.map((comment, index) => {
          const userIndex = users.findIndex((user) => {
            return user.username === comment.author;
          });
          const user = users[userIndex];
          return (
            <div key={index} className="comments">
              <img
                src={user.avatar_url}
                alt="User avatar."
                className="comments-user-icon"
              />
              <p>{user.name}</p>
              <div className="comments-details">
                <p>{comment.body}</p>
                <div className="comments-votes-date">
                  <p>Votes {comment.votes}</p>
                  <p>Date {formatDate(comment.created_at)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Article;
