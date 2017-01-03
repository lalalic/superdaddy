'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NewKnowledge = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require('qili-app');

var _noteAdd = require('material-ui/svg-icons/action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Empty = _qiliApp.UI.Empty,
    CommandBar = _qiliApp.UI.CommandBar;
var NewKnowledge = exports.NewKnowledge = function NewKnowledge(_ref, _ref2) {
	var knowledge = _ref.knowledge,
	    dispatch = _ref.dispatch;
	var router = _ref2.router;

	var content = void 0,
	    primary = void 0,
	    commands = void 0;

	if (!knowledge) {
		content = _react2.default.createElement(Empty, { icon: _react2.default.createElement(_noteAdd2.default, { onClick: function onClick(a) {
					return dispatch(_.ACTION.SELECT_DOCX());
				} }),
			text: '\u9009\u62E9docx\u6587\u6848\u6587\u4EF6' });
	} else {
		content = _react2.default.createElement(
			'div',
			{ className: 'knowledge' },
			_react2.default.createElement(_.Content, knowledge)
		);
		commands = [{
			action: "保存",
			onSelect: function onSelect(a) {
				return dispatch(_.ACTION.CREATE()).then(function (a) {
					return router.replace('/knowledge/' + a._id);
				});
			}
		}, {
			action: "新版本",
			icon: _react2.default.createElement(_borderColor2.default, null),
			onSelect: function onSelect(a) {
				return dispatch(_.ACTION.SELECT_DOCX());
			}
		}];
		primary = "保存";
	}

	return _react2.default.createElement(
		'div',
		{ className: 'post' },
		content,
		commands && _react2.default.createElement(CommandBar, {
			className: 'footbar',
			primary: primary,
			items: commands })
	);
};

NewKnowledge.contextTypes = { router: _react.PropTypes.object };

exports.default = NewKnowledge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvY3JlYXRlLmpzIl0sIm5hbWVzIjpbIkVtcHR5IiwiQ29tbWFuZEJhciIsIk5ld0tub3dsZWRnZSIsImtub3dsZWRnZSIsImRpc3BhdGNoIiwicm91dGVyIiwiY29udGVudCIsInByaW1hcnkiLCJjb21tYW5kcyIsIlNFTEVDVF9ET0NYIiwiYWN0aW9uIiwib25TZWxlY3QiLCJDUkVBVEUiLCJ0aGVuIiwicmVwbGFjZSIsImEiLCJfaWQiLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztJQUVPQSxLLGVBQUFBLEs7SUFBT0MsVSxlQUFBQSxVO0FBRVAsSUFBTUMsc0NBQWEsU0FBYkEsWUFBYSxjQUFrQztBQUFBLEtBQWhDQyxTQUFnQyxRQUFoQ0EsU0FBZ0M7QUFBQSxLQUFyQkMsUUFBcUIsUUFBckJBLFFBQXFCO0FBQUEsS0FBVkMsTUFBVSxTQUFWQSxNQUFVOztBQUMzRCxLQUFJQyxnQkFBSjtBQUFBLEtBQWFDLGdCQUFiO0FBQUEsS0FBc0JDLGlCQUF0Qjs7QUFFQSxLQUFHLENBQUNMLFNBQUosRUFBYztBQUNiRyxZQUFTLDhCQUFDLEtBQUQsSUFBTyxNQUFNLG1EQUFZLFNBQVM7QUFBQSxZQUFHRixTQUFTLFNBQU9LLFdBQVAsRUFBVCxDQUFIO0FBQUEsS0FBckIsR0FBYjtBQUNSLFNBQUssMENBREcsR0FBVDtBQUVBLEVBSEQsTUFHSztBQUNKSCxZQUFTO0FBQUE7QUFBQSxLQUFLLFdBQVUsV0FBZjtBQUEyQiw0Q0FBYUgsU0FBYjtBQUEzQixHQUFUO0FBQ0FLLGFBQVMsQ0FDUjtBQUNDRSxXQUFPLElBRFI7QUFFRUMsYUFBUztBQUFBLFdBQUdQLFNBQVMsU0FBT1EsTUFBUCxFQUFULEVBQTBCQyxJQUExQixDQUErQjtBQUFBLFlBQUdSLE9BQU9TLE9BQVAsaUJBQTZCQyxFQUFFQyxHQUEvQixDQUFIO0FBQUEsS0FBL0IsQ0FBSDtBQUFBO0FBRlgsR0FEUSxFQUtQO0FBQ0FOLFdBQU8sS0FEUDtBQUVDTyxTQUFLLDBEQUZOO0FBR0NOLGFBQVM7QUFBQSxXQUFHUCxTQUFTLFNBQU9LLFdBQVAsRUFBVCxDQUFIO0FBQUE7QUFIVixHQUxPLENBQVQ7QUFXQUYsWUFBUSxJQUFSO0FBQ0E7O0FBRUQsUUFDQztBQUFBO0FBQUEsSUFBSyxXQUFVLE1BQWY7QUFDRUQsU0FERjtBQUVFRSxjQUFhLDhCQUFDLFVBQUQ7QUFDYixjQUFVLFNBREc7QUFFYixZQUFTRCxPQUZJO0FBR2IsVUFBT0MsUUFITTtBQUZmLEVBREQ7QUFTQSxDQS9CTTs7QUFpQ1BOLGFBQWFnQixZQUFiLEdBQTBCLEVBQUNiLFFBQU8saUJBQVVjLE1BQWxCLEVBQTFCOztrQkFFZWpCLFkiLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQgSW5zZXJ0RmlsZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkJ1xyXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxyXG5cclxuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4vaW5mbydcclxuXHJcbmltcG9ydCB7QUNUSU9OLCBDb250ZW50fSBmcm9tIFwiLlwiXHJcblxyXG5jb25zdCB7RW1wdHksIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgTmV3S25vd2xlZGdlPSh7a25vd2xlZGdlLCBkaXNwYXRjaH0se3JvdXRlcn0pPT57XHJcblx0bGV0IGNvbnRlbnQsIHByaW1hcnksIGNvbW1hbmRzXHJcblxyXG5cdGlmKCFrbm93bGVkZ2Upe1xyXG5cdFx0Y29udGVudD0oPEVtcHR5IGljb249ezxJbnNlcnRGaWxlIG9uQ2xpY2s9e2E9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKX0vPn1cclxuXHRcdFx0dGV4dD1cIumAieaLqWRvY3jmlofmoYjmlofku7ZcIi8+KVxyXG5cdH1lbHNle1xyXG5cdFx0Y29udGVudD0oPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj48Q29udGVudCB7Li4ua25vd2xlZGdlfS8+PC9kaXY+KVxyXG5cdFx0Y29tbWFuZHM9W1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWN0aW9uOlwi5L+d5a2YXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSgpKS50aGVuKGE9PnJvdXRlci5yZXBsYWNlKGAva25vd2xlZGdlLyR7YS5faWR9YCkpXHJcblx0XHRcdH1cclxuXHRcdFx0LHtcclxuXHRcdFx0XHRhY3Rpb246XCLmlrDniYjmnKxcIlxyXG5cdFx0XHRcdCxpY29uOjxJY29uQ3JlYXRlLz5cclxuXHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLlNFTEVDVF9ET0NYKCkpXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHRcdHByaW1hcnk9XCLkv53lrZhcIlxyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxyXG5cdFx0XHR7Y29udGVudH1cclxuXHRcdFx0e2NvbW1hbmRzICYmICg8Q29tbWFuZEJhclxyXG5cdFx0XHRcdGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdFx0XHRcdHByaW1hcnk9e3ByaW1hcnl9XHJcblx0XHRcdFx0aXRlbXM9e2NvbW1hbmRzfS8+KX1cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuTmV3S25vd2xlZGdlLmNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXdLbm93bGVkZ2VcclxuIl19