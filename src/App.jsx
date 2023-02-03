import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import './residentCard.css'
import { LocationInfo } from './components/LocationInfo'
import { ResidentsInfo } from './components/ResidentsInfo'
import getRandomLocation from './utils/getRandomLocation'
import { ErrorScreen } from './components/ErrorScreen'

function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation !== '' ? numberLocation : getRandomLocation() }`
    axios.get(url)
    .then(res => {
      setLocation(res.data)
      setHasError(false) 
    })
    .catch(err => {
      console.log(err)
      setHasError(true)
    })
  }, [numberLocation])

  const handleSubmit = e => {
    e.preventDefault()
    setNumberLocation(e.target.inputLocation.value.trim())
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }

  return (
    <div className="App">
      <header className='app__header' />
      <div className='container app__container'>
        <form onSubmit={handleSubmit} className='app__form' >
          <div className='app__formElements'>
            <input type='text' id='inputLocation' placeholder='Insert location ID' autoComplete='off' />
          </div>
        </form>

        {
          hasError ? 
            <ErrorScreen />
          :
          <>
            <LocationInfo location={location} />
            <div className='ResidentsContainer'>
              {
                location?.residents.map(url => (
                  <ResidentsInfo key={url} url={url} />
                ))
              }
            </div>
          </>
        }
      </div>
      <footer className='app__footer' />
    </div>
  )
}

export default App
