'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

var _noteAdd = require('material-ui/lib/svg-icons/action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

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
                        } }), text: 'Select word docx file to create' });
                commands = ["Back"];
            } else {
                content = _qiliApp.React.createElement(
                    'div',
                    { className: 'knowledge' },
                    _knowledge4.default.renderContent(entity)
                );
                commands = ["Back", "Save", { action: "New Version", icon: require("material-ui/lib/svg-icons/editor/border-color") }];
                primary = "Save";
            }

            return _qiliApp.React.createElement(
                'div',
                { className: 'post' },
                content,
                _qiliApp.React.createElement(CommandBar, {
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
                    _knowledge2.default.upsert(entity, null, function () {
                        _this3.docx.upload(entity).then(function (content) {
                            entity.photos = _this3.docx.getPhotos();
                            entity.content = content;
                            _knowledge2.default.upsert(_this3.state.entity, null, function () {
                                return _this3.context.router.replaceWith("knowledge", _this3.state.entity);
                            });
                        }, function () {
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

exports.default = NewKnowledge;


NewKnowledge.contextTypes = {
    router: _qiliApp.React.PropTypes.func
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LEdBQWxCLENBREo7QUFFSCxnREFBWSxNQUFaLENBQW1CLE9BQUssS0FBTCxDQUFXLE1BQVgsQ0FBbkIsQ0FGRzt5QkFBSixDQUxILENBRCtCO3FCQUFKLENBQS9CLENBSEo7QUFjSSwwQkFkSjtBQVpBLGFBRGE7Ozs7V0F2Q0E7Ozs7OztBQXVFckIsYUFBYSxZQUFiLEdBQTBCO0FBQ3RCLFlBQVEsZUFBTSxTQUFOLENBQWdCLElBQWhCO0NBRFoiLCJmaWxlIjoibmV3S25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXHJcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcclxuaW1wb3J0IGV4dHJhY3RvciBmcm9tICcuL3BhcnNlci9leHRyYWN0b3InXHJcbmltcG9ydCBJbnNlcnRGaWxlIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkJ1xyXG5cclxudmFyIHtFbXB0eSwgQ29tbWFuZEJhcn09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0tub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlPXt9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0KCdOZXcgVmVyc2lvbicpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGUsIGNvbnRlbnQsIHByaW1hcnksIGNvbW1hbmRzO1xyXG4gICAgICAgIGlmKCFlbnRpdHkpe1xyXG4gICAgICAgICAgICBjb250ZW50PSg8RW1wdHkgaWNvbj17PEluc2VydEZpbGUgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoJ05ldyBWZXJzaW9uJyl9Lz59IHRleHQ9XCJTZWxlY3Qgd29yZCBkb2N4IGZpbGUgdG8gY3JlYXRlXCIvPilcclxuICAgICAgICAgICAgY29tbWFuZHM9W1wiQmFja1wiXVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb250ZW50PSg8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPnt1aUtub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eSl9PC9kaXY+KVxyXG4gICAgICAgICAgICBjb21tYW5kcz1bXCJCYWNrXCIsXCJTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICB7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIil9XVxyXG4gICAgICAgICAgICBwcmltYXJ5PVwiU2F2ZVwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtwcmltYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XHJcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xyXG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcclxuICAgICAgICAgICAgdWlLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZG9jeFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3g9ZG9jeFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB7a25vd2xlZGdlfT1kb2N4XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50aXR5Omtub3dsZWRnZX0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxyXG4gICAgICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZVxyXG4gICAgICAgICAgICBlbnRpdHkuY29udGVudD1cIlwiXHJcbiAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydChlbnRpdHksbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N4LnVwbG9hZChlbnRpdHkpLnRoZW4oKGNvbnRlbnQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LnBob3Rvcz10aGlzLmRvY3guZ2V0UGhvdG9zKClcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuY29udGVudD1jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UudXBzZXJ0KHRoaXMuc3RhdGUuZW50aXR5LG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlV2l0aChcImtub3dsZWRnZVwiLHRoaXMuc3RhdGUuZW50aXR5KSlcclxuICAgICAgICAgICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhdGUuZW50aXR5Ll9pZDtcclxuICAgICAgICAgICAgICAgICAgICBkYktub3dsZWRnZS5yZW1vdmUodGhpcy5zdGF0ZS5lbnRpdHkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuTmV3S25vd2xlZGdlLmNvbnRleHRUeXBlcz17XHJcbiAgICByb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jXHJcbn1cclxuIl19