'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require('qili-app');

var _task = require('./db/task');

var _task2 = _interopRequireDefault(_task);

var _family = require('./db/family');

var _family2 = _interopRequireDefault(_family);

var _knowledge = require('./knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _editor = require('./components/editor');

var _editor2 = _interopRequireDefault(_editor);

var _materialUi = require('material-ui');

var _Stepper = require('material-ui/Stepper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List,
    Loading = _qiliApp.UI.Loading,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar;

var Task = function (_Component) {
	_inherits(Task, _Component);

	function Task() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Task);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Task.__proto__ || Object.getPrototypeOf(Task)).call.apply(_ref, [this].concat(args))), _this), _this.state = { task: null, active: 0, completed: false }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Task, [{
		key: 'getData',
		value: function getData(_id) {
			var _this2 = this;

			var state = this.props.location.state;

			if (state && state.task) this.setState({ task: state.task, active: state.task.current });else _task2.default.findOne({ _id: this.props.params._id }, function (task) {
				return _this2.setState({ task: task, active: task.current });
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getData(this.props.params._id);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.params._id != nextProps.params._id) this.getData(nextProps.params._id);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state = this.state,
			    task = _state.task,
			    active = _state.active,
			    completed = _state.completed,
			    child = this.context.child;

			if (!task) return _react2.default.createElement(Loading, null);

			var knowledge = task.knowledge,
			    content = task.content,
			    current = task.current;
			var steps = knowledge.steps;


			return _react2.default.createElement(
				'article',
				null,
				_react2.default.createElement(
					'header',
					null,
					_react2.default.createElement(
						'h1',
						{ onClick: function onClick(e) {
								return _this3.context.router.push('knowledge/' + knowledge._id);
							} },
						knowledge.title
					)
				),
				_react2.default.createElement(
					'section',
					null,
					completed && _react2.default.createElement(
						'div',
						null,
						'"\u606D\u559C$',
						child.name,
						',\u4F60\u5DF2\u7ECF\u5B8C\u6210\u4E86\u672C\u8BFE\u7A0B!"'
					),
					_react2.default.createElement(
						_Stepper.Stepper,
						{ orientation: 'vertical', linear: false, activeStep: active },
						knowledge.steps.map(function (_ref2, index) {
							var key = _ref2.key,
							    alt = _ref2.alt;
							return _react2.default.createElement(
								_Stepper.Step,
								{ key: key, completed: index < current },
								_react2.default.createElement(
									_Stepper.StepButton,
									{ onClick: function onClick(e) {
											return _this3.setState({ active: index });
										} },
									key
								),
								_react2.default.createElement(
									_Stepper.StepContent,
									null,
									alt && _react2.default.createElement(
										'p',
										null,
										alt
									),
									_react2.default.createElement(_editor2.default, { ref: 'editor-' + key,
										content: content[key],
										appendable: index == current }),
									_react2.default.createElement(
										'div',
										{ style: { margin: 10 } },
										index == current && _react2.default.createElement(_materialUi.RaisedButton, { primary: true, label: '\u5B8C\u6210',
											onClick: function onClick(e) {
												task.content[key] = _this3.refs['editor-' + key].value;
												task.current = index;
												if (steps.length == index + 1) _task2.default.finish(task).then(function (a) {
													return _this3.setState({ completed: true });
												});else _task2.default.upsert(task).then(function (updated) {
													return _this3.setState({ active: updated.current + 1 });
												});
											} })
									)
								)
							);
						})
					)
				),
				_react2.default.createElement(CommandBar, {
					className: 'footbar',
					onSelect: function onSelect(cmd) {
						return _this3.onSelect(cmd);
					},
					items: ["Back", _react2.default.createElement(CommandBar.Comment, { type: _task2.default, model: task, key: 'comment' }), _react2.default.createElement(CommandBar.Share, { message: task, key: 'share' })] })
			);
		}
	}]);

	return Task;
}(_react.Component);

Task.contextTypes = {
	router: _react.PropTypes.object,
	child: _react.PropTypes.object
};
exports.default = Task;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJUYXNrIiwic3RhdGUiLCJ0YXNrIiwiYWN0aXZlIiwiY29tcGxldGVkIiwiX2lkIiwicHJvcHMiLCJsb2NhdGlvbiIsInNldFN0YXRlIiwiY3VycmVudCIsImZpbmRPbmUiLCJwYXJhbXMiLCJnZXREYXRhIiwibmV4dFByb3BzIiwiY2hpbGQiLCJjb250ZXh0Iiwia25vd2xlZGdlIiwiY29udGVudCIsInN0ZXBzIiwicm91dGVyIiwicHVzaCIsInRpdGxlIiwibmFtZSIsIm1hcCIsImluZGV4Iiwia2V5IiwiYWx0IiwibWFyZ2luIiwicmVmcyIsInZhbHVlIiwibGVuZ3RoIiwiZmluaXNoIiwidGhlbiIsInVwc2VydCIsInVwZGF0ZWQiLCJvblNlbGVjdCIsImNtZCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFHT0EsSSxlQUFBQSxJO0lBQU1DLE8sZUFBQUEsTztJQUFTQyxPLGVBQUFBLE87SUFBU0MsVSxlQUFBQSxVOztJQUdWQyxJOzs7Ozs7Ozs7Ozs7OztnTEFDakJDLEssR0FBTSxFQUFDQyxNQUFLLElBQU4sRUFBWUMsUUFBTyxDQUFuQixFQUFzQkMsV0FBVSxLQUFoQyxFOzs7OzswQkFFREMsRyxFQUFJO0FBQUE7O0FBQUEsT0FDTkosS0FETSxHQUNDLEtBQUtLLEtBQUwsQ0FBV0MsUUFEWixDQUNOTixLQURNOztBQUVYLE9BQUdBLFNBQVNBLE1BQU1DLElBQWxCLEVBQ0MsS0FBS00sUUFBTCxDQUFjLEVBQUNOLE1BQUtELE1BQU1DLElBQVosRUFBa0JDLFFBQU9GLE1BQU1DLElBQU4sQ0FBV08sT0FBcEMsRUFBZCxFQURELEtBR0MsZUFBT0MsT0FBUCxDQUFlLEVBQUNM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LFdBQVUsSUFBWCxFQUFkLENBQUg7QUFBQSxhQURQLEVBREQsS0FJQyxlQUFPNkIsTUFBUCxDQUFjL0IsSUFBZCxFQUNFOEIsSUFERixDQUNPO0FBQUEsb0JBQVMsT0FBS3hCLFFBQUwsQ0FBYyxFQUFDTCxRQUFPK0IsUUFBUXpCLE9BQVIsR0FBZ0IsQ0FBeEIsRUFBZCxDQUFUO0FBQUEsYUFEUDtBQUVELFlBVkQ7QUFGRjtBQU5EO0FBRkQsUUFEb0I7QUFBQSxPQUFwQjtBQUREO0FBRkQsS0FMRDtBQXFDQyxrQ0FBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBRDFCO0FBRWdCLGVBQVU7QUFBQSxhQUFLLE9BQUswQixRQUFMLENBQWNDLEdBQWQsQ0FBTDtBQUFBLE1BRjFCO0FBR2dCLFlBQU8sQ0FBQyxNQUFELEVBQ0gsOEJBQUMsVUFBRCxDQUFZLE9BQVosSUFBb0Isb0JBQXBCLEVBQWtDLE9BQU9sQyxJQUF6QyxFQUErQyxLQUFJLFNBQW5ELEdBREcsRUFFSCw4QkFBQyxVQUFELENBQVksS0FBWixJQUFrQixTQUFTQSxJQUEzQixFQUFpQyxLQUFJLE9BQXJDLEdBRkcsQ0FIdkI7QUFyQ0QsSUFESztBQThDSDs7Ozs7O0FBMUVnQkYsSSxDQTRFYnFDLFksR0FBYTtBQUNibEIsU0FBTyxpQkFBVW1CLE1BREo7QUFFYnhCLFFBQU8saUJBQVV3QjtBQUZKLEM7a0JBNUVBdEMsSSIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VXNlcixVSX0gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCBkYlRhc2sgZnJvbSAnLi9kYi90YXNrJ1xyXG5pbXBvcnQgZGJGYW1pbHkgZnJvbSAnLi9kYi9mYW1pbHknXHJcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcclxuaW1wb3J0IEVkaXRvciBmcm9tICcuL2NvbXBvbmVudHMvZWRpdG9yJ1xyXG5cclxuaW1wb3J0IHtSYWlzZWRCdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7U3RlcHBlciwgU3RlcCwgU3RlcENvbnRlbnQsU3RlcEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcclxuXHJcblxyXG5jb25zdCB7TGlzdCwgTG9hZGluZywgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgc3RhdGU9e3Rhc2s6bnVsbCwgYWN0aXZlOjAsIGNvbXBsZXRlZDpmYWxzZX1cclxuXHJcblx0Z2V0RGF0YShfaWQpe1xyXG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxyXG5cdFx0aWYoc3RhdGUgJiYgc3RhdGUudGFzaylcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFzazpzdGF0ZS50YXNrLCBhY3RpdmU6c3RhdGUudGFzay5jdXJyZW50fSlcclxuXHRcdGVsc2VcclxuXHRcdFx0ZGJUYXNrLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWR9LHRhc2s9PnRoaXMuc2V0U3RhdGUoe3Rhc2ssIGFjdGl2ZTp0YXNrLmN1cnJlbnR9KSlcclxuXHR9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcclxuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3Rhc2ssIGFjdGl2ZSwgY29tcGxldGVkfT10aGlzLnN0YXRlLCB7Y2hpbGR9PXRoaXMuY29udGV4dFxyXG4gICAgICAgIGlmKCF0YXNrKVxyXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXHJcblxyXG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2UsIGNvbnRlbnQsIGN1cnJlbnR9PXRhc2tcclxuXHRcdGNvbnN0IHtzdGVwc309a25vd2xlZGdlXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcblx0XHRcdDxhcnRpY2xlPlxyXG5cdFx0XHRcdDxoZWFkZXI+XHJcblx0XHRcdFx0XHQ8aDEgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBrbm93bGVkZ2UvJHtrbm93bGVkZ2UuX2lkfWApfT57a25vd2xlZGdlLnRpdGxlfTwvaDE+XHJcblx0XHRcdFx0PC9oZWFkZXI+XHJcblxyXG5cdFx0XHRcdDxzZWN0aW9uPlxyXG5cdFx0XHRcdFx0e2NvbXBsZXRlZCAmJiA8ZGl2Plwi5oGt5ZacJHtjaGlsZC5uYW1lfSzkvaDlt7Lnu4/lrozmiJDkuobmnKzor77nqIshXCI8L2Rpdj59XHJcblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgbGluZWFyPXtmYWxzZX0gYWN0aXZlU3RlcD17YWN0aXZlfT5cclxuXHRcdFx0XHRcdHtrbm93bGVkZ2Uuc3RlcHMubWFwKCh7a2V5LGFsdH0sIGluZGV4KT0+KFxyXG5cdFx0XHRcdFx0XHQ8U3RlcCBrZXk9e2tleX0gY29tcGxldGVkPXtpbmRleDxjdXJyZW50fT5cclxuXHRcdFx0XHRcdFx0XHQ8U3RlcEJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHthY3RpdmU6aW5kZXh9KX0+e2tleX08L1N0ZXBCdXR0b24+XHJcblx0XHRcdFx0XHRcdFx0PFN0ZXBDb250ZW50PlxyXG5cdFx0XHRcdFx0XHRcdFx0e2FsdCAmJiA8cD57YWx0fTwvcD59XHJcblx0XHRcdFx0XHRcdFx0XHQ8RWRpdG9yIHJlZj17YGVkaXRvci0ke2tleX1gfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb250ZW50PXtjb250ZW50W2tleV19XHJcblx0XHRcdFx0XHRcdFx0XHRcdGFwcGVuZGFibGU9e2luZGV4PT1jdXJyZW50fS8+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e21hcmdpbjoxMH19PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7aW5kZXg9PWN1cnJlbnQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0KDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gbGFiZWw9XCLlrozmiJBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2suY29udGVudFtrZXldPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdLnZhbHVlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmN1cnJlbnQ9aW5kZXhcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKHN0ZXBzLmxlbmd0aD09aW5kZXgrMSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJUYXNrLmZpbmlzaCh0YXNrKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe2NvbXBsZXRlZDp0cnVlfSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRiVGFzay51cHNlcnQodGFzaylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHthY3RpdmU6dXBkYXRlZC5jdXJyZW50KzF9KSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9fS8+KX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDwvU3RlcENvbnRlbnQ+XHJcblx0XHRcdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdFx0PENvbW1hbmRCYXJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWVudCB0eXBlPXtkYlRhc2t9IG1vZGVsPXt0YXNrfSBrZXk9XCJjb21tZW50XCIvPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuU2hhcmUgbWVzc2FnZT17dGFza30ga2V5PVwic2hhcmVcIi8+XX0vPlxyXG5cdFx0XHQ8L2FydGljbGU+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuICAgICAgICByb3V0ZXI6UHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxyXG4gICAgfVxyXG59XHJcbiJdfQ==