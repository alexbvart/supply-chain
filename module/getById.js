import axios from 'axios';

const getById = async (src, id) => {
    const response = await axios.get(`${src}/${id}`)
    return response
}
export default getById;