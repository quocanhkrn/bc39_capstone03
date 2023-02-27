import { combineReducers } from "redux";
import * as TYPES from "./types";

const AddUserInitialState = {
  loading: false,
  data: null,
  error: null,
};

const AddUserReducer = (state = AddUserInitialState, action) => {
  switch (action.type) {
    case TYPES.ADD_USER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.ADD_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.ADD_USER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const UpdateUserInitialState = {
  loading: false,
  data: null,
  error: null,
};

const UpdateUserReducer = (state = UpdateUserInitialState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_USER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.UPDATE_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.UPDATE_USER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const AdminUserReducer = combineReducers({ AddUserReducer, UpdateUserReducer });

export default AdminUserReducer;
