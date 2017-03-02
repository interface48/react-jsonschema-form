import React, { PropTypes } from "react";

function DisplayWidget(props) {
  const {id, value, schema} = props;

  return value ? <p id={id} className="form-control-static">{value}</p> : null;
}

export default DisplayWidget;