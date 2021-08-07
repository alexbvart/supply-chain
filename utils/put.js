import axios from 'axios';

const put = async (src,id,pup) => {
    const response = await axios.put(`${src}/${id}`,pup)
    return response
}
export default put;