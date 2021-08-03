import Image from 'next/image'
import {avatar,profile,info} from './avatar.module.css'

const Avatar = ({src,name,telephone}) => {
    return ( 
        <>
            <section className={avatar}>
                {src?
                    <Image src={src} alt={name} />    
                    :
                    <div className={profile}/>
                }
                <div className={info}>
                    {name && <span>{name.substring(0,20)}{(name.length>20)?'...':''} </span>  }
                    {telephone && <span>{telephone}</span> }
                </div>
            </section>
        </>
    );
}
export default Avatar;