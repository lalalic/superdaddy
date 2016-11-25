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

			_db.Task.find(). /*{status:"scheduled",child:this.props.child._id, scheduledAt:when}*/fetch(function (tasks) {
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
					title: child.name + '的课程' }),
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
							model.current ? '已完成' + Math.ceil(100 * model.current / len) + '%, 继续玩吧！' : "至今还没有开始玩，赶紧开始吧！"
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
//# sourceMappingURL=data:application/json;base64,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NEJBR0gsZUFBYSxFQUFDLFdBQVUsaUJBQVYsV0FDZCxlQUFhLEVBQUMsUUFBTyxpQkFBVSxNQUFWO2tCQXZFVCIsImZpbGUiOiJ0YXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0FwcEJhciwgTGluZWFyUHJvZ3Jlc3MgYXMgUHJvZ3Jlc3N9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5cbmltcG9ydCB7VGFzayBhcyBkYlRhc2ssRmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IENhbGVuZGFyLCB7YWRkRGF5cywgZ2V0TGFzdERheU9mTW9udGh9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcbmltcG9ydCBGbG9hdGluZ0FkZCBmcm9tIFwiLi9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZFwiXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvblN0YXIgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3RhclwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG4vKipcbkAgd2l0aCBnZXRDdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrcyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Rhc2tzOm51bGx9XG5cblx0Z2V0RGF0YShjaGlsZCl7XG5cdFx0ZGJUYXNrLmZpbmQoLyp7c3RhdHVzOlwic2NoZWR1bGVkXCIsY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWQsIHNjaGVkdWxlZEF0OndoZW59Ki8pLmZldGNoKHRhc2tzPT57XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0fSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMuY29udGV4dC5jaGlsZClcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCl7XG5cdFx0aWYodGhpcy5jb250ZXh0LmNoaWxkIT1uZXh0Q29udGV4dC5jaGlsZClcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0Q29udGV4dC5jaGlsZClcblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0Y29uc3Qge3JvdXRlciwgY2hpbGR9PXRoaXMuY29udGV4dFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8RmxvYXRpbmdBZGQgbWluaT17dHJ1ZX0gb25DbGljaz17ZT0+cm91dGVyLnB1c2goXCJjb3Vyc2VzXCIpfS8+XG5cblx0XHRcdFx0PEFwcEJhclxuXHRcdFx0XHRcdHRpdGxlU3R5bGU9e3tjb2xvcjpcImxpZ2h0Z3JheVwifX1cblx0XHRcdFx0XHRzaG93TWVudUljb25CdXR0b249e2ZhbHNlfVxuXHRcdFx0XHRcdHRpdGxlPXtgJHtjaGlsZC5uYW1lfeeahOivvueoi2B9Lz5cblxuXHQgICAgICAgICAgICA8TGlzdCBtb2RlbD17dGhpcy5zdGF0ZS50YXNrc31cblx0XHRcdFx0XHRlbXB0eT17PEVtcHR5IGljb249ezxMb2dvLz59Lz59XG5cdFx0XHRcdFx0dGVtcGxhdGU9e3RoaXMucHJvcHMudGVtcGxhdGV8fHRoaXMuY29uc3RydWN0b3IuSXRlbX0vPlxuXHRcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0c3RhdGljIEl0ZW09Y2xhc3MgIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHJlbmRlcigpe1xuXHRcdFx0bGV0IHttb2RlbCx0aHVtYm5haWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0XHRsZXQge2tub3dsZWRnZX09bW9kZWxcblx0XHRcdGxldCB7dGl0bGUsIHN0ZXBzPVtdfT1rbm93bGVkZ2UsIGxlbj1zdGVwcy5sZW5ndGhcblx0ICAgICAgICByZXR1cm4gKFxuXHQgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG5cdFx0ICAgICAgICAgICAgICAgIDxkaXY+XG5cdFx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e3RpdGxlfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8UHJvZ3Jlc3MgbW9kZT1cImRldGVybWluYXRlXCJcblx0XHRcdFx0XHRcdFx0XHRjb2xvcj1cImdyZWVuXCJcblx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpbjpcIjVweCBhdXRvXCJ9fVxuXHRcdFx0XHRcdFx0XHRcdG1heD17bGVufVxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb2RlbC5jdXJyZW50fS8+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9yZVwiPlxuXHRcdFx0XHRcdFx0XHR7bW9kZWwuY3VycmVudCA/IGDlt7LlrozmiJAke01hdGguY2VpbCgxMDAqbW9kZWwuY3VycmVudC9sZW4pfSUsIOe7p+e7reeOqeWQp++8gWBcblx0XHRcdFx0XHRcdFx0XHQ6IFwi6Iez5LuK6L+Y5rKh5pyJ5byA5aeL546p77yM6LW257Sn5byA5aeL5ZCn77yBXCJ9XG5cdFx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cblx0XHQgICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnRodW1ibmFpbHx8dGh1bWJuYWlsfS8+PC9kaXY+XG5cdFx0ICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHQgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICApXG5cdFx0fVxuXHRcdG9uRGV0YWlsKCl7XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmB0YXNrLyR7dGhpcy5wcm9wcy5tb2RlbC5faWR9YCwgc3RhdGU6e3Rhc2s6dGhpcy5wcm9wcy5tb2RlbH19KVxuXHRcdH1cblx0XHRzdGF0aWMgZGVmYXVsdFByb3BzPXt0aHVtYm5haWw6XCJpbWFnZXMvaWNvbi5zdmdcIn1cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblx0fVxufVxuIl19