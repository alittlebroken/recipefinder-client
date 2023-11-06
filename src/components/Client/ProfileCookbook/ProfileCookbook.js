import './ProfileCookbook.css'

const ProfileCookbook = (props) => {

    /* Destructure the props passed in */
    const {
        cookbook
    } = props

    return (
        
        <div aria-label="cookbook container" className="cb-container flex">

            <img 
                src={cookbook.src}
                title={cookbook.title}
                alt={cookbook.alt}
            />

            <h2 className="cb-head-2">
                {cookbook.name}
            </h2>

            <div aria-label="cookbook description" className="cb-description">
                {cookbook.description}
            </div>


        </div>

    )

}

export default ProfileCookbook