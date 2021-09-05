import React, { Component } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import store, { fetchClasses } from "./store";
import Classes from "./Classes";

class _App extends Component {
  componentDidMount() {
    this.props.bootstrap();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Party Builder</h1>
        <Classes />
      </div>
    );
  }
}

const App = connect(
  (state) => state,
  (dispatch) => {
    return {
      bootstrap: () => dispatch(fetchClasses()),
    };
  }
)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
