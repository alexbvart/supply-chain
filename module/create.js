import axios from 'axios';

const create = async (src, data) => {
    const response = await axios.post(src, data)
    return console.log( response);
}
export default create;