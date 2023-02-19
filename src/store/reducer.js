import { combineReducers } from "redux";
import HomeCarouselReducer from "pages/HomeTemplate/Homepage/components/Carousel/_duck/reducer";
import HomeShowtimesReducer from "pages/HomeTemplate/Homepage/components/Showtimes/_duck/reducer";
import HomeMovieListReducer from "pages/HomeTemplate/Homepage/components/MovieList/_duck/reducer";
import HomeMovieInfoReducer from "pages/HomeTemplate/MovieDetails/components/MovieInfo/_duck/reducer";
import HomeLogInReducer from "pages/HomeTemplate/SignIn/_duck/reducer";
import HomeSignUpReducer from "pages/HomeTemplate/SignUp/_duck/reducer";
import MovieShowtimesReducer from "pages/HomeTemplate/MovieDetails/components/Showtimes/_duck/reducer";

const RootReducer = combineReducers({
  HomeCarouselReducer,
  HomeShowtimesReducer,
  HomeMovieListReducer,
  HomeMovieInfoReducer,
  HomeLogInReducer,
  HomeSignUpReducer,
  MovieShowtimesReducer,
});

export default RootReducer;
