import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
const LOAD_JOBS = "LOAD_JOBS";
const CREATE_JOB = "CREATE_JOB";
const SELECT_JOB = "SELECT_JOB";

const jobs = (state = [], action) => {
  if (action.type === "LOAD_JOBS") {
    return action.jobs;
  }
  if (action.type === "CREATE_JOB") {
    return [...state, action.job];
  }
  if (action.type === "SELECT_JOB") {
    return state.map((job) => (job.id === action.job.id ? action.job : job));
    //return action.jobs
  }
  return state;
};

const store = createStore(
  combineReducers({
    jobs,
  }),
  applyMiddleware(thunk, logger)
);

export const fetchJobs = () => {
  return async (dispatch) => {
    const jobs = (await axios.get("/api/jobs")).data;
    dispatch({
      type: LOAD_JOBS,
      jobs,
    });
  };
};

export const updateJob = (job) => {
  return async (dispatch) => {
    console.log("updateJob called");
    const selected = (
      await axios.put(`/api/jobs/${job.id}`, { selected: !job.selected })
    ).data;
    dispatch({ type: SELECT_JOB, job: selected });
    dispatch({ type: LOAD_JOBS });
  };
};

export const createJob = (passedJob) => {
  return async (dispatch) => {
    console.log("createJob called");
    const job = (await axios.post(`/api/jobs`, { passedJob })).data;
    dispatch({ type: CREATE_JOB, job });
  };
};

export default store;
