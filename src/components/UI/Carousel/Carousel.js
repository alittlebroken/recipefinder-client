import './Carousel.css'
import { nanoid } from '@reduxjs/toolkit'

import { useState } from 'react'

const Carousel = ({ children, slides }) => {

    /* Set the carousel index */
    const [currentIndex, setCurrentIndex] = useState(0)

    /* Get how many slides we have */
    const numSlides = slides.length

    /* Handlers for paging through the the slides */
    const nextSlide = () => {
        if(currentIndex === numSlides - 1){
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }

    }

    const prevSlide = () => {

        if(currentIndex === 0){
            setCurrentIndex(numSlides - 1)
        } else {
            setCurrentIndex(currentIndex - 1)
        }

    }

    /* Styles for component */
    const sliderStyles = {
        height: '100%',
        position: 'relative',
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].source})`,
        transition: 'background-image 1s'
    }

    const prevButtonStyles = {
        width: '50px',
        height: '50px',
        padding: '5px',
        borderRadius: '50%',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '21px',
        fontSize: '45px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        cursor: 'pointer',
    }

    const nextButtonStyles = {
        width: '50px',
        height: '50px',
        padding: '5px',
        borderRadius: '50%',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '21px',
        fontSize: '45px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        cursor: 'pointer',
    }

    return (
        <div aria-label="container for Carousel" style={sliderStyles}>
            <div 
                aria-label="carousel previous link" 
                style={prevButtonStyles}
                onClick={prevSlide}
                >
                    {`<`}
            </div>
            <div 
                aria-label="carousel next link" 
                style={nextButtonStyles}
                onClick={nextSlide}
                >
                    {`>`}
            </div>
            <div aria-label="slide for carousel" style={slideStyles}></div>
        </div>
    )

}

export default Carousel