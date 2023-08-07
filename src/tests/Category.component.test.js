/* Import React */
import * as React from 'react'

/* Import test suite */
import { render, screen, within } from '@testing-library/react'

/* Import in the component being tested */
import Category from '../components/Client/Category/Category'

// Create Mock record for the test
const mockedRecord = {
    id: 1,
    name: 'Vegetarian'
}

describe('Recipe component', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the component', async () => {

        /* Setup */

        /* Execute */
        render(<Category key={mockedRecord.id} record={mockedRecord} />)

        /* Test */
        expect(screen).toBeDefined()

        const children = screen.getByRole('generic', { name: /card-container/i })

        expect(within(children).getByText('Vegetarian')).toBeInTheDocument()
        expect(within(children).getAllByRole('img')).toHaveLength(1)
        expect(within(children).getAllByRole('link')).toHaveLength(1)
        expect(within(children).getByRole('link')).toHaveAttribute('href', '/recipes?cat=1')
        
    })



})