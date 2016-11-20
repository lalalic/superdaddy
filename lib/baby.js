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
						_react2.default.createElement(_materialUi.RadioButton, { value: "f", label: "\u5973\u5B69" }),
						_react2.default.createElement(_materialUi.RadioButton, { value: "m", label: "\u7537\u5B69" })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJBQ1RJT04iLCJDSEFOR0UiLCJrZXkiLCJ2YWx1ZSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJjaGlsZCIsInJlamVjdCIsInJlc29sdmUiLCJ1cHNlcnQiLCJ0aGVuIiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQ1JFQVRFIiwibmFtZSIsImJhYnkiLCJFTklUSVRJRVMiLCJSRU1PVkUiLCJyZW1vdmUiLCJfaWQiLCJpZCIsIkJhYnkiLCJzdGF0ZSIsIm5hbWVFcnJvciIsIm5leHQiLCJpc0N1cnJlbnQiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsInBhcmFtcyIsInByb3BzIiwicGhvdG8iLCJiaXJ0aGRheSIsImJkIiwiZ2VuZGVyIiwidG9kb3MiLCJyb3V0ZXIiLCJjb250ZXh0IiwiY2hhbmdlTmFtZSIsInJlZk5hbWUiLCJnZXRWYWx1ZSIsInRyaW0iLCJzZXRTdGF0ZSIsImVycm9yIiwidXJsIiwiYSIsInRhcmdldCIsImtleUNvZGUiLCJEYXRlIiwibmlsIiwibWFyZ2luVG9wIiwiZSIsImFjdGlvbiIsIm9uU2VsZWN0IiwicmVwbGFjZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJyZWZCaXJ0aGRheSIsInJlZkdlbmRlciIsInNlbmQiLCJnZXREYXRlIiwiZ2V0U2VsZWN0ZWRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7O0lBRU9BLFUsZUFBQUEsVTtJQUFXQyxLLGVBQUFBLEs7SUFBT0MsVSxlQUFBQSxVO0FBRWxCLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFRLGdCQUFDQyxHQUFELEVBQUtDLEtBQUw7QUFBQSxTQUFhLFVBQUNDLFFBQUQsRUFBVUMsUUFBVixFQUFxQjtB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QjtBQUNDLFlBQU8sQ0FDTixNQURNLEVBRUw7QUFDQUUsY0FBTyxNQURQO0FBRUNDLGdCQUFTO0FBQUEsY0FBR08sTUFBSDtBQUFBO0FBRlYsTUFGSztBQURSO0FBM0JELElBREQ7QUF1Q0E7Ozs7O0FBeERXSCxPLENBMERMRixZLEdBQWEsRUFBQ25CLFFBQVEsaUJBQVVvQixNQUFuQixFO2tCQUdOLHNCQUFjakMsSUFBZCxFQUFvQixFQUFDdEIsY0FBRCxFQUFwQixDIiwiZmlsZSI6ImJhYnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUksRU5USVRJRVMsUkVNT1ZFX0VOVElUSUVTfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbixEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuaW1wb3J0IHtBQ1RJT04gYXMgU3VwZXJEYWRkeX0gZnJvbSBcIi5cIlxuXG5jb25zdCB7Q29tbWFuZEJhcixQaG90bywgVGV4dEZpZWxkeH09VUlcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdENIQU5HRTogKGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcbiAgICAgICAgY29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXG5cdFx0aWYoa2V5PT1cIm5hbWVcIiAmJiAhdmFsdWUpe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cdFx0fVxuXG5cdFx0aWYoY2hpbGRba2V5XT09dmFsdWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjaGlsZFtrZXldPXZhbHVlXG4gICAgICAgIHJldHVybiBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG4gICAgICAgICAgICAudGhlbih1cGRhdGVkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0fSlcbiAgICB9XG5cdCxDUkVBVEU6IGJhYnk9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge25hbWV9PWJhYnlcblx0XHRpZighbmFtZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIuWQjeWtl+S4jeiDveepulwiKVxuXG5cdFx0cmV0dXJuIGRiRmFtaWx5LnVwc2VydChiYWJ5KVxuXHRcdFx0LnRoZW4oYmFieT0+e1xuXHRcdFx0XHRcdGRpc3BhdGNoKEVOSVRJVElFUyhub3JtYWxpemUoYmFieSxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0XHRyZXR1cm4gYmFieVxuXHRcdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcblx0XHRyZXR1cm4gZGJGYW1pbHkucmVtb3ZlKGNoaWxkLl9pZClcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0ZGlzcGF0Y2goUkVNT1ZFX0VOVElUSUVTKFwiY2hpbGRyZW5cIixjaGlsZC5pZCkpXG5cdFx0XHR9KVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWJ5IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZighbmV4dC5pc0N1cnJlbnQpXG5cdFx0XHRuZXh0LmRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQobmV4dC5wYXJhbXMuaWQpKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWUscGhvdG8sYmQ6YmlydGhkYXksZ2VuZGVyLCB0b2RvcywgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7bmFtZUVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cblx0XHRjb25zdCBjaGFuZ2VOYW1lPWE9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJuYW1lXCIscmVmTmFtZS5nZXRWYWx1ZSgpLnRyaW0oKSkpXG5cdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6bnVsbH0pLCBlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXG5cdFx0bGV0IHJlZk5hbWVcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG5cdFx0XHRcdFx0XHQ8UGhvdG9cblx0XHRcdFx0XHRcdFx0d2lkdGg9ezE1MH1cblx0XHRcdFx0XHRcdFx0aGVpZ2h0PXsxNTB9XG5cdFx0XHRcdFx0XHRcdHNyYz17cGhvdG99XG5cdFx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcInBob3RvXCIsdXJsKSl9Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdHZhbHVlPXtuYW1lfVxuXHRcdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZU5hbWUoKX1cblx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGNoYW5nZU5hbWUoKX1cblx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHQ8RGF0ZVBpY2tlclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfVxuXHRcdFx0XHRcdFx0dmFsdWU9e2JpcnRoZGF5fVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhuaWwsIHZhbHVlKT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcImJkXCIsdmFsdWUpKX0vPlxuXG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXBcblx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdG5hbWU9XCJnZW5kZXJcIlxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHZhbHVlKT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcImdlbmRlclwiLHZhbHVlKSl9XG5cdFx0XHRcdFx0XHR2YWx1ZVNlbGVjdGVkPXtnZW5kZXJ8fFwiZlwifT5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cIuWls+WtqVwiLz5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cIueUt+WtqVwiIC8+XG5cdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0XCJCYWNrXCJcblx0XHRcdFx0XHRcdCwge2FjdGlvbjpcIlJlbW92ZVwiLCBvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uUkVNT1ZFKCkpLnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoXCIvXCIpKX1dfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge25hbWVFcnJvcn09dGhpcy5zdGF0ZVxuXG5cdFx0bGV0IHBob3RvLHJlZk5hbWUsIHJlZkJpcnRoZGF5LCByZWZHZW5kZXJcblxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh7XG5cdFx0XHRuYW1lOiByZWZOYW1lLmdldFZhbHVlKClcblx0XHRcdCxiZDogcmVmQmlydGhkYXkuZ2V0RGF0ZSgpXG5cdFx0XHQsZ2VuZGVyOiByZWZHZW5kZXIuZ2V0U2VsZWN0ZWRWYWx1ZSgpXG5cdFx0XHQscGhvdG9cblx0XHR9KSkudGhlbihiYWJ5PT5yb3V0ZXIucmVwbGFjZShgL2JhYnkvJHtiYWJ5Ll9pZH1gKSxlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0PFBob3RvIG9uUGhvdG89e3VybD0+cGhvdG89dXJsfSB3aWR0aD17MTUwfSBoZWlnaHQ9ezE1MH0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuXHRcdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj17YT0+cmVmQmlydGhkYXk9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0c2hvd1llYXJTZWxlY3Rvcj17dHJ1ZX1cblx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIHJlZj17YT0+cmVmR2VuZGVyPWF9XG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdGRlZmF1bHRTZWxlY3RlZD1cImZcIj5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQse1xuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJTYXZlXCJcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PnNlbmQoKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF19XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQmFieSwge0FDVElPTn0pXG4iXX0=