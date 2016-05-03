import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';

class App extends React.Component{
  constructor(){
    super();
    this.state = {movies: [], selectedMovieId: 'tt0120915' };
  }

  componentWillMount() {
    this.updateSearch();
  }

  updateSearch(param = 'star'){
    let searchTxt = param || this.refs.input.value;

    if(searchTxt.length < 2) return;

    let url = 'http://www.omdbapi.com/?s=' + searchTxt + '&y=&r=json&plot=short';
    Request.get(url).then(response => {
      if(response.body.Search)
        this.setState({ movies: response.body.Search });
    });
  }

  selectMovie(){
    console.log(this.refs.movieSelector.value);
    this.setState({selectedMovieId: this.refs.movieSelector.value})
  }

  render(){
    let options = this.state.movies.map(function(element){
      return <option key={element.imdbID} value={element.imdbID}>{element.Title}</option>;
    });
    let selectedMovieImage = this.state.movies.length &&
        this.state.movies.filter(movie => movie.imdbID === this.state.selectedMovieId)[0].Poster;
        //console.log(selectedMovie);
    return (
      <div>
        <input type='text' ref="input"
                onChange={this.updateSearch.bind(this)}/>
        <select ref='movieSelector'
                value={this.state.selectedMovieId}
                onChange={this.selectMovie.bind(this)}>
                {options}
        </select>
        <img src={selectedMovieImage}/>
      </div>
    );
  }
}

export default App;
