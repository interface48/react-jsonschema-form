import React, {PropTypes} from "react";

import {
  defaultFieldValue,
  getWidget,
  getUiOptions,
  optionsList,
  getNotSpecifiedOption,
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
    ariaDescribedBy,
    registry,
    onChange
  } = props;
  const {title, format} = schema;
  const {widgets, formContext} = registry;
  let enumOptions = Array.isArray(schema.enum) && optionsList(schema);
  const defaultWidget = format || (enumOptions ? "select" : "text");
  const {widget=defaultWidget, placeholder="", ...options} = getUiOptions(uiSchema);
  const Widget = getWidget(schema, widget, widgets);

  // If this field consists of one or more options to be selected...
  if (enumOptions) {
    const notSpecifiedOption = getNotSpecifiedOption();
    // If this list of options does not yet have a default option, add one...
    if (enumOptions.findIndex(eo => eo.value === notSpecifiedOption.value) === -1) {
      // If this is a radio button group, then add the not specified option at the end...
      if (widget === "radio") {
        enumOptions.push(notSpecifiedOption);
      }
      // Otherwise, add the not specified option at the beginning (i.e. select)...
      else {
        enumOptions.unshift(notSpecifiedOption);
      }
    }
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
    ariaDescribedBy={ariaDescribedBy}
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
    ariaDescribedBy: PropTypes.string
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
