import './header.css'

const Header = () => {

    /* Handle the burger menu */
    const handleHamburgerClick = () => {

        const hamburger = document.querySelector(".nav-burger")
        const menu = document.querySelector(".nav-container")

        hamburger.classList.toggle("active")
        menu.classList.toggle("active")

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
                        <i class="fa-solid fa-bars"></i>
                </div>
            </div>
            <nav className="nav-container">
                <ul className="nav-list">
                    <li className="nav-list-item"><a className="nav-item-link" href="/recipes">Recipes</a></li>
                    <li className="nav-list-item"><a className="nav-item-link" href="/categories">Categories</a></li>
                    <li className="nav-list-item"><a className="nav-item-link" href="/ingredients">Ingredients</a></li>
                    <li className="nav-list-item"><a className="nav-item-link" href="/login">Login</a></li>
                    <li className="nav-list-item"><a className="nav-item-link" href="/search">Search</a></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header;