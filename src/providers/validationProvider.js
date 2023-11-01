
/* Checks if the element has a minimum length */
export const min = (min, e) => {

    /* Make sure that the min value passed in is valid and a number */
    if(!min || min === undefined || min === null || typeof min !== 'number'){
        return 'You must supply a minimum value to check against'
    }

    if(parseInt(min) < 0){
         return 'The minimum value must be greater than zero and a positive number'
    }

    /* Check the value */
    if(isNaN(parseInt(e.target.value))){
        return 'The supplied value is not a number'
    }

    /* Ensure the value is greater than the minimum */
    if(parseInt(e.target.value) < min){
        return `You must supply a value that is greater than or equal to ${min}`
    }

    /* By default set return value to true */
    return true

}

/* Checks to see if a value is less than a max value */
export const max = (max, e) => {

    /* Make sure that the min value passed in is valid and a number */
    if(!max || max === undefined || max === null || typeof max !== 'number'){
        return 'You must supply a maximum value to check against'
    }

    /* Check the value */
    if(isNaN(parseInt(e.target.value))){
        return 'The supplied value is not a number'
    }

    /* Ensure the value is greater than the minimum */
    if(parseInt(e.target.value) > max){
        return `You must supply a value that is no greater than ${max}`
    }

    /* By default set return value to true */
    return true

}

/* Checks to see if a string is of a minimum length */
export const minLength = (min, e) => {

    /* Make sure that the min value passed in is valid and a number */
    if(!min || min === undefined || min === null || typeof min !== 'number'){
        return 'You must supply a minimum value to check against'
    }

    if(parseInt(min) < 0){
         return 'The minimum value must be greater than zero and a positive number'
    }

    /* Check the value being checked is of the correct type */
    if(typeof e.target.value !== 'string'){
        return 'The supplied value being validated must be a string'
    }

    /* Now check the string meets the minimum requirements */
    if(e.target.value.length < min){
        return `The supplied value must be greater than or equal to ${min} characters`
    }

    /* By default set return value to true */
    return true

}

/* Checks to see if the string is of a max length */
export const maxLength = (max, e) => {

    /* Make sure that the min value passed in is valid and a number */
    if(!min || min === undefined || min === null || typeof min !== 'number'){
        return 'You must supply a maximium value to check against'
    }

    /* Check the value being checked is of the correct type */
    if(typeof e.target.value !== 'string'){
        return 'The supplied value being validated must be a string'
    }

    /* Now check the string meets the minimum requirements */
    if(e.target.value.length > max){
        return `The supplied value must be less than or equal to ${max} characters`
    }

    /* By default set return value to true */
    return true

}