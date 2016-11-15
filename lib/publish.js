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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTzs7SUFHYzs7Ozs7Ozs7Ozs7Ozs7Z05BQ3BCLFFBQU0sRUFBQyxVQUFTLE9BQVQ7Ozs7OzJCQUVJOzs7T0FDSCxRQUFPLEtBQUssT0FBTCxDQUFQLE1BREc7T0FFSCxXQUFVLEtBQUssS0FBTCxDQUFWLFNBRkc7O0FBR0osVUFDSTs7O0lBQ1Isb0RBQVEsY0FBWSxNQUFNLElBQU4sa0JBQVo7QUFDUCx5QkFBb0IsS0FBcEIsRUFERCxDQURRO0lBR1I7OztLQUNDLHdEQUFZLEtBQUksT0FBSjtBQUNYLHlCQUFrQixJQUFsQjtBQUNBLGNBQVEsSUFBUixFQUFjLE1BQUssV0FBTCxFQUZmLENBREQ7S0FLQyx1REFBVyxLQUFJLE1BQUo7QUFDVix5QkFBa0IsT0FBbEI7QUFDQSxvQkFBYyxDQUFkO0FBQ0EsWUFBSyxRQUFMLEVBSEQsQ0FMRDtLQUhRO0lBYVI7OztLQUNDOzs7O01BREQ7S0FHRSx5QkFBeUIsS0FBekIsQ0FBK0IsR0FBL0IsRUFBb0MsR0FBcEMsQ0FBd0M7YUFDeEM7O1NBQVUsS0FBSyxDQUFMLEVBQVEsT0FBTyxDQUFQO0FBQ2pCLG9CQUFZOztXQUFZLFNBQVM7a0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxVQUFTLENBQVQsRUFBZjtXQUFILEVBQXJCO1NBQ1QsWUFBVSxDQUFWLEdBQ0EsZ0RBQWMsWUFBVyxNQUFYLEVBQWtCLE9BQU0sUUFBTixFQUFoQyxDQURBLEdBRUEsc0RBQWdCLFlBQVcsTUFBWCxFQUFrQixPQUFNLE9BQU4sRUFBbEMsQ0FGQTtTQURILEVBREQ7T0FPQyx1Q0FBSywwQkFBd0IsVUFBeEIsRUFBTCxDQVBEOztNQUR3QyxDQUgxQztLQWJRO0lBNEJJLDBDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVY7QUFDWCxZQUFPLENBQUMsTUFBRCxFQUNyQixFQUFDLFFBQU8sU0FBUCxFQUFrQixPQUFNLElBQU4sRUFBWSxVQUFTO2NBQUcsT0FBSyxPQUFMO09BQUgsRUFBbUIsTUFBSyx1REFBTCxFQUR0QyxFQUVyQixFQUFDLFFBQU8sT0FBUCxFQUFnQixPQUFNLEtBQU4sRUFBYSxVQUFTO2NBQUcsT0FBSyxLQUFMO09BQUgsRUFBaUIsTUFBSyxvREFBTCxFQUZuQyxDQUFQLEVBREosQ0E1Qko7SUFESixDQUhJOzs7OzRCQXlDRjtBQUNSLFlBQVMsSUFBVCxDQUFjLFdBQWQsRUFEUTs7OzswQkFJRjtBQUNOLFlBQVMsSUFBVCxDQUFjLDRDQUFkLEVBRE07Ozs7OztBQWhEYSxVQW9EYixlQUFhO0FBQ25CLFFBQU8saUJBQVUsTUFBVjs7a0JBckRZIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtUZXh0RmllbGQsIERhdGVQaWNrZXIsIEljb25CdXR0b24sIEdyaWRMaXN0LCBHcmlkVGlsZSwgU3ViaGVhZGVyLCBBcHBCYXIsIERpdmlkZXIsfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgSWNvblVuU2VsZWN0ZWQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3RvZ2dsZS9zdGFyLWJvcmRlcidcclxuaW1wb3J0IEljb25TZWxlY3RlZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvdG9nZ2xlL3N0YXInXHJcbmltcG9ydCBJY29uUHJpbnQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vcHJpbnRcIlxyXG5pbXBvcnQgSWNvblZpZXcgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vcGFnZXZpZXdcIlxyXG5cclxuaW1wb3J0IGRiUHVibGlzaCBmcm9tIFwiLi9kYi9wdWJsaXNoXCJcclxuXHJcbmNvbnN0IHtNZXNzYWdlcn09VUlcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e3RlbXBsYXRlOlwibGlnaHRcIn1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjaGlsZH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7dGVtcGxhdGV9PXRoaXMuc3RhdGVcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxkaXY+XHJcblx0XHRcdFx0PEFwcEJhciB0aXRsZT17YOWHuueJiCR7Y2hpbGQubmFtZX3nmoTmiJDplb/ljobnqIss55WZ5LiL5rC45LmF55qE5Zue5b+GYH1cclxuXHRcdFx0XHRcdHNob3dNZW51SWNvbkJ1dHRvbj17ZmFsc2V9Lz5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic2luY2VcIlxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuiHquS7jlwiXHJcblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0gbW9kZT1cImxhbmRzY2FwZVwiLz5cclxuXHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cImNvcHlcIlxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuaJk+WNsOWkmuWwkeacrFwiXHJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17MX1cclxuXHRcdFx0XHRcdFx0dHlwZT1cIm51bWJlclwiLz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8R3JpZExpc3Q+XHJcblx0XHRcdFx0XHQ8U3ViaGVhZGVyPumAieaLqeWHuueJiOaooeadvzwvU3ViaGVhZGVyPlxyXG5cclxuXHRcdFx0XHRcdHtcImxpZ2h0LGRhcmssbW9kZXJuLGdpZnRcIi5zcGxpdChcIixcIikubWFwKGE9PihcclxuXHRcdFx0XHRcdFx0PEdyaWRUaWxlIGtleT17YX0gdGl0bGU9e2F9XHJcblx0XHRcdFx0XHRcdFx0YWN0aW9uSWNvbj17PEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7dGVtcGxhdGU6YX0pfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e3RlbXBsYXRlPT1hID9cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvblNlbGVjdGVkIGhvdmVyQ29sb3I9XCJibHVlXCIgY29sb3I9XCJ5ZWxsb3dcIi8+IDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvblVuU2VsZWN0ZWQgaG92ZXJDb2xvcj1cImJsdWVcIiBjb2xvcj1cIndoaXRlXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+fT5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17YGltYWdlcy90ZW1wbGF0ZS8ke2F9LmpwZ2B9Lz5cclxuXHRcdFx0XHRcdFx0PC9HcmlkVGlsZT5cclxuXHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdDwvR3JpZExpc3Q+XHJcbiAgICAgICAgICAgICAgICA8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUHJldmlld1wiLCBsYWJlbDpcIumihOiniFwiLCBvblNlbGVjdDplPT50aGlzLnByZXZpZXcoKSwgaWNvbjo8SWNvblZpZXcvPn0sXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJQcmludFwiLCBsYWJlbDpcIuS6keaJk+WNsFwiLCBvblNlbGVjdDplPT50aGlzLnByaW50KCksIGljb246PEljb25QcmludC8+fVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblx0cHJldmlldygpe1xyXG5cdFx0TWVzc2FnZXIuc2hvdyhcInN0YXkgdHVuZVwiKVxyXG5cdH1cclxuXHJcblx0cHJpbnQoKXtcclxuXHRcdE1lc3NhZ2VyLnNob3coXCJQdXQgaW50byBxdWV1ZSwgcGxlYXNlIHBheSB3aXRoaW4gMjQgaG91cnNcIilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0Y2hpbGQ6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuIl19