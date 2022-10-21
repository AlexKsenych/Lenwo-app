import { createContext } from 'react'
import { useSearchParams } from 'react-router-dom'

export const LanguageContext = createContext('EN')

const TemplateHOC = ({ Component, data, language }) => {
    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')

    const { words, title } = data.find((item) => item.id === searchId)

    return (
        <>
            <div className='title'>{title}</div>
            <LanguageContext.Provider value={language}>
                <Component words={words} title={title} />
            </LanguageContext.Provider>
        </>
    )
}

export default TemplateHOC
