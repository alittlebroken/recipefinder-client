import './LandingCategories.css'

import Category from '../Category/Category'
import Card from '../../UI/Cards/Card'

const LandingCategories = (props) => {

    /* Destructure the props passed in */
    const { categories } = props

    return (
        <div aria-label="landing page categories" className="landingcategories-container">
            <h3>Categories</h3>
            <Card.List>
                {categories.map((category) => {
                    return <Category record={category} />
                })}
            </Card.List>
        </div>
    )

}

export default LandingCategories