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

            var commands = [],
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
//# sourceMappingURL=data:application/json;base64,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QixDQVlMLFFBWkssQ0FBUixDQUwrQzs7QUFtQm5ELGdCQUFHLE9BQU8sT0FBUCxJQUFrQixTQUFPLElBQVAsRUFBWTtBQUM3QiwwQkFDSTs7c0JBQVMsTUFBTSxJQUFOLEVBQVQ7b0JBQ0k7Ozt3QkFBVSxPQUFPLE9BQVA7cUJBRGQ7b0JBRUssT0FGTDtpQkFESixDQUQ2QjthQUFqQzs7QUFTQSxnQkFBSSxXQUFKLENBNUJtRDtBQTZCbkQsZ0JBQUcsT0FBTyxHQUFQLEVBQVc7QUFDViw4QkFBWSxDQUNQOztzQkFBSSxLQUFJLE9BQUosRUFBSjtvQkFBZ0I7OzBCQUFNLG9CQUFrQixPQUFPLEdBQVAsRUFBeEI7d0JBQXVDLE9BQU8sS0FBUDtxQkFBdkQ7aUJBRE8sRUFFUDs7c0JBQUcsS0FBSSxRQUFKLEVBQUg7b0JBQ0ksT0FBTyxNQUFQLENBQWMsSUFBZDt5QkFESjtvQkFDMEI7Ozt3QkFBTyx3QkFBUyxPQUFPLFNBQVAsQ0FBaEI7cUJBRDFCO2lCQUZPLENBQVosQ0FEVTthQUFkLE1BT007QUFDRiw4QkFBYTs7c0JBQUksS0FBSSxPQUFKLEVBQUo7b0JBQWlCLE9BQU8sS0FBUDtpQkFBOUIsQ0FERTthQVBOOztBQVdOLGdCQUFHLE1BQUgsRUFDQyxTQUFRLHNDQUFLLEtBQUssTUFBTCxFQUFMLENBQVIsQ0FERDs7QUFHQSxtQkFDQzs7O2dCQUNDOzs7b0JBQVMsTUFBVDtpQkFERDtnQkFFQzs7O29CQUNFLFdBREY7b0JBRUM7Ozt3QkFDRSxTQUFTLElBQVQsQ0FBYyxJQUFkLENBREY7O3dCQUN3QixTQUFTLElBQVQsQ0FBYyxJQUFkLENBRHhCO3FCQUZEO2lCQUZEO2dCQVFDOzs7b0JBQ0UsT0FERjtpQkFSRDthQURELENBM0N5RDs7OztXQTVJdEMiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b24sIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuXG5pbXBvcnQgQ2FsZW5kYXIsIHtjbkRhdGVUaW1lRm9ybWF0LCBhZGREYXlzLCByZWxhdGl2ZSwgaXNFcXVhbERhdGUsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcblxuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuL3BhcnNlci90ZW1wbGF0ZVwiXG5cbmNvbnN0IHtMaXN0LExvYWRpbmcsQ29tbWVudCxDb21tYW5kQmFyLGZpbGVTZWxlY3Rvcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtlbnRpdHk6bnVsbCwgdGFza3M6W119XG4gICAgfVxuXG5cdGdldERhdGEoX2lkKXtcblx0XHRsZXQge3N0YXRlfT10aGlzLnByb3BzLmxvY2F0aW9uXG5cdFx0XHQse19pZDpjaGlsZH09dGhpcy5wcm9wcy5jaGlsZFxuXHRcdFx0LHN0YXR1cz1cInNjaGVkdWxlZFwiXG5cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS5rbm93bGVkZ2Upe1xuXHRcdFx0ZGJUYXNrLmZpbmQoe2tub3dsZWRnZTp7X2lkfSxjaGlsZCxzdGF0dXN9LHRhc2tzPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUua25vd2xlZGdlfSlcblx0XHR9ZWxzZXtcblx0XHRcdGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XG5cdFx0XHRcdGRiVGFzay5maW5kKHtrbm93bGVkZ2U6e19pZH0sY2hpbGQsc3RhdHVzfSx0YXNrcz0+e1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdFx0fSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSlcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZywgdGFza3N9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciBjb21tYW5kcz1bXVxuXHRcdFx0LG5vdz1uZXcgRGF0ZSgpXG5cdFx0XHQsc2NoZWR1bGVkPXRhc2tzLm1hcChhPT5hLnNjaGVkdWxlZEF0KVxuXG4gICAgICAgIGlmKHRydWUgfHwgVXNlci5jdXJyZW50Ll9pZD09ZW50aXR5LmF1dGhvci5faWQpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246SWNvbkNyZWF0ZX0pXG5cbiAgICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgJ3JldmlzaW5nJzpcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goXCJTYXZlXCIpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnRoaXMub3JpZ2luLHN0YXR1czp1bmRlZmluZWR9KSxcbiAgICAgICAgICAgICAgICBpY29uOkljb25DYW5jZWx9KVxuICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5vcmlnaW49ZW50aXR5XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLkNvbW1lbnQga2V5PVwiQ29tbWVudFwiIHR5cGU9e2RiS25vd2xlZGdlfSBtb2RlbD17ZW50aXR5fS8+KVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5TaGFyZSBrZXk9XCJTaGFyZVwiIG1lc3NhZ2U9e2VudGl0eX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7S25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhbGVuZGFyXCI+XG5cdFx0XHRcdFx0PENhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVllYXJTZWxlY3Rpb249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZT1cImxhbmRzY2FwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0ZVRpbWVGb3JtYXQ9e2NuRGF0ZVRpbWVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXlPZldlZWs9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURhdGU9e25vd31cblx0XHRcdFx0XHRcdFx0bWluRGF0ZT17bm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e2dldExhc3REYXlPZk1vbnRoKG5vdyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NjaGVkdWxlZH1cblx0XHRcdFx0XHRcdFx0b25Ub3VjaFRhcERheT17KGUsZGF5KT0+dGhpcy5wbGFuKGRheSl9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuXHRwbGFuKGRheSl7XG5cdFx0bGV0IHt0YXNrcywgZW50aXR5fT10aGlzLnN0YXRlXG5cdFx0XHQsZm91bmQ9dGFza3MuZmluZChhPT5pc0VxdWFsRGF0ZShkYXksIGEuc2NoZWR1bGVkQXQpKVxuXHRcdGlmKGZvdW5kKVxuXHRcdFx0ZGJUYXNrLnJlbW92ZShmb3VuZC5faWQpLnRoZW4oYT0+e1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHR0YXNrczp0YXNrcy5maWx0ZXIoYT0+IWlzRXF1YWxEYXRlKGRheSxhLnNjaGVkdWxlZEF0KSlcblx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLnBsYW4oZW50aXR5LGRheSkudGhlbihhPT57XG5cdFx0XHRcdHRhc2tzLnB1c2goYSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0fSlcblx0fVxuXG4gICAgc3RhdGljIHNlbGVjdERvY3goKXtcbiAgICAgICAgcmV0dXJuIGZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuICAgICAgICAgICAgLnRoZW4oZXh0cmFjdCxjb25zb2xlLmVycm9yKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmU9XCJodHRwOi8vbi5zaW5haW1nLmNuL3RyYW5zZm9ybS8yMDE1MDcxNi9jS0hSLWZ4ZmFzd2k0MDM5MDg1LmpwZ1wifT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9LFxuICAgICAgICAgICAgdGVtcGxhdGU9bmV3IFRlbXBsYXRlKGVudGl0eS5jb250ZW50KTtcblxuICAgICAgICB2YXIgY29udGVudD0odGVtcGxhdGVSZW5kZXJ8fGZ1bmN0aW9uKHRwbCl7XG4gICAgICAgICAgICAgICAgdmFyIF9faHRtbD10cGwuY29udGVudHMubWFwKChzZWN0aW9uLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihzZWN0aW9uKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT4ke3NlY3Rpb24ua2V5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke3NlY3Rpb24uYWx0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWx9fS8+XG4gICAgICAgICAgICB9KSh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgaWYoZW50aXR5LnN1bW1hcnkgJiYgb3BlbiE9PW51bGwpe1xuICAgICAgICAgICAgY29udGVudD0oXG4gICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PntlbnRpdHkuc3VtbWFyeX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3ROZXdTdHVmZlxuICAgICAgICBpZihlbnRpdHkuX2lkKXtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPVtcbiAgICAgICAgICAgICAgICAoPGgxIGtleT1cImxpbmswXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7ZW50aXR5Ll9pZH1gfT57ZW50aXR5LnRpdGxlfTwvTGluaz48L2gxPiksXG4gICAgICAgICAgICAgICAgKDxwIGtleT1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5LmF1dGhvci5uYW1lfSAtIDx0aW1lPntyZWxhdGl2ZShlbnRpdHkuY3JlYXRlZEF0KX08L3RpbWU+XG4gICAgICAgICAgICAgICAgPC9wPilcbiAgICAgICAgICAgIF1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9KDxoMSBrZXk9XCJsaW5rMVwiPntlbnRpdHkudGl0bGV9PC9oMT4pXG4gICAgICAgIH1cblxuXHRcdGlmKGZpZ3VyZSlcblx0XHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YXJ0aWNsZT5cblx0XHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdHtub3ROZXdTdHVmZn1cblx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdDwvc2VjdGlvbj5cblx0XHRcdDwvYXJ0aWNsZT5cblx0XHQpXG4gICAgfVxufVxuIl19