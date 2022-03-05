import React, { useState, useEffect } from 'react'
import { Header, Container } from 'semantic-ui-react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import "../App.css"

const List = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const Fetch = async () => {
      const res = await axios.get("https://api.tvmaze.com/search/shows?q=all");
      setList(res.data)
      console.log(res.data)
    }
    Fetch();
  }, [])

  // console.log(JSON.parse(list.image))

  return (
    <>
      <h1 className="App"> Shows List</h1>
      <div className="container frame1">
        <div className="row">
          {
            list.map((curr, index) => {
              return (<>
                <div className="col-4" >
                  <div className="card mt-3 card-design">
                    <img className="card-img-top" src={curr.show.image.medium} alt={curr.show.name} height="300px" width="100px" />
                    <div className="card-body">
                      <h3 className="App">  {curr.show.name}</h3>
                      <h4 className="App">Genre : {curr.show.genres[0]} {curr.show.genres[1]}</h4>
                      <p className="App design">Rating : {curr.show.rating.average} :: Language: {curr.show.language}</p>
                      <NavLink to={`/summary/${curr.show.id}`}><button type="button" className="btn btn-outline-info button">Summary</button></NavLink>

                    </div>
                  </div>
                </div>
              </>)
            })
          }
        </div>
      </div>

    </>
  )
}

export default List