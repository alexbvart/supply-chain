import React from 'react';
const PlainText = (array) => {

    const regex = / /ig;
    const relationshipList = array.map((relation)=>(
        `${Object.values(relation)[0].name.replace(regex, '-')} --> ${Object.values(relation)[1].name.replace(regex, '-')}`
    ))
    
    const regex_coma = /,/ig;
    const plainText = relationshipList.join(',').replace(regex_coma,'\n')
    return plainText
}
export default PlainText;