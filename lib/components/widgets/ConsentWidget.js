"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConsentWidget(_ref) {
  var schema = _ref.schema,
      id = _ref.id,
      value = _ref.value,
      disabled = _ref.disabled,
      label = _ref.label,
      autofocus = _ref.autofocus,
      ariaDescribedBy = _ref.ariaDescribedBy,
      _onChange = _ref.onChange;

  return _react2.default.createElement(
    "div",
    { className: "checkbox " + (disabled ? "disabled" : "") },
    _react2.default.createElement(
      "label",
      null,
      _react2.default.createElement("input", { type: "checkbox",
        id: id,
        checked: value,
        disabled: disabled,
        autoFocus: autofocus,
        "aria-describedby": ariaDescribedBy,
        onChange: function onChange(event) {
          return _onChange(event.target.checked || null);
        } }),
      _react2.default.createElement(
        "span",
        null,
        label
      )
    )
  );
}

ConsentWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  ConsentWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    value: _react.PropTypes.bool,
    required: _react.PropTypes.bool,
    autofocus: _react.PropTypes.bool,
    ariaDescribedBy: _react.PropTypes.string,
    onChange: _react.PropTypes.func
  };
}

exports.default = ConsentWidget;