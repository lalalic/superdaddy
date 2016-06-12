'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logo = function (_Component) {
    _inherits(Logo, _Component);

    function Logo() {
        _classCallCheck(this, Logo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Logo).apply(this, arguments));
    }

    _createClass(Logo, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var _props$drawStyle = _props.drawStyle;
            var drawStyle = _props$drawStyle === undefined ? {} : _props$drawStyle;

            var others = _objectWithoutProperties(_props, ['drawStyle']);

            var _Object$assign = Object.assign({
                fill: "none",
                stroke: "rgb(200,200,200)",
                strokeWidth: 1,
                fontSize: 5
            }, drawStyle);

            var _Object$assign$textSt = _Object$assign.textStroke;
            var textStroke = _Object$assign$textSt === undefined ? "lightgray" : _Object$assign$textSt;

            var otherDrawStyle = _objectWithoutProperties(_Object$assign, ['textStroke']);

            return _qiliApp.React.createElement(
                _materialUi.SvgIcon,
                others,
                _qiliApp.React.createElement(
                    'g',
                    otherDrawStyle,
                    _qiliApp.React.createElement('circle', { cx: '18', cy: '4', r: '2' }),
                    _qiliApp.React.createElement('circle', { cx: '4', cy: '6', r: '3' }),
                    _qiliApp.React.createElement(
                        'text',
                        { x: '5', y: '20', stroke: textStroke },
                        'C N B'
                    ),
                    _qiliApp.React.createElement('path', { d: 'M 3.5208 10.2525 q 6.95554 7.98853 16.9068 -4.76903', fill: 'none' })
                )
            );
        }
    }]);

    return Logo;
}(_qiliApp.Component);

exports.default = Logo;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUNWO3lCQUN5QixLQUFLLEtBQUwsQ0FEekI7MENBQ0EsVUFEQTtnQkFDQSw2Q0FBVSxzQkFEVjs7Z0JBQ2lCLHlEQURqQjs7aUNBRTJDLE9BQU8sTUFBUCxDQUFjO0FBQ3RELHNCQUFLLE1BQUw7QUFDQSx3QkFBTyxrQkFBUDtBQUNBLDZCQUFZLENBQVo7QUFDQSwwQkFBUyxDQUFUO2FBSndDLEVBSzFDLFNBTDBDLEVBRjNDOzt1REFFQSxXQUZBO2dCQUVBLG1EQUFXLG9DQUZYOztnQkFFMkIsMEVBRjNCOztBQVNQLG1CQUNFOztnQkFBYSxNQUFiO2dCQUNFOztvQkFBTyxjQUFQO29CQUNJLHlDQUFRLElBQUcsSUFBSCxFQUFRLElBQUcsR0FBSCxFQUFPLEdBQUUsR0FBRixFQUF2QixDQURKO29CQUVJLHlDQUFRLElBQUcsR0FBSCxFQUFPLElBQUcsR0FBSCxFQUFPLEdBQUUsR0FBRixFQUF0QixDQUZKO29CQUdJOzswQkFBTSxHQUFFLEdBQUYsRUFBTSxHQUFFLElBQUYsRUFBTyxRQUFRLFVBQVIsRUFBbkI7O3FCQUhKO29CQUlJLHVDQUFNLEdBQUUscURBQUYsRUFBd0QsTUFBSyxNQUFMLEVBQTlELENBSko7aUJBREY7YUFERixDQVRPOzs7O1dBRFUiLCJmaWxlIjoibG9nby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudH0gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCB7U3ZnSWNvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dvIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gIHJlbmRlcigpIHtcclxuICAgICAgdmFyIHtkcmF3U3R5bGU9e30sIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICB2YXIge3RleHRTdHJva2U9XCJsaWdodGdyYXlcIiwgLi4ub3RoZXJEcmF3U3R5bGV9PU9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgICAgICAgIGZpbGw6XCJub25lXCIsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOlwicmdiKDIwMCwyMDAsMjAwKVwiLFxyXG4gICAgICAgICAgICAgIHN0cm9rZVdpZHRoOjEsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6NVxyXG4gICAgICAgICAgfSxkcmF3U3R5bGUpXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFN2Z0ljb24gey4uLm90aGVyc30+XHJcbiAgICAgICAgPGcgey4uLm90aGVyRHJhd1N0eWxlfT5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjE4XCIgY3k9XCI0XCIgcj1cIjJcIi8+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI0XCIgY3k9XCI2XCIgcj1cIjNcIi8+XHJcbiAgICAgICAgICAgIDx0ZXh0IHg9XCI1XCIgeT1cIjIwXCIgc3Ryb2tlPXt0ZXh0U3Ryb2tlfT5DJm5ic3A7TiZuYnNwO0I8L3RleHQ+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDMuNTIwOCAxMC4yNTI1IHEgNi45NTU1NCA3Ljk4ODUzIDE2LjkwNjggLTQuNzY5MDNcIiBmaWxsPVwibm9uZVwiLz5cclxuICAgICAgICA8L2c+XHJcbiAgICA8L1N2Z0ljb24+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdfQ==