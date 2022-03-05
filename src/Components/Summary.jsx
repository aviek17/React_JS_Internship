import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import axios from 'axios'

const Summary = () => {
  const { id } = useParams()

  console.log();
  const [list, setList] = useState([])
  const [state, setState] = useState(false)

  const [user, setUser] = useState({
    name: localStorage.getItem('Name'),
    email: localStorage.getItem('Email'),
    phone: localStorage.getItem('Phone')
  })

  useEffect(() => {
    const Fetch = async () => {
      const res = await axios.get("https://api.tvmaze.com/search/shows?q=all");
      setList(res.data)
      // console.log(res.data)
    }
    Fetch();
  }, [])

  const Book = () => {
    setState(true)
  }
  let name, value
  const handleInput = (event) => {
    name = event.target.name
    value = event.target.value
    setUser({ ...user, [name]: value })
  }

  const bookTicket = () => {
    localStorage.setItem('Name', user.name)
    localStorage.setItem('Email', user.email)
    localStorage.setItem('Phone', user.phone)
  }



  return (
    <>

      <h2 className="App  frame1 mt-3">Summary</h2>
      <div className="container ">

        {
          list.map((curr, index) => {
            if (curr.show.id == id) {
              return (<>
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4" >
                    <div className="card mt-3 card-design">
                      <img className="card-img-top" src={curr.show.image.medium} alt={curr.show.name} height="400px" width="100px" />
                      <div className="card-body">
                        <h3 className="App">  {curr.show.name}</h3>
                        <p className="App design">Summary : {curr.show.summary}</p>
                        <div className="row">
                          <div className="col-6">
                            <button type="button" className="btn btn-outline-info button"
                              onClick={Book}>Book Ticket</button>
                          </div>
                          <div className="col-6">
                            <NavLink to="/">
                              <button type="button" className="btn btn-outline-info button">
                                Back
                              </button>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4"></div>
                </div>
                <div className="m-5">

                  {state &&

                    <form className="formDesign">
                      <h1 className="App">Book Your Ticket</h1>
                      <div className="form-row">
                        <div className="col-7">
                          <label><h3>Movie Name</h3></label>
                          <input type="text" className="form-control" value={curr.show.name} />
                        </div>
                        <div className="col">
                          <label><h3>Runtime</h3></label>
                          <input type="text" className="form-control" value={curr.show.runtime} />
                        </div>
                        <div className="col">
                          <label><h3>Language</h3></label>
                          <input type="text" className="form-control" value={curr.show.language} />
                        </div>
                      </div>
                      <br></br>
                      <div className="form-row">
                        <div className="col-4">
                          <label><h3>Name</h3></label>
                          <input type="text" className="form-control" placeholder="Enter your name"
                            name="name"

                            onChange={handleInput} value={user.name} />
                        </div>
                        <div className="col-4">
                          <label><h3>Email</h3></label>
                          <input type="text" className="form-control" placeholder="Enter your email"
                            name="email"

                            onChange={handleInput} value={user.email} />
                        </div>
                        <div className="col-4">
                          <label><h3>Phone</h3></label>
                          <input type="text" className="form-control" placeholder="Enter your phone"
                            name="phone"

                            onChange={handleInput} value={user.phone} />
                        </div>
                      </div>
                      <br></br>
                      <button type="button" className="btn btn-outline-info success" onClick={bookTicket}>Book</button>

                      <button type="button" className="btn btn-outline-info success ml-5" onClick={() => {
                        localStorage.clear();
                      }}>Clear</button>
                    </form>
                  }
                </div>
              </>)
            }
          })
        }

      </div>
    </>
  )
}

export default Summary