import Container from 'react-bootstrap/Container'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Content from '../Content/Content'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Content>
                { children }
            </Content>
            <Footer />
        </>
    )
}


export default Layout;