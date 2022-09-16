import { useState } from 'react'
import './kahootLike.sass'

const KahootLike = ({ words }) => {
    const [currentNum, setCurrentNum] = useState(0)
    console.log(words)

    const img = null

    return (
        <main className='kahoot-like'>
            <div className='kahoot-like__container'>
                <div className='kahoot-like__container__definition'>
                    <div className='kahoot-like__container__definition__count'>{`${
                        currentNum + 1
                    } / ${0}`}</div>
                    {img ? (
                        <img
                            src={img}
                            alt='definitionImage'
                            className='kahoot-like__container__definition__img'
                        />
                    ) : null}
                    <div className='kahoot-like__container__definition__descr'>
                        descr
                    </div>
                </div>
                <div className='kahoot-like__container__btns'>
                    <button className='kahoot-like__container__btns__btn'>
                        Word
                    </button>
                    <button className='kahoot-like__container__btns__btn'>
                        Word
                    </button>
                    <button className='kahoot-like__container__btns__btn'>
                        Word
                    </button>
                    <button className='kahoot-like__container__btns__btn'>
                        Word
                    </button>
                </div>
            </div>
        </main>
    )
}

export default KahootLike
