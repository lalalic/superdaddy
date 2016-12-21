"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TaskPadEditor = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _reactRedux = require("react-redux");

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

var _ = require(".");

var _selector = require("../selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskPadEditor = exports.TaskPadEditor = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state) };
})(function (_ref) {
	var _ref$todos = _ref.todos,
	    todos = _ref$todos === undefined ? [] : _ref$todos,
	    dispatch = _ref.dispatch;
	return _react2.default.createElement(
		_materialUi.List,
		null,
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "任务" }),
		_react2.default.createElement(_materialUi.Divider, null),
		todos.map(function (_ref2, i) {
			var task = _ref2.content,
			    hidden = _ref2.hidden;
			return _react2.default.createElement(_materialUi.ListItem, { key: i, primaryText: task,
				rightIconButton: _react2.default.createElement(
					Wrapper,
					null,
					_react2.default.createElement(Remover, { i: i, dispatch: dispatch }),
					_react2.default.createElement(Visibility, { i: i, dispatch: dispatch, visible: !hidden }),
					_react2.default.createElement(Order, { i: i, dispatch: dispatch })
				)
			});
		}).reduce(function (state, a, i) {
			state.push(a);
			state.push(_react2.default.createElement(_materialUi.Divider, { key: "_" + i }));
			return state;
		}, [])
	);
});

var Order = function Order(_ref3) {
	var i = _ref3.i,
	    dispatch = _ref3.dispatch;
	return _react2.default.createElement(
		Wrapper,
		null,
		_react2.default.createElement(
			_reactResponsive2.default,
			{ minWidth: 960 },
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(_.ACTION.TOP(i));
					} },
				_react2.default.createElement(_verticalAlignTop2.default, { color: _colors.lightBlue100 })
			)
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(_.ACTION.UP(i));
				} },
			_react2.default.createElement(_arrowUpward2.default, { color: _colors.lightBlue100 })
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(_.ACTION.DOWN(i));
				} },
			_react2.default.createElement(_arrowDownward2.default, { color: _colors.lightBlue100 })
		),
		_react2.default.createElement(
			_reactResponsive2.default,
			{ minWidth: 960 },
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(_.ACTION.BOTTOM(i));
					} },
				_react2.default.createElement(_verticalAlignBottom2.default, { color: _colors.lightBlue100 })
			)
		)
	);
};

var Visibility = function Visibility(_ref4) {
	var i = _ref4.i,
	    dispatch = _ref4.dispatch,
	    visible = _ref4.visible,
	    _ref4$Icon = _ref4.Icon,
	    Icon = _ref4$Icon === undefined ? !visible ? _visibilityOff2.default : _visibility2.default : _ref4$Icon,
	    style = _ref4.style;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(_.ACTION.TOGGLE_VISIBLE(i));
			}, style: style },
		_react2.default.createElement(Icon, { color: _colors.lightBlue100 })
	);
};

var Remover = function Remover(_ref5) {
	var i = _ref5.i,
	    dispatch = _ref5.dispatch,
	    style = _ref5.style;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(_.ACTION.REMOVE_BY_INDEX(i));
			}, style: style },
		_react2.default.createElement(_alarmOff2.default, { color: _colors.lightBlue100 })
	);
};

var Wrapper = function Wrapper(_ref6) {
	var onKeyboardFocus = _ref6.onKeyboardFocus,
	    others = (0, _objectWithoutProperties3.default)(_ref6, ["onKeyboardFocus"]);
	return _react2.default.createElement("span", others);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90YXNrLXBhZC1lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOztBQUNBOzs7O0FBRU8sSUFBTSx3Q0FBYyx5QkFBUTtRQUFRLEVBQUMsT0FBTSxvQ0FBcUIsS0FBckIsQ0FBTjtDQUFULENBQVIsQ0FBc0Q7dUJBQUU7d0NBQU07S0FBSTtRQUM1Rjs7O0VBQ0Msc0RBQVUsYUFBWSxJQUFaLEVBQVYsQ0FERDtFQUVDLHdEQUZEO0VBSUEsTUFBTSxHQUFOLENBQVUsaUJBQXdCLENBQXhCO09BQVUsYUFBUjtPQUFjO1VBQ3pCLHNEQUFVLEtBQUssQ0FBTCxFQUFRLGFBQWEsSUFBYjtBQUNqQixxQkFDQztBQUFDLFlBQUQ7O0tBQ0MsOEJBQUMsT0FBRCxJQUFTLEdBQUcsQ0FBSCxFQUFNLFVBQVUsUUFBVixFQUFmLENBREQ7S0FFQyw4QkFBQyxVQUFELElBQVksR0FBRyxDQUFILEVBQU0sVUFBVSxRQUFWLEVBQW9CLFNBQVMsQ0FBQyxNQUFELEVBQS9DLENBRkQ7S0FHQyw4QkFBQyxLQUFELElBQVEsR0FBRyxDQUFILEVBQU0sVUFBVSxRQUFWLEVBQWQsQ0FIRDtLQUREO0lBREQ7R0FEUyxDQUFWLENBVUcsTUFWSCxDQVVVLFVBQUMsS0FBRCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQWE7QUFDckIsU0FBTSxJQUFOLENBQVcsQ0FBWCxFQURxQjtBQUVyQixTQUFNLElBQU4sQ0FBVyxxREFBUyxXQUFTLENBQVQsRUFBVCxDQUFYLEVBRnFCO0FBR3JCLFVBQU8sS0FBUCxDQUhxQjtHQUFiLEVBSVAsRUFkSCxDQUpBOztDQURnRixDQUFwRTs7QUF3QmIsSUFBTSxRQUFNLFNBQU4sS0FBTTtLQUFFO0tBQUU7UUFDZjtBQUFDLFNBQUQ7O0VBQ0M7O0tBQVksVUFBVSxHQUFWLEVBQVo7R0FDVTs7TUFBWSxTQUFTO2FBQUcsU0FBUyxTQUFPLEdBQVAsQ0FBVyxDQUFYLENBQVQ7TUFBSCxFQUFyQjtJQUNJLDREQUFTLDZCQUFULENBREo7SUFEVjtHQUREO0VBTUM7O0tBQVksU0FBUztZQUFHLFNBQVMsU0FBTyxFQUFQLENBQVUsQ0FBVixDQUFUO0tBQUgsRUFBckI7R0FDVSx1REFBUSw2QkFBUixDQURWO0dBTkQ7RUFTQzs7S0FBWSxTQUFTO1lBQUcsU0FBUyxTQUFPLElBQVAsQ0FBWSxDQUFaLENBQVQ7S0FBSCxFQUFyQjtHQUNVLHlEQUFVLDZCQUFWLENBRFY7R0FURDtFQVlPOztLQUFZLFVBQVUsR0FBVixFQUFaO0dBQ0E7O01BQVksU0FBUzthQUFHLFNBQVMsU0FBTyxNQUFQLENBQWMsQ0FBZCxDQUFUO01BQUgsRUFBckI7SUFDUSwrREFBWSw2QkFBWixDQURSO0lBREE7R0FaUDs7Q0FEVzs7QUFxQlosSUFBTSxhQUFXLFNBQVgsVUFBVztLQUFFO0tBQUU7S0FBUzt3QkFBUTt1Q0FBTSxDQUFDLE9BQUQ7S0FBcUM7UUFDaEY7O0lBQVksU0FBUztXQUFHLFNBQVMsU0FBTyxjQUFQLENBQXNCLENBQXRCLENBQVQ7SUFBSCxFQUF1QyxPQUFPLEtBQVAsRUFBNUQ7RUFDQyw4QkFBQyxJQUFELElBQU0sNkJBQU4sQ0FERDs7Q0FEZ0I7O0FBTWpCLElBQU0sVUFBUSxTQUFSLE9BQVE7S0FBRTtLQUFFO0tBQVU7UUFDM0I7O0lBQVksU0FBUztXQUFHLFNBQVMsU0FBTyxlQUFQLENBQXVCLENBQXZCLENBQVQ7SUFBSCxFQUF3QyxPQUFPLEtBQVAsRUFBN0Q7RUFDQyxvREFBWSw2QkFBWixDQUREOztDQURhOztBQU1kLElBQU0sVUFBUSxTQUFSLE9BQVE7S0FBRTtLQUFtQjtRQUFXLHNDQUFVLE1BQVY7Q0FBaEMiLCJmaWxlIjoidGFzay1wYWQtZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW0sIFN1YmhlYWRlcixEaXZpZGVyLFRhYiwgSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBNZWRpYVF1ZXJ5IGZyb20gXCJyZWFjdC1yZXNwb25zaXZlXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQge2xpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEfSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXG5cbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5pbXBvcnQgSWNvblVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy11cHdhcmRcIlxuaW1wb3J0IEljb25Eb3duIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1kb3dud2FyZFwiXG5pbXBvcnQgSWNvblRvcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi10b3BcIlxuaW1wb3J0IEljb25Cb3R0b20gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvdmVydGljYWwtYWxpZ24tYm90dG9tXCJcblxuaW1wb3J0IEljb25WaXNpYmxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3Zpc2liaWxpdHlcIlxuaW1wb3J0IEljb25IaWRkZW4gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdmlzaWJpbGl0eS1vZmZcIlxuXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxuXG5pbXBvcnQge0FDVElPTn0gZnJvbSBcIi5cIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uL3NlbGVjdG9yXCJcblxuZXhwb3J0IGNvbnN0IFRhc2tQYWRFZGl0b3I9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSl9KSkoKHt0b2Rvcz1bXSwgZGlzcGF0Y2h9KT0+KFxuXHQ8TGlzdD5cblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLku7vliqFcIi8+XG5cdFx0PERpdmlkZXIvPlxuXHR7XG5cdHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgaGlkZGVufSxpKT0+KFxuXHRcdDxMaXN0SXRlbSBrZXk9e2l9IHByaW1hcnlUZXh0PXt0YXNrfVxuXHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcblx0XHRcdFx0PFdyYXBwZXI+XG5cdFx0XHRcdFx0PFJlbW92ZXIgaT17aX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHRcdFx0PFZpc2liaWxpdHkgaT17aX0gZGlzcGF0Y2g9e2Rpc3BhdGNofSB2aXNpYmxlPXshaGlkZGVufS8+XG5cdFx0XHRcdFx0PE9yZGVyICBpPXtpfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0PC9XcmFwcGVyPlxuXHRcdFx0fVxuXHRcdC8+XG5cdCkpLnJlZHVjZSgoc3RhdGUsYSxpKT0+e1xuXHRcdFx0c3RhdGUucHVzaChhKVxuXHRcdFx0c3RhdGUucHVzaCg8RGl2aWRlciBrZXk9e2BfJHtpfWB9Lz4pXG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9LFtdKVxuXHR9XG5cdDwvTGlzdD5cbikpXG5cbmNvbnN0IE9yZGVyPSh7aSxkaXNwYXRjaH0pPT4oXG5cdDxXcmFwcGVyPlxuXHRcdDxNZWRpYVF1ZXJ5IG1pbldpZHRoPXs5NjB9PlxuICAgICAgICAgICAgPEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRPUChpKSl9PlxuICAgICAgICAgICAgICAgIDxJY29uVG9wIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG4gICAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgIDwvTWVkaWFRdWVyeT5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVVAoaSkpfT5cbiAgICAgICAgICAgIDxJY29uVXAgY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cbiAgICAgICAgPC9JY29uQnV0dG9uPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET1dOKGkpKX0+XG4gICAgICAgICAgICA8SWNvbkRvd24gY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cbiAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICA8TWVkaWFRdWVyeSBtaW5XaWR0aD17OTYwfT5cblx0XHQgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uQk9UVE9NKGkpKX0+XG4gICAgICAgICAgICAgICAgPEljb25Cb3R0b20gY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cbiAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgICAgPC9NZWRpYVF1ZXJ5PlxuXHQ8L1dyYXBwZXI+XG4pXG5cbmNvbnN0IFZpc2liaWxpdHk9KHtpLGRpc3BhdGNoLHZpc2libGUsSWNvbj0oIXZpc2libGUgPyBJY29uSGlkZGVuIDogSWNvblZpc2libGUpLHN0eWxlfSk9Pihcblx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRPR0dMRV9WSVNJQkxFKGkpKX0gc3R5bGU9e3N0eWxlfT5cblx0XHQ8SWNvbiBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuXHQ8L0ljb25CdXR0b24+XG4pXG5cbmNvbnN0IFJlbW92ZXI9KHtpLGRpc3BhdGNoLCBzdHlsZX0pPT4oXG5cdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkVfQllfSU5ERVgoaSkpfSBzdHlsZT17c3R5bGV9PlxuXHRcdDxJY29uUmVtb3ZlIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG5cdDwvSWNvbkJ1dHRvbj5cbilcblxuY29uc3QgV3JhcHBlcj0oe29uS2V5Ym9hcmRGb2N1cywuLi5vdGhlcnN9KT0+KDxzcGFuIHsuLi5vdGhlcnN9Lz4pXG4iXX0=