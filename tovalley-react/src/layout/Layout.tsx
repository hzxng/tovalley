import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main
        style={{ maxWidth: '2560px', margin: '0 auto', minHeight: '100vh' }}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
