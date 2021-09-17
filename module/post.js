import axios from 'axios';

const post = async (src, data) => {
    const response = await axios.post(src, data)
    return response
}
export default post;