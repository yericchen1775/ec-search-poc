import axios from 'axios';

//const baseUrl = 'https://ecazstorage.blob.core.windows.net/psdevcsc/';

//const apiKey = '';

export const getStorageData = async (url) => {
    try{
        //const {data} = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
        //const {data} = await axios.get(`https://ecazstorage.blob.core.windows.net/psdevcsc/test file?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-05-09T00:32:42Z&st=2023-05-08T16:32:42Z&spr=https&sig=1nSZh%2B8bpqBNMcrskIcD%2BPqhUfVe2SO045qRd1Baf5s%3D`);
        const {data} = await axios.get(`${url}`);
        return data;
    }catch(error) {
        throw error;
    }
}