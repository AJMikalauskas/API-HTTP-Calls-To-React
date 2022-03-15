import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Make sure to setup the google firebase api database via realtime database click and use test mode not locked mode - Enable Button
        // movies.json is the specificied name I'm giving it 
      const response = await fetch('https://react-http-first-api-calls-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      // Change the way data is GET because POST sends in different info and data becomes an object
        // Start with empty array since no preset data in the DB
      const loadedMovies = [];

      // Works as a dictionary
      for(const key in data)
      {
        // For every weird cryptic key in the firebase, an object of information from that cryptic key 
          // including an id, title, openingText, and releaseDate is pushed into the loadedMovies array
        loadedMovies.push({
          id: key, 
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      };
      setMovies(loadedMovies);
      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.openingText,
      //     releaseDate: movieData.releaseDate,
      //   };
      // });
      // setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  // Remember that for this function, you could add error handling via state
    // will change this later to not only have error handling but also to show a new movie instantly once it's added to the DB 
  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-first-api-calls-default-rtdb.firebaseio.com/movies.json', {
      method: "POST",
      // Pass in the movie data in body from AddMovie.js through this, converts object of movie into JSOn via JSON.stringify() method
      body: JSON.stringify(movie),
      headers: {
        // You know how APIs work and many more headers many need to be passed in especially for CORS BS
        'Content-Type': 'application/json'
      }
    });
    const data1 = await response.json();
    const data2 = await response;
    console.log(data1);
    console.log(data2);
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
