import axios from './axios';

const fetchAllUser = () => {
    return axios.get("/api/users?page=1");
}

export { 
    fetchAllUser 
}