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

var _rewards = require("./components/rewards");

var _rewards2 = _interopRequireDefault(_rewards);

var _selector = require("./selector");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommandBar = _qiliApp.UI.CommandBar;
var Photo = _qiliApp.UI.Photo;
var TextFieldx = _qiliApp.UI.TextFieldx;
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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Baby);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Baby)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { nameError: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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

			var _props = this.props;
			var name = _props.name;
			var photo = _props.photo;
			var birthday = _props.bd;
			var gender = _props.gender;
			var dispatch = _props.dispatch;
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
						onChange: function onChange(_ref) {
							var value = _ref.target.value;
							return refName.value = value;
						},
						onBlur: function onBlur(_ref2) {
							var value = _ref2.target.value;
							return changeName();
						},
						onKeyDown: function onKeyDown(_ref3) {
							var value = _ref3.target.value;
							var keyCode = _ref3.keyCode;
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
					),
					_react2.default.createElement(
						"div",
						null,
						_react2.default.createElement("br", null),
						_react2.default.createElement("br", null),
						_react2.default.createElement(
							"div",
							{ style: { fontSize: "smaller", color: "gray", borderBottom: "1px dotted lightgray" } },
							name,
							"的激励计划"
						)
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
		var _Object$getPrototypeO2;

		var _temp2, _this3, _ret2;

		(0, _classCallCheck3.default)(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO2 = (0, _getPrototypeOf2.default)(Creator)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.state = { nameError: null }, _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
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
//# sourceMappingURL=data:application/json;base64,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QVEsR0FBUixFQUE1QyxDQUREO01BREQ7S0FLQyw4QkFBQyxVQUFELElBQVksS0FBSztjQUFHLFVBQVEsQ0FBUjtPQUFIO0FBQ2hCLHlCQUFrQixZQUFsQjtBQUNBLGlCQUFXLFNBQVg7QUFDQSxpQkFBVyxJQUFYLEVBSEQsQ0FMRDtLQVVDLHdEQUFZLEtBQUs7Y0FBRyxjQUFZLENBQVo7T0FBSDtBQUNoQix5QkFBa0IsVUFBbEI7QUFDQSxpQkFBVyxJQUFYO0FBQ0EsY0FBUSxJQUFSO0FBQ0Esd0JBQWtCLElBQWxCO0FBQ0EsZUFBUyxJQUFJLElBQUosRUFBVCxFQUxELENBVkQ7S0FpQkM7O1FBQWtCLEtBQUs7ZUFBRyxZQUFVLENBQVY7UUFBSDtBQUN0QixjQUFPLEVBQUMsV0FBVSxFQUFWLEVBQVI7QUFDQSxhQUFLLFFBQUw7QUFDQSx3QkFBZ0IsR0FBaEIsRUFIRDtNQUlDLHlEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sTUFBTixFQUF2QixDQUpEO01BS0MseURBQWEsT0FBTSxHQUFOLEVBQVUsT0FBTSxLQUFOLEVBQXZCLENBTEQ7TUFqQkQ7S0FERDtJQTJCQyw4QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1gsWUFBTyxDQUNOLE1BRE0sRUFFTDtBQUNBLGNBQU8sTUFBUDtBQUNDLGdCQUFTO2NBQUc7T0FBSDtNQUpMLENBQVA7S0FERCxDQTNCRDtJQURELENBZE87OztRQUhJOzs7UUEwREwsZUFBYSxFQUFDLFFBQVEsaUJBQVUsTUFBVjtrQkFHZixzQkFBYyxJQUFkLEVBQW9CLEVBQUMsY0FBRCxFQUFwQiIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJLEVOVElUSUVTLFJFTU9WRV9FTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IFJld2FyZEdvYWwgZnJvbSAnLi9jb21wb25lbnRzL3Jld2FyZHMnXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuaW1wb3J0IHtBQ1RJT04gYXMgU3VwZXJEYWRkeX0gZnJvbSBcIi5cIlxuXG5jb25zdCB7Q29tbWFuZEJhcixQaG90bywgVGV4dEZpZWxkeH09VUlcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdENIQU5HRTogKGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcbiAgICAgICAgY29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXG5cdFx0aWYoa2V5PT1cIm5hbWVcIiAmJiAhdmFsdWUpe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cdFx0fVxuXG5cdFx0aWYoY2hpbGRba2V5XT09dmFsdWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjaGlsZFtrZXldPXZhbHVlXG4gICAgICAgIHJldHVybiBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG4gICAgICAgICAgICAudGhlbih1cGRhdGVkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0fSlcbiAgICB9XG5cdCxDUkVBVEU6IGJhYnk9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge25hbWV9PWJhYnlcblx0XHRpZighbmFtZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIuWQjeWtl+S4jeiDveepulwiKVxuXG5cdFx0cmV0dXJuIGRiRmFtaWx5LnVwc2VydChiYWJ5KVxuXHRcdFx0LnRoZW4oYmFieT0+e1xuXHRcdFx0XHRcdGRpc3BhdGNoKEVOSVRJVElFUyhub3JtYWxpemUoYmFieSxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0XHRyZXR1cm4gYmFieVxuXHRcdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcblx0XHRyZXR1cm4gZGJGYW1pbHkucmVtb3ZlKGNoaWxkLl9pZClcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0ZGlzcGF0Y2goUkVNT1ZFX0VOVElUSUVTKFwiY2hpbGRyZW5cIixjaGlsZC5pZCkpXG5cdFx0XHR9KVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWJ5IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZighbmV4dC5pc0N1cnJlbnQpXG5cdFx0XHRuZXh0LmRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQobmV4dC5wYXJhbXMuaWQpKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWUscGhvdG8sYmQ6YmlydGhkYXksZ2VuZGVyLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblxuXHRcdGNvbnN0IGNoYW5nZU5hbWU9YT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcIm5hbWVcIixyZWZOYW1lLmdldFZhbHVlKCkudHJpbSgpKSlcblx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjpudWxsfSksIGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblx0XHRsZXQgcmVmTmFtZVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHRcdDxQaG90b1xuXHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ9ezE1MH1cblx0XHRcdFx0XHRcdFx0c3JjPXtwaG90b31cblx0XHRcdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwicGhvdG9cIix1cmwpKX0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e25hbWV9XG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZk5hbWUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSgpfVxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgY2hhbmdlTmFtZSgpfVxuXHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdDxEYXRlUGlja2VyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX1cblx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9XG5cdFx0XHRcdFx0XHR2YWx1ZT17YmlydGhkYXl9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KG5pbCwgdmFsdWUpPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwiYmRcIix2YWx1ZSkpfS8+XG5cblx0XHRcdFx0XHQ8UmFkaW9CdXR0b25Hcm91cFxuXHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuXHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsdmFsdWUpPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwiZ2VuZGVyXCIsdmFsdWUpKX1cblx0XHRcdFx0XHRcdHZhbHVlU2VsZWN0ZWQ9e2dlbmRlcnx8XCJmXCJ9PlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwi5aWz5a2pXCIvPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwi55S35a2pXCIgLz5cblx0XHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XG5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7Zm9udFNpemU6XCJzbWFsbGVyXCIsIGNvbG9yOlwiZ3JheVwiLCBib3JkZXJCb3R0b206XCIxcHggZG90dGVkIGxpZ2h0Z3JheVwifX0+XG5cdFx0XHRcdFx0XHRcdHtuYW1lfeeahOa/gOWKseiuoeWIklxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHR7Lypcblx0XHRcdFx0XHRcdDxSZXdhcmRHb2FsXG5cdFx0XHRcdFx0XHRcdGVkaXRhYmxlPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozMH19XG5cdFx0XHRcdFx0XHRcdGNoaWxkPXtjaGlsZH0vPiovfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0XCJCYWNrXCJcblx0XHRcdFx0XHRcdCwge2FjdGlvbjpcIlJlbW92ZVwiLCBvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uUkVNT1ZFKCkpLnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoXCIvXCIpKX1dfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge25hbWVFcnJvcn09dGhpcy5zdGF0ZVxuXG5cdFx0bGV0IHBob3RvLHJlZk5hbWUsIHJlZkJpcnRoZGF5LCByZWZHZW5kZXJcblxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh7XG5cdFx0XHRuYW1lOiByZWZOYW1lLmdldFZhbHVlKClcblx0XHRcdCxiZDogcmVmQmlydGhkYXkuZ2V0RGF0ZSgpXG5cdFx0XHQsZ2VuZGVyOiByZWZHZW5kZXIuZ2V0U2VsZWN0ZWRWYWx1ZSgpXG5cdFx0XHQscGhvdG9cblx0XHR9KSkudGhlbihiYWJ5PT5yb3V0ZXIucmVwbGFjZShgL2JhYnkvJHtiYWJ5Ll9pZH1gKSxlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0PFBob3RvIG9uUGhvdG89e3VybD0+cGhvdG89dXJsfSB3aWR0aD17MTUwfSBoZWlnaHQ9ezE1MH0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuXHRcdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj17YT0+cmVmQmlydGhkYXk9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0c2hvd1llYXJTZWxlY3Rvcj17dHJ1ZX1cblx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIHJlZj17YT0+cmVmR2VuZGVyPWF9XG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdGRlZmF1bHRTZWxlY3RlZD1cImZcIj5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQse1xuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJTYXZlXCJcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PnNlbmQoKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF19XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQmFieSwge0FDVElPTn0pXG4iXX0=