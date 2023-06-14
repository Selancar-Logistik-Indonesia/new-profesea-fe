import axios from "axios";
import authConfig from 'src/configs/auth'

axios.interceptors.request.use(
    config => {
        config.baseURL = "http://localhost:8080/api"
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(authConfig.storageTokenKeyName)}`;
        
return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const get = (path: string) => {
    return axios.get(path);
}

const post = (path: string, data?: any) => {
    return axios.post(path, data);
}

export {
    get,
    post,
}
