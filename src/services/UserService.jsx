import axios from './axios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreatUser = (name, job) => {
    return axios.post("/api/users/", {name, job});
}

const putUpdateUser = (name, job) => {
    return axios.put("/api/users/", {name, job});
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}

export { 
    fetchAllUser, postCreatUser, putUpdateUser, deleteUser
}