import { createContext } from "react";

export const empdb = createContext({userdb:'', hasPerm:false})
export const devdb = createContext({assetdb:'', hasPerm:false})
export const reportdb = createContext({reportsdb:''})
export const perm = createContext({hasPerm:''})