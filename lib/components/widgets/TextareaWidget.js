"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextareaWidget(_ref) {
  var schema = _ref.schema,
      id = _ref.id,
      placeholder = _ref.placeholder,
      value = _ref.value,
      required = _ref.required,
      disabled = _ref.disabled,
      readonly = _ref.readonly,
      autofocus = _ref.autofocus,
      ariaDescribedBy = _ref.ariaDescribedBy,
      _onChange = _ref.onChange;

  return _react2.default.createElement("textarea", {
    id: id,
    className: "form-control",
    value: typeof value === "undefined" ? "" : value,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    autoFocus: autofocus,
    "aria-describedby": ariaDescribedBy,
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    } });
}

TextareaWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  TextareaWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string,
    value: _react.PropTypes.string,
    required: _react.PropTypes.bool,
    autofocus: _react.PropTypes.bool,
    ariaDescribedBy: _react.PropTypes.string,
    onChange: _react.PropTypes.func
  };
}

exports.default = TextareaWidget;