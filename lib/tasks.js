'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _class, _temp, _class2, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

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

			var when = this._parseDate(this.props.params.when);
			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(List, { model: this.state.tasks,
					empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_logo2.default, null) }),
					template: this.props.template || this.constructor.Item }),
				_qiliApp.React.createElement(CommandBar, {
					className: 'footbar',
					primary: 'Knowledges',
					items: [{ action: "Back" }, { action: "今天",
						onSelect: function onSelect(a) {
							return _this3.context.router.push("tasks/today");
						} }, { action: "明天",
						onSelect: function onSelect(a) {
							return _this3.context.router.push("tasks/tomorrow");
						} }, { action: "...",
						onSelect: function onSelect() {
							return _this3.refs.task.show();
						},
						icon: _moreVert2.default }]
				}),
				_qiliApp.React.createElement(Tasks.TaskQueryCommand, { ref: 'task', when: when,
					onChange: function onChange(d, name) {
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
				{ key: 'calendar' },
				_qiliApp.React.createElement(_calendar2.default, {
					selected: when,
					multiple: false,
					displayDate: now,
					minDate: (0, _calendar.addDays)(now, -31),
					maxDate: (0, _calendar.addDays)(now, 31),
					onDayTouchTap: onChange
				})
			);
		}
	}]);

	return _class4;
}(DialogCommand);

exports.default = Tasks;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LEtBQUssS0FBSyxLQUFMLElBQVksS0FBWixFQUFWLENBREQ7TUFKRDtLQUREO0lBREQsQ0FITzs7Ozs2QkFnQkU7QUFDVCxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEVBQUMsb0JBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBd0IsT0FBTSxFQUFDLE1BQUssS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFaLEVBQW5FLEVBRFM7Ozs7OzhCQUdILGVBQWEsRUFBQyxPQUFNLGlCQUFOLFdBQ2QsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBeEdULE1BMkdiOzs7Ozs7Ozs7Ozs0QkFDRzs7O0FBQ1IsWUFBTyxJQUFQLHNEQUFnRSxLQUFoRSxDQUFzRSxpQkFBTztBQUM1RSxXQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZCxFQUQ0RTtJQUFQLENBQXRFLENBRFE7Ozs7K0JBTUc7QUFDWCxVQUFPLElBQVAsQ0FEVzs7Ozs7RUFQbUIsZ0JBV3hCOzs7Ozs7Ozs7O0VBQW1CLE1BQU0sSUFBTjs7QUF0SFAsTUEySGI7Ozs7Ozs7Ozs7O2tDQUNTO2lCQUNPLEtBQUssS0FBTCxDQURQO09BQ1Qsb0JBRFM7QUFDVixPQUFPLDJCQUFQLENBRFU7QUFFWixhQUFJLElBQUksSUFBSixFQUFKLENBRlk7QUFHZCxVQUFROztNQUFLLEtBQUksVUFBSixFQUFMO0lBQ0o7QUFDQSxlQUFVLElBQVY7QUFDQSxlQUFVLEtBQVY7QUFDQSxrQkFBYSxHQUFiO0FBQ0EsY0FBUyx1QkFBUSxHQUFSLEVBQVksQ0FBQyxFQUFELENBQXJCO0FBQ0EsY0FBUyx1QkFBUSxHQUFSLEVBQVksRUFBWixDQUFUO0FBQ0Esb0JBQWUsUUFBZjtLQU5BLENBREk7SUFBUixDQUhjOzs7OztFQURzQjs7a0JBM0hsQiIsImZpbGUiOiJ0YXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7QXZhdGFyLFBhcGVyLCBSYWRpb0dyb3VwLCBSYWRpb0J1dHRvbixGb250SWNvbixJY29uQnV0dG9uLFRleHRGaWVsZCwgVGFicywgVGFiLCBEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciwge2FkZERheXN9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcbmltcG9ydCBJY29uTW9yZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS12ZXJ0XCJcblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIEVtcHR5LENvbW1lbnQsQ29tbWFuZEJhcixQaG90byxNZXNzYWdlcixJY29uc309VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbi8qKlxuQCB3aXRoIGN1cnJlbnRDaGlsZFxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXt0YXNrczpudWxsfVxuXHR9XG5cdFxuXHRnZXREYXRhKHdoZW4pe1xuXHRcdGRiVGFzay5maW5kKC8qe3N0YXR1czpcInNjaGVkdWxlZFwiLGNoaWxkOnRoaXMucHJvcHMuY2hpbGQuX2lkLCBzY2hlZHVsZWRBdDp3aGVufSovKS5mZXRjaCh0YXNrcz0+e1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdH0pXG5cdH1cblx0XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMuX3BhcnNlRGF0ZSh0aGlzLnByb3BzLnBhcmFtcy53aGVuKSlcblx0fVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy53aGVuIT1uZXh0UHJvcHMucGFyYW1zLndoZW4pXG5cdFx0XHR0aGlzLmdldERhdGEodGhpcy5fcGFyc2VEYXRlKG5leHRQcm9wcy5wYXJhbXMud2hlbikpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0dmFyIHdoZW49dGhpcy5fcGFyc2VEYXRlKHRoaXMucHJvcHMucGFyYW1zLndoZW4pXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxMaXN0IG1vZGVsPXt0aGlzLnN0YXRlLnRhc2tzfVxuXHRcdFx0XHRcdGVtcHR5PXs8RW1wdHkgaWNvbj17PExvZ28vPn0vPn1cblx0XHRcdFx0XHR0ZW1wbGF0ZT17dGhpcy5wcm9wcy50ZW1wbGF0ZXx8dGhpcy5jb25zdHJ1Y3Rvci5JdGVtfS8+XG5cdFx0XHRcdDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwiS25vd2xlZGdlc1wiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCLku4rlpKlcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6IGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInRhc2tzL3RvZGF5XCIpfSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCLmmI7lpKlcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6IGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInRhc2tzL3RvbW9ycm93XCIpfSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCIuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5yZWZzLnRhc2suc2hvdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbk1vcmV9XG5cdFx0XHRcdFx0XX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VGFza3MuVGFza1F1ZXJ5Q29tbWFuZCByZWY9XCJ0YXNrXCIgd2hlbj17d2hlbn1cblx0XHRcdFx0XHRvbkNoYW5nZT17KGQsbmFtZSk9Pntcblx0XHRcdFx0XHRcdHN3aXRjaChNYXRoLmZsb29yKChEYXRlLm5vdygpLWQuZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpKXtcblx0XHRcdFx0XHRcdFx0Y2FzZSAwOiAgXG5cdFx0XHRcdFx0XHRcdFx0bmFtZT0ndG9kYXknXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdGNhc2UgMTogXG5cdFx0XHRcdFx0XHRcdFx0bmFtZT0neWVzdGVyZGF5J1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRjYXNlIC0xOiBcblx0XHRcdFx0XHRcdFx0XHRuYW1lPSd0b21vcnJvdydcblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRuYW1lPWQuZ2V0RnVsbFllYXIoKSsnLScrKGQuZ2V0TW9udGgoKSsxKSsnLScrZC5nZXREYXRlKClcblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgdGFza3MvJHtuYW1lfWApXG5cdFx0XHRcdFx0fX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cdFxuICAgIF9wYXJzZURhdGUod2hlbj0ndG9kYXknKXtcbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKClcbiAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgc3dpdGNoKHdoZW4pe1xuICAgICAgICBjYXNlICd0b2RheSc6XG4gICAgICAgICAgICByZXR1cm4gdG9kYXlcbiAgICAgICAgY2FzZSAneWVzdGVyZGF5JzpcbiAgICAgICAgICAgIHJldHVybiBhZGREYXlzKHRvZGF5LC0xKVxuICAgICAgICBjYXNlICd0b21vcnJvdyc6XG4gICAgICAgICAgICByZXR1cm4gYWRkRGF5cyh0b2RheSwxKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgd2hlbj1uZXcgRGF0ZShEYXRlLnBhcnNlKHdoZW4pKVxuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHRcblx0c3RhdGljIEl0ZW09Y2xhc3MgIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHJlbmRlcigpe1xuXHRcdFx0dmFyIHttb2RlbDp0YXNrLCBpbWFnZSwgYWN0aW9ucywgLi4ub3RoZXJzfT10aGlzLnByb3BzLFxuXHRcdFx0XHR7a25vd2xlZGdlfT10YXNrO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJsaVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiIG9uQ2xpY2s9e3RoaXMub25EZXRhaWwuYmluZCh0aGlzKX0+XG5cdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHQ8aDQ+e3Rhc2sua25vd2xlZGdlLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGhvdG9cIj5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e3Rhc2sucGhvdG98fGltYWdlfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHRcdG9uRGV0YWlsKCl7XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmB0YXNrLyR7dGhpcy5wcm9wcy5tb2RlbC5faWR9YCwgc3RhdGU6e3Rhc2s6dGhpcy5wcm9wcy5tb2RlbH19KVxuXHRcdH1cblx0XHRzdGF0aWMgZGVmYXVsdFByb3BzPXtpbWFnZTpcImltYWdlcy90YXNrLmpwZ1wifVxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHR9XG5cdFxuXHRzdGF0aWMgQXBwcm92aW5ncz1jbGFzcyBleHRlbmRzIFRhc2tze1xuXHRcdGdldERhdGEoKXtcblx0XHRcdGRiVGFzay5maW5kKC8qe3N0YXR1czpcImZpbmlzaGVkXCIsY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWR9Ki8pLmZldGNoKHRhc2tzPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0X3BhcnNlRGF0ZSgpe1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdFx0XG5cdFx0c3RhdGljIEl0ZW09Y2xhc3MgZXh0ZW5kcyBUYXNrcy5JdGVte1xuXHRcdFx0XG5cdFx0fVxuXHR9XG5cdFxuXHRzdGF0aWMgVGFza1F1ZXJ5Q29tbWFuZD1jbGFzcyBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0dmFyIHt3aGVuLCBvbkNoYW5nZX09dGhpcy5wcm9wc1xuXHRcdFx0XHQsbm93PW5ldyBEYXRlKClcblx0XHRcdHJldHVybiAoPGRpdiBrZXk9XCJjYWxlbmRhclwiPlxuXHRcdFx0XHRcdFx0ezxDYWxlbmRhclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17d2hlbn1cblx0XHRcdFx0XHRcdFx0bXVsdGlwbGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5RGF0ZT17bm93fVxuXHRcdFx0XHRcdFx0XHRtaW5EYXRlPXthZGREYXlzKG5vdywtMzEpfVxuXHRcdFx0XHRcdFx0XHRtYXhEYXRlPXthZGREYXlzKG5vdywzMSl9XG5cdFx0XHRcdFx0XHRcdG9uRGF5VG91Y2hUYXA9e29uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHQgLz59XG5cdFx0XHRcdFx0PC9kaXY+KVxuXHRcdH1cblx0fVxufVxuXG5cbiJdfQ==