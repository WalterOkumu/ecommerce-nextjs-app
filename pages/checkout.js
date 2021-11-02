import Page from '../components/styled/Page'
import useCart from '../hooks/useCart'
import styled from 'styled-components'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const Checkout = () => {
  const { cart, total } = useCart()

  const processPayment =  async () => {
    const url = '/.netlify/functions/charge-card'

    const newCart = cart.map(({ id, qty }) => ({
      id,
      qty
    }))

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    const { data } = await axios.post(url, { cart: newCart })

    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <Page>
      <h2>Checkout</h2>
      {
        cart.length ? (
          <>
            <List>
            {
              cart.map(item => {
                return (
                    <Item key = {item.id}>
                      <span>{item.qty} x {item.name}</span>
                      <span>KES {item.price / 100}</span>
                    </Item>
                  )
              })
            }
          </List>
          <Total>
            <span>Total</span>
            <span>KES {total}</span>
          </Total>
          <Button onClick = {processPayment}>Proceed to Pay</Button>
        </>
        ) : (
          <p>You don't appear to have any items in your cart!</p>
        )
      }
    </Page>
  )
}

export default Checkout

const Item = styled.li`
  list-style: none;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
  display: flex;
`
const List = styled.ul`
  padding: 0;
`
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 6400;
  font-size: 1.5rem;
`
const Button = styled.button`
  background: #73c8a9;
  font-size: 2rem;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem;
  color: white;

  &:hover {
    cursor: pointer;
  }
`