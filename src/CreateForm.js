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
            console.log(this.state);
            this.props.createJob(this.state.name);
          }}
        >
          Add Job
        </button>
        <button
          type="button"
          onClick={() => {
            this.props.createJob({ name: "Dancer" });
          }}
        >
          Dancer Button
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createJob: (name) => dispatch(createJob(name)),
  };
};

export default connect(null, mapDispatchToProps)(CreateForm);
