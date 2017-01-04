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
	CHANGE_TODO: function CHANGE_TODO(id, value) {
		return function (dispatch, getState) {
			var child = (0, _selector.getChild)(getState(), id);
			var target = child.targets["baby"];
			if (target.todo == value) return Promise.resolve();

			target.todo = value;
			return _db.Family.upsert(child).then(function (updated) {
				dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	},
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
			    _props2$score = _props2.score,
			    score = _props2$score === undefined ? 0 : _props2$score,
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
							onEdit: goal ? function (value) {
								return dispatch(ACTION.CHANGE_TODO(id, value));
							} : null
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJBQ1RJT04iLCJDSEFOR0VfVE9ETyIsImlkIiwidmFsdWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiY2hpbGQiLCJ0YXJnZXQiLCJ0YXJnZXRzIiwidG9kbyIsIlByb21pc2UiLCJyZXNvbHZlIiwidXBzZXJ0IiwidGhlbiIsInVwZGF0ZWQiLCJzY2hlbWEiLCJlbnRpdGllcyIsIkNIQU5HRSIsImtleSIsInJlamVjdCIsIkNSRUFURSIsIm5hbWUiLCJiYWJ5IiwiUkVNT1ZFIiwicmVtb3ZlIiwiU1dJVENIX0NVUlJFTlRfQ0hJTEQiLCJCYWJ5Iiwic3RhdGUiLCJuYW1lRXJyb3IiLCJwcm9wcyIsImlzQ3VycmVudCIsInBhcmFtcyIsInBob3RvIiwiYmlydGhkYXkiLCJiZCIsImdlbmRlciIsInNjb3JlIiwiZ29hbCIsInRvdGFsU2NvcmUiLCJ0b2RvcyIsInJvdXRlciIsImNvbnRleHQiLCJjaGFuZ2VOYW1lIiwicmVmTmFtZSIsImdldFZhbHVlIiwidHJpbSIsInNldFN0YXRlIiwiZXJyb3IiLCJ1cmwiLCJsYWJlbCIsImFjdGlvbiIsIm9uU2VsZWN0IiwicmVwbGFjZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJyZWZCaXJ0aGRheSIsInJlZkdlbmRlciIsInNlbmQiLCJnZXREYXRlIiwiZ2V0U2VsZWN0ZWRWYWx1ZSIsIl9pZCIsImEiLCJEYXRlIiwibWFyZ2luVG9wIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0lBRU9BLFUsZUFBQUEsVTtJQUFXQyxLLGVBQUFBLEs7SUFBT0MsVSxlQUFBQSxVO0FBRWxCLElBQU1DLDBCQUFPO0FBQ25CQyxjQUFhLHFCQUFDQyxFQUFELEVBQUlDLEtB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QUFsRFdILE8sQ0FvRExGLFksR0FBYSxFQUFDYixRQUFRLGlCQUFVYyxNQUFuQixFO2tCQUdOVyxPQUFPQyxNQUFQLENBQWN4QyxJQUFkLEVBQW9CLEVBQUMxQixjQUFELEVBQXBCLEMiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJLEVOVElUSUVTLFJFTU9WRV9FTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXIsU3ViaGVhZGVyfSBmcm9tICdtYXRlcmlhbC11aSdcclxuXHJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGR9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuaW1wb3J0IHtBQ1RJT04gYXMgU3VwZXJEYWRkeX0gZnJvbSBcIi5cIlxyXG5cclxuaW1wb3J0IHtJbmZvRm9ybSwgRmllbGR9IGZyb20gXCJxaWxpLWFwcC9saWIvY29tcG9uZW50cy9pbmZvLWZvcm1cIlxyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsUGhvdG8sIFRleHRGaWVsZHh9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRDSEFOR0VfVE9ETzogKGlkLHZhbHVlKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG4gICAgICAgIGNvbnN0IGNoaWxkPWdldENoaWxkKGdldFN0YXRlKCksaWQpXHJcblx0XHRsZXQgdGFyZ2V0PWNoaWxkLnRhcmdldHNbXCJiYWJ5XCJdXHJcblx0XHRpZih0YXJnZXQudG9kbz09dmFsdWUpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG5cclxuICAgICAgICB0YXJnZXQudG9kbz12YWx1ZVxyXG4gICAgICAgIHJldHVybiBkYkZhbWlseS51cHNlcnQoY2hpbGQpXHJcbiAgICAgICAgICAgIC50aGVuKHVwZGF0ZWQ9PntcclxuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxkYkZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcclxuXHRcdFx0fSlcclxuICAgIH1cclxuXHQsQ0hBTkdFOiAoaWQsIGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuICAgICAgICBjb25zdCBjaGlsZD1nZXRDaGlsZChnZXRTdGF0ZSgpLGlkKVxyXG5cdFx0aWYoa2V5PT1cIm5hbWVcIiAmJiAhdmFsdWUpe1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcclxuXHRcdH1cclxuXHJcblx0XHRpZihjaGlsZFtrZXldPT12YWx1ZSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcblxyXG4gICAgICAgIGNoaWxkW2tleV09dmFsdWVcclxuICAgICAgICByZXR1cm4gZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxyXG4gICAgICAgICAgICAudGhlbih1cGRhdGVkPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXHJcblx0XHRcdH0pXHJcbiAgICB9XHJcblx0LENSRUFURTogYmFieT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qge25hbWV9PWJhYnlcclxuXHRcdGlmKCFuYW1lKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCLlkI3lrZfkuI3og73nqbpcIilcclxuXHJcblx0XHRyZXR1cm4gZGJGYW1pbHkudXBzZXJ0KGJhYnkpXHJcblx0XHRcdC50aGVuKGJhYnk9PntcclxuXHRcdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShiYWJ5LGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGJhYnlcclxuXHRcdFx0XHR9KVxyXG5cdH1cclxuXHQsUkVNT1ZFOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0cmV0dXJuIGRiRmFtaWx5LnJlbW92ZShpZClcclxuXHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxyXG5cdFx0XHRcdGRpc3BhdGNoKFJFTU9WRV9FTlRJVElFUyhcImNoaWxkcmVuXCIsaWQpKVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge2lzQ3VycmVudCxwYXJhbXM6e2lkfSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGlmKCFpc0N1cnJlbnQpXHJcblx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7aXNDdXJyZW50LGRpc3BhdGNoLHBhcmFtczp7aWR9fSl7XHJcblx0XHRpZighaXNDdXJyZW50KVxyXG5cdFx0XHRkaXNwYXRjaChTdXBlckRhZGR5LlNXSVRDSF9DVVJSRU5UX0NISUxEKGlkKSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge25hbWUscGhvdG8sYmQ6YmlydGhkYXksZ2VuZGVyLCBzY29yZT0wLCB0b2RvLCBnb2FsLCB0b3RhbFNjb3JlPXNjb3JlLCB0b2RvcywgZGlzcGF0Y2gscGFyYW1zOntpZH19PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtuYW1lRXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGNvbnN0IGNoYW5nZU5hbWU9YT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcIm5hbWVcIixyZWZOYW1lLmdldFZhbHVlKCkudHJpbSgpKSlcclxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSwgZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxyXG5cdFx0bGV0IHJlZk5hbWVcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxyXG5cdFx0XHRcdFx0XHQ8UGhvdG9cclxuXHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxyXG5cdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfVxyXG5cdFx0XHRcdFx0XHRcdHNyYz17cGhvdG99XHJcblx0XHRcdFx0XHRcdFx0b3ZlcndyaXRhYmxlPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcInBob3RvXCIsdXJsKSl9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxJbmZvRm9ybT5cclxuXHRcdFx0XHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5a6d5a6d5ZCNXCIgdmFsdWU9e25hbWV9XHJcblx0XHRcdFx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcIm5hbWVcIix2YWx1ZSkpfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLnlJ/ml6VcIiB2YWx1ZT17YmlydGhkYXl9XHJcblx0XHRcdFx0XHRcdFx0dHlwZT1cImRhdGVcIlxyXG5cdFx0XHRcdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJiZFwiLHZhbHVlKSl9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiIHZhbHVlPXtnZW5kZXJ8fFwiZlwifVxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJzaW5nbGVcIlxyXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM9e1t7dmFsdWU6XCJmXCIsbGFiZWw6XCLlpbPlralcIn0se3ZhbHVlOlwibVwiLCBsYWJlbDpcIueUt+WtqVwifV19XHJcblx0XHRcdFx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcImdlbmRlclwiLHZhbHVlKSl9XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxTdWJoZWFkZXI+5b2T5YmN5Lu75YqhPC9TdWJoZWFkZXI+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLmiJDnu6lcIiB2YWx1ZT17YCR7c2NvcmV9JHt0b3RhbFNjb3JlPT1zY29yZSA/IFwiXCIgOiBgLyR7dG90YWxTY29yZX1gfWB9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuebruagh1wiIHZhbHVlPXt0b2RvfVxyXG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdFx0XHRcdFx0b25FZGl0PXtnb2FsID8gdmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0VfVE9ETyhpZCx2YWx1ZSkpIDogbnVsbH1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PC9JbmZvRm9ybT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0XHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHRcIkJhY2tcIlxyXG5cdFx0XHRcdFx0XHQsIHtcclxuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJSZW1vdmVcIixcclxuXHRcdFx0XHRcdFx0XHRvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uUkVNT1ZFKGlkKSlcclxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnJlcGxhY2UoXCIvXCIpXHJcblx0XHRcdFx0XHRcdFx0XHR9KX1cclxuXHRcdFx0XHRcdFx0XX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0b3IgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsfVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7bmFtZUVycm9yfT10aGlzLnN0YXRlXHJcblxyXG5cdFx0bGV0IHJlZk5hbWUsIHJlZkJpcnRoZGF5LCByZWZHZW5kZXJcclxuXHJcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUoe1xyXG5cdFx0XHRuYW1lOiByZWZOYW1lLmdldFZhbHVlKClcclxuXHRcdFx0LGJkOiByZWZCaXJ0aGRheS5nZXREYXRlKClcclxuXHRcdFx0LGdlbmRlcjogcmVmR2VuZGVyLmdldFNlbGVjdGVkVmFsdWUoKVxyXG5cdFx0fSkpLnRoZW4oYmFieT0+cm91dGVyLnJlcGxhY2UoYC9iYWJ5LyR7YmFieS5faWR9YCksZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcclxuXHRcdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj17YT0+cmVmQmlydGhkYXk9YX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XHJcblxyXG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgcmVmPXthPT5yZWZHZW5kZXI9YX1cclxuXHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxyXG5cdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFNlbGVjdGVkPVwiZlwiPlxyXG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxyXG5cdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxyXG5cdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdFwiQmFja1wiXHJcblx0XHRcdFx0XHRcdCx7XHJcblx0XHRcdFx0XHRcdFx0YWN0aW9uOlwiU2F2ZVwiXHJcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PnNlbmQoKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEJhYnksIHtBQ1RJT059KVxyXG4iXX0=