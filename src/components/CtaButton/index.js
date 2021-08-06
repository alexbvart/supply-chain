import React from 'react'
import { cta_button } from './styles.module.css'

const CtaButton = ({ children, height = 60, onClick, }) => {
  return (
    <button
      onClick={onClick}
      className={cta_button}
      height={height}>
      <p>{children}</p>
    </button>
  )
}

export default CtaButton