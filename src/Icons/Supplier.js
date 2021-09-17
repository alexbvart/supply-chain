import * as React from "react"

function Supplier(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 0C3.589 0 0 3.589 0 8v3.314c0 .82.718 1.486 1.6 1.486h.8a.8.8 0 00.8-.8V7.886a.8.8 0 00-.8-.8h-.726C2.118 3.99 4.782 1.6 8 1.6c3.218 0 5.882 2.39 6.326 5.486H13.6a.8.8 0 00-.8.8V12.8c0 .882-.718 1.6-1.6 1.6H9.6v-.8H6.4V16h4.8c1.765 0 3.2-1.435 3.2-3.2.882 0 1.6-.666 1.6-1.486V8c0-4.411-3.589-8-8-8z"
        fill="#AAABB0"
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default Supplier
