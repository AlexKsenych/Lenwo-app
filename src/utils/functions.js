const isClassNameActive = (condition, className) => {
    return condition ? className : `${className} ${className}_active`
}

export { isClassNameActive }
