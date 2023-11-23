import axios from 'axios';

const API_URL = 'https://trasteat-bfdad022aa39.herokuapp.com';

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
