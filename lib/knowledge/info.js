'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List,
    Loading = _qiliApp.UI.Loading,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar,
    fileSelector = _qiliApp.UI.fileSelector,
    Messager = _qiliApp.UI.Messager;
var DialogCommand = CommandBar.DialogCommand;

var KnowledgeEditor = function (_Component) {
    _inherits(KnowledgeEditor, _Component);

    function KnowledgeEditor() {
        _classCallCheck(this, KnowledgeEditor);

        return _possibleConstructorReturn(this, (KnowledgeEditor.__proto__ || Object.getPrototypeOf(KnowledgeEditor)).apply(this, arguments));
    }

    _createClass(KnowledgeEditor, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5mby5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiTG9hZGluZyIsIkNvbW1lbnQiLCJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJEaWFsb2dDb21tYW5kIiwiS25vd2xlZGdlRWRpdG9yIiwicHJvcHMiLCJkaXNwYXRjaCIsIkZFVENIMSIsIm5leHQiLCJrbm93bGVkZ2UiLCJfaWQiLCJwYXJhbXMiLCJyZXZpc2luZyIsImluVGFzayIsImNvbW1hbmRzIiwiY3VycmVudCIsImF1dGhvciIsInB1c2giLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJTRUxFQ1RfRE9DWCIsIlVQREFURSIsIkNBTkNFTCIsImxhYmVsIiwiVU5UQVNLIiwiVEFTSyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFT0EsSSxlQUFBQSxJO0lBQUtDLE8sZUFBQUEsTztJQUFRQyxPLGVBQUFBLE87SUFBUUMsVSxlQUFBQSxVO0lBQVdDLFksZUFBQUEsWTtJQUFjQyxRLGVBQUFBLFE7SUFDOUNDLGEsR0FBZUgsVSxDQUFmRyxhOztJQUdjQyxlOzs7Ozs7Ozs7Ozs0Q0FDRTtBQUNyQixpQkFBS0MsS0FBTCxDQUFXQyxRQUFYLENBQW9CLFNBQU9DLE1BQVAsRUFBcEI7QUFDRzs7O2tEQUV5QkMsSSxFQUFLO0FBQUEsZ0JBQzFCQyxTQUQwQixHQUNmLEtBQUtKLEtBRFUsQ0FDMUJJLFNBRDBCOztBQUUzQixnQkFBR0EsYUFBYUEsVUFBVUMsR0FBVixJQUFlRixLQUFLRyxNQUFMLENBQVlELEdBQTNDLEVBQ0lGLEtBQUtGLFFBQUwsQ0FBYyxTQUFPQyxNQUFQLEVBQWQ7QUFDUDs7O2lDQUVPO0FBQUEseUJBQ2dELEtBQUtGLEtBRHJEO0FBQUEsZ0JBQ0hJLFNBREcsVUFDSEEsU0FERztBQUFBLHlDQUNRRyxRQURSO0FBQUEsZ0JBQ1FBLFFBRFIsbUNBQ2lCLEtBRGpCO0FBQUEsdUNBQ3dCQyxNQUR4QjtBQUFBLGdCQUN3QkEsTUFEeEIsaUNBQytCLEtBRC9CO0FBQUEsZ0JBQ3NDUCxRQUR0QyxVQUNzQ0EsUUFEdEM7OztBQUdKLGdCQUFHLENBQUNHLFNBQUosRUFDSSxPQUFRLDhCQUFDLE9BQUQsT0FBUjs7QUFFSixnQkFBSUssV0FBUyxDQUFDLE1BQUQsQ0FBYjs7QUFFQSxnQkFBRyxRQUFRLGNBQUtDLE9BQUwsQ0FBYUwsR0FBYixJQUFrQkQsVUFBVU8sTUFBVixDQUFpQk4sR0FBOUMsRUFDSUksU0FBU0csSUFBVCxDQUFjO0FBQ3RCQyx3QkFBTyxhQURlO0FBRXJCQyxzQkFBSywwREFGZ0I7QUFHckJDLDBCQUFVO0FBQUEsMkJBQUdkLFNBQVMsU0FBT2UsV0FBUCxFQUFULENBQUg7QUFBQTtBQUhXLGFBQWQ7O0FBTUosZ0JBQUdULFFBQUgsRUFBWTtBQUNSRSx5QkFBU0csSUFBVCxDQUFjO0FBQ3RCQyw0QkFBTyxNQURlO0FBRXJCRSw4QkFBVTtBQUFBLCtCQUFHZCxTQUFTLFNBQU9nQixNQUFQLEVBQVQsQ0FBSDtBQUFBO0FBRlcsaUJBQWQ7QUFJQVIseUJBQVNHLElBQVQsQ0FBYztBQUN0QkMsNEJBQU8sUUFEZTtBQUVURSw4QkFBUztBQUFBLCtCQUFHZCxTQUFTLFNBQU9pQixNQUFQLEVBQVQsQ0FBSDtBQUFBLHFCQUZBO0FBR1RKLDBCQUFLO0FBSEksaUJBQWQ7QUFLSCxhQVZELE1BVUs7QUFDVixvQkFBR04sTUFBSCxFQUNDQyxTQUFTRyxJQUFULENBQWM7QUFDYkMsNEJBQU8sYUFETTtBQUVaTSwyQkFBTSxNQUZNO0FBR1pMLDBCQUFNLHVEQUhNO0FBSVpDLDhCQUFTO0FBQUEsK0JBQUdkLFNBQVMsU0FBT21CLE1BQVAsQ0FBY2hCLFNBQWQsQ0FBVCxDQUFIO0FBQUE7QUFKRyxpQkFBZCxFQURELEtBUUNLLFNBQVNHLElBQVQsQ0FBYztBQUNiQyw0QkFBTyxVQURNO0FBRVpNLDJCQUFNLE1BRk07QUFHWkwsMEJBQU0sdURBSE07QUFJWkMsOEJBQVM7QUFBQSwrQkFBR2QsU0FBUyxTQUFPb0IsSUFBUCxDQUFZakIsU0FBWixDQUFULENBQUg7QUFBQTtBQUpHLGlCQUFkOztBQU9RSyx5QkFBU0csSUFBVCxDQUFjLDhCQUFDLFVBQUQsQ0FBWSxPQUFaLElBQW9CLEtBQUksU0FBeEIsRUFBa0MseUJBQWxDLEVBQXFELE9BQU9SLFNBQTVELEdBQWQ7QUFDQUsseUJBQVNHLElBQVQsQ0FBYyw4QkFBQyxVQUFELENBQVksS0FBWixJQUFrQixLQUFJLE9BQXRCLEVBQThCLFNBQVNSLFNBQXZDLEdBQWQ7QUFDSDs7QUFFRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxNQUFmO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsV0FBZjtBQUNYLDZEQUFhQSxTQUFiO0FBRFcsaUJBREo7QUFLSSw4Q0FBQyxVQUFELElBQVksV0FBVSxTQUF0QixFQUFnQyxPQUFPSyxRQUF2QztBQUxKLGFBREo7QUFTSDs7Ozs7O2tCQWpFZ0JWLGUiLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0ZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQge1JhaXNlZEJ1dHRvbiwgRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxyXG5pbXBvcnQgSWNvbkNhbmNlbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2FuY2VsXCJcclxuaW1wb3J0IEljb25BZGRUYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FsYXJtLWFkZFwiXHJcbmltcG9ydCBJY29uUmVtb3ZlVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxyXG5cclxuaW1wb3J0IENhbGVuZGFyLCB7Y25EYXRlVGltZUZvcm1hdCwgYWRkRGF5cywgcmVsYXRpdmUsIGlzRXF1YWxEYXRlLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi4vY29tcG9uZW50cy9jYWxlbmRhcidcclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4uL2RiL2tub3dsZWRnZSdcclxuaW1wb3J0IGRiVGFzayBmcm9tICcuLi9kYi90YXNrJ1xyXG5cclxuaW1wb3J0IHtBQ1RJT04sIENvbnRlbnR9IGZyb20gXCIuXCJcclxuXHJcbmNvbnN0IHtMaXN0LExvYWRpbmcsQ29tbWVudCxDb21tYW5kQmFyLGZpbGVTZWxlY3RvciwgTWVzc2FnZXJ9PVVJXHJcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS25vd2xlZGdlRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goQUNUSU9OLkZFVENIMSgpKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XHJcblx0XHRjb25zdCB7a25vd2xlZGdlfT10aGlzLnByb3BzXHJcbiAgICAgICAgaWYoa25vd2xlZGdlICYmIGtub3dsZWRnZS5faWQhPW5leHQucGFyYW1zLl9pZClcclxuICAgICAgICAgICAgbmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gxKCkpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblx0XHRjb25zdCB7a25vd2xlZGdlLCByZXZpc2luZz1mYWxzZSwgaW5UYXNrPWZhbHNlLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cclxuICAgICAgICBpZigha25vd2xlZGdlKVxyXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXHJcblxyXG4gICAgICAgIHZhciBjb21tYW5kcz1bXCJCYWNrXCJdXHJcblxyXG4gICAgICAgIGlmKHRydWUgfHwgVXNlci5jdXJyZW50Ll9pZD09a25vd2xlZGdlLmF1dGhvci5faWQpXHJcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe1xyXG5cdFx0XHRcdGFjdGlvbjpcIk5ldyBWZXJzaW9uXCJcclxuXHRcdFx0XHQsaWNvbjo8SWNvbkNyZWF0ZS8+XHJcblx0XHRcdFx0LG9uU2VsZWN0OiBhPT5kaXNwYXRjaChBQ1RJT04uU0VMRUNUX0RPQ1goKSlcclxuXHRcdFx0fSlcclxuXHJcbiAgICAgICAgaWYocmV2aXNpbmcpe1xyXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHtcclxuXHRcdFx0XHRhY3Rpb246XCJTYXZlXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6IGE9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoKSlcclxuXHRcdFx0fSlcclxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7XHJcblx0XHRcdFx0YWN0aW9uOlwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgICAgICxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ0FOQ0VMKCkpXHJcbiAgICAgICAgICAgICAgICAsaWNvbjo8SWNvbkNhbmNlbC8+XHJcblx0XHRcdH0pXHJcbiAgICAgICAgfWVsc2V7XHJcblx0XHRcdGlmKGluVGFzaylcclxuXHRcdFx0XHRjb21tYW5kcy5wdXNoKHtcclxuXHRcdFx0XHRcdGFjdGlvbjpcIlJlbW92ZSBUYXNrXCJcclxuXHRcdFx0XHRcdCxsYWJlbDpcIuWIoOmZpOivvueoi1wiXHJcblx0XHRcdFx0XHQsaWNvbjogPEljb25SZW1vdmVUYXNrLz5cclxuXHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVU5UQVNLKGtub3dsZWRnZSkpXHJcblx0XHRcdFx0fSlcclxuICAgICAgICAgICAgZWxzZVxyXG5cdFx0XHRcdGNvbW1hbmRzLnB1c2goe1xyXG5cdFx0XHRcdFx0YWN0aW9uOlwiQWRkIFRhc2tcIlxyXG5cdFx0XHRcdFx0LGxhYmVsOlwi5re75Yqg6K++56iLXCJcclxuXHRcdFx0XHRcdCxpY29uOiA8SWNvbkFkZFRhc2svPlxyXG5cdFx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5UQVNLKGtub3dsZWRnZSkpXHJcblx0XHRcdFx0fSlcclxuXHJcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtrbm93bGVkZ2V9Lz4pXHJcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuU2hhcmUga2V5PVwiU2hhcmVcIiBtZXNzYWdlPXtrbm93bGVkZ2V9Lz4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XHJcblx0XHRcdFx0XHQ8Q29udGVudCB7Li4ua25vd2xlZGdlfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e2NvbW1hbmRzfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4iXX0=