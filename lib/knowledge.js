'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _template = require('./parser/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;
var fileSelector = _qiliApp.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;

var Knowledge = function (_Component) {
    _inherits(Knowledge, _Component);

    function Knowledge(props) {
        _classCallCheck(this, Knowledge);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Knowledge).call(this, props));

        _this.state = { entity: null, tasks: [] };
        return _this;
    }

    _createClass(Knowledge, [{
        key: 'getData',
        value: function getData(_id) {
            var _this2 = this;

            var state = this.props.location.state;
            var child = this.props.child._id;
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
            var tasks = _state.tasks;


            if (!entity) return _qiliApp.React.createElement(Loading, null);

            var commands = ["Back"],
                now = new Date(),
                scheduled = tasks.map(function (a) {
                return a.scheduledAt;
            });

            if (true || _qiliApp.User.current._id == entity.author._id) commands.push({ action: "New Version", icon: _borderColor2.default });

            switch (status) {
                case 'revising':
                    commands.push("Save");
                    commands.push({ action: "Cancel",
                        onSelect: function onSelect() {
                            return _this3.setState({ entity: _this3.origin, status: undefined });
                        },
                        icon: _cancel2.default });
                    break;
                default:
                    this.origin = entity;
                    commands.push(_qiliApp.React.createElement(CommandBar.Comment, { key: 'Comment', type: _knowledge2.default, model: entity }));
                    commands.push(_qiliApp.React.createElement(CommandBar.Share, { key: 'Share', message: entity }));
            }

            return _qiliApp.React.createElement(
                'div',
                { className: 'post' },
                _qiliApp.React.createElement(
                    'div',
                    { className: 'knowledge' },
                    Knowledge.renderContent(entity)
                ),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'calendar' },
                    _qiliApp.React.createElement(_calendar2.default, {
                        disableYearSelection: true,
                        mode: 'landscape',
                        DateTimeFormat: _calendar.cnDateTimeFormat,
                        firstDayOfWeek: 0,
                        displayDate: now,
                        minDate: now,
                        maxDate: (0, _calendar.getLastDayOfMonth)(now),
                        selected: scheduled,
                        onTouchTapDay: function onTouchTapDay(e, day) {
                            return _this3.plan(day);
                        }
                    })
                ),
                _qiliApp.React.createElement(CommandBar, {
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

                        var pending = Object.assign({}, _this4.state.entity, knowledge);
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
            var tasks = _state2.tasks;
            var entity = _state2.entity;
            var found = tasks.find(function (a) {
                return (0, _calendar.isEqualDate)(day, a.scheduledAt);
            });
            if (found) _task2.default.remove(found._id).then(function (a) {
                _this5.setState({
                    tasks: tasks.filter(function (a) {
                        return !(0, _calendar.isEqualDate)(day, a.scheduledAt);
                    })
                });
            });else _task2.default.plan(entity, day).then(function (a) {
                tasks.push(a);
                _this5.setState({ tasks: tasks });
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
            var _entity$figure = entity.figure;
            var figure = _entity$figure === undefined ? "http://n.sinaimg.cn/transform/20150716/cKHR-fxfaswi4039085.jpg" : _entity$figure;
            var sencondaryStyle = { fontSize: 'small', fontWeight: 'normal', textAlign: 'right' };
            var template = new _template2.default(entity.content);

            var content = (templateRender || function (tpl) {
                var __html = tpl.contents.map(function (section, i) {
                    if (typeof section == 'string') return section;
                    return '\n                        <details open="true">\n                            <summary>' + section.key + '</summary>\n                            <p>' + section.alt + '</p>\n                        </details>\n                    ';
                }).join("");
                return _qiliApp.React.createElement('div', { dangerouslySetInnerHTML: { __html: __html } });
            })(template);

            if (entity.summary && open !== null) {
                content = _qiliApp.React.createElement(
                    'details',
                    { open: open },
                    _qiliApp.React.createElement(
                        'summary',
                        null,
                        entity.summary
                    ),
                    content
                );
            }

            var notNewStuff;
            if (entity._id) {
                notNewStuff = [_qiliApp.React.createElement(
                    'h1',
                    { key: 'link0' },
                    _qiliApp.React.createElement(
                        _reactRouter.Link,
                        { to: '/knowledge/' + entity._id },
                        entity.title
                    )
                ), _qiliApp.React.createElement(
                    'p',
                    { key: 'author' },
                    entity.author.name,
                    ' - ',
                    _qiliApp.React.createElement(
                        'time',
                        null,
                        (0, _calendar.relative)(entity.createdAt)
                    )
                )];
            } else {
                notNewStuff = _qiliApp.React.createElement(
                    'h1',
                    { key: 'link1' },
                    entity.title
                );
            }

            if (figure) figure = _qiliApp.React.createElement('img', { src: figure });

            return _qiliApp.React.createElement(
                'article',
                null,
                _qiliApp.React.createElement(
                    'figure',
                    null,
                    figure
                ),
                _qiliApp.React.createElement(
                    'header',
                    null,
                    notNewStuff,
                    _qiliApp.React.createElement(
                        'p',
                        null,
                        category.join(", "),
                        ' ',
                        keywords.join(", ")
                    )
                ),
                _qiliApp.React.createElement(
                    'section',
                    null,
                    content
                )
            );
        }
    }]);

    return Knowledge;
}(_qiliApp.Component);

exports.default = Knowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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O2FBQWIsQ0FBakIsQ0FZTCxRQVpLLENBQVIsQ0FMK0M7O0FBbUJuRCxnQkFBRyxPQUFPLE9BQVAsSUFBa0IsU0FBTyxJQUFQLEVBQVk7QUFDN0IsMEJBQ0k7O3NCQUFTLE1BQU0sSUFBTixFQUFUO29CQUNJOzs7d0JBQVUsT0FBTyxPQUFQO3FCQURkO29CQUVLLE9BRkw7aUJBREosQ0FENkI7YUFBakM7O0FBU0EsZ0JBQUksV0FBSixDQTVCbUQ7QUE2Qm5ELGdCQUFHLE9BQU8sR0FBUCxFQUFXO0FBQ1YsOEJBQVksQ0FDUDs7c0JBQUksS0FBSSxPQUFKLEVBQUo7b0JBQWdCOzswQkFBTSxvQkFBa0IsT0FBTyxHQUFQLEVBQXhCO3dCQUF1QyxPQUFPLEtBQVA7cUJBQXZEO2lCQURPLEVBRVA7O3NCQUFHLEtBQUksUUFBSixFQUFIO29CQUNJLE9BQU8sTUFBUCxDQUFjLElBQWQ7eUJBREo7b0JBQzBCOzs7d0JBQU8sd0JBQVMsT0FBTyxTQUFQLENBQWhCO3FCQUQxQjtpQkFGTyxDQUFaLENBRFU7YUFBZCxNQU9NO0FBQ0YsOEJBQWE7O3NCQUFJLEtBQUksT0FBSixFQUFKO29CQUFpQixPQUFPLEtBQVA7aUJBQTlCLENBREU7YUFQTjs7QUFXTixnQkFBRyxNQUFILEVBQ0MsU0FBUSxzQ0FBSyxLQUFLLE1BQUwsRUFBTCxDQUFSLENBREQ7O0FBR0EsbUJBQ0M7OztnQkFDQzs7O29CQUFTLE1BQVQ7aUJBREQ7Z0JBRUM7OztvQkFDRSxXQURGO29CQUVDOzs7d0JBQ0UsU0FBUyxJQUFULENBQWMsSUFBZCxDQURGOzt3QkFDd0IsU0FBUyxJQUFULENBQWMsSUFBZCxDQUR4QjtxQkFGRDtpQkFGRDtnQkFRQzs7O29CQUNFLE9BREY7aUJBUkQ7YUFERCxDQTNDeUQ7Ozs7V0E1SXRDIiwiZmlsZSI6Imtub3dsZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LCBGaWxlLFVJLCBVc2VyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7UmFpc2VkQnV0dG9uLCBEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCBJY29uQ3JlYXRlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiXG5pbXBvcnQgSWNvbkNhbmNlbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2FuY2VsXCJcblxuaW1wb3J0IENhbGVuZGFyLCB7Y25EYXRlVGltZUZvcm1hdCwgYWRkRGF5cywgcmVsYXRpdmUsIGlzRXF1YWxEYXRlLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5cbmltcG9ydCBleHRyYWN0IGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcbmltcG9ydCBUZW1wbGF0ZSBmcm9tIFwiLi9wYXJzZXIvdGVtcGxhdGVcIlxuXG5jb25zdCB7TGlzdCxMb2FkaW5nLENvbW1lbnQsQ29tbWFuZEJhcixmaWxlU2VsZWN0b3J9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17ZW50aXR5Om51bGwsIHRhc2tzOltdfVxuICAgIH1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdFx0LHtfaWQ6Y2hpbGR9PXRoaXMucHJvcHMuY2hpbGRcblx0XHRcdCxzdGF0dXM9XCJzY2hlZHVsZWRcIlxuXG5cdFx0aWYoc3RhdGUgJiYgc3RhdGUua25vd2xlZGdlKXtcblx0XHRcdGRiVGFzay5maW5kKHtrbm93bGVkZ2U6e19pZH0sY2hpbGQsc3RhdHVzfSx0YXNrcz0+e1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0XHR9KVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnN0YXRlLmtub3dsZWRnZX0pXG5cdFx0fWVsc2V7XG5cdFx0XHRkYktub3dsZWRnZS5maW5kT25lKHtfaWR9LGVudGl0eT0+e1xuXHRcdFx0XHRkYlRhc2suZmluZCh7a25vd2xlZGdlOntfaWR9LGNoaWxkLHN0YXR1c30sdGFza3M9Pntcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eX0pXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcblx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShuZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7ZW50aXR5LCBzdGF0dXMsIHBsYW5pbmcsIHRhc2tzfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIWVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICB2YXIgY29tbWFuZHM9W1wiQmFja1wiXVxuXHRcdFx0LG5vdz1uZXcgRGF0ZSgpXG5cdFx0XHQsc2NoZWR1bGVkPXRhc2tzLm1hcChhPT5hLnNjaGVkdWxlZEF0KVxuXG4gICAgICAgIGlmKHRydWUgfHwgVXNlci5jdXJyZW50Ll9pZD09ZW50aXR5LmF1dGhvci5faWQpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246SWNvbkNyZWF0ZX0pXG5cbiAgICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgJ3JldmlzaW5nJzpcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goXCJTYXZlXCIpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnRoaXMub3JpZ2luLHN0YXR1czp1bmRlZmluZWR9KSxcbiAgICAgICAgICAgICAgICBpY29uOkljb25DYW5jZWx9KVxuICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5vcmlnaW49ZW50aXR5XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLkNvbW1lbnQga2V5PVwiQ29tbWVudFwiIHR5cGU9e2RiS25vd2xlZGdlfSBtb2RlbD17ZW50aXR5fS8+KVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5TaGFyZSBrZXk9XCJTaGFyZVwiIG1lc3NhZ2U9e2VudGl0eX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7S25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhbGVuZGFyXCI+XG5cdFx0XHRcdFx0PENhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVllYXJTZWxlY3Rpb249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZT1cImxhbmRzY2FwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0ZVRpbWVGb3JtYXQ9e2NuRGF0ZVRpbWVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXlPZldlZWs9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURhdGU9e25vd31cblx0XHRcdFx0XHRcdFx0bWluRGF0ZT17bm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e2dldExhc3REYXlPZk1vbnRoKG5vdyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NjaGVkdWxlZH1cblx0XHRcdFx0XHRcdFx0b25Ub3VjaFRhcERheT17KGUsZGF5KT0+dGhpcy5wbGFuKGRheSl9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuXHRwbGFuKGRheSl7XG5cdFx0bGV0IHt0YXNrcywgZW50aXR5fT10aGlzLnN0YXRlXG5cdFx0XHQsZm91bmQ9dGFza3MuZmluZChhPT5pc0VxdWFsRGF0ZShkYXksIGEuc2NoZWR1bGVkQXQpKVxuXHRcdGlmKGZvdW5kKVxuXHRcdFx0ZGJUYXNrLnJlbW92ZShmb3VuZC5faWQpLnRoZW4oYT0+e1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHR0YXNrczp0YXNrcy5maWx0ZXIoYT0+IWlzRXF1YWxEYXRlKGRheSxhLnNjaGVkdWxlZEF0KSlcblx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLnBsYW4oZW50aXR5LGRheSkudGhlbihhPT57XG5cdFx0XHRcdHRhc2tzLnB1c2goYSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0fSlcblx0fVxuXG4gICAgc3RhdGljIHNlbGVjdERvY3goKXtcbiAgICAgICAgcmV0dXJuIGZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuICAgICAgICAgICAgLnRoZW4oZXh0cmFjdCxjb25zb2xlLmVycm9yKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmU9XCJodHRwOi8vbi5zaW5haW1nLmNuL3RyYW5zZm9ybS8yMDE1MDcxNi9jS0hSLWZ4ZmFzd2k0MDM5MDg1LmpwZ1wifT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9LFxuICAgICAgICAgICAgdGVtcGxhdGU9bmV3IFRlbXBsYXRlKGVudGl0eS5jb250ZW50KTtcblxuICAgICAgICB2YXIgY29udGVudD0odGVtcGxhdGVSZW5kZXJ8fGZ1bmN0aW9uKHRwbCl7XG4gICAgICAgICAgICAgICAgdmFyIF9faHRtbD10cGwuY29udGVudHMubWFwKChzZWN0aW9uLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihzZWN0aW9uKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT4ke3NlY3Rpb24ua2V5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke3NlY3Rpb24uYWx0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWx9fS8+XG4gICAgICAgICAgICB9KSh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgaWYoZW50aXR5LnN1bW1hcnkgJiYgb3BlbiE9PW51bGwpe1xuICAgICAgICAgICAgY29udGVudD0oXG4gICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PntlbnRpdHkuc3VtbWFyeX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3ROZXdTdHVmZlxuICAgICAgICBpZihlbnRpdHkuX2lkKXtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPVtcbiAgICAgICAgICAgICAgICAoPGgxIGtleT1cImxpbmswXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7ZW50aXR5Ll9pZH1gfT57ZW50aXR5LnRpdGxlfTwvTGluaz48L2gxPiksXG4gICAgICAgICAgICAgICAgKDxwIGtleT1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5LmF1dGhvci5uYW1lfSAtIDx0aW1lPntyZWxhdGl2ZShlbnRpdHkuY3JlYXRlZEF0KX08L3RpbWU+XG4gICAgICAgICAgICAgICAgPC9wPilcbiAgICAgICAgICAgIF1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9KDxoMSBrZXk9XCJsaW5rMVwiPntlbnRpdHkudGl0bGV9PC9oMT4pXG4gICAgICAgIH1cblxuXHRcdGlmKGZpZ3VyZSlcblx0XHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YXJ0aWNsZT5cblx0XHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdHtub3ROZXdTdHVmZn1cblx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdDwvc2VjdGlvbj5cblx0XHRcdDwvYXJ0aWNsZT5cblx0XHQpXG4gICAgfVxufVxuIl19