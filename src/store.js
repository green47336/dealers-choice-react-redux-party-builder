import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
const LOAD_CLASSES = "LOAD_CLASSES";

const classes = (state = [], action) => {
  if (action.type === LOAD_CLASSES) {
    return action.classes;
  }
  return state;
};

const store = createStore(
  combineReducers({
    classes,
  }),
  applyMiddleware(logger, thunk)
);

export const fetchClasses = () => {
  return async (dispatch) => {
    const classes = (await axios.get("/api/classes")).data;
    dispatch({
      type: LOAD_CLASSES,
      classes,
    });
  };
};

export default store;
