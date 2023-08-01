import './LandingHero.css'

const LandingHero = (props) => {

    /* Destructure any passed in props */
    const { children } = props

    return ( 
        <div aria-label="landing page hero" className="landingHero-container">
            <h3 className="hero-heading">Find your favourite</h3>
            <form className="search-form">
                <div className="search-container">
                    <i class="fa fa-search icon"></i>
                    <input 
                    type="search" 
                    name="search" 
                    className="hero-input" 
                    placeholder="Type in a recipe name or ingredient"
                    />
                </div>
            </form>
        </div>
    )

}

export default LandingHero