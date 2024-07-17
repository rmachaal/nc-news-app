import axios from "axios";

export const getRecentArticles = async ( limit, filter, order) => {
  try {
    const response = await axios.get(
      `https://news-api-project-hj1l.onrender.com/api/articles?limit=${limit}&&sort_by=${filter}&&order=${order}`
    );
    const { selectedArticles } = response.data;
    return selectedArticles;
  } catch (error) {
    console.log("Error getting articles");
    throw error;
  }
};
