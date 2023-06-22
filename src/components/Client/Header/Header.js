
import './header.css'

const Header = () => {
    return (
        <header className="header-container">
            <div role="brand" className="brand-container">
                <div role="brandname" className="brand-name">
                    Recipe Finder
                </div>
                <p role="brandsubtext">Find your next favourite recipe</p>
            </div>
            <nav className="nav-container">
                <ul className="nav-list">
                    <li><a href="/recipes">Recipes</a></li>
                    <li><a href="/categories">Categories</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/search">Search</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;