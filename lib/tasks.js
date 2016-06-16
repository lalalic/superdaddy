'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _class, _temp, _class2, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _reactRouter = require('react-router');

var _materialUi = require('material-ui');

var _db = require('./db');

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

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
		_classCallCheck(this, Tasks);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tasks).apply(this, arguments));

		_this.state = { tasks: null };
		return _this;
	}

	_createClass(Tasks, [{
		key: 'getData',
		value: function getData(when) {
			var _this2 = this;

			_db.Task.find(). /*{status:"scheduled",child:this.props.child._id, scheduledAt:when}*/fetch(function (tasks) {
				_this2.setState({ tasks: tasks });
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getData(this._parseDate(this.props.params.when));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.params.when != nextProps.params.when) this.getData(this._parseDate(nextProps.params.when));
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var when = this.props.params.when;
			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(List, { model: this.state.tasks,
					empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_logo2.default, null) }),
					template: this.props.template || this.constructor.Item }),
				_qiliApp.React.createElement(CommandBar, { className: 'footbar',
					primary: when || "today",
					items: [{ label: "今天", action: "today",
						onSelect: function onSelect(a) {
							return _this3.context.router.push("tasks/today");
						} }, { label: "明天", action: "tomorrow",
						onSelect: function onSelect(a) {
							return _this3.context.router.push("tasks/tomorrow");
						} }, { action: when && when.split("-").length > 1 ? when : "...",
						onSelect: function onSelect(a) {
							return _this3.refs.task.show();
						},
						icon: _moreVert2.default }]
				}),
				_qiliApp.React.createElement(Tasks.TaskQueryCommand, { ref: 'task', when: this._parseDate(when),
					onChange: function onChange(d, name) {
						_this3.refs.task.dismiss();
						switch (Math.floor((Date.now() - d.getTime()) / (1000 * 24 * 60 * 60))) {
							case 0:
								name = 'today';
								break;
							case 1:
								name = 'yesterday';
								break;
							case -1:
								name = 'tomorrow';
								break;
							default:
								name = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
								break;
						}
						_this3.context.router.push('tasks/' + name);
					} })
			);
		}
	}, {
		key: '_parseDate',
		value: function _parseDate() {
			var when = arguments.length <= 0 || arguments[0] === undefined ? 'today' : arguments[0];

			var today = new Date();
			today.setHours(0, 0, 0, 0);
			switch (when) {
				case 'today':
					return today;
				case 'yesterday':
					return (0, _calendar.addDays)(today, -1);
				case 'tomorrow':
					return (0, _calendar.addDays)(today, 1);
				default:
					when = new Date(Date.parse(when));
					when.setHours(0, 0, 0, 0);
					return when;
			}
		}
	}]);

	return Tasks;
}(_qiliApp.Component);

Tasks.contextTypes = { router: _qiliApp.React.PropTypes.object };
Tasks.Item = (_temp = _class = function (_Component2) {
	_inherits(_class, _Component2);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var task = _props.model;
			var image = _props.image;
			var actions = _props.actions;
			var others = _objectWithoutProperties(_props, ['model', 'image', 'actions']);
			var knowledge = task.knowledge;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'li' },
				_qiliApp.React.createElement(
					'div',
					{ className: 'content', onClick: this.onDetail.bind(this) },
					_qiliApp.React.createElement(
						'div',
						null,
						_qiliApp.React.createElement(
							'h4',
							null,
							task.knowledge.title
						)
					),
					_qiliApp.React.createElement(
						'div',
						{ className: 'photo' },
						_qiliApp.React.createElement('img', { src: task.photo || image })
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
}(_qiliApp.Component), _class.defaultProps = { image: "images/task.jpg" }, _class.contextTypes = { router: _qiliApp.React.PropTypes.object }, _temp);
Tasks.Approvings = (_temp2 = _class2 = function (_Tasks) {
	_inherits(_class2, _Tasks);

	function _class2() {
		_classCallCheck(this, _class2);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
	}

	_createClass(_class2, [{
		key: 'getData',
		value: function getData() {
			var _this6 = this;

			_db.Task.find(). /*{status:"finished",child:this.props.child._id}*/fetch(function (tasks) {
				_this6.setState({ tasks: tasks });
			});
		}
	}, {
		key: '_parseDate',
		value: function _parseDate() {
			return null;
		}
	}]);

	return _class2;
}(Tasks), _class2.Item = function (_Tasks$Item) {
	_inherits(_class3, _Tasks$Item);

	function _class3() {
		_classCallCheck(this, _class3);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).apply(this, arguments));
	}

	return _class3;
}(Tasks.Item), _temp2);

Tasks.TaskQueryCommand = function (_DialogCommand) {
	_inherits(_class4, _DialogCommand);

	function _class4() {
		_classCallCheck(this, _class4);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).apply(this, arguments));
	}

	_createClass(_class4, [{
		key: 'renderContent',
		value: function renderContent() {
			var _props2 = this.props;
			var when = _props2.when;
			var onChange = _props2.onChange;
			var now = new Date();
			return _qiliApp.React.createElement(
				'div',
				{ className: 'calendar' },
				_qiliApp.React.createElement(_calendar2.default, {
					firstDayOfWeek: 0,
					mode: 'landscape',
					selected: when,
					displayDate: now,
					minDate: now,
					maxDate: (0, _calendar.getLastDayOfMonth)(now),
					onTouchTapDay: function onTouchTapDay(e, day) {
						return onChange(day);
					}
				})
			);
		}
	}]);

	return _class4;
}(DialogCommand);

exports.default = Tasks;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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UyxHQUFUO01BQVQ7S0FQZixDQURJO0lBQVIsQ0FIYzs7Ozs7RUFEc0I7O2tCQTNIbEIiLCJmaWxlIjoidGFza3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtTdWJoZWFkZXIsIERpdmlkZXIsIFRhYnMsIFRhYiwgRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cblxuaW1wb3J0IHtUYXNrIGFzIGRiVGFzayxGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgQ2FsZW5kYXIsIHthZGREYXlzLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuaW1wb3J0IEljb25Nb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgRW1wdHksQ29tbWVudCxDb21tYW5kQmFyLFBob3RvLE1lc3NhZ2VyLEljb25zfT1VSVxuY29uc3Qge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuLyoqXG5AIHdpdGggY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e3Rhc2tzOm51bGx9XG5cdH1cblxuXHRnZXREYXRhKHdoZW4pe1xuXHRcdGRiVGFzay5maW5kKC8qe3N0YXR1czpcInNjaGVkdWxlZFwiLGNoaWxkOnRoaXMucHJvcHMuY2hpbGQuX2lkLCBzY2hlZHVsZWRBdDp3aGVufSovKS5mZXRjaCh0YXNrcz0+e1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdH0pXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLl9wYXJzZURhdGUodGhpcy5wcm9wcy5wYXJhbXMud2hlbikpXG5cdH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMud2hlbiE9bmV4dFByb3BzLnBhcmFtcy53aGVuKVxuXHRcdFx0dGhpcy5nZXREYXRhKHRoaXMuX3BhcnNlRGF0ZShuZXh0UHJvcHMucGFyYW1zLndoZW4pKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuXHRcdHZhciB3aGVuPXRoaXMucHJvcHMucGFyYW1zLndoZW5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPExpc3QgbW9kZWw9e3RoaXMuc3RhdGUudGFza3N9XG5cdFx0XHRcdFx0ZW1wdHk9ezxFbXB0eSBpY29uPXs8TG9nby8+fS8+fVxuXHRcdFx0XHRcdHRlbXBsYXRlPXt0aGlzLnByb3BzLnRlbXBsYXRlfHx0aGlzLmNvbnN0cnVjdG9yLkl0ZW19Lz5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17d2hlbnx8XCJ0b2RheVwifVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5LuK5aSpXCIsIGFjdGlvbjpcInRvZGF5XCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OiBhPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJ0YXNrcy90b2RheVwiKX0sXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmmI7lpKlcIiwgYWN0aW9uOlwidG9tb3Jyb3dcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6IGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInRhc2tzL3RvbW9ycm93XCIpfSxcblx0XHRcdFx0XHRcdHthY3Rpb246d2hlbiAmJiB3aGVuLnNwbGl0KFwiLVwiKS5sZW5ndGg+MSA/IHdoZW4gOiBcIi4uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnRoaXMucmVmcy50YXNrLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Nb3JlfVxuXHRcdFx0XHRcdF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRhc2tzLlRhc2tRdWVyeUNvbW1hbmQgcmVmPVwidGFza1wiIHdoZW49e3RoaXMuX3BhcnNlRGF0ZSh3aGVuKX1cblx0XHRcdFx0XHRvbkNoYW5nZT17KGQsbmFtZSk9Pntcblx0XHRcdFx0XHRcdHRoaXMucmVmcy50YXNrLmRpc21pc3MoKVxuXHRcdFx0XHRcdFx0c3dpdGNoKE1hdGguZmxvb3IoKERhdGUubm93KCktZC5nZXRUaW1lKCkpLygxMDAwKjI0KjYwKjYwKSkpe1xuXHRcdFx0XHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0XHRcdFx0bmFtZT0ndG9kYXknXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRcdFx0XHRuYW1lPSd5ZXN0ZXJkYXknXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdGNhc2UgLTE6XG5cdFx0XHRcdFx0XHRcdFx0bmFtZT0ndG9tb3Jyb3cnXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0bmFtZT1kLmdldEZ1bGxZZWFyKCkrJy0nKyhkLmdldE1vbnRoKCkrMSkrJy0nK2QuZ2V0RGF0ZSgpXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYHRhc2tzLyR7bmFtZX1gKVxuXHRcdFx0XHRcdH19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX3BhcnNlRGF0ZSh3aGVuPSd0b2RheScpe1xuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKVxuICAgICAgICB0b2RheS5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICBzd2l0Y2god2hlbil7XG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIHJldHVybiB0b2RheVxuICAgICAgICBjYXNlICd5ZXN0ZXJkYXknOlxuICAgICAgICAgICAgcmV0dXJuIGFkZERheXModG9kYXksLTEpXG4gICAgICAgIGNhc2UgJ3RvbW9ycm93JzpcbiAgICAgICAgICAgIHJldHVybiBhZGREYXlzKHRvZGF5LDEpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB3aGVuPW5ldyBEYXRlKERhdGUucGFyc2Uod2hlbikpXG4gICAgICAgICAgICB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgICAgICByZXR1cm4gd2hlblxuICAgICAgICB9XG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG5cdHN0YXRpYyBJdGVtPWNsYXNzICBleHRlbmRzIENvbXBvbmVudHtcblx0XHRyZW5kZXIoKXtcblx0XHRcdHZhciB7bW9kZWw6dGFzaywgaW1hZ2UsIGFjdGlvbnMsIC4uLm90aGVyc309dGhpcy5wcm9wcyxcblx0XHRcdFx0e2tub3dsZWRnZX09dGFzaztcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibGlcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIiBvbkNsaWNrPXt0aGlzLm9uRGV0YWlsLmJpbmQodGhpcyl9PlxuXHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0PGg0Pnt0YXNrLmtub3dsZWRnZS50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBob3RvXCI+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXt0YXNrLnBob3RvfHxpbWFnZX0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRvbkRldGFpbCgpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpgdGFzay8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsIHN0YXRlOnt0YXNrOnRoaXMucHJvcHMubW9kZWx9fSlcblx0XHR9XG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17aW1hZ2U6XCJpbWFnZXMvdGFzay5qcGdcIn1cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblx0fVxuXG5cdHN0YXRpYyBBcHByb3ZpbmdzPWNsYXNzIGV4dGVuZHMgVGFza3N7XG5cdFx0Z2V0RGF0YSgpe1xuXHRcdFx0ZGJUYXNrLmZpbmQoLyp7c3RhdHVzOlwiZmluaXNoZWRcIixjaGlsZDp0aGlzLnByb3BzLmNoaWxkLl9pZH0qLykuZmV0Y2godGFza3M9Pntcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRfcGFyc2VEYXRlKCl7XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblxuXHRcdHN0YXRpYyBJdGVtPWNsYXNzIGV4dGVuZHMgVGFza3MuSXRlbXtcblxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBUYXNrUXVlcnlDb21tYW5kPWNsYXNzIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcblx0XHRyZW5kZXJDb250ZW50KCl7XG5cdFx0XHR2YXIge3doZW4sIG9uQ2hhbmdlfT10aGlzLnByb3BzXG5cdFx0XHRcdCxub3c9bmV3IERhdGUoKVxuXHRcdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cImNhbGVuZGFyXCI+XG5cdFx0XHRcdFx0XHR7PENhbGVuZGFyXG5cdFx0XHRcdFx0XHRcdGZpcnN0RGF5T2ZXZWVrPXswfVxuXHRcdFx0XHRcdFx0XHRtb2RlPVwibGFuZHNjYXBlXCJcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3doZW59XG5cdFx0XHRcdFx0XHRcdGRpc3BsYXlEYXRlPXtub3d9XG5cdFx0XHRcdFx0XHRcdG1pbkRhdGU9e25vd31cblx0XHRcdFx0XHRcdFx0bWF4RGF0ZT17Z2V0TGFzdERheU9mTW9udGgobm93KX1cblx0XHRcdFx0XHRcdFx0b25Ub3VjaFRhcERheT17KGUsZGF5KT0+b25DaGFuZ2UoZGF5KX1cblx0XHRcdFx0XHRcdFx0IC8+fVxuXHRcdFx0XHRcdDwvZGl2Pilcblx0XHR9XG5cdH1cbn1cbiJdfQ==