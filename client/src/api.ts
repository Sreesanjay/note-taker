import axios from 'axios';
// const baseURL = "https://note-taker-7quz.onrender.com/api"
const baseURL = "http://localhost:5000/api"
const token = localStorage.getItem("token");
const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token as string)}`
    }
});
export default instance;