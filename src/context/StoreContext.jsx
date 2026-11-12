'use client'
import { createContext, useContext, useMemo, useState } from 'react'

const StoreContext = createContext(null)
// { store, categories, brands, brandDeals } from Sanity, loaded once in layout.jsx, plus `page`:
// what the current page is about ({ category, waText }), set by product pages for the menu highlight and the floating WhatsApp button.
export const useStore = () => useContext(StoreContext)

export function StoreProvider({ shell, children }) {
  const [page, setPage] = useState({})
  const value = useMemo(() => ({ ...shell, page, setPage }), [shell, page])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
