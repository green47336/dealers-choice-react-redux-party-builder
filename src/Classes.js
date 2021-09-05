import React from "react";
import { create } from "./store";
import { connect } from "react-redux";

const _Classes = ({ classes }) => {
  return (
    <div>
      <ul>
        {classes.map((currentClass) => {
          return <li key={currentClass.name}>{currentClass.name}</li>;
        })}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   create: () => dispatch(create()),
  };
};

const Classes = connect((state) => state, mapDispatchToProps)(_Classes);

export default Classes;
