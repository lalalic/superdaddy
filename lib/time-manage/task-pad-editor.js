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
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u4EFB\u52A1" }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90YXNrLXBhZC1lZGl0b3IuanMiXSwibmFtZXMiOlsiVGFza1BhZEVkaXRvciIsInRvZG9zIiwic3RhdGUiLCJkaXNwYXRjaCIsIm1hcCIsImkiLCJ0YXNrIiwiY29udGVudCIsImhpZGRlbiIsInJlZHVjZSIsImEiLCJwdXNoIiwiT3JkZXIiLCJUT1AiLCJVUCIsIkRPV04iLCJCT1RUT00iLCJWaXNpYmlsaXR5IiwidmlzaWJsZSIsIkljb24iLCJzdHlsZSIsIlRPR0dMRV9WSVNJQkxFIiwiUmVtb3ZlciIsIlJFTU9WRV9CWV9JTkRFWCIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7OztBQUVPLElBQU1BLHdDQUFjLHlCQUFRO0FBQUEsUUFBUSxFQUFDQyxPQUFNLG9DQUFxQkMsS0FBckIsQ0FBUCxFQUFSO0FBQUEsQ0FBUixFQUFzRDtBQUFBLHVCQUFFRCxLQUFGO0FBQUEsS0FBRUEsS0FBRiw4QkFBUSxFQUFSO0FBQUEsS0FBWUUsUUFBWixRQUFZQSxRQUFaO0FBQUEsUUFDaEY7QUFBQTtBQUFBO0FBQ0Msd0RBQVUsYUFBWSxjQUF0QixHQUREO0FBRUMsMERBRkQ7QUFJQUYsUUFBTUcsR0FBTixDQUFVLGlCQUF3QkMsQ0FBeEI7QUFBQSxPQUFVQyxJQUFWLFNBQUVDLE9BQUY7QUFBQSxPQUFnQkMsTUFBaEIsU0FBZ0JBLE1BQWhCO0FBQUEsVUFDVCxzREFBVSxLQUFLSCxDQUFmLEVBQWtCLGFBQWFDLElBQS9CO0FBQ0MscUJBQ0M7QUFBQyxZQUFEO0FBQUE7QUFDQyxtQ0FBQyxPQUFELElBQVMsR0FBR0QsQ0FBWixFQUFlLFVBQVVGLFFBQXpCLEdBREQ7QUFFQyxtQ0FBQyxVQUFELElBQVksR0FBR0UsQ0FBZixFQUFrQixVQUFVRixRQUE1QixFQUFzQyxTQUFTLENBQUNLLE1BQWhELEdBRkQ7QUFHQyxtQ0FBQyxLQUFELElBQVEsR0FBR0gsQ0FBWCxFQUFjLFVBQVVGLFFBQXhCO0FBSEQ7QUFGRixLQURTO0FBQUEsR0FBVixFQVVHTSxNQVZILENBVVUsVUFBQ1AsS0FBRCxFQUFPUSxDQUFQLEVBQVNMLENBQVQsRUFBYTtBQUNyQkgsU0FBTVMsSUFBTixDQUFXRCxDQUFYO0FBQ0FSLFNBQU1TLElBQU4sQ0FBVyxxREFBUyxXQUFTTixDQUFsQixHQUFYO0FBQ0EsVUFBT0gsS0FBUDtBQUNBLEdBZEYsRUFjRyxFQWRIO0FBSkEsRUFEZ0Y7QUFBQSxDQUF0RCxDQUFwQjs7QUF3QlAsSUFBTVUsUUFBTSxTQUFOQSxLQUFNO0FBQUEsS0FBRVAsQ0FBRixTQUFFQSxDQUFGO0FBQUEsS0FBSUYsUUFBSixTQUFJQSxRQUFKO0FBQUEsUUFDWDtBQUFDLFNBQUQ7QUFBQTtBQUNDO0FBQUE7QUFBQSxLQUFZLFVBQVUsR0FBdEI7QUFDVTtBQUFBO0FBQUEsTUFBWSxTQUFTO0FBQUEsYUFBR0EsU0FBUyxTQUFPVSxHQUFQLENBQVdSLENBQVgsQ0FBVCxDQUFIO0FBQUEsTUFBckI7QUFDSSxnRUFBUywyQkFBVDtBQURKO0FBRFYsR0FERDtBQU1DO0FBQUE7QUFBQSxLQUFZLFNBQVM7QUFBQSxZQUFHRixTQUFTLFNBQU9XLEVBQVAsQ0FBVVQsQ0FBVixDQUFULENBQUg7QUFBQSxLQUFyQjtBQUNVLDBEQUFRLDJCQUFSO0FBRFYsR0FORDtBQVNDO0FBQUE7QUFBQSxLQUFZLFNBQVM7QUFBQSxZQUFHRixTQUFTLFNBQU9ZLElBQVAsQ0FBWVYsQ0FBWixDQUFULENBQUg7QUFBQSxLQUFyQjtBQUNVLDREQUFVLDJCQUFWO0FBRFYsR0FURDtBQVlPO0FBQUE7QUFBQSxLQUFZLFVBQVUsR0FBdEI7QUFDQTtBQUFBO0FBQUEsTUFBWSxTQUFTO0FBQUEsYUFBR0YsU0FBUyxTQUFPYSxNQUFQLENBQWNYLENBQWQsQ0FBVCxDQUFIO0FBQUEsTUFBckI7QUFDUSxtRUFBWSwyQkFBWjtBQURSO0FBREE7QUFaUCxFQURXO0FBQUEsQ0FBWjs7QUFxQkEsSUFBTVksYUFBVyxTQUFYQSxVQUFXO0FBQUEsS0FBRVosQ0FBRixTQUFFQSxDQUFGO0FBQUEsS0FBSUYsUUFBSixTQUFJQSxRQUFKO0FBQUEsS0FBYWUsT0FBYixTQUFhQSxPQUFiO0FBQUEsd0JBQXFCQyxJQUFyQjtBQUFBLEtBQXFCQSxJQUFyQiw4QkFBMkIsQ0FBQ0QsT0FBRCxpREFBM0I7QUFBQSxLQUFnRUUsS0FBaEUsU0FBZ0VBLEtBQWhFO0FBQUEsUUFDaEI7QUFBQTtBQUFBLElBQVksU0FBUztBQUFBLFdBQUdqQixTQUFTLFNBQU9rQixjQUFQLENBQXNCaEIsQ0FBdEIsQ0FBVCxDQUFIO0FBQUEsSUFBckIsRUFBNEQsT0FBT2UsS0FBbkU7QUFDQyxnQ0FBQyxJQUFELElBQU0sMkJBQU47QUFERCxFQURnQjtBQUFBLENBQWpCOztBQU1BLElBQU1FLFVBQVEsU0FBUkEsT0FBUTtBQUFBLEtBQUVqQixDQUFGLFNBQUVBLENBQUY7QUFBQSxLQUFJRixRQUFKLFNBQUlBLFFBQUo7QUFBQSxLQUFjaUIsS0FBZCxTQUFjQSxLQUFkO0FBQUEsUUFDYjtBQUFBO0FBQUEsSUFBWSxTQUFTO0FBQUEsV0FBR2pCLFNBQVMsU0FBT29CLGVBQVAsQ0FBdUJsQixDQUF2QixDQUFULENBQUg7QUFBQSxJQUFyQixFQUE2RCxPQUFPZSxLQUFwRTtBQUNDLHNEQUFZLDJCQUFaO0FBREQsRUFEYTtBQUFBLENBQWQ7O0FBTUEsSUFBTUksVUFBUSxTQUFSQSxPQUFRO0FBQUEsS0FBRUMsZUFBRixTQUFFQSxlQUFGO0FBQUEsS0FBcUJDLE1BQXJCO0FBQUEsUUFBZ0Msc0NBQVVBLE1BQVYsQ0FBaEM7QUFBQSxDQUFkIiwiZmlsZSI6InRhc2stcGFkLWVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEljb25CdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQgTWVkaWFRdWVyeSBmcm9tIFwicmVhY3QtcmVzcG9uc2l2ZVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IHtsaWdodEJsdWUxMDAgYXMgQ09MT1JfRU5BQkxFRH0gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxuXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxuaW1wb3J0IEljb25VcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctdXB3YXJkXCJcbmltcG9ydCBJY29uRG93biBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZG93bndhcmRcIlxuaW1wb3J0IEljb25Ub3AgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvdmVydGljYWwtYWxpZ24tdG9wXCJcbmltcG9ydCBJY29uQm90dG9tIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL3ZlcnRpY2FsLWFsaWduLWJvdHRvbVwiXG5cbmltcG9ydCBJY29uVmlzaWJsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5XCJcbmltcG9ydCBJY29uSGlkZGVuIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3Zpc2liaWxpdHktb2ZmXCJcblxuaW1wb3J0IEljb25SZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tb2ZmXCJcblxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5cbmV4cG9ydCBjb25zdCBUYXNrUGFkRWRpdG9yPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpfSkpKCh7dG9kb3M9W10sIGRpc3BhdGNofSk9Pihcblx0PExpc3Q+XG5cdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5Lu75YqhXCIvPlxuXHRcdDxEaXZpZGVyLz5cblx0e1xuXHR0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGhpZGRlbn0saSk9Pihcblx0XHQ8TGlzdEl0ZW0ga2V5PXtpfSBwcmltYXJ5VGV4dD17dGFza31cblx0XHRcdHJpZ2h0SWNvbkJ1dHRvbj17XG5cdFx0XHRcdDxXcmFwcGVyPlxuXHRcdFx0XHRcdDxSZW1vdmVyIGk9e2l9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxuXHRcdFx0XHRcdDxWaXNpYmlsaXR5IGk9e2l9IGRpc3BhdGNoPXtkaXNwYXRjaH0gdmlzaWJsZT17IWhpZGRlbn0vPlxuXHRcdFx0XHRcdDxPcmRlciAgaT17aX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHRcdDwvV3JhcHBlcj5cblx0XHRcdH1cblx0XHQvPlxuXHQpKS5yZWR1Y2UoKHN0YXRlLGEsaSk9Pntcblx0XHRcdHN0YXRlLnB1c2goYSlcblx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSxbXSlcblx0fVxuXHQ8L0xpc3Q+XG4pKVxuXG5jb25zdCBPcmRlcj0oe2ksZGlzcGF0Y2h9KT0+KFxuXHQ8V3JhcHBlcj5cblx0XHQ8TWVkaWFRdWVyeSBtaW5XaWR0aD17OTYwfT5cbiAgICAgICAgICAgIDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5UT1AoaSkpfT5cbiAgICAgICAgICAgICAgICA8SWNvblRvcCBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICA8L01lZGlhUXVlcnk+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQKGkpKX0+XG4gICAgICAgICAgICA8SWNvblVwIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG4gICAgICAgIDwvSWNvbkJ1dHRvbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRE9XTihpKSl9PlxuICAgICAgICAgICAgPEljb25Eb3duIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG4gICAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgICAgPE1lZGlhUXVlcnkgbWluV2lkdGg9ezk2MH0+XG5cdFx0ICAgICAgPEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkJPVFRPTShpKSl9PlxuICAgICAgICAgICAgICAgIDxJY29uQm90dG9tIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG4gICAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgIDwvTWVkaWFRdWVyeT5cblx0PC9XcmFwcGVyPlxuKVxuXG5jb25zdCBWaXNpYmlsaXR5PSh7aSxkaXNwYXRjaCx2aXNpYmxlLEljb249KCF2aXNpYmxlID8gSWNvbkhpZGRlbiA6IEljb25WaXNpYmxlKSxzdHlsZX0pPT4oXG5cdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5UT0dHTEVfVklTSUJMRShpKSl9IHN0eWxlPXtzdHlsZX0+XG5cdFx0PEljb24gY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cblx0PC9JY29uQnV0dG9uPlxuKVxuXG5jb25zdCBSZW1vdmVyPSh7aSxkaXNwYXRjaCwgc3R5bGV9KT0+KFxuXHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVNT1ZFX0JZX0lOREVYKGkpKX0gc3R5bGU9e3N0eWxlfT5cblx0XHQ8SWNvblJlbW92ZSBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuXHQ8L0ljb25CdXR0b24+XG4pXG5cbmNvbnN0IFdyYXBwZXI9KHtvbktleWJvYXJkRm9jdXMsLi4ub3RoZXJzfSk9Pig8c3BhbiB7Li4ub3RoZXJzfS8+KVxuIl19