'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentEditable = function (_React$Component) {
  _inherits(ContentEditable, _React$Component);

  function ContentEditable(props) {
    _classCallCheck(this, ContentEditable);

    var _this = _possibleConstructorReturn(this, (ContentEditable.__proto__ || Object.getPrototypeOf(ContentEditable)).call(this, props));

    _this.emitChange = function (event) {
      if (!_this.el) return;
      var text = _this.el.textContent;
      if (_this.props.onChange && text !== _this.lastText) {
        _this.props.onChange(text);
      }
      _this.lastText = text;
      _this.updateFakeEl(text);
    };

    _this.updateFakeEl = function (text) {
      _this.fakeEl.innerHTML = _this.props.format ? _this.props.format(text) : text;
    };

    _this.registerRef = function (el) {
      _this.el = el;
    };

    _this.registerFakeRef = function (el) {
      _this.fakeEl = el;
    };

    _this.createMarkup = function () {
      return { __html: _this.props.value };
    };

    _this.onKeyDown = function (evt) {
      if (evt.which === 13) {
        evt.preventDefault();
        _this.props.onSubmit && _this.props.onSubmit(_this.props.value);
      }
    };

    return _this;
  }

  _createClass(ContentEditable, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.el && this.props.value !== this.el.textContent) {
        this.el.textContent = this.props.value;
      }
      this.updateFakeEl(this.el.textContent);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFakeEl(this.el.textContent);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // We need not rerender if the change of props simply reflects the user's
      // edits. Rerendering in this case would make the cursor/caret jump.
      return (
        // Rerender if there is no element yet... (somehow?)
        !this.el
        // ...or if html really changed... (programmatically, not by user edit)
        || nextProps.value !== this.el.textContent && nextProps.value !== this.props.value
        // ...or if editing is enabled or disabled.
        || this.props.disabled !== nextProps.disabled
        // ...or if className changed
        || this.props.className !== nextProps.className
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          format = _props.format,
          value = _props.value,
          rest = _objectWithoutProperties(_props, ['format', 'value']);

      return _react2.default.createElement(
        'div',
        { className: 'ContentEditableWrapper' },
        _react2.default.createElement('div', _extends({}, rest, {
          ref: this.registerRef,
          contentEditable: true,
          onInput: this.emitChange,
          dangerouslySetInnerHTML: this.createMarkup(),
          onKeyDown: this.onKeyDown,
          className: 'ContentEditable-Input'
        })),
        _react2.default.createElement('div', {
          ref: this.registerFakeRef,
          contentEditable: true,
          readOnly: true,
          className: 'ContentEditable-Fake'
        })
      );
    }
  }]);

  return ContentEditable;
}(_react2.default.Component);

ContentEditable.defaultProps = {
  format: null,
  onChange: null,
  onSubmit: null
};
exports.default = ContentEditable;