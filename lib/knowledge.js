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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Knowledge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Knowledge.__proto__ || Object.getPrototypeOf(Knowledge)).call.apply(_ref, [this].concat(args))), _this), _this.state = { entity: null, queued: false }, _temp), _possibleConstructorReturn(_this, _ret);
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
            var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiTGlzdCIsIkxvYWRpbmciLCJDb21tZW50IiwiQ29tbWFuZEJhciIsImZpbGVTZWxlY3RvciIsIk1lc3NhZ2VyIiwiRGlhbG9nQ29tbWFuZCIsIktub3dsZWRnZSIsInN0YXRlIiwiZW50aXR5IiwicXVldWVkIiwiX2lkIiwicHJvcHMiLCJsb2NhdGlvbiIsImNoaWxkIiwiY29udGV4dCIsImtub3dsZWRnZSIsImZpbmQiLCJzdGF0dXMiLCJzZXRTdGF0ZSIsInRhc2tzIiwiZmluZE9uZSIsImdldERhdGEiLCJwYXJhbXMiLCJuZXh0UHJvcHMiLCJnZXREYXRlIiwiZG9jeCIsInJldm9rZSIsInBsYW5pbmciLCJjb21tYW5kcyIsImN1cnJlbnQiLCJhdXRob3IiLCJwdXNoIiwiYWN0aW9uIiwiaWNvbiIsIm9uU2VsZWN0Iiwib3JpZ2luIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwibGFiZWwiLCJwbGFuIiwicmVuZGVyQ29udGVudCIsImNtZCIsImNvbW1hbmQiLCJzZWxlY3REb2N4IiwidGhlbiIsInBlbmRpbmciLCJPYmplY3QiLCJhc3NpZ24iLCJ1cGxvYWQiLCJjb250ZW50IiwicGhvdG9zIiwiZ2V0UGhvdG9zIiwidXBzZXJ0IiwiZGF5IiwiYSIsInNob3ciLCJzZWxlY3QiLCJjb25zb2xlIiwiZXJyb3IiLCJvcGVuIiwidGVtcGxhdGVSZW5kZXIiLCJjYXRlZ29yeSIsImtleXdvcmRzIiwiZmlndXJlIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwidGV4dEFsaWduIiwiX19odG1sIiwic3VtbWFyeSIsIm5vdE5ld1N0dWZmIiwidGl0bGUiLCJuYW1lIiwiY3JlYXRlZEF0Iiwiam9pbiIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7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QUE7QUFBQSxzQkFBSSxLQUFJLE9BQVI7QUFBaUI3RCwyQkFBTzhEO0FBQXhCLGlCQUFiO0FBQ0g7O0FBRVAsZ0JBQUdQLE1BQUgsRUFDQ0EsU0FBUSx1Q0FBSyxLQUFLQSxNQUFWLEdBQVI7O0FBRUQsbUJBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQVNBO0FBQVQsaUJBREQ7QUFFQztBQUFBO0FBQUE7QUFDRU0sK0JBREY7QUFFQztBQUFBO0FBQUE7QUFDRVIsaUNBQVNZLElBQVQsQ0FBYyxJQUFkLENBREY7QUFBQTtBQUN3QlgsaUNBQVNXLElBQVQsQ0FBYyxJQUFkO0FBRHhCO0FBRkQsaUJBRkQ7QUFRQztBQUFBO0FBQUE7QUFDRXhCO0FBREY7QUFSRCxhQUREO0FBY0c7Ozs7OztBQW5LZ0IzQyxTLENBcUtWb0UsWSxHQUFhO0FBQ2hCN0QsV0FBTyxpQkFBVThEO0FBREQsQztrQkFyS0hyRSxTIiwiZmlsZSI6Imtub3dsZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtGaWxlLFVJLCBVc2VyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7UmFpc2VkQnV0dG9uLCBEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCBJY29uQ3JlYXRlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiXG5pbXBvcnQgSWNvbkNhbmNlbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2FuY2VsXCJcblxuaW1wb3J0IENhbGVuZGFyLCB7Y25EYXRlVGltZUZvcm1hdCwgYWRkRGF5cywgcmVsYXRpdmUsIGlzRXF1YWxEYXRlLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5cbmltcG9ydCBleHRyYWN0IGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcblxuY29uc3Qge0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZW50aXR5Om51bGwsIHF1ZXVlZDpmYWxzZX1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdFx0LHtfaWQ6Y2hpbGR9PXRoaXMuY29udGV4dC5jaGlsZFxuXHRcdFx0LHN0YXR1cz1cInNjaGVkdWxlZFwiXG5cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS5rbm93bGVkZ2Upe1xuXHRcdFx0ZGJUYXNrLmZpbmQoe2tub3dsZWRnZTp7X2lkfSxjaGlsZCxzdGF0dXN9LHRhc2tzPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUua25vd2xlZGdlfSlcblx0XHR9ZWxzZXtcblx0XHRcdGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XG5cdFx0XHRcdGRiVGFzay5maW5kKHtrbm93bGVkZ2U6e19pZH0sY2hpbGQsc3RhdHVzfSx0YXNrcz0+e1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdFx0fSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSlcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZywgdGFza3M9W119PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciBjb21tYW5kcz1bXCJCYWNrXCJdXG5cbiAgICAgICAgaWYodHJ1ZSB8fCBVc2VyLmN1cnJlbnQuX2lkPT1lbnRpdHkuYXV0aG9yLl9pZClcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIk5ldyBWZXJzaW9uXCIsaWNvbjo8SWNvbkNyZWF0ZS8+fSlcblxuICAgICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAncmV2aXNpbmcnOlxuICAgICAgICAgICAgY29tbWFuZHMucHVzaChcIlNhdmVcIilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6dGhpcy5vcmlnaW4sc3RhdHVzOnVuZGVmaW5lZH0pLFxuICAgICAgICAgICAgICAgIGljb246PEljb25DYW5jZWwvPn0pXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLm9yaWdpbj1lbnRpdHlcbiAgICAgICAgICAgIGlmKHRhc2tzLmxlbmd0aD09MClcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJcIiwgbGFiZWw6XCLmt7vliqDor77nqItcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wbGFuKCl9KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIlwiLCBsYWJlbDpcIuWIoOmZpOivvueoi1wifSlcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLlNoYXJlIGtleT1cIlNoYXJlXCIgbWVzc2FnZT17ZW50aXR5fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuXHRwbGFuKGRheSl7XG5cdFx0bGV0IHtlbnRpdHksdGFza3M9W119PXRoaXMuc3RhdGVcblxuXHRcdGRiVGFzay5wbGFuKGVudGl0eSxkYXkpLnRoZW4oYT0+e1xuICAgICAgICAgICAgdGFza3MucHVzaChhKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcIuiuoeWIkuWlveS6hlwiKVxuXHRcdH0pXG5cdH1cblxuICAgIHN0YXRpYyBzZWxlY3REb2N4KCl7XG4gICAgICAgIHJldHVybiBmaWxlU2VsZWN0b3Iuc2VsZWN0KClcbiAgICAgICAgICAgIC50aGVuKGV4dHJhY3QsY29uc29sZS5lcnJvcilcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyQ29udGVudChlbnRpdHksIG9wZW49dHJ1ZSwgdGVtcGxhdGVSZW5kZXIpe1xuICAgICAgICB2YXIge2NhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXSwgZmlndXJlfT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9XG5cbiAgICAgICAgdmFyIGNvbnRlbnQ9PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDplbnRpdHkuY29udGVudH19Lz5cblxuICAgICAgICBpZihlbnRpdHkuc3VtbWFyeSAmJiBvcGVuIT09bnVsbCl7XG4gICAgICAgICAgICBjb250ZW50PShcbiAgICAgICAgICAgICAgICA8ZGV0YWlscyBvcGVuPXtvcGVufT5cbiAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+e2VudGl0eS5zdW1tYXJ5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vdE5ld1N0dWZmXG4gICAgICAgIGlmKGVudGl0eS5faWQpe1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9W1xuICAgICAgICAgICAgICAgICg8aDEga2V5PVwibGluazBcIj48TGluayB0bz17YGtub3dsZWRnZS8ke2VudGl0eS5faWR9YH0+e2VudGl0eS50aXRsZX08L0xpbms+PC9oMT4pLFxuICAgICAgICAgICAgICAgICg8cCBrZXk9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAge2VudGl0eS5hdXRob3IubmFtZX0gLSA8dGltZT57cmVsYXRpdmUoZW50aXR5LmNyZWF0ZWRBdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD4pXG4gICAgICAgICAgICBdXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGluazFcIj57ZW50aXR5LnRpdGxlfTwvaDE+KVxuICAgICAgICB9XG5cblx0XHRpZihmaWd1cmUpXG5cdFx0XHRmaWd1cmU9KDxpbWcgc3JjPXtmaWd1cmV9Lz4pXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGFydGljbGU+XG5cdFx0XHRcdDxmaWd1cmU+e2ZpZ3VyZX08L2ZpZ3VyZT5cblx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHR7bm90TmV3U3R1ZmZ9XG5cdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuXHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0KVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbn1cbiJdfQ==