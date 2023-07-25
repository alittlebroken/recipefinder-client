/* Import React */
import * as React from 'react'

/* Import test suite */
import { render, screen, within } from '@testing-library/react'

/* Import in the component being tested */
import Recipe from '../components/Client/Recipe/Recipe'

describe('Recipe component', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the component', async () => {

        /* Setup */

        /* Execute */
        render(<Recipe />)

        /* Test */
        expect(screen).toBeDefined()

        const children = screen.getByRole('generic', { name: /card-container/i })

        expect(within(children).getAllByRole('heading')).toHaveLength(1)
        expect(within(children).getAllByRole('img')).toHaveLength(1)
        expect(within(children).getAllByRole('generic', { name: /rating-star /i})).toHaveLength(5)
        expect(within(children).getAllByRole('button')).toHaveLength(1)
        expect(within(children).getAllByRole('paragraph')).toHaveLength(1)
        

    })



})