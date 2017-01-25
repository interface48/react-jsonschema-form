import React, {PropTypes} from "react";

function ConsentDescriptionField(props) {
  const {id, description} = props;
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <div/>;
  }
  if (typeof description === "string") {
    // Set HTML-based description using dangerouslySetInnerHTML unless more performant option
    // becomes available
    if (description.length > 800) {
      return <div id={id} className="field-description field-description--scroll" dangerouslySetInnerHTML={{__html: description}}></div>;
    }
    else {
      return <div id={id} className="field-description" dangerouslySetInnerHTML={{__html: description}}></div>;
    }
  } else {
    return <div id={id} className="field-description">{description}</div>;
  }
}

if (process.env.NODE_ENV !== "production") {
  ConsentDescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ])
  };
}

export default ConsentDescriptionField;
