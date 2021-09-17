import * as React from "react"

function Account(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 12a5 5 0 100-10 5 5 0 000 10z"
        stroke="#AAABB0"
        strokeWidth={1.5}
      />
      <path
        d="M17 14h.352a3 3 0 012.976 2.628l.391 3.124A2.002 2.002 0 0118.734 22H5.266a2 2 0 01-1.985-2.248l.39-3.124A3 3 0 016.65 14H7"
        stroke="#AAABB0"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Account
