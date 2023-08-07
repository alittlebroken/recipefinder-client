/* import Styles */
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer-container">
            <div aria-label="footerSection" className="footer-section-container">
                
                <div aria-label="footerbrand" className="footer-brand-container">
                    
                    <div aria-label="footer-brandname" className="site-title-footer">
                        recipeFinder
                    </div>
                    <div aria-label="footer-brandtagline" className="site-tag-line-footer">
                        Find your favourite recipe
                    </div>
                    
                    <div aria-label="socialMediaBadges" className="footer-social-container">
                        
                        <div aria-label="facebookBadge" className="badge">
                            <a href="https://www.facebook.com/recipefinder">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                        </div>

                        <div aria-label="instagramBadge" className="badge">
                            <a href="https://www.instagram.com/recipe-finder">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </div>

                        <div aria-label="youtubeBadge" className="badge">
                            <a href="https://www.youtube.com/@recipe-finder">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>

                        <div aria-label="twitterBadge" className="badge">
                            <a href="https://twitter.com/recipe-finder">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
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
                        <li><a href="/recipes/vegan">Vegan</a></li>
                        <li><a href="/recipes/dairyfree">Dairy Free</a></li>
                        <li><a href="/recipes/quick">Quick</a></li>
                        <li><a href="/recipes/microwave">Microwave</a></li>
                        <li><a href="/recipes/airfryer">Air Fryer</a></li>
                    </ul>
                </div>

            </div>
            
        </footer>
    )
}

export default Footer;