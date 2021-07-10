import axios from 'axios';

const getById = async (src, data) => {
    const response = await axios.post(src, data)
    return response
}
export default getById;