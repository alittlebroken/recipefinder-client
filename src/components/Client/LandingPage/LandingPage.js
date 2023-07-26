import "./LandingPage.css"

import LatestRecipes from '../LatestRecipes/LatestRecipes'

const LandingPage = (props) => {


    return (
        <div aria-label="Landing page for website" className="landing-container">
            <LatestRecipes /> 
        </div>
    )
}

export default LandingPage