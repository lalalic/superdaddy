"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.ACTION = exports.reducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _colors = require("material-ui/styles/colors");

var _db = require("../db");

var _appBar = require("../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyAppBar = function MyAppBar(props) {
	return _react2.default.createElement(_materialUi.AppBar, _extends({}, props, { style: { backgroundColor: _colors.cyan300 },
		iconElementLeft: _react2.default.createElement(
			_materialUi.FloatingActionButton,
			{
				mini: true,
				backgroundColor: _colors.cyan300,
				style: { fontSize: "xx-small" },
				zDepth: 1
			},
			"\u6211\u7684"
		)
	}));
};

var BabyTimeManage = (0, _core2.default)(_appBar2.default, "baby");
var MyTimeManage = void 0;

var reducer = exports.reducer = function reducer(state, next) {
	var nextState = BabyTimeManage.reducer(state, next);
	if (nextState == state && MyTimeManage) nextState = MyTimeManage.reducer(state, next);
	return nextState;
};

var ACTION = exports.ACTION = {
	ADD: function ADD(knowledge) {
		return function (dispatch, getState) {
			var _id = knowledge._id,
			    title = knowledge.title,
			    score = knowledge.score;

			var task = { knowledge: _id, content: title, score: score };
			var ps = [];

			if (_db.Knowledge.isForBaby(knowledge)) ps.push(BabyTimeManage.ACTION.ADD(task)(dispatch, getState));

			if (_db.Knowledge.isForParent(knowledge) && MyTimeManage) ps.push(MyTimeManage.ACTION.ADD(task)(dispatch, getState));

			return Promise.all(ps);
		};
	},
	REMOVE: function REMOVE(knowledge) {
		return function (dispatch, getState) {
			var ps = [];
			if (_db.Knowledge.isForBaby(knowledge)) ps.push(BabyTimeManage.ACTION.REMOVE({ _id: knowledge._id })(dispatch, getState));

			if (_db.Knowledge.isForParent(knowledge) && MyTimeManage) ps.push(MyTimeManage.ACTION.REMOVE({ _id: knowledge._id })(dispatch, getState));

			return Promise.all(ps);
		};
	}
};

var TimeManage = exports.TimeManage = function TimeManage(_ref, _ref2) {
	var _id = _ref._id;
	var muiTheme = _ref2.muiTheme,
	    _ref2$minHeight = _ref2.minHeight,
	    minHeight = _ref2$minHeight === undefined ? (muiTheme.page.height - muiTheme.appBar.height - muiTheme.footbar.height) / 2 : _ref2$minHeight;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			"div",
			{ style: { minHeight: minHeight } },
			_react2.default.createElement(BabyTimeManage, null)
		),
		function () {
			if (!MyTimeManage) MyTimeManage = (0, _core2.default)(MyAppBar, _id);
			return _react2.default.createElement(MyTimeManage);
		}()
	);
};

TimeManage.contextTypes = {
	muiTheme: _react.PropTypes.object
};

exports.default = Object.assign(TimeManage, { reducer: reducer, ScorePad: BabyTimeManage.ScorePad });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNeUFwcEJhciIsInByb3BzIiwiYmFja2dyb3VuZENvbG9yIiwiZm9udFNpemUiLCJCYWJ5VGltZU1hbmFnZSIsIk15VGltZU1hbmFnZSIsInJlZHVjZXIiLCJzdGF0ZSIsIm5leHQiLCJuZXh0U3RhdGUiLCJBQ1RJT04iLCJBREQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiX2lkIiwia25vd2xlZGdlIiwidGl0bGUiLCJzY29yZSIsInRhc2siLCJjb250ZW50IiwicHMiLCJpc0ZvckJhYnkiLCJwdXNoIiwiaXNGb3JQYXJlbnQiLCJQcm9taXNlIiwiYWxsIiwiUkVNT1ZFIiwiVGltZU1hbmFnZSIsIm11aVRoZW1lIiwibWluSGVpZ2h0IiwicGFnZSIsImhlaWdodCIsImFwcEJhciIsImZvb3RiYXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiT2JqZWN0IiwiYXNzaWduIiwiU2NvcmVQYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsV0FBVSxTQUFWQSxRQUFVO0FBQUEsUUFDZiwrREFBWUMsS0FBWixJQUFtQixPQUFPLEVBQUNDLGdDQUFELEVBQTFCO0FBQ0MsbUJBQ0M7QUFBQTtBQUFBO0FBQ0MsVUFBTSxJQURQO0FBRUMsb0NBRkQ7QUFHQyxXQUFPLEVBQUNDLFVBQVMsVUFBVixFQUhSO0FBSUMsWUFBUTtBQUpUO0FBQUE7QUFBQTtBQUZGLElBRGU7QUFBQSxDQUFoQjs7QUFlQSxJQUFNQyxpQkFBZSxzQ0FBNkIsTUFBN0IsQ0FBckI7QUFDQSxJQUFJQyxxQkFBSjs7QUFHTyxJQUFNQyw0QkFBUSxTQUFSQSxPQUFRLENBQUNDLEtBQUQsRUFBT0MsSUFBUCxFQUFjO0FBQ2xDLEtBQUlDLFlBQVVMLGVBQWVFLE9BQWYsQ0FBdUJDLEtBQXZCLEVBQTZCQyxJQUE3QixDQUFkO0FBQ0EsS0FBR0MsYUFBV0YsS0FBWCxJQUFvQkYsWUFBdkIsRUFDQ0ksWUFBVUosYUFBYUMsT0FBYixDQUFxQkMsS0FBckIsRUFBMkJDLElBQTNCLENBQVY7QUFDRCxRQUFPQyxTQUFQO0FBQ0EsQ0FMTTs7QUFPQSxJQUFNQywwQkFBTztBQUNuQkMsTUFBSztBQUFBLFNBQVcsVUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQUEsT0FDaENDLEdBRGdDLEdBQ2ZDLFNBRGUsQ0FDaENELEdBRGdDO0FBQUEsT0FDNUJFLEtBRDRCLEdBQ2ZELFNBRGUsQ0FDNUJDLEtBRDRCO0FBQUEsT0FDdEJDLEtBRHNCLEdBQ2ZGLFNBRGUsQ0FDdEJFLEtBRHNCOztBQUVyQyxPQUFJQyxPQUFLLEVBQUNILFdBQVVELEdBQVgsRUFBZUssU0FBUUgsS0FBdkIsRUFBNkJDLFlBQTdCLEVBQVQ7QUFDQSxPQUFJRyxLQUFHLEVBQVA7O0FBRUEsT0FBRyxjQUFVQyxTQUFWLENBQW9CTixTQUFwQixDQUFILEVBQ0NLLEdBQUdFLElBQUgsQ0FBUWxCLGVBQWVNLE1BQWYsQ0FBc0JDLEdBQXRCLENBQTBCTyxJQUExQixFQUFnQ04sUUFBaEMsRUFBMENDLFFBQTFDLENBQVI7O0FBRUQsT0FBRyxjQUFVVSxXQUFWLENBQXNCUixTQUF0QixLQUFvQ1YsWUFBdkMsRUFDQ2UsR0FBR0UsSUFBSCxDQUFRakIsYUFBYUssTUFBYixDQUFvQkMsR0FBcEIsQ0FBd0JPLElBQXhCLEVBQThCTixRQUE5QixFQUF3Q0MsUUFBeEMsQ0FBUjs7QUFFRCxVQUFPVyxRQUFRQyxHQUFSLENBQVlMLEVBQVosQ0FBUDtBQUNBLEdBWkk7QUFBQSxFQURjO0FBY25CTSxTQUFRO0FBQUEsU0FBVyxVQUFDZCxRQUFELEVBQVdDLFFBQVgsRUFBc0I7QUFDeEMsT0FBSU8sS0FBRyxFQUFQO0FBQ0EsT0FBRyxjQUFVQyxTQUFWLENBQW9CTixTQUFwQixDQUFILEVBQ0NLLEdBQUdFLElBQUgsQ0FBUWxCLGVBQWVNLE1BQWYsQ0FBc0JnQixNQUF0QixDQUE2QixFQUFDWixLQUFJQyxVQUFVRCxHQUFmLEVBQTdCLEVBQWtERixRQUFsRCxFQUE0REMsUUFBNUQsQ0FBUjs7QUFFRCxPQUFHLGNBQVVVLFdBQVYsQ0FBc0JSLFNBQXRCLEtBQW9DVixZQUF2QyxFQUNDZSxHQUFHRSxJQUFILENBQVFqQixhQUFhSyxNQUFiLENBQW9CZ0IsTUFBcEIsQ0FBMkIsRUFBQ1osS0FBSUMsVUFBVUQsR0FBZixFQUEzQixFQUFnREYsUUFBaEQsRUFBMERDLFFBQTFELENBQVI7O0FBRUQsVUFBT1csUUFBUUMsR0FBUixDQUFZTCxFQUFaLENBQVA7QUFDQSxHQVRPO0FBQUE7QUFkVyxDQUFiOztBQTBCQSxJQUFNTyxrQ0FBVyxTQUFYQSxVQUFXO0FBQUEsS0FBRWIsR0FBRixRQUFFQSxHQUFGO0FBQUEsS0FBUWMsUUFBUixTQUFRQSxRQUFSO0FBQUEsNkJBQWtCQyxTQUFsQjtBQUFBLEtBQWtCQSxTQUFsQixtQ0FBNEIsQ0FBQ0QsU0FBU0UsSUFBVCxDQUFjQyxNQUFkLEdBQXFCSCxTQUFTSSxNQUFULENBQWdCRCxNQUFyQyxHQUE0Q0gsU0FBU0ssT0FBVCxDQUFpQkYsTUFBOUQsSUFBc0UsQ0FBbEc7QUFBQSxRQUNwQjtBQUFBO0FBQUE7QUFDRjtBQUFBO0FBQUEsS0FBSyxPQUFPLEVBQUNGLG9CQUFELEVBQVo7QUFDQyxpQ0FBQyxjQUFEO0FBREQsR0FERTtBQUtBLGNBQVU7QUFDVixPQUFHLENBQUN4QixZQUFKLEVBQ0NBLGVBQWEsb0JBQWtCTCxRQUFsQixFQUEyQmMsR0FBM0IsQ0FBYjtBQUNELFVBQU8sZ0JBQU1vQixhQUFOLENBQW9CN0IsWUFBcEIsQ0FBUDtBQUNBLEdBSkQ7QUFMQyxFQURvQjtBQUFBLENBQWpCOztBQWVQc0IsV0FBV1EsWUFBWCxHQUF3QjtBQUN2QlAsV0FBUyxpQkFBVVE7QUFESSxDQUF4Qjs7a0JBSWVDLE9BQU9DLE1BQVAsQ0FBY1gsVUFBZCxFQUF5QixFQUFDckIsZ0JBQUQsRUFBU2lDLFVBQVNuQyxlQUFlbUMsUUFBakMsRUFBekIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IHtBcHBCYXIsRmxvYXRpbmdBY3Rpb25CdXR0b24sIFBhcGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtjeWFuMzAwIGFzIGJnY30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxuXG5pbXBvcnQge0tub3dsZWRnZX0gZnJvbSBcIi4uL2RiXCJcblxuaW1wb3J0IEJhYnlBcHBCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwLWJhclwiXG5cbmltcG9ydCBUaW1lTWFuYWdlQ3JlYXRvciBmcm9tIFwiLi9jb3JlXCJcblxuY29uc3QgTXlBcHBCYXI9KHByb3BzPT4oXG5cdDxBcHBCYXIgey4uLnByb3BzfSBzdHlsZT17e2JhY2tncm91bmRDb2xvcjpiZ2N9fVxuXHRcdGljb25FbGVtZW50TGVmdD17XG5cdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cblx0XHRcdFx0bWluaT17dHJ1ZX1cblx0XHRcdFx0YmFja2dyb3VuZENvbG9yPXtiZ2N9XG5cdFx0XHRcdHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX1cblx0XHRcdFx0ekRlcHRoPXsxfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdOaIkeeahFxuXHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblx0XHR9XG5cdFx0Lz5cbikpXG5cbmNvbnN0IEJhYnlUaW1lTWFuYWdlPVRpbWVNYW5hZ2VDcmVhdG9yKEJhYnlBcHBCYXIsXCJiYWJ5XCIpXG5sZXQgTXlUaW1lTWFuYWdlXG5cblxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlLG5leHQpPT57XG5cdGxldCBuZXh0U3RhdGU9QmFieVRpbWVNYW5hZ2UucmVkdWNlcihzdGF0ZSxuZXh0KVxuXHRpZihuZXh0U3RhdGU9PXN0YXRlICYmIE15VGltZU1hbmFnZSlcblx0XHRuZXh0U3RhdGU9TXlUaW1lTWFuYWdlLnJlZHVjZXIoc3RhdGUsbmV4dClcblx0cmV0dXJuIG5leHRTdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0QUREOiBrbm93bGVkZ2U9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0bGV0IHtfaWQsdGl0bGUsc2NvcmV9PWtub3dsZWRnZVxuXHRcdGxldCB0YXNrPXtrbm93bGVkZ2U6X2lkLGNvbnRlbnQ6dGl0bGUsc2NvcmV9XG5cdFx0bGV0IHBzPVtdXG5cblx0XHRpZihLbm93bGVkZ2UuaXNGb3JCYWJ5KGtub3dsZWRnZSkpXG5cdFx0XHRwcy5wdXNoKEJhYnlUaW1lTWFuYWdlLkFDVElPTi5BREQodGFzaykoZGlzcGF0Y2gsIGdldFN0YXRlKSlcblxuXHRcdGlmKEtub3dsZWRnZS5pc0ZvclBhcmVudChrbm93bGVkZ2UpICYmIE15VGltZU1hbmFnZSlcblx0XHRcdHBzLnB1c2goTXlUaW1lTWFuYWdlLkFDVElPTi5BREQodGFzaykoZGlzcGF0Y2gsIGdldFN0YXRlKSlcblxuXHRcdHJldHVybiBQcm9taXNlLmFsbChwcylcblx0fSxcblx0UkVNT1ZFOiBrbm93bGVkZ2U9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0bGV0IHBzPVtdXG5cdFx0aWYoS25vd2xlZGdlLmlzRm9yQmFieShrbm93bGVkZ2UpKVxuXHRcdFx0cHMucHVzaChCYWJ5VGltZU1hbmFnZS5BQ1RJT04uUkVNT1ZFKHtfaWQ6a25vd2xlZGdlLl9pZH0pKGRpc3BhdGNoLCBnZXRTdGF0ZSkpXG5cblx0XHRpZihLbm93bGVkZ2UuaXNGb3JQYXJlbnQoa25vd2xlZGdlKSAmJiBNeVRpbWVNYW5hZ2UpXG5cdFx0XHRwcy5wdXNoKE15VGltZU1hbmFnZS5BQ1RJT04uUkVNT1ZFKHtfaWQ6a25vd2xlZGdlLl9pZH0pKGRpc3BhdGNoLCBnZXRTdGF0ZSkpXG5cblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHMpXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9KHtfaWR9LHttdWlUaGVtZSwgbWluSGVpZ2h0PShtdWlUaGVtZS5wYWdlLmhlaWdodC1tdWlUaGVtZS5hcHBCYXIuaGVpZ2h0LW11aVRoZW1lLmZvb3RiYXIuaGVpZ2h0KS8yfSk9PihcbiAgICA8ZGl2PlxuXHRcdDxkaXYgc3R5bGU9e3ttaW5IZWlnaHR9fT5cblx0XHRcdDxCYWJ5VGltZU1hbmFnZS8+XG5cdFx0PC9kaXY+XG5cdFx0e1xuXHRcdFx0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmKCFNeVRpbWVNYW5hZ2UpXG5cdFx0XHRcdFx0TXlUaW1lTWFuYWdlPVRpbWVNYW5hZ2VDcmVhdG9yKE15QXBwQmFyLF9pZClcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlUaW1lTWFuYWdlKVxuXHRcdFx0fSkoKVxuXHRcdH1cbiAgICA8L2Rpdj5cbilcblxuVGltZU1hbmFnZS5jb250ZXh0VHlwZXM9e1xuXHRtdWlUaGVtZTpQcm9wVHlwZXMub2JqZWN0XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVGltZU1hbmFnZSx7cmVkdWNlcixTY29yZVBhZDpCYWJ5VGltZU1hbmFnZS5TY29yZVBhZH0pXG4iXX0=