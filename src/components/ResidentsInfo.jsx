import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ResidentsInfo = ({ url }) => {

    const [character, setCharacter] = useState()

    useEffect(() => {
        axios.get(url)
        .then(res => setCharacter(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <article className='resident__card'>
            <header className='resident__header'>
                <img src={character?.image} />
                <div className='resident__status'>
                    <span className={character?.status}><i className='fad fa-circle'></i></span>
                    <span>{character?.status}</span>
                </div>
            </header>
            <section className='resident__stats'>
                <h3>{character?.name}</h3>
                <ul>
                    <li><b>Specie: </b>{character?.species}</li>
                    <li><b>Origin: </b>{character?.origin.name}</li>
                    <li><b>Episodes: </b>{character?.episode.length}</li>
                </ul>
            </section>
        </article>
    )
}
