import axios from 'axios';
import React, {useState} from 'react';
const getAll = async (src) => {
    
    const getAllData = await axios.get(src)

    return getAllData;
}
export default getAll;