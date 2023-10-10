"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
var _components = require("@react-email/components");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var baseUrl = process.env.VERCEL_URL ? "https://".concat(process.env.VERCEL_URL) : '';
var OrderPlacedTemplate = function OrderPlacedTemplate(_ref) {
  var customer = _ref.customer,
    display_id = _ref.display_id;
  return /*#__PURE__*/React.createElement(_components.Html, null, /*#__PURE__*/React.createElement(_components.Head, null, /*#__PURE__*/React.createElement("title", null, "Order Received")), /*#__PURE__*/React.createElement(_components.Preview, null, "Thank you for your order ", customer.first_name, " ", customer.last_name), /*#__PURE__*/React.createElement(_components.Body, {
    style: main
  }, /*#__PURE__*/React.createElement(_components.Container, {
    style: container
  }, /*#__PURE__*/React.createElement(_components.Img, {
    src: "".concat(baseUrl, "/static/eight-athletics-black-logo.png"),
    width: "103",
    height: "28",
    alt: "Eight Atlhetics Logo",
    style: logo
  }), /*#__PURE__*/React.createElement(_components.Text, {
    style: header
  }, "Order Confirmation"), /*#__PURE__*/React.createElement(_components.Text, {
    style: paragraph
  }, "Hi ", customer.first_name, " ", customer.last_name, ","), /*#__PURE__*/React.createElement(_components.Text, {
    style: paragraph
  }, "Thank you for your order! We've received your order #", display_id, " and will begin processing it shortly."), /*#__PURE__*/React.createElement(_components.Hr, {
    style: hr
  }), /*#__PURE__*/React.createElement(_components.Section, {
    style: orderSummary
  }, /*#__PURE__*/React.createElement(_components.Text, {
    style: summaryHeader
  }, "Order Summary:"), /*#__PURE__*/React.createElement(_components.Text, {
    style: paragraph
  }, "Order Number: ", display_id)), /*#__PURE__*/React.createElement(_components.Button, {
    pX: 12,
    pY: 12,
    style: button,
    href: "https://www.eightathletics.com"
  }, "Visit our website"), /*#__PURE__*/React.createElement(_components.Hr, {
    style: hr
  }), /*#__PURE__*/React.createElement(_components.Text, {
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
