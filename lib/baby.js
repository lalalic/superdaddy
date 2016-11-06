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

var _rewards = require("./components/rewards");

var _rewards2 = _interopRequireDefault(_rewards);

var _selector = require("./selector");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _qiliApp.UI.CommandBar;
var Photo = _qiliApp.UI.Photo;
var TextFieldx = _qiliApp.UI.TextFieldx;


var DOMAIN = "baby";
var ACTION = exports.ACTION = {
	CHANGE: function CHANGE(key, value) {
		return function (dispatch, getState) {
			var child = (0, _selector.currentChild)(getState());
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
		return function (dispatch) {
			var name = baby.name;

			if (!name) return Promise.reject("名字不能空");

			return _db.Family.upsert(baby).then(function (baby) {
				dispatch(ENITITIES((0, _normalizr.normalize)(baby, _db.Family.schema).entities));
				return baby;
			});
		};
	},
	REMOVE: function REMOVE(a) {
		return function (dispatch, getState) {
			var child = (0, _selector.currentChild)(getState());
			return _db.Family.remove(child._id).then(function (a) {
				dispatch((0, _qiliApp.REMOVE_ENTITIES)("children", child.id));
			});
		};
	}
};

var Baby = exports.Baby = function (_Component) {
	_inherits(Baby, _Component);

	function Baby() {
		_classCallCheck(this, Baby);

		return _possibleConstructorReturn(this, (Baby.__proto__ || Object.getPrototypeOf(Baby)).apply(this, arguments));
	}

	_createClass(Baby, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			if (next.params.id != this.props.params.id && next.params.id != next._id) next.dispatch(_.ACTION.SWITCH_CURRENT_CHILD(next.params.id));
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props;
			var name = _props.name;
			var photo = _props.photo;
			var birthday = _props.bd;
			var gender = _props.gender;
			var dispatch = _props.dispatch;
			var router = this.context.router;

			var refName = void 0;
			var changeName = function changeName(value) {
				return dispatch(ACTION.CHANGE("name", value)).catch(function (error) {
					return refName.errorText = error;
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
						errorText: null,
						onChange: function onChange(_ref) {
							var value = _ref.target.value;
							return refName.value = value;
						},
						onBlur: function onBlur(_ref2) {
							var value = _ref2.target.value;
							return changeName(value.trim());
						},
						onKeyDown: function onKeyDown(_ref3) {
							var value = _ref3.target.value;
							var keyCode = _ref3.keyCode;
							return keyCode == 13 && changeName(value.trim());
						}
					}),
					_react2.default.createElement(_materialUi.DatePicker, {
						floatingLabelText: "birthday",
						fullWidth: true,
						autoOk: true,
						showYearSelector: true,
						maxDate: new Date(),
						value: birthday,
						onChange: function onChange(nil, value) {
							return dispatch(ACTION.CHANGE("db", value));
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

Baby.contextTypes = {
	router: _react.PropTypes.object
};
var Creator = exports.Creator = function Creator(_ref4) {
	var dispatch = _ref4.dispatch;

	var photo = void 0,
	    refName = void 0,
	    refBirthday = void 0,
	    refGender = void 0;
	var values = function values(a) {
		return {
			name: refName.getValue(),
			birthday: refBirthday.getDate(),
			gender: refGender.getSelectedValue(),
			photo: photo
		};
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
					return dispatch(ACTION.CREATE(values())).then(function (baby) {
						return router.replace("/baby/" + baby._id);
					}, function (error) {
						return refName.errorText = error;
					});
				}
			}]
		})
	);
};

Creator.contextTypes = {
	router: _react.PropTypes.object
};

exports.default = Object.assign(Baby, { ACTION: ACTION });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJQaG90byIsIlRleHRGaWVsZHgiLCJET01BSU4iLCJBQ1RJT04iLCJDSEFOR0UiLCJrZXkiLCJ2YWx1ZSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJjaGlsZCIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwidXBzZXJ0IiwidGhlbiIsInVwZGF0ZWQiLCJzY2hlbWEiLCJlbnRpdGllcyIsIkNSRUFURSIsIm5hbWUiLCJiYWJ5IiwiRU5JVElUSUVTIiwiUkVNT1ZFIiwicmVtb3ZlIiwiX2lkIiwiaWQiLCJCYWJ5IiwibmV4dCIsInBhcmFtcyIsInByb3BzIiwiU1dJVENIX0NVUlJFTlRfQ0hJTEQiLCJwaG90byIsImJpcnRoZGF5IiwiYmQiLCJnZW5kZXIiLCJyb3V0ZXIiLCJjb250ZXh0IiwicmVmTmFtZSIsImNoYW5nZU5hbWUiLCJjYXRjaCIsImVycm9yVGV4dCIsImVycm9yIiwidXJsIiwiYSIsInRhcmdldCIsInRyaW0iLCJrZXlDb2RlIiwiRGF0ZSIsIm5pbCIsIm1hcmdpblRvcCIsImUiLCJmb250U2l6ZSIsImNvbG9yIiwiYm9yZGVyQm90dG9tIiwiYWN0aW9uIiwib25TZWxlY3QiLCJyZXBsYWNlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRvciIsInJlZkJpcnRoZGF5IiwicmVmR2VuZGVyIiwidmFsdWVzIiwiZ2V0VmFsdWUiLCJnZXREYXRlIiwiZ2V0U2VsZWN0ZWRWYWx1ZSIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRU9BLFUsZUFBQUEsVTtJQUFXQyxLLGVBQUFBLEs7SUFBT0MsVSxlQUFBQSxVOzs7QUFFekIsSUFBTUMsU0FBTyxNQUFiO0FBQ08sSUFBTUMsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLEdB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QUE7QUFGVixJQUZLO0FBRFI7QUExQkQsRUFERDtBQXVDQSxDQS9DTTs7QUFpRFBrQixRQUFRRixZQUFSLEdBQXFCO0FBQ3BCdEIsU0FBUSxpQkFBVXVCO0FBREUsQ0FBckI7O2tCQUllUSxPQUFPQyxNQUFQLENBQWN6QyxJQUFkLEVBQW9CLEVBQUN2QixjQUFELEVBQXBCLEMiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSSxFTlRJVElFUyxSRU1PVkVfRU5USVRJRVN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBSZXdhcmRHb2FsIGZyb20gJy4vY29tcG9uZW50cy9yZXdhcmRzJ1xuaW1wb3J0IHtjdXJyZW50Q2hpbGR9IGZyb20gXCIuL3NlbGVjdG9yXCJcbmltcG9ydCB7QUNUSU9OIGFzIFN1cGVyRGFkZHl9IGZyb20gXCIuXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsUGhvdG8sIFRleHRGaWVsZHh9PVVJXG5cbmNvbnN0IERPTUFJTj1cImJhYnlcIlxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdENIQU5HRTogKGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcbiAgICAgICAgY29uc3QgY2hpbGQ9Y3VycmVudENoaWxkKGdldFN0YXRlKCkpXG5cdFx0aWYoa2V5PT1cIm5hbWVcIiAmJiAhdmFsdWUpe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwi5ZCN5a2X5LiN6IO956m6XCIpXG5cdFx0fVxuXG5cdFx0aWYoY2hpbGRba2V5XT09dmFsdWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjaGlsZFtrZXldPXZhbHVlXG4gICAgICAgIHJldHVybiBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG4gICAgICAgICAgICAudGhlbih1cGRhdGVkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLGRiRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0fSlcbiAgICB9XG5cdCxDUkVBVEU6IGJhYnk9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge25hbWV9PWJhYnlcblx0XHRpZighbmFtZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIuWQjeWtl+S4jeiDveepulwiKVxuXG5cdFx0cmV0dXJuIGRiRmFtaWx5LnVwc2VydChiYWJ5KVxuXHRcdFx0LnRoZW4oYmFieT0+e1xuXHRcdFx0XHRkaXNwYXRjaChFTklUSVRJRVMobm9ybWFsaXplKGJhYnksZGJGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdHJldHVybiBiYWJ5XG5cdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBjaGlsZD1jdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcblx0XHRyZXR1cm4gZGJGYW1pbHkucmVtb3ZlKGNoaWxkLl9pZClcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0ZGlzcGF0Y2goUkVNT1ZFX0VOVElUSUVTKFwiY2hpbGRyZW5cIixjaGlsZC5pZCkpXG5cdFx0XHR9KVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWJ5IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdGlmKG5leHQucGFyYW1zLmlkIT10aGlzLnByb3BzLnBhcmFtcy5pZCAmJiBuZXh0LnBhcmFtcy5pZCE9bmV4dC5faWQpXG5cdFx0XHRuZXh0LmRpc3BhdGNoKFN1cGVyRGFkZHkuU1dJVENIX0NVUlJFTlRfQ0hJTEQobmV4dC5wYXJhbXMuaWQpKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWUscGhvdG8sYmQ6YmlydGhkYXksZ2VuZGVyLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCByZWZOYW1lXG5cdFx0bGV0IGNoYW5nZU5hbWU9dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJuYW1lXCIsdmFsdWUpKVxuXHRcdFx0LmNhdGNoKGVycm9yPT5yZWZOYW1lLmVycm9yVGV4dD1lcnJvcilcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0PFBob3RvXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXsxNTB9XG5cdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfVxuXHRcdFx0XHRcdFx0XHRzcmM9e3Bob3RvfVxuXHRcdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJwaG90b1wiLHVybCkpfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17bmFtZX1cblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bnVsbH1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZk5hbWUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgY2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdDxEYXRlUGlja2VyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX1cblx0XHRcdFx0XHRcdHNob3dZZWFyU2VsZWN0b3I9e3RydWV9XG5cdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfVxuXHRcdFx0XHRcdFx0dmFsdWU9e2JpcnRoZGF5fVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhuaWwsIHZhbHVlKT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcImRiXCIsdmFsdWUpKX0vPlxuXG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXBcblx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdG5hbWU9XCJnZW5kZXJcIlxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHZhbHVlKT0+ZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcImdlbmRlclwiLHZhbHVlKSl9XG5cdFx0XHRcdFx0XHR2YWx1ZVNlbGVjdGVkPXtnZW5kZXJ8fFwiZlwifT5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cIuWls+WtqVwiLz5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cIueUt+WtqVwiIC8+XG5cdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e2ZvbnRTaXplOlwic21hbGxlclwiLCBjb2xvcjpcImdyYXlcIiwgYm9yZGVyQm90dG9tOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19PlxuXHRcdFx0XHRcdFx0XHR7bmFtZX3nmoTmv4DlirHorqHliJJcblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0ey8qXG5cdFx0XHRcdFx0XHQ8UmV3YXJkR29hbFxuXHRcdFx0XHRcdFx0XHRlZGl0YWJsZT17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzB9fVxuXHRcdFx0XHRcdFx0XHRjaGlsZD17Y2hpbGR9Lz4qL31cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0XHQsIHthY3Rpb246XCJSZW1vdmVcIiwgb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRSgpKS50aGVuKGE9PnJvdXRlci5yZXBsYWNlKFwiL1wiKSl9XX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjpQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjb25zdCBDcmVhdG9yPSh7ZGlzcGF0Y2h9KT0+e1xuXHRsZXQgcGhvdG8scmVmTmFtZSwgcmVmQmlydGhkYXksIHJlZkdlbmRlclxuXHRjb25zdCB2YWx1ZXM9YT0+KHtcblx0XHRuYW1lOiByZWZOYW1lLmdldFZhbHVlKClcblx0XHQsYmlydGhkYXk6IHJlZkJpcnRoZGF5LmdldERhdGUoKVxuXHRcdCxnZW5kZXI6IHJlZkdlbmRlci5nZXRTZWxlY3RlZFZhbHVlKClcblx0XHQscGhvdG9cblx0fSlcblx0cmV0dXJuIChcblx0XHQ8ZGl2PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHQ8UGhvdG8gb25QaG90bz17dXJsPT5waG90bz11cmx9IHdpZHRoPXsxNTB9IGhlaWdodD17MTUwfS8+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZCaXJ0aGRheT1hfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0c2hvd1llYXJTZWxlY3Rvcj17dHJ1ZX1cblx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XG5cblx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgcmVmPXthPT5yZWZHZW5kZXI9YX1cblx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozNn19XG5cdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0ZGVmYXVsdFNlbGVjdGVkPVwiZlwiPlxuXHRcdFx0XHRcdDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG5cdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cblx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFwiQmFja1wiXG5cdFx0XHRcdFx0LHtcblx0XHRcdFx0XHRcdGFjdGlvbjpcIlNhdmVcIlxuXHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodmFsdWVzKCkpKVxuXHRcdFx0XHRcdFx0XHQudGhlbihiYWJ5PT5yb3V0ZXIucmVwbGFjZShgL2JhYnkvJHtiYWJ5Ll9pZH1gKSxlcnJvcj0+cmVmTmFtZS5lcnJvclRleHQ9ZXJyb3IpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0Lz5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5DcmVhdG9yLmNvbnRleHRUeXBlcz17XG5cdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEJhYnksIHtBQ1RJT059KVxuIl19