import { createContext } from 'react'
export const Context = createContext({
    "page":0,
    "setPage":(number) => {},
    "showContent":false,
    "setShowContent":(boolean) => {}
})