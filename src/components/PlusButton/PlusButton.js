import React from 'react'
import PlusIcon from '../../Icons/plusIcon'
import { plus_button } from './plusButton.module.css'

const PlusButton = ({ text }) => (
  <div className={plus_button}>
    <PlusIcon />
    <p>{text}</p>
  </div>
)

export default PlusButton