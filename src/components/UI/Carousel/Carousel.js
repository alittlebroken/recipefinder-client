import './Carousel.css'

import { useState, useEffect } from 'react'

const Carousel = ({ children, slides }) => {

    /* Set the carousel index */
    const [currentIndex, setCurrentIndex] = useState(0)

    /* Get how many slides we have */
    const numSlides = slides.length
    
    /* Handlers for paging through the the slides */
    const nextSlide = () => {
        if(currentIndex === numSlides){
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }

        /* Space out each slide one after the other */
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`
        })

    }

    const prevSlide = () => {

        if(currentIndex === 0){
            setCurrentIndex(numSlides)
        } else {
            setCurrentIndex(currentIndex - 1)
        }

        /* Space out each slide one after the other */
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`
        })

    }

    useEffect(() => {

        /* Ensure all slides are postioned correctly */
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * index}%)`
        })

    }, [])

    return (
        <div aria-label="container for Carousel" className="slider">

            {slides.map(slide => {
                return (
                    <div aria-label="container for slide" className="slide">
                        {slide.content}
                    </div>
                )
            })}

            <button 
                class="sliderBtn btn-prev" 
                onClick={prevSlide}
            >
                {'\u003c'}
            </button>
            <button 
                class="sliderBtn btn-next" 
                onClick={nextSlide}
            >
                {'\u003e'}
            </button>

        </div>
    )

}

Carousel.slide = ({content}) => {

    return (
        <div aria-label="content container for carousel slide" className="slide">
            {content}
        </div>
    )

}

export default Carousel