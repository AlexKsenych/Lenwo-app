import { useSearchParams } from 'react-router-dom'

const TemplateHOC = ({ Component, data }) => {
    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')

    const { words, title } = data.find((item) => item._id === searchId)

    return (
        <>
            <div className='title'>{title}</div>
            <Component words={words} title={title} />
        </>
    )
}

export default TemplateHOC
