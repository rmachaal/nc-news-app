function ArticleBlock({ article }) {
  const date = new Date(article.created_at);
  const format = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);

  return (
    <>
      <li className="article-block">
        <img src={article.article_img_url} alt={article.title} />
        <p className="topic">{article.topic}</p>
        <h3>{article.title}</h3>
        <div className="author-date">
          <p>{article.author}</p>
          <p>{formattedDate}</p>
        </div>
      </li>
    </>
  );
}

export default ArticleBlock;
