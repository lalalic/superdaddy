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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJUYXNrIiwic3RhdGUiLCJ0YXNrIiwiYWN0aXZlIiwiY29tcGxldGVkIiwiX2lkIiwicHJvcHMiLCJsb2NhdGlvbiIsInNldFN0YXRlIiwiY3VycmVudCIsImZpbmRPbmUiLCJwYXJhbXMiLCJnZXREYXRhIiwibmV4dFByb3BzIiwiY2hpbGQiLCJjb250ZXh0Iiwia25vd2xlZGdlIiwiY29udGVudCIsInN0ZXBzIiwicm91dGVyIiwicHVzaCIsInRpdGxlIiwibmFtZSIsIm1hcCIsImluZGV4Iiwia2V5IiwiYWx0IiwibWFyZ2luIiwicmVmcyIsInZhbHVlIiwibGVuZ3RoIiwiZmluaXNoIiwidGhlbiIsInVwc2VydCIsInVwZGF0ZWQiLCJvblNlbGVjdCIsImNtZCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7SUFHT0EsSSxlQUFBQSxJO0lBQU1DLE8sZUFBQUEsTztJQUFTQyxPLGVBQUFBLE87SUFBU0MsVSxlQUFBQSxVOztJQUdWQyxJOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLEssR0FBTSxFQUFDQyxNQUFLLElBQU4sRUFBWUMsUUFBTyxDQUFuQixFQUFzQkMsV0FBVSxLQUFoQyxFOzs7OzswQkFFREMsRyxFQUFJO0FBQUE7O0FBQUEsT0FDTkosS0FETSxHQUNDLEtBQUtLLEtBQUwsQ0FBV0MsUUFEWixDQUNOTixLQURNOztBQUVYLE9BQUdBLFNBQVNBLE1BQU1DLElBQWxCLEVBQ0MsS0FBS00sUUFBTCxDQUFjLEVBQUNOLE1BQUtELE1BQU1DLElBQVosRUFBa0JDLFFBQU9GLE1BQU1DLElBQU4sQ0FBV08sT0FBcEMsRUFBZCxFQURELEtBR0MsZUFBT0MsT0FB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QWMsRUFBQ0osV0FBVSxJQUFYLEVBQWQsQ0FBSDtBQUFBLGFBRFAsRUFERCxLQUlDLGVBQU82QixNQUFQLENBQWMvQixJQUFkLEVBQ0U4QixJQURGLENBQ087QUFBQSxvQkFBUyxPQUFLeEIsUUFBTCxDQUFjLEVBQUNMLFFBQU8rQixRQUFRekIsT0FBUixHQUFnQixDQUF4QixFQUFkLENBQVQ7QUFBQSxhQURQO0FBRUQsWUFWRDtBQUZGO0FBTkQ7QUFGRCxRQURvQjtBQUFBLE9BQXBCO0FBREQ7QUFGRCxLQUxEO0FBcUNDLGtDQUFDLFVBQUQ7QUFDZ0IsZ0JBQVUsU0FEMUI7QUFFZ0IsZUFBVTtBQUFBLGFBQUssT0FBSzBCLFFBQUwsQ0FBY0MsR0FBZCxDQUFMO0FBQUEsTUFGMUI7QUFHZ0IsWUFBTyxDQUFDLE1BQUQsRUFDSCw4QkFBQyxVQUFELENBQVksT0FBWixJQUFvQixvQkFBcEIsRUFBa0MsT0FBT2xDLElBQXpDLEVBQStDLEtBQUksU0FBbkQsR0FERyxFQUVILDhCQUFDLFVBQUQsQ0FBWSxLQUFaLElBQWtCLFNBQVNBLElBQTNCLEVBQWlDLEtBQUksT0FBckMsR0FGRyxDQUh2QjtBQXJDRCxJQURLO0FBOENIOzs7OztBQTFFZ0JGLEksQ0E0RWJxQyxZLEdBQWE7QUFDYmxCLFNBQU8saUJBQVVtQixNQURKO0FBRWJ4QixRQUFPLGlCQUFVd0I7QUFGSixDO2tCQTVFQXRDLEkiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVc2VyLFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBkYlRhc2sgZnJvbSAnLi9kYi90YXNrJ1xuaW1wb3J0IGRiRmFtaWx5IGZyb20gJy4vZGIvZmFtaWx5J1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2NvbXBvbmVudHMvZWRpdG9yJ1xuXG5pbXBvcnQge1JhaXNlZEJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7U3RlcHBlciwgU3RlcCwgU3RlcENvbnRlbnQsU3RlcEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcblxuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXt0YXNrOm51bGwsIGFjdGl2ZTowLCBjb21wbGV0ZWQ6ZmFsc2V9XG5cblx0Z2V0RGF0YShfaWQpe1xuXHRcdGxldCB7c3RhdGV9PXRoaXMucHJvcHMubG9jYXRpb25cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS50YXNrKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFzazpzdGF0ZS50YXNrLCBhY3RpdmU6c3RhdGUudGFzay5jdXJyZW50fSlcblx0XHRlbHNlXG5cdFx0XHRkYlRhc2suZmluZE9uZSh7X2lkOnRoaXMucHJvcHMucGFyYW1zLl9pZH0sdGFzaz0+dGhpcy5zZXRTdGF0ZSh7dGFzaywgYWN0aXZlOnRhc2suY3VycmVudH0pKVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Rhc2ssIGFjdGl2ZSwgY29tcGxldGVkfT10aGlzLnN0YXRlLCB7Y2hpbGR9PXRoaXMuY29udGV4dFxuICAgICAgICBpZighdGFzaylcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICBjb25zdCB7a25vd2xlZGdlLCBjb250ZW50LCBjdXJyZW50fT10YXNrXG5cdFx0Y29uc3Qge3N0ZXBzfT1rbm93bGVkZ2VcblxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGFydGljbGU+XG5cdFx0XHRcdDxoZWFkZXI+XG5cdFx0XHRcdFx0PGgxIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChga25vd2xlZGdlLyR7a25vd2xlZGdlLl9pZH1gKX0+e2tub3dsZWRnZS50aXRsZX08L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0XHR7Y29tcGxldGVkICYmIDxkaXY+XCLmga3llpwke2NoaWxkLm5hbWV9LOS9oOW3sue7j+WujOaIkOS6huacrOivvueoiyFcIjwvZGl2Pn1cblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgbGluZWFyPXtmYWxzZX0gYWN0aXZlU3RlcD17YWN0aXZlfT5cblx0XHRcdFx0XHR7a25vd2xlZGdlLnN0ZXBzLm1hcCgoe2tleSxhbHR9LCBpbmRleCk9Pihcblx0XHRcdFx0XHRcdDxTdGVwIGtleT17a2V5fSBjb21wbGV0ZWQ9e2luZGV4PGN1cnJlbnR9PlxuXHRcdFx0XHRcdFx0XHQ8U3RlcEJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHthY3RpdmU6aW5kZXh9KX0+e2tleX08L1N0ZXBCdXR0b24+XG5cdFx0XHRcdFx0XHRcdDxTdGVwQ29udGVudD5cblx0XHRcdFx0XHRcdFx0XHR7YWx0ICYmIDxwPnthbHR9PC9wPn1cblx0XHRcdFx0XHRcdFx0XHQ8RWRpdG9yIHJlZj17YGVkaXRvci0ke2tleX1gfVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGVudD17Y29udGVudFtrZXldfVxuXHRcdFx0XHRcdFx0XHRcdFx0YXBwZW5kYWJsZT17aW5kZXg9PWN1cnJlbnR9Lz5cblxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9e3ttYXJnaW46MTB9fT5cblx0XHRcdFx0XHRcdFx0XHRcdHtpbmRleD09Y3VycmVudCAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0KDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gbGFiZWw9XCLlrozmiJBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFzay5jb250ZW50W2tleV09dGhpcy5yZWZzW2BlZGl0b3ItJHtrZXl9YF0udmFsdWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXNrLmN1cnJlbnQ9aW5kZXhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZihzdGVwcy5sZW5ndGg9PWluZGV4KzEpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYlRhc2suZmluaXNoKHRhc2spXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe2NvbXBsZXRlZDp0cnVlfSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJUYXNrLnVwc2VydCh0YXNrKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHthY3RpdmU6dXBkYXRlZC5jdXJyZW50KzF9KSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX0vPil9XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvU3RlcENvbnRlbnQ+XG5cdFx0XHRcdFx0XHQ8L1N0ZXA+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cblx0XHRcdFx0PENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1lbnQgdHlwZT17ZGJUYXNrfSBtb2RlbD17dGFza30ga2V5PVwiY29tbWVudFwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5TaGFyZSBtZXNzYWdlPXt0YXNrfSBrZXk9XCJzaGFyZVwiLz5dfS8+XG5cdFx0XHQ8L2FydGljbGU+XG4gICAgICAgIClcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHJvdXRlcjpQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbn1cbiJdfQ==