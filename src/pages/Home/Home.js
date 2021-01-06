import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    const storedList = localStorage.getItem('myList')
    const [list, setList] = useState(storedList ? storedList : 'grade-1')
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    const options = ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-8", "joyo", "jinmeiyo"]

    const toggle = () => {
        setShow(prev => !prev);
    }

    const handleList = (e) => {
        e.preventDefault();
        setLoading(true)
        localStorage.setItem('myList', e.target.id)
        setList(e.target.id)
        toggle()
        const fetchNewList =  async () => {
            const res = await fetch(`https://kanjiapi.dev/v1/kanji/${e.target.id}`)
            const data = await res.json()
            setData(data); 
            setLoading(false);
        }
        fetchNewList();
    }

    useEffect(() => {
        localStorage.setItem('myList', list)
        const fetchData = async () => {
            const res = await fetch(`https://kanjiapi.dev/v1/kanji/${list}`)
            const data = await res.json()
            setData(data);
        }
        fetchData();
    },[list])

    return (
        <div className="home">
            <div className="home__select">
                <div onClick={toggle} className="home__select-current">
                    {list.charAt(0).toUpperCase() + list.slice(1, list.length).replace("-", " ")}
                </div>
                <div className="home__select-cont">
                {show && options.map((op, i) => {
                    return (
                        <div onClick={handleList}key={i}>
                            <p className="home__select-options"id={op}>{op.charAt(0).toUpperCase() + op.slice(1, op.length).replace("-", " ")}</p>
                        </div>
                    )
                })}
                </div>
            </div>
            {!loading && 
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
            }
            
        </div>
    )
}

export default Home
