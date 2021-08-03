const PlainText = ({data,relation}) => {

    const regex = / /ig;
    const regex_coma = /,/ig;
    const datalist = data ? data.map((d)=>(d.name.replace(regex, '-'))) : ""
    const datalistText =  datalist.length>0 ? datalist.join(',').replace(regex_coma,'\n') :""
    
    /* const regex = / /ig; */
    const relationshipList = relation.map((rel)=>(
        `${Object.values(rel)[0].name.replace(regex, '-')} --> ${Object.values(rel)[1].name.replace(regex, '-')}`
    ))
    
    /* const regex_coma = /,/ig; */
    const relationshipListText = relationshipList.join(',').replace(regex_coma,'\n')
    const plainText = `${datalistText} \n ${relationshipListText}`

    return plainText
}
export default PlainText;