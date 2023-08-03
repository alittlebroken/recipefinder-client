import './LandingHero.css'
import Button from '../../UI/Button/Button'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingHero = (props) => {

    /* Setup the form state */
    const [searchTerms, setSearchTerms] = useState('')

    /* Alias the Navigate function */
    const navigate = useNavigate()

    /* Destructure any passed in props */
    const { children } = props

    /* Setup a function to handle form submit */
    const handleSubmit = (e) => {

        /* Prevent the default form action from happening */
        e.preventDefault()
        navigate(`/search?terms=${searchTerms}`)
        
    }

    return ( 
        <div aria-label="landing page hero" className="landingHero-container">
            <h3 className="hero-heading">Find your favourite</h3>
            <form className="search-form" id="hero-search">
                <div className="search-container">
                    <i className="fa fa-search icon"></i>
                    <input 
                    type="search" 
                    name="search" 
                    className="hero-input" 
                    placeholder="Type in a recipe name or ingredient"
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                    style={{
                    }}
                    />
                    <Button 
                    roundedOutline 
                    secondary 
                    clickHandler={handleSubmit}
                    is={{ 
                        padding: '25px',
                        fontSize: '2rem',
                        borderRadius: '35px',
                        }}>Search</Button>
                </div>
            </form>
        </div>
    )

}

export default LandingHero