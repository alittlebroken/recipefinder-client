import './LatestRecipes.css'

import Card from '../../UI/Cards/Card'
import Recipe from '../Recipe/Recipe'

const LatestRecipes = (props) => {

    // Sample Data
    const samples = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlY2lwZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
            title: 'Avacado Salad',
            alt: 'Avacado Salad',
            name: 'Avacado Salad',
            textContent: 'A delicious treat #1'
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
            title: 'Vegan Chilli and Gluten free Garlic flatbread',
            alt: 'Vegan Chilli and Gluten free Garlic flatbread',
            name: 'Vegan Chilli and Gluten free Garlic flatbread',
            textContent: 'A delicious treat #2'
        }
    ]

    return (
        <div aria-label="latestRecipes container" className="latestRecipeContainer">
            <h3>Latest Recipes</h3>
            <Card.List>
                {samples.map( sample => {
                    return <Recipe record={sample} />
                })}
            </Card.List>
        </div>
    )

}

export default LatestRecipes