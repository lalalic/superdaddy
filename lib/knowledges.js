'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _dialpad = require('material-ui/lib/svg-icons/communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

var _thumbUp = require('material-ui/lib/svg-icons/action/thumb-up');

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var CommandBar = _qiliApp.UI.CommandBar;
var Empty = _qiliApp.UI.Empty;
var DialogCommand = CommandBar.DialogCommand;

var Knowledges = function (_Component) {
    _inherits(Knowledges, _Component);

    function Knowledges(p) {
        _classCallCheck(this, Knowledges);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Knowledges).call(this, p));

        _this.state = { model: _knowledge2.default.find(_this.props.query) };
        return _this;
    }

    _createClass(Knowledges, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var model = this.state.model;
            var query = this.props.query;

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(List, {
                    ref: 'list',
                    model: model,
                    empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_dialpad2.default, null), text: 'No knowledge yet, Please stay tune' }),
                    pageSize: 20,
                    template: Item }),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar centerinput',
                    primary: 'Create',
                    items: ["Back", _qiliApp.React.createElement('input', {
                        ref: 'byTitle',
                        type: 'search',
                        placeholder: 'Search',
                        defaultValue: query.title,
                        style: { fontSize: 14, padding: 10 },
                        onFocus: function onFocus() {
                            return _this2.refs.search.show();
                        } }), { action: "Create", icon: require("material-ui/lib/svg-icons/content/create") }],
                    onSelect: this.onSelect.bind(this) }),
                _qiliApp.React.createElement(Search, { ref: 'search', onSearch: function onSearch() {
                        return _this2.search();
                    } })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            switch (command) {
                case 'Create':
                    this.context.router.transitionTo('create');
                    break;
            }
        }
    }, {
        key: 'search',
        value: function search(props) {
            this.refs.search.dismiss();

            var _refs$byTitle$getDOMN = this.refs.byTitle.getDOMNode();

            var _refs$byTitle$getDOMN2 = _refs$byTitle$getDOMN.value;
            var title = _refs$byTitle$getDOMN2 === undefined ? "" : _refs$byTitle$getDOMN2;

            title = title.trim();
            if (title.length) props.title = title;
            this.context.router.replaceWith("knowledges", null, props);
        }
    }]);

    return Knowledges;
}(_qiliApp.Component);

exports.default = Knowledges;

var Search = function (_DialogCommand) {
    _inherits(Search, _DialogCommand);

    function Search() {
        _classCallCheck(this, Search);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
    }

    _createClass(Search, [{
        key: 'renderContent',
        value: function renderContent() {
            var _context$router$getCu = this.context.router.getCurrentQuery();

            var age = _context$router$getCu.age;
            var gender = _context$router$getCu.gender;
            var category = _context$router$getCu.category;

            return [_qiliApp.React.createElement(CheckGroup, { ref: 'age', key: 'Age', label: 'Age (Year)', single: true,
                selected: age,
                items: "0.5, 1, 2, 3, 4, 5, 6, 8, 10".split(',') }), _qiliApp.React.createElement(CheckGroup, { ref: 'gender', key: 'Gender', label: 'Gender',
                selected: gender,
                items: "Girl,Boy".split(',') }), _qiliApp.React.createElement(CheckGroup, { ref: 'category', key: 'Category', label: 'Category',
                selected: category,
                items: "Observe, Study, Sport".split(',') }), _qiliApp.React.createElement(
                'div',
                { key: 'actions', style: { padding: 10, textAlign: 'center' } },
                _qiliApp.React.createElement(
                    _materialUi.RaisedButton,
                    { primary: true, onClick: this.search.bind(this) },
                    'Search'
                )
            )];
        }
    }, {
        key: 'search',
        value: function search() {
            var onSearch = this.props.onSearch;
            var age = this.refs.age.state.selected;
            var gender = Array.from(this.refs.gender.state.selected);
            var category = Array.from(this.refs.category.state.selected);
            onSearch && onSearch({ age: age, gender: gender, category: category });
        }
    }]);

    return Search;
}(DialogCommand);

Search.contextTypes = { router: _qiliApp.React.PropTypes.func };

var CheckGroup = function (_Component2) {
    _inherits(CheckGroup, _Component2);

    function CheckGroup(props) {
        _classCallCheck(this, CheckGroup);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckGroup).call(this, props));

        _this4.componentWillReceiveProps(_this4.props);
        return _this4;
    }

    _createClass(CheckGroup, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(next) {
            var selected = next.selected;
            var single = next.single;

            this.state = {};
            if (single) this.state.selected = selected;else if (Array.isArray(selected)) {
                this.state.selected = new Set(selected);
            } else this.state.selected = new Set();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var items = _props.items;
            var label = _props.label;
            var onChange = _props.onChange;
            var single = _props.single;
            var selected = this.state.selected;
            var selectedStyle = { padding: 5, borderRight: '1px solid lightgray',
                color: 'white', backgroundColor: 'red' };
            var unselectedStyle = Object.assign({}, selectedStyle, { color: 'black', backgroundColor: 'transparent' });

            return _qiliApp.React.createElement(
                _materialUi.ClearFix,
                { style: { padding: 10 } },
                _qiliApp.React.createElement(
                    'span',
                    null,
                    label
                ),
                _qiliApp.React.createElement(
                    'span',
                    { style: { float: 'right', padding: '5px 0px', border: '1px solid lightgray', borderRight: 0 } },
                    items.map(function (a) {
                        var _this5 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _qiliApp.React.createElement(
                            'span',
                            {
                                key: a,
                                onClick: function onClick() {
                                    return _this5.onSelect(a);
                                },
                                style: (single ? selected == a : selected.has(a)) ? selectedStyle : unselectedStyle },
                            a
                        );
                    }.bind(this))
                )
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(item) {
            var a = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var single = this.props.single;
            var selected = this.state.selected;


            if (single) this.setState({ selected: selected == item ? undefined : item });else {
                selected[selected.has(item) ? 'delete' : 'add'](item);
                this.setState({ selected: selected });
            }
        }
    }]);

    return CheckGroup;
}(_qiliApp.Component);

CheckGroup.defaultProps = { single: false };

var Item = function (_Component3) {
    _inherits(Item, _Component3);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            var _props$model$photos = this.props.model.photos;
            var photos = _props$model$photos === undefined ? [] : _props$model$photos;

            switch (photos.length) {
                case 0:
                    return this._0photo();
                case 1:
                case 2:
                    return this._1photo();
                default:
                    return this._3photo();
            }
        }
    }, {
        key: '_0photo',
        value: function _0photo() {
            var _this7 = this;

            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo0' }, others, { onClick: function onClick() {
                        return _this7.onDetail();
                    } }),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'title' },
                    model.title
                ),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'summary' },
                    model.summary
                ),
                this._more(model)
            );
        }
    }, {
        key: '_1photo',
        value: function _1photo() {
            var _this8 = this;

            var _props3 = this.props;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
                        return _this8.onDetail();
                    } }),
                _qiliApp.React.createElement(
                    'div',
                    null,
                    _qiliApp.React.createElement(
                        'div',
                        { className: 'title' },
                        model.title
                    ),
                    this._more(model)
                ),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'photos' },
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[0] })
                    )
                )
            );
        }
    }, {
        key: '_3photo',
        value: function _3photo() {
            var _this9 = this;

            var _props4 = this.props;
            var model = _props4.model;

            var others = _objectWithoutProperties(_props4, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo3' }, others, { onClick: function onClick() {
                        return _this9.onDetail();
                    } }),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'title' },
                    model.title
                ),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'photos' },
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[0] })
                    ),
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[1] })
                    ),
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[2] })
                    )
                ),
                this._more(model)
            );
        }
    }, {
        key: '_more',
        value: function _more(model) {
            var time = _knowledge4.default.date2String(model.createdAt || model.updatedAt);

            var zan = model.zans ? _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(_thumbUp2.default, null),
                model.zans
            ) : null;
            return _qiliApp.React.createElement(
                'div',
                { className: 'more' },
                _qiliApp.React.createElement(
                    'time',
                    null,
                    time
                ),
                zan
            );
        }
    }, {
        key: 'onDetail',
        value: function onDetail() {
            this.context.router.transitionTo('knowledge', this.props.model);
        }
    }]);

    return Item;
}(_qiliApp.Component);

Item.contextTypes = Knowledges.contextTypes = { router: _qiliApp.React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LE1BQU0sTUFBTixDQUFhLENBQWIsQ0FBTCxFQUFMLENBQUw7cUJBREo7b0JBRUk7Ozt3QkFBSyxzQ0FBSyxLQUFLLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FBTCxFQUFMLENBQUw7cUJBRko7b0JBR0k7Ozt3QkFBSyxzQ0FBSyxLQUFLLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FBTCxFQUFMLENBQUw7cUJBSEo7aUJBRko7Z0JBT0MsS0FBSyxLQUFMLENBQVcsS0FBWCxDQVBEO2FBREosQ0FGSzs7Ozs4QkFlSCxPQUFNO0FBQ1IsZ0JBQUksT0FBSyxvQkFBWSxXQUFaLENBQXdCLE1BQU0sU0FBTixJQUFpQixNQUFNLFNBQU4sQ0FBOUMsQ0FESTs7QUFHUixnQkFBSSxNQUFJLE1BQU0sSUFBTixHQUFjOzs7Z0JBQUsscURBQUw7Z0JBQW9CLE1BQU0sSUFBTjthQUFsQyxHQUF1RCxJQUF2RCxDQUhBO0FBSVIsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNJOzs7b0JBQU8sSUFBUDtpQkFESjtnQkFFSyxHQUZMO2FBREosQ0FKUTs7OzttQ0FXRjtBQUNOLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLFdBQWpDLEVBQTZDLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBN0MsQ0FETTs7OztXQWpFUjs7O0FBcUVOLEtBQUssWUFBTCxHQUFrQixXQUFXLFlBQVgsR0FBd0IsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixJQUFoQixFQUFoQyIsImZpbGUiOiJrbm93bGVkZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b24sQ2xlYXJGaXh9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvblRodW1idXAgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL3RodW1iLXVwXCJcblxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCJcblxuY29uc3QgIHtMaXN0LCBDb21tYW5kQmFyLCBFbXB0eX09VUlcbiAgICAgICAgLHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZXMgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocCl7XG4gICAgICAgIHN1cGVyKHApXG4gICAgICAgIHRoaXMuc3RhdGU9e21vZGVsOmRiS25vd2xlZGdlLmZpbmQodGhpcy5wcm9wcy5xdWVyeSl9XG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3F1ZXJ5fT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxMaXN0XG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImxpc3RcIlxuICAgICAgICAgICAgICAgICAgICBtb2RlbD17bW9kZWx9XG4gICAgICAgICAgICAgICAgICAgIGVtcHR5PXs8RW1wdHkgaWNvbj17PEljb25Lbm93bGVkZ2VzLz59IHRleHQ9XCJObyBrbm93bGVkZ2UgeWV0LCBQbGVhc2Ugc3RheSB0dW5lXCIvPn1cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU9ezIwfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT17SXRlbX0vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJDcmVhdGVcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgKDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImJ5VGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3F1ZXJ5LnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Zm9udFNpemU6MTQscGFkZGluZzoxMH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17KCk9PnRoaXMucmVmcy5zZWFyY2guc2hvdygpfS8+KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJDcmVhdGVcIiwgaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9jb250ZW50L2NyZWF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX0vPlxuXG4gICAgICAgICAgICAgICAgPFNlYXJjaCByZWY9XCJzZWFyY2hcIiBvblNlYXJjaD17KCk9PnRoaXMuc2VhcmNoKCl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ0NyZWF0ZSc6XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygnY3JlYXRlJylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWFyY2gocHJvcHMpe1xuICAgICAgICB0aGlzLnJlZnMuc2VhcmNoLmRpc21pc3MoKVxuICAgICAgICB2YXIge3ZhbHVlOnRpdGxlPVwiXCJ9PXRoaXMucmVmcy5ieVRpdGxlLmdldERPTU5vZGUoKVxuICAgICAgICB0aXRsZT10aXRsZS50cmltKClcbiAgICAgICAgaWYodGl0bGUubGVuZ3RoKVxuICAgICAgICAgICAgcHJvcHMudGl0bGU9dGl0bGVcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlV2l0aChcImtub3dsZWRnZXNcIixudWxsLCBwcm9wcylcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FnZSxnZW5kZXIsY2F0ZWdvcnl9PXRoaXMuY29udGV4dC5yb3V0ZXIuZ2V0Q3VycmVudFF1ZXJ5KClcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJhZ2VcIiBrZXk9XCJBZ2VcIiBsYWJlbD1cIkFnZSAoWWVhcilcIiBzaW5nbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FnZX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCIwLjUsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDEwXCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiZ2VuZGVyXCIga2V5PVwiR2VuZGVyXCIgbGFiZWw9XCJHZW5kZXJcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtnZW5kZXJ9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiR2lybCxCb3lcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJjYXRlZ29yeVwiIGtleT1cIkNhdGVnb3J5XCIgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIk9ic2VydmUsIFN0dWR5LCBTcG9ydFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxkaXYga2V5PVwiYWN0aW9uc1wiIHN0eWxlPXt7cGFkZGluZzoxMCwgdGV4dEFsaWduOidjZW50ZXInfX0+XG4gICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBvbkNsaWNrPXt0aGlzLnNlYXJjaC5iaW5kKHRoaXMpfT5TZWFyY2g8L1JhaXNlZEJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBzZWFyY2goKXtcbiAgICAgICAgdmFyIHtvblNlYXJjaH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGFnZT10aGlzLnJlZnMuYWdlLnN0YXRlLnNlbGVjdGVkLFxuICAgICAgICAgICAgZ2VuZGVyPUFycmF5LmZyb20odGhpcy5yZWZzLmdlbmRlci5zdGF0ZS5zZWxlY3RlZCksXG4gICAgICAgICAgICBjYXRlZ29yeT1BcnJheS5mcm9tKHRoaXMucmVmcy5jYXRlZ29yeS5zdGF0ZS5zZWxlY3RlZCk7XG4gICAgICAgIG9uU2VhcmNoICYmIG9uU2VhcmNoKHthZ2U6YWdlLGdlbmRlcjpnZW5kZXIsY2F0ZWdvcnk6Y2F0ZWdvcnl9KVxuICAgIH1cbn1cblxuU2VhcmNoLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuXG5jbGFzcyBDaGVja0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh0aGlzLnByb3BzKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICB2YXIge3NlbGVjdGVkLCBzaW5nbGV9PW5leHRcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPXNlbGVjdGVkO1xuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldChzZWxlY3RlZClcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldCgpXG5cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhcntpdGVtcywgbGFiZWwsIG9uQ2hhbmdlLCBzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZFN0eWxlPXtwYWRkaW5nOjUsIGJvcmRlclJpZ2h0OicxcHggc29saWQgbGlnaHRncmF5JyxcbiAgICAgICAgICAgICAgICBjb2xvcjond2hpdGUnLGJhY2tncm91bmRDb2xvcjoncmVkJ30sXG4gICAgICAgICAgICB1bnNlbGVjdGVkU3R5bGU9T2JqZWN0LmFzc2lnbih7fSxzZWxlY3RlZFN0eWxlLHtjb2xvcjonYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J30pO1xuXG4gICAgICAgIHJldHVybig8Q2xlYXJGaXggc3R5bGU9e3twYWRkaW5nOjEwfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2Zsb2F0OidyaWdodCcscGFkZGluZzonNXB4IDBweCcsIGJvcmRlcjonMXB4IHNvbGlkIGxpZ2h0Z3JheScsIGJvcmRlclJpZ2h0OjB9fT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihhKSE9J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhPWEudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdChhKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17KHNpbmdsZSA/IHNlbGVjdGVkPT1hIDogc2VsZWN0ZWQuaGFzKGEpKSA/IHNlbGVjdGVkU3R5bGUgOiB1bnNlbGVjdGVkU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthfTwvc3Bhbj4pXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9DbGVhckZpeD4pXG4gICAgfVxuICAgIG9uU2VsZWN0KGl0ZW0sIGE9e30pe1xuICAgICAgICB2YXJ7c2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBzZWxlY3RlZD09aXRlbSA/IHVuZGVmaW5lZCA6IGl0ZW19KTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNlbGVjdGVkW3NlbGVjdGVkLmhhcyhpdGVtKSA/ICdkZWxldGUnIDogJ2FkZCddKGl0ZW0pXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDpzZWxlY3RlZH0pXG4gICAgICAgIH1cbiAgICB9XG59XG5DaGVja0dyb3VwLmRlZmF1bHRQcm9wcz17c2luZ2xlOmZhbHNlfVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOntwaG90b3M9W119fT10aGlzLnByb3BzXG4gICAgICAgIHN3aXRjaChwaG90b3MubGVuZ3RoKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzBwaG90bygpXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzFwaG90bygpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fM3Bob3RvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF8wcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8wXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1bW1hcnlcIj57bW9kZWwuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBfMXBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgXzNwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzNcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMV19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzJdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9tb3JlKG1vZGVsKXtcbiAgICAgICAgdmFyIHRpbWU9dWlLbm93bGVkZ2UuZGF0ZTJTdHJpbmcobW9kZWwuY3JlYXRlZEF0fHxtb2RlbC51cGRhdGVkQXQpXG4gXG4gICAgICAgIHZhciB6YW49bW9kZWwuemFucyA/ICg8ZGl2PjxJY29uVGh1bWJ1cC8+e21vZGVsLnphbnN9PC9kaXY+KSA6IG51bGxcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lPnt0aW1lfTwvdGltZT5cbiAgICAgICAgICAgICAgICB7emFufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25EZXRhaWwoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2tub3dsZWRnZScsdGhpcy5wcm9wcy5tb2RlbClcbiAgICB9XG59XG5JdGVtLmNvbnRleHRUeXBlcz1Lbm93bGVkZ2VzLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuIl19