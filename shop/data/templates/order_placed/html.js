"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _renderEmail = require("shop-storefront/src/emails/renderEmail.js");
var OrderPlacedTemplate = function OrderPlacedTemplate(_ref) {
  var customerName = _ref.customerName;
  return (0, _renderEmail.getWelcomeEmailHtml)(customerName);
};
var _default = exports["default"] = OrderPlacedTemplate;
