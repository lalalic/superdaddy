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

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;

var Task = function (_Component) {
	(0, _inherits3.default)(Task, _Component);

	function Task() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Task);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Task)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { task: null, active: 0, completed: false }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
						'"恭喜$',
						child.name,
						',你已经完成了本课程!"'
					),
					_react2.default.createElement(
						_Stepper.Stepper,
						{ orientation: 'vertical', linear: false, activeStep: active },
						knowledge.steps.map(function (_ref, index) {
							var key = _ref.key;
							var alt = _ref.alt;
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
										index == current && _react2.default.createElement(_materialUi.RaisedButton, { primary: true, label: '完成',
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
//# sourceMappingURL=data:application/json;base64,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LEVBQ2hCLGVBQU8sTUFBUCxDQUFjLElBQWQsRUFDRSxJQURGLENBQ087b0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxXQUFVLElBQVYsRUFBZjthQUFILENBRFAsQ0FERCxLQUlDLGVBQU8sTUFBUCxDQUFjLElBQWQsRUFDRSxJQURGLENBQ087b0JBQVMsT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFPLFFBQVEsT0FBUixHQUFnQixDQUFoQixFQUF0QjthQUFULENBRFAsQ0FKRDtZQUhRLEVBRFQsQ0FEQTtVQVBIO1NBRkQ7O09BRG9CLENBRHJCO01BRkQ7S0FMRDtJQXFDQyw4QkFBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBQVY7QUFDQSxlQUFVO2FBQUssT0FBSyxRQUFMLENBQWMsR0FBZDtNQUFMO0FBQ1YsWUFBTyxDQUFDLE1BQUQsRUFDSCw4QkFBQyxXQUFXLE9BQVosSUFBb0Isc0JBQWMsT0FBTyxJQUFQLEVBQWEsS0FBSSxTQUFKLEVBQS9DLENBREcsRUFFSCw4QkFBQyxXQUFXLEtBQVosSUFBa0IsU0FBUyxJQUFULEVBQWUsS0FBSSxPQUFKLEVBQWpDLENBRkcsQ0FBUCxFQUhoQixDQXJDRDtJQURLLENBUkk7OztRQXBCUzs7O0tBNEViLGVBQWE7QUFDYixTQUFPLGlCQUFVLE1BQVY7QUFDUCxRQUFPLGlCQUFVLE1BQVY7O2tCQTlFTSIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VzZXIsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5pbXBvcnQgZGJGYW1pbHkgZnJvbSAnLi9kYi9mYW1pbHknXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vY29tcG9uZW50cy9lZGl0b3InXG5cbmltcG9ydCB7UmFpc2VkQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtTdGVwcGVyLCBTdGVwLCBTdGVwQ29udGVudCxTdGVwQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xuXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e3Rhc2s6bnVsbCwgYWN0aXZlOjAsIGNvbXBsZXRlZDpmYWxzZX1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLnRhc2spXG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrOnN0YXRlLnRhc2ssIGFjdGl2ZTpzdGF0ZS50YXNrLmN1cnJlbnR9KVxuXHRcdGVsc2Vcblx0XHRcdGRiVGFzay5maW5kT25lKHtfaWQ6dGhpcy5wcm9wcy5wYXJhbXMuX2lkfSx0YXNrPT50aGlzLnNldFN0YXRlKHt0YXNrLCBhY3RpdmU6dGFzay5jdXJyZW50fSkpXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7dGFzaywgYWN0aXZlLCBjb21wbGV0ZWR9PXRoaXMuc3RhdGUsIHtjaGlsZH09dGhpcy5jb250ZXh0XG4gICAgICAgIGlmKCF0YXNrKVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2UsIGNvbnRlbnQsIGN1cnJlbnR9PXRhc2tcblx0XHRjb25zdCB7c3RlcHN9PWtub3dsZWRnZVxuXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8YXJ0aWNsZT5cblx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHQ8aDEgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBrbm93bGVkZ2UvJHtrbm93bGVkZ2UuX2lkfWApfT57a25vd2xlZGdlLnRpdGxlfTwvaDE+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXG5cdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdHtjb21wbGV0ZWQgJiYgPGRpdj5cIuaBreWWnCR7Y2hpbGQubmFtZX0s5L2g5bey57uP5a6M5oiQ5LqG5pys6K++56iLIVwiPC9kaXY+fVxuXHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBsaW5lYXI9e2ZhbHNlfSBhY3RpdmVTdGVwPXthY3RpdmV9PlxuXHRcdFx0XHRcdHtrbm93bGVkZ2Uuc3RlcHMubWFwKCh7a2V5LGFsdH0sIGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0PFN0ZXAga2V5PXtrZXl9IGNvbXBsZXRlZD17aW5kZXg8Y3VycmVudH0+XG5cdFx0XHRcdFx0XHRcdDxTdGVwQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe2FjdGl2ZTppbmRleH0pfT57a2V5fTwvU3RlcEJ1dHRvbj5cblx0XHRcdFx0XHRcdFx0PFN0ZXBDb250ZW50PlxuXHRcdFx0XHRcdFx0XHRcdHthbHQgJiYgPHA+e2FsdH08L3A+fVxuXHRcdFx0XHRcdFx0XHRcdDxFZGl0b3IgcmVmPXtgZWRpdG9yLSR7a2V5fWB9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb250ZW50PXtjb250ZW50W2tleV19XG5cdFx0XHRcdFx0XHRcdFx0XHRhcHBlbmRhYmxlPXtpbmRleD09Y3VycmVudH0vPlxuXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e21hcmdpbjoxMH19PlxuXHRcdFx0XHRcdFx0XHRcdFx0e2luZGV4PT1jdXJyZW50ICYmXG5cdFx0XHRcdFx0XHRcdFx0XHQoPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBsYWJlbD1cIuWujOaIkFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmNvbnRlbnRba2V5XT10aGlzLnJlZnNbYGVkaXRvci0ke2tleX1gXS52YWx1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2suY3VycmVudD1pbmRleFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKHN0ZXBzLmxlbmd0aD09aW5kZXgrMSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRiVGFzay5maW5pc2godGFzaylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tcGxldGVkOnRydWV9KSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYlRhc2sudXBzZXJ0KHRhc2spXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHVwZGF0ZWQ9PnRoaXMuc2V0U3RhdGUoe2FjdGl2ZTp1cGRhdGVkLmN1cnJlbnQrMX0pKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9fS8+KX1cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9TdGVwQ29udGVudD5cblx0XHRcdFx0XHRcdDwvU3RlcD5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L1N0ZXBwZXI+XG5cdFx0XHRcdDwvc2VjdGlvbj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWVudCB0eXBlPXtkYlRhc2t9IG1vZGVsPXt0YXNrfSBrZXk9XCJjb21tZW50XCIvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLlNoYXJlIG1lc3NhZ2U9e3Rhc2t9IGtleT1cInNoYXJlXCIvPl19Lz5cblx0XHRcdDwvYXJ0aWNsZT5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcm91dGVyOlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxufVxuIl19