"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KnowledgeComment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _comment = require("qili-app/lib/components/comment");

var _comment2 = _interopRequireDefault(_comment);

var _materialUi = require("material-ui");

var _wechat4u = require("wechat4u");

var _wechat4u2 = _interopRequireDefault(_wechat4u);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KnowledgeComment = exports.KnowledgeComment = function (_Component) {
	_inherits(KnowledgeComment, _Component);

	function KnowledgeComment() {
		_classCallCheck(this, KnowledgeComment);

		var _this = _possibleConstructorReturn(this, (KnowledgeComment.__proto__ || Object.getPrototypeOf(KnowledgeComment)).call(this));

		_this.state = { connected: false };

		_this.bot = new _wechat4u2.default();
		_this.bot.on("uuid", function (uuid) {
			return _this.setState({ uuid: uuid });
		});
		_this.bot.on("user-avatar", function (avatar) {
			return _this.setState({ avatar: avatar });
		});
		_this.bot.on("login", function (a) {
			return _this.setState({ connected: true });
		});
		_this.bot.on("logout", function (a) {
			return _this.setState({ connected: false, uuid: undefind, avatar: undefined });
		});
		_this.bot.on("error", function (err) {
			return _this.setState({ err: err });
		});
		return _this;
	}

	_createClass(KnowledgeComment, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    connected = _state.connected,
			    avatar = _state.avatar,
			    uuid = _state.uuid,
			    err = _state.err;

			var label = null,
			    code = void 0;
			if (connected) {
				if (avatar) label = _react2.default.createElement(_materialUi.Avatar, { src: avatar });else label = _react2.default.createElement(_materialUi.FlatButton, { label: "\u65AD\u5F00\u5FAE\u4FE1" });
			} else {
				if (uuid) code = _react2.default.createElement(
					Dialog,
					{ open: true },
					_react2.default.createElement("img", { src: "https://login.weixin.qq.com/l/" + uuid })
				);else label = _react2.default.createElement(_materialUi.FlatButton, { label: "\u8FDE\u63A5\u5FAE\u4FE1", onClick: function onClick(e) {
						return _this2.bot.start();
					} });
			}
			return _react2.default.createElement(
				"div",
				null,
				code,
				_react2.default.createElement(_materialUi.AppBar, { iconElementRight: label, title: _react2.default.createElement(
						"span",
						null,
						err || "微信群"
					) }),
				_react2.default.createElement(_comment2.default, this.props)
			);
		}
	}]);

	return KnowledgeComment;
}(_react.Component);

KnowledgeComment.contextTypes = {};
exports.default = KnowledgeComment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvY29tbWVudC5qcyJdLCJuYW1lcyI6WyJLbm93bGVkZ2VDb21tZW50Iiwic3RhdGUiLCJjb25uZWN0ZWQiLCJib3QiLCJvbiIsInNldFN0YXRlIiwidXVpZCIsImF2YXRhciIsInVuZGVmaW5kIiwidW5kZWZpbmVkIiwiZXJyIiwibGFiZWwiLCJjb2RlIiwic3RhcnQiLCJwcm9wcyIsImNvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFFYUEsZ0IsV0FBQUEsZ0I7OztBQUVaLDZCQUFhO0FBQUE7O0FBQUE7O0FBQUEsUUFEYkMsS0FDYSxHQURQLEVBQUNDLFdBQVUsS0FBWCxFQUNPOztBQUVaLFFBQUtDLEdBQUwsR0FBUyx3QkFBVDtBQUNBLFFBQUtBLEdBQUwsQ0FBU0MsRUFBVCxDQUFZLE1BQVosRUFBbUI7QUFBQSxVQUFNLE1BQUtDLFFBQUwsQ0FBYyxFQUFDQyxVQUFELEVBQWQsQ0FBTjtBQUFBLEdBQW5CO0FBQ0EsUUFBS0gsR0FBTCxDQUFTQyxFQUFULENBQVksYUFBWixFQUEyQjtBQUFBLFVBQVEsTUFBS0MsUUFBTCxDQUFjLEVBQUNFLGNBQUQsRUFBZCxDQUFSO0FBQUEsR0FBM0I7QUFDQSxRQUFLSixHQUFMLENBQVNDLEVBQVQsQ0FBWSxPQUFaLEVBQW9CO0FBQUEsVUFBRyxNQUFLQyxRQUFMLENBQWMsRUFBQ0gsV0FBVSxJQUFYLEVBQWQsQ0FBSDtBQUFBLEdBQXBCO0FBQ0EsUUFBS0MsR0FBTCxDQUFTQyxFQUFULENBQVksUUFBWixFQUFxQjtBQUFBLFVBQUcsTUFBS0MsUUFBTCxDQUFjLEVBQUNILFdBQVUsS0FBWCxFQUFpQkksTUFBS0UsUUFBdEIsRUFBZ0NELFFBQU9FLFNBQXZDLEVBQWQsQ0FBSDtBQUFBLEdBQXJCO0FBQ0EsUUFBS04sR0FBTCxDQUFTQyxFQUFULENBQVksT0FBWixFQUFvQjtBQUFBLFVBQUssTUFBS0MsUUFBTCxDQUFjLEVBQUNLLFFBQUQsRUFBZCxDQUFMO0FBQUEsR0FBcEI7QUFQWTtBQVFaOzs7OzJCQUNPO0FBQUE7O0FBQUEsZ0JBQzJCLEtBQUtULEtBRGhDO0FBQUEsT0FDQUMsU0FEQSxVQUNBQSxTQURBO0FBQUEsT0FDVUssTUFEVixVQUNVQSxNQURWO0FBQUEsT0FDaUJELElBRGpCLFVBQ2lCQSxJQURqQjtBQUFBLE9BQ3NCSSxHQUR0QixVQUNzQkEsR0FEdEI7O0FBRVAsT0FBSUMsUUFBTSxJQUFWO0FBQUEsT0FBZ0JDLGFBQWhCO0FBQ0EsT0FBR1YsU0FBSCxFQUFhO0FBQ1osUUFBR0ssTUFBSCxFQUNDSSxRQUFNLG9EQUFRLEtBQUtKLE1BQWIsR0FBTixDQURELEtBR0NJLFFBQU0sd0RBQVksT0FBTSwwQkFBbEIsR0FBTjtBQUNELElBTEQsTUFLSztBQUNKLFFBQUdMLElBQUgsRUFDQ00sT0FBSztBQUFDLFdBQUQ7QUFBQSxPQUFRLE1BQU0sSUFBZDtBQUFvQiw0Q0FBSyx3Q0FBc0NOLElBQTNDO0FBQXBCLEtBQUwsQ0FERCxLQUdDSyxRQUFNLHdEQUFZLE9BQU0sMEJBQWxCLEVBQXlCLFNBQVM7QUFBQSxhQUFHLE9BQUtSLEdBQUwsQ0FBU1UsS0FBVCxFQUFIO0FBQUEsTUFBbEMsR0FBTjtBQUNEO0FBQ0QsVUFDQztBQUFBO0FBQUE7QUFDRUQsUUFERjtBQUVDLHdEQUFRLGtCQUFrQkQsS0FBMUIsRUFBaUMsT0FBTztBQUFBO0FBQUE7QUFBT0QsYUFBSztBQUFaLE1BQXhDLEdBRkQ7QUFHQyxxREFBYSxLQUFLSSxLQUFsQjtBQUhELElBREQ7QUFPQTs7Ozs7O0FBaENXZCxnQixDQWtDTGUsWSxHQUFhLEU7a0JBS05mLGdCIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBDb21tZW50IGZyb20gXCJxaWxpLWFwcC9saWIvY29tcG9uZW50cy9jb21tZW50XCJcblxuaW1wb3J0IHtBcHBCYXIsIEZsYXRCdXR0b24sIEF2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuaW1wb3J0IFdlY2hhdCBmcm9tIFwid2VjaGF0NHVcIlxuXG5leHBvcnQgY2xhc3MgS25vd2xlZGdlQ29tbWVudCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e2Nvbm5lY3RlZDpmYWxzZX1cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpIFxuXHRcdHRoaXMuYm90PW5ldyBXZWNoYXQoKVxuXHRcdHRoaXMuYm90Lm9uKFwidXVpZFwiLHV1aWQ9PnRoaXMuc2V0U3RhdGUoe3V1aWR9KSlcblx0XHR0aGlzLmJvdC5vbihcInVzZXItYXZhdGFyXCIsIGF2YXRhcj0+dGhpcy5zZXRTdGF0ZSh7YXZhdGFyfSkpXG5cdFx0dGhpcy5ib3Qub24oXCJsb2dpblwiLGE9PnRoaXMuc2V0U3RhdGUoe2Nvbm5lY3RlZDp0cnVlfSkpXG5cdFx0dGhpcy5ib3Qub24oXCJsb2dvdXRcIixhPT50aGlzLnNldFN0YXRlKHtjb25uZWN0ZWQ6ZmFsc2UsdXVpZDp1bmRlZmluZCwgYXZhdGFyOnVuZGVmaW5lZH0pKVxuXHRcdHRoaXMuYm90Lm9uKFwiZXJyb3JcIixlcnI9PnRoaXMuc2V0U3RhdGUoe2Vycn0pKVxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb25uZWN0ZWQsYXZhdGFyLHV1aWQsZXJyfT10aGlzLnN0YXRlXG5cdFx0bGV0IGxhYmVsPW51bGwsIGNvZGVcblx0XHRpZihjb25uZWN0ZWQpe1xuXHRcdFx0aWYoYXZhdGFyKVxuXHRcdFx0XHRsYWJlbD08QXZhdGFyIHNyYz17YXZhdGFyfS8+XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGxhYmVsPTxGbGF0QnV0dG9uIGxhYmVsPVwi5pat5byA5b6u5L+hXCIvPlxuXHRcdH1lbHNle1xuXHRcdFx0aWYodXVpZClcblx0XHRcdFx0Y29kZT08RGlhbG9nIG9wZW49e3RydWV9PjxpbWcgc3JjPXtgaHR0cHM6Ly9sb2dpbi53ZWl4aW4ucXEuY29tL2wvJHt1dWlkfWB9Lz48L0RpYWxvZz47XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGxhYmVsPTxGbGF0QnV0dG9uIGxhYmVsPVwi6L+e5o6l5b6u5L+hXCIgb25DbGljaz17ZT0+dGhpcy5ib3Quc3RhcnQoKX0vPlxuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e2NvZGV9XG5cdFx0XHRcdDxBcHBCYXIgaWNvbkVsZW1lbnRSaWdodD17bGFiZWx9IHRpdGxlPXs8c3Bhbj57ZXJyfHxcIuW+ruS/oee+pFwifTwvc3Bhbj59IC8+XG5cdFx0XHRcdDxDb21tZW50IHsuLi50aGlzLnByb3BzfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtub3dsZWRnZUNvbW1lbnQiXX0=