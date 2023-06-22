// Import styling for the component
import './Content.css'

const Content = ({children}) => {

    return (
        <div aria-label="contentContainer" className="content-container">
            {children}
        </div>
    )

}

// Export the component
export default Content;