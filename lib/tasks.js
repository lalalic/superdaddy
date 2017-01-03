'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	_inherits(Tasks, _Component);

	function Tasks() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Tasks);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tasks.__proto__ || Object.getPrototypeOf(Tasks)).call.apply(_ref, [this].concat(args))), _this), _this.state = { tasks: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tasks, [{
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
	_inherits(_class, _Component2);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    model = _props.model,
			    thumbnail = _props.thumbnail,
			    others = _objectWithoutProperties(_props, ['model', 'thumbnail']);

			var knowledge = model.knowledge;
			var title = knowledge.title,
			    _knowledge$steps = knowledge.steps,
			    steps = _knowledge$steps === undefined ? [] : _knowledge$steps,
			    len = steps.length;

			return _react2.default.createElement(
				'div',
				_extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrcy5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiTG9hZGluZyIsIkVtcHR5IiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiSWNvbnMiLCJEaWFsb2dDb21tYW5kIiwiVGFza3MiLCJzdGF0ZSIsInRhc2tzIiwiY2hpbGQiLCJmaW5kIiwiZmV0Y2giLCJzZXRTdGF0ZSIsImdldERhdGEiLCJjb250ZXh0IiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJyb3V0ZXIiLCJwdXNoIiwiY29sb3IiLCJuYW1lIiwicHJvcHMiLCJ0ZW1wbGF0ZSIsImNvbnN0cnVjdG9yIiwiSXRlbSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIm1vZGVsIiwidGh1bWJuYWlsIiwib3RoZXJzIiwia25vd2xlZGdlIiwidGl0bGUiLCJzdGVwcyIsImxlbiIsImxlbmd0aCIsIm9uRGV0YWlsIiwibWFyZ2luIiwiY3VycmVudCIsIk1hdGgiLCJjZWlsIiwicGF0aG5hbWUiLCJfaWQiLCJ0YXNrIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU9BLEksZUFBQUEsSTtJQUFNQyxPLGVBQUFBLE87SUFBU0MsSyxlQUFBQSxLO0lBQU1DLE8sZUFBQUEsTztJQUFRQyxVLGVBQUFBLFU7SUFBV0MsSyxlQUFBQSxLO0lBQU1DLFEsZUFBQUEsUTtJQUFTQyxLLGVBQUFBLEs7SUFDdkRDLGEsR0FBZUosVSxDQUFmSSxhOztBQUVQOzs7O0lBR3FCQyxLOzs7Ozs7Ozs7Ozs7OztrTEFDcEJDLEssR0FBTSxFQUFDQyxPQUFNLElBQVAsRTs7Ozs7MEJBRUVDLEssRUFBTTtBQUFBOztBQUNiLFlBQU9DLElBQVAsR0FBbUZDLEtBQW5GLENBQXlGLGlCQUFPO0FBQy9GLFdBQUtDLFFBQUwsQ0FB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U0FDYkgsWSxHQUFhLEVBQUNSLFFBQU8saUJBQVVTLE1BQWxCLEU7a0JBdkVEcEIsSyIsImZpbGUiOiJ0YXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tICdxaWxpLWFwcCdcclxuaW1wb3J0IHtBcHBCYXIsIExpbmVhclByb2dyZXNzIGFzIFByb2dyZXNzfSBmcm9tICdtYXRlcmlhbC11aSdcclxuXHJcblxyXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcclxuaW1wb3J0IENhbGVuZGFyLCB7YWRkRGF5cywgZ2V0TGFzdERheU9mTW9udGh9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcclxuaW1wb3J0IEZsb2F0aW5nQWRkIGZyb20gXCIuL2NvbXBvbmVudHMvZmxvYXRpbmctYWRkXCJcclxuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xyXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXHJcbmltcG9ydCBJY29uU3RhciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3RvZ2dsZS9zdGFyXCJcclxuXHJcbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJXHJcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXHJcblxyXG4vKipcclxuQCB3aXRoIGdldEN1cnJlbnRDaGlsZFxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17dGFza3M6bnVsbH1cclxuXHJcblx0Z2V0RGF0YShjaGlsZCl7XHJcblx0XHRkYlRhc2suZmluZCgvKntzdGF0dXM6XCJzY2hlZHVsZWRcIixjaGlsZDp0aGlzLnByb3BzLmNoaWxkLl9pZCwgc2NoZWR1bGVkQXQ6d2hlbn0qLykuZmV0Y2godGFza3M9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHR0aGlzLmdldERhdGEodGhpcy5jb250ZXh0LmNoaWxkKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcclxuXHRcdGlmKHRoaXMuY29udGV4dC5jaGlsZCE9bmV4dENvbnRleHQuY2hpbGQpXHJcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0Q29udGV4dC5jaGlsZClcclxuXHR9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblx0XHRjb25zdCB7cm91dGVyLCBjaGlsZH09dGhpcy5jb250ZXh0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxGbG9hdGluZ0FkZCBtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChcImNvdXJzZXNcIil9Lz5cclxuXHJcblx0XHRcdFx0PEFwcEJhclxyXG5cdFx0XHRcdFx0dGl0bGVTdHlsZT17e2NvbG9yOlwibGlnaHRncmF5XCJ9fVxyXG5cdFx0XHRcdFx0c2hvd01lbnVJY29uQnV0dG9uPXtmYWxzZX1cclxuXHRcdFx0XHRcdHRpdGxlPXtgJHtjaGlsZC5uYW1lfeeahOivvueoi2B9Lz5cclxuXHJcblx0ICAgICAgICAgICAgPExpc3QgbW9kZWw9e3RoaXMuc3RhdGUudGFza3N9XHJcblx0XHRcdFx0XHRlbXB0eT17PEVtcHR5IGljb249ezxMb2dvLz59Lz59XHJcblx0XHRcdFx0XHR0ZW1wbGF0ZT17dGhpcy5wcm9wcy50ZW1wbGF0ZXx8dGhpcy5jb25zdHJ1Y3Rvci5JdGVtfS8+XHJcblx0XHRcdDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgSXRlbT1jbGFzcyAgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0XHRyZW5kZXIoKXtcclxuXHRcdFx0bGV0IHttb2RlbCx0aHVtYm5haWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRcdGxldCB7a25vd2xlZGdlfT1tb2RlbFxyXG5cdFx0XHRsZXQge3RpdGxlLCBzdGVwcz1bXX09a25vd2xlZGdlLCBsZW49c3RlcHMubGVuZ3RoXHJcblx0ICAgICAgICByZXR1cm4gKFxyXG5cdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxyXG5cdFx0ICAgICAgICAgICAgICAgIDxkaXY+XHJcblx0XHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57dGl0bGV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PFByb2dyZXNzIG1vZGU9XCJkZXRlcm1pbmF0ZVwiXHJcblx0XHRcdFx0XHRcdFx0XHRjb2xvcj1cImdyZWVuXCJcclxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luOlwiNXB4IGF1dG9cIn19XHJcblx0XHRcdFx0XHRcdFx0XHRtYXg9e2xlbn1cclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXttb2RlbC5jdXJyZW50fS8+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb3JlXCI+XHJcblx0XHRcdFx0XHRcdFx0e21vZGVsLmN1cnJlbnQgPyBg5bey5a6M5oiQJHtNYXRoLmNlaWwoMTAwKm1vZGVsLmN1cnJlbnQvbGVuKX0lLCDnu6fnu63njqnlkKfvvIFgXHJcblx0XHRcdFx0XHRcdFx0XHQ6IFwi6Iez5LuK6L+Y5rKh5pyJ5byA5aeL546p77yM6LW257Sn5byA5aeL5ZCn77yBXCJ9XHJcblx0XHRcdFx0ICAgICAgICAgICAgPC9kaXY+XHJcblx0XHQgICAgICAgICAgICAgICAgPC9kaXY+XHJcblx0XHQgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cclxuXHRcdCAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwudGh1bWJuYWlsfHx0aHVtYm5haWx9Lz48L2Rpdj5cclxuXHRcdCAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdCAgICAgICAgICAgIDwvZGl2PlxyXG5cdCAgICAgICAgKVxyXG5cdFx0fVxyXG5cdFx0b25EZXRhaWwoKXtcclxuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpgdGFzay8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsIHN0YXRlOnt0YXNrOnRoaXMucHJvcHMubW9kZWx9fSlcclxuXHRcdH1cclxuXHRcdHN0YXRpYyBkZWZhdWx0UHJvcHM9e3RodW1ibmFpbDpcImltYWdlcy9pY29uLnN2Z1wifVxyXG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XHJcblx0fVxyXG59XHJcbiJdfQ==