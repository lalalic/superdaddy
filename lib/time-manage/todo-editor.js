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

var _appBar = require("../components/app-bar");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90b2RvLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJUb2RvRWRpdG9yIiwiZGlzcGF0Y2giLCJlZGl0aW5nIiwicmVmVGFzayIsInJlZkZvcm0iLCJBREQiLCJzdGF0ZSIsInNlYXJjaFRleHQiLCJ0cmltIiwiRURJVElORyIsImEiLCJlIiwia2V5Q29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUdPLElBQU1BLGtDQUFXLDJCQUFVO0FBQUEsS0FBRUMsUUFBRixRQUFFQSxRQUFGO0FBQUEsS0FBWUMsT0FBWixRQUFZQSxPQUFaO0FBQUEsS0FBcUJDLE9BQXJCLFFBQXFCQSxPQUFyQjtBQUFBLEtBQThCQyxPQUE5QixRQUE4QkEsT0FBOUI7QUFBQSxRQUNqQztBQUNDLG9CQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxNQUFZLFNBQVM7QUFBQSxhQUFHSCxTQUFTLFNBQU9JLEdBQVAsQ0FBV0YsUUFBUUcsS0FBUixDQUFjQyxVQUFkLENBQXlCQyxJQUF6QixFQUFYLENBQVQsQ0FBSDtBQUFBLE1BQXJCO0FBQ0MsMkRBQVMsT0FBTSxPQUFmO0FBREQsSUFERDtBQUlDO0FBQUE7QUFBQSxNQUFZLFNBQVM7QUFBQSxhQUFHUCxTQUFTLFNBQU9RLE9BQVAsQ0FBZVAsVUFBVSxDQUFWLEdBQWMsQ0FBN0IsQ0FBVCxDQUFIO0FBQUEsTUFBckI7QUFDRUEsY0FBUSxxREFBVSxPQUFNLE9BQWhCLEdBQVIsR0FBb0Msb0RBQVUsT0FBTSxPQUFoQjtBQUR0QztBQUpELEdBRkY7QUFXQyxTQUNDLDBEQUFjLEtBQUs7QUFBQSxXQUFHQyxVQUFRTyxDQUFYO0FBQUEsSUFBbkI7QUFDQyxlQUFZLEVBRGI7QUFFQyxhQUFTLGNBRlY7QUFHQyxjQUFXLElBSFo7QUFJQyxjQUFXO0FBQUEsV0FBR0MsRUFBRUMsT0FBRixJQUFXLEVBQVgsSUFBaUJYLFNBQVMsU0FBT0ksR0FBUCxDQUFXRixRQUFRRyxLQUFSLENBQWNDLFVBQWQsQ0FBeUJDLElBQXpCLEVBQVgsQ0FBVCxDQUFwQjtBQUFBO0FBSlo7QUFaRixHQURpQztBQUFBLENBQVYsQ0FBakIiLCJmaWxlIjoidG9kby1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYXYvcGxheWxpc3QtYWRkXCJcbmltcG9ydCBJY29uRWRpdCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXRcIlxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcblxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9hcHAtYmFyXCJcblxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuXCJcblxuXG5leHBvcnQgY29uc3QgVG9kb0VkaXRvcj1jb25uZWN0KCkoKHtkaXNwYXRjaCwgZWRpdGluZywgcmVmVGFzaywgcmVmRm9ybX0pPT4oXG5cdDxBcHBCYXJcblx0XHRpY29uRWxlbWVudFJpZ2h0PXtcblx0XHRcdDxzcGFuPlxuXHRcdFx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uQUREKHJlZlRhc2suc3RhdGUuc2VhcmNoVGV4dC50cmltKCkpKX0+XG5cdFx0XHRcdFx0PEljb25BZGQgY29sb3I9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRURJVElORyhlZGl0aW5nID8gMCA6IDEpKX0+XG5cdFx0XHRcdFx0e2VkaXRpbmc/PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+IDogPEljb25FZGl0IGNvbG9yPVwid2hpdGVcIi8+fVxuXHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHQ8L3NwYW4+XG5cdFx0fVxuXHRcdHRpdGxlPXtcblx0XHRcdDxBdXRvQ29tcGxldGUgcmVmPXthPT5yZWZUYXNrPWF9XG5cdFx0XHRcdGRhdGFTb3VyY2U9e1tdfVxuXHRcdFx0XHRoaW50VGV4dD1cIuS7u+WKoVwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PTEzICYmIGRpc3BhdGNoKEFDVElPTi5BREQocmVmVGFzay5zdGF0ZS5zZWFyY2hUZXh0LnRyaW0oKSkpfVxuXHRcdFx0XHQvPlxuXHRcdH1cblx0XHQvPlxuKSlcbiJdfQ==