import axios from 'axios';

const getAll = async ({src}) => {
    const API_URL = process.env.NEXT_PUBLIC_API_PORT
    const getAllData = await axios.get(`${API_URL}/${src}`)

    return getAllData.data;
}
export default getAll;