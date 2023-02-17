import * as TYPES from "./types";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const HomeMovieInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.MOVIE_INFO_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.MOVIE_INFO_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.MOVIE_INFO_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default HomeMovieInfoReducer;
