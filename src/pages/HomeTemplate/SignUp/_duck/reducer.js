import * as TYPES from "./types";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const HomeSignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SIGN_UP_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.SIGN_UP_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.SIGN_UP_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default HomeSignUpReducer;
