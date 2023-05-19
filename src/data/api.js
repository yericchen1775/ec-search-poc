import axios from 'axios';

export const getTestData = async (id) => {
    try{
        //const {data} = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users?id=${id}`);
        return data;
    }catch(error) {
        throw error;
    }
}