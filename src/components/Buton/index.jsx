import buttons from './button.module.css'
const Button = ({onClick,children,className=""}) => {
        return ( 
        <>
            <button 
                className={ `${buttons.button} ${className}` }
                onClick={onClick}>
                {children}
            </button>
        </>
    );
}
export default Button;