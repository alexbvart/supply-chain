import buttons from './button.module.css'
const Button = ({onClick,children}) => {
    return ( 
        <>
            <button 
                className={buttons.button}
                onClick={onClick}>
                {children}
            </button>
        </>
    );
}
export default Button;