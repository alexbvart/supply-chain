import axios from 'axios';

const post = async ({src, data}) => {
    const SERVER_HOST="http://localhost:3001"
    const response = await axios.post(`${SERVER_HOST}/${src}`, data)
    return response
}
export default post;