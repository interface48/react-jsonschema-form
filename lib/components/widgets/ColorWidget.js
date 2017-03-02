"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _EPBCBaseInput = require("./EPBCBaseInput");

var _EPBCBaseInput2 = _interopRequireDefault(_EPBCBaseInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColorWidget(props) {
  return _react2.default.createElement(_EPBCBaseInput2.default, _extends({ type: "color" }, props));
}

if (process.env.NODE_ENV !== "production") {
  ColorWidget.propTypes = {
    value: _react.PropTypes.string,
    ariaDescribedBy: _react.PropTypes.string
  };
}

exports.default = ColorWidget;