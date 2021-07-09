import Avatar from "../../components/Avatar"
import Anchor from "../../components/Anchor"
import SearchBar from "../../components/SearchBar"
import detail from './detail.module.css'
import Link from "next/link"
const DetailSideBar = ({title, data}) => {
    
    console.log({data});
    return ( 
        <>
            <aside className={detail.sidebar}>
                <header >
                    <h1> {title}</h1>
                </header>
                <SearchBar/>
                <nav>
                    <ul>
                        { (data && data.length > 0) &&
                            data.map((item)=>(
                            <li>
                                <Avatar 
                                    key={item.id} 
                                    name={item["COMPANY NAME"]||item["FULL NAME"]} 
                                    telephone={item.TELEPHONE}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
                <Anchor href={title} className={detail.btn_float}>
                    New {title.slice(0, -1)}
                </Anchor>
            </aside>
        </>
    );
}
export default DetailSideBar;

/* 
    <Link href={`supplier/${item.id}`}>
        <a>
            <Avatar 
                key={item.id} name={item["COMPANY NAME"]} telephone={item.TELEPHONE}/>
        </a>
    </Link>
*/