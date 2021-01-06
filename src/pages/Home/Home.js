import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-2')
            const data = await res.json()
            setData(data);
        }
        fetchData();
    },[])
    return (
        <div>
            <div className="home__container">
                {data.map((k,i) => {
                    return (
                    <div className="kanji__card" key={i}>
                        <Link className="kanji__link" to={`/${k}`}> 
                            <p>{k}</p>  
                        </Link>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
