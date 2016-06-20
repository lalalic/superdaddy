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

    function Knowledge() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Knowledge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Knowledge)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { entity: null, queued: false }, _temp), _possibleConstructorReturn(_this, _ret);
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
                    commands.push({ action: "", label: "添加课程", onSelect: function onSelect(e) {
                            return _this3.plan();
                        } });

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

            var entity = this.state.entity;


            _task2.default.plan(entity, day).then(function (a) {
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
            var figure = entity.figure;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87SUFBSztJQUFRO0lBQVE7SUFBVztJQUNoQyxnQkFBZSxXQUFmOztJQUVjOzs7Ozs7Ozs7Ozs7OzsyTUFDakIsUUFBTSxFQUFDLFFBQU8sSUFBUCxFQUFhLFFBQU8sS0FBUDs7O2lCQURIOztnQ0FHWixLQUFJOzs7QUFDUCxnQkFBQyxRQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBUCxLQUFELENBRE87QUFFVCxnQkFBSyxRQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBWCxHQUFELENBRlM7QUFHVCx5QkFBTyxXQUFQLENBSFM7O0FBS1gsZ0JBQUcsU0FBUyxNQUFNLFNBQU4sRUFBZ0I7QUFDM0IsK0JBQU8sSUFBUCxDQUFZLEVBQUMsV0FBVSxFQUFDLFFBQUQsRUFBVixFQUFnQixZQUFqQixFQUF1QixjQUF2QixFQUFaLEVBQTJDLGlCQUFPO0FBQ2pELDJCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZCxFQURpRDtpQkFBUCxDQUEzQyxDQUQyQjtBQUkzQixxQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLE1BQU0sU0FBTixFQUF0QixFQUoyQjthQUE1QixNQUtLO0FBQ0osb0NBQVksT0FBWixDQUFvQixFQUFDLFFBQUQsRUFBcEIsRUFBMEIsa0JBQVE7QUFDakMsbUNBQU8sSUFBUCxDQUFZLEVBQUMsV0FBVSxFQUFDLFFBQUQsRUFBVixFQUFnQixZQUFqQixFQUF1QixjQUF2QixFQUFaLEVBQTJDLGlCQUFPO0FBQ2pELCtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZCxFQURpRDtxQkFBUCxDQUEzQyxDQURpQztBQUlqQywyQkFBSyxRQUFMLENBQWMsRUFBQyxjQUFELEVBQWQsRUFKaUM7aUJB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TUFBTCxFQUFMLENBQVIsQ0FERDs7QUFHQSxtQkFDQzs7O2dCQUNDOzs7b0JBQVMsTUFBVDtpQkFERDtnQkFFQzs7O29CQUNFLFdBREY7b0JBRUM7Ozt3QkFDRSxTQUFTLElBQVQsQ0FBYyxJQUFkLENBREY7O3dCQUN3QixTQUFTLElBQVQsQ0FBYyxJQUFkLENBRHhCO3FCQUZEO2lCQUZEO2dCQVFDOzs7b0JBQ0UsT0FERjtpQkFSRDthQURELENBM0N5RDs7OztXQXRIdEMiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b24sIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuXG5pbXBvcnQgQ2FsZW5kYXIsIHtjbkRhdGVUaW1lRm9ybWF0LCBhZGREYXlzLCByZWxhdGl2ZSwgaXNFcXVhbERhdGUsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcblxuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuL3BhcnNlci90ZW1wbGF0ZVwiXG5cbmNvbnN0IHtMaXN0LExvYWRpbmcsQ29tbWVudCxDb21tYW5kQmFyLGZpbGVTZWxlY3Rvcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZW50aXR5Om51bGwsIHF1ZXVlZDpmYWxzZX1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdFx0LHtfaWQ6Y2hpbGR9PXRoaXMucHJvcHMuY2hpbGRcblx0XHRcdCxzdGF0dXM9XCJzY2hlZHVsZWRcIlxuXG5cdFx0aWYoc3RhdGUgJiYgc3RhdGUua25vd2xlZGdlKXtcblx0XHRcdGRiVGFzay5maW5kKHtrbm93bGVkZ2U6e19pZH0sY2hpbGQsc3RhdHVzfSx0YXNrcz0+e1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0XHR9KVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnN0YXRlLmtub3dsZWRnZX0pXG5cdFx0fWVsc2V7XG5cdFx0XHRkYktub3dsZWRnZS5maW5kT25lKHtfaWR9LGVudGl0eT0+e1xuXHRcdFx0XHRkYlRhc2suZmluZCh7a25vd2xlZGdlOntfaWR9LGNoaWxkLHN0YXR1c30sdGFza3M9Pntcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eX0pXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcblx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShuZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7ZW50aXR5LCBzdGF0dXMsIHBsYW5pbmcsIHRhc2tzfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIWVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICB2YXIgY29tbWFuZHM9W1wiQmFja1wiXVxuXHRcdFx0LG5vdz1uZXcgRGF0ZSgpXG5cdFx0XHQsc2NoZWR1bGVkPXRhc2tzLm1hcChhPT5hLnNjaGVkdWxlZEF0KVxuXG4gICAgICAgIGlmKHRydWUgfHwgVXNlci5jdXJyZW50Ll9pZD09ZW50aXR5LmF1dGhvci5faWQpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246SWNvbkNyZWF0ZX0pXG5cbiAgICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgJ3JldmlzaW5nJzpcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goXCJTYXZlXCIpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnRoaXMub3JpZ2luLHN0YXR1czp1bmRlZmluZWR9KSxcbiAgICAgICAgICAgICAgICBpY29uOkljb25DYW5jZWx9KVxuICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5vcmlnaW49ZW50aXR5XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJcIiwgbGFiZWw6XCLmt7vliqDor77nqItcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wbGFuKCl9KVxuXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLkNvbW1lbnQga2V5PVwiQ29tbWVudFwiIHR5cGU9e2RiS25vd2xlZGdlfSBtb2RlbD17ZW50aXR5fS8+KVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5TaGFyZSBrZXk9XCJTaGFyZVwiIG1lc3NhZ2U9e2VudGl0eX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7S25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdOZXcgVmVyc2lvbic6XG4gICAgICAgICAgICBLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRvY3gpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZG9jeFxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeD1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciB7a25vd2xlZGdlfT1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZW5kaW5nPU9iamVjdC5hc3NpZ24oe30sdGhpcy5zdGF0ZS5lbnRpdHksa25vd2xlZGdlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRpdHk6cGVuZGluZywgc3RhdHVzOidyZXZpc2luZyd9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdTYXZlJzpcbiAgICAgICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlXG4gICAgICAgICAgICB0aGlzLmRvY3gudXBsb2FkKGVudGl0eSkudGhlbigoY29udGVudCk9PntcbiAgICAgICAgICAgICAgICBlbnRpdHkucGhvdG9zPXRoaXMuZG9jeC5nZXRQaG90b3MoKVxuICAgICAgICAgICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcbiAgICAgICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQodGhpcy5zdGF0ZS5lbnRpdHksIHRoaXMub3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICAoKT0+dGhpcy5zZXRTdGF0ZSh7c3RhdHVzOnVuZGVmaW5lZH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cblx0cGxhbihkYXkpe1xuXHRcdGxldCB7ZW50aXR5fT10aGlzLnN0YXRlXG5cblx0XHRkYlRhc2sucGxhbihlbnRpdHksZGF5KS50aGVuKGE9Pntcblx0XHRcdHRhc2tzLnB1c2goYSlcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHR9KVxuXHR9XG5cbiAgICBzdGF0aWMgc2VsZWN0RG9jeCgpe1xuICAgICAgICByZXR1cm4gZmlsZVNlbGVjdG9yLnNlbGVjdCgpXG4gICAgICAgICAgICAudGhlbihleHRyYWN0LGNvbnNvbGUuZXJyb3IpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlckNvbnRlbnQoZW50aXR5LCBvcGVuPXRydWUsIHRlbXBsYXRlUmVuZGVyKXtcbiAgICAgICAgdmFyIHtjYXRlZ29yeT1bXSwga2V5d29yZHM9W10sIGZpZ3VyZX09ZW50aXR5LFxuICAgICAgICAgICAgc2VuY29uZGFyeVN0eWxlPXtmb250U2l6ZTonc21hbGwnLGZvbnRXZWlnaHQ6J25vcm1hbCcsIHRleHRBbGlnbjoncmlnaHQnfSxcbiAgICAgICAgICAgIHRlbXBsYXRlPW5ldyBUZW1wbGF0ZShlbnRpdHkuY29udGVudCk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQ9KHRlbXBsYXRlUmVuZGVyfHxmdW5jdGlvbih0cGwpe1xuICAgICAgICAgICAgICAgIHZhciBfX2h0bWw9dHBsLmNvbnRlbnRzLm1hcCgoc2VjdGlvbixpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2Yoc2VjdGlvbik9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+JHtzZWN0aW9uLmtleX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtzZWN0aW9uLmFsdH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sfX0vPlxuICAgICAgICAgICAgfSkodGVtcGxhdGUpO1xuXG4gICAgICAgIGlmKGVudGl0eS5zdW1tYXJ5ICYmIG9wZW4hPT1udWxsKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KFxuICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49e29wZW59PlxuICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT57ZW50aXR5LnN1bW1hcnl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm90TmV3U3R1ZmZcbiAgICAgICAgaWYoZW50aXR5Ll9pZCl7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj1bXG4gICAgICAgICAgICAgICAgKDxoMSBrZXk9XCJsaW5rMFwiPjxMaW5rIHRvPXtgL2tub3dsZWRnZS8ke2VudGl0eS5faWR9YH0+e2VudGl0eS50aXRsZX08L0xpbms+PC9oMT4pLFxuICAgICAgICAgICAgICAgICg8cCBrZXk9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAge2VudGl0eS5hdXRob3IubmFtZX0gLSA8dGltZT57cmVsYXRpdmUoZW50aXR5LmNyZWF0ZWRBdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD4pXG4gICAgICAgICAgICBdXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGluazFcIj57ZW50aXR5LnRpdGxlfTwvaDE+KVxuICAgICAgICB9XG5cblx0XHRpZihmaWd1cmUpXG5cdFx0XHRmaWd1cmU9KDxpbWcgc3JjPXtmaWd1cmV9Lz4pXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGFydGljbGU+XG5cdFx0XHRcdDxmaWd1cmU+e2ZpZ3VyZX08L2ZpZ3VyZT5cblx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHR7bm90TmV3U3R1ZmZ9XG5cdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuXHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0KVxuICAgIH1cbn1cbiJdfQ==