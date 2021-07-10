import axios from 'axios';

const updateById = async (src,id) => {
    return await axios.delete(`${src}/${id}`)
}
export default updateById;