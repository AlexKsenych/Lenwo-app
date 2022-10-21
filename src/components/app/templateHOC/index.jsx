import { useSearchParams } from 'react-router-dom'

const TemplateHOC = ({ Component, data, ...rest }) => {
    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')

    const { words, title } = data.find((item) => item.id === searchId)

    return (
        <>
            <div className='title'>{title}</div>
            <Component words={words} title={title} {...rest} />
        </>
    )
}

export default TemplateHOC
