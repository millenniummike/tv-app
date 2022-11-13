import { createContext } from 'react'
export const Context = createContext({
    "id":0,
    "setId":(number) => {},
    "page":0,
    "setPage":(number) => {},
    "showMenu":false,
    "setshowMenu":(boolean) => {}
})