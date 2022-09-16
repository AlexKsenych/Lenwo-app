function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

const changeClassNameByCondition = (
    e,
    className,
    condition,
    timeOut = 1200
) => {
    if (condition === null) return

    const target = e.currentTarget

    target.className = condition
        ? `${className} ${className}_true`
        : `${className} ${className}_false`

    setTimeout(() => {
        target.className = className
    }, timeOut)
}

const isClassNameActive = (condition, className) => {
    return condition ? className : `${className} ${className}_active`
}

export { shuffleArray, isClassNameActive, changeClassNameByCondition }
