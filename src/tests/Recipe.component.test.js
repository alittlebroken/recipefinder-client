/* Import React */
import * as React from 'react'

/* Import test suite */
import { render, screen, within } from '@testing-library/react'

/* Import in the component being tested */
import Recipe from '../components/Client/Recipe/Recipe'

/* Mock the component props */
const mockedRecord = {
    id: 1,
    name: 'Sausages and Mash',
    images: [{
        imageId: 36,
        source: '/public/test.png',
        title: 'Plate with sausages, mash and herbs',
        alt: 'Plate with sausages, mash and herbs'
    }],
    categories: [
        {
            id: 67,
            name: 'Lunch'
        },
        {
            id: 68,
            name: 'Dairy Free'
        }
    ]
}

describe('Recipe component', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the component', async () => {

        /* Setup */

        /* Execute */
        render(<Recipe record={mockedRecord} />)

        /* Test */
        expect(screen).toBeDefined()

        const children = screen.getByRole('generic', { name: /card-container/i })
        expect(within(children).getByText('Sausages and Mash')).toBeInTheDocument()
        
        expect(within(children).getAllByRole('link')).toHaveLength(1)
        expect(within(children).getByRole('link')).toHaveAttribute('href','/recipe/1')
        
        expect(within(children).getAllByRole('img')).toHaveLength(1)

        const cats = screen.getByRole('generic', { name: /card tag list/i })
        expect(within(cats).getAllByRole('generic', { name: /card tag/i })).toHaveLength(2)
        expect(within(cats).getByText('Lunch')).toBeInTheDocument()
        expect(within(cats).getByText('Dairy Free')).toBeInTheDocument()
        
    })

})