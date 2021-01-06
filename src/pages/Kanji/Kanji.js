import React, { useState, useEffect } from 'react';
import './Kanji.scss';

const Kanji = ({match}) => {
    const [kanji, setKanji] = useState([]);
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchKanji = async () => {
            const res = await fetch(`https://kanjiapi.dev/v1/kanji/${match.params.kanji}`)
            const data = await res.json();
            setKanji(data)
            fetchWords();
        }

        const fetchWords = async () => {
            const res = await fetch(`https://kanjiapi.dev/v1/words/${match.params.kanji}`)
            const data = await res.json();
            setWords(data)
            setLoading(false)
        }
        fetchKanji();
        
    },[match.params.kanji])

    const getRandomWords = (words) => {
        const randomIndex = () => Math.floor(Math.random() * words.length)
        return [words[randomIndex()],words[randomIndex()],words[randomIndex()],words[randomIndex()],words[randomIndex()]]
    }
    console.log(kanji)
    const wordDisplay = getRandomWords(words);
    console.log(wordDisplay)

    return (
        <div>
        {!loading && 
        <>
            <div className="card">
                <p className="card__heisig">{kanji.heisig_en}</p>
                <h1 className="card__kanji">{kanji.kanji}</h1>
                <ul className="card__meanings">
                    {kanji.meanings.length > 1 ? kanji.meanings.map((m,i) => {
                        return <li className="card__meanings-word"key={i}>{m}</li>
                    }) : null}
                </ul>
                {kanji.kun_readings.length > 0 && <p>kun yomi</p>}
                <ul className="card__kun">
                    {kanji.kun_readings.map((m,i) => {
                        return <li key={i}>{m}</li>
                    })}
                </ul>
                {kanji.on_readings.length > 0 && <p>on yomi</p>}
                <ul className="card__on">
                    {kanji.on_readings.map((m,i) => {
                        return <li key={i}>{m}</li>
                    })}
                </ul>
                {kanji.name_readings.length > 0 && <p>nanori</p>}
                <ul className="card__nanori">
                    {kanji.name_readings.map((m,i) => {
                        return <li className="card__nanori-word"key={i}>{m}</li>
                    })}
                </ul>
                <p className="card_jlpt">JLPT: {kanji.jlpt}</p>
            </div>
            <div className="words">
            {wordDisplay.map((word, i) => {
                return (
                    <div key={i} className="words__container">
                        <p className="words__word">{word.variants[0].written}</p>
                        <div className="words__info">
                            <p>{word.variants[0].pronounced}</p>
                            <p>{word.meanings[0].glosses[0]}</p>
                        </div> 
                    </div>
                )
            })}

        </div>
        </>
            }
            
        </div>
    )
}

export default Kanji
