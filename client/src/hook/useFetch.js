/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';


// Backend || Server ==> URL Address
const api = axios.create({ baseURL: 'http://localhost:5000' });


const useFetch = (endPoint) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(endPoint);
                setData(data);
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


export const userSignUp = (userData) => api.post('/user/signup', userData);
export const userSignIn = (userData) => api.post('/user/signin', userData);