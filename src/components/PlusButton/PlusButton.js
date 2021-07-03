import React from 'react'
import { plus_button } from './plusButton.module.css'

const PlusButton = ({ text }) => (
  <div className={plus_button}>
    <img src="./assets/icons/plus_icon.png" alt="plus icon" />
    <p>{text}</p>
  </div>
)

export default PlusButton