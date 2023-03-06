import axios from 'axios';
import { getCookie } from '../helpers/cookieHelper';
import { templateContent, userLoginData } from '../interfaces';
export const baseURL =
    process.env.REACT_APP_NODE_ENV === 'production'
        ? `https://prod-hmg.valet2you.in`
        : 'https://dev-hmg.valet2you.in';

export const guestAppBaseURL =
    process.env.REACT_APP_NODE_ENV === 'production'
        ? `https://main.d1yxbpv58iwpc3.amplifyapp.com`
        : 'https://dev.d1yxbpv58iwpc3.amplifyapp.com';

// admin
// Secure@2033

//  axio header setup
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] =
    'GET, POST, PUT, DELETE';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        const token = getCookie('__user-token');
        if (token) {
            config.headers.common['Authorization'] = token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const { response } = error;
        const { request, ...errorObject } = response;
        if (errorObject.status === 401) {
            window.location.replace('/');
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export const loginUser = (userData: userLoginData) => {
    const response = fetch(baseURL + '/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response;
};

export const logoutUser = () => {
    const token = getCookie('__user-token');

    const response = fetch(baseURL + '/auth/logout', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });
    return response;
};

export const createTemplateContent = (templateData: templateContent) => {
    const { id, ...rest } = templateData;
    const token = getCookie('__user-token');
    const response = fetch(baseURL + '/template-contents', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(rest),
    });
    return response;
};

export const generateHotelID = () => {
    const obj = {
        name: 'Test',
        email: 'test@example.com',
    };
    const token = getCookie('__user-token');
    const response = fetch(baseURL + '/hotels', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(obj),
    });
    return response;
};

export const updateTemplateContent = (templateData: templateContent) => {
    const { id, ...rest } = templateData;
    const token = getCookie('__user-token');
    const response = fetch(baseURL + '/template-contents/' + id, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(rest),
    });
    return response;
};

export const fetchAllTemplateContent = () => {
    const token = getCookie('__user-token');
    const response = fetch(baseURL + '/template-contents?limit=100', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });
    return response;
};
export const createQRLink = (templateID: Number) => {
    const token = getCookie('__user-token');
    const response = fetch(baseURL + `/get-enc-template-id/${templateID}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });
    return response;
};

export const deleteTemplate  =(templateID:number)=>{

    const token = getCookie('__user-token');
    const response = fetch(baseURL + `/template-contents/${templateID}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });
    return response;
}