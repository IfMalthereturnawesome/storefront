"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var OrderPlacedTemplate = function OrderPlacedTemplate(_ref) {
  var customerName = _ref.customerName,
    orderNumber = _ref.orderNumber;
  return /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Thank you for your order, ", customerName, "!"), /*#__PURE__*/_react["default"].createElement("p", null, "Your order number is: ", orderNumber), /*#__PURE__*/_react["default"].createElement("p", null, "We'll notify you once it's shipped.")))));
};
var _default = exports["default"] = OrderPlacedTemplate;
