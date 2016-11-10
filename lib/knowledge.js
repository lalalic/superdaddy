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

var List = _qiliApp.UI.List,
    Loading = _qiliApp.UI.Loading,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar,
    fileSelector = _qiliApp.UI.fileSelector,
    Messager = _qiliApp.UI.Messager;
var DialogCommand = CommandBar.DialogCommand;

var Knowledge = function (_Component) {
    (0, _inherits3.default)(Knowledge, _Component);

    function Knowledge() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Knowledge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Knowledge.__proto__ || (0, _getPrototypeOf2.default)(Knowledge)).call.apply(_ref, [this].concat(args))), _this), _this.state = { entity: null, queued: false }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Knowledge, [{
        key: 'getData',
        value: function getData(_id) {
            var _this2 = this;

            var state = this.props.location.state,
                child = this.context.child._id,
                status = "scheduled";


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

            var _state = this.state,
                entity = _state.entity,
                status = _state.status,
                planing = _state.planing,
                _state$tasks = _state.tasks,
                tasks = _state$tasks === undefined ? [] : _state$tasks;


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

            var _state2 = this.state,
                entity = _state2.entity,
                _state2$tasks = _state2.tasks,
                tasks = _state2$tasks === undefined ? [] : _state2$tasks;


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
            var _entity$category = entity.category,
                category = _entity$category === undefined ? [] : _entity$category,
                _entity$keywords = entity.keywords,
                keywords = _entity$keywords === undefined ? [] : _entity$keywords,
                figure = entity.figure,
                sencondaryStyle = { fontSize: 'small', fontWeight: 'normal', textAlign: 'right' };


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiTGlzdCIsIkxvYWRpbmciLCJDb21tZW50IiwiQ29tbWFuZEJhciIsImZpbGVTZWxlY3RvciIsIk1lc3NhZ2VyIiwiRGlhbG9nQ29tbWFuZCIsIktub3dsZWRnZSIsInN0YXRlIiwiZW50aXR5IiwicXVldWVkIiwiX2lkIiwicHJvcHMiLCJsb2NhdGlvbiIsImNoaWxkIiwiY29udGV4dCIsInN0YXR1cyIsImtub3dsZWRnZSIsImZpbmQiLCJzZXRTdGF0ZSIsInRhc2tzIiwiZmluZE9uZSIsImdldERhdGEiLCJwYXJhbXMiLCJuZXh0UHJvcHMiLCJnZXREYXRlIiwiZG9jeCIsInJldm9rZSIsInBsYW5pbmciLCJjb21tYW5kcyIsImN1cnJlbnQiLCJhdXRob3IiLCJwdXNoIiwiYWN0aW9uIiwiaWNvbiIsIm9uU2VsZWN0Iiwib3JpZ2luIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwibGFiZWwiLCJwbGFuIiwicmVuZGVyQ29udGVudCIsImNtZCIsImNvbW1hbmQiLCJzZWxlY3REb2N4IiwidGhlbiIsInBlbmRpbmciLCJ1cGxvYWQiLCJjb250ZW50IiwicGhvdG9zIiwiZ2V0UGhvdG9zIiwidXBzZXJ0IiwiZGF5IiwiYSIsInNob3ciLCJzZWxlY3QiLCJjb25zb2xlIiwiZXJyb3IiLCJvcGVuIiwidGVtcGxhdGVSZW5kZXIiLCJjYXRlZ29yeSIsImtleXdvcmRzIiwiZmlndXJlIiwic2VuY29uZGFyeVN0eWxlIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwidGV4dEFsaWduIiwiX19odG1sIiwic3VtbWFyeSIsIm5vdE5ld1N0dWZmIiwidGl0bGUiLCJuYW1lIiwiY3JlYXRlZEF0Iiwiam9pbiIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7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QU1ILGFBUEQsTUFPTTtBQUNGSCw4QkFBYTtBQUFBO0FBQUEsc0JBQUksS0FBSSxPQUFSO0FBQWlCNUQsMkJBQU82RDtBQUF4QixpQkFBYjtBQUNIOztBQUVQLGdCQUFHUixNQUFILEVBQ0NBLFNBQVEsdUNBQUssS0FBS0EsTUFBVixHQUFSOztBQUVELG1CQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUFTQTtBQUFULGlCQUREO0FBRUM7QUFBQTtBQUFBO0FBQ0VPLCtCQURGO0FBRUM7QUFBQTtBQUFBO0FBQ0VULGlDQUFTYSxJQUFULENBQWMsSUFBZCxDQURGO0FBQUE7QUFDd0JaLGlDQUFTWSxJQUFULENBQWMsSUFBZDtBQUR4QjtBQUZELGlCQUZEO0FBUUM7QUFBQTtBQUFBO0FBQ0V6QjtBQURGO0FBUkQsYUFERDtBQWNHOzs7OztBQW5LZ0J6QyxTLENBcUtWbUUsWSxHQUFhO0FBQ2hCNUQsV0FBTyxpQkFBVTZEO0FBREQsQztrQkFyS0hwRSxTIiwiZmlsZSI6Imtub3dsZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtGaWxlLFVJLCBVc2VyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7UmFpc2VkQnV0dG9uLCBEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCBJY29uQ3JlYXRlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiXG5pbXBvcnQgSWNvbkNhbmNlbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2FuY2VsXCJcblxuaW1wb3J0IENhbGVuZGFyLCB7Y25EYXRlVGltZUZvcm1hdCwgYWRkRGF5cywgcmVsYXRpdmUsIGlzRXF1YWxEYXRlLCBnZXRMYXN0RGF5T2ZNb250aH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5cbmltcG9ydCBleHRyYWN0IGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcblxuY29uc3Qge0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZW50aXR5Om51bGwsIHF1ZXVlZDpmYWxzZX1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdFx0LHtfaWQ6Y2hpbGR9PXRoaXMuY29udGV4dC5jaGlsZFxuXHRcdFx0LHN0YXR1cz1cInNjaGVkdWxlZFwiXG5cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS5rbm93bGVkZ2Upe1xuXHRcdFx0ZGJUYXNrLmZpbmQoe2tub3dsZWRnZTp7X2lkfSxjaGlsZCxzdGF0dXN9LHRhc2tzPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUua25vd2xlZGdlfSlcblx0XHR9ZWxzZXtcblx0XHRcdGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XG5cdFx0XHRcdGRiVGFzay5maW5kKHtrbm93bGVkZ2U6e19pZH0sY2hpbGQsc3RhdHVzfSx0YXNrcz0+e1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzfSlcblx0XHRcdFx0fSlcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSlcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZywgdGFza3M9W119PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciBjb21tYW5kcz1bXCJCYWNrXCJdXG5cbiAgICAgICAgaWYodHJ1ZSB8fCBVc2VyLmN1cnJlbnQuX2lkPT1lbnRpdHkuYXV0aG9yLl9pZClcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIk5ldyBWZXJzaW9uXCIsaWNvbjo8SWNvbkNyZWF0ZS8+fSlcblxuICAgICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAncmV2aXNpbmcnOlxuICAgICAgICAgICAgY29tbWFuZHMucHVzaChcIlNhdmVcIilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6dGhpcy5vcmlnaW4sc3RhdHVzOnVuZGVmaW5lZH0pLFxuICAgICAgICAgICAgICAgIGljb246PEljb25DYW5jZWwvPn0pXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLm9yaWdpbj1lbnRpdHlcbiAgICAgICAgICAgIGlmKHRhc2tzLmxlbmd0aD09MClcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJcIiwgbGFiZWw6XCLmt7vliqDor77nqItcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wbGFuKCl9KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIlwiLCBsYWJlbDpcIuWIoOmZpOivvueoi1wifSlcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLlNoYXJlIGtleT1cIlNoYXJlXCIgbWVzc2FnZT17ZW50aXR5fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuXHRwbGFuKGRheSl7XG5cdFx0bGV0IHtlbnRpdHksdGFza3M9W119PXRoaXMuc3RhdGVcblxuXHRcdGRiVGFzay5wbGFuKGVudGl0eSxkYXkpLnRoZW4oYT0+e1xuICAgICAgICAgICAgdGFza3MucHVzaChhKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcIuiuoeWIkuWlveS6hlwiKVxuXHRcdH0pXG5cdH1cblxuICAgIHN0YXRpYyBzZWxlY3REb2N4KCl7XG4gICAgICAgIHJldHVybiBmaWxlU2VsZWN0b3Iuc2VsZWN0KClcbiAgICAgICAgICAgIC50aGVuKGV4dHJhY3QsY29uc29sZS5lcnJvcilcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyQ29udGVudChlbnRpdHksIG9wZW49dHJ1ZSwgdGVtcGxhdGVSZW5kZXIpe1xuICAgICAgICB2YXIge2NhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXSwgZmlndXJlfT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9XG5cbiAgICAgICAgdmFyIGNvbnRlbnQ9PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDplbnRpdHkuY29udGVudH19Lz5cblxuICAgICAgICBpZihlbnRpdHkuc3VtbWFyeSAmJiBvcGVuIT09bnVsbCl7XG4gICAgICAgICAgICBjb250ZW50PShcbiAgICAgICAgICAgICAgICA8ZGV0YWlscyBvcGVuPXtvcGVufT5cbiAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+e2VudGl0eS5zdW1tYXJ5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vdE5ld1N0dWZmXG4gICAgICAgIGlmKGVudGl0eS5faWQpe1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9W1xuICAgICAgICAgICAgICAgICg8aDEga2V5PVwibGluazBcIj48TGluayB0bz17YGtub3dsZWRnZS8ke2VudGl0eS5faWR9YH0+e2VudGl0eS50aXRsZX08L0xpbms+PC9oMT4pLFxuICAgICAgICAgICAgICAgICg8cCBrZXk9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAge2VudGl0eS5hdXRob3IubmFtZX0gLSA8dGltZT57cmVsYXRpdmUoZW50aXR5LmNyZWF0ZWRBdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD4pXG4gICAgICAgICAgICBdXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGluazFcIj57ZW50aXR5LnRpdGxlfTwvaDE+KVxuICAgICAgICB9XG5cblx0XHRpZihmaWd1cmUpXG5cdFx0XHRmaWd1cmU9KDxpbWcgc3JjPXtmaWd1cmV9Lz4pXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGFydGljbGU+XG5cdFx0XHRcdDxmaWd1cmU+e2ZpZ3VyZX08L2ZpZ3VyZT5cblx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHR7bm90TmV3U3R1ZmZ9XG5cdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuXHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0KVxuICAgIH1cblxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cbn1cbiJdfQ==