import React, {useState} from 'react';
import KeywordContext from './KeywordContext';
const KeywordState = ({children}) => {
    const [keyword, setKeyword] = useState('')
    return ( 
        <KeywordContext.Provider
            value={{
                keyword, setKeyword
            }}
        >
            {children}
        </KeywordContext.Provider>
    );
}
export default KeywordState;