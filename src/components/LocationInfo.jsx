import React from 'react'

export const LocationInfo = ({ location }) => {

    

    return (
        <article className='article__locationInfo'>
            <div className='article__locationName'>
                <h1>{location?.name}</h1>
            </div>
            <div className='article__locationStats'>
                <div>
                    <h3>Dimension:</h3>
                    <h4>{location?.dimension}</h4>
                </div>
                <div>
                    <h3>Type:</h3>
                    <h4>{location?.type}</h4>
                </div>
                <div>
                    <h3>Population:</h3>
                    <h4>{location?.residents.length}</h4>
                </div>                
            </div>

        </article>
    )
}
