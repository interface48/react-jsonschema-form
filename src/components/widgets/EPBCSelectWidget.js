import React, {PropTypes} from "react";

import {asNumber} from "../../utils";


/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue({type, items}, value) {
  if (type === "array" && items && ["number", "integer"].includes(items.type)) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }
  return value;
}

function SelectWidget({
  schema,
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  multiple,
  autofocus,
  onChange,
  onBlur
}) {
  const {enumOptions} = options;
  return (
    <select
      id={id}
      multiple={multiple}
      className="form-control"
      value={value}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      onBlur={onBlur ? onBlur : (event) => {
        let newValue;
        if (multiple) {
          newValue = [].filter.call(
            event.target.options, o => o.selected).map(o => o.value);
          
          if (required && newValue.length === 0) {
            onChange(undefined);
          } else {
            onChange(processValue(schema, newValue))
          }
        } else {
          newValue = event.target.value;

          if (required 
            && ((["number", "integer"].includes(schema.type) && asNumber(newValue) === 0) || newValue === "")) {
            onChange(undefined);
          } else {
            onChange(processValue(schema, newValue));
          }
        }

      }}
      onChange={(event) => {
        let newValue;
        if (multiple) {
          newValue = [].filter.call(
            event.target.options, o => o.selected).map(o => o.value);
        } else {
          newValue = event.target.value;
        }
        onChange(processValue(schema, newValue));
      }}>{
      enumOptions.map(({value, label}, i) => {
        return <option key={i} value={value}>{label}</option>;
      })
    }</select>
  );
}

SelectWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };
}

export default SelectWidget;