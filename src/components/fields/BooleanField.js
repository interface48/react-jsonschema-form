import React, { PropTypes } from "react";

import {
  defaultFieldValue,
  getWidget,
  getUiOptions,
  optionsList,
  getDefaultRegistry
} from "../../utils";

function BooleanField(props) {
  const {
    schema,
    name,
    uiSchema,
    idSchema,
    formData,
    registry,
    required,
    disabled,
    readonly,
    autofocus,
    onChange
  } = props;
  const {title} = schema;
  const {widgets, formContext} = registry;
  const {widget = "radio", ...options} = getUiOptions(uiSchema);
  const Widget = getWidget(schema, widget, widgets);
  let enumOptions;

  // Otherwise, if the widget to be used is a radio button group, null is an option, so
  // include it as the right-most (or bottom-most) option...
  if (widget === "radio") {
    enumOptions = optionsList({
      enum: [true, false, ""],
      enumNames: schema.enumNames || ["Yes", "No", "(Not Specified)"]
    });
  }
  // Otherwise, if the widget to be used is a select input, null is an option, so include
  // it as the first option...
  else if (widget === "select") {
    enumOptions = optionsList({
      enum: ["", true, false],
      enumNames: schema.enumNames || ["Select...", "Yes", "No",]
    });
  }
  // Otherwise, if the widget to be used is a checkbox or some other field, the value can 
  // assume the value can only be true or false, and null (i.e. not specified) is not an option...
  else {
    enumOptions = optionsList({
      enum: [true, false],
      enumNames: schema.enumNames || ["Yes", "No"]
    });
  }
  return <Widget
    options={{ ...options, enumOptions }}
    schema={schema}
    id={idSchema && idSchema.$id}
    onChange={(value) => onChange((typeof value !== "boolean") ? null : value)}
    label={title === undefined ? name : title}
    value={defaultFieldValue(formData, schema)}
    required={required}
    disabled={disabled}
    readonly={readonly}
    registry={registry}
    formContext={formContext}
    autofocus={autofocus} />;
}

if (process.env.NODE_ENV !== "production") {
  BooleanField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
      ])).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    })
  };
}

BooleanField.defaultProps = {
  uiSchema: {},
  registry: getDefaultRegistry(),
  disabled: false,
  readonly: false,
  autofocus: false,
};

export default BooleanField;
