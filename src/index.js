import React, { Component } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import store, { fetchJobs } from "./store";
import Jobs from "./Jobs";
import CreateForm from "./CreateForm";
import axios from "axios";

class _App extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }
  render() {
    const { jobs } = this.props;
    return (
      <div>
        <h1>Party Builder</h1>
        <div id="dingus">
          <Jobs />
          <CreateForm />
          <hr />
          <button
            type="button"
            onClick={async () => {
              try {
                await axios.post("/api/jobs", {
                  name: `DEBUG`,
                  selected: true,
                  str: 3,
                  agl: 4,
                  int: 9,
                  sta: 2,
                  lck: 5,
                });
              } catch (ex) {
                console.log(ex);
              }
            }}
          >
            debug
          </button>
        </div>
      </div>
    );
  }
}

//Super lazy mapStateToProps and mapDispatchToProps is sneaky af
const App = connect(
  (state) => state,
  (dispatch) => {
    return {
      fetchJobs: () => dispatch(fetchJobs()),
    };
  }
)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
