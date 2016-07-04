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
			var completed = _state.completed;var child = this.context.child;

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

Task.contextTypes = {
	router: _qiliApp.React.PropTypes.object,
	child: _qiliApp.React.PropTypes.object
};
exports.default = Task;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUdPO0lBQU07SUFBUztJQUFTOztJQUdWOzs7Ozs7Ozs7Ozs7OztnTUFDakIsUUFBTSxFQUFDLE1BQUssSUFBTCxFQUFXLFFBQU8sQ0FBUCxFQUFVLFdBQVUsS0FBVjs7O2NBRFg7OzBCQUdaLEtBQUk7OztPQUNOLFFBQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFQLE1BRE07O0FBRVgsT0FBRyxTQUFTLE1BQU0sSUFBTixFQUNYLEtBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxNQUFNLElBQU4sRUFBWSxRQUFPLE1BQU0sSUFBTixDQUFXLE9BQVgsRUFBdkMsRUFERCxLQUdDLGVBQU8sT0FBUCxDQUFlLEVBQUMsS0FBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLEVBQXBCLEVBQTJDO1dBQU0sT0FBSyxRQUFMLENBQWMsRUFBQyxVQUFELEVBQU8sUUFBTyxLQUFLLE9BQUwsRUFBNUI7SUFBTixDQUEzQyxDQUhEOzs7O3NDQU1xQjtBQUNmLFFBQUssT0FBTCxDQUFhLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsR0FBbEIsQ0FBYixDQURlOzs7OzRDQUlPLFdBQVU7QUFDaEMsT0FBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLElBQXVCLFVBQVUsTUFBVixDQUFpQixHQUFqQixFQUMvQixLQUFLLE9BQUwsQ0FBYSxVQUFVLE1BQVYsQ0FBaUIsR0FBakIsQ0FBYixDQURLOzs7OzJCQUlJOzs7Z0JBQzRCLEtBQUssS0FBTCxDQUQ1QjtPQUNHLG1CQURIO09BQ1MsdUJBRFQ7QUFDRSxPQUFlLDRCQUFmLENBREYsSUFDeUMsUUFBTyxLQUFLLE9BQUwsQ0FBUCxNQUR6Qzs7QUFFSixPQUFHLENBQUMsSUFBRCxFQUNDLE9BQVEsNkJBQUMsT0FBRCxPQUFSLENBREo7O09BR08sWUFBNkIsS0FBN0IsVUFMSDtPQUtjLFVBQWtCLEtBQWxCLFFBTGQ7T0FLdUIsVUFBUyxLQUFULFFBTHZCO09BTUgsUUFBTyxVQUFQLE1BTkc7OztBQVFKLFVBQ0w7OztJQUNDOzs7S0FDQzs7UUFBSSxTQUFTO2VBQUcsT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixnQkFBc0MsVUFBVSxHQUFWO1FBQXpDLEVBQWI7TUFBeUUsVUFBVSxLQUFWO01BRDFFO0tBREQ7SUFLQzs7O0tBQ0UsYUFBYTs7OztNQUFVLE1BQU0sSUFBTjtvQkFBVjtNQUFiO0tBQ0Q7O1FBQVMsYUFBWSxVQUFaLEVBQXVCLFFBQVEsS0FBUixFQUFlLFlBQVksTUFBWixFQUEvQztNQUNDLFVBQVUsS0FBVixDQUFnQixHQUFoQixDQUFvQixnQkFBWSxLQUFaO1dBQUU7V0FBSTtjQUMxQjs7VUFBTSxLQUFLLEdBQUwsRUFBVSxXQUFXLFFBQU0sT0FBTixFQUEzQjtRQUNDOztXQUFZLFNBQVM7a0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFPLEtBQVAsRUFBZjtXQUFILEVBQXJCO1NBQXdELEdBQXhEO1NBREQ7UUFFQzs7O1NBQ0UsT0FBTzs7O1VBQUksR0FBSjtVQUFQO1NBQ0QsaURBQVEsaUJBQWUsR0FBZjtBQUNQLG1CQUFTLFFBQVEsR0FBUixDQUFUO0FBQ0Esc0JBQVksU0FBTyxPQUFQLEVBRmIsQ0FGRDtTQU1DOztZQUFLLE9BQU8sRUFBQyxRQUFPLEVBQVAsRUFBUixFQUFMO1VBQ0UsU0FBTyxPQUFQLElBQ0EseURBQWMsU0FBUyxJQUFULEVBQWUsT0FBTSxJQUFOO0FBQzdCLG9CQUFTLG9CQUFHO0FBQ1gsaUJBQUssT0FBTCxDQUFhLEdBQWIsSUFBa0IsT0FBSyxJQUFMLGFBQW9CLEdBQXBCLEVBQTJCLEtBQTNCLENBRFA7QUFFWCxpQkFBSyxPQUFMLEdBQWEsS0FBYixDQUZXO0FBR1gsZ0JBQUcsTUFBTSxNQUFOLElBQWMsUUFBTSxDQUFOLEVBQ2hCLGVBQU8sTUFBUCxDQUFjLElBQWQsRUFDRSxJQURGLENBQ087b0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxXQUFVLElBQVYsRUFBZjthQUFILENBRFAsQ0FERCxLQUlDLGVBQU8sTUFBUCxDQUFjLElBQWQsRUFDRSxJQURGLENBQ087b0JBQVMsT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFPLFFBQVEsT0FBUixHQUFnQixDQUFoQixFQUF0QjthQUFULENBRFAsQ0FKRDtZQUhRLEVBRFQsQ0FEQTtVQVBIO1NBRkQ7O09BRG9CLENBRHJCO01BRkQ7S0FMRDtJQXFDQyw2QkFBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBQVY7QUFDQSxlQUFVO2FBQUssT0FBSyxRQUFMLENBQWMsR0FBZDtNQUFMO0FBQ1YsWUFBTyxDQUFDLE1BQUQsRUFDSCw2QkFBQyxXQUFXLE9BQVosSUFBb0Isc0JBQWMsT0FBTyxJQUFQLEVBQWEsS0FBSSxTQUFKLEVBQS9DLENBREcsRUFFSCw2QkFBQyxXQUFXLEtBQVosSUFBa0IsU0FBUyxJQUFULEVBQWUsS0FBSSxPQUFKLEVBQWpDLENBRkcsQ0FBUCxFQUhoQixDQXJDRDtJQURLLENBUkk7Ozs7UUFwQlM7OztLQTRFYixlQUFhO0FBQ2IsU0FBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUCxRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQjs7a0JBOUVNIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVc2VyLFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBkYlRhc2sgZnJvbSAnLi9kYi90YXNrJ1xuaW1wb3J0IGRiRmFtaWx5IGZyb20gJy4vZGIvZmFtaWx5J1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2NvbXBvbmVudHMvZWRpdG9yJ1xuXG5pbXBvcnQge1JhaXNlZEJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7U3RlcHBlciwgU3RlcCwgU3RlcENvbnRlbnQsU3RlcEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcblxuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXt0YXNrOm51bGwsIGFjdGl2ZTowLCBjb21wbGV0ZWQ6ZmFsc2V9XG5cblx0Z2V0RGF0YShfaWQpe1xuXHRcdGxldCB7c3RhdGV9PXRoaXMucHJvcHMubG9jYXRpb25cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS50YXNrKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFzazpzdGF0ZS50YXNrLCBhY3RpdmU6c3RhdGUudGFzay5jdXJyZW50fSlcblx0XHRlbHNlXG5cdFx0XHRkYlRhc2suZmluZE9uZSh7X2lkOnRoaXMucHJvcHMucGFyYW1zLl9pZH0sdGFzaz0+dGhpcy5zZXRTdGF0ZSh7dGFzaywgYWN0aXZlOnRhc2suY3VycmVudH0pKVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Rhc2ssIGFjdGl2ZSwgY29tcGxldGVkfT10aGlzLnN0YXRlLCB7Y2hpbGR9PXRoaXMuY29udGV4dFxuICAgICAgICBpZighdGFzaylcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICBjb25zdCB7a25vd2xlZGdlLCBjb250ZW50LCBjdXJyZW50fT10YXNrXG5cdFx0Y29uc3Qge3N0ZXBzfT1rbm93bGVkZ2VcblxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGFydGljbGU+XG5cdFx0XHRcdDxoZWFkZXI+XG5cdFx0XHRcdFx0PGgxIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChga25vd2xlZGdlLyR7a25vd2xlZGdlLl9pZH1gKX0+e2tub3dsZWRnZS50aXRsZX08L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0XHR7Y29tcGxldGVkICYmIDxkaXY+XCLmga3llpwke2NoaWxkLm5hbWV9LOS9oOW3sue7j+WujOaIkOS6huacrOivvueoiyFcIjwvZGl2Pn1cblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgbGluZWFyPXtmYWxzZX0gYWN0aXZlU3RlcD17YWN0aXZlfT5cblx0XHRcdFx0XHR7a25vd2xlZGdlLnN0ZXBzLm1hcCgoe2tleSxhbHR9LCBpbmRleCk9Pihcblx0XHRcdFx0XHRcdDxTdGVwIGtleT17a2V5fSBjb21wbGV0ZWQ9e2luZGV4PGN1cnJlbnR9PlxuXHRcdFx0XHRcdFx0XHQ8U3RlcEJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHthY3RpdmU6aW5kZXh9KX0+e2tleX08L1N0ZXBCdXR0b24+XG5cdFx0XHRcdFx0XHRcdDxTdGVwQ29udGVudD5cblx0XHRcdFx0XHRcdFx0XHR7YWx0ICYmIDxwPnthbHR9PC9wPn1cblx0XHRcdFx0XHRcdFx0XHQ8RWRpdG9yIHJlZj17YGVkaXRvci0ke2tleX1gfVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGVudD17Y29udGVudFtrZXldfVxuXHRcdFx0XHRcdFx0XHRcdFx0YXBwZW5kYWJsZT17aW5kZXg9PWN1cnJlbnR9Lz5cblxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9e3ttYXJnaW46MTB9fT5cblx0XHRcdFx0XHRcdFx0XHRcdHtpbmRleD09Y3VycmVudCAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0KDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gbGFiZWw9XCLlrozmiJBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFzay5jb250ZW50W2tleV09dGhpcy5yZWZzW2BlZGl0b3ItJHtrZXl9YF0udmFsdWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmN1cnJlbnQ9aW5kZXhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZihzdGVwcy5sZW5ndGg9PWluZGV4KzEpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYlRhc2suZmluaXNoKHRhc2spXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe2NvbXBsZXRlZDp0cnVlfSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJUYXNrLnVwc2VydCh0YXNrKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHthY3RpdmU6dXBkYXRlZC5jdXJyZW50KzF9KSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX0vPil9XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvU3RlcENvbnRlbnQ+XG5cdFx0XHRcdFx0XHQ8L1N0ZXA+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cblx0XHRcdFx0PENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1lbnQgdHlwZT17ZGJUYXNrfSBtb2RlbD17dGFza30ga2V5PVwiY29tbWVudFwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5TaGFyZSBtZXNzYWdlPXt0YXNrfSBrZXk9XCJzaGFyZVwiLz5dfS8+XG5cdFx0XHQ8L2FydGljbGU+XG4gICAgICAgIClcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjaGlsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbn1cbiJdfQ==