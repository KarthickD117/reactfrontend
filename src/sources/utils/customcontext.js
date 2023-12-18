import { createContext, useContext, useState } from 'react';

const SearchCtx = createContext();

export const useSearchCtx = () => useContext(SearchCtx);

export const useSearchCtxState = () => {
    const [state] = useContext(SearchCtx);
    return state;
};

export const SomeCtxProvider = ({children, init}) => {
    const myCtx = useState(''); 
    return <SearchCtx.Provider value={myCtx}>{children}</SearchCtx.Provider>;
};