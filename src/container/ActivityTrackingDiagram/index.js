import React, { useState } from 'react'
import { wrapper, header,button } from './styles.module.css'
import ActivityTrackingDesing from './Desing';
import ActivityTrackingDiagram2 from './indexcopy';

const ActivityTrackingDiagram = ({ processId }) => {
  const [staticView, setStaticView] = useState(true)

  return (
    <div >
      <header className={header} >
        <h3 className="subtitle_section">Diagrama de seguimiento de actividades</h3>
        <button 
          className={button}
          onClick={() => setStaticView(!staticView)}>
          {staticView ? "Edition Mode" : "Exit edit mode"}
        </button>
      </header>
      <br/>
      {
        (staticView) ?
          <ActivityTrackingDiagram2></ActivityTrackingDiagram2>
          :
          <ActivityTrackingDesing processId={processId} />
      }

    </div>
  )
}

export default ActivityTrackingDiagram;
