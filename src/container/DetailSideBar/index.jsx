import Avatar from "../../components/Avatar"
import Anchor from "../../components/Anchor"
import SearchBar from "../../components/SearchBar"
import detail from './detail.module.css'
const DetailSideBar = ({title, data}) => {
    return ( 
        <>
            <aside className={detail.sidebar}>
                <header >
                    <h1> {title}</h1>
                </header>
                <SearchBar/>
                <nav>
                    <ul>
                        { data &&
                            data.map((item)=>(
                            <li>
                                <Avatar 
                                    key={item.id} name={item.name} otherInfo={item.contact}/>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Anchor href={title} className={detail.btn_float}>
                    Nuevo {title}
                </Anchor>
            </aside>
        </>
    );
}
export default DetailSideBar;