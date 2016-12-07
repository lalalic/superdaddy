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
			hintText: "任务",
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == 13 && dispatch(_.ACTION.ADD(refTask.state.searchText.trim()));
			}
		})
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90b2RvLWVkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBR08sSUFBTSxrQ0FBVywyQkFBVTtLQUFFO0tBQVU7S0FBUztLQUFTO1FBQy9EO0FBQ0Msb0JBQ0M7OztHQUNDOztNQUFZLFNBQVM7YUFBRyxTQUFTLFNBQU8sR0FBUCxDQUFXLFFBQVEsS0FBUixDQUFjLFVBQWQsQ0FBeUIsSUFBekIsRUFBWCxDQUFUO01BQUgsRUFBckI7SUFDQyx1REFBUyxPQUFNLE9BQU4sRUFBVCxDQUREO0lBREQ7R0FJQzs7TUFBWSxTQUFTO2FBQUcsU0FBUyxTQUFPLE9BQVAsQ0FBZSxVQUFVLENBQVYsR0FBYyxDQUFkLENBQXhCO01BQUgsRUFBckI7SUFDRSxVQUFRLHFEQUFVLE9BQU0sT0FBTixFQUFWLENBQVIsR0FBb0Msb0RBQVUsT0FBTSxPQUFOLEVBQVYsQ0FBcEM7SUFMSDtHQUREO0FBVUEsU0FDQywwREFBYyxLQUFLO1dBQUcsVUFBUSxDQUFSO0lBQUg7QUFDbEIsZUFBWSxFQUFaO0FBQ0EsYUFBUyxJQUFUO0FBQ0EsY0FBVyxJQUFYO0FBQ0EsY0FBVztXQUFHLEVBQUUsT0FBRixJQUFXLEVBQVgsSUFBaUIsU0FBUyxTQUFPLEdBQVAsQ0FBVyxRQUFRLEtBQVIsQ0FBYyxVQUFkLENBQXlCLElBQXpCLEVBQVgsQ0FBVCxDQUFqQjtJQUFIO0dBSlosQ0FERDtFQVhEO0NBRGlDLENBQXJCIiwiZmlsZSI6InRvZG8tZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ljb25CdXR0b24sIEF1dG9Db21wbGV0ZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2F2L3BsYXlsaXN0LWFkZFwiXG5pbXBvcnQgSWNvbkVkaXQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvbW9kZS1lZGl0XCJcbmltcG9ydCBJY29uRG9uZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXG5cbmltcG9ydCBBcHBCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwLWJhclwiXG5cbmltcG9ydCB7QUNUSU9OfSBmcm9tIFwiLlwiXG5cblxuZXhwb3J0IGNvbnN0IFRvZG9FZGl0b3I9Y29ubmVjdCgpKCh7ZGlzcGF0Y2gsIGVkaXRpbmcsIHJlZlRhc2ssIHJlZkZvcm19KT0+KFxuXHQ8QXBwQmFyXG5cdFx0aWNvbkVsZW1lbnRSaWdodD17XG5cdFx0XHQ8c3Bhbj5cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkFERChyZWZUYXNrLnN0YXRlLnNlYXJjaFRleHQudHJpbSgpKSl9PlxuXHRcdFx0XHRcdDxJY29uQWRkIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoZWRpdGluZyA/IDAgOiAxKSl9PlxuXHRcdFx0XHRcdHtlZGl0aW5nPzxJY29uRG9uZSBjb2xvcj1cIndoaXRlXCIvPiA6IDxJY29uRWRpdCBjb2xvcj1cIndoaXRlXCIvPn1cblx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0PC9zcGFuPlxuXHRcdH1cblx0XHR0aXRsZT17XG5cdFx0XHQ8QXV0b0NvbXBsZXRlIHJlZj17YT0+cmVmVGFzaz1hfVxuXHRcdFx0XHRkYXRhU291cmNlPXtbXX1cblx0XHRcdFx0aGludFRleHQ9XCLku7vliqFcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT0xMyAmJiBkaXNwYXRjaChBQ1RJT04uQUREKHJlZlRhc2suc3RhdGUuc2VhcmNoVGV4dC50cmltKCkpKX1cblx0XHRcdFx0Lz5cblx0XHR9XG5cdFx0Lz5cbikpXG4iXX0=