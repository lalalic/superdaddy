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
						_react2.default.createElement(_materialUi.RadioButton, { value: "f", label: "女孩" }),
						_react2.default.createElement(_materialUi.RadioButton, { value: "m", label: "男孩" })
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
//# sourceMappingURL=data:application/json;base64,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OEJBQUMsS0FBRCxJQUFPLFNBQVM7ZUFBSyxRQUFNLEdBQU47UUFBTCxFQUFnQixPQUFPLEdBQVAsRUFBWSxRQUFRLEdBQVIsRUFBNUMsQ0FERDtNQUREO0tBS0MsOEJBQUMsVUFBRCxJQUFZLEtBQUs7Y0FBRyxVQUFRLENBQVI7T0FBSDtBQUNoQix5QkFBa0IsWUFBbEI7QUFDQSxpQkFBVyxTQUFYO0FBQ0EsaUJBQVcsSUFBWCxFQUhELENBTEQ7S0FVQyx3REFBWSxLQUFLO2NBQUcsY0FBWSxDQUFaO09BQUg7QUFDaEIseUJBQWtCLFVBQWxCO0FBQ0EsaUJBQVcsSUFBWDtBQUNBLGNBQVEsSUFBUjtBQUNBLGVBQVMsSUFBSSxJQUFKLEVBQVQsRUFKRCxDQVZEO0tBZ0JDOztRQUFrQixLQUFLO2VBQUcsWUFBVSxDQUFWO1FBQUg7QUFDdEIsY0FBTyxFQUFDLFdBQVUsRUFBVixFQUFSO0FBQ0EsYUFBSyxRQUFMO0FBQ0Esd0JBQWdCLEdBQWhCLEVBSEQ7TUFJQyx5REFBYSxPQUFNLEdBQU4sRUFBVSxPQUFNLE1BQU4sRUFBdkIsQ0FKRDtNQUtDLHlEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sS0FBTixFQUF2QixDQUxEO01BaEJEO0tBREQ7SUEwQkMsOEJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVjtBQUNYLFlBQU8sQ0FDTixNQURNLEVBRUw7QUFDQSxjQUFPLE1BQVA7QUFDQyxnQkFBUztjQUFHO09BQUg7TUFKTCxDQUFQO0tBREQsQ0ExQkQ7SUFERCxDQWRPOzs7Ozs7QUFISSxRQXlETCxlQUFhLEVBQUMsUUFBUSxpQkFBVSxNQUFWO2tCQUdmLHNCQUFjLElBQWQsRUFBb0IsRUFBQyxjQUFELEVBQXBCIiwiZmlsZSI6ImJhYnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUksRU5USVRJRVMsUkVNT1ZFX0VOVElUSUVTfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbixEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGR9IGZyb20gXCIuL3NlbGVjdG9yXCJcbmltcG9ydCB7QUNUSU9OIGFzIFN1cGVyRGFkZHl9IGZyb20gXCIuXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsUGhvdG8sIFRleHRGaWVsZHh9PVVJXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRDSEFOR0U6IChpZCwga2V5LHZhbHVlKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuICAgICAgICBjb25zdCBjaGlsZD1nZXRDaGlsZChnZXRTdGF0ZSgpLGlkKVxuXHRcdGlmKGtleT09XCJuYW1lXCIgJiYgIXZhbHVlKXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIuWQjeWtl+S4jeiDveepulwiKVxuXHRcdH1cblxuXHRcdGlmKGNoaWxkW2tleV09PXZhbHVlKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cbiAgICAgICAgY2hpbGRba2V5XT12YWx1ZVxuICAgICAgICByZXR1cm4gZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuICAgICAgICAgICAgLnRoZW4odXBkYXRlZD0+e1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdH0pXG4gICAgfVxuXHQsQ1JFQVRFOiBiYWJ5PT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qge25hbWV9PWJhYnlcblx0XHRpZighbmFtZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIuWQjeWtl+S4jeiDveepulwiKVxuXG5cdFx0cmV0dXJuIGRiRmFtaWx5LnVwc2VydChiYWJ5KVxuXHRcdFx0LnRoZW4oYmFieT0+e1xuXHRcdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShiYWJ5LGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRcdHJldHVybiBiYWJ5XG5cdFx0XHRcdH0pXG5cdH1cblx0LFJFTU9WRTogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRyZXR1cm4gZGJGYW1pbHkucmVtb3ZlKGlkKVxuXHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRkaXNwYXRjaChTdXBlckRhZGR5LlNXSVRDSF9DVVJSRU5UX0NISUxEKGlkKSlcblx0XHRcdFx0ZGlzcGF0Y2goUkVNT1ZFX0VOVElUSUVTKFwiY2hpbGRyZW5cIixpZCkpXG5cdFx0XHR9KVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWJ5IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7aXNDdXJyZW50LHBhcmFtczp7aWR9LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGlmKCFpc0N1cnJlbnQpXG5cdFx0XHRkaXNwYXRjaChTdXBlckRhZGR5LlNXSVRDSF9DVVJSRU5UX0NISUxEKGlkKSlcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe2lzQ3VycmVudCxkaXNwYXRjaCxwYXJhbXM6e2lkfX0pe1xuXHRcdGlmKCFpc0N1cnJlbnQpXG5cdFx0XHRkaXNwYXRjaChTdXBlckRhZGR5LlNXSVRDSF9DVVJSRU5UX0NISUxEKGlkKSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtuYW1lLHBob3RvLGJkOmJpcnRoZGF5LGdlbmRlciwgdG9kb3MsIGRpc3BhdGNoLHBhcmFtczp7aWR9fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge25hbWVFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXG5cdFx0Y29uc3QgY2hhbmdlTmFtZT1hPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKGlkLFwibmFtZVwiLHJlZk5hbWUuZ2V0VmFsdWUoKS50cmltKCkpKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSwgZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxuXHRcdGxldCByZWZOYW1lXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0PFBob3RvXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXsxNTB9XG5cdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfVxuXHRcdFx0XHRcdFx0XHRzcmM9e3Bob3RvfVxuXHRcdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJwaG90b1wiLHVybCkpfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17bmFtZX1cblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmTmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBjaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0bWF4RGF0ZT17bmV3IERhdGUoKX1cblx0XHRcdFx0XHRcdHZhbHVlPXtiaXJ0aGRheX1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsobmlsLCB2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJiZFwiLHZhbHVlKSl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwXG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSx2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJnZW5kZXJcIix2YWx1ZSkpfVxuXHRcdFx0XHRcdFx0dmFsdWVTZWxlY3RlZD17Z2VuZGVyfHxcImZcIn0+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCLlpbPlralcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCLnlLflralcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQsIHtcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiUmVtb3ZlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoaWQpKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5yZXBsYWNlKFwiL1wiKVxuXHRcdFx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdFx0XX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblxuXHRcdGxldCBwaG90byxyZWZOYW1lLCByZWZCaXJ0aGRheSwgcmVmR2VuZGVyXG5cblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUoe1xuXHRcdFx0bmFtZTogcmVmTmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQsYmQ6IHJlZkJpcnRoZGF5LmdldERhdGUoKVxuXHRcdFx0LGdlbmRlcjogcmVmR2VuZGVyLmdldFNlbGVjdGVkVmFsdWUoKVxuXHRcdFx0LHBob3RvXG5cdFx0fSkpLnRoZW4oYmFieT0+cm91dGVyLnJlcGxhY2UoYC9iYWJ5LyR7YmFieS5faWR9YCksZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHRcdDxQaG90byBvblBob3RvPXt1cmw9PnBob3RvPXVybH0gd2lkdGg9ezE1MH0gaGVpZ2h0PXsxNTB9Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9e2E9PnJlZkJpcnRoZGF5PWF9XG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX1cblx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIHJlZj17YT0+cmVmR2VuZGVyPWF9XG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdGRlZmF1bHRTZWxlY3RlZD1cImZcIj5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQse1xuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJTYXZlXCJcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PnNlbmQoKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF19XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQmFieSwge0FDVElPTn0pXG4iXX0=