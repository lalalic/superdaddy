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
	CHANGE: function CHANGE(key, value) {
		return function (dispatch, getState) {
			var child = (0, _selector.getCurrentChild)(getState());
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
		return function (dispatch) {
			var name = baby.name;

			if (!name) return _promise2.default.reject("名字不能空");

			return _db.Family.upsert(baby).then(function (baby) {
				dispatch(ENITITIES((0, _normalizr.normalize)(baby, _db.Family.schema).entities));
				return baby;
			});
		};
	},
	REMOVE: function REMOVE(a) {
		return function (dispatch, getState) {
			var child = (0, _selector.getCurrentChild)(getState());
			return _db.Family.remove(child._id).then(function (a) {
				dispatch((0, _qiliApp.REMOVE_ENTITIES)("children", child.id));
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
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			if (!next.isCurrent) next.dispatch(_.ACTION.SWITCH_CURRENT_CHILD(next.params.id));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    name = _props.name,
			    photo = _props.photo,
			    birthday = _props.bd,
			    gender = _props.gender,
			    todos = _props.todos,
			    dispatch = _props.dispatch;
			var nameError = this.state.nameError;
			var router = this.context.router;


			var changeName = function changeName(a) {
				return dispatch(ACTION.CHANGE("name", refName.getValue().trim())).then(function (a) {
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
							onPhoto: function onPhoto(url) {
								return dispatch(ACTION.CHANGE("photo", url));
							} })
					),
					_react2.default.createElement(TextFieldx, { ref: function ref(a) {
							return refName = a;
						},
						floatingLabelText: "child name",
						fullWidth: true,
						value: name,
						errorText: nameError,
						onChange: function onChange(_ref2) {
							var value = _ref2.target.value;
							return refName.value = value;
						},
						onBlur: function onBlur(_ref3) {
							var value = _ref3.target.value;
							return changeName();
						},
						onKeyDown: function onKeyDown(_ref4) {
							var value = _ref4.target.value,
							    keyCode = _ref4.keyCode;
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
							return dispatch(ACTION.CHANGE("bd", value));
						} }),
					_react2.default.createElement(
						_materialUi.RadioButtonGroup,
						{
							style: { marginTop: 36 },
							name: "gender",
							onChange: function onChange(e, value) {
								return dispatch(ACTION.CHANGE("gender", value));
							},
							valueSelected: gender || "f" },
						_react2.default.createElement(_materialUi.RadioButton, { value: "f", label: "女孩" }),
						_react2.default.createElement(_materialUi.RadioButton, { value: "m", label: "男孩" })
					)
				),
				_react2.default.createElement(CommandBar, { className: "footbar",
					items: ["Back", { action: "Remove", onSelect: function onSelect(a) {
							return dispatch(ACTION.REMOVE()).then(function (a) {
								return router.replace("/");
							});
						} }] })
			);
		}
	}]);
	return Baby;
}(_react.Component);

Baby.contextTypes = { router: _react.PropTypes.object };

var Creator = exports.Creator = function (_Component2) {
	(0, _inherits3.default)(Creator, _Component2);

	function Creator() {
		var _ref5;

		var _temp2, _this3, _ret2;

		(0, _classCallCheck3.default)(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref5 = Creator.__proto__ || (0, _getPrototypeOf2.default)(Creator)).call.apply(_ref5, [this].concat(args))), _this3), _this3.state = { nameError: null }, _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
	}

	(0, _createClass3.default)(Creator, [{
		key: "render",
		value: function render() {
			var _this4 = this;

			var dispatch = this.props.dispatch;
			var router = this.context.router;
			var nameError = this.state.nameError;


			var photo = void 0,
			    refName = void 0,
			    refBirthday = void 0,
			    refGender = void 0;

			var send = function send(a) {
				return dispatch(ACTION.CREATE({
					name: refName.getValue(),
					bd: refBirthday.getDate(),
					gender: refGender.getSelectedValue(),
					photo: photo
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
					_react2.default.createElement(
						"div",
						{ className: "child-photo" },
						_react2.default.createElement(Photo, { onPhoto: function onPhoto(url) {
								return photo = url;
							}, width: 150, height: 150 })
					),
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
						showYearSelector: true,
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
//# sourceMappingURL=data:application/json;base64,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QUNoQix5QkFBa0IsVUFBbEI7QUFDQSxpQkFBVyxJQUFYO0FBQ0EsY0FBUSxJQUFSO0FBQ0Esd0JBQWtCLElBQWxCO0FBQ0EsZUFBUyxJQUFJLElBQUosRUFBVCxFQUxELENBVkQ7S0FpQkM7O1FBQWtCLEtBQUs7ZUFBRyxZQUFVLENBQVY7UUFBSDtBQUN0QixjQUFPLEVBQUMsV0FBVSxFQUFWLEVBQVI7QUFDQSxhQUFLLFFBQUw7QUFDQSx3QkFBZ0IsR0FBaEIsRUFIRDtNQUlDLHlEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sTUFBTixFQUF2QixDQUpEO01BS0MseURBQWEsT0FBTSxHQUFOLEVBQVUsT0FBTSxLQUFOLEVBQXZCLENBTEQ7TUFqQkQ7S0FERDtJQTJCQyw4QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1gsWUFBTyxDQUNOLE1BRE0sRUFFTDtBQUNBLGNBQU8sTUFBUDtBQUNDLGdCQUFTO2NBQUc7T0FBSDtNQUpMLENBQVA7S0FERCxDQTNCRDtJQURELENBZE87Ozs7OztBQUhJLFFBMERMLGVBQWEsRUFBQyxRQUFRLGlCQUFVLE1BQVY7a0JBR2Ysc0JBQWMsSUFBZCxFQUFvQixFQUFDLGNBQUQsRUFBcEIiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSSxFTlRJVElFUyxSRU1PVkVfRU5USVRJRVN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0FDVElPTiBhcyBTdXBlckRhZGR5fSBmcm9tIFwiLlwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLFBob3RvLCBUZXh0RmllbGR4fT1VSVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q0hBTkdFOiAoa2V5LHZhbHVlKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuICAgICAgICBjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcblx0XHRpZihrZXk9PVwibmFtZVwiICYmICF2YWx1ZSl7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblx0XHR9XG5cblx0XHRpZihjaGlsZFtrZXldPT12YWx1ZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG4gICAgICAgIGNoaWxkW2tleV09dmFsdWVcbiAgICAgICAgcmV0dXJuIGRiRmFtaWx5LnVwc2VydChjaGlsZClcbiAgICAgICAgICAgIC50aGVuKHVwZGF0ZWQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHR9KVxuICAgIH1cblx0LENSRUFURTogYmFieT0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7bmFtZX09YmFieVxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cblx0XHRyZXR1cm4gZGJGYW1pbHkudXBzZXJ0KGJhYnkpXG5cdFx0XHQudGhlbihiYWJ5PT57XG5cdFx0XHRcdFx0ZGlzcGF0Y2goRU5JVElUSUVTKG5vcm1hbGl6ZShiYWJ5LGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRcdHJldHVybiBiYWJ5XG5cdFx0XHRcdH0pXG5cdH1cblx0LFJFTU9WRTogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxuXHRcdHJldHVybiBkYkZhbWlseS5yZW1vdmUoY2hpbGQuX2lkKVxuXHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRkaXNwYXRjaChSRU1PVkVfRU5USVRJRVMoXCJjaGlsZHJlblwiLGNoaWxkLmlkKSlcblx0XHRcdH0pXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdGlmKCFuZXh0LmlzQ3VycmVudClcblx0XHRcdG5leHQuZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChuZXh0LnBhcmFtcy5pZCkpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7bmFtZSxwaG90byxiZDpiaXJ0aGRheSxnZW5kZXIsIHRvZG9zLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblxuXHRcdGNvbnN0IGNoYW5nZU5hbWU9YT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcIm5hbWVcIixyZWZOYW1lLmdldFZhbHVlKCkudHJpbSgpKSlcblx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjpudWxsfSksIGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblx0XHRsZXQgcmVmTmFtZVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHRcdDxQaG90b1xuXHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ9ezE1MH1cblx0XHRcdFx0XHRcdFx0c3JjPXtwaG90b31cblx0XHRcdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwicGhvdG9cIix1cmwpKX0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e25hbWV9XG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZk5hbWUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSgpfVxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgY2hhbmdlTmFtZSgpfVxuXHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdDxEYXRlUGlja2VyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX1cblx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9XG5cdFx0XHRcdFx0XHR2YWx1ZT17YmlydGhkYXl9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KG5pbCwgdmFsdWUpPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwiYmRcIix2YWx1ZSkpfS8+XG5cblx0XHRcdFx0XHQ8UmFkaW9CdXR0b25Hcm91cFxuXHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuXHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsdmFsdWUpPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwiZ2VuZGVyXCIsdmFsdWUpKX1cblx0XHRcdFx0XHRcdHZhbHVlU2VsZWN0ZWQ9e2dlbmRlcnx8XCJmXCJ9PlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwi5aWz5a2pXCIvPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwi55S35a2pXCIgLz5cblx0XHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHRcIkJhY2tcIlxuXHRcdFx0XHRcdFx0LCB7YWN0aW9uOlwiUmVtb3ZlXCIsIG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoKSkudGhlbihhPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpfV19Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cbn1cblxuZXhwb3J0IGNsYXNzIENyZWF0b3IgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRjb25zdCB7bmFtZUVycm9yfT10aGlzLnN0YXRlXG5cblx0XHRsZXQgcGhvdG8scmVmTmFtZSwgcmVmQmlydGhkYXksIHJlZkdlbmRlclxuXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHtcblx0XHRcdG5hbWU6IHJlZk5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LGJkOiByZWZCaXJ0aGRheS5nZXREYXRlKClcblx0XHRcdCxnZW5kZXI6IHJlZkdlbmRlci5nZXRTZWxlY3RlZFZhbHVlKClcblx0XHRcdCxwaG90b1xuXHRcdH0pKS50aGVuKGJhYnk9PnJvdXRlci5yZXBsYWNlKGAvYmFieS8ke2JhYnkuX2lkfWApLGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG5cdFx0XHRcdFx0XHQ8UGhvdG8gb25QaG90bz17dXJsPT5waG90bz11cmx9IHdpZHRoPXsxNTB9IGhlaWdodD17MTUwfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZCaXJ0aGRheT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuXHRcdFx0XHRcdFx0bWF4RGF0ZT17bmV3IERhdGUoKX0vPlxuXG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgcmVmPXthPT5yZWZHZW5kZXI9YX1cblx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdG5hbWU9XCJnZW5kZXJcIlxuXHRcdFx0XHRcdFx0ZGVmYXVsdFNlbGVjdGVkPVwiZlwiPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cImJveVwiIC8+XG5cdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0XCJCYWNrXCJcblx0XHRcdFx0XHRcdCx7XG5cdFx0XHRcdFx0XHRcdGFjdGlvbjpcIlNhdmVcIlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+c2VuZCgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XX1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjogUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihCYWJ5LCB7QUNUSU9OfSlcbiJdfQ==