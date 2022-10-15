export const wordSetValidation = (name, descr, setError) => {
    const pureNameLength = name.trim().length,
        pureDescrLength = descr.trim().length

    if (pureNameLength < 1) {
        setError({
            isError: true,
            message: 'Name can not be less than 1 letter',
        })
        return false
    }

    if (name.length > 32) {
        setError({
            isError: true,
            message: `Name can not be bigger than 32 letters, you have ${name.length} letters`,
        })
        return false
    }

    if (pureDescrLength < 5) {
        setError({
            isError: true,
            message: 'Description can not be less than 5 letters',
        })
        return false
    }

    if (descr.length > 320) {
        setError({
            isError: true,
            message: `Description can not be bigger than 320 letters, you have ${descr.length} letters`,
        })
        return false
    }

    setError({ isError: false, message: '' })
    return true
}

export const registerValidation = (name, email, password, setError) => {
    if (name.trim().length < 3) {
        setError({
            isError: true,
            message: 'Full name can not be less than 3 letters',
        })
        return false
    }

    if (email.trim().length < 5) {
        setError({
            isError: true,
            message: 'Email can not be less than 3 letters',
        })
        return false
    }

    if (password.trim().length < 8) {
        setError({
            isError: true,
            message: 'Password can not be less than 8 letters',
        })
        return false
    }

    setError({
        isError: false,
        message: '',
    })
    return true
}
