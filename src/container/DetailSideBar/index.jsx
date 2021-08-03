import Avatar from "../../components/Avatar"
import Anchor from "../../components/Anchor"
import SearchBar from "../../components/SearchBar"
import detail from './detail.module.css'
import Link from "next/link"

import { useContext } from "react"
import KeywordContext from "../../../context/Keyword/KeywordContext"


const DetailSideBar = ({title, data}) => {
    const {keyword} = useContext(KeywordContext)
    const buttonText = title.slice(0, -1)
    const urlLocation = buttonText.toLowerCase().replace(' ', '-')

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
                            data
                            .filter(item => String(item.COMPANY_NAME).toUpperCase().includes(keyword.toUpperCase()) || String(item.FULL_NAME).toUpperCase().includes(keyword.toUpperCase()) )
                            .map((item)=>(
                            <li key={item.id} >
                                <Link href={`/${urlLocation}/${item.id}`}>
                                    <a>
                                        <Avatar 
                                            key={item.id} 
                                            name={item.COMPANY_NAME||item.FULL_NAME||item.Nombre||item.name} 
                                            telephone={item.TELEPHONE||""}
                                        />
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Anchor href={title} className={detail.btn_float} href={`/${urlLocation}/new`}>
                    New {buttonText}
                </Anchor>
            </aside>
        </>
    );
}
export default DetailSideBar;

