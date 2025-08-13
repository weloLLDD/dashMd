import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_REPORT_FAIL, ORDER_REPORT_REQUEST, ORDER_REPORT_SUCCESS } from "../constants/orderConstants";
import { logout } from "./userActions";
import axios from "axios";

//ALL products
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type:ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(userInfo),
    };

    const { data } = await axios.get(`https://backenmd.onrender.com/api/orders/all`, config);
    dispatch({ type:ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type:ORDER_LIST_FAIL,
      payload: message,
    });
  }
};


// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
 

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(userInfo),
    };

    const { data } = await axios.get(`https://backenmd.onrender.com/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Request failed with 404") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};
 

// TELECHARGER PDF

export const downloadGroupedReport = (month, category = "", userId = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REPORT_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`, // si route protégée
      },
      params: { month, category, userId }
    };

    const { data } = await axios.get("https://backenmd.onrender.com/api/orders/reportGroup", config);

    dispatch({
      type: ORDER_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_REPORT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
