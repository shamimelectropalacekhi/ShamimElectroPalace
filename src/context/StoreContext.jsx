'use client'
import { createContext, useContext } from 'react'

const StoreContext = createContext(null)
// { store, categories, brandDeals, products } from Sanity, loaded once in layout.jsx.
export const useStore = () => useContext(StoreContext)

export function StoreProvider({ catalog, children }) {
  return <StoreContext.Provider value={catalog}>{children}</StoreContext.Provider>
}
