import * as React from "react"

function PlusIcon(props) {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 3a1.125 1.125 0 011.125 1.125v6.75h6.75a1.125 1.125 0 110 2.25h-6.75v6.75a1.125 1.125 0 11-2.25 0v-6.75h-6.75a1.125 1.125 0 110-2.25h6.75v-6.75A1.125 1.125 0 0112 3z"
                fill="#FAFAFC"
            />
        </svg>
    )
}

export default PlusIcon
