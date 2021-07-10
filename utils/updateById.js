import axios from 'axios';

const updateById = async (src,id) => {
    const response = await axios.put(`${src}/${id}`)
    return console.log(response);
}
export default updateById;