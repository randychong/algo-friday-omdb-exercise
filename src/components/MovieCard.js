import React from 'react'
import { Card } from 'react-bootstrap'

export default function MovieCard(props) {
    //removed useless consts
    return (
        <Card className="movie-card">
        <Card.Img className="movie-card-img" variant="top" src={props.poster} />
        <Card.Body>
          <Card.Title className="card-title">{props.title}</Card.Title>
          <Card.Text className="card-year">{props.year}</Card.Text>
        </Card.Body>
      </Card>
    )
}
