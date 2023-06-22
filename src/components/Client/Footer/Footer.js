/* import Styles */
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer-container">
            <div aria-label="footerSection" className="footer-section-container">
                
                <div aria-label="footerbrand" className="footer-brand-container">
                    
                    <p>
                        Recipe Finder
                    </p>
                    
                    <div aria-label="socialMediaBadges" className="footer-social-container">
                        
                        <div aria-label="facebookBadge" className="badge">
                            <a href="https://www.facebook.com/recipefinder">f</a>
                        </div>
                        
                        <div aria-label="instagramBadge" className="badge">
                            <a href="https://www.instagram.com/recipe-finder">ig</a>
                        </div>
                    
                    </div>
                
                </div>

                <div role="presentation" aria-label="footerSitemap" className="sitemap-container">
                    <h4>Sitemap</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/recipes">Recipes</a></li>
                        <li><a href="/categories">Categories</a></li>
                        <li><a href="/ingredients">Ingredients</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div role="presentation" aria-label="footerRecipes" className="sitemap-container">
                    <h4>Recipes</h4>
                    <ul>
                        <li><a href="/recipes">Index</a></li>
                        <li><a href="/recipes/vegan">Vegan Recipes</a></li>
                        <li><a href="/recipes/dairyfree">Dairy Free Recipes</a></li>
                        <li><a href="/recipes/quick">Quick Recipes</a></li>
                        <li><a href="/recipes/microwave">Microwave Recipes</a></li>
                        <li><a href="/recipes/airfryer">Air Fryer Recipes</a></li>
                    </ul>
                </div>

            </div>
            <div role="presentation" aria-label="footerSearch" className="footer-search-container">

                <form>
                    <label for="find">Find</label>
                    <input type="search" id="find" />
                    <button>Go</button>
                </form>

            </div>
        </footer>
    )
}

export default Footer;