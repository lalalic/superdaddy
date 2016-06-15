'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _noteAdd = require('material-ui/svg-icons/action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;
var CommandBar = _qiliApp.UI.CommandBar;

var NewKnowledge = function (_Component) {
    _inherits(NewKnowledge, _Component);

    function NewKnowledge(props) {
        _classCallCheck(this, NewKnowledge);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewKnowledge).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(NewKnowledge, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onSelect('New Version');
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.docx && this.docx.revoke();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var entity = this.state.entity;var content;var primary;var commands;
            if (!entity) {
                content = _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_noteAdd2.default, { onClick: function onClick() {
                            return _this2.onSelect('New Version');
                        } }),
                    text: '选择docx文案文件' });
            } else {
                content = _qiliApp.React.createElement(
                    'div',
                    { className: 'knowledge' },
                    _knowledge4.default.renderContent(entity)
                );
                commands = ["Save", { action: "New Version", icon: _borderColor2.default }];
                primary = "Save";
            }

            return _qiliApp.React.createElement(
                'div',
                { className: 'post' },
                content,
                commands && _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    primary: primary,
                    onSelect: this.onSelect.bind(this),
                    items: commands })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            var _this3 = this;

            switch (command) {
                case 'New Version':
                    _knowledge4.default.selectDocx().then(function (docx) {
                        _this3.docx && _this3.docx.revoke();
                        delete _this3.docx;

                        _this3.docx = docx;
                        var knowledge = docx.knowledge;

                        _this3.setState({ entity: knowledge });
                    });
                    break;
                case 'Save':
                    var entity = this.state.entity;

                    entity.content = "";
                    _knowledge2.default.upsert(entity).then(function (a) {
                        _this3.docx.upload(entity).then(function (content) {
                            entity.photos = _this3.docx.getPhotos();
                            entity.content = content;
                            _knowledge2.default.upsert(_this3.state.entity).then(function (a) {
                                return _this3.context.router.replace('knowledge/' + _this3.state.entity._id);
                            });
                        }, function (a) {
                            delete _this3.state.entity._id;
                            _knowledge2.default.remove(_this3.state.entity);
                        });
                    });
                    break;
            }
        }
    }]);

    return NewKnowledge;
}(_qiliApp.Component);

NewKnowledge.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = NewKnowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QW5CLENBRkU7eUJBQUgsQ0FMSCxDQUQrQjtxQkFBSCxDQUFoQyxDQUhKO0FBY0ksMEJBZEo7QUFaQSxhQURhOzs7O1dBdkNBOzs7YUFzRWIsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQXRFUiIsImZpbGUiOiJuZXdLbm93bGVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJfSBmcm9tICdxaWxpLWFwcCdcclxuaW1wb3J0IEluc2VydEZpbGUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ub3RlLWFkZCdcclxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcclxuXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tICcuL2RiL2tub3dsZWRnZSdcclxuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xyXG5pbXBvcnQgZXh0cmFjdG9yIGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcclxuXHJcbmNvbnN0IHtFbXB0eSwgQ29tbWFuZEJhcn09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0tub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlPXt9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0KCdOZXcgVmVyc2lvbicpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGUsIGNvbnRlbnQsIHByaW1hcnksIGNvbW1hbmRzO1xyXG4gICAgICAgIGlmKCFlbnRpdHkpe1xyXG4gICAgICAgICAgICBjb250ZW50PSg8RW1wdHkgaWNvbj17PEluc2VydEZpbGUgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoJ05ldyBWZXJzaW9uJyl9Lz59XHJcblx0XHRcdFx0dGV4dD1cIumAieaLqWRvY3jmlofmoYjmlofku7ZcIi8+KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb250ZW50PSg8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPnt1aUtub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eSl9PC9kaXY+KVxyXG4gICAgICAgICAgICBjb21tYW5kcz1bXCJTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICB7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOkljb25DcmVhdGV9XVxyXG4gICAgICAgICAgICBwcmltYXJ5PVwiU2F2ZVwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgICAge2NvbW1hbmRzICYmICg8Q29tbWFuZEJhclxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e3ByaW1hcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y29tbWFuZHN9Lz4pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xyXG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcclxuICAgICAgICBjYXNlICdOZXcgVmVyc2lvbic6XHJcbiAgICAgICAgICAgIHVpS25vd2xlZGdlLnNlbGVjdERvY3goKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZG9jeD0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeD1kb2N4XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRpdHk6a25vd2xlZGdlfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgY2FzZSAnU2F2ZSc6XHJcbiAgICAgICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlXHJcbiAgICAgICAgICAgIGVudGl0eS5jb250ZW50PVwiXCJcclxuICAgICAgICAgICAgZGJLbm93bGVkZ2UudXBzZXJ0KGVudGl0eSkudGhlbihhPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3gudXBsb2FkKGVudGl0eSkudGhlbihjb250ZW50PT57XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LnBob3Rvcz10aGlzLmRvY3guZ2V0UGhvdG9zKClcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuY29udGVudD1jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UudXBzZXJ0KHRoaXMuc3RhdGUuZW50aXR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGtub3dsZWRnZS8ke3RoaXMuc3RhdGUuZW50aXR5Ll9pZH1gKSlcclxuICAgICAgICAgICAgICAgIH0sIGE9PntcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zdGF0ZS5lbnRpdHkuX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnJlbW92ZSh0aGlzLnN0YXRlLmVudGl0eSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cclxufVxyXG4iXX0=