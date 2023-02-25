import * as TYPES from "./types";

const movieListInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const AdminMovieListReducer = (state = movieListInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_MOVIES_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.GET_MOVIES_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.GET_MOVIES_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
