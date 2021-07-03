import Image from 'next/image'
import {avatar,profile,info} from './avatar.module.css'

const Avatar = ({src,name,otherInfo}) => {
    return ( 
        <>
            <section className={avatar}>
                {src?
                    <Image src={src} alt={name} />    
                    :
                    <div className={profile}/>
                }
                <div className={info}>
                    <span>{name}</span>  
                    <span>{otherInfo}</span> 
                </div>
            </section>
        </>
    );
}
export default Avatar;