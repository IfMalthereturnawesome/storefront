"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _orderPlaced = _interopRequireDefault(require("../../../react-email-starter/emails/order-placed"));
var OrderPlacedEmail = function OrderPlacedEmail(_ref) {
  var customerName = _ref.customerName,
    orderNumber = _ref.orderNumber;
  return /*#__PURE__*/_react["default"].createElement(_orderPlaced["default"], {
    customerName: customerName,
    orderNumber: orderNumber
  });
};
var _default = exports["default"] = OrderPlacedEmail;
