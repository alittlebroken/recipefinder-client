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
    /* We keep this inline here to allow the functionality of actually 
       changing the image */
    const slideStyles = {
        backgroundImage: `url(${slides[currentIndex].source})`,
    }

    return (
        <div aria-label="container for Carousel" className="slider">
            <div 
                aria-label="carousel previous link" 
                className="sliderButton prevButton"
                onClick={prevSlide}
                >
                    {`<`}
            </div>
            <div 
                aria-label="carousel next link" 
                className="sliderButton nextButton"
                onClick={nextSlide}
                >
                    {`>`}
            </div>
            <div aria-label="slide for carousel" className="slide" style={slideStyles}></div>
        </div>
    )

}

export default Carousel