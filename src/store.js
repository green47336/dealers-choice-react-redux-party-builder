import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
const LOAD_JOBS = "LOAD_JOBS";
const CREATE_JOB = "CREATE_JOB";
const SELECT_JOB = "SELECT_JOB";

const jobs = (state = [], action) => {
  //switch (action.type)
  if (action.type === "LOAD_JOBS") {
    return action.jobs;
  }
  if (action.type === "CREATE_JOB") {
    return [...state, action.job];
  }
  if (action.type === "SELECT_JOB") {
    return state.map((job) => (job.id === action.job.id ? action.job : job));
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
    const { data: jobs } = await axios.get("/api/jobs");
    dispatch({
      type: LOAD_JOBS,
      jobs,
    });
  };
};

export const updateJob = (job) => {
  return async (dispatch) => {
    console.log("updateJob called");
    const { data: selected } = await axios.put(`/api/jobs/${job.id}`, {
      selected: !job.selected,
    });
    dispatch({ type: SELECT_JOB, job: selected });
  };
};

export const createJob = (newJob) => {
  return async (dispatch) => {
    console.log("createJob called");
    console.log(typeof newJob);
    const { data: job } = await axios.post(`/api/jobs`, { name: newJob.name });
    dispatch({ type: CREATE_JOB, job });
  };
};

export default store;
