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
//# sourceMappingURL=data:application/json;base64,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LG9CQUFrQixPQUFPLEdBQVAsRUFBeEI7d0JBQXVDLE9BQU8sS0FBUDtxQkFBdkQ7aUJBRE8sRUFFUDs7c0JBQUcsS0FBSSxRQUFKLEVBQUg7b0JBQ0ksT0FBTyxNQUFQLENBQWMsSUFBZDt5QkFESjtvQkFDMEI7Ozt3QkFBTyx3QkFBUyxPQUFPLFNBQVAsQ0FBaEI7cUJBRDFCO2lCQUZPLENBQVosQ0FEVTthQUFkLE1BT007QUFDRiw4QkFBYTs7c0JBQUksS0FBSSxPQUFKLEVBQUo7b0JBQWlCLE9BQU8sS0FBUDtpQkFBOUIsQ0FERTthQVBOOztBQVdOLGdCQUFHLE1BQUgsRUFDQyxTQUFRLHNDQUFLLEtBQUssTUFBTCxFQUFMLENBQVIsQ0FERDs7QUFHQSxtQkFDQzs7O2dCQUNDOzs7b0JBQVMsTUFBVDtpQkFERDtnQkFFQzs7O29CQUNFLFdBREY7b0JBRUM7Ozt3QkFDRSxTQUFTLElBQVQsQ0FBYyxJQUFkLENBREY7O3dCQUN3QixTQUFTLElBQVQsQ0FBYyxJQUFkLENBRHhCO3FCQUZEO2lCQUZEO2dCQVFDOzs7b0JBQ0UsT0FERjtpQkFSRDthQURELENBM0N5RDs7OztXQTlIdEMiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b24sIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuXG5pbXBvcnQgQ2FsZW5kYXIsIHtjbkRhdGVUaW1lRm9ybWF0LCBhZGREYXlzLCByZWxhdGl2ZSwgaXNFcXVhbERhdGUsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcblxuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuL3BhcnNlci90ZW1wbGF0ZVwiXG5cbmNvbnN0IHtMaXN0LExvYWRpbmcsQ29tbWVudCxDb21tYW5kQmFyLGZpbGVTZWxlY3Rvcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtlbnRpdHk6bnVsbCwgdGFza3M6W119XG4gICAgfVxuXG5cdGdldERhdGEoX2lkKXtcblx0XHRsZXQge3N0YXRlfT10aGlzLnByb3BzLmxvY2F0aW9uXG5cdFx0XHQse19pZDpjaGlsZH09dGhpcy5wcm9wcy5jaGlsZFxuXHRcdFx0LHN0YXR1cz1cInNjaGVkdWxlZFwiXG5cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS5rbm93bGVkZ2Upe1xuXHRcdFx0ZGJUYXNrLmZpbmQoe2tub3dsZWRnZTp7X2lkfSxjaGlsZCxzdGF0dXN9LHRhc2tzPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUua25vd2xlZGdlfSlcblx0XHR9ZWxzZXtcblx0XHRcdGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XG5cdFx0XHRcdGRiVGFzay5maW5kKHtrbm93bGVkZ2U6e19pZH0sY2hpbGQsc3RhdHVzfSx0YXNrcz0+e1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdFx0fSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSlcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZywgdGFza3N9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciBjb21tYW5kcz1bXCJCYWNrXCJdXG5cdFx0XHQsbm93PW5ldyBEYXRlKClcblx0XHRcdCxzY2hlZHVsZWQ9dGFza3MubWFwKGE9PmEuc2NoZWR1bGVkQXQpXG5cbiAgICAgICAgaWYodHJ1ZSB8fCBVc2VyLmN1cnJlbnQuX2lkPT1lbnRpdHkuYXV0aG9yLl9pZClcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIk5ldyBWZXJzaW9uXCIsaWNvbjpJY29uQ3JlYXRlfSlcblxuICAgICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAncmV2aXNpbmcnOlxuICAgICAgICAgICAgY29tbWFuZHMucHVzaChcIlNhdmVcIilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6dGhpcy5vcmlnaW4sc3RhdHVzOnVuZGVmaW5lZH0pLFxuICAgICAgICAgICAgICAgIGljb246SWNvbkNhbmNlbH0pXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLm9yaWdpbj1lbnRpdHlcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLlNoYXJlIGtleT1cIlNoYXJlXCIgbWVzc2FnZT17ZW50aXR5fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuXHRwbGFuKGRheSl7XG5cdFx0bGV0IHt0YXNrcywgZW50aXR5fT10aGlzLnN0YXRlXG5cdFx0XHQsZm91bmQ9dGFza3MuZmluZChhPT5pc0VxdWFsRGF0ZShkYXksIGEuc2NoZWR1bGVkQXQpKVxuXHRcdGlmKGZvdW5kKVxuXHRcdFx0ZGJUYXNrLnJlbW92ZShmb3VuZC5faWQpLnRoZW4oYT0+e1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHR0YXNrczp0YXNrcy5maWx0ZXIoYT0+IWlzRXF1YWxEYXRlKGRheSxhLnNjaGVkdWxlZEF0KSlcblx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLnBsYW4oZW50aXR5LGRheSkudGhlbihhPT57XG5cdFx0XHRcdHRhc2tzLnB1c2goYSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0fSlcblx0fVxuXG4gICAgc3RhdGljIHNlbGVjdERvY3goKXtcbiAgICAgICAgcmV0dXJuIGZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuICAgICAgICAgICAgLnRoZW4oZXh0cmFjdCxjb25zb2xlLmVycm9yKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmV9PWVudGl0eSxcbiAgICAgICAgICAgIHNlbmNvbmRhcnlTdHlsZT17Zm9udFNpemU6J3NtYWxsJyxmb250V2VpZ2h0Oidub3JtYWwnLCB0ZXh0QWxpZ246J3JpZ2h0J30sXG4gICAgICAgICAgICB0ZW1wbGF0ZT1uZXcgVGVtcGxhdGUoZW50aXR5LmNvbnRlbnQpO1xuXG4gICAgICAgIHZhciBjb250ZW50PSh0ZW1wbGF0ZVJlbmRlcnx8ZnVuY3Rpb24odHBsKXtcbiAgICAgICAgICAgICAgICB2YXIgX19odG1sPXRwbC5jb250ZW50cy5tYXAoKHNlY3Rpb24saSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKHNlY3Rpb24pPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGV0YWlscyBvcGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PiR7c2VjdGlvbi5rZXl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7c2VjdGlvbi5hbHR9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbH19Lz5cbiAgICAgICAgICAgIH0pKHRlbXBsYXRlKTtcblxuICAgICAgICBpZihlbnRpdHkuc3VtbWFyeSAmJiBvcGVuIT09bnVsbCl7XG4gICAgICAgICAgICBjb250ZW50PShcbiAgICAgICAgICAgICAgICA8ZGV0YWlscyBvcGVuPXtvcGVufT5cbiAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+e2VudGl0eS5zdW1tYXJ5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vdE5ld1N0dWZmXG4gICAgICAgIGlmKGVudGl0eS5faWQpe1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9W1xuICAgICAgICAgICAgICAgICg8aDEga2V5PVwibGluazBcIj48TGluayB0bz17YC9rbm93bGVkZ2UvJHtlbnRpdHkuX2lkfWB9PntlbnRpdHkudGl0bGV9PC9MaW5rPjwvaDE+KSxcbiAgICAgICAgICAgICAgICAoPHAga2V5PVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIHtlbnRpdHkuYXV0aG9yLm5hbWV9IC0gPHRpbWU+e3JlbGF0aXZlKGVudGl0eS5jcmVhdGVkQXQpfTwvdGltZT5cbiAgICAgICAgICAgICAgICA8L3A+KVxuICAgICAgICAgICAgXVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj0oPGgxIGtleT1cImxpbmsxXCI+e2VudGl0eS50aXRsZX08L2gxPilcbiAgICAgICAgfVxuXG5cdFx0aWYoZmlndXJlKVxuXHRcdFx0ZmlndXJlPSg8aW1nIHNyYz17ZmlndXJlfS8+KVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8ZmlndXJlPntmaWd1cmV9PC9maWd1cmU+XG5cdFx0XHRcdDxoZWFkZXI+XG5cdFx0XHRcdFx0e25vdE5ld1N0dWZmfVxuXHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0e2NhdGVnb3J5LmpvaW4oXCIsIFwiKX0ge2tleXdvcmRzLmpvaW4oXCIsIFwiKX1cblx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0PC9zZWN0aW9uPlxuXHRcdFx0PC9hcnRpY2xlPlxuXHRcdClcbiAgICB9XG59XG4iXX0=