"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _components = require("@react-email/components");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var baseUrl = 'https://www.eightathletics.com';
var OrderRefundCreatedTemplate = function OrderRefundCreatedTemplate(_ref) {
  var refund = _ref.refund,
    items = _ref.items,
    display_id = _ref.display_id,
    total = _ref.total;
  return /*#__PURE__*/React.createElement(_components.Html, null, /*#__PURE__*/React.createElement(_components.Tailwind, {
    config: {
      theme: {
        screens: {
          sm: {
            max: '600px'
          },
          xs: {
            max: '425px'
          }
        },
        extend: {
          colors: {
            mask: {
              black: '#030203'
            },
            custom: {
              white: '#faf7f7'
            }
          },
          spacing: {
            full: '100%',
            px: '1px',
            0: '0',
            2: '8px'
          }
        }
      }
    }
  }, /*#__PURE__*/React.createElement(_components.Head, null), /*#__PURE__*/React.createElement(_components.Preview, null, "Refund Confirmation for Order # ", display_id, " - ", items[0].title, ": ", items[0].description, items.length > 1 ? ' and more' : ''), /*#__PURE__*/React.createElement(_components.Body, {
    style: main,
    className: "bg-white text-mask-black "
  }, /*#__PURE__*/React.createElement(_components.Container, {
    style: container
  }, /*#__PURE__*/React.createElement(_components.Section, {
    style: track.container
  }, /*#__PURE__*/React.createElement(_components.Row, null, /*#__PURE__*/React.createElement(_components.Column, null, /*#__PURE__*/React.createElement(_components.Text, {
    style: global.paragraphWithBold
  }, "Refund Number"), /*#__PURE__*/React.createElement(_components.Text, {
    style: track.number
  }, refund.id), /*#__PURE__*/React.createElement(_components.Text, {
    className: "text-sm "
  }, "Amount refunded: ", refund.amount, " ", refund.reason !== "discount" ? "due to ".concat(refund.reason) : "")))), /*#__PURE__*/React.createElement(_components.Hr, {
    style: global.hr
  }), /*#__PURE__*/React.createElement(_components.Section, {
    style: message
  }, /*#__PURE__*/React.createElement(_components.Img, {
    src: "".concat(baseUrl, "/images/eight-athletics-black-logo.png"),
    width: "103",
    height: "28",
    alt: "Eight Athletics Logo",
    style: {
      margin: 'auto'
    }
  }), /*#__PURE__*/React.createElement(_components.Heading, {
    style: global.heading
  }, "Refund Confirmation"), /*#__PURE__*/React.createElement(_components.Text, {
    style: global.text
  }, "We regret the inconvenience. We've processed a refund for your order #", display_id, ".", refund.note && " Note: ".concat(refund.note), "  ", total > 0 && "Your new total is ".concat(total)), /*#__PURE__*/React.createElement(_components.Text, {
    style: global.text
  }, "If you have any questions, please contact us at", /*#__PURE__*/React.createElement(_components.Link, {
    href: "mailto:support@eightathletics.com",
    style: global.text
  }, "support@eightathletics.com"))), /*#__PURE__*/React.createElement(_components.Hr, {
    style: global.hr
  }), /*#__PURE__*/React.createElement(_components.Section, {
    style: paddingY
  }, /*#__PURE__*/React.createElement(_components.Link, {
    style: global.button,
    href: "https://www.eightathletics.com",
    className: "mx-auto"
  }, "Visit our website")), /*#__PURE__*/React.createElement(_components.Hr, {
    style: global.hr
  }), /*#__PURE__*/React.createElement(_components.Section, {
    style: menu.container
  }, /*#__PURE__*/React.createElement(_components.Text, {
    style: menu.title
  }, "Get Help"), /*#__PURE__*/React.createElement(_components.Row, {
    style: menu.content
  }, /*#__PURE__*/React.createElement(_components.Column, {
    style: {
      width: '33%'
    },
    colSpan: 1
  }), /*#__PURE__*/React.createElement(_components.Column, {
    style: {
      width: '33%'
    },
    colSpan: 1
  }, /*#__PURE__*/React.createElement(_components.Link, {
    href: "".concat(baseUrl, "/terms/shipping-policy"),
    style: menu.text
  }, "Shipping & Delivery")), /*#__PURE__*/React.createElement(_components.Column, {
    style: {
      width: '33%'
    },
    colSpan: 1
  }, /*#__PURE__*/React.createElement(_components.Link, {
    href: "".concat(baseUrl, "/terms/returns-policy"),
    style: menu.text
  }, "Returns & Exchanges")))), /*#__PURE__*/React.createElement(_components.Hr, {
    style: global.hr
  }), /*#__PURE__*/React.createElement(_components.Section, {
    style: paddingY
  }, /*#__PURE__*/React.createElement(_components.Text, {
    style: footer.text
  }, "Eight Athletics | Sofiegade 5, Copenhagen K, Denmark"))))));
};
var _default = exports["default"] = OrderRefundCreatedTemplate;
var paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px'
};
var paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px'
};
var paragraph = {
  margin: '0',
  lineHeight: '2'
};
var global = {
  paddingX: paddingX,
  paddingY: paddingY,
  defaultPadding: _objectSpread(_objectSpread({}, paddingX), paddingY),
  paragraphWithBold: _objectSpread(_objectSpread({}, paragraph), {}, {
    fontWeight: 'bold'
  }),
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px',
    color: '#000'
  },
  text: _objectSpread(_objectSpread({}, paragraph), {}, {
    color: '#747474',
    fontWeight: '500'
  }),
  button: {
    border: '1px solid #929292',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 0px',
    width: '220px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 500,
    color: '#000'
  },
  hr: {
    borderColor: '#E5E5E5',
    margin: '0'
  }
};
var main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};
var container = {
  margin: '10px auto',
  width: '600px',
  border: '1px solid #E5E5E5'
};
var track = {
  container: {
    padding: '22px 40px',
    backgroundColor: '#F7F7F7'
  },
  number: {
    margin: '12px 0 0 0',
    fontWeight: 500,
    lineHeight: '1.4',
    color: '#6F6F6F',
    textTransform: 'uppercase'
  }
};
var message = {
  padding: '40px 74px',
  textAlign: 'center'
};
var adressTitle = _objectSpread(_objectSpread({}, paragraph), {}, {
  fontSize: '15px',
  fontWeight: 'bold'
});
var menu = {
  container: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
    backgroundColor: '#F7F7F7'
  },
  content: _objectSpread(_objectSpread({}, paddingY), {}, {
    paddingLeft: '20px',
    paddingRight: '20px'
  }),
  title: {
    paddingLeft: '20px',
    paddingRight: '20px',
    fontWeight: 'bold'
  },
  text: {
    fontSize: '13.5px',
    marginTop: 0,
    fontWeight: 500,
    color: '#000'
  },
  tel: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '32px',
    paddingBottom: '22px'
  }
};
var footer = {
  policy: {
    width: '166px',
    margin: 'auto'
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center'
  }
};
