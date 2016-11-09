'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _task = require('./db/task');

var _task2 = _interopRequireDefault(_task);

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;
var fileSelector = _qiliApp.UI.fileSelector;
var Messager = _qiliApp.UI.Messager;
var DialogCommand = CommandBar.DialogCommand;

var Knowledge = function (_Component) {
    (0, _inherits3.default)(Knowledge, _Component);

    function Knowledge() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Knowledge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Knowledge)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { entity: null, queued: false }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Knowledge, [{
        key: 'getData',
        value: function getData(_id) {
            var _this2 = this;

            var state = this.props.location.state;
            var child = this.context.child._id;
            var status = "scheduled";

            if (state && state.knowledge) {
                _task2.default.find({ knowledge: { _id: _id }, child: child, status: status }, function (tasks) {
                    _this2.setState({ tasks: tasks });
                });
                this.setState({ entity: state.knowledge });
            } else {
                _knowledge2.default.findOne({ _id: _id }, function (entity) {
                    _task2.default.find({ knowledge: { _id: _id }, child: child, status: status }, function (tasks) {
                        _this2.setState({ tasks: tasks });
                    });
                    _this2.setState({ entity: entity });
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData(this.props.params._id);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.params._id != nextProps.params._id) this.getDate(nextProps.params._id);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.docx && this.docx.revoke();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state;
            var entity = _state.entity;
            var status = _state.status;
            var planing = _state.planing;
            var _state$tasks = _state.tasks;
            var tasks = _state$tasks === undefined ? [] : _state$tasks;


            if (!entity) return _react2.default.createElement(Loading, null);

            var commands = ["Back"];

            if (true || _qiliApp.User.current._id == entity.author._id) commands.push({ action: "New Version", icon: _react2.default.createElement(_borderColor2.default, null) });

            switch (status) {
                case 'revising':
                    commands.push("Save");
                    commands.push({ action: "Cancel",
                        onSelect: function onSelect() {
                            return _this3.setState({ entity: _this3.origin, status: undefined });
                        },
                        icon: _react2.default.createElement(_cancel2.default, null) });
                    break;
                default:
                    this.origin = entity;
                    if (tasks.length == 0) commands.push({ action: "", label: "添加课程", onSelect: function onSelect(e) {
                            return _this3.plan();
                        } });else commands.push({ action: "", label: "删除课程" });
                    commands.push(_react2.default.createElement(CommandBar.Comment, { key: 'Comment', type: _knowledge2.default, model: entity }));
                    commands.push(_react2.default.createElement(CommandBar.Share, { key: 'Share', message: entity }));
            }

            return _react2.default.createElement(
                'div',
                { className: 'post' },
                _react2.default.createElement(
                    'div',
                    { className: 'knowledge' },
                    Knowledge.renderContent(entity)
                ),
                _react2.default.createElement(CommandBar, {
                    className: 'footbar',
                    onSelect: function onSelect(cmd) {
                        return _this3.onSelect(cmd);
                    },
                    items: commands })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            var _this4 = this;

            switch (command) {
                case 'New Version':
                    Knowledge.selectDocx().then(function (docx) {
                        _this4.docx && _this4.docx.revoke();
                        delete _this4.docx;

                        _this4.docx = docx;
                        var knowledge = docx.knowledge;

                        var pending = (0, _assign2.default)({}, _this4.state.entity, knowledge);
                        _this4.setState({ entity: pending, status: 'revising' });
                    });
                    break;
                case 'Save':
                    var entity = this.state.entity;

                    this.docx.upload(entity).then(function (content) {
                        entity.photos = _this4.docx.getPhotos();
                        entity.content = content;
                        _knowledge2.default.upsert(_this4.state.entity, _this4.origin, function () {
                            return _this4.setState({ status: undefined });
                        });
                    });
                    break;
            }
        }
    }, {
        key: 'plan',
        value: function plan(day) {
            var _this5 = this;

            var _state2 = this.state;
            var entity = _state2.entity;
            var _state2$tasks = _state2.tasks;
            var tasks = _state2$tasks === undefined ? [] : _state2$tasks;


            _task2.default.plan(entity, day).then(function (a) {
                tasks.push(a);
                _this5.setState({ tasks: tasks });
                Messager.show("计划好了");
            });
        }
    }], [{
        key: 'selectDocx',
        value: function selectDocx() {
            return fileSelector.select().then(_extractor2.default, console.error);
        }
    }, {
        key: 'renderContent',
        value: function renderContent(entity) {
            var open = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
            var templateRender = arguments[2];
            var _entity$category = entity.category;
            var category = _entity$category === undefined ? [] : _entity$category;
            var _entity$keywords = entity.keywords;
            var keywords = _entity$keywords === undefined ? [] : _entity$keywords;
            var figure = entity.figure;
            var sencondaryStyle = { fontSize: 'small', fontWeight: 'normal', textAlign: 'right' };

            var content = _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: entity.content } });

            if (entity.summary && open !== null) {
                content = _react2.default.createElement(
                    'details',
                    { open: open },
                    _react2.default.createElement(
                        'summary',
                        null,
                        entity.summary
                    ),
                    content
                );
            }

            var notNewStuff;
            if (entity._id) {
                notNewStuff = [_react2.default.createElement(
                    'h1',
                    { key: 'link0' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: 'knowledge/' + entity._id },
                        entity.title
                    )
                ), _react2.default.createElement(
                    'p',
                    { key: 'author' },
                    entity.author.name,
                    ' - ',
                    _react2.default.createElement(
                        'time',
                        null,
                        (0, _calendar.relative)(entity.createdAt)
                    )
                )];
            } else {
                notNewStuff = _react2.default.createElement(
                    'h1',
                    { key: 'link1' },
                    entity.title
                );
            }

            if (figure) figure = _react2.default.createElement('img', { src: figure });

            return _react2.default.createElement(
                'article',
                null,
                _react2.default.createElement(
                    'figure',
                    null,
                    figure
                ),
                _react2.default.createElement(
                    'header',
                    null,
                    notNewStuff,
                    _react2.default.createElement(
                        'p',
                        null,
                        category.join(", "),
                        ' ',
                        keywords.join(", ")
                    )
                ),
                _react2.default.createElement(
                    'section',
                    null,
                    content
                )
            );
        }
    }]);
    return Knowledge;
}(_react.Component);

Knowledge.contextTypes = {
    child: _react.PropTypes.object
};
exports.default = Knowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztJQUVPO0lBQUs7SUFBUTtJQUFRO0lBQVc7SUFBYztJQUM5QyxnQkFBZSxXQUFmOztJQUVjOzs7Ozs7Ozs7Ozs7OztpT0FDakIsUUFBTSxFQUFDLFFBQU8sSUFBUCxFQUFhLFFBQU8sS0FBUDs7OytCQURIOztnQ0FHWixLQUFJOzs7QUFDUCxnQkFBQyxRQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBUCxLQUFELENBRE87QUFFVCxnQkFBSyxRQUFPLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBWCxHQUFELENBRlM7QUFHVCx5QkFBTyxXQUFQLENBSFM7O0FBS1gsZ0JBQUcsU0FBUyxNQUFNLFNBQU4sRUFBZ0I7QUFDM0IsK0JBQU8sSUFBUCxDQUFZLEVBQUMsV0FBVSxFQUFDLFFBQUQsRUFBVixFQUFnQixZQUFqQixFQUF1QixjQUF2QixFQUFaLEVBQTJDLGlCQUFPO0FBQ2pELDJCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZCxFQURpRDtpQkFBUCxDQUEzQyxDQUQyQjtBQUkzQixxQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLE1BQU0sU0FBTixFQUF0QixFQUoyQjthQUE1QixNQUtLO0FBQ0osb0NBQVksT0FBWixDQUFvQixFQUFDLFFBQUQsRUFBcEIsRUFBMEIsa0JBQVE7QUFDakMsbUNBQU8sSUFBUCxDQUFZLEVBQUMsV0FBVSxFQUFDLFFBQUQsRUFBVixFQUFnQixZQUFqQixFQUF1QixjQUF2QixFQUFaLEVBQTJDLGlCQUFPO0FBQ2pELCtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZCxFQURpRDtxQkFBUCxDQUEzQyxDQURpQztBQUlqQywyQkFBSyxRQUFMLENBQWMsRUFB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O1dBdkh0Qzs7O1VBcUtWLGVBQWE7QUFDaEIsV0FBTyxpQkFBVSxNQUFWOztrQkF0S00iLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b24sIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuXG5pbXBvcnQgQ2FsZW5kYXIsIHtjbkRhdGVUaW1lRm9ybWF0LCBhZGREYXlzLCByZWxhdGl2ZSwgaXNFcXVhbERhdGUsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcblxuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xuXG5jb25zdCB7TGlzdCxMb2FkaW5nLENvbW1lbnQsQ29tbWFuZEJhcixmaWxlU2VsZWN0b3IsIE1lc3NhZ2VyfT1VSVxuY29uc3Qge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS25vd2xlZGdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtlbnRpdHk6bnVsbCwgcXVldWVkOmZhbHNlfVxuXG5cdGdldERhdGEoX2lkKXtcblx0XHRsZXQge3N0YXRlfT10aGlzLnByb3BzLmxvY2F0aW9uXG5cdFx0XHQse19pZDpjaGlsZH09dGhpcy5jb250ZXh0LmNoaWxkXG5cdFx0XHQsc3RhdHVzPVwic2NoZWR1bGVkXCJcblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLmtub3dsZWRnZSl7XG5cdFx0XHRkYlRhc2suZmluZCh7a25vd2xlZGdlOntfaWR9LGNoaWxkLHN0YXR1c30sdGFza3M9Pntcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0fSlcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eTpzdGF0ZS5rbm93bGVkZ2V9KVxuXHRcdH1lbHNle1xuXHRcdFx0ZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkfSxlbnRpdHk9Pntcblx0XHRcdFx0ZGJUYXNrLmZpbmQoe2tub3dsZWRnZTp7X2lkfSxjaGlsZCxzdGF0dXN9LHRhc2tzPT57XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHl9KVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgICAgICAgICB0aGlzLmdldERhdGUobmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2VudGl0eSwgc3RhdHVzLCBwbGFuaW5nLCB0YXNrcz1bXX09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl1cblxuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWVudGl0eS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOjxJY29uQ3JlYXRlLz59KVxuXG4gICAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlICdyZXZpc2luZyc6XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKFwiU2F2ZVwiKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiQ2FuY2VsXCIsXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTp0aGlzLm9yaWdpbixzdGF0dXM6dW5kZWZpbmVkfSksXG4gICAgICAgICAgICAgICAgaWNvbjo8SWNvbkNhbmNlbC8+fSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMub3JpZ2luPWVudGl0eVxuICAgICAgICAgICAgaWYodGFza3MubGVuZ3RoPT0wKVxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIlwiLCBsYWJlbDpcIua3u+WKoOivvueoi1wiLCBvblNlbGVjdDplPT50aGlzLnBsYW4oKX0pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiXCIsIGxhYmVsOlwi5Yig6Zmk6K++56iLXCJ9KVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5Db21tZW50IGtleT1cIkNvbW1lbnRcIiB0eXBlPXtkYktub3dsZWRnZX0gbW9kZWw9e2VudGl0eX0vPilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuU2hhcmUga2V5PVwiU2hhcmVcIiBtZXNzYWdlPXtlbnRpdHl9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge0tub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y29tbWFuZHN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSAnTmV3IFZlcnNpb24nOlxuICAgICAgICAgICAgS25vd2xlZGdlLnNlbGVjdERvY3goKVxuICAgICAgICAgICAgICAgIC50aGVuKChkb2N4KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3g9ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZz1PYmplY3QuYXNzaWduKHt9LHRoaXMuc3RhdGUuZW50aXR5LGtub3dsZWRnZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnBlbmRpbmcsIHN0YXR1czoncmV2aXNpbmcnfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnU2F2ZSc6XG4gICAgICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgdGhpcy5kb2N4LnVwbG9hZChlbnRpdHkpLnRoZW4oKGNvbnRlbnQpPT57XG4gICAgICAgICAgICAgICAgZW50aXR5LnBob3Rvcz10aGlzLmRvY3guZ2V0UGhvdG9zKClcbiAgICAgICAgICAgICAgICBlbnRpdHkuY29udGVudD1jb250ZW50XG4gICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UudXBzZXJ0KHRoaXMuc3RhdGUuZW50aXR5LCB0aGlzLm9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgKCk9PnRoaXMuc2V0U3RhdGUoe3N0YXR1czp1bmRlZmluZWR9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG5cdHBsYW4oZGF5KXtcblx0XHRsZXQge2VudGl0eSx0YXNrcz1bXX09dGhpcy5zdGF0ZVxuXG5cdFx0ZGJUYXNrLnBsYW4oZW50aXR5LGRheSkudGhlbihhPT57XG4gICAgICAgICAgICB0YXNrcy5wdXNoKGEpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0YXNrc30pXG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwi6K6h5YiS5aW95LqGXCIpXG5cdFx0fSlcblx0fVxuXG4gICAgc3RhdGljIHNlbGVjdERvY3goKXtcbiAgICAgICAgcmV0dXJuIGZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuICAgICAgICAgICAgLnRoZW4oZXh0cmFjdCxjb25zb2xlLmVycm9yKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmV9PWVudGl0eSxcbiAgICAgICAgICAgIHNlbmNvbmRhcnlTdHlsZT17Zm9udFNpemU6J3NtYWxsJyxmb250V2VpZ2h0Oidub3JtYWwnLCB0ZXh0QWxpZ246J3JpZ2h0J31cblxuICAgICAgICB2YXIgY29udGVudD08ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOmVudGl0eS5jb250ZW50fX0vPlxuXG4gICAgICAgIGlmKGVudGl0eS5zdW1tYXJ5ICYmIG9wZW4hPT1udWxsKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KFxuICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49e29wZW59PlxuICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT57ZW50aXR5LnN1bW1hcnl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm90TmV3U3R1ZmZcbiAgICAgICAgaWYoZW50aXR5Ll9pZCl7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj1bXG4gICAgICAgICAgICAgICAgKDxoMSBrZXk9XCJsaW5rMFwiPjxMaW5rIHRvPXtga25vd2xlZGdlLyR7ZW50aXR5Ll9pZH1gfT57ZW50aXR5LnRpdGxlfTwvTGluaz48L2gxPiksXG4gICAgICAgICAgICAgICAgKDxwIGtleT1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5LmF1dGhvci5uYW1lfSAtIDx0aW1lPntyZWxhdGl2ZShlbnRpdHkuY3JlYXRlZEF0KX08L3RpbWU+XG4gICAgICAgICAgICAgICAgPC9wPilcbiAgICAgICAgICAgIF1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9KDxoMSBrZXk9XCJsaW5rMVwiPntlbnRpdHkudGl0bGV9PC9oMT4pXG4gICAgICAgIH1cblxuXHRcdGlmKGZpZ3VyZSlcblx0XHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YXJ0aWNsZT5cblx0XHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdHtub3ROZXdTdHVmZn1cblx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdDwvc2VjdGlvbj5cblx0XHRcdDwvYXJ0aWNsZT5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxufVxuIl19