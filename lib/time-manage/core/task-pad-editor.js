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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3Rhc2stcGFkLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJUYXNrUGFkRWRpdG9yIiwidG9kb3MiLCJtYXAiLCJpIiwidGFzayIsImNvbnRlbnQiLCJoaWRkZW4iLCJyZWR1Y2UiLCJzdGF0ZSIsImEiLCJwdXNoIiwiT3JkZXIiLCJBQ1RJT04iLCJkaXNwYXRjaCIsIlRPUCIsIlVQIiwiRE9XTiIsIkJPVFRPTSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJWaXNpYmlsaXR5IiwidmlzaWJsZSIsIkljb24iLCJzdHlsZSIsIlRPR0dMRV9WSVNJQkxFIiwiUmVtb3ZlciIsIlJFTU9WRV9CWV9JTkRFWCIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7QUFFTyxJQUFNQSx3Q0FBZSxTQUFmQSxhQUFlO0FBQUEsdUJBQUVDLEtBQUY7QUFBQSxLQUFFQSxLQUFGLDhCQUFRLEVBQVI7QUFBQSxRQUMzQjtBQUFBO0FBQUE7QUFDQyx3REFBVSxhQUFZLGNBQXRCLEdBREQ7QUFFQywwREFGRDtBQUlBQSxRQUFNQyxHQUFOLENBQVUsaUJBQXdCQyxDQUF4QjtBQUFBLE9BQVVDLElBQVYsU0FBRUMsT0FBRjtBQUFBLE9BQWdCQyxNQUFoQixTQUFnQkEsTUFBaEI7QUFBQSxVQUNULHNEQUFVLEtBQUtILENBQWYsRUFBa0IsYUFBYUMsSUFBL0I7QUFDQyxxQkFDQztBQUFDLFlBQUQ7QUFBQTtBQUNDLG1DQUFDLE9BQUQsSUFBUyxHQUFHRCxDQUFaLEdBREQ7QUFFQyxtQ0FBQyxVQUFELElBQVksR0FBR0EsQ0FBZixFQUFrQixTQUFTLENBQUNHLE1BQTVCLEdBRkQ7QUFHQyxtQ0FBQyxL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LFdBQVUsaUJBQVVPO0FBRkEsQ0FBckI7O0FBS0EsSUFBTVEsVUFBUSxTQUFSQSxPQUFRO0FBQUEsS0FBRUMsZUFBRixTQUFFQSxlQUFGO0FBQUEsS0FBcUJDLE1BQXJCOztBQUFBLFFBQWdDLHNDQUFVQSxNQUFWLENBQWhDO0FBQUEsQ0FBZCIsImZpbGUiOiJ0YXNrLXBhZC1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEljb25CdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBNZWRpYVF1ZXJ5IGZyb20gXCJyZWFjdC1yZXNwb25zaXZlXCJcclxuXHJcbmltcG9ydCB7bGlnaHRCbHVlMTAwIGFzIENPTE9SX0VOQUJMRUR9IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcclxuXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcbmltcG9ydCBJY29uVXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LXVwd2FyZFwiXHJcbmltcG9ydCBJY29uRG93biBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZG93bndhcmRcIlxyXG5pbXBvcnQgSWNvblRvcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi10b3BcIlxyXG5pbXBvcnQgSWNvbkJvdHRvbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi1ib3R0b21cIlxyXG5cclxuaW1wb3J0IEljb25WaXNpYmxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3Zpc2liaWxpdHlcIlxyXG5pbXBvcnQgSWNvbkhpZGRlbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5LW9mZlwiXHJcblxyXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFRhc2tQYWRFZGl0b3I9KCh7dG9kb3M9W119KT0+KFxyXG5cdDxMaXN0PlxyXG5cdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5Lu75YqhXCIvPlxyXG5cdFx0PERpdmlkZXIvPlxyXG5cdHtcclxuXHR0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGhpZGRlbn0saSk9PihcclxuXHRcdDxMaXN0SXRlbSBrZXk9e2l9IHByaW1hcnlUZXh0PXt0YXNrfVxyXG5cdFx0XHRyaWdodEljb25CdXR0b249e1xyXG5cdFx0XHRcdDxXcmFwcGVyPlxyXG5cdFx0XHRcdFx0PFJlbW92ZXIgaT17aX0vPlxyXG5cdFx0XHRcdFx0PFZpc2liaWxpdHkgaT17aX0gdmlzaWJsZT17IWhpZGRlbn0vPlxyXG5cdFx0XHRcdFx0PE9yZGVyICBpPXtpfS8+XHJcblx0XHRcdFx0PC9XcmFwcGVyPlxyXG5cdFx0XHR9XHJcblx0XHQvPlxyXG5cdCkpLnJlZHVjZSgoc3RhdGUsYSxpKT0+e1xyXG5cdFx0XHRzdGF0ZS5wdXNoKGEpXHJcblx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0sW10pXHJcblx0fVxyXG5cdDwvTGlzdD5cclxuKSlcclxuXHJcbmNvbnN0IE9yZGVyPSh7aX0se0FDVElPTixkaXNwYXRjaH0pPT4oXHJcblx0PFdyYXBwZXI+XHJcblx0XHQ8TWVkaWFRdWVyeSBtaW5XaWR0aD17OTYwfT5cclxuICAgICAgICAgICAgPEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRPUChpKSl9PlxyXG4gICAgICAgICAgICAgICAgPEljb25Ub3AgY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cclxuICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxyXG4gICAgICAgIDwvTWVkaWFRdWVyeT5cclxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5VUChpKSl9PlxyXG4gICAgICAgICAgICA8SWNvblVwIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XHJcbiAgICAgICAgPC9JY29uQnV0dG9uPlxyXG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPV04oaSkpfT5cclxuICAgICAgICAgICAgPEljb25Eb3duIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XHJcbiAgICAgICAgPC9JY29uQnV0dG9uPlxyXG4gICAgICAgIDxNZWRpYVF1ZXJ5IG1pbldpZHRoPXs5NjB9PlxyXG5cdFx0ICAgICAgPEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkJPVFRPTShpKSl9PlxyXG4gICAgICAgICAgICAgICAgPEljb25Cb3R0b20gY29sb3I9e0NPTE9SX0VOQUJMRUR9Lz5cclxuICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxyXG4gICAgICAgIDwvTWVkaWFRdWVyeT5cclxuXHQ8L1dyYXBwZXI+XHJcbilcclxuXHJcbk9yZGVyLmNvbnRleHRUeXBlcz17XHJcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xyXG59XHJcblxyXG5jb25zdCBWaXNpYmlsaXR5PSh7aSx2aXNpYmxlLEljb249KCF2aXNpYmxlID8gSWNvbkhpZGRlbiA6IEljb25WaXNpYmxlKSxzdHlsZX0se0FDVElPTixkaXNwYXRjaH0pPT4oXHJcblx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRPR0dMRV9WSVNJQkxFKGkpKX0gc3R5bGU9e3N0eWxlfT5cclxuXHRcdDxJY29uIGNvbG9yPXtDT0xPUl9FTkFCTEVEfS8+XHJcblx0PC9JY29uQnV0dG9uPlxyXG4pXHJcblxyXG5WaXNpYmlsaXR5LmNvbnRleHRUeXBlcz17XHJcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xyXG59XHJcblxyXG5jb25zdCBSZW1vdmVyPSh7aSxzdHlsZX0se0FDVElPTixkaXNwYXRjaH0pPT4oXHJcblx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRV9CWV9JTkRFWChpKSl9IHN0eWxlPXtzdHlsZX0+XHJcblx0XHQ8SWNvblJlbW92ZSBjb2xvcj17Q09MT1JfRU5BQkxFRH0vPlxyXG5cdDwvSWNvbkJ1dHRvbj5cclxuKVxyXG5cclxuUmVtb3Zlci5jb250ZXh0VHlwZXM9e1xyXG5cdEFDVElPTjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmNcclxufVxyXG5cclxuY29uc3QgV3JhcHBlcj0oe29uS2V5Ym9hcmRGb2N1cywuLi5vdGhlcnN9KT0+KDxzcGFuIHsuLi5vdGhlcnN9Lz4pXHJcbiJdfQ==