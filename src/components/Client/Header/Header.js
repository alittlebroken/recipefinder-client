import './header.css'
import { Link, useNavigate } from 'react-router-dom'

import Menu from '../../UI/Menu/Menu'

/* Import provider context  */
import { ProviderContext, useAccessToken } from '../../../contexts/providers'

const Header = () => {

    /* Set the alias for the useNavigate hook */
    const navigate  = useNavigate()

    /* Set the state for the access token */
    const [accessToken, setAccessToken] = useAccessToken()

    /* Handle the burger menu */
    const handleHamburgerClick = () => {

        const hamburger = document.querySelector(".nav-burger")
        const menu = document.querySelector(".nav-container")

        hamburger.classList.toggle("active")
        menu.classList.toggle("active")

    }

    /* Handle logout */
    const handleLogout = (e) => {

        /* Attempt the logout */
        ProviderContext.authProvider.logout()
        .then(result => {
            return navigate("/")
        })
        .catch(err => {
            console.log(err)
            return false
        })

    }

    return (
        <header className="header-container">

            <div role="brand" className="brand-container">
                <div role="presentation" aria-label="brand-contents" className="brand-content">
                    <div aria-label="brand-name" className="brand-name">
                        recipeFinder
                    </div>
                    <div aria-label="brand-tagline" className="brand-tagline">Find your favourite recipe</div>
                </div>
                <div role="presentation" aria-label="nav-menu-icon" className="nav-burger" onClick={handleHamburgerClick}>
                        <i className="fa-solid fa-bars"></i>
                </div>
            </div>
            <nav className="nav-container">
                <ul className="nav-list">
                    <li className="nav-list-item"><Link to="/" className="nav-item-link">Home</Link></li>
                    <li className="nav-list-item"><Link to="/recipes" className="nav-item-link">Recipes</Link></li>
                    <li className="nav-list-item"><Link to="/categories" className="nav-item-link">Categories</Link></li>
                    <li className="nav-list-item"><Link to="/ingredients" className="nav-item-link">Ingredients</Link></li>
                    {accessToken ? (
                        <li className="nav-list-item">
                            <Menu title="Profile" items={[
                                { name: 'Settings', url: '/profile', handleClick: null},
                                { name: 'My Pantry', url: '/pantry', handleClick: null},
                                { name: 'My Recipes', url: '/profile/recipes', handleClick: null},
                                { name: 'My Cookbooks', url: '/profile/cookbooks', handleClick: null},
                                { name: 'Logout', url: '/logout', handleClick: handleLogout }
                            ]} />
                        </li>
                        ) : (<li className="nav-list-item"><Link to="/login" className="nav-item-link">Login</Link></li>)}
                    <li className="nav-list-item"><Link to="/search" className="nav-item-link">Search</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header;