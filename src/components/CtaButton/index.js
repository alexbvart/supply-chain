import React from 'react'
import { cta_button } from './styles.module.css'

const CtaButton = ({ text, width, height = 60}) => {
  return (
    <button className={cta_button} width={width} height={height}>
      <p>{text}</p>
    </button>
  )
}

export default CtaButton