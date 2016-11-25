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

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _task = require('./db/task');

var _task2 = _interopRequireDefault(_task);

var _knowledges = require('./knowledges');

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
            this.props.dispatch(_knowledges.ACTION.FETCH1());
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(next) {
            var knowledge = this.props.knowledge;

            if (knowledge && knowledge._id != next.params._id) next.dispatch(_knowledges.ACTION.FETCH1());
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
                    return dispatch(_knowledges.ACTION.SELECT_DOCX());
                }
            });

            if (revising) {
                commands.push({
                    action: "Save",
                    onSelect: function onSelect(a) {
                        return dispatch(_knowledges.ACTION.UPDATE());
                    }
                });
                commands.push({
                    action: "Cancel",
                    onSelect: function onSelect(a) {
                        return dispatch(_knowledges.ACTION.CANCEL());
                    },
                    icon: _react2.default.createElement(_cancel2.default, null)
                });
            } else {
                if (inTask) commands.push({
                    action: "Remove Task",
                    label: "删除课程",
                    icon: _react2.default.createElement(_alarmOff2.default, null),
                    onSelect: function onSelect(e) {
                        return dispatch(_knowledges.ACTION.UNTASK(knowledge));
                    }
                });else commands.push({
                    action: "Add Task",
                    label: "添加课程",
                    icon: _react2.default.createElement(_alarmAdd2.default, null),
                    onSelect: function onSelect(e) {
                        return dispatch(_knowledges.ACTION.TASK(knowledge));
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
                    _react2.default.createElement(_knowledges.Content, knowledge)
                ),
                _react2.default.createElement(CommandBar, { className: 'footbar', items: commands })
            );
        }
    }]);
    return KnowledgeEditor;
}(_react.Component);

exports.default = KnowledgeEditor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7SUFFTztJQUFLO0lBQVE7SUFBUTtJQUFXO0lBQWM7SUFDOUMsZ0JBQWUsV0FBZjs7SUFHYzs7Ozs7Ozs7Ozs0Q0FDRTtBQUNyQixpQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixtQkFBTyxNQUFQLEVBQXBCLEVBRHFCOzs7O2tEQUlPLE1BQUs7Z0JBQzFCLFlBQVcsS0FBSyxLQUFMLENBQVgsVUFEMEI7O0FBRTNCLGdCQUFHLGFBQWEsVUFBVSxHQUFWLElBQWUsS0FBSyxNQUFMLENBQVksR0FBWixFQUMzQixLQUFLLFFBQUwsQ0FBYyxtQkFBTyxNQUFQLEVBQWQsRUFESjs7OztpQ0FJSTt5QkFDZ0QsS0FBSyxLQUFMO2dCQUFuRDt5Q0FBVzsyREFBUzt1Q0FBTzt1REFBTztnQkFBTywyQkFEdEM7OztBQUdKLGdCQUFHLENBQUMsU0FBRCxFQUNDLE9BQVEsOEJBQUMsT0FBRCxPQUFSLENBREo7O0FBR0EsZ0JBQUksV0FBUyxDQUFDLE1BQUQsQ0FBVCxDQU5BOztBQVFKLGdCQUFHLFFBQVEsY0FBSyxPQUFMLENBQWEsR0FBYixJQUFrQixVQUFVLE1BQVYsQ0FBaUIsR0FBakIsRUFDekIsU0FBUyxJQUFULENBQWM7QUFDdEIsd0JBQU8sYUFBUDtBQUNDLHNCQUFLLDBEQUFMO0FBQ0EsMEJBQVU7MkJBQUcsU0FBUyxtQkFBTyxXQUFQLEVBQVQ7aUJBQUg7YUFISCxFQURKOztBQU9BLGdCQUFHLFFBQUgsRUFBWTtBQUNSLHlCQUFTLElBQVQsQ0FBYztBQUN0Qiw0QkFBTyxNQUFQO0FBQ0MsOEJBQVU7K0JBQUcsU0FBUyxtQkFBTyxNQUFQLEVBQVQ7cUJBQUg7aUJBRkgsRUFEUTtBQUtSLHlCQUFTLElBQVQsQ0FBYztBQUN0Qiw0QkFBTyxRQUFQO0FBQ2EsOEJBQVM7K0JBQUcsU0FBUyxtQkFBTyxNQUFQLEVBQVQ7cUJBQUg7QUFDVCwwQkFBSyxxREFBTDtpQkFITCxFQUxRO2FBQVosTUFVSztBQUNWLG9CQUFHLE1BQUgsRUFDQyxTQUFTLElBQVQsQ0FBYztBQUNiLDRCQUFPLGFBQVA7QUFDQywyQkFBTSxNQUFOO0FBQ0EsMEJBQU0sdURBQU47QUFDQSw4QkFBUzsrQkFBRyxTQUFTLG1CQUFPLE1BQVAsQ0FBYyxTQUFkLENBQVQ7cUJBQUg7aUJBSlgsRUFERCxLQVFDLFNBQVMsSUFBVCxDQUFjO0FBQ2IsNEJBQU8sVUFBUDtBQUNDLDJCQUFNLE1BQU47QUFDQSwwQkFBTSx1REFBTjtBQUNBLDhCQUFTOytCQUFHLFNBQVMsbUJBQU8sSUFBUCxDQUFZLFNBQVosQ0FBVDtxQkFBSDtpQkFKWCxFQVJEOztBQWVTLHlCQUFTLElBQVQsQ0FBYyw4QkFBQyxXQUFXLE9BQVosSUFBb0IsS0FBSSxTQUFKLEVBQWMsMkJBQW1CLE9BQU8sU0FBUCxFQUFyRCxDQUFkLEVBaEJDO0FBaUJELHlCQUFTLElBQVQsQ0FBYyw4QkFBQyxXQUFXLEtBQVosSUFBa0IsS0FBSSxPQUFKLEVBQVksU0FBUyxTQUFULEVBQTlCLENBQWQsRUFqQkM7YUFWTDs7QUE4QkEsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNJOztzQkFBSyxXQUFVLFdBQVYsRUFBTDtvQkFDWCxtREFBYSxTQUFiLENBRFc7aUJBREo7Z0JBS0ksOEJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVixFQUFvQixPQUFPLFFBQVAsRUFBaEMsQ0FMSjthQURKLENBN0NJOzs7Ozs7a0JBWFMiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b24sIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuaW1wb3J0IEljb25BZGRUYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FsYXJtLWFkZFwiXG5pbXBvcnQgSWNvblJlbW92ZVRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tb2ZmXCJcblxuaW1wb3J0IENhbGVuZGFyLCB7Y25EYXRlVGltZUZvcm1hdCwgYWRkRGF5cywgcmVsYXRpdmUsIGlzRXF1YWxEYXRlLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5cbmltcG9ydCB7QUNUSU9OLCBDb250ZW50fSBmcm9tIFwiLi9rbm93bGVkZ2VzXCJcblxuY29uc3Qge0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS25vd2xlZGdlRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaChBQ1RJT04uRkVUQ0gxKCkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRjb25zdCB7a25vd2xlZGdlfT10aGlzLnByb3BzXG4gICAgICAgIGlmKGtub3dsZWRnZSAmJiBrbm93bGVkZ2UuX2lkIT1uZXh0LnBhcmFtcy5faWQpXG4gICAgICAgICAgICBuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSDEoKSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7a25vd2xlZGdlLCByZXZpc2luZz1mYWxzZSwgaW5UYXNrPWZhbHNlLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXG4gICAgICAgIGlmKCFrbm93bGVkZ2UpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl1cblxuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWtub3dsZWRnZS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7XG5cdFx0XHRcdGFjdGlvbjpcIk5ldyBWZXJzaW9uXCJcblx0XHRcdFx0LGljb246PEljb25DcmVhdGUvPlxuXHRcdFx0XHQsb25TZWxlY3Q6IGE9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKVxuXHRcdFx0fSlcblxuICAgICAgICBpZihyZXZpc2luZyl7XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHtcblx0XHRcdFx0YWN0aW9uOlwiU2F2ZVwiXG5cdFx0XHRcdCxvblNlbGVjdDogYT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURSgpKVxuXHRcdFx0fSlcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0XHRhY3Rpb246XCJDYW5jZWxcIlxuICAgICAgICAgICAgICAgICxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ0FOQ0VMKCkpXG4gICAgICAgICAgICAgICAgLGljb246PEljb25DYW5jZWwvPlxuXHRcdFx0fSlcbiAgICAgICAgfWVsc2V7XG5cdFx0XHRpZihpblRhc2spXG5cdFx0XHRcdGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0XHRcdGFjdGlvbjpcIlJlbW92ZSBUYXNrXCJcblx0XHRcdFx0XHQsbGFiZWw6XCLliKDpmaTor77nqItcIlxuXHRcdFx0XHRcdCxpY29uOiA8SWNvblJlbW92ZVRhc2svPlxuXHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVU5UQVNLKGtub3dsZWRnZSkpXG5cdFx0XHRcdH0pIFxuICAgICAgICAgICAgZWxzZSAgIFxuXHRcdFx0XHRjb21tYW5kcy5wdXNoKHtcblx0XHRcdFx0XHRhY3Rpb246XCJBZGQgVGFza1wiXG5cdFx0XHRcdFx0LGxhYmVsOlwi5re75Yqg6K++56iLXCJcblx0XHRcdFx0XHQsaWNvbjogPEljb25BZGRUYXNrLz5cblx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlRBU0soa25vd2xlZGdlKSlcblx0XHRcdFx0fSlcblx0XHRcdFxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5Db21tZW50IGtleT1cIkNvbW1lbnRcIiB0eXBlPXtkYktub3dsZWRnZX0gbW9kZWw9e2tub3dsZWRnZX0vPilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuU2hhcmUga2V5PVwiU2hhcmVcIiBtZXNzYWdlPXtrbm93bGVkZ2V9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj5cblx0XHRcdFx0XHQ8Q29udGVudCB7Li4ua25vd2xlZGdlfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e2NvbW1hbmRzfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiJdfQ==