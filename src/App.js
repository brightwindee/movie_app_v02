import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    count: 0,
    dummy1: false,
    dummy2: false

  };

  constructor(props) {
    super(props);
    console.log("App constucted");
  }

  async getMovies() {
    console.log("getMovies()");
    const {
      data: {
        data: {movies}
      }
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    //console.log(movies);
    this.setState({ movies, isLoading: false });
  }

  componentDidMount() {
    console.log("Mounted")
    this.getMovies();
  }

  render() {
    console.log("render:")
    const { isLoading, movies } = this.state;
    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text">'Loading...'</span>
          </div>
        ) : (
          <div class="movies">
            {movies.map(movie => (     
              <Movie 
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                summary={movie.summary}
                poster={movie.medium_cover_image}
              />))
            }
          </div>
        )}
      </section>
    );
  }
}

export default App;

