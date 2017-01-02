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

var _selector = require("../../selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TaskPadEditor = exports.TaskPadEditor = function TaskPadEditor(_ref) {
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
};

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
	    others = _objectWithoutProperties(_ref6, ["onKeyboardFocus"]);

	return _react2.default.createElement("span", others);
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentUserTasks)(state) };
})(TaskPadEditor);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9wYXBhL3Rhc2stcGFkLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJUYXNrUGFkRWRpdG9yIiwidG9kb3MiLCJkaXNwYXRjaCIsIm1hcCIsImkiLCJ0YXNrIiwiY29udGVudCIsImhpZGRlbiIsInJlZHVjZSIsInN0YXRlIiwiYSIsInB1c2giLCJPcmRlciIsIlRPUCIsIlVQIiwiRE9XTiIsIkJPVFRPTSIsIlZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiSWNvbiIsInN0eWxlIiwiVE9HR0xFX1ZJU0lCTEUiLCJSZW1vdmVyIiwiUkVNT1ZFX0JZX0lOREVYIiwiV3JhcHBlciIsIm9uS2V5Ym9hcmRGb2N1cyIsIm90aGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRUE7O0FBK0RBOzs7Ozs7QUE3RE8sSUFBTUEsd0NBQWUsU0FBZkEsYUFBZTtBQUFBLHVCQUFFQyxLQUFGO0FBQUEsS0FBRUEsS0FBRiw4QkFBUSxFQUFSO0FBQUEsS0FBWUMsUUFBWixRQUFZQSxRQUFaO0FBQUEsUUFDM0I7QUFBQTtBQUFBO0FBQ0Msd0RBQVUsYUFBWSxjQUF0QixHQUREO0FBRUMsMERBRkQ7QUFJQUQsUUFBTUUsR0FBTixDQUFVLGlCQUF3QkMsQ0FBeEI7QUFBQSxPQUFVQyxJQUFWLFNBQUVDLE9BQUY7QUFBQSxPQUFnQkMsTUFBaEIsU0FBZ0JBLE1BQWhCO0FBQUEsVUFDVCxzREFBVSxLQUFLSCxDQUFmLEVBQWtCLGFBQWFDLElBQS9CO0FBQ0MscUJBQ0M7QUFBQyxZQUFEO0FBQUE7QUFDQyxtQ0FBQyxPQUFELElBQVMsR0FBR0QsQ0FBWixFQUFlLFVBQVVGLFFBQXpCLEdBREQ7QUFFQyxtQ0FBQyxVQUFELElBQVksR0FBR0UsQ0FBZixFQUFrQixVQUFVRixRQUE1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WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7TGlzdCxMaXN0SXRlbSwgU3ViaGVhZGVyLERpdmlkZXIsVGFiLCBJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7bGlnaHRCbHVlMTAwIGFzIENPTE9SX0VOQUJMRUR9IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcblxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcbmltcG9ydCBJY29uVXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LXVwd2FyZFwiXG5pbXBvcnQgSWNvbkRvd24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWRvd253YXJkXCJcbmltcG9ydCBJY29uVG9wIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL3ZlcnRpY2FsLWFsaWduLXRvcFwiXG5pbXBvcnQgSWNvbkJvdHRvbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi1ib3R0b21cIlxuXG5pbXBvcnQgSWNvblZpc2libGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdmlzaWJpbGl0eVwiXG5pbXBvcnQgSWNvbkhpZGRlbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5LW9mZlwiXG5cbmltcG9ydCBJY29uUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FsYXJtLW9mZlwiXG5cbmltcG9ydCB7QUNUSU9OfSBmcm9tIFwiLlwiXG5cbmV4cG9ydCBjb25zdCBUYXNrUGFkRWRpdG9yPSgoe3RvZG9zPVtdLCBkaXNwYXRjaH0pPT4oXG5cdDxMaXN0PlxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuS7u+WKoVwiLz5cblx0XHQ8RGl2aWRlci8+XG5cdHtcblx0dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBoaWRkZW59LGkpPT4oXG5cdFx0PExpc3RJdGVtIGtleT17aX0gcHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHQ8UmVtb3ZlciBpPXtpfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0XHQ8VmlzaWJpbGl0eSBpPXtpfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IHZpc2libGU9eyFoaWRkZW59Lz5cblx0XHRcdFx0XHQ8T3JkZXIgIGk9e2l9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxuXHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHR9XG5cdFx0Lz5cblx0KSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XG5cdFx0XHRzdGF0ZS5wdXNoKGEpXG5cdFx0XHRzdGF0ZS5wdXNoKDxEaXZpZGVyIGtleT17YF8ke2l9YH0vPilcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0sW10pXG5cdH1cblx0PC9MaXN0PlxuKSlcblxuY29uc3QgT3JkZXI9KHtpLGRpc3BhdGNofSk9Pihcblx0PFdyYXBwZXI+XG5cdFx0PE1lZGlhUXVlcnkgbWluV2lkdGg9ezk2MH0+XG4gICAgICAgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9QKGkpKX0+XG4gICAgICAgICAgICAgICAgPEljb25Ub3AgY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cbiAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgICAgPC9NZWRpYVF1ZXJ5PlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5VUChpKSl9PlxuICAgICAgICAgICAgPEljb25VcCBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuICAgICAgICA8L0ljb25CdXR0b24+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPV04oaSkpfT5cbiAgICAgICAgICAgIDxJY29uRG93biBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgIDxNZWRpYVF1ZXJ5IG1pbldpZHRoPXs5NjB9PlxuXHRcdCAgICAgIDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5CT1RUT00oaSkpfT5cbiAgICAgICAgICAgICAgICA8SWNvbkJvdHRvbSBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxuICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICA8L01lZGlhUXVlcnk+XG5cdDwvV3JhcHBlcj5cbilcblxuY29uc3QgVmlzaWJpbGl0eT0oe2ksZGlzcGF0Y2gsdmlzaWJsZSxJY29uPSghdmlzaWJsZSA/IEljb25IaWRkZW4gOiBJY29uVmlzaWJsZSksc3R5bGV9KT0+KFxuXHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9HR0xFX1ZJU0lCTEUoaSkpfSBzdHlsZT17c3R5bGV9PlxuXHRcdDxJY29uIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XG5cdDwvSWNvbkJ1dHRvbj5cbilcblxuY29uc3QgUmVtb3Zlcj0oe2ksZGlzcGF0Y2gsIHN0eWxlfSk9Pihcblx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRV9CWV9JTkRFWChpKSl9IHN0eWxlPXtzdHlsZX0+XG5cdFx0PEljb25SZW1vdmUgY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cblx0PC9JY29uQnV0dG9uPlxuKVxuXG5jb25zdCBXcmFwcGVyPSh7b25LZXlib2FyZEZvY3VzLC4uLm90aGVyc30pPT4oPHNwYW4gey4uLm90aGVyc30vPilcblxuXG5cbmltcG9ydCB7Z2V0Q3VycmVudFVzZXJUYXNrcyBhcyBnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpfSkpKFRhc2tQYWRFZGl0b3IpXG4iXX0=