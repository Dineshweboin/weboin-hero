import axios from 'axios';

const API_BASE_URL = 'http://localhost:1337/api';

export const fetchHeroSections = async () => {
  try {
    console.log("Sending request to Strapi...");
    const response = await axios.get(`${API_BASE_URL}/herosections?populate=*`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hero sections:", error);
    throw error;
  }
};