import { TypographyNestedContext } from "@mui/joy/Typography/Typography"

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

/* Check to ensure there is a value set for the element being validated */
export const required = (e) => {

    /* Destructure the passed in event */
    const { target }  = e
    
    /* Check the type of the element that is required */
    if(target.type === 'file'){

        if(!target.value || target.value === undefined || target.value === null){
            return 'This is a required field please supply a valid value'
        } 

    }  else {
        /* All other element types to be checke here */
        if(!target.value || target.value === undefined || target.value === null || target.value === ''){
            return `This is a required field please supply a valid value`
        }

    }
    
    /* By default set return value to true */
    return true

}

/* checks that the filetype matches the passed in array of acceptable file types */
export const allowedFileTypes = (e, types) => {

    /* Check that the passed in types is an array and has items */
    if(!types || !Array.isArray(types) || types?.length < 1){
        return 'You must supply a valid list of file types to check against'
    }

    /* Loop through each file type and check against the current elements file
      type and if a match is found then increase the match count*/
    let matches = 0
    types.forEach( type => {
        if(type === e.target.files[0].type){
            matches += 1
        }
    })

    /* Return a message if no matches found */
    if(matches < 1){
        return 'The supplied file does not match one of the allowed types'
    }

    /* Set the default return value */
    return true

}

/* Checks the file being uploaded does not exceed a certain size in bytes */
export const maxFileSize = (e, size) => {

    /* Check that we have a value passed in for checking the size against */
    if(!size || typeof size !== 'number' || size === null || size === undefined){
        return 'You must supply a valid size to check against'
    }

    /* Get the file we are interested in */
    const file = e.target.files[0]

    /* Check the current file is not larger than the max size */
    if(file.size / 1024 > size){
        return 'The supplied file exceeds the max file size of ' + size + ' kb'
    }

    /* Set the default return value */
    return true
}