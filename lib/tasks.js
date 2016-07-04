'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
@ with currentChild
*/

var Tasks = function (_Component) {
	_inherits(Tasks, _Component);

	function Tasks() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Tasks);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tasks)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { tasks: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tasks, [{
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
			var _context = this.context;
			var router = _context.router;
			var child = _context.child;

			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(_floatingAdd2.default, { mini: true, onClick: function onClick(e) {
						return router.push("courses");
					} }),
				_qiliApp.React.createElement(_materialUi.AppBar, {
					titleStyle: { color: "lightgray" },
					showMenuIconButton: false,
					title: child.name + '的课程' }),
				_qiliApp.React.createElement(List, { model: this.state.tasks,
					empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_logo2.default, null) }),
					template: this.props.template || this.constructor.Item })
			);
		}
	}]);

	return Tasks;
}(_qiliApp.Component);

Tasks.contextTypes = {
	router: _qiliApp.React.PropTypes.object,
	child: _qiliApp.React.PropTypes.object
};
Tasks.Item = (_temp2 = _class = function (_Component2) {
	_inherits(_class, _Component2);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props;
			var model = _props.model;
			var thumbnail = _props.thumbnail;

			var others = _objectWithoutProperties(_props, ['model', 'thumbnail']);

			var knowledge = model.knowledge;
			var title = knowledge.title;
			var _knowledge$steps = knowledge.steps;
			var steps = _knowledge$steps === undefined ? [] : _knowledge$steps;var len = steps.length;
			return _qiliApp.React.createElement(
				'div',
				_extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
						return _this4.onDetail();
					} }),
				_qiliApp.React.createElement(
					'div',
					{ className: 'layout' },
					_qiliApp.React.createElement(
						'div',
						null,
						_qiliApp.React.createElement(
							'div',
							{ className: 'title' },
							title
						),
						_qiliApp.React.createElement(_materialUi.LinearProgress, { mode: 'determinate',
							color: 'green',
							style: { margin: "5px auto" },
							max: len,
							value: model.current }),
						_qiliApp.React.createElement(
							'div',
							{ className: 'more' },
							model.current ? '已完成' + Math.ceil(100 * model.current / len) + '%, 继续玩吧！' : "至今还没有开始玩，赶紧开始吧！"
						)
					),
					_qiliApp.React.createElement(
						'div',
						{ className: 'photos' },
						_qiliApp.React.createElement(
							'div',
							null,
							_qiliApp.React.createElement('img', { src: model.thumbnail || thumbnail })
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
}(_qiliApp.Component), _class.defaultProps = { thumbnail: "images/icon.svg" }, _class.contextTypes = { router: _qiliApp.React.PropTypes.object }, _temp2);
exports.default = Tasks;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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akIsRUFBd0IsT0FBTSxFQUFDLE1BQUssS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFaLEVBQW5FLEVBRFM7Ozs7OzhCQUdILGVBQWEsRUFBQyxXQUFVLGlCQUFWLFdBQ2QsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQXZFVCIsImZpbGUiOiJ0YXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7QXBwQmFyLCBMaW5lYXJQcm9ncmVzcyBhcyBQcm9ncmVzc30gZnJvbSAnbWF0ZXJpYWwtdWknXG5cblxuaW1wb3J0IHtUYXNrIGFzIGRiVGFzayxGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgQ2FsZW5kYXIsIHthZGREYXlzLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IEZsb2F0aW5nQWRkIGZyb20gXCIuL2NvbXBvbmVudHMvZmxvYXRpbmctYWRkXCJcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcbmltcG9ydCBJY29uTW9yZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS12ZXJ0XCJcbmltcG9ydCBJY29uU3RhciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3RvZ2dsZS9zdGFyXCJcblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIEVtcHR5LENvbW1lbnQsQ29tbWFuZEJhcixQaG90byxNZXNzYWdlcixJY29uc309VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbi8qKlxuQCB3aXRoIGN1cnJlbnRDaGlsZFxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17dGFza3M6bnVsbH1cblxuXHRnZXREYXRhKGNoaWxkKXtcblx0XHRkYlRhc2suZmluZCgvKntzdGF0dXM6XCJzY2hlZHVsZWRcIixjaGlsZDp0aGlzLnByb3BzLmNoaWxkLl9pZCwgc2NoZWR1bGVkQXQ6d2hlbn0qLykuZmV0Y2godGFza3M9Pntcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHR9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHR0aGlzLmdldERhdGEodGhpcy5jb250ZXh0LmNoaWxkKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcblx0XHRpZih0aGlzLmNvbnRleHQuY2hpbGQhPW5leHRDb250ZXh0LmNoaWxkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRDb250ZXh0LmNoaWxkKVxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7cm91dGVyLCBjaGlsZH09dGhpcy5jb250ZXh0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxGbG9hdGluZ0FkZCBtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChcImNvdXJzZXNcIil9Lz5cblxuXHRcdFx0XHQ8QXBwQmFyXG5cdFx0XHRcdFx0dGl0bGVTdHlsZT17e2NvbG9yOlwibGlnaHRncmF5XCJ9fVxuXHRcdFx0XHRcdHNob3dNZW51SWNvbkJ1dHRvbj17ZmFsc2V9XG5cdFx0XHRcdFx0dGl0bGU9e2Ake2NoaWxkLm5hbWV955qE6K++56iLYH0vPlxuXG5cdCAgICAgICAgICAgIDxMaXN0IG1vZGVsPXt0aGlzLnN0YXRlLnRhc2tzfVxuXHRcdFx0XHRcdGVtcHR5PXs8RW1wdHkgaWNvbj17PExvZ28vPn0vPn1cblx0XHRcdFx0XHR0ZW1wbGF0ZT17dGhpcy5wcm9wcy50ZW1wbGF0ZXx8dGhpcy5jb25zdHJ1Y3Rvci5JdGVtfS8+XG5cdFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdGNoaWxkOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuXHRzdGF0aWMgSXRlbT1jbGFzcyAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRsZXQge21vZGVsLHRodW1ibmFpbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRcdGxldCB7a25vd2xlZGdlfT1tb2RlbFxuXHRcdFx0bGV0IHt0aXRsZSwgc3RlcHM9W119PWtub3dsZWRnZSwgbGVuPXN0ZXBzLmxlbmd0aFxuXHQgICAgICAgIHJldHVybiAoXG5cdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cblx0XHQgICAgICAgICAgICAgICAgPGRpdj5cblx0XHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57dGl0bGV9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxQcm9ncmVzcyBtb2RlPVwiZGV0ZXJtaW5hdGVcIlxuXHRcdFx0XHRcdFx0XHRcdGNvbG9yPVwiZ3JlZW5cIlxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luOlwiNXB4IGF1dG9cIn19XG5cdFx0XHRcdFx0XHRcdFx0bWF4PXtsZW59XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e21vZGVsLmN1cnJlbnR9Lz5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb3JlXCI+XG5cdFx0XHRcdFx0XHRcdHttb2RlbC5jdXJyZW50ID8gYOW3suWujOaIkCR7TWF0aC5jZWlsKDEwMCptb2RlbC5jdXJyZW50L2xlbil9JSwg57un57ut546p5ZCn77yBYFxuXHRcdFx0XHRcdFx0XHRcdDogXCLoh7Pku4rov5jmsqHmnInlvIDlp4vnjqnvvIzotbbntKflvIDlp4vlkKfvvIFcIn1cblx0XHRcdFx0ICAgICAgICAgICAgPC9kaXY+XG5cdFx0ICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdCAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuXHRcdCAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwudGh1bWJuYWlsfHx0aHVtYm5haWx9Lz48L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdCAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgIClcblx0XHR9XG5cdFx0b25EZXRhaWwoKXtcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YHRhc2svJHt0aGlzLnByb3BzLm1vZGVsLl9pZH1gLCBzdGF0ZTp7dGFzazp0aGlzLnByb3BzLm1vZGVsfX0pXG5cdFx0fVxuXHRcdHN0YXRpYyBkZWZhdWx0UHJvcHM9e3RodW1ibmFpbDpcImltYWdlcy9pY29uLnN2Z1wifVxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHR9XG59XG4iXX0=