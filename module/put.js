import axios from 'axios';

const putRequest = async ({src,id,pup}) => {
    const SERVER_HOST="http://localhost:3001"
    const response = await axios.put(`${SERVER_HOST}/${src}/${id}`,pup)
    console.log(response)
    return response 
}
export default putRequest;
/* PUT requiere enviar una representación completa del recurso que se está modificando */