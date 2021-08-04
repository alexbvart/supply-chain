import React from 'react'
import {wrapper, table, top} from './styles.module.css'

const ActivityTrackingDiagram = () => {
  return (
    <div className={wrapper}>
      <table className={table}>
        <colgroup span="4"></colgroup>
        <tr>
          <th>No.</th>
          <th>Actividad</th>
          <th><img src="../assets/images/triangle.png" alt="forma" /></th>
          <th><img src="../assets/images/circle.png" alt="forma" /></th>
          <th><img src="../assets/images/arrow.png" alt="forma" /></th>
          <th><img src="../assets/images/diamond.png" alt="forma" /></th>
          <th><img src="../assets/images/rectangle.png" alt="forma" /></th>
        </tr>
        <tr className={top}>
          <td>1</td>
          <td>Programar aprobación en sistema</td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Aprobación del crédito en sistema</td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Enviar expediente a plataforma</td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
          <td><input type="checkbox"></input></td>
        </tr>
      </table>
    </div>
  )
}

export default ActivityTrackingDiagram