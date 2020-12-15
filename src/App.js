import './App.css';
import React, { useState, useEffect } from "react"
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import axios from 'axios'

function App() {

  // stroes data regarding job search
  const [search, setsearch] = useState({ description: "", location: "", fullTime: false })

  // stores all the jobs
  const [jobs, setjobs] = useState([])

  // After all the components are loaded this funtion will fetch jobs from external api
  useEffect(() => {
    const url = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"
    axios.get(url)
      .then(response => {
        setjobs(response.data)
      })
      .catch(error => console.log(error))

    return () => { }
  }, [])

  // whenever the user will enter job description or job locaion it will save those data in search state
  const handleFormChange = (e) => {

    const { name, value } = e.target
    setsearch(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  // check if user has clicked fulltime checkbox or not
  const handleCheckBox = (e) => {
    setsearch(prevState => {
      return {
        ...prevState,
        fullTime: e.target.checked
      }
    })
  }

  return (
    <>
      <Header {...search} handleFormChange={handleFormChange} handleCheckBox={handleCheckBox} />
      <Home jobs={jobs} filter={{ ...search }} />
    </>
  )

}

export default App;
