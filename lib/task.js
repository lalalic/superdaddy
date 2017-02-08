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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJUYXNrIiwic3RhdGUiLCJ0YXNrIiwiYWN0aXZlIiwiY29tcGxldGVkIiwiX2lkIiwicHJvcHMiLCJsb2NhdGlvbiIsInNldFN0YXRlIiwiY3VycmVudCIsImZpbmRPbmUiLCJwYXJhbXMiLCJnZXREYXRhIiwibmV4dFByb3BzIiwiY2hpbGQiLCJjb250ZXh0Iiwia25vd2xlZGdlIiwiY29udGVudCIsInN0ZXBzIiwicm91dGVyIiwicHVzaCIsInRpdGxlIiwibmFtZSIsIm1hcCIsImluZGV4Iiwia2V5IiwiYWx0IiwibWFyZ2luIiwicmVmcyIsInZhbHVlIiwibGVuZ3RoIiwiZmluaXNoIiwidGhlbiIsInVwc2VydCIsInVwZGF0ZWQiLCJvblNlbGVjdCIsImNtZCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFHT0EsSSxlQUFBQSxJO0lBQU1DLE8sZUFBQUEsTztJQUFTQyxPLGVBQUFBLE87SUFBU0MsVSxlQUFBQSxVOztJQUdWQyxJOzs7Ozs7Ozs7Ozs7OztnTEFDakJDLEssR0FBTSxFQUFDQyxNQUFLLElBQU4sRUFBWUMsUUFBTyxDQUFuQixFQUFzQkMsV0FBVSxLQUFoQyxFOzs7OzswQkFFREMsRyxFQUFJO0FBQUE7O0FBQUEsT0FDTkosS0FETSxHQUNDLEtBQUtLLEtBQUwsQ0FBV0MsUUFEWixDQUNOTixLQURNOztBQUVYLE9BQUdBLFNBQVNBLE1BQU1DLElBQWxCLEVBQ0MsS0FBS00sUUFBTCxDQUFjLEVBQUNOLE1BQUtELE1BQU1DLElBQVosRUFBa0JDLFFBQU9GLE1BQU1DLElBQU4sQ0FBV08sT0FBcEMsRUFBZCxFQURELEtBR0MsZUFBT0MsT0FBUCxDQUFlLEVBQUNM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LFdBQVUsSUFBWCxFQUFkLENBQUg7QUFBQSxhQURQLEVBREQsS0FJQyxlQUFPNkIsTUFBUCxDQUFjL0IsSUFBZCxFQUNFOEIsSUFERixDQUNPO0FBQUEsb0JBQVMsT0FBS3hCLFFBQUwsQ0FBYyxFQUFDTCxRQUFPK0IsUUFBUXpCLE9BQVIsR0FBZ0IsQ0FBeEIsRUFBZCxDQUFUO0FBQUEsYUFEUDtBQUVELFlBVkQ7QUFGRjtBQU5EO0FBRkQsUUFEb0I7QUFBQSxPQUFwQjtBQUREO0FBRkQsS0FMRDtBQXFDQyxrQ0FBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBRDFCO0FBRWdCLGVBQVU7QUFBQSxhQUFLLE9BQUswQixRQUFMLENBQWNDLEdBQWQsQ0FBTDtBQUFBLE1BRjFCO0FBR2dCLFlBQU8sQ0FBQyxNQUFELEVBQ0gsOEJBQUMsVUFBRCxDQUFZLE9BQVosSUFBb0Isb0JBQXBCLEVBQWtDLE9BQU9sQyxJQUF6QyxFQUErQyxLQUFJLFNBQW5ELEdBREcsRUFFSCw4QkFBQyxVQUFELENBQVksS0FBWixJQUFrQixTQUFTQSxJQUEzQixFQUFpQyxLQUFJLE9BQXJDLEdBRkcsQ0FIdkI7QUFyQ0QsSUFESztBQThDSDs7Ozs7O0FBMUVnQkYsSSxDQTRFYnFDLFksR0FBYTtBQUNibEIsU0FBTyxpQkFBVW1CLE1BREo7QUFFYnhCLFFBQU8saUJBQVV3QjtBQUZKLEM7a0JBNUVBdEMsSSIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VzZXIsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5pbXBvcnQgZGJGYW1pbHkgZnJvbSAnLi9kYi9mYW1pbHknXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vY29tcG9uZW50cy9lZGl0b3InXG5cbmltcG9ydCB7UmFpc2VkQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtTdGVwcGVyLCBTdGVwLCBTdGVwQ29udGVudCxTdGVwQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xuXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e3Rhc2s6bnVsbCwgYWN0aXZlOjAsIGNvbXBsZXRlZDpmYWxzZX1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLnRhc2spXG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrOnN0YXRlLnRhc2ssIGFjdGl2ZTpzdGF0ZS50YXNrLmN1cnJlbnR9KVxuXHRcdGVsc2Vcblx0XHRcdGRiVGFzay5maW5kT25lKHtfaWQ6dGhpcy5wcm9wcy5wYXJhbXMuX2lkfSx0YXNrPT50aGlzLnNldFN0YXRlKHt0YXNrLCBhY3RpdmU6dGFzay5jdXJyZW50fSkpXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7dGFzaywgYWN0aXZlLCBjb21wbGV0ZWR9PXRoaXMuc3RhdGUsIHtjaGlsZH09dGhpcy5jb250ZXh0XG4gICAgICAgIGlmKCF0YXNrKVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2UsIGNvbnRlbnQsIGN1cnJlbnR9PXRhc2tcblx0XHRjb25zdCB7c3RlcHN9PWtub3dsZWRnZVxuXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8YXJ0aWNsZT5cblx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHQ8aDEgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBrbm93bGVkZ2UvJHtrbm93bGVkZ2UuX2lkfWApfT57a25vd2xlZGdlLnRpdGxlfTwvaDE+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXG5cdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdHtjb21wbGV0ZWQgJiYgPGRpdj5cIuaBreWWnCR7Y2hpbGQubmFtZX0s5L2g5bey57uP5a6M5oiQ5LqG5pys6K++56iLIVwiPC9kaXY+fVxuXHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBsaW5lYXI9e2ZhbHNlfSBhY3RpdmVTdGVwPXthY3RpdmV9PlxuXHRcdFx0XHRcdHtrbm93bGVkZ2Uuc3RlcHMubWFwKCh7a2V5LGFsdH0sIGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0PFN0ZXAga2V5PXtrZXl9IGNvbXBsZXRlZD17aW5kZXg8Y3VycmVudH0+XG5cdFx0XHRcdFx0XHRcdDxTdGVwQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe2FjdGl2ZTppbmRleH0pfT57a2V5fTwvU3RlcEJ1dHRvbj5cblx0XHRcdFx0XHRcdFx0PFN0ZXBDb250ZW50PlxuXHRcdFx0XHRcdFx0XHRcdHthbHQgJiYgPHA+e2FsdH08L3A+fVxuXHRcdFx0XHRcdFx0XHRcdDxFZGl0b3IgcmVmPXtgZWRpdG9yLSR7a2V5fWB9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb250ZW50PXtjb250ZW50W2tleV19XG5cdFx0XHRcdFx0XHRcdFx0XHRhcHBlbmRhYmxlPXtpbmRleD09Y3VycmVudH0vPlxuXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e21hcmdpbjoxMH19PlxuXHRcdFx0XHRcdFx0XHRcdFx0e2luZGV4PT1jdXJyZW50ICYmXG5cdFx0XHRcdFx0XHRcdFx0XHQoPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBsYWJlbD1cIuWujOaIkFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmNvbnRlbnRba2V5XT10aGlzLnJlZnNbYGVkaXRvci0ke2tleX1gXS52YWx1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhc2suY3VycmVudD1pbmRleFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKHN0ZXBzLmxlbmd0aD09aW5kZXgrMSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRiVGFzay5maW5pc2godGFzaylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tcGxldGVkOnRydWV9KSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYlRhc2sudXBzZXJ0KHRhc2spXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHVwZGF0ZWQ9PnRoaXMuc2V0U3RhdGUoe2FjdGl2ZTp1cGRhdGVkLmN1cnJlbnQrMX0pKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9fS8+KX1cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9TdGVwQ29udGVudD5cblx0XHRcdFx0XHRcdDwvU3RlcD5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L1N0ZXBwZXI+XG5cdFx0XHRcdDwvc2VjdGlvbj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWVudCB0eXBlPXtkYlRhc2t9IG1vZGVsPXt0YXNrfSBrZXk9XCJjb21tZW50XCIvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLlNoYXJlIG1lc3NhZ2U9e3Rhc2t9IGtleT1cInNoYXJlXCIvPl19Lz5cblx0XHRcdDwvYXJ0aWNsZT5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcbiAgICAgICAgcm91dGVyOlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxufVxuIl19