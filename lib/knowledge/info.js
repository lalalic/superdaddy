'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _reactRouter = require('react-router');

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _cancel = require('material-ui/svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

var _alarmAdd = require('material-ui/svg-icons/action/alarm-add');

var _alarmAdd2 = _interopRequireDefault(_alarmAdd);

var _alarmOff = require('material-ui/svg-icons/action/alarm-off');

var _alarmOff2 = _interopRequireDefault(_alarmOff);

var _calendar = require('../components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _knowledge = require('../db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _task = require('../db/task');

var _task2 = _interopRequireDefault(_task);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _qiliApp.UI.List,
    Loading = _qiliApp.UI.Loading,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar,
    fileSelector = _qiliApp.UI.fileSelector,
    Messager = _qiliApp.UI.Messager;
var DialogCommand = CommandBar.DialogCommand;

var KnowledgeEditor = function (_Component) {
    (0, _inherits3.default)(KnowledgeEditor, _Component);

    function KnowledgeEditor() {
        (0, _classCallCheck3.default)(this, KnowledgeEditor);
        return (0, _possibleConstructorReturn3.default)(this, (KnowledgeEditor.__proto__ || (0, _getPrototypeOf2.default)(KnowledgeEditor)).apply(this, arguments));
    }

    (0, _createClass3.default)(KnowledgeEditor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.dispatch(_.ACTION.FETCH1());
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(next) {
            var knowledge = this.props.knowledge;

            if (knowledge && knowledge._id != next.params._id) next.dispatch(_.ACTION.FETCH1());
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                knowledge = _props.knowledge,
                _props$revising = _props.revising,
                revising = _props$revising === undefined ? false : _props$revising,
                _props$inTask = _props.inTask,
                inTask = _props$inTask === undefined ? false : _props$inTask,
                dispatch = _props.dispatch;


            if (!knowledge) return _react2.default.createElement(Loading, null);

            var commands = ["Back"];

            if (true || _qiliApp.User.current._id == knowledge.author._id) commands.push({
                action: "New Version",
                icon: _react2.default.createElement(_borderColor2.default, null),
                onSelect: function onSelect(a) {
                    return dispatch(_.ACTION.SELECT_DOCX());
                }
            });

            if (revising) {
                commands.push({
                    action: "Save",
                    onSelect: function onSelect(a) {
                        return dispatch(_.ACTION.UPDATE());
                    }
                });
                commands.push({
                    action: "Cancel",
                    onSelect: function onSelect(a) {
                        return dispatch(_.ACTION.CANCEL());
                    },
                    icon: _react2.default.createElement(_cancel2.default, null)
                });
            } else {
                if (inTask) commands.push({
                    action: "Remove Task",
                    label: "删除课程",
                    icon: _react2.default.createElement(_alarmOff2.default, null),
                    onSelect: function onSelect(e) {
                        return dispatch(_.ACTION.UNTASK(knowledge));
                    }
                });else commands.push({
                    action: "Add Task",
                    label: "添加课程",
                    icon: _react2.default.createElement(_alarmAdd2.default, null),
                    onSelect: function onSelect(e) {
                        return dispatch(_.ACTION.TASK(knowledge));
                    }
                });

                commands.push(_react2.default.createElement(CommandBar.Comment, { key: 'Comment', type: _knowledge2.default, model: knowledge }));
                commands.push(_react2.default.createElement(CommandBar.Share, { key: 'Share', message: knowledge }));
            }

            return _react2.default.createElement(
                'div',
                { className: 'post' },
                _react2.default.createElement(
                    'div',
                    { className: 'knowledge' },
                    _react2.default.createElement(_.Content, knowledge)
                ),
                _react2.default.createElement(CommandBar, { className: 'footbar', items: commands })
            );
        }
    }]);
    return KnowledgeEditor;
}(_react.Component);

exports.default = KnowledgeEditor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5mby5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiTG9hZGluZyIsIkNvbW1lbnQiLCJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJEaWFsb2dDb21tYW5kIiwiS25vd2xlZGdlRWRpdG9yIiwicHJvcHMiLCJkaXNwYXRjaCIsIkZFVENIMSIsIm5leHQiLCJrbm93bGVkZ2UiLCJfaWQiLCJwYXJhbXMiLCJyZXZpc2luZyIsImluVGFzayIsImNvbW1hbmRzIiwiY3VycmVudCIsImF1dGhvciIsInB1c2giLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJTRUxFQ1RfRE9DWCIsIlVQREFURSIsIkNBTkNFTCIsImxhYmVsIiwiVU5UQVNLIiwiVEFTSyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7SUFFT0EsSSxlQUFBQSxJO0lBQUtDLE8sZUFBQUEsTztJQUFRQyxPLGVBQUFBLE87SUFBUUMsVSxlQUFBQSxVO0lBQVdDLFksZUFBQUEsWTtJQUFjQyxRLGVBQUFBLFE7SUFDOUNDLGEsR0FBZUgsVSxDQUFmRyxhOztJQUdjQyxlOzs7Ozs7Ozs7OzRDQUNFO0FBQ3JCLGlCQUFLQyxLQUFMLENBQVdDLFFBQVgsQ0FBb0IsU0FBT0MsTUFBUCxFQUFwQjtBQUNHOzs7a0RBRXlCQyxJLEVBQUs7QUFBQSxnQkFDMUJDLFNBRDBCLEdBQ2YsS0FBS0osS0FEVSxDQUMxQkksU0FEMEI7O0FBRTNCLGdCQUFHQSxhQUFhQSxVQUFVQyxHQUFWLElBQWVGLEtBQUtHLE1BQUwsQ0FBWUQsR0FBM0MsRUFDSUYsS0FBS0YsUUFBTCxDQUFjLFNBQU9DLE1BQVAsRUFBZDtBQUNQOzs7aUNBRU87QUFBQSx5QkFDZ0QsS0FBS0YsS0FEckQ7QUFBQSxnQkFDSEksU0FERyxVQUNIQSxTQURHO0FBQUEseUNBQ1FHLFFBRFI7QUFBQSxnQkFDUUEsUUFEUixtQ0FDaUIsS0FEakI7QUFBQSx1Q0FDd0JDLE1BRHhCO0FBQUEsZ0JBQ3dCQSxNQUR4QixpQ0FDK0IsS0FEL0I7QUFBQSxnQkFDc0NQLFFBRHRDLFVBQ3NDQSxRQUR0Qzs7O0FBR0osZ0JBQUcsQ0FBQ0csU0FBSixFQUNJLE9BQVEsOEJBQUMsT0FBRCxPQUFSOztBQUVKLGdCQUFJSyxXQUFTLENBQUMsTUFBRCxDQUFiOztBQUVBLGdCQUFHLFFBQVEsY0FBS0MsT0FBTCxDQUFhTCxHQUFiLElBQWtCRCxVQUFVTyxNQUFWLENBQWlCTixHQUE5QyxFQUNJSSxTQUFTRyxJQUFULENBQWM7QUFDdEJDLHdCQUFPLGFBRGU7QUFFckJDLHNCQUFLLDBEQUZnQjtBQUdyQkMsMEJBQVU7QUFBQSwyQkFBR2QsU0FBUyxTQUFPZSxXQUFQLEVBQVQsQ0FBSDtBQUFBO0FBSFcsYUFBZDs7QUFNSixnQkFBR1QsUUFBSCxFQUFZO0FBQ1JFLHlCQUFTRyxJQUFULENBQWM7QUFDdEJDLDRCQUFPLE1BRGU7QUFFckJFLDhCQUFVO0FBQUEsK0JBQUdkLFNBQVMsU0FBT2dCLE1BQVAsRUFBVCxDQUFIO0FBQUE7QUFGVyxpQkFBZDtBQUlBUix5QkFBU0csSUFBVCxDQUFjO0FBQ3RCQyw0QkFBTyxRQURlO0FBRVRFLDhCQUFTO0FBQUEsK0JBQUdkLFNBQVMsU0FBT2lCLE1BQVAsRUFBVCxDQUFIO0FBQUEscUJBRkE7QUFHVEosMEJBQUs7QUFISSxpQkFBZDtBQUtILGFBVkQsTUFVSztBQUNWLG9CQUFHTixNQUFILEVBQ0NDLFNBQVNHLElBQVQsQ0FBYztBQUNiQyw0QkFBTyxhQURNO0FBRVpNLDJCQUFNLE1BRk07QUFHWkwsMEJBQU0sdURBSE07QUFJWkMsOEJBQVM7QUFBQSwrQkFBR2QsU0FBUyxTQUFPbUIsTUFBUCxDQUFjaEIsU0FBZCxDQUFULENBQUg7QUFBQTtBQUpHLGlCQUFkLEVBREQsS0FRQ0ssU0FBU0csSUFBVCxDQUFjO0FBQ2JDLDRCQUFPLFVBRE07QUFFWk0sMkJBQU0sTUFGTTtBQUdaTCwwQkFBTSx1REFITTtBQUlaQyw4QkFBUztBQUFBLCtCQUFHZCxTQUFTLFNBQU9vQixJQUFQLENBQVlqQixTQUFaLENBQVQsQ0FBSDtBQUFBO0FBSkcsaUJBQWQ7O0FBT1FLLHlCQUFTRyxJQUFULENBQWMsOEJBQUMsVUFBRCxDQUFZLE9BQVosSUFBb0IsS0FBSSxTQUF4QixFQUFrQyx5QkFBbEMsRUFBcUQsT0FBT1IsU0FBNUQsR0FBZDtBQUNBSyx5QkFBU0csSUFBVCxDQUFjLDhCQUFDLFVBQUQsQ0FBWSxLQUFaLElBQWtCLEtBQUksT0FBdEIsRUFBOEIsU0FBU1IsU0FBdkMsR0FBZDtBQUNIOztBQUVELG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLE1BQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxXQUFmO0FBQ1gsNkRBQWFBLFNBQWI7QUFEVyxpQkFESjtBQUtJLDhDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCLEVBQWdDLE9BQU9LLFFBQXZDO0FBTEosYUFESjtBQVNIOzs7OztrQkFqRWdCVixlIiwiZmlsZSI6ImluZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7RmlsZSxVSSwgVXNlcn0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge1JhaXNlZEJ1dHRvbiwgRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxuaW1wb3J0IEljb25DYW5jZWwgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2NhbmNlbFwiXG5pbXBvcnQgSWNvbkFkZFRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tYWRkXCJcbmltcG9ydCBJY29uUmVtb3ZlVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxuXG5pbXBvcnQgQ2FsZW5kYXIsIHtjbkRhdGVUaW1lRm9ybWF0LCBhZGREYXlzLCByZWxhdGl2ZSwgaXNFcXVhbERhdGUsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4uL2RiL2tub3dsZWRnZSdcbmltcG9ydCBkYlRhc2sgZnJvbSAnLi4vZGIvdGFzaydcblxuaW1wb3J0IHtBQ1RJT04sIENvbnRlbnR9IGZyb20gXCIuXCJcblxuY29uc3Qge0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS25vd2xlZGdlRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaChBQ1RJT04uRkVUQ0gxKCkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRjb25zdCB7a25vd2xlZGdlfT10aGlzLnByb3BzXG4gICAgICAgIGlmKGtub3dsZWRnZSAmJiBrbm93bGVkZ2UuX2lkIT1uZXh0LnBhcmFtcy5faWQpXG4gICAgICAgICAgICBuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSDEoKSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7a25vd2xlZGdlLCByZXZpc2luZz1mYWxzZSwgaW5UYXNrPWZhbHNlLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXG4gICAgICAgIGlmKCFrbm93bGVkZ2UpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl1cblxuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWtub3dsZWRnZS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7XG5cdFx0XHRcdGFjdGlvbjpcIk5ldyBWZXJzaW9uXCJcblx0XHRcdFx0LGljb246PEljb25DcmVhdGUvPlxuXHRcdFx0XHQsb25TZWxlY3Q6IGE9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKVxuXHRcdFx0fSlcblxuICAgICAgICBpZihyZXZpc2luZyl7XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHtcblx0XHRcdFx0YWN0aW9uOlwiU2F2ZVwiXG5cdFx0XHRcdCxvblNlbGVjdDogYT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURSgpKVxuXHRcdFx0fSlcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0XHRhY3Rpb246XCJDYW5jZWxcIlxuICAgICAgICAgICAgICAgICxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ0FOQ0VMKCkpXG4gICAgICAgICAgICAgICAgLGljb246PEljb25DYW5jZWwvPlxuXHRcdFx0fSlcbiAgICAgICAgfWVsc2V7XG5cdFx0XHRpZihpblRhc2spXG5cdFx0XHRcdGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0XHRcdGFjdGlvbjpcIlJlbW92ZSBUYXNrXCJcblx0XHRcdFx0XHQsbGFiZWw6XCLliKDpmaTor77nqItcIlxuXHRcdFx0XHRcdCxpY29uOiA8SWNvblJlbW92ZVRhc2svPlxuXHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVU5UQVNLKGtub3dsZWRnZSkpXG5cdFx0XHRcdH0pXG4gICAgICAgICAgICBlbHNlXG5cdFx0XHRcdGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0XHRcdGFjdGlvbjpcIkFkZCBUYXNrXCJcblx0XHRcdFx0XHQsbGFiZWw6XCLmt7vliqDor77nqItcIlxuXHRcdFx0XHRcdCxpY29uOiA8SWNvbkFkZFRhc2svPlxuXHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVEFTSyhrbm93bGVkZ2UpKVxuXHRcdFx0XHR9KVxuXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLkNvbW1lbnQga2V5PVwiQ29tbWVudFwiIHR5cGU9e2RiS25vd2xlZGdlfSBtb2RlbD17a25vd2xlZGdlfS8+KVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5TaGFyZSBrZXk9XCJTaGFyZVwiIG1lc3NhZ2U9e2tub3dsZWRnZX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPlxuXHRcdFx0XHRcdDxDb250ZW50IHsuLi5rbm93bGVkZ2V9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17Y29tbWFuZHN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuIl19