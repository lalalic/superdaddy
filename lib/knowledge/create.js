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
			text: '选择docx文案文件' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvY3JlYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0lBRU87SUFBTztBQUVQLElBQU0sc0NBQWEsU0FBYixZQUFhLGNBQWtDO0tBQWhDO0tBQVcseUJBQXFCO0tBQVYsc0JBQVU7O0FBQzNELEtBQUksZ0JBQUo7S0FBYSxnQkFBYjtLQUFzQixpQkFBdEIsQ0FEMkQ7O0FBRzNELEtBQUcsQ0FBQyxTQUFELEVBQVc7QUFDYixZQUFTLDhCQUFDLEtBQUQsSUFBTyxNQUFNLG1EQUFZLFNBQVM7WUFBRyxTQUFTLFNBQU8sV0FBUCxFQUFUO0tBQUgsRUFBckIsQ0FBTjtBQUNmLFNBQUssWUFBTCxFQURRLENBQVQsQ0FEYTtFQUFkLE1BR0s7QUFDSixZQUFTOztLQUFLLFdBQVUsV0FBVixFQUFMO0dBQTJCLHlDQUFhLFNBQWIsQ0FBM0I7R0FBVCxDQURJO0FBRUosYUFBUyxDQUNSO0FBQ0MsV0FBTyxJQUFQO0FBQ0MsYUFBUztXQUFHLFNBQVMsU0FBTyxNQUFQLEVBQVQsRUFBMEIsSUFBMUIsQ0FBK0I7WUFBRyxPQUFPLE9BQVAsaUJBQTZCLEVBQUUsR0FBRjtLQUFoQztJQUFsQztHQUhILEVBS1A7QUFDQSxXQUFPLEtBQVA7QUFDQyxTQUFLLDBEQUFMO0FBQ0EsYUFBUztXQUFHLFNBQVMsU0FBTyxXQUFQLEVBQVQ7SUFBSDtHQVJILENBQVQsQ0FGSTtBQWFKLFlBQVEsSUFBUixDQWJJO0VBSEw7O0FBbUJBLFFBQ0M7O0lBQUssV0FBVSxNQUFWLEVBQUw7RUFDRSxPQURGO0VBRUUsWUFBYSw4QkFBQyxVQUFEO0FBQ2IsY0FBVSxTQUFWO0FBQ0EsWUFBUyxPQUFUO0FBQ0EsVUFBTyxRQUFQLEVBSGEsQ0FBYjtFQUhILENBdEIyRDtDQUFsQzs7QUFpQzFCLGFBQWEsWUFBYixHQUEwQixFQUFDLFFBQU8saUJBQVUsTUFBVixFQUFsQzs7a0JBRWUiLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBJbnNlcnRGaWxlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vbm90ZS1hZGQnXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxuXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9pbmZvJ1xuXG5pbXBvcnQge0FDVElPTiwgQ29udGVudH0gZnJvbSBcIi5cIlxuXG5jb25zdCB7RW1wdHksIENvbW1hbmRCYXJ9PVVJXG5cbmV4cG9ydCBjb25zdCBOZXdLbm93bGVkZ2U9KHtrbm93bGVkZ2UsIGRpc3BhdGNofSx7cm91dGVyfSk9Pntcblx0bGV0IGNvbnRlbnQsIHByaW1hcnksIGNvbW1hbmRzXG5cblx0aWYoIWtub3dsZWRnZSl7XG5cdFx0Y29udGVudD0oPEVtcHR5IGljb249ezxJbnNlcnRGaWxlIG9uQ2xpY2s9e2E9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKX0vPn1cblx0XHRcdHRleHQ9XCLpgInmi6lkb2N45paH5qGI5paH5Lu2XCIvPilcblx0fWVsc2V7XG5cdFx0Y29udGVudD0oPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj48Q29udGVudCB7Li4ua25vd2xlZGdlfS8+PC9kaXY+KVxuXHRcdGNvbW1hbmRzPVtcblx0XHRcdHtcblx0XHRcdFx0YWN0aW9uOlwi5L+d5a2YXCJcblx0XHRcdFx0LG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUoKSkudGhlbihhPT5yb3V0ZXIucmVwbGFjZShgL2tub3dsZWRnZS8ke2EuX2lkfWApKVxuXHRcdFx0fVxuXHRcdFx0LHtcblx0XHRcdFx0YWN0aW9uOlwi5paw54mI5pysXCJcblx0XHRcdFx0LGljb246PEljb25DcmVhdGUvPlxuXHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLlNFTEVDVF9ET0NYKCkpXG5cdFx0XHR9XG5cdFx0XVxuXHRcdHByaW1hcnk9XCLkv53lrZhcIlxuXHR9XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cblx0XHRcdHtjb250ZW50fVxuXHRcdFx0e2NvbW1hbmRzICYmICg8Q29tbWFuZEJhclxuXHRcdFx0XHRjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0cHJpbWFyeT17cHJpbWFyeX1cblx0XHRcdFx0aXRlbXM9e2NvbW1hbmRzfS8+KX1cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5OZXdLbm93bGVkZ2UuY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblxuZXhwb3J0IGRlZmF1bHQgTmV3S25vd2xlZGdlXG4iXX0=