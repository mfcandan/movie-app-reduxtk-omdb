import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Poster: string;
}

interface MovieState {
    isLoading: boolean;
    movies: Movie[];
    totalResults: number;
}

const initialState: MovieState = {
    isLoading: false,
    movies: [],
    totalResults: 0,
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.isLoading = !state.isLoading;
        },
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
        setTotalResults: (state, action: PayloadAction<number>) => {
            state.totalResults = action.payload;
        },
    },
});

export const { toggleLoading, setMovies, setTotalResults } = movieSlice.actions;

export const fetchMovies = (
    query: string,
    page: number,
    type?: string,
    year?: string,
    genre?: string
  ): AppThunk => async (dispatch) => {
    try {
      dispatch(toggleLoading());
      const apiKey = process.env.REACT_APP_OMDB_API_KEY;
      const apiUrl = 'https://www.omdbapi.com/';
  
      let apiUrlWithParams = `${apiUrl}?apikey=${apiKey}&s=${query}&page=${page}&plot=short`;
      if (type) apiUrlWithParams += `&type=${type}`;
      if (year) apiUrlWithParams += `&y=${year}`;
      if (genre) apiUrlWithParams += `&genre=${genre}`;
  
      const response = await fetch(apiUrlWithParams);
      const searchData = await response.json();

      dispatch(setMovies(searchData.Search || []));
      dispatch(setTotalResults(parseInt(searchData.totalResults) || 0));
      dispatch(toggleLoading());
    } catch (error) {
      console.error('API isteği başarısız oldu: ', error);
      dispatch(toggleLoading());
    }
  };

export const selectMovies = (state: RootState) => state.movie.movies;
export const selectTotalResults = (state: RootState) => state.movie.totalResults;
export const selectLoading = (state: RootState) => state.movie.isLoading;

export default movieSlice.reducer;
