import React, {PropTypes} from "react";

function CheckboxWidget({
  schema,
  id,
  value,
  disabled,
  label,
  autofocus,
  ariaDescribedBy,
  onChange,
}) {
  return (
    <div className={`checkbox ${disabled ? "disabled" : ""}`}>
      <label>
        <input type="checkbox"
          id={id}
          checked={value ? value : false}
          disabled={disabled}
          autoFocus={autofocus}
          onChange={(event) => onChange(event.target.checked)}
          aria-describedby={ariaDescribedBy}/>
        <span>{label}</span>
      </label>
    </div>
  );
}

CheckboxWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    autofocus: PropTypes.bool,
    ariaDescribedBy: PropTypes.string,
    onChange: PropTypes.func
  };
}

export default CheckboxWidget;
