import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  //using Loading state to show/tell user that informationfrom API is coming since it takes about 1-2 second for data to load
  const [isLoading, setIsLoading] = useState(false);
  // To Handle errors such as the request urls having "api/film" instead of "api/films"
    // Since no error from start set state to null, also set to null if no more error
  const [error, setError] = useState(null);

  // 1st way to handle promises .then()
  // const fetchMovieHandler = () => {
  //   // An API call that is fetch, calls to preset DB which is start wars and from https://swapi.dev/ website
  //   // Sends in an object via the second parameter to send in such things as the method type as GET or POST and other information.
  //   // .then() handles the data/results the promise returned by fetch returns. When data from promise comes back, .then() is a function that handles it.
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       // When you return this reponse.json since .json returns a promise or waits for results, .then() can be used on the original .then() function
  //       // The second .then() handles the json response and the result which is seen on the API page,
  //       // the .results is an array retruned from the api which has some info and more .something to get more specific information
  //       return response.json();
  //     })
  //     .then((data) => {  
  //       console.log(data);
  //       // the transformedMovies makes the results call and turns the total movieData
  //         // it returns all the info needed such as id, title, openingText, releaseData - need specific json calls from API website 
  //       const transformedMovies = data.results.map(movieData => 
  //         {
  //           // This creates an object out of each film which contains an id, title, openingText, and releaseDate
  //           return {
  //             id: movieData.episode_id,
  //             title: movieData.title,
  //             openingText: movieData.opening_crawl,
  //             releaseDate: movieData.release_date 
  //           };
  //         });
  //         // transformedMovies stores the 6 episodes/movies in objects which all contain object properties of id, title, openingText, and releaseDate
  //       setMovies(transformedMovies);
  //     });
  // };
    const fetchMovieHandler = async() => {
      //2nd way to handle promises via async/await
        // An API call that is fetch, calls to preset DB which is start wars and from https://swapi.dev/ website
          // Sends in an object via the second parameter to send in such things as the method type as GET or POST and other information.
            // .then() handles the data/results the promise returned by fetch returns. When data from promise comes back, .then() is a function that handles it.
        setIsLoading(true);      
        setError(null);

        try{
          // Handling Http Errors - error in url if "api/films" becomes "api/film", 404 error
          const response = await fetch("https://swapi.dev/api/films/");
          // .then((response) => {
          //   // When you return this reponse.json since .json returns a promise or waits for results, .then() can be used on the original .then() function
          //   // The second .then() handles the json response and the result which is seen on the API page,
          //   // the .results is an array retruned from the api which has some info and more .something to get more specific information
          //   return response.json();
          // })

          if(!response.ok) {
            throw new Error("The status didn't return ok!");
          }

          const data = await response.json();
          // .then((data) => {
          //   console.log(data);
          // the transformedMovies makes the results call and turns the total movieData
          // it returns all the info needed such as id, title, openingText, releaseData - need specific json calls from API website
        

          const transformedMovies = data.results.map((movieData) => {
            // This creates an object out of each film which contains an id, title, openingText, and releaseDate
            return {
              id: movieData.episode_id,
              title: movieData.title,
              openingText: movieData.opening_crawl,
              releaseDate: movieData.release_date,
            };
          });
          // transformedMovies stores the 6 episodes/movies in objects which all contain object properties of id, title, openingText, and releaseDate
          setMovies(transformedMovies);
        }
    catch(error) {
      console.log(error.message);
      setError(error.message);
    }
    // after the async calls above, there should be no more loading which is why setIsLoading is set to false
      // Due to try catch if there is an error or not, setIsLoading will stop the loading of the page and set to false from true in try statement
    setIsLoading(false);
  };

  //console.log(movies);
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];


  let content = <h1>No Movies Found...</h1>

  if(movies.length > 0)
  {
    content = <MoviesList movies={movies}/>
  } else if(error) {
    content = <h1>{error}</h1>
  } else if(isLoading) {
    content=<h1>Loading...</h1>
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section> {content}
        {/* Al replaced by minor if statement logic above 
        This is the movies which is the call to the array destructuring as the state above. It's set to the result of the json array.
        {!isLoading && movies.length === 0 && !error && <p>Found No Movies Yet...</p>}
        {isLoading ? <h1>isLoading...</h1> :<MoviesList movies={movies} />}
        {!isLoading && movies.length >= 0 && <MoviesList movies={movies} />}
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && error && <p>{error}</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
