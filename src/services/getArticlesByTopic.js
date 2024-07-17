import axios from "axios";

export const getArticlesByTopic = async (topic, limit, filter, order) => {
  try {
    const response = await axios.get(
      `https://news-api-project-hj1l.onrender.com/api/articles?topic=${topic}&&limit=${limit}&&sort_by=${filter}&&order=${order}`
    );
    const { selectedArticles } = response.data;
    return selectedArticles;
  } catch (error) {
      console.log('Error getting articles')
    throw error;
  }
};
