import './ProfileHeader.css'

const ProfileHeader = (props) => {

    /* Destructure the passed in props */
    const {
        src,
        alt,
        title,
        forename,
        surname,
        email
    } = props

    return (
        <div aria-label="profile header container" className="ph-container flex flex-col flex-center">
            <img src={src} alt={alt} title={title} className="ph-avatar"/>
            <h1 className="ph-fullname">{forename} {surname}</h1>
            <h3 className="ph-email">{email}</h3>
        </div>
    )

}

export default ProfileHeader