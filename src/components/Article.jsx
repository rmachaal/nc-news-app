import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../assets/utils";
import PostComment from "./PostComment";
import hardcodedUser from "../assets/hardcodedUser";
import ErrorPage from "./ErrorPage";

function Article({ users }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [votesError, setVotesError] = useState(false);
  const [error, setError] = useState(false);

  const loggedUser = hardcodedUser.username;

  useEffect(() => {
    setLoading(true);

    const fetchArticle = axios.get(
      `https://news-api-project-hj1l.onrender.com/api/articles/${article_id}`
    );

    const fetchComments = axios.get(
      `https://news-api-project-hj1l.onrender.com/api/articles/${article_id}/comments`
    );

    Promise.all([fetchArticle, fetchComments])
      .then((response) => {
        const { article } = response[0].data;
        const { comments } = response[1].data;
        setArticle(article);
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  if (loading) {
    return <h3>Loading ...</h3>;
  }

  const userIndex = users.findIndex((user) => {
    return user.username === article.author;
  });
  const user = users[userIndex];

  function handleDelete(comment_id) {
    setDeleted(true);
    setComments((currComments) => {
      return currComments.filter(
        (comment) => comment.comment_id !== comment_id
      );
    });
    axios.delete(
      `https://news-api-project-hj1l.onrender.com/api/comments/${comment_id}`
    );
  }

  function handleIncVote(event) {
    event.preventDefault();
    setArticle((currArticle) => {
      const updatedArticle = { ...currArticle };
      updatedArticle.votes++;
      return updatedArticle;
    });
    axios
      .patch(
        `https://news-api-project-hj1l.onrender.com/api/articles/${article_id}`,
        { inc_votes: 1 }
      )
      .catch(() => {
        setVotesError(true);
      });
  }

  function handleDecVote(event) {
    event.preventDefault();
    setArticle((currArticle) => {
      const updatedArticle = { ...currArticle };
      updatedArticle.votes--;
      return updatedArticle;
    });
    axios.patch(
      `https://news-api-project-hj1l.onrender.com/api/articles/${article_id}`,
      { inc_votes: -1 }
    );
  }

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
          <div className="article-votes">
            <p>Votes {article.votes}</p>
            <button className="article-vote-button" onClick={handleIncVote}>
              👍
            </button>
            <button className="article-vote-button" onClick={handleDecVote}>
              👎
            </button>
            {votesError && <p>Votes not updated</p>}
          </div>
        </div>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
      </article>
      <section>
        <h4 className="comments-header">Comments</h4>
        <PostComment
          article_id={article_id}
          setComments={setComments}
          newComment={newComment}
          setNewComment={setNewComment}
        />
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
              <div className="comments-user-delete">
                <p>{user.name}</p>
                {loggedUser === comment.author && (
                  <button
                    className="comments-delete-button"
                    onClick={() => handleDelete(comment.comment_id, index)}
                    disabled={deleted}
                  >
                    Delete x
                  </button>
                )}
              </div>
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
