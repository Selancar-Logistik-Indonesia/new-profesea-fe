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

const get = (path: string, params?: any) => {
    return axios.get(path, {
        params: params
    });
}

const post = (path: string, data?: any): Promise<AxiosResponse> => {
    let option = {};

    console.log(data);

    console.log("test: ", (data instanceof FormData));

    if (data instanceof FormData) {
        option = {
            ...option,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    };

    return axios.post(path, data, option)
}

const patch = (path: string, data?: any): Promise<AxiosResponse> => {
    return axios.patch(path, data)
}
const patchFormdata = (path: string, data?: any): Promise<AxiosResponse> => {
     let option = {}
     debugger;
     if (data instanceof FormData) {
       option = {
         ...option,
         method: 'PATCH',
         headers: {
           'Content-Type': 'multipart/form-data'
         },
         body: data
       }
     }

     return axios.patch(path, data, option) 
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

const downloadFile = (path: string, filename: string) => {
    return axios.get(path, { responseType: 'blob' })
        .then(response => response.data)
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a); // append the element to the dom
            a.click();
            a.remove(); // afterwards, remove the element  
        })
        .catch(error => {
            console.error(error);
        });
}

export { get, post, patch, del, postFile, downloadFile, patchFormdata }
