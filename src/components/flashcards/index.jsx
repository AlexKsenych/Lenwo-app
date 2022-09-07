import './flashcards.sass'

const Flashcards = () => {
    return (
        <main className='flashcards'>
            <div className='flashcards__flashcard'>
                <div className='flashcards__flashcard__word'>puppy</div>
                <div className='flashcards__flashcard__btns'>
                    <button className='flashcards__flashcard__btns__btn'>idk</button>
                    <button className='flashcards__flashcard__btns__btn'>Yeah I Knew That</button>
                </div>
            </div>
        </main>
    )
}

export default Flashcards

// <img className='flashcards__flashcard__img' src="" alt="flashcardImage" />