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
						_react2.default.createElement(_infoForm.Field, { primaryText: "宝宝名", value: name,
							onEdit: function onEdit(value) {
								return dispatch(ACTION.CHANGE(id, "name", value));
							} }),
						_react2.default.createElement(_infoForm.Field, { primaryText: "生日", value: birthday,
							type: "date",
							onEdit: function onEdit(value) {
								return dispatch(ACTION.CHANGE(id, "bd", value));
							} }),
						_react2.default.createElement(_infoForm.Field, { primaryText: "性别", value: gender || "f",
							type: "single",
							options: [{ value: "f", label: "女孩" }, { value: "m", label: "男孩" }],
							onEdit: function onEdit(value) {
								return dispatch(ACTION.CHANGE(id, "gender", value));
							}
						}),
						_react2.default.createElement(
							_materialUi.Subheader,
							null,
							"当前任务"
						),
						_react2.default.createElement(_infoForm.Field, { primaryText: "成绩", value: "" + score + (totalScore == score ? "" : "/" + totalScore) }),
						_react2.default.createElement(_infoForm.Field, { primaryText: "目标", value: todo,
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
//# sourceMappingURL=data:application/json;base64,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QUFDLFVBQUQsSUFBWSxLQUFLO2NBQUcsVUFBUSxDQUFSO09BQUg7QUFDaEIseUJBQWtCLFlBQWxCO0FBQ0EsaUJBQVcsU0FBWDtBQUNBLGlCQUFXLElBQVgsRUFIRCxDQUREO0tBTUMsd0RBQVksS0FBSztjQUFHLGNBQVksQ0FBWjtPQUFIO0FBQ2hCLHlCQUFrQixVQUFsQjtBQUNBLGlCQUFXLElBQVg7QUFDQSxjQUFRLElBQVI7QUFDQSxlQUFTLElBQUksSUFBSixFQUFULEVBSkQsQ0FORDtLQVlDOztRQUFrQixLQUFLO2VBQUcsWUFBVSxDQUFWO1FBQUg7QUFDdEIsY0FBTyxFQUFDLFdBQVUsRUFBVixFQUFSO0FBQ0EsYUFBSyxRQUFMO0FBQ0Esd0JBQWdCLEdBQWhCLEVBSEQ7TUFJQyx5REFBYSxPQUFNLEdBQU4sRUFBVSxPQUFNLE1BQU4sRUFBdkIsQ0FKRDtNQUtDLHlEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sS0FBTixFQUF2QixDQUxEO01BWkQ7S0FERDtJQXNCQyw4QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1gsWUFBTyxDQUNOLE1BRE0sRUFFTDtBQUNBLGNBQU8sTUFBUDtBQUNDLGdCQUFTO2NBQUc7T0FBSDtNQUpMLENBQVA7S0FERCxDQXRCRDtJQURELENBYk87Ozs7OztBQUhJLFFBb0RMLGVBQWEsRUFBQyxRQUFRLGlCQUFVLE1BQVY7a0JBR2Ysc0JBQWMsSUFBZCxFQUFvQixFQUFDLGNBQUQsRUFBcEIiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSSxFTlRJVElFUyxSRU1PVkVfRU5USVRJRVN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXIsU3ViaGVhZGVyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGR9IGZyb20gXCIuL3NlbGVjdG9yXCJcbmltcG9ydCB7QUNUSU9OIGFzIFN1cGVyRGFkZHl9IGZyb20gXCIuXCJcblxuaW1wb3J0IHtJbmZvRm9ybSwgRmllbGR9IGZyb20gXCJxaWxpLWFwcC9saWIvY29tcG9uZW50cy9pbmZvLWZvcm1cIlxuXG5jb25zdCB7Q29tbWFuZEJhcixQaG90bywgVGV4dEZpZWxkeH09VUlcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdENIQU5HRTogKGlkLCBrZXksdmFsdWUpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG4gICAgICAgIGNvbnN0IGNoaWxkPWdldENoaWxkKGdldFN0YXRlKCksaWQpXG5cdFx0aWYoa2V5PT1cIm5hbWVcIiAmJiAhdmFsdWUpe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cdFx0fVxuXG5cdFx0aWYoY2hpbGRba2V5XT09dmFsdWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjaGlsZFtrZXldPXZhbHVlXG4gICAgICAgIHJldHVybiBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG4gICAgICAgICAgICAudGhlbih1cGRhdGVkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0fSlcbiAgICB9XG5cdCxDUkVBVEU6IGJhYnk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCB7bmFtZX09YmFieVxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cblx0XHRyZXR1cm4gZGJGYW1pbHkudXBzZXJ0KGJhYnkpXG5cdFx0XHQudGhlbihiYWJ5PT57XG5cdFx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGJhYnksZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdFx0cmV0dXJuIGJhYnlcblx0XHRcdFx0fSlcblx0fVxuXHQsUkVNT1ZFOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdHJldHVybiBkYkZhbWlseS5yZW1vdmUoaWQpXG5cdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxuXHRcdFx0XHRkaXNwYXRjaChSRU1PVkVfRU5USVRJRVMoXCJjaGlsZHJlblwiLGlkKSlcblx0XHRcdH0pXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGNvbnN0IHtpc0N1cnJlbnQscGFyYW1zOntpZH0sIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYoIWlzQ3VycmVudClcblx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7aXNDdXJyZW50LGRpc3BhdGNoLHBhcmFtczp7aWR9fSl7XG5cdFx0aWYoIWlzQ3VycmVudClcblx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWUscGhvdG8sYmQ6YmlydGhkYXksZ2VuZGVyLCBzY29yZSwgdG9kbywgZ29hbCwgdG90YWxTY29yZT1zY29yZSwgdG9kb3MsIGRpc3BhdGNoLHBhcmFtczp7aWR9fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge25hbWVFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXG5cdFx0Y29uc3QgY2hhbmdlTmFtZT1hPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKGlkLFwibmFtZVwiLHJlZk5hbWUuZ2V0VmFsdWUoKS50cmltKCkpKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSwgZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxuXHRcdGxldCByZWZOYW1lXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0PFBob3RvXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXsxNTB9XG5cdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfVxuXHRcdFx0XHRcdFx0XHRzcmM9e3Bob3RvfVxuXHRcdFx0XHRcdFx0XHRvdmVyd3JpdGFibGU9e3RydWV9XG5cdFx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcInBob3RvXCIsdXJsKSl9Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxJbmZvRm9ybT5cblx0XHRcdFx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuWuneWuneWQjVwiIHZhbHVlPXtuYW1lfVxuXHRcdFx0XHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKGlkLFwibmFtZVwiLHZhbHVlKSl9Lz5cblxuXHRcdFx0XHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi55Sf5pelXCIgdmFsdWU9e2JpcnRoZGF5fVxuXHRcdFx0XHRcdFx0XHR0eXBlPVwiZGF0ZVwiXG5cdFx0XHRcdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJiZFwiLHZhbHVlKSl9Lz5cblxuXHRcdFx0XHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5oCn5YirXCIgdmFsdWU9e2dlbmRlcnx8XCJmXCJ9XG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJzaW5nbGVcIlxuXHRcdFx0XHRcdFx0XHRvcHRpb25zPXtbe3ZhbHVlOlwiZlwiLGxhYmVsOlwi5aWz5a2pXCJ9LHt2YWx1ZTpcIm1cIiwgbGFiZWw6XCLnlLflralcIn1dfVxuXHRcdFx0XHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKGlkLFwiZ2VuZGVyXCIsdmFsdWUpKX1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0PFN1YmhlYWRlcj7lvZPliY3ku7vliqE8L1N1YmhlYWRlcj5cblxuXHRcdFx0XHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5oiQ57upXCIgdmFsdWU9e2Ake3Njb3JlfSR7dG90YWxTY29yZT09c2NvcmUgPyBcIlwiIDogYC8ke3RvdGFsU2NvcmV9YH1gfS8+XG5cblx0XHRcdFx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuebruagh1wiIHZhbHVlPXt0b2RvfVxuXHRcdFx0XHRcdFx0XHR0eXBlPVwiaW5wdXRcIlxuXHRcdFx0XHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uQ0hBTkdFKGlkLFwidG9kb1wiLHZhbHVlKSl9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9JbmZvRm9ybT5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQsIHtcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiUmVtb3ZlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoaWQpKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5yZXBsYWNlKFwiL1wiKVxuXHRcdFx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdFx0XX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblxuXHRcdGxldCByZWZOYW1lLCByZWZCaXJ0aGRheSwgcmVmR2VuZGVyXG5cblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUoe1xuXHRcdFx0bmFtZTogcmVmTmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQsYmQ6IHJlZkJpcnRoZGF5LmdldERhdGUoKVxuXHRcdFx0LGdlbmRlcjogcmVmR2VuZGVyLmdldFNlbGVjdGVkVmFsdWUoKVxuXHRcdH0pKS50aGVuKGJhYnk9PnJvdXRlci5yZXBsYWNlKGAvYmFieS8ke2JhYnkuX2lkfWApLGVycm9yPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6ZXJyb3J9KSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZCaXJ0aGRheT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XG5cblx0XHRcdFx0XHQ8UmFkaW9CdXR0b25Hcm91cCByZWY9e2E9PnJlZkdlbmRlcj1hfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuXHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRkZWZhdWx0U2VsZWN0ZWQ9XCJmXCI+XG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cblx0XHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHRcIkJhY2tcIlxuXHRcdFx0XHRcdFx0LHtcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiU2F2ZVwiXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5zZW5kKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEJhYnksIHtBQ1RJT059KVxuIl19