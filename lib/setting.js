"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;

var Setting = function (_Component) {
    _inherits(Setting, _Component);

    function Setting(props) {
        _classCallCheck(this, Setting);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Setting).call(this, props));

        _this.state = { focus: Suggestion };
        return _this;
    }

    _createClass(Setting, [{
        key: "render",
        value: function render() {
            return _qiliApp.React.createElement(
                "div",
                null,
                _qiliApp.React.createElement(this.state.focus, null),
                _qiliApp.React.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
                    primary: "建议",
                    onSelect: this.onSelect.bind(this),
                    items: ["Back", "去评价", "建议", "更新", "关于"] })
            );
        }
    }, {
        key: "onSelect",
        value: function onSelect(cmd) {
            switch (cmd) {
                case '建议':
                    this.setState({ focus: Suggestion });
                    break;
                case '关于':
                    this.setState({ focus: About });
                    break;
                case '去评价':

                    break;
                case '更新':
                    this.setState({ focus: Update });
                    break;
            }
        }
    }]);

    return Setting;
}(_qiliApp.Component);

exports.default = Setting;

var Suggestion = function (_Component2) {
    _inherits(Suggestion, _Component2);

    function Suggestion() {
        _classCallCheck(this, Suggestion);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Suggestion).apply(this, arguments));
    }

    _createClass(Suggestion, [{
        key: "render",
        value: function render() {
            return _qiliApp.React.createElement(
                "div",
                null,
                _qiliApp.React.createElement(_materialUi.TextField, { fullWidth: true, ref: "suggestion",
                    floatingLabelText: "你的建议,我们的前进方向" })
            );
        }
    }]);

    return Suggestion;
}(_qiliApp.Component);

var About = function (_Component3) {
    _inherits(About, _Component3);

    function About() {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
    }

    _createClass(About, [{
        key: "render",
        value: function render() {
            return _qiliApp.React.createElement("div", null);
        }
    }]);

    return About;
}(_qiliApp.Component);

var Update = function (_Component4) {
    _inherits(Update, _Component4);

    function Update() {
        _classCallCheck(this, Update);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Update).apply(this, arguments));
    }

    _createClass(Update, [{
        key: "render",
        value: function render() {
            return _qiliApp.React.createElement("div", null);
        }
    }]);

    return Update;
}(_qiliApp.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0lBRUs7O0lBRWdCOzs7QUFDakIsYUFEaUIsT0FDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELFNBQ0M7OzJFQURELG9CQUVQLFFBRFE7O0FBRWQsY0FBSyxLQUFMLEdBQVcsRUFBQyxPQUFNLFVBQU4sRUFBWixDQUZjOztLQUFsQjs7aUJBRGlCOztpQ0FLVDtBQUNKLG1CQUNJOzs7Z0JBQ0ssa0NBQU0sTUFBTSxLQUFaLE9BREw7Z0JBRUkseUNBQUksVUFBSixJQUFlLFdBQVUsU0FBVjtBQUNYLDZCQUFRLElBQVI7QUFDQSw4QkFBVSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQVY7QUFDQSwyQkFBTyxDQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLElBQWhCLEVBQXVCLElBQXZCLEVBQTZCLElBQTdCLENBQVAsRUFISixDQUZKO2FBREosQ0FESTs7OztpQ0FZQyxLQUFJO0FBQ1Qsb0JBQU8sR0FBUDtBQUNBLHFCQUFLLElBQUw7QUFDSSx5QkFBSyxRQUFMLENBQWMsRUFBQyxPQUFNLFVBQU4sRUFBZixFQURKO0FBRUEsMEJBRkE7QUFEQSxxQkFJSyxJQUFMO0FBQ0kseUJBQUssUUFBTCxDQUFjLEVBQUMsT0FBTSxLQUFOLEVBQWYsRUFESjtBQUVBLDBCQUZBO0FBSkEscUJBT0ssS0FBTDs7QUFFQSwwQkFGQTtBQVBBLHFCQVVLLElBQUw7QUFDSSx5QkFBSyxRQUFMLENBQWMsRUFBQyxPQUFNLE1BQU4sRUFBZixFQURKO0FBRUEsMEJBRkE7QUFWQSxhQURTOzs7O1dBakJJOzs7OztJQW1DZjs7Ozs7Ozs7Ozs7aUNBQ007QUFDSixtQkFDSTs7O2dCQUNJLHNEQUFXLFdBQVcsSUFBWCxFQUFpQixLQUFJLFlBQUo7QUFDeEIsdUNBQWtCLGNBQWxCLEVBREosQ0FESjthQURKLENBREk7Ozs7V0FETjs7O0lBV0E7Ozs7Ozs7Ozs7O2lDQUNNO0FBQ0osbUJBQ0kseUNBREosQ0FESTs7OztXQUROOzs7SUFVQTs7Ozs7Ozs7Ozs7aUNBQ007QUFDSixtQkFBTyx5Q0FBUCxDQURJOzs7O1dBRE4iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbixEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcclxuXHJcbnZhciB7TGlzdH09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZT17Zm9jdXM6U3VnZ2VzdGlvbn1cclxuICAgIH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7PHRoaXMuc3RhdGUuZm9jdXMgLz59XHJcbiAgICAgICAgICAgICAgICA8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwi5bu66K6uXCJcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsIFwi5Y676K+E5Lu3XCIsIFwi5bu66K6uXCIsICBcIuabtOaWsFwiLCBcIuWFs+S6jlwiXX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3QoY21kKXtcclxuICAgICAgICBzd2l0Y2goY21kKXtcclxuICAgICAgICBjYXNlICflu7rorq4nOlxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmb2N1czpTdWdnZXN0aW9ufSlcclxuICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgJ+WFs+S6jic6XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZvY3VzOkFib3V0fSlcclxuICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgJ+WOu+ivhOS7tyc6XHJcblxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgICAgY2FzZSAn5pu05pawJzpcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9jdXM6VXBkYXRlfSlcclxuICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3VnZ2VzdGlvbiBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIGZ1bGxXaWR0aD17dHJ1ZX0gcmVmPVwic3VnZ2VzdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCLkvaDnmoTlu7rorq4s5oiR5Lus55qE5YmN6L+b5pa55ZCRXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFib3V0IGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVXBkYXRlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYvPlxyXG4gICAgfVxyXG59XHJcbiJdfQ==