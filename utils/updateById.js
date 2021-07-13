import axios from 'axios';

const updateById = async (src,id,up) => {
    const response = await axios.patch(`${src}/${id}`,up)
    return response
}
export default updateById;