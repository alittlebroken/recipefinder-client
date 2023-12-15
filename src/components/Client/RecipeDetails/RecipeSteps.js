import './RecipeSteps.css'
import { nanoid } from '@reduxjs/toolkit'

const RecipeSteps = ({ steps }) => {
    return (
        <div aria-label="container for steps" className="stepsContainer flex">

            <h3>Steps</h3>

            <div aria-label="steps for recipe" className="steps flex">

                {steps.map(step => {
                    return (
                        <div key={nanoid()} aria-label="step for recipe" className="step flex">
                            <div aria-label="identifier for the step" className="stepNumber">{step.stepNo}</div>
                            <div aria-label="content for this recipes step" className="stepContent">{step.content}</div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default RecipeSteps