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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3RvZG8tZWRpdG9yLmpzIl0sIm5hbWVzIjpbIlRvZG9FZGl0b3IiLCJlZGl0aW5nIiwicmVmVGFzayIsInJlZkZvcm0iLCJkaXNwYXRjaCIsIkFDVElPTiIsIkFwcEJhciIsImNsb25lRWxlbWVudCIsImljb25FbGVtZW50UmlnaHQiLCJBREQiLCJzdGF0ZSIsInNlYXJjaFRleHQiLCJ0cmltIiwiRURJVElORyIsInRpdGxlIiwiYSIsImUiLCJrZXlDb2RlIiwiY29udGV4dFR5cGVzIiwiZWxlbWVudCIsIm9iamVjdCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsa0NBQVcsU0FBWEEsVUFBVztBQUFBLEtBQUVDLE9BQUYsUUFBRUEsT0FBRjtBQUFBLEtBQVdDLE9BQVgsUUFBV0EsT0FBWDtBQUFBLEtBQW9CQyxPQUFwQixRQUFvQkEsT0FBcEI7QUFBQSxLQUE4QkMsUUFBOUIsU0FBOEJBLFFBQTlCO0FBQUEsS0FBdUNDLE1BQXZDLFNBQXVDQSxNQUF2QztBQUFBLEtBQThDQyxNQUE5QyxTQUE4Q0EsTUFBOUM7QUFBQSxRQUF3RCxnQkFBTUMsWUFBTixDQUFtQkQsTUFBbkIsRUFBMkI7QUFDMUdFLG9CQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxNQUFZLFNBQVM7QUFBQSxhQUFHSixTQUFTQyxPQUFPSSxHQUFQLENBQVdQLFFBQVFRLEtBQVIsQ0FBY0MsVUFBZCxDQUF5QkMsSUFBekIsRUFBWCxDQUFULENBQUg7QUFBQSxNQUFyQjtBQUNDLDJEQUFTLE9BQU0sT0FBZjtBQURELElBREQ7QUFJQztBQUFBO0FBQUEsTUFBWSxTQUFTO0FBQUEsYUFBR1IsU0FBU0MsT0FBT1EsT0FBUCxDQUFlWixVQUFVLENBQVYsR0FBYyxDQUE3QixDQUFULENBQUg7QUFBQSxNQUFyQjtBQUNFQSxjQUFRLHFEQUFVLE9BQU0sT0FBaEIsR0FBUixHQUFvQyxvREFBVSxPQUFNLE9BQWhCO0FBRHRDO0FBSkQsR0FGeUc7QUFXMUdhLFNBQ0MsMERBQWMsS0FBSztBQUFBLFdBQUdaLFVBQVFhLENBQVg7QUFBQSxJQUFuQjtBQUNDLGVBQVksRUFEYjtBQUVDLGFBQVMsY0FGVjtBQUdDLGNBQVcsSUFIWjtBQUlDLGNBQVc7QUFBQSxXQUFHQyxFQUFFQyxPQUFGLElBQVcsRUFBWCxJQUFpQmIsU0FBU0MsT0FBT0ksR0FBUCxDQUFXUCxRQUFRUSxLQUFSLENBQWNDLFVBQWQsQ0FBeUJDLElBQXpCLEVBQVgsQ0FBVCxDQUFwQjtBQUFBO0FBSlo7QUFaeUcsRUFBM0IsQ0FBeEQ7QUFBQSxDQUFqQjs7QUFxQlBaLFdBQVdrQixZQUFYLEdBQXdCO0FBQ3ZCWixTQUFRLGlCQUFVYSxPQURLO0FBRXZCZCxTQUFRLGlCQUFVZSxNQUZLO0FBR3ZCaEIsV0FBVSxpQkFBVWlCO0FBSEcsQ0FBeEIiLCJmaWxlIjoidG9kby1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtJY29uQnV0dG9uLCBBdXRvQ29tcGxldGV9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2F2L3BsYXlsaXN0LWFkZFwiXHJcbmltcG9ydCBJY29uRWRpdCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXRcIlxyXG5pbXBvcnQgSWNvbkRvbmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFRvZG9FZGl0b3I9KHtlZGl0aW5nLCByZWZUYXNrLCByZWZGb3JtfSx7ZGlzcGF0Y2gsQUNUSU9OLEFwcEJhcn0pPT5SZWFjdC5jbG9uZUVsZW1lbnQoQXBwQmFyLCB7XHJcblx0aWNvbkVsZW1lbnRSaWdodDooXHJcblx0XHQ8c3Bhbj5cclxuXHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkFERChyZWZUYXNrLnN0YXRlLnNlYXJjaFRleHQudHJpbSgpKSl9PlxyXG5cdFx0XHRcdDxJY29uQWRkIGNvbG9yPVwid2hpdGVcIi8+XHJcblx0XHRcdDwvSWNvbkJ1dHRvbj5cclxuXHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoZWRpdGluZyA/IDAgOiAxKSl9PlxyXG5cdFx0XHRcdHtlZGl0aW5nPzxJY29uRG9uZSBjb2xvcj1cIndoaXRlXCIvPiA6IDxJY29uRWRpdCBjb2xvcj1cIndoaXRlXCIvPn1cclxuXHRcdFx0PC9JY29uQnV0dG9uPlxyXG5cdFx0PC9zcGFuPlxyXG5cdCksXHJcblx0dGl0bGU6KFxyXG5cdFx0PEF1dG9Db21wbGV0ZSByZWY9e2E9PnJlZlRhc2s9YX1cclxuXHRcdFx0ZGF0YVNvdXJjZT17W119XHJcblx0XHRcdGhpbnRUZXh0PVwi5Lu75YqhXCJcclxuXHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09MTMgJiYgZGlzcGF0Y2goQUNUSU9OLkFERChyZWZUYXNrLnN0YXRlLnNlYXJjaFRleHQudHJpbSgpKSl9XHJcblx0XHRcdC8+XHJcblx0KVxyXG59KVxyXG5cclxuVG9kb0VkaXRvci5jb250ZXh0VHlwZXM9e1xyXG5cdEFwcEJhcjogUHJvcFR5cGVzLmVsZW1lbnQsXHJcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xyXG59XHJcbiJdfQ==