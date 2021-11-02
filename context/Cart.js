import { createContext, useState, useEffect } from "react"

export const Context = createContext()

const Cart = ({ children }) => {

  const getInitialCart = () => JSON.parse(localStorage.getItem('cart'))

  const [cart, setCart]  = useState([])

  const [total, setTotal] = useState(0)

  const [isOpen, setIsOpen] = useState(false)

  const openCart = () => {
    setIsOpen(true)
  }

  const closeCart = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const initialCart = getInitialCart()

    if (initialCart) {
      setCart(initialCart)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))

    let newTotal = 0

    cart.forEach(item => {
      newTotal += ((item.price / 100) * item.qty)
    })

    setTotal(newTotal)

  }, [cart])

  const addItemToCart = (product, qty = 1) => {
    const item = cart.find(i => i.id === product.id)

    if (item) {
      //increase quatity
      item.qty += qty

      setCart([
        ...cart
      ])

    } else {
      // add item
      setCart([
        ...cart,
        { ...product, qty }
      ])
    }
  }

  const removeItemFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id
    })
    setCart(newCart)
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setCart([])
  }

  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
    total,
    clearCart,
    openCart,
    closeCart,
    isOpen
  }

  return (
    <Context.Provider value = {exposed}>
      {children}
    </Context.Provider>
  )
}

export default Cart