import {
  REPORT_REQUEST,
  REPORT_SUCCESS,
  REPORT_FAIL,
} from "../constants/reportConstants";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_REQUEST:
      return { loading: true, error: null, success: false };
    case REPORT_SUCCESS:
      return { loading: false, success: true, error: null };
    case REPORT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
