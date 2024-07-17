import axios from "axios";

export const getTopArticles = async () => {
  try {
    const response = await axios.get(
      `https://news-api-project-hj1l.onrender.com/api/articles?limit=5&&sort_by=votes&&order=DESC`
    );
    const { selectedArticles } = response.data;
    return selectedArticles;
  } catch (error) {
    console.log("Error getting articles");
    throw error;
  }
};
