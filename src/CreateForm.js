import React, { Component } from "react";
import { connect } from "react-redux";
import { createJob } from "./store";

class CreateForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }
  render() {
    const { name } = this.state;
    return (
      <div id="new-job">
        <h3>Create New Job</h3>
        <form>
          <input
            value={name}
            onChange={(ev) => {
              this.setState({ name: ev.target.value });
            }}
          />
          <button
            type="button"
            onClick={() => {
              console.log(name);
              this.props.createJob(this.state);
            }}
          >
            Add Job
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createJob: (newJob) => dispatch(createJob(newJob)),
  };
};

export default connect(null, mapDispatchToProps)(CreateForm);
