import * as React from "react"

function Indicator(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 2A3.5 3.5 0 001 5.5v5A3.5 3.5 0 004.5 14h5a3.5 3.5 0 003.5-3.5V8a.5.5 0 011 0v2.5A4.5 4.5 0 019.5 15h-5A4.5 4.5 0 010 10.5v-5A4.5 4.5 0 014.5 1H7a.5.5 0 110 1H4.5z"
        fill="#AAABB0"
      />
      <path d="M15 3a3 3 0 11-6 0 3 3 0 016 0z" fill="#AAABB0" />
    </svg>
  )
}

export default Indicator
