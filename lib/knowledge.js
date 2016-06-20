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
            var template = new Template(entity.content);

            var content = _qiliApp.React.createElement('div', { dangerouslySetInnerHTML: entity.content });

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

exports.default = Knowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LE9BQU8sT0FBUCxDQUF0QixDQUgrQzs7QUFLbkQsZ0JBQUksVUFBUSxzQ0FBSyx5QkFBeUIsT0FBTyxPQUFQLEVBQTlCLENBQVIsQ0FMK0M7O0FBT25ELGdCQUFHLE9BQU8sT0FBUCxJQUFrQixTQUFPLElBQVAsRUFBWTtBQUM3QiwwQkFDSTs7c0JBQVMsTUFBTSxJQUFOLEVBQVQ7b0JBQ0k7Ozt3QkFBVSxPQUFPLE9BQVA7cUJBRGQ7b0JBRUssT0FGTDtpQkFESixDQUQ2QjthQUFqQzs7QUFTQSxnQkFBSSxXQUFKLENBaEJtRDtBQWlCbkQsZ0JBQUcsT0FBTyxHQUFQLEVBQVc7QUFDViw4QkFBWSxDQUNQOztzQkFBSSxLQUFJLE9BQUosRUFBSjtvQkFBZ0I7OzBCQUFNLG1CQUFpQixPQUFPLEdBQVAsRUFBdkI7d0JBQXNDLE9BQU8sS0FBUDtxQkFBdEQ7aUJBRE8sRUFFUDs7c0JBQUcsS0FBSSxRQUFKLEVBQUg7b0JBQ0ksT0FBTyxNQUFQLENBQWMsSUFBZDt5QkFESjtvQkFDMEI7Ozt3QkFBTyx3QkFBUyxPQUFPLFNBQVAsQ0FBaEI7cUJBRDFCO2lCQUZPLENBQVosQ0FEVTthQUFkLE1BT007QUFDRiw4QkFBYTs7c0JBQUksS0FBSSxPQUFKLEVBQUo7b0JBQWlCLE9BQU8sS0FBUDtpQkFBOUIsQ0FERTthQVBOOztBQVdOLGdCQUFHLE1BQUgsRUFDQyxTQUFRLHNDQUFLLEtBQUssTUFBTCxFQUFMLENBQVIsQ0FERDs7QUFHQSxtQkFDQzs7O2dCQUNDOzs7b0JBQVMsTUFBVDtpQkFERDtnQkFFQzs7O29CQUNFLFdBREY7b0JBRUM7Ozt3QkFDRSxTQUFTLElBQVQsQ0FBYyxJQUFkLENBREY7O3dCQUN3QixTQUFTLElBQVQsQ0FBYyxJQUFkLENBRHhCO3FCQUZEO2lCQUZEO2dCQVFDOzs7b0JBQ0UsT0FERjtpQkFSRDthQURELENBL0J5RDs7OztXQXRIdEMiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b24sIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuXG5pbXBvcnQgQ2FsZW5kYXIsIHtjbkRhdGVUaW1lRm9ybWF0LCBhZGREYXlzLCByZWxhdGl2ZSwgaXNFcXVhbERhdGUsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcblxuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xuXG5jb25zdCB7TGlzdCxMb2FkaW5nLENvbW1lbnQsQ29tbWFuZEJhcixmaWxlU2VsZWN0b3J9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e2VudGl0eTpudWxsLCBxdWV1ZWQ6ZmFsc2V9XG5cblx0Z2V0RGF0YShfaWQpe1xuXHRcdGxldCB7c3RhdGV9PXRoaXMucHJvcHMubG9jYXRpb25cblx0XHRcdCx7X2lkOmNoaWxkfT10aGlzLnByb3BzLmNoaWxkXG5cdFx0XHQsc3RhdHVzPVwic2NoZWR1bGVkXCJcblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLmtub3dsZWRnZSl7XG5cdFx0XHRkYlRhc2suZmluZCh7a25vd2xlZGdlOntfaWR9LGNoaWxkLHN0YXR1c30sdGFza3M9Pntcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0fSlcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eTpzdGF0ZS5rbm93bGVkZ2V9KVxuXHRcdH1lbHNle1xuXHRcdFx0ZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkfSxlbnRpdHk9Pntcblx0XHRcdFx0ZGJUYXNrLmZpbmQoe2tub3dsZWRnZTp7X2lkfSxjaGlsZCxzdGF0dXN9LHRhc2tzPT57XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3N9KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHl9KVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgICAgICAgICB0aGlzLmdldERhdGUobmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2VudGl0eSwgc3RhdHVzLCBwbGFuaW5nLCB0YXNrc309dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl1cblx0XHRcdCxub3c9bmV3IERhdGUoKVxuXHRcdFx0LHNjaGVkdWxlZD10YXNrcy5tYXAoYT0+YS5zY2hlZHVsZWRBdClcblxuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWVudGl0eS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOkljb25DcmVhdGV9KVxuXG4gICAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlICdyZXZpc2luZyc6XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKFwiU2F2ZVwiKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiQ2FuY2VsXCIsXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTp0aGlzLm9yaWdpbixzdGF0dXM6dW5kZWZpbmVkfSksXG4gICAgICAgICAgICAgICAgaWNvbjpJY29uQ2FuY2VsfSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMub3JpZ2luPWVudGl0eVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiXCIsIGxhYmVsOlwi5re75Yqg6K++56iLXCIsIG9uU2VsZWN0OmU9PnRoaXMucGxhbigpfSlcblxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5Db21tZW50IGtleT1cIkNvbW1lbnRcIiB0eXBlPXtkYktub3dsZWRnZX0gbW9kZWw9e2VudGl0eX0vPilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuU2hhcmUga2V5PVwiU2hhcmVcIiBtZXNzYWdlPXtlbnRpdHl9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge0tub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y29tbWFuZHN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSAnTmV3IFZlcnNpb24nOlxuICAgICAgICAgICAgS25vd2xlZGdlLnNlbGVjdERvY3goKVxuICAgICAgICAgICAgICAgIC50aGVuKChkb2N4KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3g9ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZz1PYmplY3QuYXNzaWduKHt9LHRoaXMuc3RhdGUuZW50aXR5LGtub3dsZWRnZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnBlbmRpbmcsIHN0YXR1czoncmV2aXNpbmcnfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnU2F2ZSc6XG4gICAgICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgdGhpcy5kb2N4LnVwbG9hZChlbnRpdHkpLnRoZW4oKGNvbnRlbnQpPT57XG4gICAgICAgICAgICAgICAgZW50aXR5LnBob3Rvcz10aGlzLmRvY3guZ2V0UGhvdG9zKClcbiAgICAgICAgICAgICAgICBlbnRpdHkuY29udGVudD1jb250ZW50XG4gICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UudXBzZXJ0KHRoaXMuc3RhdGUuZW50aXR5LCB0aGlzLm9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgKCk9PnRoaXMuc2V0U3RhdGUoe3N0YXR1czp1bmRlZmluZWR9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG5cdHBsYW4oZGF5KXtcblx0XHRsZXQge2VudGl0eX09dGhpcy5zdGF0ZVxuXG5cdFx0ZGJUYXNrLnBsYW4oZW50aXR5LGRheSkudGhlbihhPT57XG5cdFx0XHR0YXNrcy5wdXNoKGEpXG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0fSlcblx0fVxuXG4gICAgc3RhdGljIHNlbGVjdERvY3goKXtcbiAgICAgICAgcmV0dXJuIGZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuICAgICAgICAgICAgLnRoZW4oZXh0cmFjdCxjb25zb2xlLmVycm9yKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmV9PWVudGl0eSxcbiAgICAgICAgICAgIHNlbmNvbmRhcnlTdHlsZT17Zm9udFNpemU6J3NtYWxsJyxmb250V2VpZ2h0Oidub3JtYWwnLCB0ZXh0QWxpZ246J3JpZ2h0J30sXG4gICAgICAgICAgICB0ZW1wbGF0ZT1uZXcgVGVtcGxhdGUoZW50aXR5LmNvbnRlbnQpO1xuXG4gICAgICAgIHZhciBjb250ZW50PTxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2VudGl0eS5jb250ZW50fS8+XG5cbiAgICAgICAgaWYoZW50aXR5LnN1bW1hcnkgJiYgb3BlbiE9PW51bGwpe1xuICAgICAgICAgICAgY29udGVudD0oXG4gICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PntlbnRpdHkuc3VtbWFyeX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3ROZXdTdHVmZlxuICAgICAgICBpZihlbnRpdHkuX2lkKXtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPVtcbiAgICAgICAgICAgICAgICAoPGgxIGtleT1cImxpbmswXCI+PExpbmsgdG89e2Brbm93bGVkZ2UvJHtlbnRpdHkuX2lkfWB9PntlbnRpdHkudGl0bGV9PC9MaW5rPjwvaDE+KSxcbiAgICAgICAgICAgICAgICAoPHAga2V5PVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIHtlbnRpdHkuYXV0aG9yLm5hbWV9IC0gPHRpbWU+e3JlbGF0aXZlKGVudGl0eS5jcmVhdGVkQXQpfTwvdGltZT5cbiAgICAgICAgICAgICAgICA8L3A+KVxuICAgICAgICAgICAgXVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj0oPGgxIGtleT1cImxpbmsxXCI+e2VudGl0eS50aXRsZX08L2gxPilcbiAgICAgICAgfVxuXG5cdFx0aWYoZmlndXJlKVxuXHRcdFx0ZmlndXJlPSg8aW1nIHNyYz17ZmlndXJlfS8+KVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8ZmlndXJlPntmaWd1cmV9PC9maWd1cmU+XG5cdFx0XHRcdDxoZWFkZXI+XG5cdFx0XHRcdFx0e25vdE5ld1N0dWZmfVxuXHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0e2NhdGVnb3J5LmpvaW4oXCIsIFwiKX0ge2tleXdvcmRzLmpvaW4oXCIsIFwiKX1cblx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0PC9zZWN0aW9uPlxuXHRcdFx0PC9hcnRpY2xlPlxuXHRcdClcbiAgICB9XG59XG4iXX0=