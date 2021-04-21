import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends Component {
  constructor(){
    super();
    this.state = {
      movies: [
        {
          _id : '606ed97a3973670f5af1bd69',
          Title: 'Catch me if you can',
          Description: 'Updated Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
          Genre: {
            'Name' : 'Drama',
            'Description' : 'Drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
          },
          Director: {
            Name: 'Steven Spielberg',
            Bio: 'One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood\'s best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.',
            Birth: '1946-12-18T00:00:00Z'
          },
          ImagePath: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_UX182_CR0,0,182,268_AL_.jpg',
          Featured: true
        },
        {
          _id: '606edad83973670f5af1bd6a',
          Title: 'The Avengers',
          Description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
          Genre: {
            Name: 'Action',
            Description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.'
          },
          Director: {
            Name: 'Joss Whedon',
            Bio: 'Joss Whedon is the middle of five brothers - his younger brothers are Jed Whedon and Zack Whedon. Both his father, Tom Whedon and his grandfather, John Whedon were successful television writers. Joss\' mother, Lee Stearns, was a history teacher and she also wrote novels as Lee Whedon. Whedon was raised in New York and was educated at Riverdale Country School, where his mother also taught. He also attended Winchester College in England for two years, before graduating with a film degree from Wesleyan University.',
            Birth: '1964-06-23T00:00:00Z'
          },
          'ImagePath' : 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
          'Featured' : true
        },
        {
          _id: '606edada3973670f5af1bd6b',
          Title: 'Operation Finale',
          Description: 'A team of secret agents set out to track down the Nazi officer who masterminded the Holocaust.',
          Genre: {
            Name: 'Drama',
            'Description' : 'Drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
          },
          Director: {
            Name: 'Chris Weitz',
            Bio: 'Chris Weitz was born on November 30, 1969 in New York City, New York, USA as Christopher John Weitz. He is a producer and writer, known for About a Boy (2002), Mr. & Mrs. Smith (2005) and Rogue One: A Star Wars Story (2016). He has been married to Mercedes Martinez since 2006. They have one child.',
            Birth: '1969-11-30T00:00:00Z',
          },
          ImagePath: 'https://m.media-amazon.com/images/M/MV5BYzE1YjI2MjctZTY2Zi00NDBhLWIzYmMtNzMzMDgwZjE4MzUxXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_UX182_CR0,0,182,268_AL_.jpg',
          Featured: true
        }
        
      ],
      selectedMovie: null
    }
    this.setSelectedMovie = this.setSelectedMovie.bind(this);
  }

  setSelectedMovie(selectedMovie){
    this.setState({ selectedMovie })
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <Container>The list is empty!</Container>; // Rendering string if movie array is empty
  
    return (
      <>
        {selectedMovie ? 
        <MovieView movie={selectedMovie} onBackButton={this.setSelectedMovie} />
        : 
        <Container>
          <Row xs={1} md={2} lg={3} noGutters>
            {movies.map(movie => 
            <Col className="d-flex justify-content-center" key={movie._id}>
              <MovieCard movie={movie} onMovieClick={this.setSelectedMovie} />
            </Col>
            )}
          </Row>
        </Container>
        }
      </>
    );
  }
};

export default MainView;