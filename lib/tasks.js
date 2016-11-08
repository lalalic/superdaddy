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

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;
var Photo = _qiliApp.UI.Photo;
var Messager = _qiliApp.UI.Messager;
var Icons = _qiliApp.UI.Icons;
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
			var _context = this.context;
			var router = _context.router;
			var child = _context.child;

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

			var _props = this.props;
			var model = _props.model;
			var thumbnail = _props.thumbnail;
			var others = (0, _objectWithoutProperties3.default)(_props, ['model', 'thumbnail']);
			var knowledge = model.knowledge;
			var title = knowledge.title;
			var _knowledge$steps = knowledge.steps;
			var steps = _knowledge$steps === undefined ? [] : _knowledge$steps;var len = steps.length;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrcy5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiTG9hZGluZyIsIkVtcHR5IiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiSWNvbnMiLCJEaWFsb2dDb21tYW5kIiwiVGFza3MiLCJzdGF0ZSIsInRhc2tzIiwiY2hpbGQiLCJmaW5kIiwiZmV0Y2giLCJzZXRTdGF0ZSIsImdldERhdGEiLCJjb250ZXh0IiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJyb3V0ZXIiLCJwdXNoIiwiY29sb3IiLCJuYW1lIiwicHJvcHMiLCJ0ZW1wbGF0ZSIsImNvbnN0cnVjdG9yIiwiSXRlbSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIm1vZGVsIiwidGh1bWJuYWlsIiwib3RoZXJzIiwia25vd2xlZGdlIiwidGl0bGUiLCJzdGVwcyIsImxlbmd0aCIsIm9uRGV0YWlsIiwibWFyZ2luIiwibGVuIiwiY3VycmVudCIsIk1hdGgiLCJjZWlsIiwicGF0aG5hbWUiLCJfaWQiLCJ0YXNrIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVPQSxJLGVBQUFBLEk7SUFBTUMsTyxlQUFBQSxPO0lBQVNDLEssZUFBQUEsSztJQUFNQyxPLGVBQUFBLE87SUFBUUMsVSxlQUFBQSxVO0lBQVdDLEssZUFBQUEsSztJQUFNQyxRLGVBQUFBLFE7SUFBU0MsSyxlQUFBQSxLO0lBQ3ZEQyxhLEdBQWVKLFUsQ0FBZkksYTs7QUFFUDs7OztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d01BQ3BCQyxLLEdBQU0sRUFBQ0MsT0FBTSxJQUFQLEU7Ozs7OzBCQUVFQyxLLEVBQU07QUFBQTs7QUFDYixZQUFPQyxJQUFQLEdBQW1GQyxLQUFuRixDQUF5RixpQkFBTztBQUMv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U0FDYkgsWSxHQUFhLEVBQUNSLFFBQU8saUJBQVVTLE1BQWxCLEU7a0JBdkVEcEIsSyIsImZpbGUiOiJ0YXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0FwcEJhciwgTGluZWFyUHJvZ3Jlc3MgYXMgUHJvZ3Jlc3N9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5cbmltcG9ydCB7VGFzayBhcyBkYlRhc2ssRmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IENhbGVuZGFyLCB7YWRkRGF5cywgZ2V0TGFzdERheU9mTW9udGh9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcbmltcG9ydCBGbG9hdGluZ0FkZCBmcm9tIFwiLi9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZFwiXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvblN0YXIgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3RhclwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG4vKipcbkAgd2l0aCBnZXRDdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrcyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Rhc2tzOm51bGx9XG5cblx0Z2V0RGF0YShjaGlsZCl7XG5cdFx0ZGJUYXNrLmZpbmQoLyp7c3RhdHVzOlwic2NoZWR1bGVkXCIsY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWQsIHNjaGVkdWxlZEF0OndoZW59Ki8pLmZldGNoKHRhc2tzPT57XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0fSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMuY29udGV4dC5jaGlsZClcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCl7XG5cdFx0aWYodGhpcy5jb250ZXh0LmNoaWxkIT1uZXh0Q29udGV4dC5jaGlsZClcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0Q29udGV4dC5jaGlsZClcblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0Y29uc3Qge3JvdXRlciwgY2hpbGR9PXRoaXMuY29udGV4dFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8RmxvYXRpbmdBZGQgbWluaT17dHJ1ZX0gb25DbGljaz17ZT0+cm91dGVyLnB1c2goXCJjb3Vyc2VzXCIpfS8+XG5cblx0XHRcdFx0PEFwcEJhclxuXHRcdFx0XHRcdHRpdGxlU3R5bGU9e3tjb2xvcjpcImxpZ2h0Z3JheVwifX1cblx0XHRcdFx0XHRzaG93TWVudUljb25CdXR0b249e2ZhbHNlfVxuXHRcdFx0XHRcdHRpdGxlPXtgJHtjaGlsZC5uYW1lfeeahOivvueoi2B9Lz5cblxuXHQgICAgICAgICAgICA8TGlzdCBtb2RlbD17dGhpcy5zdGF0ZS50YXNrc31cblx0XHRcdFx0XHRlbXB0eT17PEVtcHR5IGljb249ezxMb2dvLz59Lz59XG5cdFx0XHRcdFx0dGVtcGxhdGU9e3RoaXMucHJvcHMudGVtcGxhdGV8fHRoaXMuY29uc3RydWN0b3IuSXRlbX0vPlxuXHRcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0c3RhdGljIEl0ZW09Y2xhc3MgIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHJlbmRlcigpe1xuXHRcdFx0bGV0IHttb2RlbCx0aHVtYm5haWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0XHRsZXQge2tub3dsZWRnZX09bW9kZWxcblx0XHRcdGxldCB7dGl0bGUsIHN0ZXBzPVtdfT1rbm93bGVkZ2UsIGxlbj1zdGVwcy5sZW5ndGhcblx0ICAgICAgICByZXR1cm4gKFxuXHQgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG5cdFx0ICAgICAgICAgICAgICAgIDxkaXY+XG5cdFx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e3RpdGxlfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8UHJvZ3Jlc3MgbW9kZT1cImRldGVybWluYXRlXCJcblx0XHRcdFx0XHRcdFx0XHRjb2xvcj1cImdyZWVuXCJcblx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpbjpcIjVweCBhdXRvXCJ9fVxuXHRcdFx0XHRcdFx0XHRcdG1heD17bGVufVxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb2RlbC5jdXJyZW50fS8+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9yZVwiPlxuXHRcdFx0XHRcdFx0XHR7bW9kZWwuY3VycmVudCA/IGDlt7LlrozmiJAke01hdGguY2VpbCgxMDAqbW9kZWwuY3VycmVudC9sZW4pfSUsIOe7p+e7reeOqeWQp++8gWBcblx0XHRcdFx0XHRcdFx0XHQ6IFwi6Iez5LuK6L+Y5rKh5pyJ5byA5aeL546p77yM6LW257Sn5byA5aeL5ZCn77yBXCJ9XG5cdFx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cblx0XHQgICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnRodW1ibmFpbHx8dGh1bWJuYWlsfS8+PC9kaXY+XG5cdFx0ICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHQgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICApXG5cdFx0fVxuXHRcdG9uRGV0YWlsKCl7XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmB0YXNrLyR7dGhpcy5wcm9wcy5tb2RlbC5faWR9YCwgc3RhdGU6e3Rhc2s6dGhpcy5wcm9wcy5tb2RlbH19KVxuXHRcdH1cblx0XHRzdGF0aWMgZGVmYXVsdFByb3BzPXt0aHVtYm5haWw6XCJpbWFnZXMvaWNvbi5zdmdcIn1cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblx0fVxufVxuIl19