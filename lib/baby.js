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
						onChange: function onChange(_ref2) {
							var value = _ref2.target.value;
							return refName.value = value;
						},
						onBlur: function onBlur(_ref3) {
							var value = _ref3.target.value;
							return changeName();
						},
						onKeyDown: function onKeyDown(_ref4) {
							var value = _ref4.target.value;
							var keyCode = _ref4.keyCode;
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
							"\u7684\u6FC0\u52B1\u8BA1\u5212"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJBQ1RJT04iLCJDSEFOR0UiLCJrZXkiLCJ2YWx1ZSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJjaGlsZCIsInJlamVjdCIsInJlc29sdmUiLCJ1cHNlcnQiLCJ0aGVuIiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQ1JFQVRFIiwibmFtZSIsImJhYnkiLCJFTklUSVRJRVMiLCJSRU1PVkUiLCJyZW1vdmUiLCJfaWQiLCJpZCIsIkJhYnkiLCJzdGF0ZSIsIm5hbWVFcnJvciIsIm5leHQiLCJpc0N1cnJlbnQiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsInBhcmFtcyIsInByb3BzIiwicGhvdG8iLCJiaXJ0aGRheSIsImJkIiwiZ2VuZGVyIiwicm91dGVyIiwiY29udGV4dCIsImNoYW5nZU5hbWUiLCJyZWZOYW1lIiwiZ2V0VmFsdWUiLCJ0cmltIiwic2V0U3RhdGUiLCJlcnJvciIsInVybCIsImEiLCJ0YXJnZXQiLCJrZXlDb2RlIiwiRGF0ZSIsIm5pbCIsIm1hcmdpblRvcCIsImUiLCJmb250U2l6ZSIsImNvbG9yIiwiYm9yZGVyQm90dG9tIiwiYWN0aW9uIiwib25TZWxlY3QiLCJyZXBsYWNlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRvciIsInJlZkJpcnRoZGF5IiwicmVmR2VuZGVyIiwic2VuZCIsImdldERhdGUiLCJnZXRTZWxlY3RlZFZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztJQUVPQSxVLGVBQUFBLFU7SUFBV0MsSyxlQUFBQSxLO0lBQU9DLFUsZUFBQUEsVTtBQUVsQixJQUFNQywwQkFBTztBQUNuQkMsU0FBUSxnQkFBQ0MsR0FBRCxFQUFLQyxLQUFMO0FBQUEs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LGFBQUssUUFGTjtBQUdDLHdCQUFnQixHQUhqQjtBQUlDLCtEQUFhLE9BQU0sR0FBbkIsRUFBdUIsT0FBTSxNQUE3QixHQUpEO0FBS0MsK0RBQWEsT0FBTSxHQUFuQixFQUF1QixPQUFNLEtBQTdCO0FBTEQ7QUFqQkQsS0FERDtBQTJCQyxrQ0FBQyxVQUFELElBQVksV0FBVSxTQUF0QjtBQUNDLFlBQU8sQ0FDTixNQURNLEVBRUw7QUFDQUssY0FBTyxNQURQO0FBRUNDLGdCQUFTO0FBQUEsY0FBR08sTUFBSDtBQUFBO0FBRlYsTUFGSztBQURSO0FBM0JELElBREQ7QUF1Q0E7Ozs7O0FBeERXSCxPLENBMERMRixZLEdBQWEsRUFBQ3RCLFFBQVEsaUJBQVV1QixNQUFuQixFO2tCQUdOLHNCQUFjbkMsSUFBZCxFQUFvQixFQUFDdEIsY0FBRCxFQUFwQixDIiwiZmlsZSI6ImJhYnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUksRU5USVRJRVMsUkVNT1ZFX0VOVElUSUVTfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbixEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgUmV3YXJkR29hbCBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0FDVElPTiBhcyBTdXBlckRhZGR5fSBmcm9tIFwiLlwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLFBob3RvLCBUZXh0RmllbGR4fT1VSVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q0hBTkdFOiAoa2V5LHZhbHVlKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuICAgICAgICBjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcblx0XHRpZihrZXk9PVwibmFtZVwiICYmICF2YWx1ZSl7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblx0XHR9XG5cblx0XHRpZihjaGlsZFtrZXldPT12YWx1ZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG4gICAgICAgIGNoaWxkW2tleV09dmFsdWVcbiAgICAgICAgcmV0dXJuIGRiRmFtaWx5LnVwc2VydChjaGlsZClcbiAgICAgICAgICAgIC50aGVuKHVwZGF0ZWQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHR9KVxuICAgIH1cblx0LENSRUFURTogYmFieT0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7bmFtZX09YmFieVxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cblx0XHRyZXR1cm4gZGJGYW1pbHkudXBzZXJ0KGJhYnkpXG5cdFx0XHQudGhlbihiYWJ5PT57XG5cdFx0XHRcdFx0ZGlzcGF0Y2goRU5JVElUSUVTKG5vcm1hbGl6ZShiYWJ5LGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRcdHJldHVybiBiYWJ5XG5cdFx0XHRcdH0pXG5cdH1cblx0LFJFTU9WRTogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxuXHRcdHJldHVybiBkYkZhbWlseS5yZW1vdmUoY2hpbGQuX2lkKVxuXHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRkaXNwYXRjaChSRU1PVkVfRU5USVRJRVMoXCJjaGlsZHJlblwiLGNoaWxkLmlkKSlcblx0XHRcdH0pXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdGlmKCFuZXh0LmlzQ3VycmVudClcblx0XHRcdG5leHQuZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChuZXh0LnBhcmFtcy5pZCkpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7bmFtZSxwaG90byxiZDpiaXJ0aGRheSxnZW5kZXIsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge25hbWVFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXG5cdFx0Y29uc3QgY2hhbmdlTmFtZT1hPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwibmFtZVwiLHJlZk5hbWUuZ2V0VmFsdWUoKS50cmltKCkpKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSwgZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxuXHRcdGxldCByZWZOYW1lXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0PFBob3RvXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXsxNTB9XG5cdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfVxuXHRcdFx0XHRcdFx0XHRzcmM9e3Bob3RvfVxuXHRcdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJwaG90b1wiLHVybCkpfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17bmFtZX1cblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmTmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBjaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0bWF4RGF0ZT17bmV3IERhdGUoKX1cblx0XHRcdFx0XHRcdHZhbHVlPXtiaXJ0aGRheX1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsobmlsLCB2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJiZFwiLHZhbHVlKSl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwXG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSx2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJnZW5kZXJcIix2YWx1ZSkpfVxuXHRcdFx0XHRcdFx0dmFsdWVTZWxlY3RlZD17Z2VuZGVyfHxcImZcIn0+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCLlpbPlralcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCLnlLflralcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9e3tmb250U2l6ZTpcInNtYWxsZXJcIiwgY29sb3I6XCJncmF5XCIsIGJvcmRlckJvdHRvbTpcIjFweCBkb3R0ZWQgbGlnaHRncmF5XCJ9fT5cblx0XHRcdFx0XHRcdFx0e25hbWV955qE5r+A5Yqx6K6h5YiSXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdHsvKlxuXHRcdFx0XHRcdFx0PFJld2FyZEdvYWxcblx0XHRcdFx0XHRcdFx0ZWRpdGFibGU9e3RydWV9XG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjMwfX1cblx0XHRcdFx0XHRcdFx0Y2hpbGQ9e2NoaWxkfS8+Ki99XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHRcIkJhY2tcIlxuXHRcdFx0XHRcdFx0LCB7YWN0aW9uOlwiUmVtb3ZlXCIsIG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoKSkudGhlbihhPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpfV19Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cbn1cblxuZXhwb3J0IGNsYXNzIENyZWF0b3IgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRjb25zdCB7bmFtZUVycm9yfT10aGlzLnN0YXRlXG5cblx0XHRsZXQgcGhvdG8scmVmTmFtZSwgcmVmQmlydGhkYXksIHJlZkdlbmRlclxuXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHtcblx0XHRcdG5hbWU6IHJlZk5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LGJkOiByZWZCaXJ0aGRheS5nZXREYXRlKClcblx0XHRcdCxnZW5kZXI6IHJlZkdlbmRlci5nZXRTZWxlY3RlZFZhbHVlKClcblx0XHRcdCxwaG90b1xuXHRcdH0pKS50aGVuKGJhYnk9PnJvdXRlci5yZXBsYWNlKGAvYmFieS8ke2JhYnkuX2lkfWApLGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG5cdFx0XHRcdFx0XHQ8UGhvdG8gb25QaG90bz17dXJsPT5waG90bz11cmx9IHdpZHRoPXsxNTB9IGhlaWdodD17MTUwfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZCaXJ0aGRheT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuXHRcdFx0XHRcdFx0bWF4RGF0ZT17bmV3IERhdGUoKX0vPlxuXG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgcmVmPXthPT5yZWZHZW5kZXI9YX1cblx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdG5hbWU9XCJnZW5kZXJcIlxuXHRcdFx0XHRcdFx0ZGVmYXVsdFNlbGVjdGVkPVwiZlwiPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cImJveVwiIC8+XG5cdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0XCJCYWNrXCJcblx0XHRcdFx0XHRcdCx7XG5cdFx0XHRcdFx0XHRcdGFjdGlvbjpcIlNhdmVcIlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+c2VuZCgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XX1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjogUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihCYWJ5LCB7QUNUSU9OfSlcbiJdfQ==