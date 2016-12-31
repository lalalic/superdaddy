"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TodoEditor = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _playlistAdd = require("material-ui/svg-icons/av/playlist-add");

var _playlistAdd2 = _interopRequireDefault(_playlistAdd);

var _modeEdit = require("material-ui/svg-icons/editor/mode-edit");

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _appBar = require("../../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoEditor = exports.TodoEditor = (0, _reactRedux.connect)()(function (_ref) {
	var dispatch = _ref.dispatch,
	    editing = _ref.editing,
	    refTask = _ref.refTask,
	    refForm = _ref.refForm;
	return _react2.default.createElement(_appBar2.default, {
		iconElementRight: _react2.default.createElement(
			"span",
			null,
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(_.ACTION.ADD(refTask.state.searchText.trim()));
					} },
				_react2.default.createElement(_playlistAdd2.default, { color: "white" })
			),
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(_.ACTION.EDITING(editing ? 0 : 1));
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
				return e.keyCode == 13 && dispatch(_.ACTION.ADD(refTask.state.searchText.trim()));
			}
		})
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9iYWJ5L3RvZG8tZWRpdG9yLmpzIl0sIm5hbWVzIjpbIlRvZG9FZGl0b3IiLCJkaXNwYXRjaCIsImVkaXRpbmciLCJyZWZUYXNrIiwicmVmRm9ybSIsIkFERCIsInN0YXRlIiwic2VhcmNoVGV4dCIsInRyaW0iLCJFRElUSU5HIiwiYSIsImUiLCJrZXlDb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBR08sSUFBTUEsa0NBQVcsMkJBQVU7QUFBQSxLQUFFQyxRQUFGLFFBQUVBLFFBQUY7QUFBQSxLQUFZQyxPQUFaLFFBQVlBLE9BQVo7QUFBQSxLQUFxQkMsT0FBckIsUUFBcUJBLE9BQXJCO0FBQUEsS0FBOEJDLE9BQTlCLFFBQThCQSxPQUE5QjtBQUFBLFFBQ2pDO0FBQ0Msb0JBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBLE1BQVksU0FBUztBQUFBLGFBQUdILFNBQVMsU0FBT0ksR0FBUCxDQUFXRixRQUFRRyxLQUFSLENBQWNDLFVBQWQsQ0FBeUJDLElBQXpCLEVBQVgsQ0FBVCxDQUFIO0FBQUEsTUFBckI7QUFDQywyREFBUyxPQUFNLE9BQWY7QUFERCxJQUREO0FBSUM7QUFBQTtBQUFBLE1BQVksU0FBUztBQUFBLGFBQUdQLFNBQVMsU0FBT1EsT0FBUCxDQUFlUCxVQUFVLENBQVYsR0FBYyxDQUE3QixDQUFULENBQUg7QUFBQSxNQUFyQjtBQUNFQSxjQUFRLHFEQUFVLE9BQU0sT0FBaEIsR0FBUixHQUFvQyxvREFBVSxPQUFNLE9BQWhCO0FBRHRDO0FBSkQsR0FGRjtBQVdDLFNBQ0MsMERBQWMsS0FBSztBQUFBLFdBQUdDLFVBQVFPLENBQVg7QUFBQSxJQUFuQjtBQUNDLGVBQVksRUFEYjtBQUVDLGFBQVMsY0FGVjtBQUdDLGNBQVcsSUFIWjtBQUlDLGNBQVc7QUFBQSxXQUFHQyxFQUFFQyxPQUFGLElBQVcsRUFBWCxJQUFpQlgsU0FBUyxTQUFPSSxHQUFQLENBQVdGLFFBQVFHLEtBQVIsQ0FBY0MsVUFBZCxDQUF5QkMsSUFBekIsRUFBWCxDQUFULENBQXBCO0FBQUE7QUFKWjtBQVpGLEdBRGlDO0FBQUEsQ0FBVixDQUFqQiIsImZpbGUiOiJ0b2RvLWVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBdXRvQ29tcGxldGV9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hdi9wbGF5bGlzdC1hZGRcIlxuaW1wb3J0IEljb25FZGl0IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL21vZGUtZWRpdFwiXG5pbXBvcnQgSWNvbkRvbmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxuXG5pbXBvcnQgQXBwQmFyIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2FwcC1iYXJcIlxuXG5pbXBvcnQge0FDVElPTn0gZnJvbSBcIi5cIlxuXG5cbmV4cG9ydCBjb25zdCBUb2RvRWRpdG9yPWNvbm5lY3QoKSgoe2Rpc3BhdGNoLCBlZGl0aW5nLCByZWZUYXNrLCByZWZGb3JtfSk9Pihcblx0PEFwcEJhclxuXHRcdGljb25FbGVtZW50UmlnaHQ9e1xuXHRcdFx0PHNwYW4+XG5cdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5BREQocmVmVGFzay5zdGF0ZS5zZWFyY2hUZXh0LnRyaW0oKSkpfT5cblx0XHRcdFx0XHQ8SWNvbkFkZCBjb2xvcj1cIndoaXRlXCIvPlxuXHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5FRElUSU5HKGVkaXRpbmcgPyAwIDogMSkpfT5cblx0XHRcdFx0XHR7ZWRpdGluZz88SWNvbkRvbmUgY29sb3I9XCJ3aGl0ZVwiLz4gOiA8SWNvbkVkaXQgY29sb3I9XCJ3aGl0ZVwiLz59XG5cdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdDwvc3Bhbj5cblx0XHR9XG5cdFx0dGl0bGU9e1xuXHRcdFx0PEF1dG9Db21wbGV0ZSByZWY9e2E9PnJlZlRhc2s9YX1cblx0XHRcdFx0ZGF0YVNvdXJjZT17W119XG5cdFx0XHRcdGhpbnRUZXh0PVwi5Lu75YqhXCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09MTMgJiYgZGlzcGF0Y2goQUNUSU9OLkFERChyZWZUYXNrLnN0YXRlLnNlYXJjaFRleHQudHJpbSgpKSl9XG5cdFx0XHRcdC8+XG5cdFx0fVxuXHRcdC8+XG4pKVxuIl19