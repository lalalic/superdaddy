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

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;

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

			var _state = this.state;
			var task = _state.task;
			var active = _state.active;
			var completed = _state.completed;var child = this.context.child;

			if (!task) return _react2.default.createElement(Loading, null);

			var knowledge = task.knowledge;
			var content = task.content;
			var current = task.current;
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
							var key = _ref2.key;
							var alt = _ref2.alt;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJUYXNrIiwic3RhdGUiLCJ0YXNrIiwiYWN0aXZlIiwiY29tcGxldGVkIiwiX2lkIiwicHJvcHMiLCJsb2NhdGlvbiIsInNldFN0YXRlIiwiY3VycmVudCIsImZpbmRPbmUiLCJwYXJhbXMiLCJnZXREYXRhIiwibmV4dFByb3BzIiwiY2hpbGQiLCJjb250ZXh0Iiwia25vd2xlZGdlIiwiY29udGVudCIsInN0ZXBzIiwicm91dGVyIiwicHVzaCIsInRpdGxlIiwibmFtZSIsIm1hcCIsImluZGV4Iiwia2V5IiwiYWx0IiwibWFyZ2luIiwicmVmcyIsInZhbHVlIiwibGVuZ3RoIiwiZmluaXNoIiwidGhlbiIsInVwc2VydCIsInVwZGF0ZWQiLCJvblNlbGVjdCIsImNtZCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFHT0EsSSxlQUFBQSxJO0lBQU1DLE8sZUFBQUEsTztJQUFTQyxPLGVBQUFBLE87SUFBU0MsVSxlQUFBQSxVOztJQUdWQyxJOzs7Ozs7Ozs7Ozs7OztnTEFDakJDLEssR0FBTSxFQUFDQyxNQUFLLElBQU4sRUFBWUMsUUFBTyxDQUFuQixFQUFzQkMsV0FBVSxLQUFoQyxFOzs7OzswQkFFREMsRyxFQUFJO0FBQUE7O0FBQUEsT0FDTkosS0FETSxHQUNDLEtBQUtLLEtBQUwsQ0FBV0MsUUFEWixDQUNOTixLQURNOztBQUVYLE9BQUdBLFNBQVNBLE1BQU1DLElBQWxCLEVBQ0MsS0FBS00sUUFBTCxDQUFjLEVBQUNOLE1BQUtELE1BQU1DLElBQVosRUFBa0JDLFFBQU9GLE1BQU1DLElBQU4sQ0FBV08sT0FBcEMsRUFBZCxFQURELEtBR0MsZUFBT0MsT0FBUCxDQUFlLEVBQUNM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VSxJQUFYLEVBQWQsQ0FBSDtBQUFBLGFBRFAsRUFERCxLQUlDLGVBQU82QixNQUFQLENBQWMvQixJQUFkLEVBQ0U4QixJQURGLENBQ087QUFBQSxvQkFBUyxPQUFLeEIsUUFBTCxDQUFjLEVBQUNMLFFBQU8rQixRQUFRekIsT0FBUixHQUFnQixDQUF4QixFQUFkLENBQVQ7QUFBQSxhQURQO0FBRUQsWUFWRDtBQUZGO0FBTkQ7QUFGRCxRQURvQjtBQUFBLE9BQXBCO0FBREQ7QUFGRCxLQUxEO0FBcUNDLGtDQUFDLFVBQUQ7QUFDZ0IsZ0JBQVUsU0FEMUI7QUFFZ0IsZUFBVTtBQUFBLGFBQUssT0FBSzBCLFFBQUwsQ0FBY0MsR0FBZCxDQUFMO0FBQUEsTUFGMUI7QUFHZ0IsWUFBTyxDQUFDLE1BQUQsRUFDSCw4QkFBQyxVQUFELENBQVksT0FBWixJQUFvQixvQkFBcEIsRUFBa0MsT0FBT2xDLElBQXpDLEVBQStDLEtBQUksU0FBbkQsR0FERyxFQUVILDhCQUFDLFVBQUQsQ0FBWSxLQUFaLElBQWtCLFNBQVNBLElBQTNCLEVBQWlDLEtBQUksT0FBckMsR0FGRyxDQUh2QjtBQXJDRCxJQURLO0FBOENIOzs7Ozs7QUExRWdCRixJLENBNEVicUMsWSxHQUFhO0FBQ2JsQixTQUFPLGlCQUFVbUIsTUFESjtBQUVieEIsUUFBTyxpQkFBVXdCO0FBRkosQztrQkE1RUF0QyxJIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VXNlcixVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcbmltcG9ydCBkYkZhbWlseSBmcm9tICcuL2RiL2ZhbWlseSdcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9jb21wb25lbnRzL2VkaXRvcidcblxuaW1wb3J0IHtSYWlzZWRCdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge1N0ZXBwZXIsIFN0ZXAsIFN0ZXBDb250ZW50LFN0ZXBCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXG5cblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIENvbW1lbnQsIENvbW1hbmRCYXJ9PVVJXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17dGFzazpudWxsLCBhY3RpdmU6MCwgY29tcGxldGVkOmZhbHNlfVxuXG5cdGdldERhdGEoX2lkKXtcblx0XHRsZXQge3N0YXRlfT10aGlzLnByb3BzLmxvY2F0aW9uXG5cdFx0aWYoc3RhdGUgJiYgc3RhdGUudGFzaylcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2s6c3RhdGUudGFzaywgYWN0aXZlOnN0YXRlLnRhc2suY3VycmVudH0pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWR9LHRhc2s9PnRoaXMuc2V0U3RhdGUoe3Rhc2ssIGFjdGl2ZTp0YXNrLmN1cnJlbnR9KSlcblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHt0YXNrLCBhY3RpdmUsIGNvbXBsZXRlZH09dGhpcy5zdGF0ZSwge2NoaWxkfT10aGlzLmNvbnRleHRcbiAgICAgICAgaWYoIXRhc2spXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgY29uc3Qge2tub3dsZWRnZSwgY29udGVudCwgY3VycmVudH09dGFza1xuXHRcdGNvbnN0IHtzdGVwc309a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdDxoMSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGtub3dsZWRnZS8ke2tub3dsZWRnZS5faWR9YCl9Pntrbm93bGVkZ2UudGl0bGV9PC9oMT5cblx0XHRcdFx0PC9oZWFkZXI+XG5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbXBsZXRlZCAmJiA8ZGl2Plwi5oGt5ZacJHtjaGlsZC5uYW1lfSzkvaDlt7Lnu4/lrozmiJDkuobmnKzor77nqIshXCI8L2Rpdj59XG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGxpbmVhcj17ZmFsc2V9IGFjdGl2ZVN0ZXA9e2FjdGl2ZX0+XG5cdFx0XHRcdFx0e2tub3dsZWRnZS5zdGVwcy5tYXAoKHtrZXksYWx0fSwgaW5kZXgpPT4oXG5cdFx0XHRcdFx0XHQ8U3RlcCBrZXk9e2tleX0gY29tcGxldGVkPXtpbmRleDxjdXJyZW50fT5cblx0XHRcdFx0XHRcdFx0PFN0ZXBCdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOmluZGV4fSl9PntrZXl9PC9TdGVwQnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8U3RlcENvbnRlbnQ+XG5cdFx0XHRcdFx0XHRcdFx0e2FsdCAmJiA8cD57YWx0fTwvcD59XG5cdFx0XHRcdFx0XHRcdFx0PEVkaXRvciByZWY9e2BlZGl0b3ItJHtrZXl9YH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9e2NvbnRlbnRba2V5XX1cblx0XHRcdFx0XHRcdFx0XHRcdGFwcGVuZGFibGU9e2luZGV4PT1jdXJyZW50fS8+XG5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7bWFyZ2luOjEwfX0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7aW5kZXg9PWN1cnJlbnQgJiZcblx0XHRcdFx0XHRcdFx0XHRcdCg8UmFpc2VkQnV0dG9uIHByaW1hcnk9e3RydWV9IGxhYmVsPVwi5a6M5oiQXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2suY29udGVudFtrZXldPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdLnZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFzay5jdXJyZW50PWluZGV4XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoc3RlcHMubGVuZ3RoPT1pbmRleCsxKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJUYXNrLmZpbmlzaCh0YXNrKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtjb21wbGV0ZWQ6dHJ1ZX0pKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRiVGFzay51cHNlcnQodGFzaylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4odXBkYXRlZD0+dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOnVwZGF0ZWQuY3VycmVudCsxfSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19Lz4pfVxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L1N0ZXBDb250ZW50PlxuXHRcdFx0XHRcdFx0PC9TdGVwPlxuXHRcdFx0XHRcdCkpfVxuXHRcdFx0XHRcdDwvU3RlcHBlcj5cblx0XHRcdFx0PC9zZWN0aW9uPlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tZW50IHR5cGU9e2RiVGFza30gbW9kZWw9e3Rhc2t9IGtleT1cImNvbW1lbnRcIi8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuU2hhcmUgbWVzc2FnZT17dGFza30ga2V5PVwic2hhcmVcIi8+XX0vPlxuXHRcdFx0PC9hcnRpY2xlPlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICByb3V0ZXI6UHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2hpbGQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG59XG4iXX0=