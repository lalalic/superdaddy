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

var _knowledge = require('./knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledges = require('./knowledges');

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
					return dispatch(_knowledges.ACTION.SELECT_DOCX());
				} }),
			text: '选择docx文案文件' });
	} else {
		content = _react2.default.createElement(
			'div',
			{ className: 'knowledge' },
			_react2.default.createElement(_knowledges.Content, knowledge)
		);
		commands = [{
			action: "保存",
			onSelect: function onSelect(a) {
				return dispatch(_knowledges.ACTION.CREATE()).then(function (a) {
					return router.replace('/knowledge/' + a._id);
				});
			}
		}, {
			action: "新版本",
			icon: _react2.default.createElement(_borderColor2.default, null),
			onSelect: function onSelect(a) {
				return dispatch(_knowledges.ACTION.SELECT_DOCX());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXdLbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRUE7Ozs7SUFFTztJQUFPO0FBRVAsSUFBTSxzQ0FBYSxTQUFiLFlBQWEsY0FBa0M7S0FBaEM7S0FBVyx5QkFBcUI7S0FBVixzQkFBVTs7QUFDM0QsS0FBSSxnQkFBSjtLQUFhLGdCQUFiO0tBQXNCLGlCQUF0QixDQUQyRDs7QUFHM0QsS0FBRyxDQUFDLFNBQUQsRUFBVztBQUNiLFlBQVMsOEJBQUMsS0FBRCxJQUFPLE1BQU0sbURBQVksU0FBUztZQUFHLFNBQVMsbUJBQU8sV0FBUCxFQUFUO0tBQUgsRUFBckIsQ0FBTjtBQUNmLFNBQUssWUFBTCxFQURRLENBQVQsQ0FEYTtFQUFkLE1BR0s7QUFDSixZQUFTOztLQUFLLFdBQVUsV0FBVixFQUFMO0dBQTJCLG1EQUFhLFNBQWIsQ0FBM0I7R0FBVCxDQURJO0FBRUosYUFBUyxDQUNSO0FBQ0MsV0FBTyxJQUFQO0FBQ0MsYUFBUztXQUFHLFNBQVMsbUJBQU8sTUFBUCxFQUFULEVBQTBCLElBQTFCLENBQStCO1lBQUcsT0FBTyxPQUFQLGlCQUE2QixFQUFFLEdBQUY7S0FBaEM7SUFBbEM7R0FISCxFQUtQO0FBQ0EsV0FBTyxLQUFQO0FBQ0MsU0FBSywwREFBTDtBQUNBLGFBQVM7V0FBRyxTQUFTLG1CQUFPLFdBQVAsRUFBVDtJQUFIO0dBUkgsQ0FBVCxDQUZJO0FBYUosWUFBUSxJQUFSLENBYkk7RUFITDs7QUFtQkEsUUFDQzs7SUFBSyxXQUFVLE1BQVYsRUFBTDtFQUNFLE9BREY7RUFFRSxZQUFhLDhCQUFDLFVBQUQ7QUFDYixjQUFVLFNBQVY7QUFDQSxZQUFTLE9BQVQ7QUFDQSxVQUFPLFFBQVAsRUFIYSxDQUFiO0VBSEgsQ0F0QjJEO0NBQWxDOztBQWlDMUIsYUFBYSxZQUFiLEdBQTBCLEVBQUMsUUFBTyxpQkFBVSxNQUFWLEVBQWxDOztrQkFFZSIsImZpbGUiOiJuZXdLbm93bGVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCBJbnNlcnRGaWxlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vbm90ZS1hZGQnXHJcbmltcG9ydCBJY29uQ3JlYXRlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiXHJcblxyXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXHJcblxyXG5pbXBvcnQge0FDVElPTiwgQ29udGVudH0gZnJvbSBcIi4va25vd2xlZGdlc1wiXHJcblxyXG5jb25zdCB7RW1wdHksIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgTmV3S25vd2xlZGdlPSh7a25vd2xlZGdlLCBkaXNwYXRjaH0se3JvdXRlcn0pPT57XHJcblx0bGV0IGNvbnRlbnQsIHByaW1hcnksIGNvbW1hbmRzXHJcblxyXG5cdGlmKCFrbm93bGVkZ2Upe1xyXG5cdFx0Y29udGVudD0oPEVtcHR5IGljb249ezxJbnNlcnRGaWxlIG9uQ2xpY2s9e2E9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKX0vPn1cclxuXHRcdFx0dGV4dD1cIumAieaLqWRvY3jmlofmoYjmlofku7ZcIi8+KVxyXG5cdH1lbHNle1xyXG5cdFx0Y29udGVudD0oPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj48Q29udGVudCB7Li4ua25vd2xlZGdlfS8+PC9kaXY+KVxyXG5cdFx0Y29tbWFuZHM9W1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWN0aW9uOlwi5L+d5a2YXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSgpKS50aGVuKGE9PnJvdXRlci5yZXBsYWNlKGAva25vd2xlZGdlLyR7YS5faWR9YCkpXHJcblx0XHRcdH1cclxuXHRcdFx0LHtcclxuXHRcdFx0XHRhY3Rpb246XCLmlrDniYjmnKxcIlxyXG5cdFx0XHRcdCxpY29uOjxJY29uQ3JlYXRlLz5cclxuXHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLlNFTEVDVF9ET0NYKCkpXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHRcdHByaW1hcnk9XCLkv53lrZhcIlxyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxyXG5cdFx0XHR7Y29udGVudH1cclxuXHRcdFx0e2NvbW1hbmRzICYmICg8Q29tbWFuZEJhclxyXG5cdFx0XHRcdGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdFx0XHRcdHByaW1hcnk9e3ByaW1hcnl9XHJcblx0XHRcdFx0aXRlbXM9e2NvbW1hbmRzfS8+KX1cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuTmV3S25vd2xlZGdlLmNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXdLbm93bGVkZ2VcclxuXHJcbiJdfQ==