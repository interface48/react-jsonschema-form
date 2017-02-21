import React, {PropTypes} from "react";


function ConsentWidget({
  schema,
  id,
  value,
  disabled,
  label,
  autofocus,
  ariaDescribedByFields,
  onChange,
}) {
  return (
    <div className={`checkbox ${disabled ? "disabled" : ""}`}>
      <label>
        <input type="checkbox"
          id={id}
          checked={value}
          disabled={disabled}
          autoFocus={autofocus}
          aria-describedby={ariaDescribedByFields}
          onChange={(event) => onChange(event.target.checked || null)}/>
        <span>{label}</span>
      </label>
    </div>
  );
}

ConsentWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  ConsentWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    autofocus: PropTypes.bool,
    ariaDescribedByFields: PropTypes.string,
    onChange: PropTypes.func,
  };
}

export default ConsentWidget;
