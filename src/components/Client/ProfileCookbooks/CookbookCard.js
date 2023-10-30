import './CookbookCard.css'


const CookBookCard = (props) => {

    /* Destructure the passed in props */
    const {
        data
    } = props

    return (
        <div aria-label="cookbook container" className="cc-container flex">

            <img src={data.src} title={data.title} alt={data.alt} className="cc-image" />

            <div aria-label="card content container" className="flex cc-content-container">
                <div aria-label="cookbook details" className="cc-details-container flex">

                    <h3 className="cc-head-3">{data.name}</h3>

                    <p className="cc-description">{data.description}</p>

                </div>

                <div aria-label="cookbook action button container" className="cc-action-buttons flex">

                    <button name="moreInfo" className="cc-btn-action-more" value="more">
                        More Info
                    </button>

                    <button name="remove" className="cc-btn-action-remove" value="remove">
                        Remove
                    </button>

                </div>
            </div>

        </div>
    )

}

export default CookBookCard