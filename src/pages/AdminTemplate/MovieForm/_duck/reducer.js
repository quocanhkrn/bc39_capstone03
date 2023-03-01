import * as TYPES from "./types";
import { combineReducers } from "redux";

const addMovieInitialState = {
  loading: false,
  data: null,
  error: null,
};

const AddMovieReducer = (state = addMovieInitialState, action) => {
  switch (action.type) {
    case TYPES.ADD_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.ADD_MOVIE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.ADD_MOVIE_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const updateMovieInitialState = {
  loading: false,
  data: null,
  error: null,
};

const UpdateMovieReducer = (state = updateMovieInitialState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.UPDATE_MOVIE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.UPDATE_MOVIE_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const AdminMovieReducer = combineReducers({ AddMovieReducer, UpdateMovieReducer });

export default AdminMovieReducer;
