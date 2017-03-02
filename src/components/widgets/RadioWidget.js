import React, {PropTypes} from "react";

function RadioWidget({
  schema,
  options,
  value,
  required,
  disabled,
  autofocus,
  ariaDescribedBy,
  onChange
}) {
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const {enumOptions, inline} = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <div className="field-radio-group">{
      enumOptions.map((option, i) => {
        const checked = option.value === (value == null ? "" : value);
        const disabledCls = disabled ? "disabled" : "";
        const radioInput = (
          <input type="radio"
            checked={checked}
            name={name}
            value={option.value}
            disabled={disabled}
            autoFocus={autofocus && i === 0}
            aria-describedby={ariaDescribedBy}
            onChange={_ => onChange(option.value)}/>
        );
        const radioOptionLabel = option.label;

        return inline ? (
          <label key={i} className={`radio-inline ${disabledCls}`}>
            {radioInput}
            {radioOptionLabel}
          </label>
        ) : (
          <div key={i} className={`radio ${disabledCls}`}>
            <label>
              {radioInput}
              {radioOptionLabel}
            </label>
          </div>
        );
      })
    }</div>
  );
}

RadioWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    autofocus: PropTypes.bool,
    ariaDescribedBy: PropTypes.string,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;
