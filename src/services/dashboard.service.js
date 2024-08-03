import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dashboard';

const getStats = async () => {
    const response = await axios.get(API_URL+ "/stats");
    return response.data;
};

export default {
    getStats
};
