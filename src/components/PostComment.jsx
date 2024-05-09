import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import user from "../assets/hardcodedUser";
import axios from "axios";

function PostComment({ article_id, setComments, newComment, setNewComment }) {
  const [submitted, setSubmitted] = useState(false);
  const username = user.username;

  function handleSubmit(event) {
    event.preventDefault();

    const postContent = {
      body: newComment,
      username: username,
    };

    const newPost = {
      body: newComment,
      article_id: article_id,
      author: username,
      votes: 0,
    };

    if (newComment.length > 0) {
      setComments((currComments) => {
        return [...currComments, newPost];
      });
      axios
        .post(
          `https://news-api-project-hj1l.onrender.com/api/articles/${article_id}/comments`,
          postContent
        )
        .then(() => {
          setNewComment("");
          setSubmitted(true);
        });
    }
  }

  return (
    <section className="comment-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-input">Leave a comment:</label>
        <input
          type="text"
          id="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-button" disabled={submitted}>
          Send
        </button>
      </form>
      {submitted && <p>Comment sent!</p>}
    </section>
  );
}

export default PostComment;
