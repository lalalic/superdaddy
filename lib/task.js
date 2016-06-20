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

var _template = require('./parser/template');

var _template2 = _interopRequireDefault(_template);

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
//# sourceMappingURL=data:application/json;base64,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QUFQLENBQWMsSUFBZCxFQUNFLElBREYsQ0FDTztvQkFBRyxPQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsSUFBVixFQUFmO2FBQUgsQ0FEUCxDQURELEtBSUMsZUFBTyxNQUFQLENBQWMsSUFBZCxFQUNFLElBREYsQ0FDTztvQkFBUyxPQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sUUFBUSxPQUFSLEdBQWdCLENBQWhCLEVBQXRCO2FBQVQsQ0FEUCxDQUpEO1lBSFEsRUFEVCxDQURBO1VBUEg7U0FGRDs7T0FEb0IsQ0FEckI7TUFGRDtLQUxEO0lBcUNDLDZCQUFDLFVBQUQ7QUFDZ0IsZ0JBQVUsU0FBVjtBQUNBLGVBQVU7YUFBSyxPQUFLLFFBQUwsQ0FBYyxHQUFkO01BQUw7QUFDVixZQUFPLENBQUMsTUFBRCxFQUNILDZCQUFDLFdBQVcsT0FBWixJQUFvQixzQkFBYyxPQUFPLElBQVAsRUFBYSxLQUFJLFNBQUosRUFBL0MsQ0FERyxFQUVILDZCQUFDLFdBQVcsS0FBWixJQUFrQixTQUFTLElBQVQsRUFBZSxLQUFJLE9BQUosRUFBakMsQ0FGRyxDQUFQLEVBSGhCLENBckNEO0lBREssQ0FSSTs7OztRQXBCUzs7O0tBNEViLGVBQWEsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQjtrQkE1RVIiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVzZXIsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5pbXBvcnQgZGJGYW1pbHkgZnJvbSAnLi9kYi9mYW1pbHknXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vY29tcG9uZW50cy9lZGl0b3InXG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9wYXJzZXIvdGVtcGxhdGUnXG5cbmltcG9ydCB7UmFpc2VkQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtTdGVwcGVyLCBTdGVwLCBTdGVwQ29udGVudCxTdGVwQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xuXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e3Rhc2s6bnVsbCwgYWN0aXZlOjAsIGNvbXBsZXRlZDpmYWxzZX1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLnRhc2spXG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrOnN0YXRlLnRhc2ssIGFjdGl2ZTpzdGF0ZS50YXNrLmN1cnJlbnR9KVxuXHRcdGVsc2Vcblx0XHRcdGRiVGFzay5maW5kT25lKHtfaWQ6dGhpcy5wcm9wcy5wYXJhbXMuX2lkfSx0YXNrPT50aGlzLnNldFN0YXRlKHt0YXNrLCBhY3RpdmU6dGFzay5jdXJyZW50fSkpXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7dGFzaywgYWN0aXZlLCBjb21wbGV0ZWR9PXRoaXMuc3RhdGUsIHtjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICBpZighdGFzaylcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICBjb25zdCB7a25vd2xlZGdlLCBjb250ZW50LCBjdXJyZW50fT10YXNrXG5cdFx0Y29uc3Qge3N0ZXBzfT1rbm93bGVkZ2Vcblx0XHRcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdDxoMSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGtub3dsZWRnZS8ke2tub3dsZWRnZS5faWR9YCl9Pntrbm93bGVkZ2UudGl0bGV9PC9oMT5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0XHR7Y29tcGxldGVkICYmIDxkaXY+XCLmga3llpwke2NoaWxkLm5hbWV9LOS9oOW3sue7j+WujOaIkOS6huacrOivvueoiyFcIjwvZGl2Pn1cblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgbGluZWFyPXtmYWxzZX0gYWN0aXZlU3RlcD17YWN0aXZlfT5cblx0XHRcdFx0XHR7a25vd2xlZGdlLnN0ZXBzLm1hcCgoe2tleSxhbHR9LCBpbmRleCk9Pihcblx0XHRcdFx0XHRcdDxTdGVwIGtleT17a2V5fSBjb21wbGV0ZWQ9e2luZGV4PGN1cnJlbnR9PlxuXHRcdFx0XHRcdFx0XHQ8U3RlcEJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHthY3RpdmU6aW5kZXh9KX0+e2tleX08L1N0ZXBCdXR0b24+XG5cdFx0XHRcdFx0XHRcdDxTdGVwQ29udGVudD5cblx0XHRcdFx0XHRcdFx0XHR7YWx0ICYmIDxwPnthbHR9PC9wPn1cblx0XHRcdFx0XHRcdFx0XHQ8RWRpdG9yIHJlZj17YGVkaXRvci0ke2tleX1gfSBcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ9e2NvbnRlbnRba2V5XX1cblx0XHRcdFx0XHRcdFx0XHRcdGFwcGVuZGFibGU9e2luZGV4PT1jdXJyZW50fS8+XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e21hcmdpbjoxMH19PlxuXHRcdFx0XHRcdFx0XHRcdFx0e2luZGV4PT1jdXJyZW50ICYmIFxuXHRcdFx0XHRcdFx0XHRcdFx0KDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gbGFiZWw9XCLlrozmiJBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFzay5jb250ZW50W2tleV09dGhpcy5yZWZzW2BlZGl0b3ItJHtrZXl9YF0udmFsdWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmN1cnJlbnQ9aW5kZXhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZihzdGVwcy5sZW5ndGg9PWluZGV4KzEpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYlRhc2suZmluaXNoKHRhc2spXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe2NvbXBsZXRlZDp0cnVlfSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJUYXNrLnVwc2VydCh0YXNrKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHthY3RpdmU6dXBkYXRlZC5jdXJyZW50KzF9KSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX0vPil9XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvU3RlcENvbnRlbnQ+XG5cdFx0XHRcdFx0XHQ8L1N0ZXA+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1lbnQgdHlwZT17ZGJUYXNrfSBtb2RlbD17dGFza30ga2V5PVwiY29tbWVudFwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5TaGFyZSBtZXNzYWdlPXt0YXNrfSBrZXk9XCJzaGFyZVwiLz5dfS8+XG5cdFx0XHQ8L2FydGljbGU+XG4gICAgICAgIClcbiAgICB9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==