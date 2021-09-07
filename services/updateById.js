import axios from 'axios';

const updateById = async (src,id,up) => {
    const response = await axios.patch(`${src}/${id}`,up)
    return response
}
export default updateById;

/* PATCH es adecuado para hacer modificaciones parciales, o para enviar un conjunto de instrucciones en lugar del resultado final */