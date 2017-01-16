import React, {PropTypes} from "react";

import {
  defaultFieldValue,
  getWidget,
  getUiOptions,
  optionsList,
  getDefaultRegistry
} from "../../utils";

function StringField(props) {
  const {
    schema,
    name,
    uiSchema,
    idSchema,
    formData,
    required,
    disabled,
    readonly,
    autofocus,
    registry,
    onChange
  } = props;
  const {title, format} = schema;
  const {widgets, formContext} = registry;
  const defaultWidget = format || (enumOptions ? "select" : "text");
  const {widget=defaultWidget, placeholder="", ...options} = getUiOptions(uiSchema);
  const Widget = getWidget(schema, widget, widgets);
  let enumOptions;

  const schemaEnumIsArray = Array.isArray(schema.enum);

  const isContainsNotSpecifiedOption = schemaEnumIsArray && schema.enum.indexOf("") > -1 ? true : false;

  // Otherwise, if the widget to be used is a radio button group, null is an option, so
  // include it as the right-most (or bottom-most) option...
  if (widget === "radio") {
    if (schemaEnumIsArray && !isContainsNotSpecifiedOption) {
      schema.enum.push("");
      schema.enumNames.push("(Not Specified)");
    }

    enumOptions = schemaEnumIsArray && optionsList({
      enum: schema.enum,
      enumNames: schema.enumNames
    });
  }
  // Otherwise, if the widget to be used is a select input, null is an option, so include
  // it as the first option...
  else if (widget === "select") {
    if (schemaEnumIsArray && !isContainsNotSpecifiedOption) {
      schema.enum.unshift("");
      schema.enumNames.unshift("Select " + schema.title + " ...");
    }

    enumOptions = schemaEnumIsArray && optionsList({
      enum: schema.enum,
      enumNames: schema.enumNames
    });
  }
  // Otherwise, if the widget to be used as a string field
  else {
    enumOptions = schemaEnumIsArray && optionsList(schema);
  }

  return <Widget
    options={{...options, enumOptions}}
    schema={schema}
    id={idSchema && idSchema.$id}
    label={title === undefined ? name : title}
    value={defaultFieldValue(formData, schema)}
    onChange={(value) => onChange(value ? value : null)}
    required={required}
    disabled={disabled}
    readonly={readonly}
    formContext={formContext}
    autofocus={autofocus}
    registry={registry}
    placeholder={placeholder}/>;
}

if (process.env.NODE_ENV !== "production") {
  StringField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object.isRequired,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
      ])).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    }),
    formContext: PropTypes.object.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
  };
}

StringField.defaultProps = {
  uiSchema: {},
  registry: getDefaultRegistry(),
  disabled: false,
  readonly: false,
  autofocus: false,
};

export default StringField;
