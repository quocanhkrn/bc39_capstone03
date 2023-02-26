import { combineReducers } from "redux";
import HomeCarouselReducer from "pages/HomeTemplate/Homepage/components/Carousel/_duck/reducer";
import HomeShowtimesReducer from "pages/HomeTemplate/Homepage/components/Showtimes/_duck/reducer";
import HomeMovieListReducer from "pages/HomeTemplate/Homepage/components/MovieList/_duck/reducer";
import HomeMovieInfoReducer from "pages/HomeTemplate/MovieDetails/components/MovieInfo/_duck/reducer";
import TicketBookingReducer from "pages/HomeTemplate/TicketBooking/_duck/reducer";
import SeatingReservationReducer from "pages/HomeTemplate/TicketBooking/components/Seats/_duck/reducer";
import HomeLogInReducer from "pages/HomeTemplate/SignIn/_duck/reducer";
import HomeSignUpReducer from "pages/HomeTemplate/SignUp/_duck/reducer";
import MovieShowtimesReducer from "pages/HomeTemplate/MovieDetails/components/Showtimes/_duck/reducer";
import AdminSignInReducer from "pages/AdminTemplate/SignIn/_duck/reducer";
import { AdminMovieListReducer } from "pages/AdminTemplate/Movies/_duck/reducer";
import { AdminGetMovieInfoReducer } from "pages/AdminTemplate/MovieForm/_duck/reducer";

const RootReducer = combineReducers({
  HomeCarouselReducer,
  HomeShowtimesReducer,
  HomeMovieListReducer,
  HomeMovieInfoReducer,
  TicketBookingReducer,
  SeatingReservationReducer,
  HomeLogInReducer,
  HomeSignUpReducer,
  MovieShowtimesReducer,
  AdminSignInReducer,
  AdminMovieListReducer,
  AdminGetMovieInfoReducer,
});

export default RootReducer;
