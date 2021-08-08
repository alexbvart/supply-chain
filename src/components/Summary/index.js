import React from 'react';
import {line_height} from './styles.module.css'
const Summary = ({title,data,type,className}) => {
    return ( 
        <div className={className}>
            <h2 className="subtitle_section">{title}</h2>
            <ariticle>
                {(type==="activity") ?
                <ul>
                    {   data
                        .filter((s)=>(parseInt(s.time,10)>0 & s.activityName !== "Total"))
                        .map((s,index)=>(
                        <li key={index}>
                            <p className={line_height}>
                                El flujo de 
                                <strong><em> {s.activityName} </em></strong> abarca el
                                <strong> {s.percentage} </strong> del tiempo de las actividades del proceso
                            </p>
                        </li>
                    ))}
                </ul>
                : 
                <ul>
                    {   data
                        .filter((s)=>(parseInt(s.time,10)>0 & s.rol !== "Total"))
                        .map((s,index)=>(
                        <li key={index}>
                            <p className={line_height}>
                                El rol de 
                                <strong><em> {s.rol} </em></strong> abarca el
                                <strong> {s.percentage} </strong> del tiempo de las actividades del proceso
                            </p>
                        </li>
                    ))}
                </ul>
            }

            </ariticle>
        </div>
    );
}
export default Summary;