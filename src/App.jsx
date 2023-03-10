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
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(false)

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

  const handleChange = e => {
    if(e.target.value.trim() === '') {
      setIsShow(false)
    }
    else {
      setIsShow(true)
      console.log(e.target.value.trim())
      const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
      axios.get(url)
      .then(res => {
        setListLocation(res.data.results) 
        console.log(res.data);
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="App">
      <header className='app__header' />
      <div className='container app__container'>
        <form onSubmit={handleSubmit} className='app__form' >
          <div className='app__formElements' >
            <input 
              type='text'
              id='inputLocation'
              placeholder='Insert location'
              autoComplete='off'
              onChange={handleChange}
            />
            <div className='autocomplete'>
              {
                isShow &&
                <ul>
                  {
                    listLocation?.map(loc => (
                      <li 
                        onClick={() => {
                          setNumberLocation(loc.id)
                          setIsShow(false)
                        }
                        } 
                        key={loc.id}>
                          {loc.name}
                      </li>
                    ))
                  }
                </ul>
              }
            </div>
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
