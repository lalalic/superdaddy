"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TaskPadEditor = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _colors = require("material-ui/styles/colors");

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _arrowUpward = require("material-ui/svg-icons/navigation/arrow-upward");

var _arrowUpward2 = _interopRequireDefault(_arrowUpward);

var _arrowDownward = require("material-ui/svg-icons/navigation/arrow-downward");

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _verticalAlignTop = require("material-ui/svg-icons/editor/vertical-align-top");

var _verticalAlignTop2 = _interopRequireDefault(_verticalAlignTop);

var _verticalAlignBottom = require("material-ui/svg-icons/editor/vertical-align-bottom");

var _verticalAlignBottom2 = _interopRequireDefault(_verticalAlignBottom);

var _visibility = require("material-ui/svg-icons/action/visibility");

var _visibility2 = _interopRequireDefault(_visibility);

var _visibilityOff = require("material-ui/svg-icons/action/visibility-off");

var _visibilityOff2 = _interopRequireDefault(_visibilityOff);

var _alarmOff = require("material-ui/svg-icons/action/alarm-off");

var _alarmOff2 = _interopRequireDefault(_alarmOff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TaskPadEditor = exports.TaskPadEditor = function TaskPadEditor(_ref) {
	var _ref$todos = _ref.todos,
	    todos = _ref$todos === undefined ? [] : _ref$todos;
	return _react2.default.createElement(
		_materialUi.List,
		null,
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u4EFB\u52A1" }),
		_react2.default.createElement(_materialUi.Divider, null),
		todos.map(function (_ref2, i) {
			var task = _ref2.content,
			    hidden = _ref2.hidden;
			return _react2.default.createElement(_materialUi.ListItem, { key: i, primaryText: task,
				rightIconButton: _react2.default.createElement(
					Wrapper,
					null,
					_react2.default.createElement(Remover, { i: i }),
					_react2.default.createElement(Visibility, { i: i, visible: !hidden }),
					_react2.default.createElement(Order, { i: i })
				)
			});
		}).reduce(function (state, a, i) {
			state.push(a);
			state.push(_react2.default.createElement(_materialUi.Divider, { key: "_" + i }));
			return state;
		}, [])
	);
};

var Order = function Order(_ref3, _ref4) {
	var i = _ref3.i;
	var ACTION = _ref4.ACTION,
	    dispatch = _ref4.dispatch;
	return _react2.default.createElement(
		Wrapper,
		null,
		_react2.default.createElement(
			_reactResponsive2.default,
			{ minWidth: 960 },
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(ACTION.TOP(i));
					} },
				_react2.default.createElement(_verticalAlignTop2.default, { color: _colors.lightBlue100 })
			)
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(ACTION.UP(i));
				} },
			_react2.default.createElement(_arrowUpward2.default, { color: _colors.lightBlue100 })
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(ACTION.DOWN(i));
				} },
			_react2.default.createElement(_arrowDownward2.default, { color: _colors.lightBlue100 })
		),
		_react2.default.createElement(
			_reactResponsive2.default,
			{ minWidth: 960 },
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(ACTION.BOTTOM(i));
					} },
				_react2.default.createElement(_verticalAlignBottom2.default, { color: _colors.lightBlue100 })
			)
		)
	);
};

Order.contextTypes = {
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};

var Visibility = function Visibility(_ref5, _ref6) {
	var i = _ref5.i,
	    visible = _ref5.visible,
	    _ref5$Icon = _ref5.Icon,
	    Icon = _ref5$Icon === undefined ? !visible ? _visibilityOff2.default : _visibility2.default : _ref5$Icon,
	    style = _ref5.style;
	var ACTION = _ref6.ACTION,
	    dispatch = _ref6.dispatch;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(ACTION.TOGGLE_VISIBLE(i));
			}, style: style },
		_react2.default.createElement(Icon, { color: _colors.lightBlue100 })
	);
};

Visibility.contextTypes = {
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};

var Remover = function Remover(_ref7, _ref8) {
	var i = _ref7.i,
	    style = _ref7.style;
	var ACTION = _ref8.ACTION,
	    dispatch = _ref8.dispatch;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(ACTION.REMOVE_BY_INDEX(i));
			}, style: style },
		_react2.default.createElement(_alarmOff2.default, { color: _colors.lightBlue100 })
	);
};

Remover.contextTypes = {
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};

var Wrapper = function Wrapper(_ref9) {
	var onKeyboardFocus = _ref9.onKeyboardFocus,
	    others = _objectWithoutProperties(_ref9, ["onKeyboardFocus"]);

	return _react2.default.createElement("span", others);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3Rhc2stcGFkLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJUYXNrUGFkRWRpdG9yIiwidG9kb3MiLCJtYXAiLCJpIiwidGFzayIsImNvbnRlbnQiLCJoaWRkZW4iLCJyZWR1Y2UiLCJzdGF0ZSIsImEiLCJwdXNoIiwiT3JkZXIiLCJBQ1RJT04iLCJkaXNwYXRjaCIsIlRPUCIsIlVQIiwiRE9XTiIsIkJPVFRPTSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJWaXNpYmlsaXR5IiwidmlzaWJsZSIsIkljb24iLCJzdHlsZSIsIlRPR0dMRV9WSVNJQkxFIiwiUmVtb3ZlciIsIlJFTU9WRV9CWV9JTkRFWCIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7QUFFTyxJQUFNQSx3Q0FBZSxTQUFmQSxhQUFlO0FBQUEsdUJBQUVDLEtBQUY7QUFBQSxLQUFFQSxLQUFGLDhCQUFRLEVBQVI7QUFBQSxRQUMzQjtBQUFBO0FBQUE7QUFDQyx3REFBVSxhQUFZLGNBQXRCLEdBREQ7QUFFQywwREFGRDtBQUlBQSxRQUFNQyxHQUFOLENBQVUsaUJBQXdCQyxDQUF4QjtBQUFBLE9BQVVDLElBQVYsU0FBRUMsT0FBRjtBQUFBLE9BQWdCQyxNQUFoQixTQUFnQkEsTUFBaEI7QUFBQSxVQUNULHNEQUFVLEtBQUtILENBQWYsRUFBa0IsYUFBYUMsSUFBL0I7QUFDQyxxQkFDQztBQUFDLFlBQUQ7QUFBQTtBQUNDLG1DQUFDLE9BQUQsSUFBUyxHQUFHRCxDQUFaLEdBREQ7QUFFQyxtQ0FBQyxVQUFELElBQVksR0FBR0EsQ0FBZixFQUFrQixTQUFTLENBQUNHLE1BQTVCLEdBRkQ7QUFHQyxtQ0FBQyxLQUFELElBQVEsR0FBR0gsQ0FBWDtBQUhEO0FBRkYsS0FEUztBQUFBLEdBQVYsRUFVR0ksTUFWSCxDQVVVLFVBQUNDLEtBQUQsRUFBT0MsQ0FBUCxFQUFTTixDQUFULEVBQWE7QUFDckJLLFNBQU1FLElBQU4sQ0FBV0QsQ0FBWDtBQUNBRCxTQUFNRSxJQUFOLENBQVcscURBQVMsV0FBU1AsQ0FBbEIsR0FBWDtBQUNBLFVBQU9LLEtBQVA7QUFDQSxHQWRGLEVBY0csRUFkSDtBQUpBLEVBRDJCO0FBQUEsQ0FBckI7O0FBd0JQLElBQU1HLFFBQU0sU0FBTkEsS0FBTTtBQUFBLEtBQUVSLENBQUYsU0FBRUEsQ0FBRjtBQUFBLEtBQU1TLE1BQU4sU0FBTUEsTUFBTjtBQUFBLEtBQWFDLFFBQWIsU0FBYUEsUUFBYjtBQUFBLFFBQ1g7QUFBQyxTQUFEO0FBQUE7QUFDQztBQUFBO0FBQUEsS0FBWSxVQUFVLEdBQXRCO0FBQ1U7QUFBQTtBQUFBLE1BQVksU0FBUztBQUFBLGFBQUdBLFNBQVNELE9BQU9FLEdBQVAsQ0FBV1gsQ0FBWCxDQUFULENBQUg7QUFBQSxNQUFyQjtBQUNJLGdFQUFTLDJCQUFUO0FBREo7QUFEVixHQUREO0FBTUM7QUFBQTtBQUFBLEtBQVksU0FBUztBQUFBLFlBQUdVLFNBQVNELE9BQU9HLEVBQVAsQ0FBVVosQ0FBVixDQUFULENBQUg7QUFBQSxLQUFyQjtBQUNVLDBEQUFRLDJCQUFSO0FBRFYsR0FORDtBQVNDO0FBQUE7QUFBQSxLQUFZLFNBQVM7QUFBQSxZQUFHVSxTQUFTRCxPQUFPSSxJQUFQLENBQVliLENBQVosQ0FBVCxDQUFIO0FBQUEsS0FBckI7QUFDVSw0REFBVSwyQkFBVjtBQURWLEdBVEQ7QUFZTztBQUFBO0FBQUEsS0FBWSxVQUFVLEdBQXRCO0FBQ0E7QUFBQTtBQUFBLE1BQVksU0FBUztBQUFBLGFBQUdVLFNBQVNELE9BQU9LLE1BQVAsQ0FBY2QsQ0FBZCxDQUFULENBQUg7QUFBQSxNQUFyQjtBQUNRLG1FQUFZLDJCQUFaO0FBRFI7QUFEQTtBQVpQLEVBRFc7QUFBQSxDQUFaOztBQXFCQVEsTUFBTU8sWUFBTixHQUFtQjtBQUNsQk4sU0FBUSxpQkFBVU8sTUFEQTtBQUVsQk4sV0FBVSxpQkFBVU87QUFGRixDQUFuQjs7QUFLQSxJQUFNQyxhQUFXLFNBQVhBLFVBQVc7QUFBQSxLQUFFbEIsQ0FBRixTQUFFQSxDQUFGO0FBQUEsS0FBSW1CLE9BQUosU0FBSUEsT0FBSjtBQUFBLHdCQUFZQyxJQUFaO0FBQUEsS0FBWUEsSUFBWiw4QkFBa0IsQ0FBQ0QsT0FBRCxpREFBbEI7QUFBQSxLQUF1REUsS0FBdkQsU0FBdURBLEtBQXZEO0FBQUEsS0FBK0RaLE1BQS9ELFNBQStEQSxNQUEvRDtBQUFBLEtBQXNFQyxRQUF0RSxTQUFzRUEsUUFBdEU7QUFBQSxRQUNoQjtBQUFBO0FBQUEsSUFBWSxTQUFTO0FBQUEsV0FBR0EsU0FBU0QsT0FBT2EsY0FBUCxDQUFzQnRCLENBQXRCLENBQVQsQ0FBSDtBQUFBLElBQXJCLEVBQTRELE9BQU9xQixLQUFuRTtBQUNDLGdDQUFDLElBQUQsSUFBTSwyQkFBTjtBQURELEVBRGdCO0FBQUEsQ0FBakI7O0FBTUFILFdBQVdILFlBQVgsR0FBd0I7QUFDdkJOLFNBQVEsaUJBQVVPLE1BREs7QUFFdkJOLFdBQVUsaUJBQVVPO0FBRkcsQ0FBeEI7O0FBS0EsSUFBTU0sVUFBUSxTQUFSQSxPQUFRO0FBQUEsS0FBRXZCLENBQUYsU0FBRUEsQ0FBRjtBQUFBLEtBQUlxQixLQUFKLFNBQUlBLEtBQUo7QUFBQSxLQUFZWixNQUFaLFNBQVlBLE1BQVo7QUFBQSxLQUFtQkMsUUFBbkIsU0FBbUJBLFFBQW5CO0FBQUEsUUFDYjtBQUFBO0FBQUEsSUFBWSxTQUFTO0FBQUEsV0FBR0EsU0FBU0QsT0FBT2UsZUFBUCxDQUF1QnhCLENBQXZCLENBQVQsQ0FBSDtBQUFBLElBQXJCLEVBQTZELE9BQU9xQixLQUFwRTtBQUNDLHNEQUFZLDJCQUFaO0FBREQsRUFEYTtBQUFBLENBQWQ7O0FBTUFFLFFBQVFSLFlBQVIsR0FBcUI7QUFDcEJOLFNBQVEsaUJBQVVPLE1BREU7QUFFcEJOLFdBQVUsaUJBQVVPO0FBRkEsQ0FBckI7O0FBS0EsSUFBTVEsVUFBUSxTQUFSQSxPQUFRO0FBQUEsS0FBRUMsZUFBRixTQUFFQSxlQUFGO0FBQUEsS0FBcUJDLE1BQXJCOztBQUFBLFFBQWdDLHNDQUFVQSxNQUFWLENBQWhDO0FBQUEsQ0FBZCIsImZpbGUiOiJ0YXNrLXBhZC1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7TGlzdCxMaXN0SXRlbSwgU3ViaGVhZGVyLERpdmlkZXIsVGFiLCBJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxuXG5pbXBvcnQge2xpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEfSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXG5cbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5pbXBvcnQgSWNvblVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy11cHdhcmRcIlxuaW1wb3J0IEljb25Eb3duIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1kb3dud2FyZFwiXG5pbXBvcnQgSWNvblRvcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi10b3BcIlxuaW1wb3J0IEljb25Cb3R0b20gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvdmVydGljYWwtYWxpZ24tYm90dG9tXCJcblxuaW1wb3J0IEljb25WaXNpYmxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3Zpc2liaWxpdHlcIlxuaW1wb3J0IEljb25IaWRkZW4gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdmlzaWJpbGl0eS1vZmZcIlxuXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxuXG5leHBvcnQgY29uc3QgVGFza1BhZEVkaXRvcj0oKHt0b2Rvcz1bXX0pPT4oXG5cdDxMaXN0PlxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuS7u+WKoVwiLz5cblx0XHQ8RGl2aWRlci8+XG5cdHtcblx0dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBoaWRkZW59LGkpPT4oXG5cdFx0PExpc3RJdGVtIGtleT17aX0gcHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHQ8UmVtb3ZlciBpPXtpfS8+XG5cdFx0XHRcdFx0PFZpc2liaWxpdHkgaT17aX0gdmlzaWJsZT17IWhpZGRlbn0vPlxuXHRcdFx0XHRcdDxPcmRlciAgaT17aX0vPlxuXHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHR9XG5cdFx0Lz5cblx0KSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XG5cdFx0XHRzdGF0ZS5wdXNoKGEpXG5cdFx0XHRzdGF0ZS5wdXNoKDxEaXZpZGVyIGtleT17YF8ke2l9YH0vPilcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0sW10pXG5cdH1cblx0PC9MaXN0PlxuKSlcblxuY29uc3QgT3JkZXI9KHtpfSx7QUNUSU9OLGRpc3BhdGNofSk9Pihcblx0PFdyYXBwZXI+XG5cdFx0PE1lZGlhUXVlcnkgbWluV2lkdGg9ezk2MH0+XG4gICAgICAgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9QKGkpKX0+XG4gICAgICAgICAgICAgICAgPEljb25Ub3AgY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cbiAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgICAgPC9NZWRpYVF1ZXJ5PlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5VUChpKSl9PlxuICAgICAgICAgICAgPEljb25VcCBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuICAgICAgICA8L0ljb25CdXR0b24+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPV04oaSkpfT5cbiAgICAgICAgICAgIDxJY29uRG93biBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgIDxNZWRpYVF1ZXJ5IG1pbldpZHRoPXs5NjB9PlxuXHRcdCAgICAgIDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5CT1RUT00oaSkpfT5cbiAgICAgICAgICAgICAgICA8SWNvbkJvdHRvbSBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICA8L01lZGlhUXVlcnk+XG5cdDwvV3JhcHBlcj5cbilcblxuT3JkZXIuY29udGV4dFR5cGVzPXtcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmNcbn1cblxuY29uc3QgVmlzaWJpbGl0eT0oe2ksdmlzaWJsZSxJY29uPSghdmlzaWJsZSA/IEljb25IaWRkZW4gOiBJY29uVmlzaWJsZSksc3R5bGV9LHtBQ1RJT04sZGlzcGF0Y2h9KT0+KFxuXHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9HR0xFX1ZJU0lCTEUoaSkpfSBzdHlsZT17c3R5bGV9PlxuXHRcdDxJY29uIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG5cdDwvSWNvbkJ1dHRvbj5cbilcblxuVmlzaWJpbGl0eS5jb250ZXh0VHlwZXM9e1xuXHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXG5cdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xufVxuXG5jb25zdCBSZW1vdmVyPSh7aSxzdHlsZX0se0FDVElPTixkaXNwYXRjaH0pPT4oXG5cdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkVfQllfSU5ERVgoaSkpfSBzdHlsZT17c3R5bGV9PlxuXHRcdDxJY29uUmVtb3ZlIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG5cdDwvSWNvbkJ1dHRvbj5cbilcblxuUmVtb3Zlci5jb250ZXh0VHlwZXM9e1xuXHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXG5cdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xufVxuXG5jb25zdCBXcmFwcGVyPSh7b25LZXlib2FyZEZvY3VzLC4uLm90aGVyc30pPT4oPHNwYW4gey4uLm90aGVyc30vPilcbiJdfQ==