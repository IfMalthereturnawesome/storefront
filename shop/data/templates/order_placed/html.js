"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderEmail = require("shop-storefront/src/emails/renderEmail.js");
var OrderPlacedTemplate = function OrderPlacedTemplate(_ref) {
  var customerName = _ref.customerName,
    orderNumber = _ref.orderNumber;
  return (0, _renderEmail.getWelcomeEmailHtml)(customerName);
};
var _default = exports["default"] = OrderPlacedTemplate;
