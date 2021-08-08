import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { container_chart,wrapper_chart } from './styles.module.css'
const ChartRC = ({data,title=""}) => {
    let labels = []
    let times = []
    /* console.log({data}); */
    data
    .filter((d)=>(d.time>0 & d.activityName !== "Total" & d.rol !== "Total"))
    .map((d)=>{
        labels.push(d.activityName||d.rol)
        times.push(parseInt(d.time,10))
    })
        /* console.log({labels},{times}); */

    const dataD =  {
        labels: labels,
        datasets: [{
            label: `${title}`,
            data: times,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    const [chartDta, setChartDta] = useState(dataD)

    return (
        <div className={container_chart}>
                <h2 className="subtitle_section">{title}</h2>
            <div className={wrapper_chart}>
                <Doughnut
                    data={dataD}
                    options={{ 
                        title:{
                            display:true,
                            text:'lgo',
                            fontSize:24
                        },
                        legend:{
                            display:true,
                            position:'bottom'
                        },
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
}
export default ChartRC;