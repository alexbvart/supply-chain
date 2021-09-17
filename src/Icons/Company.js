import * as React from "react"

function Company(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 6h1.5v3H6V6zM6 10.5h1.5v3H6v-3zM10.5 6H12v3h-1.5V6zM10.5 10.5H12v3h-1.5v-3zM6 15h1.5v3H6v-3zM10.5 15H12v3h-1.5v-3z"
        fill="#AAABB0"
      />
      <path
        d="M22.5 10.5A1.5 1.5 0 0021 9h-4.5V3A1.5 1.5 0 0015 1.5H3A1.5 1.5 0 001.5 3v19.5h21v-12zM3 3h12v18H3V3zm13.5 18V10.5H21V21h-4.5z"
        fill="#AAABB0"
      />
    </svg>
  )
}

export default Company
