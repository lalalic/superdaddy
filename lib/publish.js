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
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Publisher);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Publisher.__proto__ || Object.getPrototypeOf(Publisher)).call.apply(_ref, [this].concat(args))), _this), _this.state = { template: "light" }, _temp), _possibleConstructorReturn(_this, _ret);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2VyIiwiUHVibGlzaGVyIiwic3RhdGUiLCJ0ZW1wbGF0ZSIsImNoaWxkIiwiY29udGV4dCIsIm5hbWUiLCJzcGxpdCIsIm1hcCIsImEiLCJzZXRTdGF0ZSIsImFjdGlvbiIsImxhYmVsIiwib25TZWxlY3QiLCJwcmV2aWV3IiwiaWNvbiIsInByaW50Iiwic2hvdyIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVPQSxRLGVBQUFBLFE7O0lBR2NDLFM7Ozs7Ozs7Ozs7Ozs7OzBMQUNwQkMsSyxHQUFNLEVBQUNDLFVBQVMsT0FBVixFOzs7OzsyQkFFSztBQUFBOztBQUFBLE9BQ0hDLEtBREcsR0FDSSxLQUFLQyxPQURULENBQ0hELEtBREc7QUFBQSxPQUVIRCxRQUZHLEdBRU8sS0FBS0QsS0FGWixDQUVIQyxRQUZHOztBQUdKLFVBQ0k7QUFBQTtBQUFBO0FBQ1Isd0RBQVEsd0JBQVlDLE1BQU1FLElBQWxCLDhFQUFSO0FBQ0MseUJBQW9CLEtBRHJCLEdBRFE7QUFHUjtBQUFBO0FBQUE7QUFDQyw2REFBWSxLQUFJLE9BQWhCO0FBQ0MseUJBQWtCLGNBRG5CO0FBRUMsY0FBUSxJQUZULEVBRWUsTUFBSyxXQUZwQixHQUREO0FBS0MsNERBQVcsS0FBSSxNQUFmO0FBQ0MseUJBQWtCLGdDQURuQjtBQUVDLG9CQUFjLENBRmY7QUFHQyxZQUFLLFFBSE47QUFMRCxLQUhRO0FBYVI7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUREO0FBR0UsOEJBQXlCQyxLQUF6QixDQUErQixHQUEvQixFQUFvQ0MsR0FBcEMsQ0FBd0M7QUFBQSxhQUN4QztBQUFBO0FBQUEsU0FBVSxLQUFLQyxDQUFmLEVBQWtCLE9BQU9BLENBQXpCO0FBQ0Msb0JBQVk7QUFBQTtBQUFBLFdBQVksU0FBUztBQUFBLGtCQUFHLE9BQUtDLFFBQUwsQ0FBYyxFQUFDUCxVQUFTTSxDQUFWLEVBQWQsQ0FBSDtBQUFBLFdBQXJCO0FBQ1ROLHFCQUFVTSxDQUFWLEdBQ0EsZ0RBQWMsWUFBVyxNQUF6QixFQUFnQyxPQUFNLFFBQXRDLEdBREEsR0FFQSxzREFBZ0IsWUFBVyxNQUEzQixFQUFrQyxPQUFNLE9BQXhDO0FBSFMsU0FEYjtBQU9DLDhDQUFLLDBCQUF3QkEsQ0FBeEIsU0FBTDtBQVBELE9BRHdDO0FBQUEsTUFBeEM7QUFIRixLQWJRO0FBNEJJLDhDQUFJLFVBQUosSUFBZSxXQUFVLFNBQXpCO0FBQ0ksWUFBTyxDQUFDLE1BQUQsRUFDckIsRUFBQ0UsUUFBTyxTQUFSLEVBQW1CQyxPQUFNLElBQXpCLEVBQStCQyxVQUFTO0FBQUEsY0FBRyxPQUFLQyxPQUFMLEVBQUg7QUFBQSxPQUF4QyxFQUEyREMsTUFBSyx1REFBaEUsRUFEcUIsRUFFckIsRUFBQ0osUUFBTyxPQUFSLEVBQWlCQyxPQUFNLEtBQXZCLEVBQThCQyxVQUFTO0FBQUEsY0FBRyxPQUFLRyxLQUFMLEVBQUg7QUFBQSxPQUF2QyxFQUF3REQsTUFBSyxvREFBN0QsRUFGcUIsQ0FEWDtBQTVCSixJQURKO0FBb0NIOzs7NEJBRUs7QUFDUmYsWUFBU2lCLElBQVQsQ0FBYyxXQUFkO0FBQ0E7OzswQkFFTTtBQUNOakIsWUFBU2lCLElBQVQsQ0FBYyw0Q0FBZDtBQUNBOzs7Ozs7QUFsRG1CaEIsUyxDQW9EYmlCLFksR0FBYTtBQUNuQmQsUUFBTyxpQkFBVWU7QUFERSxDO2tCQXBEQWxCLFMiLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge1RleHRGaWVsZCwgRGF0ZVBpY2tlciwgSWNvbkJ1dHRvbiwgR3JpZExpc3QsIEdyaWRUaWxlLCBTdWJoZWFkZXIsIEFwcEJhciwgRGl2aWRlcix9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBJY29uVW5TZWxlY3RlZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvdG9nZ2xlL3N0YXItYm9yZGVyJ1xyXG5pbXBvcnQgSWNvblNlbGVjdGVkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3RhcidcclxuaW1wb3J0IEljb25QcmludCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9wcmludFwiXHJcbmltcG9ydCBJY29uVmlldyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9wYWdldmlld1wiXHJcblxyXG5pbXBvcnQgZGJQdWJsaXNoIGZyb20gXCIuL2RiL3B1Ymxpc2hcIlxyXG5cclxuY29uc3Qge01lc3NhZ2VyfT1VSVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2hlciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17dGVtcGxhdGU6XCJsaWdodFwifVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NoaWxkfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHt0ZW1wbGF0ZX09dGhpcy5zdGF0ZVxyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPGRpdj5cclxuXHRcdFx0XHQ8QXBwQmFyIHRpdGxlPXtg5Ye654mIJHtjaGlsZC5uYW1lfeeahOaIkOmVv+WOhueoiyznlZnkuIvmsLjkuYXnmoTlm57lv4ZgfVxyXG5cdFx0XHRcdFx0c2hvd01lbnVJY29uQnV0dG9uPXtmYWxzZX0vPlxyXG5cdFx0XHRcdDxjZW50ZXI+XHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzaW5jZVwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi6Ieq5LuOXCJcclxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfSBtb2RlPVwibGFuZHNjYXBlXCIvPlxyXG5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwiY29weVwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5omT5Y2w5aSa5bCR5pysXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXsxfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCIvPlxyXG5cdFx0XHRcdDwvY2VudGVyPlxyXG5cdFx0XHRcdDxHcmlkTGlzdD5cclxuXHRcdFx0XHRcdDxTdWJoZWFkZXI+6YCJ5oup5Ye654mI5qih5p2/PC9TdWJoZWFkZXI+XHJcblxyXG5cdFx0XHRcdFx0e1wibGlnaHQsZGFyayxtb2Rlcm4sZ2lmdFwiLnNwbGl0KFwiLFwiKS5tYXAoYT0+KFxyXG5cdFx0XHRcdFx0XHQ8R3JpZFRpbGUga2V5PXthfSB0aXRsZT17YX1cclxuXHRcdFx0XHRcdFx0XHRhY3Rpb25JY29uPXs8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHt0ZW1wbGF0ZTphfSl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7dGVtcGxhdGU9PWEgP1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uU2VsZWN0ZWQgaG92ZXJDb2xvcj1cImJsdWVcIiBjb2xvcj1cInllbGxvd1wiLz4gOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uVW5TZWxlY3RlZCBob3ZlckNvbG9yPVwiYmx1ZVwiIGNvbG9yPVwid2hpdGVcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj59PlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtgaW1hZ2VzL3RlbXBsYXRlLyR7YX0uanBnYH0vPlxyXG5cdFx0XHRcdFx0XHQ8L0dyaWRUaWxlPlxyXG5cdFx0XHRcdFx0KSl9XHJcblx0XHRcdFx0PC9HcmlkTGlzdD5cclxuICAgICAgICAgICAgICAgIDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJQcmV2aWV3XCIsIGxhYmVsOlwi6aKE6KeIXCIsIG9uU2VsZWN0OmU9PnRoaXMucHJldmlldygpLCBpY29uOjxJY29uVmlldy8+fSxcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIlByaW50XCIsIGxhYmVsOlwi5LqR5omT5Y2wXCIsIG9uU2VsZWN0OmU9PnRoaXMucHJpbnQoKSwgaWNvbjo8SWNvblByaW50Lz59XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHRwcmV2aWV3KCl7XHJcblx0XHRNZXNzYWdlci5zaG93KFwic3RheSB0dW5lXCIpXHJcblx0fVxyXG5cclxuXHRwcmludCgpe1xyXG5cdFx0TWVzc2FnZXIuc2hvdyhcIlB1dCBpbnRvIHF1ZXVlLCBwbGVhc2UgcGF5IHdpdGhpbiAyNCBob3Vyc1wiKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG4iXX0=