'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _materialUi = require('material-ui');

var _dialpad = require('material-ui/svg-icons/communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

var _thumbUp = require('material-ui/svg-icons/action/thumb-up');

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _search = require('material-ui/svg-icons/action/search');

var _search2 = _interopRequireDefault(_search);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _calendar = require('./components/calendar');

var _floatingAdd = require('./components/floating-add');

var _floatingAdd2 = _interopRequireDefault(_floatingAdd);

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

            _knowledge2.default.find(this.props.location.query).fetch(function (model) {
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

Knowledges.Creatable = function (_Knowledges) {
    _inherits(_class, _Knowledges);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(_floatingAdd2.default, { onClick: function onClick(e) {
                        return _this5.context.router.push("knowledge");
                    }, mini: true }),
                _get(Object.getPrototypeOf(_class.prototype), 'render', this).call(this)
            );
        }
    }]);

    return _class;
}(Knowledges);

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
            var _this7 = this;

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
                            var age = _this7.refs.age.state.selected,
                                gender = Array.from(_this7.refs.gender.state.selected),
                                category = Array.from(_this7.refs.category.state.selected);

                            _this7.props.onSearch({ age: age, gender: gender, category: category });
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

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckGroup).call(this, props));

        _this8.componentWillReceiveProps(_this8.props);
        return _this8;
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
                        var _this9 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _qiliApp.React.createElement(
                            'span',
                            {
                                key: a,
                                onClick: function onClick() {
                                    return _this9.onSelect(a);
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
            var _this11 = this;

            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo0' }, others, { onClick: function onClick() {
                        return _this11.onDetail();
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
            var _this12 = this;

            var _props3 = this.props;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
                        return _this12.onDetail();
                    } }),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'layout' },
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
                )
            );
        }
    }, {
        key: '_3photo',
        value: function _3photo() {
            var _this13 = this;

            var _props4 = this.props;
            var model = _props4.model;

            var others = _objectWithoutProperties(_props4, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo3' }, others, { onClick: function onClick() {
                        return _this13.onDetail();
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
//# sourceMappingURL=data:application/json;base64,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TDtxQkFESjtvQkFFSTs7O3dCQUFLLHNDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFGSjtvQkFHSTs7O3dCQUFLLHNDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFISjtpQkFGSjtnQkFPQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBUEQ7YUFESixDQUZLOzs7OzhCQWVILE9BQU07QUFDUixnQkFBSSxPQUFLLHdCQUFTLE1BQU0sU0FBTixJQUFpQixNQUFNLFNBQU4sQ0FBL0IsQ0FESTs7QUFHUixnQkFBSSxNQUFJLE1BQU0sSUFBTixHQUFjOzs7Z0JBQUsscURBQUw7Z0JBQW9CLE1BQU0sSUFBTjthQUFsQyxHQUF1RCxJQUF2RCxDQUhBO0FBSVIsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNJOzs7b0JBQU8sSUFBUDtpQkFESjtnQkFFSyxHQUZMO2FBREosQ0FKUTs7OzttQ0FXRjtBQUNOLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEVBQUMseUJBQXNCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBdUIsT0FBTSxFQUFDLFdBQVUsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFqQixFQUF2RSxFQURNOzs7O1dBbkVSOzs7S0FzRUUsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCIiwiZmlsZSI6Imtub3dsZWRnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge0ljb25CdXR0b24sIEFwcEJhciwgVGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uVGh1bWJ1cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi90aHVtYi11cFwiXG5pbXBvcnQgSWNvblNlYXJjaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZWFyY2hcIlxuXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQge3JlbGF0aXZlfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgRmxvYXRpbmdBZGQgZnJvbSBcIi4vY29tcG9uZW50cy9mbG9hdGluZy1hZGRcIlxuXG5jb25zdCB7TGlzdCwgQ29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZXMgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e21vZGVsOm51bGx9XG5cbiAgICBnZXREYXRhKCl7XG4gICAgICAgIGRiS25vd2xlZGdlLmZpbmQodGhpcy5wcm9wcy5sb2NhdGlvbi5xdWVyeSkuZmV0Y2gobW9kZWw9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21vZGVsfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3F1ZXJ5PXt9fT10aGlzLnByb3BzLmxvY2F0aW9uXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxBcHBCYXJcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnRMZWZ0PXs8c3Bhbi8+fVxuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudFJpZ2h0PXs8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLnNlYXJjaCgpfT48SWNvblNlYXJjaC8+PC9JY29uQnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9ezxUZXh0RmllbGQgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50VGV4dD1cIuafpeivolwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PihlLmtleWNvZGU9PTEzICYmIHRoaXMuc2VhcmNoKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9IGRlZmF1bHRWYWx1ZT17cXVlcnkudGl0bGV9Lz59Lz5cblxuICAgICAgICAgICAgICAgIDxMaXN0XG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImxpc3RcIlxuICAgICAgICAgICAgICAgICAgICBtb2RlbD17bW9kZWx9XG4gICAgICAgICAgICAgICAgICAgIGVtcHR5PXs8RW1wdHkgaWNvbj17PEljb25Lbm93bGVkZ2VzLz59IHRleHQ9XCJObyBrbm93bGVkZ2UgeWV0LCBQbGVhc2Ugc3RheSB0dW5lXCIvPn1cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU9ezIwfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT17SXRlbX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzZWFyY2gocHJvcHMpe1xuICAgICAgICB0aGlzLnJlZnMuc2VhcmNoLmRpc21pc3MoKVxuICAgICAgICB2YXIge3ZhbHVlOnRpdGxlPVwiXCJ9PVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5ieVRpdGxlKVxuICAgICAgICB0aXRsZT10aXRsZS50cmltKClcbiAgICAgICAgaWYodGl0bGUubGVuZ3RoKVxuICAgICAgICAgICAgcHJvcHMudGl0bGU9dGl0bGVcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKHRoaXMuY29udGV4dC5yb3V0ZXIuY3JlYXRlUGF0aChcImtub3dsZWRnZXNcIiwgcHJvcHMpKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBDcmVhdGFibGU9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nQWRkIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImtub3dsZWRnZVwiKX0gbWluaT17dHJ1ZX0vPlxuICAgICAgICAgICAgICAgICAgICB7c3VwZXIucmVuZGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FnZSxnZW5kZXIsY2F0ZWdvcnl9PXRoaXMucHJvcHMucXVlcnl8fHt9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJhZ2VcIiBrZXk9XCJBZ2VcIiBsYWJlbD1cIkFnZSAoWWVhcilcIiBzaW5nbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FnZX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCIwLjUsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDEwXCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiZ2VuZGVyXCIga2V5PVwiR2VuZGVyXCIgbGFiZWw9XCJHZW5kZXJcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtnZW5kZXJ9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiR2lybCxCb3lcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJjYXRlZ29yeVwiIGtleT1cIkNhdGVnb3J5XCIgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIk9ic2VydmUsIFN0dWR5LCBTcG9ydFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxkaXYga2V5PVwiYWN0aW9uc1wiIHN0eWxlPXt7cGFkZGluZzoxMCwgdGV4dEFsaWduOidjZW50ZXInfX0+XG4gICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHR2YXIgYWdlPXRoaXMucmVmcy5hZ2Uuc3RhdGUuc2VsZWN0ZWQsXG5cdFx0XHRcdFx0XHRcdGdlbmRlcj1BcnJheS5mcm9tKHRoaXMucmVmcy5nZW5kZXIuc3RhdGUuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yeT1BcnJheS5mcm9tKHRoaXMucmVmcy5jYXRlZ29yeS5zdGF0ZS5zZWxlY3RlZClcblxuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5vblNlYXJjaCh7YWdlLGdlbmRlcixjYXRlZ29yeX0pXG5cdFx0XHRcdFx0fX0+U2VhcmNoPC9SYWlzZWRCdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICBdXG4gICAgfVxufVxuXG5jbGFzcyBDaGVja0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh0aGlzLnByb3BzKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICB2YXIge3NlbGVjdGVkLCBzaW5nbGV9PW5leHRcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPXNlbGVjdGVkO1xuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldChzZWxlY3RlZClcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldCgpXG5cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhcntpdGVtcywgbGFiZWwsIG9uQ2hhbmdlLCBzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZFN0eWxlPXtwYWRkaW5nOjUsIGJvcmRlclJpZ2h0OicxcHggc29saWQgbGlnaHRncmF5JyxcbiAgICAgICAgICAgICAgICBjb2xvcjond2hpdGUnLGJhY2tncm91bmRDb2xvcjoncmVkJ30sXG4gICAgICAgICAgICB1bnNlbGVjdGVkU3R5bGU9T2JqZWN0LmFzc2lnbih7fSxzZWxlY3RlZFN0eWxlLHtjb2xvcjonYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J30pO1xuXG4gICAgICAgIHJldHVybig8ZGl2IHN0eWxlPXt7cGFkZGluZzoxMH19PlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLHBhZGRpbmc6JzVweCAwcHgnLCBib3JkZXI6JzFweCBzb2xpZCBsaWdodGdyYXknLCBib3JkZXJSaWdodDowfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSkhPSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYT1hLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2F9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyhzaW5nbGUgPyBzZWxlY3RlZD09YSA6IHNlbGVjdGVkLmhhcyhhKSkgPyBzZWxlY3RlZFN0eWxlIDogdW5zZWxlY3RlZFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG4gICAgb25TZWxlY3QoaXRlbSwgYT17fSl7XG4gICAgICAgIHZhcntzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6IHNlbGVjdGVkPT1pdGVtID8gdW5kZWZpbmVkIDogaXRlbX0pO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc2VsZWN0ZWRbc2VsZWN0ZWQuaGFzKGl0ZW0pID8gJ2RlbGV0ZScgOiAnYWRkJ10oaXRlbSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOnNlbGVjdGVkfSlcbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtzaW5nbGU6ZmFsc2V9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6e3Bob3Rvcz1bXX19PXRoaXMucHJvcHNcbiAgICAgICAgc3dpdGNoKHBob3Rvcy5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMHBob3RvKClcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMXBob3RvKClcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8zcGhvdG8oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXzBwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzBcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VtbWFyeVwiPnttb2RlbC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIF8xcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfM3Bob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvM1wiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1sxXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMl19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX21vcmUobW9kZWwpe1xuICAgICAgICB2YXIgdGltZT1yZWxhdGl2ZShtb2RlbC5jcmVhdGVkQXR8fG1vZGVsLnVwZGF0ZWRBdClcblxuICAgICAgICB2YXIgemFuPW1vZGVsLnphbnMgPyAoPGRpdj48SWNvblRodW1idXAvPnttb2RlbC56YW5zfTwvZGl2PikgOiBudWxsXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmVcIj5cbiAgICAgICAgICAgICAgICA8dGltZT57dGltZX08L3RpbWU+XG4gICAgICAgICAgICAgICAge3phbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YGtub3dsZWRnZS8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsc3RhdGU6e2tub3dsZWRnZTp0aGlzLnByb3BzLm1vZGVsfX0pXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==