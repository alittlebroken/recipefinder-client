/* Import Components to test and supporting libraries */
import Content from '../components/Client/Content/Content'

/* Import React */
import * as React from 'react'

/* Import test suite */
import { render, screen, within } from '@testing-library/react'

describe('Content', () => {

    it('should render the component', async () => {

        // Setup

        // Execute
        render(<Content />)

        // Assert
        const contentContainer = screen.getByRole('generic', { name: /contentContainer/i})

        expect(contentContainer).toBeInTheDocument()
        expect(contentContainer).toHaveClass('content-container')
        
    })

})
