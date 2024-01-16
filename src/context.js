import { createContext } from "react";

export const empdb = createContext({userdb:'', hasPerm:false})
export const devdb = createContext({assetdb:'', hasPerm:false})
export const reportdb = createContext({reportsdb:''})
export const taskDetail = createContext({tasksData:''})
export const perm = createContext({isAdmin:false, isSuperuser:false})
export const SearchField = createContext()