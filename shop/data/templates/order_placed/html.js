"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _components = require("@react-email/components");
var OrderPlacedTemplate = function OrderPlacedTemplate(_ref) {
  var customerName = _ref.customerName,
    orderNumber = _ref.orderNumber;
  return /*#__PURE__*/_react["default"].createElement(_components.Html, null, /*#__PURE__*/_react["default"].createElement(_components.Head, null, /*#__PURE__*/_react["default"].createElement("title", null, "Order Received")), /*#__PURE__*/_react["default"].createElement(_components.Preview, null, "We have received your order: ", orderNumber, "."), /*#__PURE__*/_react["default"].createElement(_components.Body, {
    style: main
  }, /*#__PURE__*/_react["default"].createElement(_components.Container, {
    style: container
  }, /*#__PURE__*/_react["default"].createElement(_components.Img, {
    src: "https://eightathletics.com/public/Eight-Athletics-black-logo.svg",
    width: "170",
    height: "50",
    alt: "Eight Athletics",
    style: logo
  }), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: header
  }, "Order Confirmation"), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: paragraph
  }, "Hi ", customerName, ","), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: paragraph
  }, "Thank you for your order! We've received your order #", orderNumber, " and will begin processing it shortly."), /*#__PURE__*/_react["default"].createElement(_components.Hr, {
    style: hr
  }), /*#__PURE__*/_react["default"].createElement(_components.Section, {
    style: orderSummary
  }, /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: summaryHeader
  }, "Order Summary:"), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: paragraph
  }, "Order Number: ", orderNumber)), /*#__PURE__*/_react["default"].createElement(_components.Button, {
    pX: 12,
    pY: 12,
    style: button,
    href: "https://eightathletics.com"
  }, "Visit our website"), /*#__PURE__*/_react["default"].createElement(_components.Hr, {
    style: hr
  }), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: footer
  }, "Eight Athletics | Sofiegade 5, Copenhagen K, Denmark"))));
};
var _default = exports["default"] = OrderPlacedTemplate;
var main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};
var container = {
  margin: '0 auto',
  padding: '20px 0 48px'
};
var logo = {
  margin: '0 auto'
};
var header = {
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center'
};
var paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px'
};
var hr = {
  borderColor: '#cccccc',
  margin: '20px 0'
};
var orderSummary = {
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '4px'
};
var summaryHeader = {
  fontWeight: 'bold',
  marginBottom: '8px'
};
var button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  margin: '0 auto 20px',
  width: '200px'
};
var footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center'
};
