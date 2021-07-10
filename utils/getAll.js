import axios from 'axios';

const getAll = async (src) => {
    
    const getAllData = await axios.get(src)

    return getAllData.data;
}
export default getAll;