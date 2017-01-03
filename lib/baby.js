"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.Baby = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _qiliApp.UI.CommandBar,
    Photo = _qiliApp.UI.Photo,
    TextFieldx = _qiliApp.UI.TextFieldx;
var ACTION = exports.ACTION = {
	CHANGE: function CHANGE(id, key, value) {
		return function (dispatch, getState) {
			var child = (0, _selector.getChild)(getState(), id);
			if (key == "name" && !value) {
				return Promise.reject("名字不能空");
			}

			if (child[key] == value) return Promise.resolve();

			child[key] = value;
			return _db.Family.upsert(child).then(function (updated) {
				dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	},
	CREATE: function CREATE(baby) {
		return function (dispatch, getState) {
			var name = baby.name;

			if (!name) return Promise.reject("名字不能空");

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
	_inherits(Baby, _Component);

	function Baby() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Baby);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Baby.__proto__ || Object.getPrototypeOf(Baby)).call.apply(_ref, [this].concat(args))), _this), _this.state = { nameError: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Baby, [{
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
	_inherits(Creator, _Component2);

	function Creator() {
		var _ref3;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref3 = Creator.__proto__ || Object.getPrototypeOf(Creator)).call.apply(_ref3, [this].concat(args))), _this3), _this3.state = { nameError: null }, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(Creator, [{
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
exports.default = Object.assign(Baby, { ACTION: ACTION });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJBQ1RJT04iLCJDSEFOR0UiLCJpZCIsImtleSIsInZhbHVlIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImNoaWxkIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJ1cHNlcnQiLCJ0aGVuIiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQ1JFQVRFIiwibmFtZSIsImJhYnkiLCJSRU1PVkUiLCJyZW1vdmUiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsIkJhYnkiLCJzdGF0ZSIsIm5hbWVFcnJvciIsInByb3BzIiwiaXNDdXJyZW50IiwicGFyYW1zIiwicGhvdG8iLCJiaXJ0aGRheSIsImJkIiwiZ2VuZGVyIiwic2NvcmUiLCJ0b2RvIiwiZ29hbCIsInRvdGFsU2NvcmUiLCJ0b2RvcyIsInJvdXRlciIsImNvbnRleHQiLCJjaGFuZ2VOYW1lIiwicmVmTmFtZSIsImdldFZhbHVlIiwidHJpbSIsInNldFN0YXRlIiwiZXJyb3IiLCJ1cmwiLCJsYWJlbCIsImFjdGlvbiIsIm9uU2VsZWN0IiwicmVwbGFjZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJyZWZCaXJ0aGRheSIsInJlZkdlbmRlciIsInNlbmQiLCJnZXREYXRlIiwiZ2V0U2VsZWN0ZWRWYWx1ZSIsIl9pZCIsImEiLCJEYXRlIiwibWFyZ2luVG9wIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0lBRU9BLFUsZUFBQUEsVTtJQUFXQyxLLGVBQUFBLEs7SUFBT0MsVSxlQUFBQSxVO0FBRWxCLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFRLGdCQUFDQyxFQUFELEVBQUtDLEdBQUwsRUFBU0MsS0FBVDtBQUFBLFNBQWlCLFVBQUNDLFFB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Rlo7QUFHQyxjQUFRLElBSFQ7QUFJQyxlQUFTLElBQUlDLElBQUosRUFKVixHQU5EO0FBWUM7QUFBQTtBQUFBLFFBQWtCLEtBQUs7QUFBQSxlQUFHTixZQUFVSyxDQUFiO0FBQUEsUUFBdkI7QUFDQyxjQUFPLEVBQUNFLFdBQVUsRUFBWCxFQURSO0FBRUMsYUFBSyxRQUZOO0FBR0Msd0JBQWdCLEdBSGpCO0FBSUMsK0RBQWEsT0FBTSxHQUFuQixFQUF1QixPQUFNLE1BQTdCLEdBSkQ7QUFLQywrREFBYSxPQUFNLEdBQW5CLEVBQXVCLE9BQU0sS0FBN0I7QUFMRDtBQVpELEtBREQ7QUFzQkMsa0NBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEI7QUFDQyxZQUFPLENBQ04sTUFETSxFQUVMO0FBQ0FkLGNBQU8sTUFEUDtBQUVDQyxnQkFBUztBQUFBLGNBQUdPLE1BQUg7QUFBQTtBQUZWLE1BRks7QUFEUjtBQXRCRCxJQUREO0FBa0NBOzs7Ozs7QUFsRFdILE8sQ0FvRExGLFksR0FBYSxFQUFDYixRQUFRLGlCQUFVYyxNQUFuQixFO2tCQUdOVyxPQUFPQyxNQUFQLENBQWN6QyxJQUFkLEVBQW9CLEVBQUN0QixjQUFELEVBQXBCLEMiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJLEVOVElUSUVTLFJFTU9WRV9FTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXIsU3ViaGVhZGVyfSBmcm9tICdtYXRlcmlhbC11aSdcclxuXHJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGR9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuaW1wb3J0IHtBQ1RJT04gYXMgU3VwZXJEYWRkeX0gZnJvbSBcIi5cIlxyXG5cclxuaW1wb3J0IHtJbmZvRm9ybSwgRmllbGR9IGZyb20gXCJxaWxpLWFwcC9saWIvY29tcG9uZW50cy9pbmZvLWZvcm1cIlxyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsUGhvdG8sIFRleHRGaWVsZHh9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRDSEFOR0U6IChpZCwga2V5LHZhbHVlKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG4gICAgICAgIGNvbnN0IGNoaWxkPWdldENoaWxkKGdldFN0YXRlKCksaWQpXHJcblx0XHRpZihrZXk9PVwibmFtZVwiICYmICF2YWx1ZSl7XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIuWQjeWtl+S4jeiDveepulwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNoaWxkW2tleV09PXZhbHVlKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuXHJcbiAgICAgICAgY2hpbGRba2V5XT12YWx1ZVxyXG4gICAgICAgIHJldHVybiBkYkZhbWlseS51cHNlcnQoY2hpbGQpXHJcbiAgICAgICAgICAgIC50aGVuKHVwZGF0ZWQ9PntcclxuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcclxuXHRcdFx0fSlcclxuICAgIH1cclxuXHQsQ1JFQVRFOiBiYWJ5PT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCB7bmFtZX09YmFieVxyXG5cdFx0aWYoIW5hbWUpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIuWQjeWtl+S4jeiDveepulwiKVxyXG5cclxuXHRcdHJldHVybiBkYkZhbWlseS51cHNlcnQoYmFieSlcclxuXHRcdFx0LnRoZW4oYmFieT0+e1xyXG5cdFx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGJhYnksZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXHJcblx0XHRcdFx0XHRyZXR1cm4gYmFieVxyXG5cdFx0XHRcdH0pXHJcblx0fVxyXG5cdCxSRU1PVkU6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRyZXR1cm4gZGJGYW1pbHkucmVtb3ZlKGlkKVxyXG5cdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXHJcblx0XHRcdFx0ZGlzcGF0Y2goUkVNT1ZFX0VOVElUSUVTKFwiY2hpbGRyZW5cIixpZCkpXHJcblx0XHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCB7aXNDdXJyZW50LHBhcmFtczp7aWR9LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0aWYoIWlzQ3VycmVudClcclxuXHRcdFx0ZGlzcGF0Y2goU3VwZXJEYWRkeS5TV0lUQ0hfQ1VSUkVOVF9DSElMRChpZCkpXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtpc0N1cnJlbnQsZGlzcGF0Y2gscGFyYW1zOntpZH19KXtcclxuXHRcdGlmKCFpc0N1cnJlbnQpXHJcblx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bmFtZSxwaG90byxiZDpiaXJ0aGRheSxnZW5kZXIsIHNjb3JlLCB0b2RvLCBnb2FsLCB0b3RhbFNjb3JlPXNjb3JlLCB0b2RvcywgZGlzcGF0Y2gscGFyYW1zOntpZH19PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGNvbnN0IGNoYW5nZU5hbWU9YT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcIm5hbWVcIixyZWZOYW1lLmdldFZhbHVlKCkudHJpbSgpKSlcclxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSwgZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxyXG5cdFx0bGV0IHJlZk5hbWVcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxyXG5cdFx0XHRcdFx0XHQ8UGhvdG9cclxuXHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxyXG5cdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfVxyXG5cdFx0XHRcdFx0XHRcdHNyYz17cGhvdG99XHJcblx0XHRcdFx0XHRcdFx0b3ZlcndyaXRhYmxlPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcInBob3RvXCIsdXJsKSl9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxJbmZvRm9ybT5cclxuXHRcdFx0XHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5a6d5a6d5ZCNXCIgdmFsdWU9e25hbWV9XHJcblx0XHRcdFx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcIm5hbWVcIix2YWx1ZSkpfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLnlJ/ml6VcIiB2YWx1ZT17YmlydGhkYXl9XHJcblx0XHRcdFx0XHRcdFx0dHlwZT1cImRhdGVcIlxyXG5cdFx0XHRcdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJiZFwiLHZhbHVlKSl9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiIHZhbHVlPXtnZW5kZXJ8fFwiZlwifVxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJzaW5nbGVcIlxyXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM9e1t7dmFsdWU6XCJmXCIsbGFiZWw6XCLlpbPlralcIn0se3ZhbHVlOlwibVwiLCBsYWJlbDpcIueUt+WtqVwifV19XHJcblx0XHRcdFx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcImdlbmRlclwiLHZhbHVlKSl9XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxTdWJoZWFkZXI+5b2T5YmN5Lu75YqhPC9TdWJoZWFkZXI+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLmiJDnu6lcIiB2YWx1ZT17YCR7c2NvcmV9JHt0b3RhbFNjb3JlPT1zY29yZSA/IFwiXCIgOiBgLyR7dG90YWxTY29yZX1gfWB9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuebruagh1wiIHZhbHVlPXt0b2RvfVxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdFx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcInRvZG9cIix2YWx1ZSkpfVxyXG5cdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHQ8L0luZm9Gb3JtPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdFwiQmFja1wiXHJcblx0XHRcdFx0XHRcdCwge1xyXG5cdFx0XHRcdFx0XHRcdGFjdGlvbjpcIlJlbW92ZVwiLFxyXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoaWQpKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyb3V0ZXIucmVwbGFjZShcIi9cIilcclxuXHRcdFx0XHRcdFx0XHRcdH0pfVxyXG5cdFx0XHRcdFx0XHRdfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRsZXQgcmVmTmFtZSwgcmVmQmlydGhkYXksIHJlZkdlbmRlclxyXG5cclxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh7XHJcblx0XHRcdG5hbWU6IHJlZk5hbWUuZ2V0VmFsdWUoKVxyXG5cdFx0XHQsYmQ6IHJlZkJpcnRoZGF5LmdldERhdGUoKVxyXG5cdFx0XHQsZ2VuZGVyOiByZWZHZW5kZXIuZ2V0U2VsZWN0ZWRWYWx1ZSgpXHJcblx0XHR9KSkudGhlbihiYWJ5PT5yb3V0ZXIucmVwbGFjZShgL2JhYnkvJHtiYWJ5Ll9pZH1gKSxlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmTmFtZT1hfVxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxyXG5cdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZCaXJ0aGRheT1hfVxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XHJcblx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9Lz5cclxuXHJcblx0XHRcdFx0XHQ8UmFkaW9CdXR0b25Hcm91cCByZWY9e2E9PnJlZkdlbmRlcj1hfVxyXG5cdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XHJcblx0XHRcdFx0XHRcdG5hbWU9XCJnZW5kZXJcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0U2VsZWN0ZWQ9XCJmXCI+XHJcblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XHJcblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cImJveVwiIC8+XHJcblx0XHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0XCJCYWNrXCJcclxuXHRcdFx0XHRcdFx0LHtcclxuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJTYXZlXCJcclxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+c2VuZCgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF19XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQmFieSwge0FDVElPTn0pXHJcbiJdfQ==