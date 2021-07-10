import React, {useContext} from 'react';
import KeywordContext from '../../../context/Keyword/KeywordContext';
import Search from '../../Icons/search';
import searchBar from './searchbar.module.css'

const SearchBar = () => {

    const {keyword, setKeyword} = useContext(KeywordContext)


    /* Funciunes para manejar el input y realizar la busqueda  {kewyword} */
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    const handleChange = (event) => {
        setKeyword(event.target.value)
    }


    return ( 
        <>
            <form onSubmit={handleSubmit} className={searchBar.form} >
                <input 
                    autoFocus  
                    onChange={handleChange} 
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