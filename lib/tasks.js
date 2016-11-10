'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _db = require('./db');

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _floatingAdd = require('./components/floating-add');

var _floatingAdd2 = _interopRequireDefault(_floatingAdd);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _star = require('material-ui/svg-icons/toggle/star');

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _qiliApp.UI.List,
    Loading = _qiliApp.UI.Loading,
    Empty = _qiliApp.UI.Empty,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar,
    Photo = _qiliApp.UI.Photo,
    Messager = _qiliApp.UI.Messager,
    Icons = _qiliApp.UI.Icons;
var DialogCommand = CommandBar.DialogCommand;

/**
@ with getCurrentChild
*/

var Tasks = function (_Component) {
	(0, _inherits3.default)(Tasks, _Component);

	function Tasks() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Tasks);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tasks.__proto__ || (0, _getPrototypeOf2.default)(Tasks)).call.apply(_ref, [this].concat(args))), _this), _this.state = { tasks: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Tasks, [{
		key: 'getData',
		value: function getData(child) {
			var _this2 = this;

			_db.Task.find().fetch(function (tasks) {
				_this2.setState({ tasks: tasks });
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getData(this.context.child);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps, nextContext) {
			if (this.context.child != nextContext.child) this.getData(nextContext.child);
		}
	}, {
		key: 'render',
		value: function render() {
			var _context = this.context,
			    router = _context.router,
			    child = _context.child;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_floatingAdd2.default, { mini: true, onClick: function onClick(e) {
						return router.push("courses");
					} }),
				_react2.default.createElement(_materialUi.AppBar, {
					titleStyle: { color: "lightgray" },
					showMenuIconButton: false,
					title: child.name + '\u7684\u8BFE\u7A0B' }),
				_react2.default.createElement(List, { model: this.state.tasks,
					empty: _react2.default.createElement(Empty, { icon: _react2.default.createElement(_logo2.default, null) }),
					template: this.props.template || this.constructor.Item })
			);
		}
	}]);
	return Tasks;
}(_react.Component);

Tasks.contextTypes = {
	router: _react.PropTypes.object,
	child: _react.PropTypes.object
};
Tasks.Item = (_temp2 = _class = function (_Component2) {
	(0, _inherits3.default)(_class, _Component2);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    model = _props.model,
			    thumbnail = _props.thumbnail,
			    others = (0, _objectWithoutProperties3.default)(_props, ['model', 'thumbnail']);
			var knowledge = model.knowledge;
			var title = knowledge.title,
			    _knowledge$steps = knowledge.steps,
			    steps = _knowledge$steps === undefined ? [] : _knowledge$steps,
			    len = steps.length;

			return _react2.default.createElement(
				'div',
				(0, _extends3.default)({ className: 'li inset photo1' }, others, { onClick: function onClick() {
						return _this4.onDetail();
					} }),
				_react2.default.createElement(
					'div',
					{ className: 'layout' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'title' },
							title
						),
						_react2.default.createElement(_materialUi.LinearProgress, { mode: 'determinate',
							color: 'green',
							style: { margin: "5px auto" },
							max: len,
							value: model.current }),
						_react2.default.createElement(
							'div',
							{ className: 'more' },
							model.current ? '\u5DF2\u5B8C\u6210' + Math.ceil(100 * model.current / len) + '%, \u7EE7\u7EED\u73A9\u5427\uFF01' : "至今还没有开始玩，赶紧开始吧！"
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'photos' },
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('img', { src: model.thumbnail || thumbnail })
						)
					)
				)
			);
		}
	}, {
		key: 'onDetail',
		value: function onDetail() {
			this.context.router.push({ pathname: 'task/' + this.props.model._id, state: { task: this.props.model } });
		}
	}]);
	return _class;
}(_react.Component), _class.defaultProps = { thumbnail: "images/icon.svg" }, _class.contextTypes = { router: _react.PropTypes.object }, _temp2);
exports.default = Tasks;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrcy5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiTG9hZGluZyIsIkVtcHR5IiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiSWNvbnMiLCJEaWFsb2dDb21tYW5kIiwiVGFza3MiLCJzdGF0ZSIsInRhc2tzIiwiY2hpbGQiLCJmaW5kIiwiZmV0Y2giLCJzZXRTdGF0ZSIsImdldERhdGEiLCJjb250ZXh0IiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJyb3V0ZXIiLCJwdXNoIiwiY29sb3IiLCJuYW1lIiwicHJvcHMiLCJ0ZW1wbGF0ZSIsImNvbnN0cnVjdG9yIiwiSXRlbSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIm1vZGVsIiwidGh1bWJuYWlsIiwib3RoZXJzIiwia25vd2xlZGdlIiwidGl0bGUiLCJzdGVwcyIsImxlbiIsImxlbmd0aCIsIm9uRGV0YWlsIiwibWFyZ2luIiwiY3VycmVudCIsIk1hdGgiLCJjZWlsIiwicGF0aG5hbWUiLCJfaWQiLCJ0YXNrIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVPQSxJLGVBQUFBLEk7SUFBTUMsTyxlQUFBQSxPO0lBQVNDLEssZUFBQUEsSztJQUFNQyxPLGVBQUFBLE87SUFBUUMsVSxlQUFBQSxVO0lBQVdDLEssZUFBQUEsSztJQUFNQyxRLGVBQUFBLFE7SUFBU0MsSyxlQUFBQSxLO0lBQ3ZEQyxhLEdBQWVKLFUsQ0FBZkksYTs7QUFFUDs7OztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d01BQ3BCQyxLLEdBQU0sRUFBQ0MsT0FBTSxJQUFQLEU7Ozs7OzBCQUVFQyxLLEVBQU07QUFBQTs7QUFDYixZQUFPQyxJQUFQLEdBQW1GQyxLQUFuRixDQUF5RixpQkFBTztBQUMvRixXQUFLQyxRQUFMLENBQWMsRUFBQ0osWUFBRCxFQUFkO0FBQ0EsSUFGRDtBQUdBOzs7c0NBRWtCO0FBQ2xCLFFBQUtLLE9BQUwsQ0FBYSxLQUFLQyxPQUFMLENBQWFMLEtBQTFCO0FBQ0E7Ozs0Q0FFeUJNLFMsRUFBV0MsVyxFQUFZO0FBQ2hELE9BQUcsS0FBS0YsT0FBTCxDQUFhTCxLQUFiLElBQW9CTyxZQUFZUCxLQUFuQyxFQUNDLEtBQUtJLE9BQUwsQ0FBYUcsWUFBWVAsS0FBekI7QUFDRDs7OzJCQUVVO0FBQUEsa0JBQ1ksS0FBS0ssT0FEakI7QUFBQSxPQUNIRyxNQURHLFlBQ0hBLE1BREc7QUFBQSxPQUNLUixLQURMLFlBQ0tBLEtBREw7O0FBRVYsVUFDQztBQUFBO0FBQUE7QUFDQywyREFBYSxNQUFNLElBQW5CLEVBQXlCLFNBQVM7QUFBQSxhQUFHUSxPQUFPQyxJQUFQLENBQVksU0FBWixDQUFIO0FBQUEsTUFBbEMsR0FERDtBQUdDO0FBQ0MsaUJBQVksRUFBQ0MsT0FBTSxXQUFQLEVBRGI7QUFFQyx5QkFBb0IsS0FGckI7QUFHQyxZQUFVVixNQUFNVyxJQUFoQix1QkFIRCxHQUhEO0FBUVUsa0NBQUMsSUFBRCxJQUFNLE9BQU8sS0FBS2IsS0FBTCxDQUFXQyxLQUF4QjtBQUNSLFlBQU8sOEJBQUMsS0FBRCxJQUFPLE1BQU0sbURBQWIsR0FEQztBQUVSLGVBQVUsS0FBS2EsS0FBTCxDQUFXQyxRQUFYLElBQXFCLEtBQUtDLFdBQUwsQ0FBaUJDLElBRnhDO0FBUlYsSUFERDtBQWNHOzs7OztBQWxDZ0JsQixLLENBbUNibUIsWSxHQUFhO0FBQ25CUixTQUFRLGlCQUFVUyxNQURDO0FBRW5CakIsUUFBTyxpQkFBVWlCO0FBRkUsQztBQW5DQXBCLEssQ0F3Q2JrQixJOzs7Ozs7Ozs7OzJCQUNFO0FBQUE7O0FBQUEsZ0JBQ3lCLEtBQUtILEtBRDlCO0FBQUEsT0FDRk0sS0FERSxVQUNGQSxLQURFO0FBQUEsT0FDSUMsU0FESixVQUNJQSxTQURKO0FBQUEsT0FDaUJDLE1BRGpCO0FBQUEsT0FFRkMsU0FGRSxHQUVTSCxLQUZULENBRUZHLFNBRkU7QUFBQSxPQUdGQyxLQUhFLEdBR2VELFNBSGYsQ0FHRkMsS0FIRTtBQUFBLDBCQUdlRCxTQUhmLENBR0tFLEtBSEw7QUFBQSxPQUdLQSxLQUhMLG9DQUdXLEVBSFg7QUFBQSxPQUcwQkMsR0FIMUIsR0FHOEJELE1BQU1FLE1BSHBDOztBQUlELFVBQ0k7QUFBQTtBQUFBLDZCQUFLLFdBQVUsaUJBQWYsSUFBcUNMLE1BQXJDLElBQTZDLFNBQVM7QUFBQSxhQUFJLE9BQUtNLFFBQUwsRUFBSjtBQUFBLE1BQXREO0FBQ1I7QUFBQTtBQUFBLE9BQUssV0FBVSxRQUFmO0FBQ2E7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLFNBQUssV0FBVSxPQUFmO0FBQXdCSjtBQUF4QixPQURKO0FBRVgsa0VBQVUsTUFBSyxhQUFmO0FBQ0MsY0FBTSxPQURQO0FBRUMsY0FBTyxFQUFDSyxRQUFPLFVBQVIsRUFGUjtBQUdDLFlBQUtILEdBSE47QUFJQyxjQUFPTixNQUFNVSxPQUpkLEdBRlc7QUFPWDtBQUFBO0FBQUEsU0FBSyxXQUFVLE1BQWY7QUFDQ1YsYUFBTVUsT0FBTiwwQkFBc0JDLEtBQUtDLElBQUwsQ0FBVSxNQUFJWixNQUFNVSxPQUFWLEdBQWtCSixHQUE1QixDQUF0Qix5Q0FDRTtBQUZIO0FBUFcsTUFEYjtBQWFhO0FBQUE7QUFBQSxRQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFLLDhDQUFLLEtBQUtOLE1BQU1DLFNBQU4sSUFBaUJBLFNBQTNCO0FBQUw7QUFESjtBQWJiO0FBRFEsSUFESjtBQXFCTjs7OzZCQUNTO0FBQ1QsUUFBS2QsT0FBTCxDQUFhRyxNQUFiLENBQW9CQyxJQUFwQixDQUF5QixFQUFDc0Isb0JBQWlCLEtBQUtuQixLQUFMLENBQVdNLEtBQVgsQ0FBaUJjLEdBQW5DLEVBQTBDbEMsT0FBTSxFQUFDbUMsTUFBSyxLQUFLckIsS0FBTCxDQUFXTSxLQUFqQixFQUFoRCxFQUF6QjtBQUNBOzs7NEJBQ01nQixZLEdBQWEsRUFBQ2YsV0FBVSxpQkFBWCxFLFNBQ2JILFksR0FBYSxFQUFDUixRQUFPLGlCQUFVUyxNQUFsQixFO2tCQXZFRHBCLEsiLCJmaWxlIjoidGFza3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtBcHBCYXIsIExpbmVhclByb2dyZXNzIGFzIFByb2dyZXNzfSBmcm9tICdtYXRlcmlhbC11aSdcblxuXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciwge2FkZERheXMsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgRmxvYXRpbmdBZGQgZnJvbSBcIi4vY29tcG9uZW50cy9mbG9hdGluZy1hZGRcIlxuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuaW1wb3J0IEljb25Nb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuaW1wb3J0IEljb25TdGFyIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvdG9nZ2xlL3N0YXJcIlxuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgRW1wdHksQ29tbWVudCxDb21tYW5kQmFyLFBob3RvLE1lc3NhZ2VyLEljb25zfT1VSVxuY29uc3Qge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuLyoqXG5AIHdpdGggZ2V0Q3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXt0YXNrczpudWxsfVxuXG5cdGdldERhdGEoY2hpbGQpe1xuXHRcdGRiVGFzay5maW5kKC8qe3N0YXR1czpcInNjaGVkdWxlZFwiLGNoaWxkOnRoaXMucHJvcHMuY2hpbGQuX2lkLCBzY2hlZHVsZWRBdDp3aGVufSovKS5mZXRjaCh0YXNrcz0+e1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdH0pXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLmNvbnRleHQuY2hpbGQpXG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpe1xuXHRcdGlmKHRoaXMuY29udGV4dC5jaGlsZCE9bmV4dENvbnRleHQuY2hpbGQpXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dENvbnRleHQuY2hpbGQpXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHtyb3V0ZXIsIGNoaWxkfT10aGlzLmNvbnRleHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PEZsb2F0aW5nQWRkIG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnJvdXRlci5wdXNoKFwiY291cnNlc1wiKX0vPlxuXG5cdFx0XHRcdDxBcHBCYXJcblx0XHRcdFx0XHR0aXRsZVN0eWxlPXt7Y29sb3I6XCJsaWdodGdyYXlcIn19XG5cdFx0XHRcdFx0c2hvd01lbnVJY29uQnV0dG9uPXtmYWxzZX1cblx0XHRcdFx0XHR0aXRsZT17YCR7Y2hpbGQubmFtZX3nmoTor77nqItgfS8+XG5cblx0ICAgICAgICAgICAgPExpc3QgbW9kZWw9e3RoaXMuc3RhdGUudGFza3N9XG5cdFx0XHRcdFx0ZW1wdHk9ezxFbXB0eSBpY29uPXs8TG9nby8+fS8+fVxuXHRcdFx0XHRcdHRlbXBsYXRlPXt0aGlzLnByb3BzLnRlbXBsYXRlfHx0aGlzLmNvbnN0cnVjdG9yLkl0ZW19Lz5cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0Y2hpbGQ6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdHN0YXRpYyBJdGVtPWNsYXNzICBleHRlbmRzIENvbXBvbmVudHtcblx0XHRyZW5kZXIoKXtcblx0XHRcdGxldCB7bW9kZWwsdGh1bWJuYWlsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdFx0bGV0IHtrbm93bGVkZ2V9PW1vZGVsXG5cdFx0XHRsZXQge3RpdGxlLCBzdGVwcz1bXX09a25vd2xlZGdlLCBsZW49c3RlcHMubGVuZ3RoXG5cdCAgICAgICAgcmV0dXJuIChcblx0ICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzFcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuXHRcdCAgICAgICAgICAgICAgICA8ZGl2PlxuXHRcdCAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnt0aXRsZX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0PFByb2dyZXNzIG1vZGU9XCJkZXRlcm1pbmF0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0Y29sb3I9XCJncmVlblwiXG5cdFx0XHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW46XCI1cHggYXV0b1wifX1cblx0XHRcdFx0XHRcdFx0XHRtYXg9e2xlbn1cblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17bW9kZWwuY3VycmVudH0vPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vcmVcIj5cblx0XHRcdFx0XHRcdFx0e21vZGVsLmN1cnJlbnQgPyBg5bey5a6M5oiQJHtNYXRoLmNlaWwoMTAwKm1vZGVsLmN1cnJlbnQvbGVuKX0lLCDnu6fnu63njqnlkKfvvIFgXG5cdFx0XHRcdFx0XHRcdFx0OiBcIuiHs+S7iui/mOayoeacieW8gOWni+eOqe+8jOi1tue0p+W8gOWni+WQp++8gVwifVxuXHRcdFx0XHQgICAgICAgICAgICA8L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0ICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG5cdFx0ICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC50aHVtYm5haWx8fHRodW1ibmFpbH0vPjwvZGl2PlxuXHRcdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0ICAgICAgICAgICAgPC9kaXY+XG5cdCAgICAgICAgKVxuXHRcdH1cblx0XHRvbkRldGFpbCgpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpgdGFzay8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsIHN0YXRlOnt0YXNrOnRoaXMucHJvcHMubW9kZWx9fSlcblx0XHR9XG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17dGh1bWJuYWlsOlwiaW1hZ2VzL2ljb24uc3ZnXCJ9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn1cbiJdfQ==