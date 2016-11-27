'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var List = _qiliApp.UI.List,
    Loading = _qiliApp.UI.Loading,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar;

var Task = function (_Component) {
	(0, _inherits3.default)(Task, _Component);

	function Task() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Task);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Task.__proto__ || (0, _getPrototypeOf2.default)(Task)).call.apply(_ref, [this].concat(args))), _this), _this.state = { task: null, active: 0, completed: false }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Task, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJUYXNrIiwic3RhdGUiLCJ0YXNrIiwiYWN0aXZlIiwiY29tcGxldGVkIiwiX2lkIiwicHJvcHMiLCJsb2NhdGlvbiIsInNldFN0YXRlIiwiY3VycmVudCIsImZpbmRPbmUiLCJwYXJhbXMiLCJnZXREYXRhIiwibmV4dFByb3BzIiwiY2hpbGQiLCJjb250ZXh0Iiwia25vd2xlZGdlIiwiY29udGVudCIsInN0ZXBzIiwicm91dGVyIiwicHVzaCIsInRpdGxlIiwibmFtZSIsIm1hcCIsImluZGV4Iiwia2V5IiwiYWx0IiwibWFyZ2luIiwicmVmcyIsInZhbHVlIiwibGVuZ3RoIiwiZmluaXNoIiwidGhlbiIsInVwc2VydCIsInVwZGF0ZWQiLCJvblNlbGVjdCIsImNtZCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7SUFHT0EsSSxlQUFBQSxJO0lBQU1DLE8sZUFBQUEsTztJQUFTQyxPLGVBQUFBLE87SUFBU0MsVSxlQUFBQSxVOztJQUdWQyxJOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLEssR0FBTSxFQUFDQyxNQUFLLElBQU4sRUFBWUMsUUFBTyxDQUFuQixFQUFzQkMsV0FBVSxLQUFoQyxFOzs7OzswQkFFREMsRyxFQUFJO0FBQUE7O0FBQUEsT0FDTkosS0FETSxHQUNDLEtBQUtLLEtBQUwsQ0FBV0MsUUFEWixDQUNOTixLQURNOztBQUVYLE9BQUdBLFNBQVNBLE1BQU1DLElBQWxCLEVBQ0MsS0FBS00sUUFBTCxDQUFjLEVBQUNOLE1BQUtELE1BQU1DLElBQVosRUFBa0JDLFFBQU9GLE1BQU1DLElBQU4sQ0FBV08sT0FBcEMsRUFBZCxFQURELEtBR0MsZUFBT0MsT0FB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TCxDQUFjLEVBQUNKLFdBQVUsSUFBWCxFQUFkLENBQUg7QUFBQSxhQURQLEVBREQsS0FJQyxlQUFPNkIsTUFBUCxDQUFjL0IsSUFBZCxFQUNFOEIsSUFERixDQUNPO0FBQUEsb0JBQVMsT0FBS3hCLFFBQUwsQ0FBYyxFQUFDTCxRQUFPK0IsUUFBUXpCLE9BQVIsR0FBZ0IsQ0FBeEIsRUFBZCxDQUFUO0FBQUEsYUFEUDtBQUVELFlBVkQ7QUFGRjtBQU5EO0FBRkQsUUFEb0I7QUFBQSxPQUFwQjtBQUREO0FBRkQsS0FMRDtBQXFDQyxrQ0FBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBRDFCO0FBRWdCLGVBQVU7QUFBQSxhQUFLLE9BQUswQixRQUFMLENBQWNDLEdBQWQsQ0FBTDtBQUFBLE1BRjFCO0FBR2dCLFlBQU8sQ0FBQyxNQUFELEVBQ0gsOEJBQUMsVUFBRCxDQUFZLE9BQVosSUFBb0Isb0JBQXBCLEVBQWtDLE9BQU9sQyxJQUF6QyxFQUErQyxLQUFJLFNBQW5ELEdBREcsRUFFSCw4QkFBQyxVQUFELENBQVksS0FBWixJQUFrQixTQUFTQSxJQUEzQixFQUFpQyxLQUFJLE9BQXJDLEdBRkcsQ0FIdkI7QUFyQ0QsSUFESztBQThDSDs7Ozs7QUExRWdCRixJLENBNEVicUMsWSxHQUFhO0FBQ2JsQixTQUFPLGlCQUFVbUIsTUFESjtBQUVieEIsUUFBTyxpQkFBVXdCO0FBRkosQztrQkE1RUF0QyxJIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VXNlcixVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcbmltcG9ydCBkYkZhbWlseSBmcm9tICcuL2RiL2ZhbWlseSdcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9jb21wb25lbnRzL2VkaXRvcidcblxuaW1wb3J0IHtSYWlzZWRCdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge1N0ZXBwZXIsIFN0ZXAsIFN0ZXBDb250ZW50LFN0ZXBCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXG5cblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIENvbW1lbnQsIENvbW1hbmRCYXJ9PVVJXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17dGFzazpudWxsLCBhY3RpdmU6MCwgY29tcGxldGVkOmZhbHNlfVxuXG5cdGdldERhdGEoX2lkKXtcblx0XHRsZXQge3N0YXRlfT10aGlzLnByb3BzLmxvY2F0aW9uXG5cdFx0aWYoc3RhdGUgJiYgc3RhdGUudGFzaylcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2s6c3RhdGUudGFzaywgYWN0aXZlOnN0YXRlLnRhc2suY3VycmVudH0pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWR9LHRhc2s9PnRoaXMuc2V0U3RhdGUoe3Rhc2ssIGFjdGl2ZTp0YXNrLmN1cnJlbnR9KSlcblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHt0YXNrLCBhY3RpdmUsIGNvbXBsZXRlZH09dGhpcy5zdGF0ZSwge2NoaWxkfT10aGlzLmNvbnRleHRcbiAgICAgICAgaWYoIXRhc2spXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgY29uc3Qge2tub3dsZWRnZSwgY29udGVudCwgY3VycmVudH09dGFza1xuXHRcdGNvbnN0IHtzdGVwc309a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdDxoMSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGtub3dsZWRnZS8ke2tub3dsZWRnZS5faWR9YCl9Pntrbm93bGVkZ2UudGl0bGV9PC9oMT5cblx0XHRcdFx0PC9oZWFkZXI+XG5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbXBsZXRlZCAmJiA8ZGl2Plwi5oGt5ZacJHtjaGlsZC5uYW1lfSzkvaDlt7Lnu4/lrozmiJDkuobmnKzor77nqIshXCI8L2Rpdj59XG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGxpbmVhcj17ZmFsc2V9IGFjdGl2ZVN0ZXA9e2FjdGl2ZX0+XG5cdFx0XHRcdFx0e2tub3dsZWRnZS5zdGVwcy5tYXAoKHtrZXksYWx0fSwgaW5kZXgpPT4oXG5cdFx0XHRcdFx0XHQ8U3RlcCBrZXk9e2tleX0gY29tcGxldGVkPXtpbmRleDxjdXJyZW50fT5cblx0XHRcdFx0XHRcdFx0PFN0ZXBCdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOmluZGV4fSl9PntrZXl9PC9TdGVwQnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8U3RlcENvbnRlbnQ+XG5cdFx0XHRcdFx0XHRcdFx0e2FsdCAmJiA8cD57YWx0fTwvcD59XG5cdFx0XHRcdFx0XHRcdFx0PEVkaXRvciByZWY9e2BlZGl0b3ItJHtrZXl9YH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9e2NvbnRlbnRba2V5XX1cblx0XHRcdFx0XHRcdFx0XHRcdGFwcGVuZGFibGU9e2luZGV4PT1jdXJyZW50fS8+XG5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7bWFyZ2luOjEwfX0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7aW5kZXg9PWN1cnJlbnQgJiZcblx0XHRcdFx0XHRcdFx0XHRcdCg8UmFpc2VkQnV0dG9uIHByaW1hcnk9e3RydWV9IGxhYmVsPVwi5a6M5oiQXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2suY29udGVudFtrZXldPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdLnZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFzay5jdXJyZW50PWluZGV4XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoc3RlcHMubGVuZ3RoPT1pbmRleCsxKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJUYXNrLmZpbmlzaCh0YXNrKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtjb21wbGV0ZWQ6dHJ1ZX0pKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRiVGFzay51cHNlcnQodGFzaylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4odXBkYXRlZD0+dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOnVwZGF0ZWQuY3VycmVudCsxfSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19Lz4pfVxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L1N0ZXBDb250ZW50PlxuXHRcdFx0XHRcdFx0PC9TdGVwPlxuXHRcdFx0XHRcdCkpfVxuXHRcdFx0XHRcdDwvU3RlcHBlcj5cblx0XHRcdFx0PC9zZWN0aW9uPlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tZW50IHR5cGU9e2RiVGFza30gbW9kZWw9e3Rhc2t9IGtleT1cImNvbW1lbnRcIi8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuU2hhcmUgbWVzc2FnZT17dGFza30ga2V5PVwic2hhcmVcIi8+XX0vPlxuXHRcdFx0PC9hcnRpY2xlPlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICByb3V0ZXI6UHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2hpbGQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG59XG4iXX0=