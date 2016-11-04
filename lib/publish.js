"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messager = _qiliApp.UI.Messager;

var Publisher = function (_Component) {
	_inherits(Publisher, _Component);

	function Publisher() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Publisher);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Publisher)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { template: "light" }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Publisher, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var child = this.context.child;
			var template = this.state.template;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_materialUi.AppBar, { title: "出版" + child.name + "的成长历程,留下永久的回忆",
					showMenuIconButton: false }),
				_react2.default.createElement(
					"center",
					null,
					_react2.default.createElement(_materialUi.DatePicker, { ref: "since",
						floatingLabelText: "自从",
						autoOk: true, mode: "landscape" }),
					_react2.default.createElement(_materialUi.TextField, { ref: "copy",
						floatingLabelText: "打印多少本",
						defaultValue: 1,
						type: "number" })
				),
				_react2.default.createElement(
					_materialUi.GridList,
					null,
					_react2.default.createElement(
						_materialUi.Subheader,
						null,
						"选择出版模板"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTzs7SUFHYzs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU0sRUFBQyxVQUFTLE9BQVQ7OztjQURhOzsyQkFHVDs7O09BQ0gsUUFBTyxLQUFLLE9BQUwsQ0FBUCxNQURHO09BRUgsV0FBVSxLQUFLLEtBQUwsQ0FBVixTQUZHOztBQUdKLFVBQ0k7OztJQUNSLG9EQUFRLGNBQVksTUFBTSxJQUFOLGtCQUFaO0FBQ1AseUJBQW9CLEtBQXBCLEVBREQsQ0FEUTtJQUdSOzs7S0FDQyx3REFBWSxLQUFJLE9BQUo7QUFDWCx5QkFBa0IsSUFBbEI7QUFDQSxjQUFRLElBQVIsRUFBYyxNQUFLLFdBQUwsRUFGZixDQUREO0tBS0MsdURBQVcsS0FBSSxNQUFKO0FBQ1YseUJBQWtCLE9BQWxCO0FBQ0Esb0JBQWMsQ0FBZDtBQUNBLFlBQUssUUFBTCxFQUhELENBTEQ7S0FIUTtJQWFSOzs7S0FDQzs7OztNQUREO0tBR0UseUJBQXlCLEtBQXpCLENBQStCLEdBQS9CLEVBQW9DLEdBQXBDLENBQXdDO2FBQ3hDOztTQUFVLEtBQUssQ0FBTCxFQUFRLE9BQU8sQ0FBUDtBQUNqQixvQkFBWTs7V0FBWSxTQUFTO2tCQUFHLE9BQUssUUFBTCxDQUFjLEVBQUMsVUFBUyxDQUFULEVBQWY7V0FBSCxFQUFyQjtTQUNULFlBQVUsQ0FBVixHQUNBLGdEQUFjLFlBQVcsTUFBWCxFQUFrQixPQUFNLFFBQU4sRUFBaEMsQ0FEQSxHQUVBLHNEQUFnQixZQUFXLE1BQVgsRUFBa0IsT0FBTSxPQUFOLEVBQWxDLENBRkE7U0FESCxFQUREO09BT0MsdUNBQUssMEJBQXdCLFVBQXhCLEVBQUwsQ0FQRDs7TUFEd0MsQ0FIMUM7S0FiUTtJQTRCSSwwQ0FBSSxVQUFKLElBQWUsV0FBVSxTQUFWO0FBQ1gsWUFBTyxDQUFDLE1BQUQsRUFDckIsRUFBQyxRQUFPLFNBQVAsRUFBa0IsT0FBTSxJQUFOLEVBQVksVUFBUztjQUFHLE9BQUssT0FBTDtPQUFILEVBQW1CLE1BQUssdURBQUwsRUFEdEMsRUFFckIsRUFBQyxRQUFPLE9BQVAsRUFBZ0IsT0FBTSxLQUFOLEVBQWEsVUFBUztjQUFHLE9BQUssS0FBTDtPQUFILEVBQWlCLE1BQUssb0RBQUwsRUFGbkMsQ0FBUCxFQURKLENBNUJKO0lBREosQ0FISTs7Ozs0QkF5Q0Y7QUFDUixZQUFTLElBQVQsQ0FBYyxXQUFkLEVBRFE7Ozs7MEJBSUY7QUFDTixZQUFTLElBQVQsQ0FBYyw0Q0FBZCxFQURNOzs7O1FBaERhOzs7VUFvRGIsZUFBYTtBQUNuQixRQUFPLGlCQUFVLE1BQVY7O2tCQXJEWSIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBEYXRlUGlja2VyLCBJY29uQnV0dG9uLCBHcmlkTGlzdCwgR3JpZFRpbGUsIFN1YmhlYWRlciwgQXBwQmFyLCBEaXZpZGVyLH0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25VblNlbGVjdGVkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3Rhci1ib3JkZXInXHJcbmltcG9ydCBJY29uU2VsZWN0ZWQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3RvZ2dsZS9zdGFyJ1xyXG5pbXBvcnQgSWNvblByaW50IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3ByaW50XCJcclxuaW1wb3J0IEljb25WaWV3IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3BhZ2V2aWV3XCJcclxuXHJcbmltcG9ydCBkYlB1Ymxpc2ggZnJvbSBcIi4vZGIvcHVibGlzaFwiXHJcblxyXG5jb25zdCB7TWVzc2FnZXJ9PVVJXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt0ZW1wbGF0ZTpcImxpZ2h0XCJ9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Y2hpbGR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge3RlbXBsYXRlfT10aGlzLnN0YXRlXHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG5cdFx0XHRcdDxBcHBCYXIgdGl0bGU9e2Dlh7rniYgke2NoaWxkLm5hbWV955qE5oiQ6ZW/5Y6G56iLLOeVmeS4i+awuOS5heeahOWbnuW/hmB9XHJcblx0XHRcdFx0XHRzaG93TWVudUljb25CdXR0b249e2ZhbHNlfS8+XHJcblx0XHRcdFx0PGNlbnRlcj5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInNpbmNlXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLoh6rku45cIlxyXG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IG1vZGU9XCJsYW5kc2NhcGVcIi8+XHJcblxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJjb3B5XCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLmiZPljbDlpJrlsJHmnKxcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9ezF9XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJudW1iZXJcIi8+XHJcblx0XHRcdFx0PC9jZW50ZXI+XHJcblx0XHRcdFx0PEdyaWRMaXN0PlxyXG5cdFx0XHRcdFx0PFN1YmhlYWRlcj7pgInmi6nlh7rniYjmqKHmnb88L1N1YmhlYWRlcj5cclxuXHJcblx0XHRcdFx0XHR7XCJsaWdodCxkYXJrLG1vZGVybixnaWZ0XCIuc3BsaXQoXCIsXCIpLm1hcChhPT4oXHJcblx0XHRcdFx0XHRcdDxHcmlkVGlsZSBrZXk9e2F9IHRpdGxlPXthfVxyXG5cdFx0XHRcdFx0XHRcdGFjdGlvbkljb249ezxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe3RlbXBsYXRlOmF9KX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHt0ZW1wbGF0ZT09YSA/XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25TZWxlY3RlZCBob3ZlckNvbG9yPVwiYmx1ZVwiIGNvbG9yPVwieWVsbG93XCIvPiA6XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25VblNlbGVjdGVkIGhvdmVyQ29sb3I9XCJibHVlXCIgY29sb3I9XCJ3aGl0ZVwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPn0+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2BpbWFnZXMvdGVtcGxhdGUvJHthfS5qcGdgfS8+XHJcblx0XHRcdFx0XHRcdDwvR3JpZFRpbGU+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHQ8L0dyaWRMaXN0PlxyXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIlByZXZpZXdcIiwgbGFiZWw6XCLpooTop4hcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wcmV2aWV3KCksIGljb246PEljb25WaWV3Lz59LFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUHJpbnRcIiwgbGFiZWw6XCLkupHmiZPljbBcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wcmludCgpLCBpY29uOjxJY29uUHJpbnQvPn1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdHByZXZpZXcoKXtcclxuXHRcdE1lc3NhZ2VyLnNob3coXCJzdGF5IHR1bmVcIilcclxuXHR9XHJcblxyXG5cdHByaW50KCl7XHJcblx0XHRNZXNzYWdlci5zaG93KFwiUHV0IGludG8gcXVldWUsIHBsZWFzZSBwYXkgd2l0aGluIDI0IGhvdXJzXCIpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==