import React, {useRef, useState} from 'react';
import Search from '../../Icons/search';
import searchBar from './searchbar.module.css'
const SearchBar = () => {


    const [keyword, setKeyword] = useState('')

    const [counterTimer, setCounterTimer] = useState(0)
    const countRef = useRef(counterTimer);
    countRef.current = counterTimer;

    /* Funciunes para manejar el input y realizar la busqueda  {kewyword} */
    const handleSubmit = (event) => {
        event.preventDefault()
        /* router.push(`/search/${keyword}`) */
    }
    const handleChange = (event) => {
        setKeyword(event.target.value)
    }
    const handleKeyUp = () => {
        setTimeout(()=>{
            if (keyword!=="") {
                /* router.push(`/search/${keyword}`) */
                clearTimeout(countRef.current);
            }
        }, 250);
    }

    return ( 
        <>
            <form onSubmit={handleSubmit} className={searchBar.form} >
                <input 
                    autoFocus  
                    onChange={handleChange} 
                    onKeyUp={handleKeyUp}
                    type="search" 
                    value={keyword} 
                    className={searchBar.input}
                />
                <button  className={searchBar.button}>
                        <Search />
                </button>
            </form>
        </>
    );
}
export default SearchBar;