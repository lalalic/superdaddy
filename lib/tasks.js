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
				_qiliApp.React.createElement(
					List,
					{ model: this.state.tasks,
						empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_logo2.default, null) }),
						template: this.props.template || this.constructor.Item },
					_qiliApp.React.createElement(
						_materialUi.Subheader,
						null,
						_qiliApp.React.createElement(
							'h2',
							null,
							_qiliApp.React.createElement(
								'center',
								null,
								this.props.params.when || 'today'
							)
						)
					),
					_qiliApp.React.createElement(_materialUi.Divider, { inset: false })
				),
				_qiliApp.React.createElement(CommandBar, {
					className: 'footbar',
					primary: 'Knowledges',
					items: [{ action: "今天",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPO0lBQU07SUFBUztJQUFNO0lBQVE7SUFBVztJQUFNO0lBQVM7SUFDdkQsZ0JBQWUsV0FBZjs7Ozs7O0lBS2M7OztBQUNwQixVQURvQixLQUNwQixHQUFhO3dCQURPLE9BQ1A7O3FFQURPLG1CQUVWLFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVcsRUFBQyxPQUFNLElBQU4sRUFBWixDQUZZOztFQUFiOztjQURvQjs7MEJBTVosTUFBSzs7O0FBQ1osWUFBTyxJQUFQLHlFQUFtRixLQUFuRixDQUF5RixpQkFBTztBQUMvRixXQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZCxFQUQrRjtJQUFQLENBQXpGLENBRFk7Ozs7c0NBTU07QUFDbEIsUUFBSyxPQUFMLENBQWEsS0FBSyxVQUFMLENBQWdCLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsQ0FBN0IsRUFEa0I7Ozs7NENBSVUsV0FBVTtBQUNoQyxPQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsSUFBd0IsVUFBVSxNQUFWLENBQWlCLElBQWpCLEVBQ2hDLEtBQUssT0FBTCxDQUFhLEtBQUssVUFBTCxDQUFnQixVQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBN0IsRUFESzs7OzsyQkFJSTs7O0FBQ1YsT0FBSSxPQUFLLEtBQUssVUFBTCxDQUFnQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLElBQWxCLENBQXJCLENBRE07QUFFSixVQUNJOzs7SUFDSTtBQUFDLFNBQUQ7T0FBTSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDeEIsYUFBTyw2QkFBQyxLQUFELElBQU8sTUFBTSxrREFBTixFQUFQLENBQVA7QUFDQSxnQkFBVSxLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXFCLEtBQUssV0FBTCxDQUFpQixJQUFqQixFQUZwQjtLQUdYOzs7TUFBVzs7O09BQUk7OztRQUFTLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsSUFBd0IsT0FBeEI7UUFBYjtPQUFYO01BSFc7S0FJWCxvREFBUyxPQUFPLEtBQVAsRUFBVCxDQUpXO0tBREo7SUFPUiw2QkFBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBQVY7QUFDQSxjQUFRLFlBQVI7QUFDQSxZQUFPLENBQ3JCLEVBQUMsUUFBTyxJQUFQO0FBQ0EsZ0JBQVU7Y0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLGFBQXpCO09BQUgsRUFGVSxFQUdyQixFQUFDLFFBQU8sSUFBUDtBQUNBLGdCQUFVO2NBQUcsT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUF5QixnQkFBekI7T0FBSCxFQUpVLEVBS3JCLEVBQUMsUUFBTyxLQUFQO0FBQ3FCLGdCQUFTO2NBQUksT0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWY7T0FBSjtBQUNULDhCQUZ0QixFQUxxQixDQUFQO0tBSGhCLENBUFE7SUFvQkksNkJBQUMsTUFBTSxnQkFBUCxJQUF3QixLQUFJLE1BQUosRUFBVyxNQUFNLElBQU47QUFDOUMsZUFBVSxrQkFBQyxDQUFELEVBQUcsSUFBSCxFQUFVO0FBQ25CLGNBQU8sS0FBSyxLQUFMLENBQVcsQ0FBQyxLQUFLLEdBQUwsS0FBVyxFQUFFLE9BQUYsRUFBWCxDQUFELElBQTBCLE9BQUssRUFBTCxHQUFRLEVBQVIsR0FBVyxFQUFYLENBQTFCLENBQWxCO0FBQ0MsWUFBSyxDQUFMO0FBQ0MsZUFBSyxPQUFMLENBREQ7QUFFQSxjQUZBO0FBREQsWUFJTSxDQUFMO0FBQ0MsZUFBSyxXQUFMLENBREQ7QUFFQSxjQUZBO0FBSkQsWUFPTSxDQUFDLENBQUQ7QUFDSixlQUFLLFVBQUwsQ0FERDtBQUVBLGNBRkE7QUFQRDtBQVdFLGVBQUssRUFBRSxXQUFGLEtBQWdCLEdBQWhCLElBQXFCLEVBQUUsUUFBRixLQUFhLENBQWIsQ0FBckIsR0FBcUMsR0FBckMsR0FBeUMsRUFBRSxPQUFGLEVBQXpDLENBRE47QUFFQSxjQUZBO0FBVkQsT0FEbUI7QUFlbkIsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixZQUFrQyxJQUFsQyxFQWZtQjtNQUFWLEVBREMsQ0FwQko7SUFESixDQUZJOzs7OytCQTZDZ0I7T0FBYiw2REFBSyx1QkFBUTs7QUFDcEIsT0FBSSxRQUFNLElBQUksSUFBSixFQUFOLENBRGdCO0FBRXBCLFNBQU0sUUFBTixDQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFGb0I7QUFHcEIsV0FBTyxJQUFQO0FBQ0EsU0FBSyxPQUFMO0FBQ0ksWUFBTyxLQUFQLENBREo7QUFEQSxTQUdLLFdBQUw7QUFDSSxZQUFPLHVCQUFRLEtBQVIsRUFBYyxDQUFDLENBQUQsQ0FBckIsQ0FESjtBQUhBLFNBS0ssVUFBTDtBQUNJLFlBQU8sdUJBQVEsS0FBUixFQUFjLENBQWQsQ0FBUCxDQURKO0FBTEE7QUFRSSxZQUFLLElBQUksSUFBSixDQUFTLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBVCxDQUFMLENBREo7QUFFSSxVQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBRko7QUFHSSxZQUFPLElBQVAsQ0FISjtBQVBBLElBSG9COzs7O1FBbEVQOzs7TUFtRmIsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBbkZSLE1BcUZiOzs7Ozs7Ozs7OzsyQkFDRTtnQkFDcUMsS0FBSyxLQUFMLENBRHJDO09BQ0ksY0FBTixNQURFO09BQ1UscUJBRFY7T0FDaUIseUJBRGpCO0FBQ0gsT0FBZ0Msd0VBQWhDLENBREc7T0FFTCxZQUFXLEtBQVgsVUFGSzs7QUFHUCxVQUNDOztNQUFLLFdBQVUsSUFBVixFQUFMO0lBQ0M7O09BQUssV0FBVSxTQUFWLEVBQW9CLFNBQVMsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFULEVBQXpCO0tBQ0M7OztNQUNDOzs7T0FBSyxLQUFLLFNBQUwsQ0FBZSxLQUFmO09BRE47TUFERDtLQUlDOztRQUFLLFdBQVUsT0FBVixFQUFMO01BQ0Msc0NBQUssS0FBSyxLQUFLLEtBQUwsSUFBWSxLQUFaLEVBQVYsQ0FERDtNQUpEO0tBREQ7SUFERCxDQUhPOzs7OzZCQWdCRTtBQUNULFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsRUFBQyxvQkFBaUIsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixHQUFqQixFQUF3QixPQUFNLEVBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQVosRUFBbkUsRUFEUzs7Ozs7OEJBR0gsZUFBYSxFQUFDLE9BQU0saUJBQU4sV0FDZCxlQUFhLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUExR1QsTUE2R2I7Ozs7Ozs7Ozs7OzRCQUNHOzs7QUFDUixZQUFPLElBQVAsc0RBQWdFLEtBQWhFLENBQXNFLGlCQUFPO0FBQzVFLFdBQUssUUFBTCxDQUFjLEVBQUMsWUFBRCxFQUFkLEVBRDRFO0lBQVAsQ0FBdEUsQ0FEUTs7OzsrQkFNRztBQUNYLFVBQU8sSUFBUCxDQURXOzs7OztFQVBtQixnQkFXeEI7Ozs7Ozs7Ozs7RUFBbUIsTUFBTSxJQUFOOztBQXhIUCxNQTZIYjs7Ozs7Ozs7Ozs7a0NBQ1M7aUJBQ08sS0FBSyxLQUFMLENBRFA7T0FDVCxvQkFEUztBQUNWLE9BQU8sMkJBQVAsQ0FEVTtBQUVaLGFBQUksSUFBSSxJQUFKLEVBQUosQ0FGWTtBQUdkLFVBQVE7O01BQUssV0FBVSxVQUFWLEVBQUw7SUFDSjtBQUNBLHFCQUFnQixDQUFoQjtBQUNBLFdBQUssV0FBTDtBQUNBLGVBQVUsSUFBVjtBQUNBLGtCQUFhLEdBQWI7QUFDQSxjQUFTLEdBQVQ7QUFDQSxjQUFTLGlDQUFrQixHQUFsQixDQUFUO0FBQ0Esb0JBQWUsdUJBQUMsQ0FBRCxFQUFHLEdBQUg7YUFBUyxTQUFTLEdBQVQ7TUFBVDtLQVBmLENBREk7SUFBUixDQUhjOzs7OztFQURzQjs7a0JBN0hsQiIsImZpbGUiOiJ0YXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7U3ViaGVhZGVyLCBEaXZpZGVyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciwge2FkZERheXMsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG4vKipcbkAgd2l0aCBjdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrcyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17dGFza3M6bnVsbH1cblx0fVxuXG5cdGdldERhdGEod2hlbil7XG5cdFx0ZGJUYXNrLmZpbmQoLyp7c3RhdHVzOlwic2NoZWR1bGVkXCIsY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWQsIHNjaGVkdWxlZEF0OndoZW59Ki8pLmZldGNoKHRhc2tzPT57XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0fSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMuX3BhcnNlRGF0ZSh0aGlzLnByb3BzLnBhcmFtcy53aGVuKSlcblx0fVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy53aGVuIT1uZXh0UHJvcHMucGFyYW1zLndoZW4pXG5cdFx0XHR0aGlzLmdldERhdGEodGhpcy5fcGFyc2VEYXRlKG5leHRQcm9wcy5wYXJhbXMud2hlbikpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0dmFyIHdoZW49dGhpcy5fcGFyc2VEYXRlKHRoaXMucHJvcHMucGFyYW1zLndoZW4pXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxMaXN0IG1vZGVsPXt0aGlzLnN0YXRlLnRhc2tzfVxuXHRcdFx0XHRcdGVtcHR5PXs8RW1wdHkgaWNvbj17PExvZ28vPn0vPn1cblx0XHRcdFx0XHR0ZW1wbGF0ZT17dGhpcy5wcm9wcy50ZW1wbGF0ZXx8dGhpcy5jb25zdHJ1Y3Rvci5JdGVtfT5cblx0XHRcdFx0XHQ8U3ViaGVhZGVyPjxoMj48Y2VudGVyPnt0aGlzLnByb3BzLnBhcmFtcy53aGVufHwndG9kYXknfTwvY2VudGVyPjwvaDI+PC9TdWJoZWFkZXI+XG5cdFx0XHRcdFx0PERpdmlkZXIgaW5zZXQ9e2ZhbHNlfS8+XG5cdFx0XHRcdDwvTGlzdD5cblx0XHRcdFx0PENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJLbm93bGVkZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcblx0XHRcdFx0XHRcdHthY3Rpb246XCLku4rlpKlcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6IGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInRhc2tzL3RvZGF5XCIpfSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCLmmI7lpKlcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6IGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInRhc2tzL3RvbW9ycm93XCIpfSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCIuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5yZWZzLnRhc2suc2hvdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbk1vcmV9XG5cdFx0XHRcdFx0XX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VGFza3MuVGFza1F1ZXJ5Q29tbWFuZCByZWY9XCJ0YXNrXCIgd2hlbj17d2hlbn1cblx0XHRcdFx0XHRvbkNoYW5nZT17KGQsbmFtZSk9Pntcblx0XHRcdFx0XHRcdHN3aXRjaChNYXRoLmZsb29yKChEYXRlLm5vdygpLWQuZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpKXtcblx0XHRcdFx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9J3RvZGF5J1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0XHRcdFx0bmFtZT0neWVzdGVyZGF5J1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRjYXNlIC0xOlxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9J3RvbW9ycm93J1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdG5hbWU9ZC5nZXRGdWxsWWVhcigpKyctJysoZC5nZXRNb250aCgpKzEpKyctJytkLmdldERhdGUoKVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGB0YXNrcy8ke25hbWV9YClcblx0XHRcdFx0XHR9fS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9wYXJzZURhdGUod2hlbj0ndG9kYXknKXtcbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKClcbiAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgc3dpdGNoKHdoZW4pe1xuICAgICAgICBjYXNlICd0b2RheSc6XG4gICAgICAgICAgICByZXR1cm4gdG9kYXlcbiAgICAgICAgY2FzZSAneWVzdGVyZGF5JzpcbiAgICAgICAgICAgIHJldHVybiBhZGREYXlzKHRvZGF5LC0xKVxuICAgICAgICBjYXNlICd0b21vcnJvdyc6XG4gICAgICAgICAgICByZXR1cm4gYWRkRGF5cyh0b2RheSwxKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgd2hlbj1uZXcgRGF0ZShEYXRlLnBhcnNlKHdoZW4pKVxuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuXHRzdGF0aWMgSXRlbT1jbGFzcyAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHR2YXIge21vZGVsOnRhc2ssIGltYWdlLCBhY3Rpb25zLCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsXG5cdFx0XHRcdHtrbm93bGVkZ2V9PXRhc2s7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxpXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCIgb25DbGljaz17dGhpcy5vbkRldGFpbC5iaW5kKHRoaXMpfT5cblx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdDxoND57dGFzay5rbm93bGVkZ2UudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwaG90b1wiPlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17dGFzay5waG90b3x8aW1hZ2V9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdFx0b25EZXRhaWwoKXtcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YHRhc2svJHt0aGlzLnByb3BzLm1vZGVsLl9pZH1gLCBzdGF0ZTp7dGFzazp0aGlzLnByb3BzLm1vZGVsfX0pXG5cdFx0fVxuXHRcdHN0YXRpYyBkZWZhdWx0UHJvcHM9e2ltYWdlOlwiaW1hZ2VzL3Rhc2suanBnXCJ9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cblxuXHRzdGF0aWMgQXBwcm92aW5ncz1jbGFzcyBleHRlbmRzIFRhc2tze1xuXHRcdGdldERhdGEoKXtcblx0XHRcdGRiVGFzay5maW5kKC8qe3N0YXR1czpcImZpbmlzaGVkXCIsY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWR9Ki8pLmZldGNoKHRhc2tzPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0X3BhcnNlRGF0ZSgpe1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cblx0XHRzdGF0aWMgSXRlbT1jbGFzcyBleHRlbmRzIFRhc2tzLkl0ZW17XG5cblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgVGFza1F1ZXJ5Q29tbWFuZD1jbGFzcyBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0dmFyIHt3aGVuLCBvbkNoYW5nZX09dGhpcy5wcm9wc1xuXHRcdFx0XHQsbm93PW5ldyBEYXRlKClcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJjYWxlbmRhclwiPlxuXHRcdFx0XHRcdFx0ezxDYWxlbmRhclxuXHRcdFx0XHRcdFx0XHRmaXJzdERheU9mV2Vlaz17MH1cblx0XHRcdFx0XHRcdFx0bW9kZT1cImxhbmRzY2FwZVwiXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt3aGVufVxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5RGF0ZT17bm93fVxuXHRcdFx0XHRcdFx0XHRtaW5EYXRlPXtub3d9XG5cdFx0XHRcdFx0XHRcdG1heERhdGU9e2dldExhc3REYXlPZk1vbnRoKG5vdyl9XG5cdFx0XHRcdFx0XHRcdG9uVG91Y2hUYXBEYXk9eyhlLGRheSk9Pm9uQ2hhbmdlKGRheSl9XG5cdFx0XHRcdFx0XHRcdCAvPn1cblx0XHRcdFx0XHQ8L2Rpdj4pXG5cdFx0fVxuXHR9XG59XG4iXX0=