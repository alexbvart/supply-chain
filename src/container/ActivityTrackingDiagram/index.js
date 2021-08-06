import React, { useState } from 'react'
import { wrapper, table, top } from './styles.module.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ActivityTrackingDesing from './Desing';
import ActivityTrackingDiagram2 from './indexcopy';

const ActivityTrackingDiagram = ({processId}) => {
const [staticView, setStaticView] = useState(true)

  return (
    <div className={wrapper}>
        <button onClick={()=>setStaticView(!staticView)}>
           {staticView ? "Edition Mode" : "Exit edit mode"}
        </button>

        {
          (staticView)?
          <ActivityTrackingDiagram2></ActivityTrackingDiagram2>
          :
          <ActivityTrackingDesing processId={processId} />
        }
        
    </div>
  )
}

export default ActivityTrackingDiagram