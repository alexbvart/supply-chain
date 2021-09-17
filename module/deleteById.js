import axios from 'axios';

const deleteById = async (src,id) => {
    return await axios.delete(`${src}/${id}`)
}
export default deleteById;