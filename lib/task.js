'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Task);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Task)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { task: null, active: 0, completed: false }, _temp), _possibleConstructorReturn(_this, _ret);
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
			var completed = _state.completed;var child = this.props.child;

			if (!task) return _qiliApp.React.createElement(Loading, null);

			var knowledge = task.knowledge;
			var content = task.content;
			var current = task.current;
			var steps = knowledge.steps;


			return _qiliApp.React.createElement(
				'article',
				null,
				_qiliApp.React.createElement(
					'header',
					null,
					_qiliApp.React.createElement(
						'h1',
						{ onClick: function onClick(e) {
								return _this3.context.router.push('knowledge/' + knowledge._id);
							} },
						knowledge.title
					)
				),
				_qiliApp.React.createElement(
					'section',
					null,
					completed && _qiliApp.React.createElement(
						'div',
						null,
						'"恭喜$',
						child.name,
						',你已经完成了本课程!"'
					),
					_qiliApp.React.createElement(
						_Stepper.Stepper,
						{ orientation: 'vertical', linear: false, activeStep: active },
						knowledge.steps.map(function (_ref, index) {
							var key = _ref.key;
							var alt = _ref.alt;
							return _qiliApp.React.createElement(
								_Stepper.Step,
								{ key: key, completed: index < current },
								_qiliApp.React.createElement(
									_Stepper.StepButton,
									{ onClick: function onClick(e) {
											return _this3.setState({ active: index });
										} },
									key
								),
								_qiliApp.React.createElement(
									_Stepper.StepContent,
									null,
									alt && _qiliApp.React.createElement(
										'p',
										null,
										alt
									),
									_qiliApp.React.createElement(_editor2.default, { ref: 'editor-' + key,
										content: content[key],
										appendable: index == current }),
									_qiliApp.React.createElement(
										'div',
										{ style: { margin: 10 } },
										index == current && _qiliApp.React.createElement(_materialUi.RaisedButton, { primary: true, label: '完成',
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
				_qiliApp.React.createElement(CommandBar, {
					className: 'footbar',
					onSelect: function onSelect(cmd) {
						return _this3.onSelect(cmd);
					},
					items: ["Back", _qiliApp.React.createElement(CommandBar.Comment, { type: _task2.default, model: task, key: 'comment' }), _qiliApp.React.createElement(CommandBar.Share, { message: task, key: 'share' })] })
			);
		}
	}]);

	return Task;
}(_qiliApp.Component);

Task.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Task;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LElBQWQsRUFDRSxJQURGLENBQ087b0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxXQUFVLElBQVYsRUFBZjthQUFILENBRFAsQ0FERCxLQUlDLGVBQU8sTUFBUCxDQUFjLElBQWQsRUFDRSxJQURGLENBQ087b0JBQVMsT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFPLFFBQVEsT0FBUixHQUFnQixDQUFoQixFQUF0QjthQUFULENBRFAsQ0FKRDtZQUhRLEVBRFQsQ0FEQTtVQVBIO1NBRkQ7O09BRG9CLENBRHJCO01BRkQ7S0FMRDtJQXFDQyw2QkFBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBQVY7QUFDQSxlQUFVO2FBQUssT0FBSyxRQUFMLENBQWMsR0FBZDtNQUFMO0FBQ1YsWUFBTyxDQUFDLE1BQUQsRUFDSCw2QkFBQyxXQUFXLE9BQVosSUFBb0Isc0JBQWMsT0FBTyxJQUFQLEVBQWEsS0FBSSxTQUFKLEVBQS9DLENBREcsRUFFSCw2QkFBQyxXQUFXLEtBQVosSUFBa0IsU0FBUyxJQUFULEVBQWUsS0FBSSxPQUFKLEVBQWpDLENBRkcsQ0FBUCxFQUhoQixDQXJDRDtJQURLLENBUkk7Ozs7UUFwQlM7OztLQTRFYixlQUFhLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBNUVSIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVc2VyLFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBkYlRhc2sgZnJvbSAnLi9kYi90YXNrJ1xuaW1wb3J0IGRiRmFtaWx5IGZyb20gJy4vZGIvZmFtaWx5J1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2NvbXBvbmVudHMvZWRpdG9yJ1xuXG5pbXBvcnQge1JhaXNlZEJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7U3RlcHBlciwgU3RlcCwgU3RlcENvbnRlbnQsU3RlcEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcblxuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXt0YXNrOm51bGwsIGFjdGl2ZTowLCBjb21wbGV0ZWQ6ZmFsc2V9XG5cblx0Z2V0RGF0YShfaWQpe1xuXHRcdGxldCB7c3RhdGV9PXRoaXMucHJvcHMubG9jYXRpb25cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS50YXNrKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFzazpzdGF0ZS50YXNrLCBhY3RpdmU6c3RhdGUudGFzay5jdXJyZW50fSlcblx0XHRlbHNlXG5cdFx0XHRkYlRhc2suZmluZE9uZSh7X2lkOnRoaXMucHJvcHMucGFyYW1zLl9pZH0sdGFzaz0+dGhpcy5zZXRTdGF0ZSh7dGFzaywgYWN0aXZlOnRhc2suY3VycmVudH0pKVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Rhc2ssIGFjdGl2ZSwgY29tcGxldGVkfT10aGlzLnN0YXRlLCB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoIXRhc2spXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgY29uc3Qge2tub3dsZWRnZSwgY29udGVudCwgY3VycmVudH09dGFza1xuXHRcdGNvbnN0IHtzdGVwc309a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdDxoMSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGtub3dsZWRnZS8ke2tub3dsZWRnZS5faWR9YCl9Pntrbm93bGVkZ2UudGl0bGV9PC9oMT5cblx0XHRcdFx0PC9oZWFkZXI+XG5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbXBsZXRlZCAmJiA8ZGl2Plwi5oGt5ZacJHtjaGlsZC5uYW1lfSzkvaDlt7Lnu4/lrozmiJDkuobmnKzor77nqIshXCI8L2Rpdj59XG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGxpbmVhcj17ZmFsc2V9IGFjdGl2ZVN0ZXA9e2FjdGl2ZX0+XG5cdFx0XHRcdFx0e2tub3dsZWRnZS5zdGVwcy5tYXAoKHtrZXksYWx0fSwgaW5kZXgpPT4oXG5cdFx0XHRcdFx0XHQ8U3RlcCBrZXk9e2tleX0gY29tcGxldGVkPXtpbmRleDxjdXJyZW50fT5cblx0XHRcdFx0XHRcdFx0PFN0ZXBCdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOmluZGV4fSl9PntrZXl9PC9TdGVwQnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8U3RlcENvbnRlbnQ+XG5cdFx0XHRcdFx0XHRcdFx0e2FsdCAmJiA8cD57YWx0fTwvcD59XG5cdFx0XHRcdFx0XHRcdFx0PEVkaXRvciByZWY9e2BlZGl0b3ItJHtrZXl9YH1cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9e2NvbnRlbnRba2V5XX1cblx0XHRcdFx0XHRcdFx0XHRcdGFwcGVuZGFibGU9e2luZGV4PT1jdXJyZW50fS8+XG5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7bWFyZ2luOjEwfX0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7aW5kZXg9PWN1cnJlbnQgJiZcblx0XHRcdFx0XHRcdFx0XHRcdCg8UmFpc2VkQnV0dG9uIHByaW1hcnk9e3RydWV9IGxhYmVsPVwi5a6M5oiQXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2suY29udGVudFtrZXldPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdLnZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFzay5jdXJyZW50PWluZGV4XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoc3RlcHMubGVuZ3RoPT1pbmRleCsxKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJUYXNrLmZpbmlzaCh0YXNrKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtjb21wbGV0ZWQ6dHJ1ZX0pKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRiVGFzay51cHNlcnQodGFzaylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4odXBkYXRlZD0+dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOnVwZGF0ZWQuY3VycmVudCsxfSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19Lz4pfVxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L1N0ZXBDb250ZW50PlxuXHRcdFx0XHRcdFx0PC9TdGVwPlxuXHRcdFx0XHRcdCkpfVxuXHRcdFx0XHRcdDwvU3RlcHBlcj5cblx0XHRcdFx0PC9zZWN0aW9uPlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tZW50IHR5cGU9e2RiVGFza30gbW9kZWw9e3Rhc2t9IGtleT1cImNvbW1lbnRcIi8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuU2hhcmUgbWVzc2FnZT17dGFza30ga2V5PVwic2hhcmVcIi8+XX0vPlxuXHRcdFx0PC9hcnRpY2xlPlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuIl19