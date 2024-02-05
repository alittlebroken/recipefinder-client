/* import Styles */
import './Footer.css'

import { Link, useNavigate, redirect } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { 
    setSearchTerms,
    setSearchOptions,
 } from '../../../slices/Search/SearchSlice'

const Footer = () => {

    /* Alias the various hooks */
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/recipes' >Recipes</Link></li>
                        <li><Link to='/categories' >Categories</Link></li>
                        <li><Link to='/ingredients' >Ingredients</Link></li>
                    </ul>
                </div>

                <div role="presentation" aria-label="footerRecipes" className="sitemap-container">
                    <h4>Recipes</h4>
                    <ul>
                        {/*<li><a href="/recipes/vegan">Vegan</a></li>*/}
                        <li><Link to='/recipes/vegan' onClick={e => {
                            dispatch(setSearchTerms('vegan'))
                            dispatch(setSearchOptions('categories'))
                        }}>Vegan</Link></li>
                        <li><Link to='/recipes/dairyfree' onClick={e => {
                            dispatch(setSearchTerms('dairy free'))
                            dispatch(setSearchOptions('categories'))
                        }}>Dairy Free</Link></li>
                        <li><Link to='/recipes/quick' onClick={e => {
                            dispatch(setSearchTerms('quick'))
                            dispatch(setSearchOptions('categories'))
                        }}>Quick</Link></li>
                        <li><Link to='/recipes/glutenfree' onClick={e => {
                            dispatch(setSearchTerms('gluten free'))
                            dispatch(setSearchOptions('categories'))
                        }}>Gluten Free</Link></li>
                        <li><Link to='/recipes/lowfodmap' onClick={e => {
                            dispatch(setSearchTerms('low fodmap'))
                            dispatch(setSearchOptions('categories'))
                        }}>Low Fodmap</Link></li>
                        <li><Link to='/recipes/air fryer' onClick={e => {
                            dispatch(setSearchTerms('air fryer'))
                            dispatch(setSearchOptions('categories'))
                        }}>Air Fryer</Link></li>
                    </ul>
                </div>

            </div>
            
        </footer>
    )
}

export default Footer;