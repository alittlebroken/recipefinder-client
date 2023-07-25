import './Card.css'

const Card = ({children}) => {

    return (
        <>
            <div aria-label="card-container" className="card w-100">
                {children}
            </div>
        </>
    )

}

export default Card;