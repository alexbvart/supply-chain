var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

export const dataforMont= ({month,data}) =>{
    return data.filter((r)=> new Date(r.date).getMonth()+1==month)
}
export const currentValue = ({data,month}) => {
    const monthh = month?month:mm
    const currentMonthData = dataforMont({month:monthh||mm,data:data})
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
/* ------------- */
/* export const currentValue2 = ({data,month}) => {
    const currentMonthData = dataforMont({month:month,data:data})
    const fundadoLength = isFundado({data:currentMonthData})
    const currentPorcentaje = calculatePorcentaje({fundado:fundadoLength,total:currentMonthData.length})
    return Math.round(currentPorcentaje)
} */
export const lastMonths= ({data})=>{
    const _mm = currentValue({data:data,month:mm})
    const _mm_1 = currentValue({data:data,month:mm-1})
    const _mm_2 = currentValue({data:data,month:mm-2})
    return [_mm_2,_mm_1,_mm]
}