"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TodoEditor = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _playlistAdd = require("material-ui/svg-icons/av/playlist-add");

var _playlistAdd2 = _interopRequireDefault(_playlistAdd);

var _modeEdit = require("material-ui/svg-icons/editor/mode-edit");

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoEditor = exports.TodoEditor = function TodoEditor(_ref, _ref2) {
	var editing = _ref.editing,
	    refTask = _ref.refTask,
	    refForm = _ref.refForm;
	var dispatch = _ref2.dispatch,
	    ACTION = _ref2.ACTION,
	    AppBar = _ref2.AppBar;
	return _react2.default.cloneElement(AppBar, {
		iconElementRight: _react2.default.createElement(
			"span",
			null,
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(ACTION.ADD(refTask.state.searchText.trim()));
					} },
				_react2.default.createElement(_playlistAdd2.default, { color: "white" })
			),
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(ACTION.EDITING(editing ? 0 : 1));
					} },
				editing ? _react2.default.createElement(_cloudDone2.default, { color: "white" }) : _react2.default.createElement(_modeEdit2.default, { color: "white" })
			)
		),
		title: _react2.default.createElement(_materialUi.AutoComplete, { ref: function ref(a) {
				return refTask = a;
			},
			dataSource: [],
			hintText: "\u4EFB\u52A1",
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == 13 && dispatch(ACTION.ADD(refTask.state.searchText.trim()));
			}
		})
	});
};

TodoEditor.contextTypes = {
	AppBar: _react.PropTypes.element,
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3RvZG8tZWRpdG9yLmpzIl0sIm5hbWVzIjpbIlRvZG9FZGl0b3IiLCJlZGl0aW5nIiwicmVmVGFzayIsInJlZkZvcm0iLCJkaXNwYXRjaCIsIkFDVElPTiIsIkFwcEJhciIsImNsb25lRWxlbWVudCIsImljb25FbGVtZW50UmlnaHQiLCJBREQiLCJzdGF0ZSIsInNlYXJjaFRleHQiLCJ0cmltIiwiRURJVElORyIsInRpdGxlIiwiYSIsImUiLCJrZXlDb2RlIiwiY29udGV4dFR5cGVzIiwiZWxlbWVudCIsIm9iamVjdCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsa0NBQVcsU0FBWEEsVUFBVztBQUFBLEtBQUVDLE9BQUYsUUFBRUEsT0FBRjtBQUFBLEtBQVdDLE9BQVgsUUFBV0EsT0FBWDtBQUFBLEtBQW9CQyxPQUFwQixRQUFvQkEsT0FBcEI7QUFBQSxLQUE4QkMsUUFBOUIsU0FBOEJBLFFBQTlCO0FBQUEsS0FBdUNDLE1BQXZDLFNBQXVDQSxNQUF2QztBQUFBLEtBQThDQyxNQUE5QyxTQUE4Q0EsTUFBOUM7QUFBQSxRQUF3RCxnQkFBTUMsWUFBTixDQUFtQkQsTUFBbkIsRUFBMkI7QUFDMUdFLG9CQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxNQUFZLFNBQVM7QUFBQSxhQUFHSixTQUFTQyxPQUFPSSxHQUFQLENBQVdQLFFBQVFRLEtBQVIsQ0FBY0MsVUFBZCxDQUF5QkMsSUFBekIsRUFBWCxDQUFULENBQUg7QUFBQSxNQUFyQjtBQUNDLDJEQUFTLE9BQU0sT0FBZjtBQURELElBREQ7QUFJQztBQUFBO0FBQUEsTUFBWSxTQUFTO0FBQUEsYUFBR1IsU0FBU0MsT0FBT1EsT0FBUCxDQUFlWixVQUFVLENBQVYsR0FBYyxDQUE3QixDQUFULENBQUg7QUFBQSxNQUFyQjtBQUNFQSxjQUFRLHFEQUFVLE9BQU0sT0FBaEIsR0FBUixHQUFvQyxvREFBVSxPQUFNLE9BQWhCO0FBRHRDO0FBSkQsR0FGeUc7QUFXMUdhLFNBQ0MsMERBQWMsS0FBSztBQUFBLFdBQUdaLFVBQVFhLENBQVg7QUFBQSxJQUFuQjtBQUNDLGVBQVksRUFEYjtBQUVDLGFBQVMsY0FGVjtBQUdDLGNBQVcsSUFIWjtBQUlDLGNBQVc7QUFBQSxXQUFHQyxFQUFFQyxPQUFGLElBQVcsRUFBWCxJQUFpQmIsU0FBU0MsT0FBT0ksR0FBUCxDQUFXUCxRQUFRUSxLQUFSLENBQWNDLFVBQWQsQ0FBeUJDLElBQXpCLEVBQVgsQ0FBVCxDQUFwQjtBQUFBO0FBSlo7QUFaeUcsRUFBM0IsQ0FBeEQ7QUFBQSxDQUFqQjs7QUFxQlBaLFdBQVdrQixZQUFYLEdBQXdCO0FBQ3ZCWixTQUFRLGlCQUFVYSxPQURLO0FBRXZCZCxTQUFRLGlCQUFVZSxNQUZLO0FBR3ZCaEIsV0FBVSxpQkFBVWlCO0FBSEcsQ0FBeEIiLCJmaWxlIjoidG9kby1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2F2L3BsYXlsaXN0LWFkZFwiXG5pbXBvcnQgSWNvbkVkaXQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvbW9kZS1lZGl0XCJcbmltcG9ydCBJY29uRG9uZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXG5cbmV4cG9ydCBjb25zdCBUb2RvRWRpdG9yPSh7ZWRpdGluZywgcmVmVGFzaywgcmVmRm9ybX0se2Rpc3BhdGNoLEFDVElPTixBcHBCYXJ9KT0+UmVhY3QuY2xvbmVFbGVtZW50KEFwcEJhciwge1xuXHRpY29uRWxlbWVudFJpZ2h0Oihcblx0XHQ8c3Bhbj5cblx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5BREQocmVmVGFzay5zdGF0ZS5zZWFyY2hUZXh0LnRyaW0oKSkpfT5cblx0XHRcdFx0PEljb25BZGQgY29sb3I9XCJ3aGl0ZVwiLz5cblx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5FRElUSU5HKGVkaXRpbmcgPyAwIDogMSkpfT5cblx0XHRcdFx0e2VkaXRpbmc/PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+IDogPEljb25FZGl0IGNvbG9yPVwid2hpdGVcIi8+fVxuXHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdDwvc3Bhbj5cblx0KSxcblx0dGl0bGU6KFxuXHRcdDxBdXRvQ29tcGxldGUgcmVmPXthPT5yZWZUYXNrPWF9XG5cdFx0XHRkYXRhU291cmNlPXtbXX1cblx0XHRcdGhpbnRUZXh0PVwi5Lu75YqhXCJcblx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT0xMyAmJiBkaXNwYXRjaChBQ1RJT04uQUREKHJlZlRhc2suc3RhdGUuc2VhcmNoVGV4dC50cmltKCkpKX1cblx0XHRcdC8+XG5cdClcbn0pXG5cblRvZG9FZGl0b3IuY29udGV4dFR5cGVzPXtcblx0QXBwQmFyOiBQcm9wVHlwZXMuZWxlbWVudCxcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmNcbn1cbiJdfQ==