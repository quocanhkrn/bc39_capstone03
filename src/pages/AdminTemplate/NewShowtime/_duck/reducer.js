import * as TYPES from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const AdminShowtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADD_SHOWTIME_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.ADD_SHOWTIME_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.ADD_SHOWTIME_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default AdminShowtimeReducer;
