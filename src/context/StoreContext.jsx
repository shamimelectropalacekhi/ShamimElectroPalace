'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { seedProducts } from '@/data/products'
import { getStored, setStored } from '@/lib/storage'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

// The catalog the whole site reads. Admin edits write straight back to localStorage
// until the database is connected.
export function StoreProvider({ children }) {
  const [products, setProducts] = useState(seedProducts)
  const [loaded, setLoaded] = useState(false)

  // Read storage after mount so server and client HTML match; `loaded` stops the seed overwriting saved edits.
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- intentional: hydrate from localStorage after mount
    setProducts(getStored('shamim-products-v3', seedProducts))
    setLoaded(true)
  }, [])
  useEffect(() => { if (loaded) setStored('shamim-products-v3', products) }, [products, loaded])

  return <StoreContext.Provider value={{ products, setProducts }}>{children}</StoreContext.Provider>
}
