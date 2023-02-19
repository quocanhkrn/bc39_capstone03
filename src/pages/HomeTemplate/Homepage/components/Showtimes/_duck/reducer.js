import * as TYPES from "./types";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const HomeShowtimesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SHOWTIMES_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.SHOWTIMES_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.SHOWTIMES_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default HomeShowtimesReducer;
