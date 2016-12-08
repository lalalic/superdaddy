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
//# sourceMappingURL=data:application/json;base64,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QVI7T0FBSDtBQUNoQix5QkFBa0IsWUFBbEI7QUFDQSxpQkFBVyxTQUFYO0FBQ0EsaUJBQVcsSUFBWCxFQUhELENBREQ7S0FNQyx3REFBWSxLQUFLO2NBQUcsY0FBWSxDQUFaO09BQUg7QUFDaEIseUJBQWtCLFVBQWxCO0FBQ0EsaUJBQVcsSUFBWDtBQUNBLGNBQVEsSUFBUjtBQUNBLGVBQVMsSUFBSSxJQUFKLEVBQVQsRUFKRCxDQU5EO0tBWUM7O1FBQWtCLEtBQUs7ZUFBRyxZQUFVLENBQVY7UUFBSDtBQUN0QixjQUFPLEVBQUMsV0FBVSxFQUFWLEVBQVI7QUFDQSxhQUFLLFFBQUw7QUFDQSx3QkFBZ0IsR0FBaEIsRUFIRDtNQUlDLHlEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sTUFBTixFQUF2QixDQUpEO01BS0MseURBQWEsT0FBTSxHQUFOLEVBQVUsT0FBTSxLQUFOLEVBQXZCLENBTEQ7TUFaRDtLQUREO0lBc0JDLDhCQUFDLFVBQUQsSUFBWSxXQUFVLFNBQVY7QUFDWCxZQUFPLENBQ04sTUFETSxFQUVMO0FBQ0EsY0FBTyxNQUFQO0FBQ0MsZ0JBQVM7Y0FBRztPQUFIO01BSkwsQ0FBUDtLQURELENBdEJEO0lBREQsQ0FiTzs7Ozs7O0FBSEksUUFvREwsZUFBYSxFQUFDLFFBQVEsaUJBQVUsTUFBVjtrQkFHZixzQkFBYyxJQUFkLEVBQW9CLEVBQUMsY0FBRCxFQUFwQiIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJLEVOVElUSUVTLFJFTU9WRV9FTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0FDVElPTiBhcyBTdXBlckRhZGR5fSBmcm9tIFwiLlwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLFBob3RvLCBUZXh0RmllbGR4fT1VSVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q0hBTkdFOiAoaWQsIGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcbiAgICAgICAgY29uc3QgY2hpbGQ9Z2V0Q2hpbGQoZ2V0U3RhdGUoKSxpZClcblx0XHRpZihrZXk9PVwibmFtZVwiICYmICF2YWx1ZSl7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblx0XHR9XG5cblx0XHRpZihjaGlsZFtrZXldPT12YWx1ZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG4gICAgICAgIGNoaWxkW2tleV09dmFsdWVcbiAgICAgICAgcmV0dXJuIGRiRmFtaWx5LnVwc2VydChjaGlsZClcbiAgICAgICAgICAgIC50aGVuKHVwZGF0ZWQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHR9KVxuICAgIH1cblx0LENSRUFURTogYmFieT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHtuYW1lfT1iYWJ5XG5cdFx0aWYoIW5hbWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcblxuXHRcdHJldHVybiBkYkZhbWlseS51cHNlcnQoYmFieSlcblx0XHRcdC50aGVuKGJhYnk9Pntcblx0XHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoYmFieSxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0XHRyZXR1cm4gYmFieVxuXHRcdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGRiRmFtaWx5LnJlbW92ZShpZClcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdFx0XHRcdGRpc3BhdGNoKFJFTU9WRV9FTlRJVElFUyhcImNoaWxkcmVuXCIsaWQpKVxuXHRcdFx0fSlcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge2lzQ3VycmVudCxwYXJhbXM6e2lkfSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZighaXNDdXJyZW50KVxuXHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtpc0N1cnJlbnQsZGlzcGF0Y2gscGFyYW1zOntpZH19KXtcblx0XHRpZighaXNDdXJyZW50KVxuXHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7bmFtZSxwaG90byxiZDpiaXJ0aGRheSxnZW5kZXIsIHRvZG9zLCBkaXNwYXRjaCxwYXJhbXM6e2lkfX09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblxuXHRcdGNvbnN0IGNoYW5nZU5hbWU9YT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcIm5hbWVcIixyZWZOYW1lLmdldFZhbHVlKCkudHJpbSgpKSlcblx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjpudWxsfSksIGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblx0XHRsZXQgcmVmTmFtZVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHRcdDxQaG90b1xuXHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ9ezE1MH1cblx0XHRcdFx0XHRcdFx0c3JjPXtwaG90b31cblx0XHRcdFx0XHRcdFx0b3ZlcndyaXRhYmxlPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJwaG90b1wiLHVybCkpfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17bmFtZX1cblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmTmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBjaGFuZ2VOYW1lKCl9XG5cdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0bWF4RGF0ZT17bmV3IERhdGUoKX1cblx0XHRcdFx0XHRcdHZhbHVlPXtiaXJ0aGRheX1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsobmlsLCB2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJiZFwiLHZhbHVlKSl9Lz5cblxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwXG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSx2YWx1ZSk9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJnZW5kZXJcIix2YWx1ZSkpfVxuXHRcdFx0XHRcdFx0dmFsdWVTZWxlY3RlZD17Z2VuZGVyfHxcImZcIn0+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCLlpbPlralcIi8+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCLnlLflralcIiAvPlxuXHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQsIHtcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiUmVtb3ZlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoaWQpKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5yZXBsYWNlKFwiL1wiKVxuXHRcdFx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdFx0XX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblxuXHRcdGxldCByZWZOYW1lLCByZWZCaXJ0aGRheSwgcmVmR2VuZGVyXG5cblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUoe1xuXHRcdFx0bmFtZTogcmVmTmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQsYmQ6IHJlZkJpcnRoZGF5LmdldERhdGUoKVxuXHRcdFx0LGdlbmRlcjogcmVmR2VuZGVyLmdldFNlbGVjdGVkVmFsdWUoKVxuXHRcdH0pKS50aGVuKGJhYnk9PnJvdXRlci5yZXBsYWNlKGAvYmFieS8ke2JhYnkuX2lkfWApLGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZCaXJ0aGRheT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XG5cblx0XHRcdFx0XHQ8UmFkaW9CdXR0b25Hcm91cCByZWY9e2E9PnJlZkdlbmRlcj1hfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuXHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRkZWZhdWx0U2VsZWN0ZWQ9XCJmXCI+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cblx0XHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHRcIkJhY2tcIlxuXHRcdFx0XHRcdFx0LHtcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiU2F2ZVwiXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5zZW5kKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEJhYnksIHtBQ1RJT059KVxuIl19