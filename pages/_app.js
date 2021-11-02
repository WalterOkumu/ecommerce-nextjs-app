// import App from 'next/app'
import CartProvider from '../context/Cart'
import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import Navbar from '../components/Navbar'
import CartModal from '../components/CartModal'

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap');

  background: linear-gradient(to right, #73c8a9, #373b44);
  font-family: 'Padauk', sans-serif;
  color: #444;
  min-height: 100vh;
`

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`

const MyApp = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Container>
        <Normalize />
        <Navbar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <CartModal />
        <footer>Powered by Okumu Designs</footer>
      </Container>
    </CartProvider>

  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp