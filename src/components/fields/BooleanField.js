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
    ariaDescribedByFields,
    onChange
  } = props;
  const {title} = schema;
  const {widgets, formContext} = registry;
  const {widget = "radio", ...options} = getUiOptions(uiSchema);
  const Widget = getWidget(schema, widget, widgets);
  let enumOptions;

  const isContainsNotSpecifiedOption = Array.isArray(schema.enum) && schema.enum.indexOf("") > -1 ? true : false;

  // Otherwise, if the widget to be used is a radio button group, null is an option, so
  // include it as the right-most (or bottom-most) option...
  if (widget === "radio"
    // WORKAROUND: Added RadioButtonGroup for Temporary fix
    || widget === "RadioButtonGroup") {
    if (schema.enum && !isContainsNotSpecifiedOption) {
      schema.enum.push("");
      schema.enumNames.push("(Not Specified)");
    }
    enumOptions = optionsList({
      enum: schema.enum || [true, false, ""],
      enumNames: schema.enumNames || ["Yes", "No", "(Not Specified)"]
    });
  }
  // Otherwise, if the widget to be used is a select input, null is an option, so include
  // it as the first option...
  else if (widget === "select") {
    if (schema.enum && !isContainsNotSpecifiedOption) {
      schema.enum.unshift("");
      schema.enumNames.unshift("Select " + schema.title + " ...");
    }
    enumOptions = optionsList({
      enum: schema.enum || ["", true, false],
      enumNames: schema.enumNames || ["Select " + schema.title + " ...", "Yes", "No"]
    });
  }
  
  return <Widget
    options={{ ...options, enumOptions }}
    schema={schema}
    id={idSchema && idSchema.$id}
    onChange={(value) => onChange((typeof value !== "boolean") ? null : value)}
    label={title === undefined ? name : title}
    // Ensure we resolve the consent field to a boolean value, since it is truly expecting
    // a boolean formData type (i.e. versus the other boolean widgets that support a 
    // Not Specified option that is represented by the empty string)
    value={defaultFieldValue(widget === "consent" ? !!formData : formData, schema)}
    required={required}
    disabled={disabled}
    readonly={readonly}
    registry={registry}
    formContext={formContext}
    autofocus={autofocus}
    ariaDescribedByFields={ariaDescribedByFields && ariaDescribedByFields.length ? ariaDescribedByFields.join(" ") : null} />;
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
    ariaDescribedByFields: PropTypes.arrayOf(PropTypes.string),
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
