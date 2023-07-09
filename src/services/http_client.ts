import axios, { AxiosResponse } from "axios";
import { AppConfig } from "src/configs/api";
import authConfig from 'src/configs/auth'

axios.interceptors.request.use(
    config => {
        config.baseURL = AppConfig.baseUrl
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(authConfig.storageTokenKeyName)}`;
        config.headers['package'] = AppConfig.package;
        config.headers['Accept-Language'] = 'en';

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const get = (path: string) => {
    return axios.get(path);
}

const post = (path: string, data?: any): Promise<AxiosResponse> => {
    return axios.post(path, data)
}

const patch = (path: string, data?: any): Promise<AxiosResponse> => {
    return axios.patch(path, data)
}

const del = (path: string, data?: any): Promise<AxiosResponse> => {
    return axios.delete(path, data)
}

const postFile = (path: string, data?: any): Promise<AxiosResponse> => {
    return axios.post(path, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
}

const patchFile = (path: string, data?: any): Promise<AxiosResponse> => {
    return axios.patch(path, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
}

export {
    get,
    post,
    patch,
    del,
    postFile,
    patchFile,
}
