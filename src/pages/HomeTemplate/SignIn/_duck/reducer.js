import * as TYPES from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const HomeLogInReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOG_IN_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.LOG_IN_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.LOG_IN_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default HomeLogInReducer;
