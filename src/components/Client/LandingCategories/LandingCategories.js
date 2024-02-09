import './LandingCategories.css'

import Category from '../Category/Category'
import Card from '../../UI/Cards/Card'

const LandingCategories = (props) => {

    /* Destructure the props passed in */
    const { categories } = props

    return (
        <div aria-label="categories layer" className="categoryLayer">
            <div aria-label="landing page categories" className="landingcategories-container">
                <h3>Categories</h3>
                <Card.List>
                    {categories && categories?.map((category) => {
                        return <Category key={category.id} record={category} />
                    })}
                </Card.List>
            </div>
        </div>
    )

}

export default LandingCategories