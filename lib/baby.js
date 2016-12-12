"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.Baby = exports.ACTION = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _materialUi = require("material-ui");

var _db = require("./db");

var _selector = require("./selector");

var _ = require(".");

var _infoForm = require("qili-app/lib/components/info-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommandBar = _qiliApp.UI.CommandBar,
    Photo = _qiliApp.UI.Photo,
    TextFieldx = _qiliApp.UI.TextFieldx;
var ACTION = exports.ACTION = {
	CHANGE: function CHANGE(id, key, value) {
		return function (dispatch, getState) {
			var child = (0, _selector.getChild)(getState(), id);
			if (key == "name" && !value) {
				return _promise2.default.reject("名字不能空");
			}

			if (child[key] == value) return _promise2.default.resolve();

			child[key] = value;
			return _db.Family.upsert(child).then(function (updated) {
				dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	},
	CREATE: function CREATE(baby) {
		return function (dispatch, getState) {
			var name = baby.name;

			if (!name) return _promise2.default.reject("名字不能空");

			return _db.Family.upsert(baby).then(function (baby) {
				dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(baby, _db.Family.schema).entities));
				return baby;
			});
		};
	},
	REMOVE: function REMOVE(id) {
		return function (dispatch, getState) {
			return _db.Family.remove(id).then(function (a) {
				dispatch(_.ACTION.SWITCH_CURRENT_CHILD(id));
				dispatch((0, _qiliApp.REMOVE_ENTITIES)("children", id));
			});
		};
	}
};

var Baby = exports.Baby = function (_Component) {
	(0, _inherits3.default)(Baby, _Component);

	function Baby() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Baby);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Baby.__proto__ || (0, _getPrototypeOf2.default)(Baby)).call.apply(_ref, [this].concat(args))), _this), _this.state = { nameError: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Baby, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props = this.props,
			    isCurrent = _props.isCurrent,
			    id = _props.params.id,
			    dispatch = _props.dispatch;

			if (!isCurrent) dispatch(_.ACTION.SWITCH_CURRENT_CHILD(id));
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(_ref2) {
			var isCurrent = _ref2.isCurrent,
			    dispatch = _ref2.dispatch,
			    id = _ref2.params.id;

			if (!isCurrent) dispatch(_.ACTION.SWITCH_CURRENT_CHILD(id));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    name = _props2.name,
			    photo = _props2.photo,
			    birthday = _props2.bd,
			    gender = _props2.gender,
			    score = _props2.score,
			    todo = _props2.todo,
			    goal = _props2.goal,
			    _props2$totalScore = _props2.totalScore,
			    totalScore = _props2$totalScore === undefined ? score : _props2$totalScore,
			    todos = _props2.todos,
			    dispatch = _props2.dispatch,
			    id = _props2.params.id;
			var nameError = this.state.nameError;
			var router = this.context.router;


			var changeName = function changeName(a) {
				return dispatch(ACTION.CHANGE(id, "name", refName.getValue().trim())).then(function (a) {
					return _this2.setState({ nameError: null });
				}, function (error) {
					return _this2.setState({ nameError: error });
				});
			};
			var refName = void 0;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ className: "form" },
					_react2.default.createElement(
						"div",
						{ className: "child-photo" },
						_react2.default.createElement(Photo, {
							width: 150,
							height: 150,
							src: photo,
							overwritable: true,
							onPhoto: function onPhoto(url) {
								return dispatch(ACTION.CHANGE(id, "photo", url));
							} })
					),
					_react2.default.createElement(
						_infoForm.InfoForm,
						null,
						_react2.default.createElement(_infoForm.Field, { primaryText: "\u5B9D\u5B9D\u540D", value: name,
							onEdit: function onEdit(value) {
								return dispatch(ACTION.CHANGE(id, "name", value));
							} }),
						_react2.default.createElement(_infoForm.Field, { primaryText: "\u751F\u65E5", value: birthday,
							type: "date",
							onEdit: function onEdit(value) {
								return dispatch(ACTION.CHANGE(id, "bd", value));
							} }),
						_react2.default.createElement(_infoForm.Field, { primaryText: "\u6027\u522B", value: gender || "f",
							type: "single",
							options: [{ value: "f", label: "女孩" }, { value: "m", label: "男孩" }],
							onEdit: function onEdit(value) {
								return dispatch(ACTION.CHANGE(id, "gender", value));
							}
						}),
						_react2.default.createElement(
							_materialUi.Subheader,
							null,
							"\u5F53\u524D\u4EFB\u52A1"
						),
						_react2.default.createElement(_infoForm.Field, { primaryText: "\u6210\u7EE9", value: "" + score + (totalScore == score ? "" : "/" + totalScore) }),
						_react2.default.createElement(_infoForm.Field, { primaryText: "\u76EE\u6807", value: todo,
							type: "input",
							onEdit: function onEdit(value) {
								return dispatch(ACTION.CHANGE(id, "todo", value));
							}
						})
					)
				),
				_react2.default.createElement(CommandBar, { className: "footbar",
					items: ["Back", {
						action: "Remove",
						onSelect: function onSelect(a) {
							return dispatch(ACTION.REMOVE(id)).then(function (a) {
								router.replace("/");
							});
						} }]
				})
			);
		}
	}]);
	return Baby;
}(_react.Component);

Baby.contextTypes = { router: _react.PropTypes.object };

var Creator = exports.Creator = function (_Component2) {
	(0, _inherits3.default)(Creator, _Component2);

	function Creator() {
		var _ref3;

		var _temp2, _this3, _ret2;

		(0, _classCallCheck3.default)(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = Creator.__proto__ || (0, _getPrototypeOf2.default)(Creator)).call.apply(_ref3, [this].concat(args))), _this3), _this3.state = { nameError: null }, _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
	}

	(0, _createClass3.default)(Creator, [{
		key: "render",
		value: function render() {
			var _this4 = this;

			var dispatch = this.props.dispatch;
			var router = this.context.router;
			var nameError = this.state.nameError;


			var refName = void 0,
			    refBirthday = void 0,
			    refGender = void 0;

			var send = function send(a) {
				return dispatch(ACTION.CREATE({
					name: refName.getValue(),
					bd: refBirthday.getDate(),
					gender: refGender.getSelectedValue()
				})).then(function (baby) {
					return router.replace("/baby/" + baby._id);
				}, function (error) {
					return _this4.setState({ nameError: error });
				});
			};

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ className: "form" },
					_react2.default.createElement(TextFieldx, { ref: function ref(a) {
							return refName = a;
						},
						floatingLabelText: "child name",
						errorText: nameError,
						fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: function ref(a) {
							return refBirthday = a;
						},
						floatingLabelText: "birthday",
						fullWidth: true,
						autoOk: true,
						maxDate: new Date() }),
					_react2.default.createElement(
						_materialUi.RadioButtonGroup,
						{ ref: function ref(a) {
								return refGender = a;
							},
							style: { marginTop: 36 },
							name: "gender",
							defaultSelected: "f" },
						_react2.default.createElement(_materialUi.RadioButton, { value: "f", label: "girl" }),
						_react2.default.createElement(_materialUi.RadioButton, { value: "m", label: "boy" })
					)
				),
				_react2.default.createElement(CommandBar, { className: "footbar",
					items: ["Back", {
						action: "Save",
						onSelect: function onSelect(a) {
							return send();
						}
					}]
				})
			);
		}
	}]);
	return Creator;
}(_react.Component);

Creator.contextTypes = { router: _react.PropTypes.object };
exports.default = (0, _assign2.default)(Baby, { ACTION: ACTION });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJBQ1RJT04iLCJDSEFOR0UiLCJpZCIsImtleSIsInZhbHVlIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImNoaWxkIiwicmVqZWN0IiwicmVzb2x2ZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJDUkVBVEUiLCJuYW1lIiwiYmFieSIsIlJFTU9WRSIsInJlbW92ZSIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiQmFieSIsInN0YXRlIiwibmFtZUVycm9yIiwicHJvcHMiLCJpc0N1cnJlbnQiLCJwYXJhbXMiLCJwaG90byIsImJpcnRoZGF5IiwiYmQiLCJnZW5kZXIiLCJzY29yZSIsInRvZG8iLCJnb2FsIiwidG90YWxTY29yZSIsInRvZG9zIiwicm91dGVyIiwiY29udGV4dCIsImNoYW5nZU5hbWUiLCJyZWZOYW1lIiwiZ2V0VmFsdWUiLCJ0cmltIiwic2V0U3RhdGUiLCJlcnJvciIsInVybCIsImxhYmVsIiwiYWN0aW9uIiwib25TZWxlY3QiLCJyZXBsYWNlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRvciIsInJlZkJpcnRoZGF5IiwicmVmR2VuZGVyIiwic2VuZCIsImdldERhdGUiLCJnZXRTZWxlY3RlZFZhbHVlIiwiX2lkIiwiYSIsIkRhdGUiLCJtYXJnaW5Ub3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztJQUVPQSxVLGVBQUFBLFU7SUFBV0MsSyxlQUFBQSxLO0lBQU9DLFUsZUFBQUEsVTtBQUVsQixJQUFNQywwQkFBTztBQUNuQkMsU0FBUSxnQkFBQ0MsRUFBRCxFQUFLQyxHQUFMLEVBQVNDLEtBQVQ7QUFBQSxTQUFpQixVQUFDQyxRQUFELEVBQVVD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SUFIVDtBQUlDLGVBQVMsSUFBSUMsSUFBSixFQUpWLEdBTkQ7QUFZQztBQUFBO0FBQUEsUUFBa0IsS0FBSztBQUFBLGVBQUdOLFlBQVVLLENBQWI7QUFBQSxRQUF2QjtBQUNDLGNBQU8sRUFBQ0UsV0FBVSxFQUFYLEVBRFI7QUFFQyxhQUFLLFFBRk47QUFHQyx3QkFBZ0IsR0FIakI7QUFJQywrREFBYSxPQUFNLEdBQW5CLEVBQXVCLE9BQU0sTUFBN0IsR0FKRDtBQUtDLCtEQUFhLE9BQU0sR0FBbkIsRUFBdUIsT0FBTSxLQUE3QjtBQUxEO0FBWkQsS0FERDtBQXNCQyxrQ0FBQyxVQUFELElBQVksV0FBVSxTQUF0QjtBQUNDLFlBQU8sQ0FDTixNQURNLEVBRUw7QUFDQWQsY0FBTyxNQURQO0FBRUNDLGdCQUFTO0FBQUEsY0FBR08sTUFBSDtBQUFBO0FBRlYsTUFGSztBQURSO0FBdEJELElBREQ7QUFrQ0E7Ozs7O0FBbERXSCxPLENBb0RMRixZLEdBQWEsRUFBQ2IsUUFBUSxpQkFBVWMsTUFBbkIsRTtrQkFHTixzQkFBYzdCLElBQWQsRUFBb0IsRUFBQ3JCLGNBQUQsRUFBcEIsQyIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJLEVOVElUSUVTLFJFTU9WRV9FTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcixTdWJoZWFkZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuaW1wb3J0IHtBQ1RJT04gYXMgU3VwZXJEYWRkeX0gZnJvbSBcIi5cIlxuXG5pbXBvcnQge0luZm9Gb3JtLCBGaWVsZH0gZnJvbSBcInFpbGktYXBwL2xpYi9jb21wb25lbnRzL2luZm8tZm9ybVwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLFBob3RvLCBUZXh0RmllbGR4fT1VSVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q0hBTkdFOiAoaWQsIGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcbiAgICAgICAgY29uc3QgY2hpbGQ9Z2V0Q2hpbGQoZ2V0U3RhdGUoKSxpZClcblx0XHRpZihrZXk9PVwibmFtZVwiICYmICF2YWx1ZSl7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblx0XHR9XG5cblx0XHRpZihjaGlsZFtrZXldPT12YWx1ZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG4gICAgICAgIGNoaWxkW2tleV09dmFsdWVcbiAgICAgICAgcmV0dXJuIGRiRmFtaWx5LnVwc2VydChjaGlsZClcbiAgICAgICAgICAgIC50aGVuKHVwZGF0ZWQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHR9KVxuICAgIH1cblx0LENSRUFURTogYmFieT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHtuYW1lfT1iYWJ5XG5cdFx0aWYoIW5hbWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblxuXHRcdHJldHVybiBkYkZhbWlseS51cHNlcnQoYmFieSlcblx0XHRcdC50aGVuKGJhYnk9Pntcblx0XHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoYmFieSxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0XHRyZXR1cm4gYmFieVxuXHRcdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGRiRmFtaWx5LnJlbW92ZShpZClcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdFx0XHRcdGRpc3BhdGNoKFJFTU9WRV9FTlRJVElFUyhcImNoaWxkcmVuXCIsaWQpKVxuXHRcdFx0fSlcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge2lzQ3VycmVudCxwYXJhbXM6e2lkfSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZighaXNDdXJyZW50KVxuXHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtpc0N1cnJlbnQsZGlzcGF0Y2gscGFyYW1zOntpZH19KXtcblx0XHRpZighaXNDdXJyZW50KVxuXHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7bmFtZSxwaG90byxiZDpiaXJ0aGRheSxnZW5kZXIsIHNjb3JlLCB0b2RvLCBnb2FsLCB0b3RhbFNjb3JlPXNjb3JlLCB0b2RvcywgZGlzcGF0Y2gscGFyYW1zOntpZH19PXRoaXMucHJvcHNcblx0XHRjb25zdCB7bmFtZUVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cblx0XHRjb25zdCBjaGFuZ2VOYW1lPWE9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJuYW1lXCIscmVmTmFtZS5nZXRWYWx1ZSgpLnRyaW0oKSkpXG5cdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6bnVsbH0pLCBlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXG5cdFx0bGV0IHJlZk5hbWVcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG5cdFx0XHRcdFx0XHQ8UGhvdG9cblx0XHRcdFx0XHRcdFx0d2lkdGg9ezE1MH1cblx0XHRcdFx0XHRcdFx0aGVpZ2h0PXsxNTB9XG5cdFx0XHRcdFx0XHRcdHNyYz17cGhvdG99XG5cdFx0XHRcdFx0XHRcdG92ZXJ3cml0YWJsZT17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKGlkLFwicGhvdG9cIix1cmwpKX0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PEluZm9Gb3JtPlxuXHRcdFx0XHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5a6d5a6d5ZCNXCIgdmFsdWU9e25hbWV9XG5cdFx0XHRcdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJuYW1lXCIsdmFsdWUpKX0vPlxuXG5cdFx0XHRcdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLnlJ/ml6VcIiB2YWx1ZT17YmlydGhkYXl9XG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJkYXRlXCJcblx0XHRcdFx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcImJkXCIsdmFsdWUpKX0vPlxuXG5cdFx0XHRcdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLmgKfliKtcIiB2YWx1ZT17Z2VuZGVyfHxcImZcIn1cblx0XHRcdFx0XHRcdFx0dHlwZT1cInNpbmdsZVwiXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM9e1t7dmFsdWU6XCJmXCIsbGFiZWw6XCLlpbPlralcIn0se3ZhbHVlOlwibVwiLCBsYWJlbDpcIueUt+WtqVwifV19XG5cdFx0XHRcdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJnZW5kZXJcIix2YWx1ZSkpfVxuXHRcdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0XHQ8U3ViaGVhZGVyPuW9k+WJjeS7u+WKoTwvU3ViaGVhZGVyPlxuXG5cdFx0XHRcdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLmiJDnu6lcIiB2YWx1ZT17YCR7c2NvcmV9JHt0b3RhbFNjb3JlPT1zY29yZSA/IFwiXCIgOiBgLyR7dG90YWxTY29yZX1gfWB9Lz5cblxuXHRcdFx0XHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi55uu5qCHXCIgdmFsdWU9e3RvZG99XG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJpbnB1dFwiXG5cdFx0XHRcdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJ0b2RvXCIsdmFsdWUpKX1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0luZm9Gb3JtPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0XCJCYWNrXCJcblx0XHRcdFx0XHRcdCwge1xuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJSZW1vdmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRShpZCkpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnJlcGxhY2UoXCIvXCIpXG5cdFx0XHRcdFx0XHRcdFx0fSl9XG5cdFx0XHRcdFx0XHRdfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge25hbWVFcnJvcn09dGhpcy5zdGF0ZVxuXG5cdFx0bGV0IHJlZk5hbWUsIHJlZkJpcnRoZGF5LCByZWZHZW5kZXJcblxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh7XG5cdFx0XHRuYW1lOiByZWZOYW1lLmdldFZhbHVlKClcblx0XHRcdCxiZDogcmVmQmlydGhkYXkuZ2V0RGF0ZSgpXG5cdFx0XHQsZ2VuZGVyOiByZWZHZW5kZXIuZ2V0U2VsZWN0ZWRWYWx1ZSgpXG5cdFx0fSkpLnRoZW4oYmFieT0+cm91dGVyLnJlcGxhY2UoYC9iYWJ5LyR7YmFieS5faWR9YCksZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9e2E9PnJlZkJpcnRoZGF5PWF9XG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX1cblx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIHJlZj17YT0+cmVmR2VuZGVyPWF9XG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdGRlZmF1bHRTZWxlY3RlZD1cImZcIj5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQse1xuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJTYXZlXCJcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PnNlbmQoKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF19XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQmFieSwge0FDVElPTn0pXG4iXX0=