import './Menu.css'

import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

const Menu = (props) => {

    /* Destructure the passed in props */
    const { 
        title,
        items
    } = props

    return (
        <div aria-label="dropdown container" className="dropdown">
            <a href="#" className="dropdown-title">
                {title}
            </a>
            <div aria-label="dropdown content" className="dropdown-content">
                {items.map(item => {
                    return (
                        <Link key={nanoid()} to={item.url} className="dropdown-link" onClick={item.handleClick}>{item.name}</Link>
                    )
                })}
            </div>
        </div>
    )

}

export default Menu