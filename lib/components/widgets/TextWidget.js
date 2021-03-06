"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _EPBCBaseInput = require("./EPBCBaseInput");

var _EPBCBaseInput2 = _interopRequireDefault(_EPBCBaseInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextWidget(props) {
  return _react2.default.createElement(_EPBCBaseInput2.default, props);
}

if (process.env.NODE_ENV !== "production") {
  TextWidget.propTypes = {
    value: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxLength: _react.PropTypes.number,
    ariaDescribedBy: _react.PropTypes.string
  };
}

exports.default = TextWidget;