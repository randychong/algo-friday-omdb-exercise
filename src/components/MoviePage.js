import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import Loader from './Loader/Loader'
import MovieCard from './MovieCard'
import NoMoviesFound from './NoMoviesFound'
import API_KEY from "../APIKey" //import API Key
import { useDispatch, useSelector } from "react-redux"
import { changeUsername, addUser} from "../actions/actions"

export default function MoviePage() {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const username = useSelector((state) => state.username)
  const dispatch = useDispatch()
  let newUser = useSelector((state) => state.newUser)
  let [newUsername, setNewUsername] = useState("")
  newUser = newUsername

  useEffect(() => {
    const getDefaultMovies = async () => {
      setLoading(true)
      const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=Dark Knight`, {
        headers: { Accept: "application/json" },
      });
      const parsedData = await response.json();
      setMovies(parsedData.Search); //added.Search
      setLoading(false)
    }
    getDefaultMovies()
}, [])


  const getMovies = async () => {
    setLoading(true)
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`, {
      headers: { Accept: "application/json" },
    });
    const parsedData = await response.json();
    if (parsedData) {
      setMovies(parsedData.Search);
    } else {
      setMovies([])
    }
    setLoading(false);
  };
  
  return (
    <div className="main-page-content">
      <h1 className="main-header">Moviflix</h1>
      <h3 className="sub-header">{username}, try searching for any Movie</h3>
      <input
        type="text"
        placeholder="Input new username"
        onChange={(e) => {
          e.preventDefault()
          setNewUsername(e.target.value)
        }}
        ></input>
      <button
        onClick={(e) => {
          console.log(newUser)
          addUser(dispatch)
          changeUsername(dispatch)
          }}>
        Change User</button>
      <Form className="search-form"
        onSubmit={(e) => { //changed to onSubmit
          e.preventDefault() //camelcased preventDefault
          getMovies()
        }}>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Search Movies"
            aria-label="Search Movies"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            required
            />
          <InputGroup.Append>
            <Button
                onClick={(e) => { //added onClick
                e.preventDefault()
                getMovies()
                }}
                type="submit"
                variant="secondary">
              Search
              </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {
        !movies ?
          <NoMoviesFound /> :
          ( loading ? //removed !
            (
              <Loader />
            ) : (
              <Row className="movie-container">
                {movies.map((movie) => {
                  return (
                    <Col
                      key={movie.imdbID}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-4"
                    >
                      <MovieCard  //added multiple parameters
                        title={movie.Title} 
                        poster={movie.Poster}
                        year={movie.Year}
                      />
                    </Col>
                  )
                })}
              </Row>
            )
          )
      }
    </div>
  )
}

