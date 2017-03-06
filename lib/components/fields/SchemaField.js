"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRenderHtml = require("react-render-html");

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

var _utils = require("../../utils");

var _UnsupportedField = require("./UnsupportedField");

var _UnsupportedField2 = _interopRequireDefault(_UnsupportedField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var OPTIONAL_FIELD_SYMBOL = "(Optional)";
var COMPONENT_TYPES = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField"
};

function getFieldComponent(schema, uiSchema, fields) {
  var field = uiSchema["ui:field"];
  if (typeof field === "function") {
    return field;
  }
  if (typeof field === "string" && field in fields) {
    return fields[field];
  }
  var componentName = COMPONENT_TYPES[schema.type];
  return componentName in fields ? fields[componentName] : _UnsupportedField2.default;
}

function Label(props) {
  var label = props.label,
      required = props.required,
      id = props.id;

  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return _react2.default.createElement("div", null);
  }
  return _react2.default.createElement(
    "label",
    { className: "control-label", htmlFor: id },
    label,
    required ? null : _react2.default.createElement(
      "i",
      null,
      " ",
      OPTIONAL_FIELD_SYMBOL
    )
  );
}

function Help(props) {
  var fieldId = props.fieldId,
      help = props.help;

  if (!help) {
    // See #312: Ensure compatibility with old versions of React.
    return _react2.default.createElement("div", null);
  }
  if (typeof help === "string") {
    return _react2.default.createElement(
      "div",
      { id: fieldId + "-help", className: "help-block" },
      (0, _reactRenderHtml2.default)(help)
    );
  }
  return _react2.default.createElement(
    "div",
    { id: fieldId + "-help", className: "help-block" },
    help
  );
}

function ErrorList(props) {
  var fieldId = props.fieldId,
      _props$errors = props.errors,
      errors = _props$errors === undefined ? [] : _props$errors;

  if (errors.length === 0) {
    return _react2.default.createElement("div", null);
  } else if (errors.length === 1) {
    return _react2.default.createElement(
      "div",
      { id: fieldId + "-error", className: "text-danger" },
      (0, _reactRenderHtml2.default)("<i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i>&nbsp;" + errors[0])
    );
  }
  return _react2.default.createElement(
    "div",
    { id: fieldId + "-error", className: "text-danger" },
    _react2.default.createElement("i", { className: "fa fa-exclamation-triangle", "aria-hidden": "true" }),
    "\xA0The following errors exist:",
    _react2.default.createElement(
      "ul",
      { className: "error-detail bs-callout bs-callout-info" },
      errors.map(function (error, index) {
        return _react2.default.createElement(
          "li",
          { className: "text-danger", key: index },
          (0, _reactRenderHtml2.default)(error)
        );
      })
    )
  );
}

function DefaultTemplate(props) {
  var id = props.id,
      classNames = props.classNames,
      label = props.label,
      children = props.children,
      errors = props.errors,
      help = props.help,
      description = props.description,
      hidden = props.hidden,
      required = props.required,
      displayLabel = props.displayLabel,
      displayDescription = props.displayDescription;

  if (hidden) {
    return children;
  }

  return _react2.default.createElement(
    "div",
    { className: classNames },
    displayLabel ? _react2.default.createElement(Label, { label: label, required: required, id: id }) : null,
    displayDescription && description ? description : null,
    children,
    errors,
    help
  );
}

if (process.env.NODE_ENV !== "production") {
  DefaultTemplate.propTypes = {
    id: _react.PropTypes.string,
    classNames: _react.PropTypes.string,
    label: _react.PropTypes.string,
    children: _react.PropTypes.node.isRequired,
    errors: _react.PropTypes.element,
    rawErrors: _react.PropTypes.arrayOf(_react.PropTypes.string),
    help: _react.PropTypes.element,
    rawHelp: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    description: _react.PropTypes.element,
    rawDescription: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    hidden: _react.PropTypes.bool,
    required: _react.PropTypes.bool,
    readonly: _react.PropTypes.bool,
    displayLabel: _react.PropTypes.bool,
    displayDescription: _react.PropTypes.bool,
    fields: _react.PropTypes.object,
    formContext: _react.PropTypes.object
  };
}

DefaultTemplate.defaultProps = {
  hidden: false,
  readonly: false,
  required: false,
  displayLabel: true,
  displayDescription: true
};

function SchemaField(props) {
  var uiSchema = props.uiSchema,
      errorSchema = props.errorSchema,
      idSchema = props.idSchema,
      name = props.name,
      required = props.required,
      registry = props.registry;
  var definitions = registry.definitions,
      fields = registry.fields,
      formContext = registry.formContext,
      _registry$FieldTempla = registry.FieldTemplate,
      FieldTemplate = _registry$FieldTempla === undefined ? DefaultTemplate : _registry$FieldTempla;

  var schema = (0, _utils.retrieveSchema)(props.schema, definitions);
  var FieldComponent = getFieldComponent(schema, uiSchema, fields);
  var DescriptionField = fields.DescriptionField;

  var disabled = Boolean(props.disabled || uiSchema["ui:disabled"]);
  var readonly = Boolean(props.readonly || uiSchema["ui:readonly"]);
  var autofocus = Boolean(props.autofocus || uiSchema["ui:autofocus"]);

  var __errors = errorSchema.__errors,
      fieldErrorSchema = _objectWithoutProperties(errorSchema, ["__errors"]);

  var errors = __errors;
  var help = uiSchema["ui:help"];

  // Build-out the aria-described-by attribute for accessibility, depending on whether or
  // not errors and/or help is displayed
  var ariaDescribedByFields = [];
  if (errors && errors.length > 0) {
    ariaDescribedByFields.push(idSchema.$id + "-error");
  }
  if (help) {
    ariaDescribedByFields.push(idSchema.$id + "-help");
  }
  var ariaDescribedBy = ariaDescribedByFields.length ? ariaDescribedByFields.join(" ") : null;

  if (Object.keys(schema).length === 0) {
    // See #312: Ensure compatibility with old versions of React.
    return _react2.default.createElement("div", null);
  }

  var displayLabel = true;
  var displayDescription = true;
  if (schema.type === "array") {
    displayLabel = (0, _utils.isMultiSelect)(schema) || (0, _utils.isFilesArray)(schema, uiSchema);
    displayDescription = (0, _utils.isMultiSelect)(schema) || (0, _utils.isFilesArray)(schema, uiSchema);
  } else if (schema.type === "object") {
    displayLabel = false;
    displayDescription = false;
  }
  // Suppress display of fields labels for checkbox and consent widgets, since they are
  // already included within the checkbox label...
  else if (schema.type === "boolean" && uiSchema["ui:widget"] === "checkbox") {
      displayLabel = false;
      displayDescription = false;
    } else if (schema.type === "boolean" && uiSchema["ui:widget"] === "consent") {
      displayLabel = false;
      displayDescription = true;
    } else if (uiSchema["ui:field"]) {
      displayLabel = false;
      displayDescription = false;
    } else if (uiSchema["ui:hideLabel"]) {
      displayLabel = false;
      displayDescription = false;
    }

  var field = _react2.default.createElement(FieldComponent, _extends({}, props, {
    schema: schema,
    disabled: disabled,
    readonly: readonly,
    autofocus: autofocus,
    ariaDescribedBy: ariaDescribedBy,
    errorSchema: fieldErrorSchema,
    formContext: formContext }));

  var type = schema.type;

  var id = idSchema.$id;
  var label = props.schema.title || schema.title || name;
  var description = props.schema.description || schema.description;
  var hidden = uiSchema["ui:widget"] === "hidden";
  var classNames = ["form-group", "field", "field-" + type, errors && errors.length > 0 ? "field-error has-error" : "", uiSchema.classNames].join(" ").trim();
  var descriptionField = _react2.default.createElement(DescriptionField, { id: id + "__description",
    description: description,
    formContext: formContext,
    isScrollable: uiSchema["ui:widget"] === "consent" });

  var fieldProps = {
    description: descriptionField,
    rawDescription: description,
    help: _react2.default.createElement(Help, { fieldId: id, help: help }),
    rawHelp: typeof help === "string" ? help : undefined,
    errors: _react2.default.createElement(ErrorList, { fieldId: id, errors: errors }),
    rawErrors: errors,
    id: id,
    label: label,
    hidden: hidden,
    required: schema.format === "display" || required,
    readonly: readonly,
    displayLabel: displayLabel,
    displayDescription: displayDescription,
    classNames: classNames,
    formContext: formContext,
    fields: fields,
    schema: schema,
    uiSchema: uiSchema
  };

  return _react2.default.createElement(
    FieldTemplate,
    fieldProps,
    field
  );
}

SchemaField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: (0, _utils.getDefaultRegistry)(),
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SchemaField.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    uiSchema: _react.PropTypes.object,
    idSchema: _react.PropTypes.object,
    formData: _react.PropTypes.any,
    errorSchema: _react.PropTypes.object,
    registry: _react.PropTypes.shape({
      widgets: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object])).isRequired,
      fields: _react.PropTypes.objectOf(_react.PropTypes.func).isRequired,
      definitions: _react.PropTypes.object.isRequired,
      FieldTemplate: _react.PropTypes.func,
      formContext: _react.PropTypes.object.isRequired
    }),
    disabled: _react.PropTypes.bool,
    readonly: _react.PropTypes.bool,
    autofocus: _react.PropTypes.bool,
    ariaDescribedBy: _react.PropTypes.string
  };
}

exports.default = SchemaField;