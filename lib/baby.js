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
					_react2.default.createElement(TextFieldx, { ref: function ref(a) {
							return refName = a;
						},
						floatingLabelText: "child name",
						fullWidth: true,
						value: name,
						errorText: nameError,
						onChange: function onChange(_ref3) {
							var value = _ref3.target.value;
							return refName.value = value;
						},
						onBlur: function onBlur(_ref4) {
							var value = _ref4.target.value;
							return changeName();
						},
						onKeyDown: function onKeyDown(_ref5) {
							var value = _ref5.target.value,
							    keyCode = _ref5.keyCode;
							return keyCode == 13 && changeName();
						}
					}),
					_react2.default.createElement(_materialUi.DatePicker, {
						floatingLabelText: "birthday",
						fullWidth: true,
						autoOk: true,
						maxDate: new Date(),
						value: birthday,
						onChange: function onChange(nil, value) {
							return dispatch(ACTION.CHANGE(id, "bd", value));
						} }),
					_react2.default.createElement(
						_materialUi.RadioButtonGroup,
						{
							style: { marginTop: 36 },
							name: "gender",
							onChange: function onChange(e, value) {
								return dispatch(ACTION.CHANGE(id, "gender", value));
							},
							valueSelected: gender || "f" },
						_react2.default.createElement(_materialUi.RadioButton, { value: "f", label: "\u5973\u5B69" }),
						_react2.default.createElement(_materialUi.RadioButton, { value: "m", label: "\u7537\u5B69" })
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
		var _ref6;

		var _temp2, _this3, _ret2;

		(0, _classCallCheck3.default)(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref6 = Creator.__proto__ || (0, _getPrototypeOf2.default)(Creator)).call.apply(_ref6, [this].concat(args))), _this3), _this3.state = { nameError: null }, _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJBQ1RJT04iLCJDSEFOR0UiLCJpZCIsImtleSIsInZhbHVlIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImNoaWxkIiwicmVqZWN0IiwicmVzb2x2ZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJDUkVBVEUiLCJuYW1lIiwiYmFieSIsIlJFTU9WRSIsInJlbW92ZSIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiQmFieSIsInN0YXRlIiwibmFtZUVycm9yIiwicHJvcHMiLCJpc0N1cnJlbnQiLCJwYXJhbXMiLCJwaG90byIsImJpcnRoZGF5IiwiYmQiLCJnZW5kZXIiLCJ0b2RvcyIsInJvdXRlciIsImNvbnRleHQiLCJjaGFuZ2VOYW1lIiwicmVmTmFtZSIsImdldFZhbHVlIiwidHJpbSIsInNldFN0YXRlIiwiZXJyb3IiLCJ1cmwiLCJhIiwidGFyZ2V0Iiwia2V5Q29kZSIsIkRhdGUiLCJuaWwiLCJtYXJnaW5Ub3AiLCJlIiwiYWN0aW9uIiwib25TZWxlY3QiLCJyZXBsYWNlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRvciIsInJlZkJpcnRoZGF5IiwicmVmR2VuZGVyIiwic2VuZCIsImdldERhdGUiLCJnZXRTZWxlY3RlZFZhbHVlIiwiX2lkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7SUFFT0EsVSxlQUFBQSxVO0lBQVdDLEssZUFBQUEsSztJQUFPQyxVLGVBQUFBLFU7QUFFbEIsSUFBTUMsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLEVBQUQsRUFBS0MsR0FBTCxFQUFTQyxLQUFUO0FBQUEsU0FBaUIsVUFBQ0MsUUFBRCxFQUFVQyxRQUFWLEVBQXFCO0FBQ3ZDLE9B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VyxZQUFVZCxDQUFiO0FBQUEsUUFBdkI7QUFDQyxjQUFPLEVBQUNLLFdBQVUsRUFBWCxFQURSO0FBRUMsYUFBSyxRQUZOO0FBR0Msd0JBQWdCLEdBSGpCO0FBSUMsK0RBQWEsT0FBTSxHQUFuQixFQUF1QixPQUFNLE1BQTdCLEdBSkQ7QUFLQywrREFBYSxPQUFNLEdBQW5CLEVBQXVCLE9BQU0sS0FBN0I7QUFMRDtBQVpELEtBREQ7QUFzQkMsa0NBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEI7QUFDQyxZQUFPLENBQ04sTUFETSxFQUVMO0FBQ0FFLGNBQU8sTUFEUDtBQUVDQyxnQkFBUztBQUFBLGNBQUdPLE1BQUg7QUFBQTtBQUZWLE1BRks7QUFEUjtBQXRCRCxJQUREO0FBa0NBOzs7OztBQWxEV0gsTyxDQW9ETEYsWSxHQUFhLEVBQUNuQixRQUFRLGlCQUFVb0IsTUFBbkIsRTtrQkFHTixzQkFBYy9CLElBQWQsRUFBb0IsRUFBQ3JCLGNBQUQsRUFBcEIsQyIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJLEVOVElUSUVTLFJFTU9WRV9FTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0FDVElPTiBhcyBTdXBlckRhZGR5fSBmcm9tIFwiLlwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLFBob3RvLCBUZXh0RmllbGR4fT1VSVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q0hBTkdFOiAoaWQsIGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcbiAgICAgICAgY29uc3QgY2hpbGQ9Z2V0Q2hpbGQoZ2V0U3RhdGUoKSxpZClcblx0XHRpZihrZXk9PVwibmFtZVwiICYmICF2YWx1ZSl7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblx0XHR9XG5cblx0XHRpZihjaGlsZFtrZXldPT12YWx1ZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG4gICAgICAgIGNoaWxkW2tleV09dmFsdWVcbiAgICAgICAgcmV0dXJuIGRiRmFtaWx5LnVwc2VydChjaGlsZClcbiAgICAgICAgICAgIC50aGVuKHVwZGF0ZWQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHR9KVxuICAgIH1cblx0LENSRUFURTogYmFieT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHtuYW1lfT1iYWJ5XG5cdFx0aWYoIW5hbWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblxuXHRcdHJldHVybiBkYkZhbWlseS51cHNlcnQoYmFieSlcblx0XHRcdC50aGVuKGJhYnk9Pntcblx0XHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoYmFieSxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0XHRyZXR1cm4gYmFieVxuXHRcdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGRiRmFtaWx5LnJlbW92ZShpZClcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdFx0XHRcdGRpc3BhdGNoKFJFTU9WRV9FTlRJVElFUyhcImNoaWxkcmVuXCIsaWQpKVxuXHRcdFx0fSlcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge2lzQ3VycmVudCxwYXJhbXM6e2lkfSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZighaXNDdXJyZW50KVxuXHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtpc0N1cnJlbnQsZGlzcGF0Y2gscGFyYW1zOntpZH19KXtcblx0XHRpZighaXNDdXJyZW50KVxuXHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7bmFtZSxwaG90byxiZDpiaXJ0aGRheSxnZW5kZXIsIHRvZG9zLCBkaXNwYXRjaCxwYXJhbXM6e2lkfX09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblxuXHRcdGNvbnN0IGNoYW5nZU5hbWU9YT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcIm5hbWVcIixyZWZOYW1lLmdldFZhbHVlKCkudHJpbSgpKSlcblx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjpudWxsfSksIGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblx0XHRsZXQgcmVmTmFtZVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHRcdDxQaG90b1xuXHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ9ezE1MH1cblx0XHRcdFx0XHRcdFx0c3JjPXtwaG90b31cblx0XHRcdFx0XHRcdFx0b3ZlcndyaXRhYmxlPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJwaG90b1wiLHVybCkpfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17bmFtZX1cblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmTmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBjaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0bWF4RGF0ZT17bmV3IERhdGUoKX1cblx0XHRcdFx0XHRcdHZhbHVlPXtiaXJ0aGRheX1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsobmlsLCB2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJiZFwiLHZhbHVlKSl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwXG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSx2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJnZW5kZXJcIix2YWx1ZSkpfVxuXHRcdFx0XHRcdFx0dmFsdWVTZWxlY3RlZD17Z2VuZGVyfHxcImZcIn0+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCLlpbPlralcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCLnlLflralcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQsIHtcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiUmVtb3ZlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoaWQpKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5yZXBsYWNlKFwiL1wiKVxuXHRcdFx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdFx0XX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblxuXHRcdGxldCByZWZOYW1lLCByZWZCaXJ0aGRheSwgcmVmR2VuZGVyXG5cblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUoe1xuXHRcdFx0bmFtZTogcmVmTmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQsYmQ6IHJlZkJpcnRoZGF5LmdldERhdGUoKVxuXHRcdFx0LGdlbmRlcjogcmVmR2VuZGVyLmdldFNlbGVjdGVkVmFsdWUoKVxuXHRcdH0pKS50aGVuKGJhYnk9PnJvdXRlci5yZXBsYWNlKGAvYmFieS8ke2JhYnkuX2lkfWApLGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZCaXJ0aGRheT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XG5cblx0XHRcdFx0XHQ8UmFkaW9CdXR0b25Hcm91cCByZWY9e2E9PnJlZkdlbmRlcj1hfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuXHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRkZWZhdWx0U2VsZWN0ZWQ9XCJmXCI+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cblx0XHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHRcIkJhY2tcIlxuXHRcdFx0XHRcdFx0LHtcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiU2F2ZVwiXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5zZW5kKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEJhYnksIHtBQ1RJT059KVxuIl19