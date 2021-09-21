var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

export const dataforMont= ({month,data}) =>{
    return data.filter((r)=> new Date(r.date).getMonth()+1==month)
}
export const currentValue = ({data}) => {
    const currentMonthData = dataforMont({month:mm,data:data})
    const fundadoLength = isFundado({data:currentMonthData})
    const currentPorcentaje = calculatePorcentaje({fundado:fundadoLength,total:currentMonthData.length})
    return Math.round(currentPorcentaje)
}

export const isFundado = ({data}) => {
    const fundado = data.filter((r)=> r.status=="true")
    return fundado.length
}
export const isInfundado = ({data}) => {
    const infundado = data.filter((r)=> r.status=="false")
    return infundado.length
}
export const calculatePorcentaje = ({fundado,total}) => {
    return fundado*100/total
}