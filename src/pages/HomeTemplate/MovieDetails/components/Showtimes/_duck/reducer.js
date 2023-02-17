import * as TYPES from "./types";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const MovieShowtimesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.MOVIE_SHOWTIMES_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.MOVIE_SHOWTIMES_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.MOVIE_SHOWTIMES_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default MovieShowtimesReducer;
