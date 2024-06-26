import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import cryptoRandomString from 'crypto-random-string';

const generateHeaders = () => {
    const data = localStorage.getItem('user');
    let to;
    if (data) {
        to = JSON.parse(data);
        to = to.token;
    }

    const requestId = uuidv4();
    const token = cryptoRandomString({
        length: 12,
        type: 'base64',
    });

    return {
        'Authorization': `Bearer ${to}`,
        'x-app-type': 'RsRequest',
        'x-request-id': requestId,
        'x-hashed-id': CryptoJS.AES.encrypt(requestId, token).toString(),
        'x-request-token': token,
    };
};

const getRequest = (path) => {
    const config = {
        withCredentials: true,
        headers: generateHeaders(),
    };
    return axios.get(`${process.env.REACT_APP_MAIN}${path}`, config)
};

const postRequest = (path, body) => {
    const config = {
        withCredentials: true,
        headers: generateHeaders(),
    };

    return axios.post(`${process.env.REACT_APP_MAIN}${path}`, body, config)
};

const putRequest = (path, body) => {
    const config = {
        withCredentials: true,
        headers: generateHeaders(),
    };

    return axios.put(`${process.env.REACT_APP_MAIN}${path}`, body, config)
};

const deleteRequest = (path) => {
    const config = {
        withCredentials: true,
        headers: generateHeaders(),
    };
    console.log('path', config);
    return axios.delete(`${process.env.REACT_APP_MAIN}${path}`, config)
};


export { getRequest, postRequest, putRequest, deleteRequest };