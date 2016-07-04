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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;
var fileSelector = _qiliApp.UI.fileSelector;
var Messager = _qiliApp.UI.Messager;
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


            if (!entity) return _qiliApp.React.createElement(Loading, null);

            var commands = ["Back"];

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
                    if (tasks.length == 0) commands.push({ action: "", label: "添加课程", onSelect: function onSelect(e) {
                            return _this3.plan();
                        } });else commands.push({ action: "", label: "删除课程" });
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

            var content = _qiliApp.React.createElement('div', { dangerouslySetInnerHTML: { __html: entity.content } });

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
                        { to: 'knowledge/' + entity._id },
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

Knowledge.contextTypes = {
    child: _qiliApp.React.PropTypes.object
};
exports.default = Knowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QixXQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQjs7a0JBdEtNIiwiZmlsZSI6Imtub3dsZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LCBGaWxlLFVJLCBVc2VyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7UmFpc2VkQnV0dG9uLCBEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCBJY29uQ3JlYXRlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiXG5pbXBvcnQgSWNvbkNhbmNlbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2FuY2VsXCJcblxuaW1wb3J0IENhbGVuZGFyLCB7Y25EYXRlVGltZUZvcm1hdCwgYWRkRGF5cywgcmVsYXRpdmUsIGlzRXF1YWxEYXRlLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5cbmltcG9ydCBleHRyYWN0IGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcblxuY29uc3Qge0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZW50aXR5Om51bGwsIHF1ZXVlZDpmYWxzZX1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdFx0LHtfaWQ6Y2hpbGR9PXRoaXMuY29udGV4dC5jaGlsZFxuXHRcdFx0LHN0YXR1cz1cInNjaGVkdWxlZFwiXG5cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS5rbm93bGVkZ2Upe1xuXHRcdFx0ZGJUYXNrLmZpbmQoe2tub3dsZWRnZTp7X2lkfSxjaGlsZCxzdGF0dXN9LHRhc2tzPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUua25vd2xlZGdlfSlcblx0XHR9ZWxzZXtcblx0XHRcdGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XG5cdFx0XHRcdGRiVGFzay5maW5kKHtrbm93bGVkZ2U6e19pZH0sY2hpbGQsc3RhdHVzfSx0YXNrcz0+e1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdFx0fSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSlcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZywgdGFza3M9W119PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciBjb21tYW5kcz1bXCJCYWNrXCJdXG5cbiAgICAgICAgaWYodHJ1ZSB8fCBVc2VyLmN1cnJlbnQuX2lkPT1lbnRpdHkuYXV0aG9yLl9pZClcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIk5ldyBWZXJzaW9uXCIsaWNvbjpJY29uQ3JlYXRlfSlcblxuICAgICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAncmV2aXNpbmcnOlxuICAgICAgICAgICAgY29tbWFuZHMucHVzaChcIlNhdmVcIilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6dGhpcy5vcmlnaW4sc3RhdHVzOnVuZGVmaW5lZH0pLFxuICAgICAgICAgICAgICAgIGljb246SWNvbkNhbmNlbH0pXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLm9yaWdpbj1lbnRpdHlcbiAgICAgICAgICAgIGlmKHRhc2tzLmxlbmd0aD09MClcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJcIiwgbGFiZWw6XCLmt7vliqDor77nqItcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wbGFuKCl9KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIlwiLCBsYWJlbDpcIuWIoOmZpOivvueoi1wifSlcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLlNoYXJlIGtleT1cIlNoYXJlXCIgbWVzc2FnZT17ZW50aXR5fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuXHRwbGFuKGRheSl7XG5cdFx0bGV0IHtlbnRpdHksdGFza3M9W119PXRoaXMuc3RhdGVcblxuXHRcdGRiVGFzay5wbGFuKGVudGl0eSxkYXkpLnRoZW4oYT0+e1xuICAgICAgICAgICAgdGFza3MucHVzaChhKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcIuiuoeWIkuWlveS6hlwiKVxuXHRcdH0pXG5cdH1cblxuICAgIHN0YXRpYyBzZWxlY3REb2N4KCl7XG4gICAgICAgIHJldHVybiBmaWxlU2VsZWN0b3Iuc2VsZWN0KClcbiAgICAgICAgICAgIC50aGVuKGV4dHJhY3QsY29uc29sZS5lcnJvcilcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyQ29udGVudChlbnRpdHksIG9wZW49dHJ1ZSwgdGVtcGxhdGVSZW5kZXIpe1xuICAgICAgICB2YXIge2NhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXSwgZmlndXJlfT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9XG5cbiAgICAgICAgdmFyIGNvbnRlbnQ9PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDplbnRpdHkuY29udGVudH19Lz5cblxuICAgICAgICBpZihlbnRpdHkuc3VtbWFyeSAmJiBvcGVuIT09bnVsbCl7XG4gICAgICAgICAgICBjb250ZW50PShcbiAgICAgICAgICAgICAgICA8ZGV0YWlscyBvcGVuPXtvcGVufT5cbiAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+e2VudGl0eS5zdW1tYXJ5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vdE5ld1N0dWZmXG4gICAgICAgIGlmKGVudGl0eS5faWQpe1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9W1xuICAgICAgICAgICAgICAgICg8aDEga2V5PVwibGluazBcIj48TGluayB0bz17YGtub3dsZWRnZS8ke2VudGl0eS5faWR9YH0+e2VudGl0eS50aXRsZX08L0xpbms+PC9oMT4pLFxuICAgICAgICAgICAgICAgICg8cCBrZXk9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAge2VudGl0eS5hdXRob3IubmFtZX0gLSA8dGltZT57cmVsYXRpdmUoZW50aXR5LmNyZWF0ZWRBdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD4pXG4gICAgICAgICAgICBdXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGluazFcIj57ZW50aXR5LnRpdGxlfTwvaDE+KVxuICAgICAgICB9XG5cblx0XHRpZihmaWd1cmUpXG5cdFx0XHRmaWd1cmU9KDxpbWcgc3JjPXtmaWd1cmV9Lz4pXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGFydGljbGU+XG5cdFx0XHRcdDxmaWd1cmU+e2ZpZ3VyZX08L2ZpZ3VyZT5cblx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHR7bm90TmV3U3R1ZmZ9XG5cdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuXHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0KVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBjaGlsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbn1cbiJdfQ==