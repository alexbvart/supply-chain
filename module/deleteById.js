import axios from 'axios';

const deleteById = async ({src,id}) => {
    const SERVER_HOST="http://localhost:3001"
    const res = await axios.delete(`${SERVER_HOST}/${src}/${id}`)
    console.log({res})
    return res
}
export default deleteById;