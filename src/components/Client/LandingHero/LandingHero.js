import './LandingHero.css'
import Button from '../../UI/Button/Button'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setSearchTerms } from '../../../slices/Search/SearchSlice'

const LandingHero = (props) => {

    /* Alias the dispatcher */
    const dispatch = useDispatch()

    /* Setup the form state */
    const [terms, setTerms] = useState('')

    /* Alias the Navigate function */
    const navigate = useNavigate()

    /* Destructure any passed in props */
    const { children } = props

    /* Setup a function to handle form submit */
    const handleSubmit = (e) => {

        /* Prevent the default form action from happening */
        e.preventDefault()
        /* Set the search terms in the store */
        dispatch(setSearchTerms(terms))
        navigate(`/search`)
        
    }

    return ( 
        <div aria-label="landing page hero" className="landingHero-container">
            <h3 className="hero-heading">Find your favourite</h3>
            <form className="search-form" id="hero-search">
                <div className="lh-search-container">
                    <i className="fa fa-search icon"></i>
                    <input 
                    type="search" 
                    name="search" 
                    className="hero-input" 
                    placeholder="Type in a recipe name or ingredient"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    style={{
                    }}
                    />
                    <Button 
                    roundedOutline 
                    secondary 
                    clickHandler={handleSubmit}
                    id="hero-search-button"
                    >GO</Button>
                </div>
            </form>
        </div>
    )

}

export default LandingHero