
export const isType = (data, type) => {
    return typeof data === type ? true : false
}

export const isSet = (data) => {
    return data !== undefined ? true : false
}

export const isInRange = (data, min, max) => {
    return data >= min && data <= max ? true : false
}