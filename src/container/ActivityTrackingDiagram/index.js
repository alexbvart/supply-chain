import React, { useState } from 'react'
import { wrapper, table, top } from './styles.module.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ActivityTrackingDesing from '../../components/ActivityTracking/Desing';

const ActivityTrackingDiagram = ({processId}) => {


  return (
    <div className={wrapper}>
        <ActivityTrackingDesing processId={processId} />
        
    </div>
  )
}

export default ActivityTrackingDiagram;
