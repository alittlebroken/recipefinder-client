import Container from 'react-bootstrap/Container'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Content from '../Content/Content'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div aria-label="content-footer-container" className="contentfooter-container">
                <Content>
                    { children }
                </Content>
                <Footer />
            </div>
        </>
    )
}


export default Layout;