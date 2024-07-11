/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';


const link1 = 'http://localhost:5000';
const link2 = 'https://user-login-sys.herokuapp.com';


// Backend || Server ==> URL Address
const api = axios.create({ baseURL: link1 });


// with every url request send user identification at server side for authentication...
api.interceptors.request.use(req => {

    // 1st ==> get user token from LocalStorage, that server send to client...
    const serverSendToken = localStorage.getItem('userInfo');

    if (serverSendToken) {
        // 2nd ==> send this token from LocalStorage into server for user id tracking...
        // & we can see it by at browser Network Console
        req.headers.authorization = `Bearer ${JSON.parse(serverSendToken)}`;
    }

    return req;
});




const useFetch = (endPoint) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);


    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);
            try {
                const { data: { result } } = await api.get(endPoint);
                setData(result);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }

        fetchData();

    }, [endPoint]);

    return { data, loading, error };
}

export default useFetch;


export const getUserInfo = () => useFetch('/userInfo');

export const updateUserInfo = (userInfo) => api.patch('/userInfo/', userInfo);
export const deleteUserInfo = () => api.delete('/userInfo/');


export const userSignUp = (userData) => api.post('/user/signup', userData);
export const userSignIn = (userData) => api.post('/user/signin', userData);


const imageHostingUrl = 'https://api.cloudinary.com/v1_1/taiseen/image/upload';
export const imageUpload = (imgFile) => axios.post(imageHostingUrl, imgFile);