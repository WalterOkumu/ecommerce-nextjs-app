import { useRouter } from 'next/router'
import styled from "styled-components"
import { FiX } from 'react-icons/fi'
import useCart from "../hooks/useCart"

const CartModal = () => {
  const { cart, isOpen, closeCart, total } = useCart()

  const router = useRouter()

  const handleClick = () => {
    closeCart()
  }

  const navigateToCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <Container isOpen = {isOpen} >
      <CloseModalContainer>
        <CloseModal onClick = {handleClick}/>
      </CloseModalContainer>
      <Content>
        <Title>Cart</Title>
        {
          cart.length > 0 ? (
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
              <Button onClick = {navigateToCheckout}>Checkout</Button>
            </>
          ) : (
            <p>Cart is empty!</p>
          )
        }
      </Content>
    </Container>
  )
}

export default CartModal

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: white;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.2s ease-in-out;

`

const CloseModal = styled(FiX)`
  font-size: 3rem;

  &:hover {
    cursor: pointer;
  }
`

const CloseModalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Content = styled.div`
  padding: 1rem 2rem;
`
const Title = styled.h2`div
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
`
const Item = styled.li`
  list-style: none;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.25rem;
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