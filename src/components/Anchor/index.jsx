
import Link from 'next/link'
import {anchor} from './anchor.module.css'
const Anchor = ({href,children, className=false}) => {

    const styles = className ? `${className} ${anchor}` : {anchor}
    return ( 
        <>
            <div className={styles}>
                <Link href={href} >
                    <a >
                        {children}
                    </a>
                </Link>
            </div>
            
        </>
    );
}
export default Anchor;