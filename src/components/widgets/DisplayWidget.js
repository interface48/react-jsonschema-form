import React, { PropTypes } from "react";

function DisplayWidget(props) {
  const {id, value, schema} = props;

  return (
    <p id={id} className="form-control-static">{value}</p>
  );
}

export default DisplayWidget;