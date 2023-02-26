import * as TYPES from "./types";

const getMovieInfoInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const AdminGetMovieInfoReducer = (state = getMovieInfoInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_MOVIE_INFO_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.GET_MOVIE_INFO_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.GET_MOVIE_INFO_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
