import Image from 'next/image'
import {avatar,profile} from './avatar.module.css'

const Avatar = ({src,name,otherInfo}) => {
    return ( 
        <>
            <section className={avatar}>
                {src?
                    <Image />    
                    :
                    <div className={profile}/>
                }
                <div>
                    {name}
                    {otherInfo}
                </div>
            </section>
        </>
    );
}
export default Avatar;