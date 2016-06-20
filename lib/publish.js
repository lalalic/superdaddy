"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			return next.child != this.props.child;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var child = this.props.child;
			var template = this.state.template;

			return _qiliApp.React.createElement(
				"div",
				null,
				_qiliApp.React.createElement(_materialUi.AppBar, { title: "出版" + child.name + "的成长历程,留下永久的回忆",
					showMenuIconButton: false }),
				_qiliApp.React.createElement(
					"center",
					null,
					_qiliApp.React.createElement(_materialUi.DatePicker, { ref: "since",
						floatingLabelText: "自从",
						autoOk: true, mode: "landscape" }),
					_qiliApp.React.createElement(_materialUi.TextField, { ref: "copy",
						floatingLabelText: "打印多少本",
						defaultValue: 1,
						type: "number" })
				),
				_qiliApp.React.createElement(
					_materialUi.GridList,
					null,
					_qiliApp.React.createElement(
						_materialUi.Subheader,
						null,
						"选择出版模板"
					),
					"light,dark,modern,gift".split(",").map(function (a) {
						return _qiliApp.React.createElement(
							_materialUi.GridTile,
							{ key: a, title: a,
								actionIcon: _qiliApp.React.createElement(
									_materialUi.IconButton,
									{ onClick: function onClick(e) {
											return _this2.setState({ template: a });
										} },
									template == a ? _qiliApp.React.createElement(_star2.default, { hoverColor: "blue", color: "yellow" }) : _qiliApp.React.createElement(_starBorder2.default, { hoverColor: "blue", color: "white" })
								) },
							_qiliApp.React.createElement("img", { src: "images/template/" + a + ".jpg" })
						);
					})
				),
				_qiliApp.React.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Preview", label: "预览", onSelect: function onSelect(e) {
							return _this2.preview();
						}, icon: _pageview2.default }, { action: "Print", label: "云打印", onSelect: function onSelect(e) {
							return _this2.print();
						}, icon: _print2.default }] })
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
}(_qiliApp.Component);

exports.default = Publisher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU87O0lBR2M7Ozs7Ozs7Ozs7Ozs7O3FNQUNwQixRQUFNLEVBQUMsVUFBUyxPQUFUOzs7Y0FEYTs7NENBR1MsTUFBSztBQUMzQixVQUFPLEtBQUssS0FBTCxJQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FEUTs7OzsyQkFJdkI7OztPQUNILFFBQU8sS0FBSyxLQUFMLENBQVAsTUFERztPQUVILFdBQVUsS0FBSyxLQUFMLENBQVYsU0FGRzs7QUFHSixVQUNJOzs7SUFDUixtREFBUSxjQUFZLE1BQU0sSUFBTixrQkFBWjtBQUNQLHlCQUFvQixLQUFwQixFQURELENBRFE7SUFHUjs7O0tBQ0MsdURBQVksS0FBSSxPQUFKO0FBQ1gseUJBQWtCLElBQWxCO0FBQ0EsY0FBUSxJQUFSLEVBQWMsTUFBSyxXQUFMLEVBRmYsQ0FERDtLQUtDLHNEQUFXLEtBQUksTUFBSjtBQUNWLHlCQUFrQixPQUFsQjtBQUNBLG9CQUFjLENBQWQ7QUFDQSxZQUFLLFFBQUwsRUFIRCxDQUxEO0tBSFE7SUFhUjs7O0tBQ0M7Ozs7TUFERDtLQUdFLHlCQUF5QixLQUF6QixDQUErQixHQUEvQixFQUFvQyxHQUFwQyxDQUF3QzthQUN4Qzs7U0FBVSxLQUFLLENBQUwsRUFBUSxPQUFPLENBQVA7QUFDakIsb0JBQVk7O1dBQVksU0FBUztrQkFBRyxPQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQVMsQ0FBVCxFQUFmO1dBQUgsRUFBckI7U0FDVCxZQUFVLENBQVYsR0FDQSwrQ0FBYyxZQUFXLE1BQVgsRUFBa0IsT0FBTSxRQUFOLEVBQWhDLENBREEsR0FFQSxxREFBZ0IsWUFBVyxNQUFYLEVBQWtCLE9BQU0sT0FBTixFQUFsQyxDQUZBO1NBREgsRUFERDtPQU9DLHNDQUFLLDBCQUF3QixVQUF4QixFQUFMLENBUEQ7O01BRHdDLENBSDFDO0tBYlE7SUE0QkkseUNBQUksVUFBSixJQUFlLFdBQVUsU0FBVjtBQUNYLFlBQU8sQ0FBQyxNQUFELEVBQ3JCLEVBQUMsUUFBTyxTQUFQLEVBQWtCLE9BQU0sSUFBTixFQUFZLFVBQVM7Y0FBRyxPQUFLLE9BQUw7T0FBSCxFQUFtQix3QkFBM0QsRUFEcUIsRUFFckIsRUFBQyxRQUFPLE9BQVAsRUFBZ0IsT0FBTSxLQUFOLEVBQWEsVUFBUztjQUFHLE9BQUssS0FBTDtPQUFILEVBQWlCLHFCQUF4RCxFQUZxQixDQUFQLEVBREosQ0E1Qko7SUFESixDQUhJOzs7OzRCQXlDRjtBQUNSLFlBQVMsSUFBVCxDQUFjLFdBQWQsRUFEUTs7OzswQkFJRjtBQUNOLFlBQVMsSUFBVCxDQUFjLDRDQUFkLEVBRE07Ozs7UUFwRGEiLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBSZWFjdCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBEYXRlUGlja2VyLCBJY29uQnV0dG9uLCBHcmlkTGlzdCwgR3JpZFRpbGUsIFN1YmhlYWRlciwgQXBwQmFyLCBEaXZpZGVyLH0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25VblNlbGVjdGVkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3Rhci1ib3JkZXInXHJcbmltcG9ydCBJY29uU2VsZWN0ZWQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3RvZ2dsZS9zdGFyJ1xyXG5pbXBvcnQgSWNvblByaW50IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3ByaW50XCJcclxuaW1wb3J0IEljb25WaWV3IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3BhZ2V2aWV3XCJcclxuXHJcbmltcG9ydCBkYlB1Ymxpc2ggZnJvbSBcIi4vZGIvcHVibGlzaFwiXHJcblxyXG5jb25zdCB7TWVzc2FnZXJ9PVVJXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt0ZW1wbGF0ZTpcImxpZ2h0XCJ9XHJcblx0XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xyXG4gICAgICAgIHJldHVybiBuZXh0LmNoaWxkIT10aGlzLnByb3BzLmNoaWxkXHJcbiAgICB9XHJcblx0XHJcbiAgICByZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjaGlsZH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3RlbXBsYXRlfT10aGlzLnN0YXRlXHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG5cdFx0XHRcdDxBcHBCYXIgdGl0bGU9e2Dlh7rniYgke2NoaWxkLm5hbWV955qE5oiQ6ZW/5Y6G56iLLOeVmeS4i+awuOS5heeahOWbnuW/hmB9IFxyXG5cdFx0XHRcdFx0c2hvd01lbnVJY29uQnV0dG9uPXtmYWxzZX0vPlxyXG5cdFx0XHRcdDxjZW50ZXI+XHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzaW5jZVwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi6Ieq5LuOXCIgXHJcblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0gbW9kZT1cImxhbmRzY2FwZVwiLz5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cImNvcHlcIlxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuaJk+WNsOWkmuWwkeacrFwiXHJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17MX1cclxuXHRcdFx0XHRcdFx0dHlwZT1cIm51bWJlclwiLz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8R3JpZExpc3Q+XHJcblx0XHRcdFx0XHQ8U3ViaGVhZGVyPumAieaLqeWHuueJiOaooeadvzwvU3ViaGVhZGVyPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR7XCJsaWdodCxkYXJrLG1vZGVybixnaWZ0XCIuc3BsaXQoXCIsXCIpLm1hcChhPT4oXHJcblx0XHRcdFx0XHRcdDxHcmlkVGlsZSBrZXk9e2F9IHRpdGxlPXthfVxyXG5cdFx0XHRcdFx0XHRcdGFjdGlvbkljb249ezxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe3RlbXBsYXRlOmF9KX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHt0ZW1wbGF0ZT09YSA/IFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uU2VsZWN0ZWQgaG92ZXJDb2xvcj1cImJsdWVcIiBjb2xvcj1cInllbGxvd1wiLz4gOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uVW5TZWxlY3RlZCBob3ZlckNvbG9yPVwiYmx1ZVwiIGNvbG9yPVwid2hpdGVcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj59PlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtgaW1hZ2VzL3RlbXBsYXRlLyR7YX0uanBnYH0vPlxyXG5cdFx0XHRcdFx0XHQ8L0dyaWRUaWxlPlxyXG5cdFx0XHRcdFx0KSl9XHJcblx0XHRcdFx0PC9HcmlkTGlzdD5cclxuICAgICAgICAgICAgICAgIDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsIFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUHJldmlld1wiLCBsYWJlbDpcIumihOiniFwiLCBvblNlbGVjdDplPT50aGlzLnByZXZpZXcoKSwgaWNvbjpJY29uVmlld30sIFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUHJpbnRcIiwgbGFiZWw6XCLkupHmiZPljbBcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wcmludCgpLCBpY29uOkljb25QcmludH1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblx0XHJcblx0cHJldmlldygpe1xyXG5cdFx0TWVzc2FnZXIuc2hvdyhcInN0YXkgdHVuZVwiKVxyXG5cdH1cclxuXHRcclxuXHRwcmludCgpe1xyXG5cdFx0TWVzc2FnZXIuc2hvdyhcIlB1dCBpbnRvIHF1ZXVlLCBwbGVhc2UgcGF5IHdpdGhpbiAyNCBob3Vyc1wiKVxyXG5cdH1cclxufVxyXG4iXX0=