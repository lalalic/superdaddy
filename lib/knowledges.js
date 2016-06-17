'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _materialUi = require('material-ui');

var _dialpad = require('material-ui/svg-icons/communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

var _thumbUp = require('material-ui/svg-icons/action/thumb-up');

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _search = require('material-ui/svg-icons/action/search');

var _search2 = _interopRequireDefault(_search);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _calendar = require('./components/calendar');

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

    function Knowledges() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Knowledges);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Knowledges)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { model: null }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Knowledges, [{
        key: 'getData',
        value: function getData() {
            var _this2 = this;

            _knowledge2.default.find( /*this.props.location.query*/{}).fetch(function (model) {
                _this2.setState({ model: model });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var model = this.state.model;
            var _props$location$query = this.props.location.query;
            var query = _props$location$query === undefined ? {} : _props$location$query;

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(
                    _materialUi.FloatingActionButton,
                    {
                        onClick: function onClick(e) {
                            return _this3.context.router.push('knowledge');
                        },
                        className: 'creator sticky bottom right',
                        mini: true },
                    _qiliApp.React.createElement(_add2.default, null)
                ),
                _qiliApp.React.createElement(_materialUi.AppBar, {
                    iconElementLeft: _qiliApp.React.createElement('span', null),
                    iconElementRight: _qiliApp.React.createElement(
                        _materialUi.IconButton,
                        { onClick: function onClick(e) {
                                return _this3.search();
                            } },
                        _qiliApp.React.createElement(_search2.default, null)
                    ),
                    title: _qiliApp.React.createElement(_materialUi.TextField, { name: 'search',
                        hintText: '查询',
                        onKeyDown: function onKeyDown(e) {
                            return e.keycode == 13 && _this3.search(e.target.value);
                        },
                        fullWidth: true, defaultValue: query.title }) }),
                _qiliApp.React.createElement(List, {
                    ref: 'list',
                    model: model,
                    empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_dialpad2.default, null), text: 'No knowledge yet, Please stay tune' }),
                    pageSize: 20,
                    template: Item })
            );
        }
    }, {
        key: 'search',
        value: function search(props) {
            this.refs.search.dismiss();

            var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(this.refs.byTitle);

            var _ReactDOM$findDOMNode2 = _ReactDOM$findDOMNode.value;
            var title = _ReactDOM$findDOMNode2 === undefined ? "" : _ReactDOM$findDOMNode2;

            title = title.trim();
            if (title.length) props.title = title;
            this.context.router.replace(this.context.router.createPath("knowledges", props));
        }
    }]);

    return Knowledges;
}(_qiliApp.Component);

Knowledges.contextTypes = { router: _qiliApp.React.PropTypes.object };
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
            var _this5 = this;

            var _ref = this.props.query || {};

            var age = _ref.age;
            var gender = _ref.gender;
            var category = _ref.category;


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
                    RaisedButton,
                    { primary: true, onClick: function onClick(e) {
                            var age = _this5.refs.age.state.selected,
                                gender = Array.from(_this5.refs.gender.state.selected),
                                category = Array.from(_this5.refs.category.state.selected);

                            _this5.props.onSearch({ age: age, gender: gender, category: category });
                        } },
                    'Search'
                )
            )];
        }
    }]);

    return Search;
}(DialogCommand);

var CheckGroup = function (_Component2) {
    _inherits(CheckGroup, _Component2);

    function CheckGroup(props) {
        _classCallCheck(this, CheckGroup);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckGroup).call(this, props));

        _this6.componentWillReceiveProps(_this6.props);
        return _this6;
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
                'div',
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
                        var _this7 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _qiliApp.React.createElement(
                            'span',
                            {
                                key: a,
                                onClick: function onClick() {
                                    return _this7.onSelect(a);
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
            var _this9 = this;

            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo0' }, others, { onClick: function onClick() {
                        return _this9.onDetail();
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
            var _this10 = this;

            var _props3 = this.props;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
                        return _this10.onDetail();
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
            var _this11 = this;

            var _props4 = this.props;
            var model = _props4.model;

            var others = _objectWithoutProperties(_props4, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo3' }, others, { onClick: function onClick() {
                        return _this11.onDetail();
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
            var time = (0, _calendar.relative)(model.createdAt || model.updatedAt);

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
            this.context.router.push({ pathname: 'knowledge/' + this.props.model._id, state: { knowledge: this.props.model } });
        }
    }]);

    return Item;
}(_qiliApp.Component);

Item.contextTypes = { router: _qiliApp.React.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QU0sTUFBTixDQUFhLENBQWIsQ0FBTCxFQUFMLENBQUw7cUJBSEo7aUJBRko7Z0JBT0MsS0FBSyxLQUFMLENBQVcsS0FBWCxDQVBEO2FBREosQ0FGSzs7Ozs4QkFlSCxPQUFNO0FBQ1IsZ0JBQUksT0FBSyx3QkFBUyxNQUFNLFNBQU4sSUFBaUIsTUFBTSxTQUFOLENBQS9CLENBREk7O0FBR1IsZ0JBQUksTUFBSSxNQUFNLElBQU4sR0FBYzs7O2dCQUFLLHFEQUFMO2dCQUFvQixNQUFNLElBQU47YUFBbEMsR0FBdUQsSUFBdkQsQ0FIQTtBQUlSLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDSTs7O29CQUFPLElBQVA7aUJBREo7Z0JBRUssR0FGTDthQURKLENBSlE7Ozs7bUNBV0Y7QUFDTixpQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUF5QixFQUFDLHlCQUFzQixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLEVBQXVCLE9BQU0sRUFBQyxXQUFVLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBakIsRUFBdkUsRUFETTs7OztXQWpFUjs7O0tBb0VFLGVBQWEsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQiIsImZpbGUiOiJrbm93bGVkZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgSWNvbkJ1dHRvbiwgQXBwQmFyLCBUZXh0RmllbGR9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25UaHVtYnVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3RodW1iLXVwXCJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGRcIlxuaW1wb3J0IEljb25TZWFyY2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2VhcmNoXCJcblxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IHtyZWxhdGl2ZX0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuXG5jb25zdCB7TGlzdCwgQ29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZXMgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e21vZGVsOm51bGx9XG5cbiAgICBnZXREYXRhKCl7XG4gICAgICAgIGRiS25vd2xlZGdlLmZpbmQoLyp0aGlzLnByb3BzLmxvY2F0aW9uLnF1ZXJ5Ki97fSkuZmV0Y2gobW9kZWw9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21vZGVsfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3F1ZXJ5PXt9fT10aGlzLnByb3BzLmxvY2F0aW9uXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ2tub3dsZWRnZScpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjcmVhdG9yIHN0aWNreSBib3R0b20gcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICBtaW5pPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgPEljb25BZGQvPlxuICAgICAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cbiAgICAgICAgICAgICAgICA8QXBwQmFyXG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50TGVmdD17PHNwYW4vPn1cbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnRSaWdodD17PEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZWFyY2goKX0+PEljb25TZWFyY2gvPjwvSWNvbkJ1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXs8VGV4dEZpZWxkIG5hbWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaGludFRleHQ9XCLmn6Xor6JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT5lLmtleWNvZGU9PTEzICYmIHRoaXMuc2VhcmNoKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0gZGVmYXVsdFZhbHVlPXtxdWVyeS50aXRsZX0vPn0vPlxuXG4gICAgICAgICAgICAgICAgPExpc3RcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsPXttb2RlbH1cbiAgICAgICAgICAgICAgICAgICAgZW1wdHk9ezxFbXB0eSBpY29uPXs8SWNvbktub3dsZWRnZXMvPn0gdGV4dD1cIk5vIGtub3dsZWRnZSB5ZXQsIFBsZWFzZSBzdGF5IHR1bmVcIi8+fVxuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZT17MjB9XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPXtJdGVtfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHNlYXJjaChwcm9wcyl7XG4gICAgICAgIHRoaXMucmVmcy5zZWFyY2guZGlzbWlzcygpXG4gICAgICAgIHZhciB7dmFsdWU6dGl0bGU9XCJcIn09UmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmJ5VGl0bGUpXG4gICAgICAgIHRpdGxlPXRpdGxlLnRyaW0oKVxuICAgICAgICBpZih0aXRsZS5sZW5ndGgpXG4gICAgICAgICAgICBwcm9wcy50aXRsZT10aXRsZVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UodGhpcy5jb250ZXh0LnJvdXRlci5jcmVhdGVQYXRoKFwia25vd2xlZGdlc1wiLCBwcm9wcykpXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthZ2UsZ2VuZGVyLGNhdGVnb3J5fT10aGlzLnByb3BzLnF1ZXJ5fHx7fVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiYWdlXCIga2V5PVwiQWdlXCIgbGFiZWw9XCJBZ2UgKFllYXIpXCIgc2luZ2xlPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXthZ2V9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiMC41LCAxLCAyLCAzLCA0LCA1LCA2LCA4LCAxMFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImdlbmRlclwiIGtleT1cIkdlbmRlclwiIGxhYmVsPVwiR2VuZGVyXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Z2VuZGVyfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIkdpcmwsQm95XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiY2F0ZWdvcnlcIiBrZXk9XCJDYXRlZ29yeVwiIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJPYnNlcnZlLCBTdHVkeSwgU3BvcnRcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImFjdGlvbnNcIiBzdHlsZT17e3BhZGRpbmc6MTAsIHRleHRBbGlnbjonY2VudGVyJ319PlxuICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gb25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0dmFyIGFnZT10aGlzLnJlZnMuYWdlLnN0YXRlLnNlbGVjdGVkLFxuXHRcdFx0XHRcdFx0XHRnZW5kZXI9QXJyYXkuZnJvbSh0aGlzLnJlZnMuZ2VuZGVyLnN0YXRlLnNlbGVjdGVkKSxcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk9QXJyYXkuZnJvbSh0aGlzLnJlZnMuY2F0ZWdvcnkuc3RhdGUuc2VsZWN0ZWQpXG5cblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub25TZWFyY2goe2FnZSxnZW5kZXIsY2F0ZWdvcnl9KVxuXHRcdFx0XHRcdH19PlNlYXJjaDwvUmFpc2VkQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PilcbiAgICAgICAgXVxuICAgIH1cbn1cblxuY2xhc3MgQ2hlY2tHcm91cCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgdmFyIHtzZWxlY3RlZCwgc2luZ2xlfT1uZXh0XG4gICAgICAgIHRoaXMuc3RhdGU9e31cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1zZWxlY3RlZDtcbiAgICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoc2VsZWN0ZWQpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoKVxuXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXJ7aXRlbXMsIGxhYmVsLCBvbkNoYW5nZSwgc2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgc2VsZWN0ZWRTdHlsZT17cGFkZGluZzo1LCBib3JkZXJSaWdodDonMXB4IHNvbGlkIGxpZ2h0Z3JheScsXG4gICAgICAgICAgICAgICAgY29sb3I6J3doaXRlJyxiYWNrZ3JvdW5kQ29sb3I6J3JlZCd9LFxuICAgICAgICAgICAgdW5zZWxlY3RlZFN0eWxlPU9iamVjdC5hc3NpZ24oe30sc2VsZWN0ZWRTdHlsZSx7Y29sb3I6J2JsYWNrJywgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCd9KTtcblxuICAgICAgICByZXR1cm4oPGRpdiBzdHlsZT17e3BhZGRpbmc6MTB9fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7ZmxvYXQ6J3JpZ2h0JyxwYWRkaW5nOic1cHggMHB4JywgYm9yZGVyOicxcHggc29saWQgbGlnaHRncmF5JywgYm9yZGVyUmlnaHQ6MH19PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGEpIT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE9YS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXthfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLm9uU2VsZWN0KGEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsoc2luZ2xlID8gc2VsZWN0ZWQ9PWEgOiBzZWxlY3RlZC5oYXMoYSkpID8gc2VsZWN0ZWRTdHlsZSA6IHVuc2VsZWN0ZWRTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2F9PC9zcGFuPilcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxuICAgIG9uU2VsZWN0KGl0ZW0sIGE9e30pe1xuICAgICAgICB2YXJ7c2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBzZWxlY3RlZD09aXRlbSA/IHVuZGVmaW5lZCA6IGl0ZW19KTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNlbGVjdGVkW3NlbGVjdGVkLmhhcyhpdGVtKSA/ICdkZWxldGUnIDogJ2FkZCddKGl0ZW0pXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDpzZWxlY3RlZH0pXG4gICAgICAgIH1cbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17c2luZ2xlOmZhbHNlfVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOntwaG90b3M9W119fT10aGlzLnByb3BzXG4gICAgICAgIHN3aXRjaChwaG90b3MubGVuZ3RoKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzBwaG90bygpXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzFwaG90bygpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fM3Bob3RvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF8wcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8wXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1bW1hcnlcIj57bW9kZWwuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBfMXBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgXzNwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzNcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMV19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzJdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9tb3JlKG1vZGVsKXtcbiAgICAgICAgdmFyIHRpbWU9cmVsYXRpdmUobW9kZWwuY3JlYXRlZEF0fHxtb2RlbC51cGRhdGVkQXQpXG5cbiAgICAgICAgdmFyIHphbj1tb2RlbC56YW5zID8gKDxkaXY+PEljb25UaHVtYnVwLz57bW9kZWwuemFuc308L2Rpdj4pIDogbnVsbFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlXCI+XG4gICAgICAgICAgICAgICAgPHRpbWU+e3RpbWV9PC90aW1lPlxuICAgICAgICAgICAgICAgIHt6YW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvbkRldGFpbCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmBrbm93bGVkZ2UvJHt0aGlzLnByb3BzLm1vZGVsLl9pZH1gLHN0YXRlOntrbm93bGVkZ2U6dGhpcy5wcm9wcy5tb2RlbH19KVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG4iXX0=