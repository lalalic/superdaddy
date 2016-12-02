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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJBQ1RJT04iLCJDSEFOR0UiLCJpZCIsImtleSIsInZhbHVlIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImNoaWxkIiwicmVqZWN0IiwicmVzb2x2ZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJDUkVBVEUiLCJuYW1lIiwiYmFieSIsIlJFTU9WRSIsInJlbW92ZSIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiQmFieSIsInN0YXRlIiwibmFtZUVycm9yIiwicHJvcHMiLCJpc0N1cnJlbnQiLCJwYXJhbXMiLCJwaG90byIsImJpcnRoZGF5IiwiYmQiLCJnZW5kZXIiLCJ0b2RvcyIsInJvdXRlciIsImNvbnRleHQiLCJjaGFuZ2VOYW1lIiwicmVmTmFtZSIsImdldFZhbHVlIiwidHJpbSIsInNldFN0YXRlIiwiZXJyb3IiLCJ1cmwiLCJhIiwidGFyZ2V0Iiwia2V5Q29kZSIsIkRhdGUiLCJuaWwiLCJtYXJnaW5Ub3AiLCJlIiwiYWN0aW9uIiwib25TZWxlY3QiLCJyZXBsYWNlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRvciIsInJlZkJpcnRoZGF5IiwicmVmR2VuZGVyIiwic2VuZCIsImdldERhdGUiLCJnZXRTZWxlY3RlZFZhbHVlIiwiX2lkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7SUFFT0EsVSxlQUFBQSxVO0lBQVdDLEssZUFBQUEsSztJQUFPQyxVLGVBQUFBLFU7QUFFbEIsSUFBTUMsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLEVBQUQsRUFBS0MsR0FBTCxFQUFTQyxLQUFUO0FBQUEsU0FBaUIsVUFBQ0MsUUFBRCxFQUFVQyxRQUFWLEVBQXFCO0FBQ3ZDLE9BQU1DLFFBQU0sd0JBQVNELFVBQVQsRUFBb0JKLEVBQXBCLENBQVo7QUFDTixPQUFHQyxPQUFLLE1BQUwsSUFBZSxDQUFDQyxLQUFuQixFQUF5QjtBQUN4QixXQUFPLGtCQUFRSSxNQUFSLENBQWUsT0FBZixDQUFQO0FBQ0E7O0FBRUQsT0FBR0QsTUFBTUosR0FBTixLQUFZQyxLQUFmLEVBQ0MsT0FBTyxrQkFBUUssT0FBUixFQUFQOztBQUVLRixTQUFNSixHQUFOLElBQVdDLEtBQVg7QUFDQSxVQUFPLFdBQVNNLE1BQVQsQ0FBZ0JILEtBQWhCLEVBQ0ZJLElBREUsQ0FDRyxtQkFBUztBQUN2Qk4sYUFBUyx1QkFBUywwQkFBVU8sT0FBVixFQUFrQixXQUFTQyxNQUEzQixFQUFtQ0MsUUFBNUMsQ0FBVDtBQUNBLElBSFcsQ0FBUDtBQUlILEdBZEk7QUFBQSxFQURXO0FBZ0JsQkMsU0FBUTtBQUFBLFNBQU0sVUFBQ1YsUUFBRCxFQUFVQyxRQUFWLEVBQXFCO0FBQUEsT0FDNUJVLElBRDRCLEdBQ3RCQyxJQURzQixDQUM1QkQsSUFENEI7O0FBRW5DLE9BQUcsQ0FBQ0EsSUFBSixFQUNDLE9BQU8sa0JBQVFSLE1BQVIsQ0FBZSxPQUFmLENBQVA7O0FBRUQsVUFBTyxXQUFTRSxNQUFULENBQWdCTyxJQUFoQixFQUNMTixJQURLLENBQ0EsZ0JBQU07QUFDVk4sYUFBUyx1QkFBUywwQkFBVVksSUFBVixFQUFlLFdBQVNKLE1BQXhCLEVBQWdDQyxRQUF6QyxDQUFUO0FBQ0EsV0FBT0csSUFBUDtBQUNBLElBSkksQ0FBUDtBQUtBLEdBVlE7QUFBQSxFQWhCVTtBQTJCbEJDLFNBQVE7QUFBQSxTQUFJLFVBQUNiLFFBQUQsRUFBVUMsUUFBVixFQUFxQjtBQUNqQyxVQUFPLFdBQVNhLE1BQVQsQ0FBZ0JqQixFQUFoQixFQUNMUyxJQURLLENBQ0EsYUFBRztBQUNSTixhQUFTLFNBQVdlLG9CQUFYLENBQWdDbEIsRUFBaEMsQ0FBVDtBQUNBRyxhQUFTLDhCQUFnQixVQUFoQixFQUEyQkgsRUFBM0IsQ0FBVDtBQUNBLElBSkssQ0FBUDtBQUtBLEdBTlE7QUFBQTtBQTNCVSxDQUFiOztJQW9DTW1CLEksV0FBQUEsSTs7Ozs7Ozs7Ozs7Ozs7c01BQ1pDLEssR0FBTSxFQUFDQyxXQUFVLElBQVgsRTs7Ozs7c0NBRWE7QUFBQSxnQkFDc0IsS0FBS0MsS0FEM0I7QUFBQSxPQUNYQyxTQURXLFVBQ1hBLFNBRFc7QUFBQSxPQUNPdkIsRUFEUCxVQUNEd0IsTUFEQyxDQUNPeEIsRUFEUDtBQUFBLE9BQ1lHLFFBRFosVUFDWUEsUUFEWjs7QUFFbEIsT0FBRyxDQUFDb0IsU0FBSixFQUNDcEIsU0FBUyxTQUFXZSxvQkFBWCxDQUFnQ2xCLEVBQWhDLENBQVQ7QUFDRDs7O21EQUUwRDtBQUFBLE9BQWhDdUIsU0FBZ0MsU0FBaENBLFNBQWdDO0FBQUEsT0FBdEJwQixRQUFzQixTQUF0QkEsUUFBc0I7QUFBQSxPQUFMSCxFQUFLLFNBQWJ3QixNQUFhLENBQUx4QixFQUFLOztBQUMxRCxPQUFHLENBQUN1QixTQUFKLEVBQ0NwQixTQUFTLFNBQVdlLG9CQUFYLENBQWdDbEIsRUFBaEMsQ0FBVDtBQUNEOzs7MkJBRU87QUFBQTs7QUFBQSxpQkFDNEQsS0FBS3NCLEtBRGpFO0FBQUEsT0FDQVIsSUFEQSxXQUNBQSxJQURBO0FBQUEsT0FDS1csS0FETCxXQUNLQSxLQURMO0FBQUEsT0FDY0MsUUFEZCxXQUNXQyxFQURYO0FBQUEsT0FDdUJDLE1BRHZCLFdBQ3VCQSxNQUR2QjtBQUFBLE9BQytCQyxLQUQvQixXQUMrQkEsS0FEL0I7QUFBQSxPQUNzQzFCLFFBRHRDLFdBQ3NDQSxRQUR0QztBQUFBLE9BQ3VESCxFQUR2RCxXQUMrQ3dCLE1BRC9DLENBQ3VEeEIsRUFEdkQ7QUFBQSxPQUVBcUIsU0FGQSxHQUVXLEtBQUtELEtBRmhCLENBRUFDLFNBRkE7QUFBQSxPQUdBUyxNQUhBLEdBR1EsS0FBS0MsT0FIYixDQUdBRCxNQUhBOzs7QUFLUCxPQUFNRSxhQUFXLFNBQVhBLFVBQVc7QUFBQSxXQUFHN0IsU0FBU0wsT0FBT0MsTUFBUCxDQUFjQyxFQUFkLEVBQWlCLE1BQWpCLEVBQXdCaUMsUUFBUUMsUUFBUixHQUFtQkMsSUFBbkIsRUFBeEIsQ0FBVCxFQUNsQjFCLElBRGtCLENBQ2I7QUFBQSxZQUFHLE9BQUsyQixRQUFMLENBQWMsRUFBQ2YsV0FBVSxJQUFYLEVBQWQsQ0FBSDtBQUFBLEtBRGEsRUFDdUI7QUFBQSxZQUFPLE9BQUtlLFFBQUwsQ0FBYyxFQUFDZixXQUFVZ0IsS0FBWCxFQUFkLENBQVA7QUFBQSxLQUR2QixDQUFIO0FBQUEsSUFBakI7QUFFQSxPQUFJSixnQkFBSjs7QUFFQSxVQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsTUFBZjtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsYUFBZjtBQUNDLG9DQUFDLEtBQUQ7QUFDQyxjQUFPLEdBRFI7QUFFQyxlQUFRLEdBRlQ7QUFHQyxZQUFLUixLQUhOO0FBSUMsZ0JBQVM7QUFBQSxlQUFLdEIsU0FBU0wsT0FBT0MsTUFBUCxDQUFjQyxFQUFkLEVBQWlCLE9BQWpCLEVBQXlCc0MsR0FBekIsQ0FBVCxDQUFMO0FBQUEsUUFKVjtBQURELE1BREQ7QUFTQyxtQ0FBQyxVQUFELElBQVksS0FBSztBQUFBLGNBQUdMLFVBQVFNLENBQVg7QUFBQSxPQUFqQjtBQUNDLHlCQUFrQixZQURuQjtBQUVDLGlCQUFXLElBRlo7QUFHQyxhQUFPekIsSUFIUjtBQUlDLGlCQUFXTyxTQUpaO0FBS0MsZ0JBQVU7QUFBQSxXQUFVbkIsS0FBVixTQUFFc0MsTUFBRixDQUFVdEMsS0FBVjtBQUFBLGNBQW9CK0IsUUFBUS9CLEtBQVIsR0FBY0EsS0FBbEM7QUFBQSxPQUxYO0FBTUMsY0FBUTtBQUFBLFdBQVVBLEtBQVYsU0FBRXNDLE1BQUYsQ0FBVXRDLEtBQVY7QUFBQSxjQUFvQjhCLFlBQXBCO0FBQUEsT0FOVDtBQU9DLGlCQUFXO0FBQUEsV0FBVTlCLEtBQVYsU0FBRXNDLE1BQUYsQ0FBVXRDLEtBQVY7QUFBQSxXQUFpQnVDLE9BQWpCLFNBQWlCQSxPQUFqQjtBQUFBLGNBQTRCQSxXQUFTLEVBQVQsSUFBZVQsWUFBM0M7QUFBQTtBQVBaLE9BVEQ7QUFtQkM7QUFDQyx5QkFBa0IsVUFEbkI7QUFFQyxpQkFBVyxJQUZaO0FBR0MsY0FBUSxJQUhUO0FBSUMsZUFBUyxJQUFJVSxJQUFKLEVBSlY7QUFLQyxhQUFPaEIsUUFMUjtBQU1DLGdCQUFVLGtCQUFDaUIsR0FBRCxFQUFNekMsS0FBTjtBQUFBLGNBQWNDLFNBQVNMLE9BQU9DLE1BQVAsQ0FBY0MsRUFBZCxFQUFpQixJQUFqQixFQUFzQkUsS0FBdEIsQ0FBVCxDQUFkO0FBQUEsT0FOWCxHQW5CRDtBQTJCQztBQUFBO0FBQUE7QUFDQyxjQUFPLEVBQUMwQyxXQUFVLEVBQVgsRUFEUjtBQUVDLGFBQUssUUFGTjtBQUdDLGlCQUFVLGtCQUFDQyxDQUFELEVBQUczQyxLQUFIO0FBQUEsZUFBV0MsU0FBU0wsT0FBT0MsTUFBUCxDQUFjQyxFQUFkLEVBQWlCLFFBQWpCLEVBQTBCRSxLQUExQixDQUFULENBQVg7QUFBQSxRQUhYO0FBSUMsc0JBQWUwQixVQUFRLEdBSnhCO0FBS0MsK0RBQWEsT0FBTSxHQUFuQixFQUF1QixPQUFNLGNBQTdCLEdBTEQ7QUFNQywrREFBYSxPQUFNLEdBQW5CLEVBQXVCLE9BQU0sY0FBN0I7QUFORDtBQTNCRCxLQUREO0FBc0NDLGtDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCO0FBQ0MsWUFBTyxDQUNOLE1BRE0sRUFFSjtBQUNEa0IsY0FBTyxRQUROO0FBRURDLGdCQUFTO0FBQUEsY0FBRzVDLFNBQVNMLE9BQU9rQixNQUFQLENBQWNoQixFQUFkLENBQVQsRUFDVlMsSUFEVSxDQUNMLGFBQUc7QUFDUnFCLGVBQU9rQixPQUFQLENBQWUsR0FBZjtBQUNBLFFBSFUsQ0FBSDtBQUFBLE9BRlIsRUFGSTtBQURSO0FBdENELElBREQ7QUFvREE7Ozs7O0FBM0VXN0IsSSxDQTRFTDhCLFksR0FBYSxFQUFDbkIsUUFBTyxpQkFBVW9CLE1BQWxCLEU7O0lBR1JDLE8sV0FBQUEsTzs7Ozs7Ozs7Ozs7Ozs7bU5BQ1ovQixLLEdBQU0sRUFBQ0MsV0FBVSxJQUFYLEU7Ozs7OzJCQUVFO0FBQUE7O0FBQUEsT0FDQWxCLFFBREEsR0FDVSxLQUFLbUIsS0FEZixDQUNBbkIsUUFEQTtBQUFBLE9BRUEyQixNQUZBLEdBRVEsS0FBS0MsT0FGYixDQUVBRCxNQUZBO0FBQUEsT0FHQVQsU0FIQSxHQUdXLEtBQUtELEtBSGhCLENBR0FDLFNBSEE7OztBQUtQLE9BQUlJLGNBQUo7QUFBQSxPQUFVUSxnQkFBVjtBQUFBLE9BQW1CbUIsb0JBQW5CO0FBQUEsT0FBZ0NDLGtCQUFoQzs7QUFFQSxPQUFNQyxPQUFLLFNBQUxBLElBQUs7QUFBQSxXQUFHbkQsU0FBU0wsT0FBT2UsTUFBUCxDQUFjO0FBQ3BDQyxXQUFNbUIsUUFBUUMsUUFBUixFQUQ4QjtBQUVuQ1AsU0FBSXlCLFlBQVlHLE9BQVosRUFGK0I7QUFHbkMzQixhQUFReUIsVUFBVUcsZ0JBQVYsRUFIMkI7QUFJbkMvQjtBQUptQyxLQUFkLENBQVQsRUFLVmhCLElBTFUsQ0FLTDtBQUFBLFlBQU1xQixPQUFPa0IsT0FBUCxZQUF3QmpDLEtBQUswQyxHQUE3QixDQUFOO0FBQUEsS0FMSyxFQUtxQztBQUFBLFlBQU8sT0FBS3JCLFFBQUwsQ0FBYyxFQUFDZixXQUFVZ0IsS0FBWCxFQUFkLENBQVA7QUFBQSxLQUxyQyxDQUFIO0FBQUEsSUFBWDs7QUFPQSxVQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsTUFBZjtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsYUFBZjtBQUNDLG9DQUFDLEtBQUQsSUFBTyxTQUFTO0FBQUEsZUFBS1osUUFBTWEsR0FBWDtBQUFBLFFBQWhCLEVBQWdDLE9BQU8sR0FBdkMsRUFBNEMsUUFBUSxHQUFwRDtBQURELE1BREQ7QUFLQyxtQ0FBQyxVQUFELElBQVksS0FBSztBQUFBLGNBQUdMLFVBQVFNLENBQVg7QUFBQSxPQUFqQjtBQUNDLHlCQUFrQixZQURuQjtBQUVDLGlCQUFXbEIsU0FGWjtBQUdDLGlCQUFXLElBSFosR0FMRDtBQVVDLDZEQUFZLEtBQUs7QUFBQSxjQUFHK0IsY0FBWWIsQ0FBZjtBQUFBLE9BQWpCO0FBQ0MseUJBQWtCLFVBRG5CO0FBRUMsaUJBQVcsSUFGWjtBQUdDLGNBQVEsSUFIVDtBQUlDLGVBQVMsSUFBSUcsSUFBSixFQUpWLEdBVkQ7QUFnQkM7QUFBQTtBQUFBLFFBQWtCLEtBQUs7QUFBQSxlQUFHVyxZQUFVZCxDQUFiO0FBQUEsUUFBdkI7QUFDQyxjQUFPLEVBQUNLLFdBQVUsRUFBWCxFQURSO0FBRUMsYUFBSyxRQUZOO0FBR0Msd0JBQWdCLEdBSGpCO0FBSUMsK0RBQWEsT0FBTSxHQUFuQixFQUF1QixPQUFNLE1BQTdCLEdBSkQ7QUFLQywrREFBYSxPQUFNLEdBQW5CLEVBQXVCLE9BQU0sS0FBN0I7QUFMRDtBQWhCRCxLQUREO0FBMEJDLGtDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCO0FBQ0MsWUFBTyxDQUNOLE1BRE0sRUFFTDtBQUNBRSxjQUFPLE1BRFA7QUFFQ0MsZ0JBQVM7QUFBQSxjQUFHTyxNQUFIO0FBQUE7QUFGVixNQUZLO0FBRFI7QUExQkQsSUFERDtBQXNDQTs7Ozs7QUF2RFdILE8sQ0F5RExGLFksR0FBYSxFQUFDbkIsUUFBUSxpQkFBVW9CLE1BQW5CLEU7a0JBR04sc0JBQWMvQixJQUFkLEVBQW9CLEVBQUNyQixjQUFELEVBQXBCLEMiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSSxFTlRJVElFUyxSRU1PVkVfRU5USVRJRVN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuaW1wb3J0IHtBQ1RJT04gYXMgU3VwZXJEYWRkeX0gZnJvbSBcIi5cIlxuXG5jb25zdCB7Q29tbWFuZEJhcixQaG90bywgVGV4dEZpZWxkeH09VUlcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdENIQU5HRTogKGlkLCBrZXksdmFsdWUpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG4gICAgICAgIGNvbnN0IGNoaWxkPWdldENoaWxkKGdldFN0YXRlKCksaWQpXG5cdFx0aWYoa2V5PT1cIm5hbWVcIiAmJiAhdmFsdWUpe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cdFx0fVxuXG5cdFx0aWYoY2hpbGRba2V5XT09dmFsdWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjaGlsZFtrZXldPXZhbHVlXG4gICAgICAgIHJldHVybiBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG4gICAgICAgICAgICAudGhlbih1cGRhdGVkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0fSlcbiAgICB9XG5cdCxDUkVBVEU6IGJhYnk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCB7bmFtZX09YmFieVxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cblx0XHRyZXR1cm4gZGJGYW1pbHkudXBzZXJ0KGJhYnkpXG5cdFx0XHQudGhlbihiYWJ5PT57XG5cdFx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGJhYnksZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdFx0cmV0dXJuIGJhYnlcblx0XHRcdFx0fSlcblx0fVxuXHQsUkVNT1ZFOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdHJldHVybiBkYkZhbWlseS5yZW1vdmUoaWQpXG5cdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxuXHRcdFx0XHRkaXNwYXRjaChSRU1PVkVfRU5USVRJRVMoXCJjaGlsZHJlblwiLGlkKSlcblx0XHRcdH0pXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGNvbnN0IHtpc0N1cnJlbnQscGFyYW1zOntpZH0sIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYoIWlzQ3VycmVudClcblx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7aXNDdXJyZW50LGRpc3BhdGNoLHBhcmFtczp7aWR9fSl7XG5cdFx0aWYoIWlzQ3VycmVudClcblx0XHRcdGRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQoaWQpKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWUscGhvdG8sYmQ6YmlydGhkYXksZ2VuZGVyLCB0b2RvcywgZGlzcGF0Y2gscGFyYW1zOntpZH19PXRoaXMucHJvcHNcblx0XHRjb25zdCB7bmFtZUVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cblx0XHRjb25zdCBjaGFuZ2VOYW1lPWE9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoaWQsXCJuYW1lXCIscmVmTmFtZS5nZXRWYWx1ZSgpLnRyaW0oKSkpXG5cdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtuYW1lRXJyb3I6bnVsbH0pLCBlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXG5cdFx0bGV0IHJlZk5hbWVcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG5cdFx0XHRcdFx0XHQ8UGhvdG9cblx0XHRcdFx0XHRcdFx0d2lkdGg9ezE1MH1cblx0XHRcdFx0XHRcdFx0aGVpZ2h0PXsxNTB9XG5cdFx0XHRcdFx0XHRcdHNyYz17cGhvdG99XG5cdFx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcInBob3RvXCIsdXJsKSl9Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdHZhbHVlPXtuYW1lfVxuXHRcdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZU5hbWUoKX1cblx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGNoYW5nZU5hbWUoKX1cblx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHQ8RGF0ZVBpY2tlclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfVxuXHRcdFx0XHRcdFx0dmFsdWU9e2JpcnRoZGF5fVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhuaWwsIHZhbHVlKT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcImJkXCIsdmFsdWUpKX0vPlxuXG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXBcblx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdG5hbWU9XCJnZW5kZXJcIlxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHZhbHVlKT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShpZCxcImdlbmRlclwiLHZhbHVlKSl9XG5cdFx0XHRcdFx0XHR2YWx1ZVNlbGVjdGVkPXtnZW5kZXJ8fFwiZlwifT5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cIuWls+WtqVwiLz5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cIueUt+WtqVwiIC8+XG5cdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0XCJCYWNrXCJcblx0XHRcdFx0XHRcdCwge1xuXHRcdFx0XHRcdFx0XHRhY3Rpb246XCJSZW1vdmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRShpZCkpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnJlcGxhY2UoXCIvXCIpXG5cdFx0XHRcdFx0XHRcdFx0fSl9XG5cdFx0XHRcdFx0XHRdfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGx9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge25hbWVFcnJvcn09dGhpcy5zdGF0ZVxuXG5cdFx0bGV0IHBob3RvLHJlZk5hbWUsIHJlZkJpcnRoZGF5LCByZWZHZW5kZXJcblxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh7XG5cdFx0XHRuYW1lOiByZWZOYW1lLmdldFZhbHVlKClcblx0XHRcdCxiZDogcmVmQmlydGhkYXkuZ2V0RGF0ZSgpXG5cdFx0XHQsZ2VuZGVyOiByZWZHZW5kZXIuZ2V0U2VsZWN0ZWRWYWx1ZSgpXG5cdFx0XHQscGhvdG9cblx0XHR9KSkudGhlbihiYWJ5PT5yb3V0ZXIucmVwbGFjZShgL2JhYnkvJHtiYWJ5Ll9pZH1gKSxlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0PFBob3RvIG9uUGhvdG89e3VybD0+cGhvdG89dXJsfSB3aWR0aD17MTUwfSBoZWlnaHQ9ezE1MH0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuXHRcdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj17YT0+cmVmQmlydGhkYXk9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0bWF4RGF0ZT17bmV3IERhdGUoKX0vPlxuXG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgcmVmPXthPT5yZWZHZW5kZXI9YX1cblx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdG5hbWU9XCJnZW5kZXJcIlxuXHRcdFx0XHRcdFx0ZGVmYXVsdFNlbGVjdGVkPVwiZlwiPlxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cImJveVwiIC8+XG5cdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0XCJCYWNrXCJcblx0XHRcdFx0XHRcdCx7XG5cdFx0XHRcdFx0XHRcdGFjdGlvbjpcIlNhdmVcIlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+c2VuZCgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XX1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjogUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihCYWJ5LCB7QUNUSU9OfSlcbiJdfQ==