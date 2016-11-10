"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _starBorder = require("material-ui/svg-icons/toggle/star-border");

var _starBorder2 = _interopRequireDefault(_starBorder);

var _star = require("material-ui/svg-icons/toggle/star");

var _star2 = _interopRequireDefault(_star);

var _print = require("material-ui/svg-icons/action/print");

var _print2 = _interopRequireDefault(_print);

var _pageview = require("material-ui/svg-icons/action/pageview");

var _pageview2 = _interopRequireDefault(_pageview);

var _publish = require("./db/publish");

var _publish2 = _interopRequireDefault(_publish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messager = _qiliApp.UI.Messager;

var Publisher = function (_Component) {
	(0, _inherits3.default)(Publisher, _Component);

	function Publisher() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Publisher);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Publisher.__proto__ || (0, _getPrototypeOf2.default)(Publisher)).call.apply(_ref, [this].concat(args))), _this), _this.state = { template: "light" }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Publisher, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var child = this.context.child;
			var template = this.state.template;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_materialUi.AppBar, { title: "\u51FA\u7248" + child.name + "\u7684\u6210\u957F\u5386\u7A0B,\u7559\u4E0B\u6C38\u4E45\u7684\u56DE\u5FC6",
					showMenuIconButton: false }),
				_react2.default.createElement(
					"center",
					null,
					_react2.default.createElement(_materialUi.DatePicker, { ref: "since",
						floatingLabelText: "\u81EA\u4ECE",
						autoOk: true, mode: "landscape" }),
					_react2.default.createElement(_materialUi.TextField, { ref: "copy",
						floatingLabelText: "\u6253\u5370\u591A\u5C11\u672C",
						defaultValue: 1,
						type: "number" })
				),
				_react2.default.createElement(
					_materialUi.GridList,
					null,
					_react2.default.createElement(
						_materialUi.Subheader,
						null,
						"\u9009\u62E9\u51FA\u7248\u6A21\u677F"
					),
					"light,dark,modern,gift".split(",").map(function (a) {
						return _react2.default.createElement(
							_materialUi.GridTile,
							{ key: a, title: a,
								actionIcon: _react2.default.createElement(
									_materialUi.IconButton,
									{ onClick: function onClick(e) {
											return _this2.setState({ template: a });
										} },
									template == a ? _react2.default.createElement(_star2.default, { hoverColor: "blue", color: "yellow" }) : _react2.default.createElement(_starBorder2.default, { hoverColor: "blue", color: "white" })
								) },
							_react2.default.createElement("img", { src: "images/template/" + a + ".jpg" })
						);
					})
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Preview", label: "预览", onSelect: function onSelect(e) {
							return _this2.preview();
						}, icon: _react2.default.createElement(_pageview2.default, null) }, { action: "Print", label: "云打印", onSelect: function onSelect(e) {
							return _this2.print();
						}, icon: _react2.default.createElement(_print2.default, null) }] })
			);
		}
	}, {
		key: "preview",
		value: function preview() {
			Messager.show("stay tune");
		}
	}, {
		key: "print",
		value: function print() {
			Messager.show("Put into queue, please pay within 24 hours");
		}
	}]);
	return Publisher;
}(_react.Component);

Publisher.contextTypes = {
	child: _react.PropTypes.object
};
exports.default = Publisher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2VyIiwiUHVibGlzaGVyIiwic3RhdGUiLCJ0ZW1wbGF0ZSIsImNoaWxkIiwiY29udGV4dCIsIm5hbWUiLCJzcGxpdCIsIm1hcCIsImEiLCJzZXRTdGF0ZSIsImFjdGlvbiIsImxhYmVsIiwib25TZWxlY3QiLCJwcmV2aWV3IiwiaWNvbiIsInByaW50Iiwic2hvdyIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztJQUVPQSxRLGVBQUFBLFE7O0lBR2NDLFM7Ozs7Ozs7Ozs7Ozs7O2dOQUNwQkMsSyxHQUFNLEVBQUNDLFVBQVMsT0FBVixFOzs7OzsyQkFFSztBQUFBOztBQUFBLE9BQ0hDLEtBREcsR0FDSSxLQUFLQyxPQURULENBQ0hELEtBREc7QUFBQSxPQUVIRCxRQUZHLEdBRU8sS0FBS0QsS0FGWixDQUVIQyxRQUZHOztBQUdKLFVBQ0k7QUFBQTtBQUFBO0FBQ1Isd0RBQVEsd0JBQVlDLE1BQU1FLElBQWxCLDhFQUFSO0FBQ0MseUJBQW9CLEtBRHJCLEdBRFE7QUFHUjtBQUFBO0FBQUE7QUFDQyw2REFBWSxLQUFJLE9BQWhCO0FBQ0MseUJBQWtCLGNBRG5CO0FBRUMsY0FBUSxJQUZULEVBRWUsTUFBSyxXQUZwQixHQUREO0FBS0MsNERBQVcsS0FBSSxNQUFmO0FBQ0MseUJBQWtCLGdDQURuQjtBQUVDLG9CQUFjLENBRmY7QUFHQyxZQUFLLFFBSE47QUFMRCxLQUhRO0FBYVI7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUREO0FBR0UsOEJBQXlCQyxLQUF6QixDQUErQixHQUEvQixFQUFvQ0MsR0FBcEMsQ0FBd0M7QUFBQSxhQUN4QztBQUFBO0FBQUEsU0FBVSxLQUFLQyxDQUFmLEVBQWtCLE9BQU9BLENBQXpCO0FBQ0Msb0JBQVk7QUFBQTtBQUFBLFdBQVksU0FBUztBQUFBLGtCQUFHLE9BQUtDLFFBQUwsQ0FBYyxFQUFDUCxVQUFTTSxDQUFWLEVBQWQsQ0FBSDtBQUFBLFdBQXJCO0FBQ1ROLHFCQUFVTSxDQUFWLEdBQ0EsZ0RBQWMsWUFBVyxNQUF6QixFQUFnQyxPQUFNLFFBQXRDLEdBREEsR0FFQSxzREFBZ0IsWUFBVyxNQUEzQixFQUFrQyxPQUFNLE9BQXhDO0FBSFMsU0FEYjtBQU9DLDhDQUFLLDBCQUF3QkEsQ0FBeEIsU0FBTDtBQVBELE9BRHdDO0FBQUEsTUFBeEM7QUFIRixLQWJRO0FBNEJJLDhDQUFJLFVBQUosSUFBZSxXQUFVLFNBQXpCO0FBQ0ksWUFBTyxDQUFDLE1BQUQsRUFDckIsRUFBQ0UsUUFBTyxTQUFSLEVBQW1CQyxPQUFNLElBQXpCLEVBQStCQyxVQUFTO0FBQUEsY0FBRyxPQUFLQyxPQUFMLEVBQUg7QUFBQSxPQUF4QyxFQUEyREMsTUFBSyx1REFBaEUsRUFEcUIsRUFFckIsRUFBQ0osUUFBTyxPQUFSLEVBQWlCQyxPQUFNLEtBQXZCLEVBQThCQyxVQUFTO0FBQUEsY0FBRyxPQUFLRyxLQUFMLEVBQUg7QUFBQSxPQUF2QyxFQUF3REQsTUFBSyxvREFBN0QsRUFGcUIsQ0FEWDtBQTVCSixJQURKO0FBb0NIOzs7NEJBRUs7QUFDUmYsWUFBU2lCLElBQVQsQ0FBYyxXQUFkO0FBQ0E7OzswQkFFTTtBQUNOakIsWUFBU2lCLElBQVQsQ0FBYyw0Q0FBZDtBQUNBOzs7OztBQWxEbUJoQixTLENBb0RiaUIsWSxHQUFhO0FBQ25CZCxRQUFPLGlCQUFVZTtBQURFLEM7a0JBcERBbEIsUyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBEYXRlUGlja2VyLCBJY29uQnV0dG9uLCBHcmlkTGlzdCwgR3JpZFRpbGUsIFN1YmhlYWRlciwgQXBwQmFyLCBEaXZpZGVyLH0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25VblNlbGVjdGVkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3Rhci1ib3JkZXInXHJcbmltcG9ydCBJY29uU2VsZWN0ZWQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3RvZ2dsZS9zdGFyJ1xyXG5pbXBvcnQgSWNvblByaW50IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3ByaW50XCJcclxuaW1wb3J0IEljb25WaWV3IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3BhZ2V2aWV3XCJcclxuXHJcbmltcG9ydCBkYlB1Ymxpc2ggZnJvbSBcIi4vZGIvcHVibGlzaFwiXHJcblxyXG5jb25zdCB7TWVzc2FnZXJ9PVVJXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt0ZW1wbGF0ZTpcImxpZ2h0XCJ9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Y2hpbGR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge3RlbXBsYXRlfT10aGlzLnN0YXRlXHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG5cdFx0XHRcdDxBcHBCYXIgdGl0bGU9e2Dlh7rniYgke2NoaWxkLm5hbWV955qE5oiQ6ZW/5Y6G56iLLOeVmeS4i+awuOS5heeahOWbnuW/hmB9XHJcblx0XHRcdFx0XHRzaG93TWVudUljb25CdXR0b249e2ZhbHNlfS8+XHJcblx0XHRcdFx0PGNlbnRlcj5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInNpbmNlXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLoh6rku45cIlxyXG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IG1vZGU9XCJsYW5kc2NhcGVcIi8+XHJcblxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJjb3B5XCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLmiZPljbDlpJrlsJHmnKxcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9ezF9XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJudW1iZXJcIi8+XHJcblx0XHRcdFx0PC9jZW50ZXI+XHJcblx0XHRcdFx0PEdyaWRMaXN0PlxyXG5cdFx0XHRcdFx0PFN1YmhlYWRlcj7pgInmi6nlh7rniYjmqKHmnb88L1N1YmhlYWRlcj5cclxuXHJcblx0XHRcdFx0XHR7XCJsaWdodCxkYXJrLG1vZGVybixnaWZ0XCIuc3BsaXQoXCIsXCIpLm1hcChhPT4oXHJcblx0XHRcdFx0XHRcdDxHcmlkVGlsZSBrZXk9e2F9IHRpdGxlPXthfVxyXG5cdFx0XHRcdFx0XHRcdGFjdGlvbkljb249ezxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe3RlbXBsYXRlOmF9KX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHt0ZW1wbGF0ZT09YSA/XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25TZWxlY3RlZCBob3ZlckNvbG9yPVwiYmx1ZVwiIGNvbG9yPVwieWVsbG93XCIvPiA6XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25VblNlbGVjdGVkIGhvdmVyQ29sb3I9XCJibHVlXCIgY29sb3I9XCJ3aGl0ZVwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPn0+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2BpbWFnZXMvdGVtcGxhdGUvJHthfS5qcGdgfS8+XHJcblx0XHRcdFx0XHRcdDwvR3JpZFRpbGU+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHQ8L0dyaWRMaXN0PlxyXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIlByZXZpZXdcIiwgbGFiZWw6XCLpooTop4hcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wcmV2aWV3KCksIGljb246PEljb25WaWV3Lz59LFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUHJpbnRcIiwgbGFiZWw6XCLkupHmiZPljbBcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wcmludCgpLCBpY29uOjxJY29uUHJpbnQvPn1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdHByZXZpZXcoKXtcclxuXHRcdE1lc3NhZ2VyLnNob3coXCJzdGF5IHR1bmVcIilcclxuXHR9XHJcblxyXG5cdHByaW50KCl7XHJcblx0XHRNZXNzYWdlci5zaG93KFwiUHV0IGludG8gcXVldWUsIHBsZWFzZSBwYXkgd2l0aGluIDI0IGhvdXJzXCIpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==