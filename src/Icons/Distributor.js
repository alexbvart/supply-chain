import * as React from "react"

function Distributor(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M0 5.25A2.25 2.25 0 012.25 3h13.5A2.25 2.25 0 0118 5.25V7.5h1.53a2.25 2.25 0 011.755.845l2.221 2.774c.32.4.494.896.494 1.408v3.223A2.25 2.25 0 0121.75 18H21a3 3 0 01-6 0H7.5a3 3 0 11-5.997-.128A2.25 2.25 0 010 15.75V5.25zm1.941 11.184a3 3 0 015.157.066h8.304a3.016 3.016 0 011.098-1.098V5.25a.75.75 0 00-.75-.75H2.25a.75.75 0 00-.75.75v10.5a.75.75 0 00.441.684zM18 15a3 3 0 012.598 1.5h1.152a.75.75 0 00.75-.75v-3.225a.75.75 0 00-.165-.468l-2.22-2.775A.75.75 0 0019.53 9H18v6zM4.5 16.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm13.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
          fill="#AAABB0"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Distributor
