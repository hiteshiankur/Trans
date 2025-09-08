import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchHomepageContent = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/homepage`);
    return response.data.homepage; // API returns { homepage: {...} }
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    throw error;
  }
};
