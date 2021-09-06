import React from "react";
import { updateJob } from "./store";
import { connect } from "react-redux";

const _Jobs = ({ jobs, select }) => {
  return (
    <div id="view">
      <div id="pool">
        <h3>Available Jobs</h3>
        <ul>
          {jobs.map((currentJob) => {
            return (
              <li
                key={currentJob.id}
                onClick={() => {
                  select(currentJob);
                }}
              >
                {currentJob.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div id="current-party">
        <h3>Current Party</h3>
        <ul>
          {jobs
            .filter((job) => job.selected)
            .map((currentJob) => {
              return (
                <li
                  key={currentJob.id}
                  onClick={() => {
                    select(currentJob);
                  }}
                >
                  {currentJob.name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (job) => dispatch(updateJob(job)),
  };
};

const Jobs = connect((state) => state, mapDispatchToProps)(_Jobs);

export default Jobs;
