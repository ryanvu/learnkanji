import React, { useState, useEffect } from 'react';
import './Kanji.scss';

const Kanji = ({match}) => {
    const [kanji, setKanji] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchKanji = async () => {
            const res = await fetch(`https://kanjiapi.dev/v1/kanji/${match.params.kanji}`)
            const data = await res.json();
            setKanji(data)
            setLoading(false)
        }
        fetchKanji()
    },[])


    return (
        <div>
            <p>{JSON.stringify(kanji)}</p>
        {!loading && 
        <div className="card">
                <p className="card__heisig">{kanji.heisig_en}</p>
                <h1>{kanji.kanji}</h1>
                <ul className="card__meanings">
                    {kanji.meanings.map((m,i) => {
                        return <li key={i}>{m}</li>
                    })}
                </ul>
                <ul className="card__kun">
                    {kanji.kun_readings.map((m,i) => {
                        return <li key={i}>{m}</li>
                    })}
                </ul>
                <ul className="card__on">
                    {kanji.on_readings.map((m,i) => {
                        return <li key={i}>{m}</li>
                    })}
                </ul>
                <ul className="card__nanori">
                    {kanji.name_readings.map((m,i) => {
                        return <li key={i}>{m}</li>
                    })}
                </ul>
            </div>
            }
            

        </div>
    )
}

export default Kanji
