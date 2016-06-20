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

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

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
                    iconElementLeft: this.getLeftElement(),
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
        key: 'getLeftElement',
        value: function getLeftElement() {
            return _qiliApp.React.createElement('span', null);
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

Knowledges.Course = function (_Knowledges2) {
    _inherits(_class2, _Knowledges2);

    function _class2() {
        _classCallCheck(this, _class2);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
    }

    _createClass(_class2, [{
        key: 'getLeftElement',
        value: function getLeftElement() {
            var _this7 = this;

            return _qiliApp.React.createElement(
                _materialUi.IconButton,
                { onClick: function onClick(e) {
                        return _this7.context.router.goBack();
                    } },
                _qiliApp.React.createElement(_keyboardArrowLeft2.default, null)
            );
        }
    }]);

    return _class2;
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
            var _this9 = this;

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
                            var age = _this9.refs.age.state.selected,
                                gender = Array.from(_this9.refs.gender.state.selected),
                                category = Array.from(_this9.refs.category.state.selected);

                            _this9.props.onSearch({ age: age, gender: gender, category: category });
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

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckGroup).call(this, props));

        _this10.componentWillReceiveProps(_this10.props);
        return _this10;
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
                        var _this11 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _qiliApp.React.createElement(
                            'span',
                            {
                                key: a,
                                onClick: function onClick() {
                                    return _this11.onSelect(a);
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
            var _this13 = this;

            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo0' }, others, { onClick: function onClick() {
                        return _this13.onDetail();
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
            var _this14 = this;

            var _props3 = this.props;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
                        return _this14.onDetail();
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
            var _this15 = this;

            var _props4 = this.props;
            var model = _props4.model;

            var others = _objectWithoutProperties(_props4, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo3' }, others, { onClick: function onClick() {
                        return _this15.onDetail();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU87SUFBTTtJQUFZO0lBRWxCLGdCQUFlLFdBQWY7O0lBRWM7Ozs7Ozs7Ozs7Ozs7OzRNQUNqQixRQUFNLEVBQUMsT0FBTSxJQUFOOzs7aUJBRFU7O2tDQUdSOzs7QUFDTCxnQ0FBWSxJQUFaLENBQWlCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBcEIsQ0FBakIsQ0FBNEMsS0FBNUMsQ0FBa0QsaUJBQU87QUFDckQsdUJBQUssUUFBTCxDQUFjLEVBQUMsWUFBRCxFQUFkLEVBRHFEO2FBQVAsQ0FBbEQsQ0FESzs7Ozs0Q0FNVTtBQUNmLGlCQUFLLE9BQUwsR0FEZTs7OztpQ0FJWDs7O0FBQ0EsZ0JBQUMsUUFBTyxLQUFLLEtBQUwsQ0FBUCxLQUFELENBREE7d0NBRVcsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFWLE1BRkQ7Z0JBRUMsOENBQU0sMkJBRlA7O0FBR0osbUJBQ0k7OztnQkFDSTtBQUNJLHFDQUFpQixLQUFLLGNBQUwsRUFBakI7QUFDQSxzQ0FBa0I7OzBCQUFZLFNBQVM7dUNBQUcsT0FBSyxNQUFMOzZCQUFILEVBQXJCO3dCQUF1QyxvREFBdkM7cUJBQWxCO0FBQ0EsMkJBQU8sc0RBQVcsTUFBSyxRQUFMO0FBQ2Qsa0NBQVMsSUFBVDtBQUNBLG1DQUFXO21DQUFJLEVBQUUsT0FBRixJQUFXLEVBQVgsSUFBaUIsT0FBSyxNQUFMLENBQVksRUFBRSxNQUFGLENBQVMsS0FBVCxDQUE3Qjt5QkFBSjtBQUNYLG1DQUFXLElBQVgsRUFBaUIsY0FBYyxNQUFNLEtBQU4sRUFINUIsQ0FBUCxFQUhKLENBREo7Z0JBU0ksNkJBQUMsSUFBRDtBQUNJLHlCQUFJLE1BQUo7QUFDQSwy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QUFWLElBQWdDLFVBQVEsU0FBUzsrQkFBSSxRQUFLLFFBQUw7cUJBQUosR0FBdEQ7Z0JBQ0k7O3NCQUFLLFdBQVUsT0FBVixFQUFMO29CQUF3QixNQUFNLEtBQU47aUJBRDVCO2dCQUVJOztzQkFBSyxXQUFVLFFBQVYsRUFBTDtvQkFDSTs7O3dCQUFLLHNDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFESjtvQkFFSTs7O3dCQUFLLHNDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFGSjtvQkFHSTs7O3dCQUFLLHNDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFISjtpQkFGSjtnQkFPQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBUEQ7YUFESixDQUZLOzs7OzhCQWVILE9BQU07QUFDUixnQkFBSSxPQUFLLHdCQUFTLE1BQU0sU0FBTixJQUFpQixNQUFNLFNBQU4sQ0FBL0IsQ0FESTs7QUFHUixnQkFBSSxNQUFJLE1BQU0sSUFBTixHQUFjOzs7Z0JBQUsscURBQUw7Z0JBQW9CLE1BQU0sSUFBTjthQUFsQyxHQUF1RCxJQUF2RCxDQUhBO0FBSVIsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNJOzs7b0JBQU8sSUFBUDtpQkFESjtnQkFFSyxHQUZMO2FBREosQ0FKUTs7OzttQ0FXRjtBQUNOLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEVBQUMseUJBQXNCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBdUIsT0FBTSxFQUFDLFdBQVUsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFqQixFQUF2RSxFQURNOzs7O1dBbkVSOzs7S0FzRUUsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCIiwiZmlsZSI6Imtub3dsZWRnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge0ljb25CdXR0b24sIEFwcEJhciwgVGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uVGh1bWJ1cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi90aHVtYi11cFwiXG5pbXBvcnQgSWNvblNlYXJjaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZWFyY2hcIlxuaW1wb3J0IEljb25CYWNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCBkYktub3dsZWRnZSBmcm9tICcuL2RiL2tub3dsZWRnZSdcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCB7cmVsYXRpdmV9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcbmltcG9ydCBGbG9hdGluZ0FkZCBmcm9tIFwiLi9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZFwiXG5cbmNvbnN0IHtMaXN0LCBDb21tYW5kQmFyLCBFbXB0eX09VUlcblxuY29uc3Qge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS25vd2xlZGdlcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17bW9kZWw6bnVsbH1cblxuICAgIGdldERhdGEoKXtcbiAgICAgICAgZGJLbm93bGVkZ2UuZmluZCh0aGlzLnByb3BzLmxvY2F0aW9uLnF1ZXJ5KS5mZXRjaChtb2RlbD0+e1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bW9kZWx9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWx9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7cXVlcnk9e319PXRoaXMucHJvcHMubG9jYXRpb25cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEFwcEJhclxuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudExlZnQ9e3RoaXMuZ2V0TGVmdEVsZW1lbnQoKX1cbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnRSaWdodD17PEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZWFyY2goKX0+PEljb25TZWFyY2gvPjwvSWNvbkJ1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXs8VGV4dEZpZWxkIG5hbWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaGludFRleHQ9XCLmn6Xor6JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT4oZS5rZXljb2RlPT0xMyAmJiB0aGlzLnNlYXJjaChlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfSBkZWZhdWx0VmFsdWU9e3F1ZXJ5LnRpdGxlfS8+fS8+XG5cbiAgICAgICAgICAgICAgICA8TGlzdFxuICAgICAgICAgICAgICAgICAgICByZWY9XCJsaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw9e21vZGVsfVxuICAgICAgICAgICAgICAgICAgICBlbXB0eT17PEVtcHR5IGljb249ezxJY29uS25vd2xlZGdlcy8+fSB0ZXh0PVwiTm8ga25vd2xlZGdlIHlldCwgUGxlYXNlIHN0YXkgdHVuZVwiLz59XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplPXsyMH1cbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU9e0l0ZW19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXHRcblx0Z2V0TGVmdEVsZW1lbnQoKXtcblx0XHRyZXR1cm4gKDxzcGFuLz4pXG5cdH1cblxuICAgIHNlYXJjaChwcm9wcyl7XG4gICAgICAgIHRoaXMucmVmcy5zZWFyY2guZGlzbWlzcygpXG4gICAgICAgIHZhciB7dmFsdWU6dGl0bGU9XCJcIn09UmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmJ5VGl0bGUpXG4gICAgICAgIHRpdGxlPXRpdGxlLnRyaW0oKVxuICAgICAgICBpZih0aXRsZS5sZW5ndGgpXG4gICAgICAgICAgICBwcm9wcy50aXRsZT10aXRsZVxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UodGhpcy5jb250ZXh0LnJvdXRlci5jcmVhdGVQYXRoKFwia25vd2xlZGdlc1wiLCBwcm9wcykpXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG4gICAgc3RhdGljIENyZWF0YWJsZT1jbGFzcyBleHRlbmRzIEtub3dsZWRnZXN7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdBZGQgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwia25vd2xlZGdlXCIpfSBtaW5pPXt0cnVlfS8+XG4gICAgICAgICAgICAgICAgICAgIHtzdXBlci5yZW5kZXIoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblx0XG5cdHN0YXRpYyBDb3Vyc2U9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuXHRcdGdldExlZnRFbGVtZW50KCl7XG5cdFx0XHRyZXR1cm4gKDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9PjxJY29uQmFjay8+PC9JY29uQnV0dG9uPilcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgU2VhcmNoIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7YWdlLGdlbmRlcixjYXRlZ29yeX09dGhpcy5wcm9wcy5xdWVyeXx8e31cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImFnZVwiIGtleT1cIkFnZVwiIGxhYmVsPVwiQWdlIChZZWFyKVwiIHNpbmdsZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17YWdlfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIjAuNSwgMSwgMiwgMywgNCwgNSwgNiwgOCwgMTBcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJnZW5kZXJcIiBrZXk9XCJHZW5kZXJcIiBsYWJlbD1cIkdlbmRlclwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2dlbmRlcn1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJHaXJsLEJveVwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImNhdGVnb3J5XCIga2V5PVwiQ2F0ZWdvcnlcIiBsYWJlbD1cIkNhdGVnb3J5XCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiT2JzZXJ2ZSwgU3R1ZHksIFNwb3J0XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPGRpdiBrZXk9XCJhY3Rpb25zXCIgc3R5bGU9e3twYWRkaW5nOjEwLCB0ZXh0QWxpZ246J2NlbnRlcid9fT5cbiAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIHByaW1hcnk9e3RydWV9IG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdHZhciBhZ2U9dGhpcy5yZWZzLmFnZS5zdGF0ZS5zZWxlY3RlZCxcblx0XHRcdFx0XHRcdFx0Z2VuZGVyPUFycmF5LmZyb20odGhpcy5yZWZzLmdlbmRlci5zdGF0ZS5zZWxlY3RlZCksXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5PUFycmF5LmZyb20odGhpcy5yZWZzLmNhdGVnb3J5LnN0YXRlLnNlbGVjdGVkKVxuXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2VhcmNoKHthZ2UsZ2VuZGVyLGNhdGVnb3J5fSlcblx0XHRcdFx0XHR9fT5TZWFyY2g8L1JhaXNlZEJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXG4gICAgICAgIF1cbiAgICB9XG59XG5cbmNsYXNzIENoZWNrR3JvdXAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHRoaXMucHJvcHMpXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG4gICAgICAgIHZhciB7c2VsZWN0ZWQsIHNpbmdsZX09bmV4dFxuICAgICAgICB0aGlzLnN0YXRlPXt9XG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9c2VsZWN0ZWQ7XG4gICAgICAgIGVsc2UgaWYoQXJyYXkuaXNBcnJheShzZWxlY3RlZCkpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KHNlbGVjdGVkKVxuICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KClcblxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFye2l0ZW1zLCBsYWJlbCwgb25DaGFuZ2UsIHNpbmdsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkU3R5bGU9e3BhZGRpbmc6NSwgYm9yZGVyUmlnaHQ6JzFweCBzb2xpZCBsaWdodGdyYXknLFxuICAgICAgICAgICAgICAgIGNvbG9yOid3aGl0ZScsYmFja2dyb3VuZENvbG9yOidyZWQnfSxcbiAgICAgICAgICAgIHVuc2VsZWN0ZWRTdHlsZT1PYmplY3QuYXNzaWduKHt9LHNlbGVjdGVkU3R5bGUse2NvbG9yOidibGFjaycsIGJhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnfSk7XG5cbiAgICAgICAgcmV0dXJuKDxkaXYgc3R5bGU9e3twYWRkaW5nOjEwfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2Zsb2F0OidyaWdodCcscGFkZGluZzonNXB4IDBweCcsIGJvcmRlcjonMXB4IHNvbGlkIGxpZ2h0Z3JheScsIGJvcmRlclJpZ2h0OjB9fT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihhKSE9J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhPWEudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdChhKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17KHNpbmdsZSA/IHNlbGVjdGVkPT1hIDogc2VsZWN0ZWQuaGFzKGEpKSA/IHNlbGVjdGVkU3R5bGUgOiB1bnNlbGVjdGVkU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthfTwvc3Bhbj4pXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+KVxuICAgIH1cbiAgICBvblNlbGVjdChpdGVtLCBhPXt9KXtcbiAgICAgICAgdmFye3NpbmdsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZTtcblxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWQ9PWl0ZW0gPyB1bmRlZmluZWQgOiBpdGVtfSk7XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzZWxlY3RlZFtzZWxlY3RlZC5oYXMoaXRlbSkgPyAnZGVsZXRlJyA6ICdhZGQnXShpdGVtKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6c2VsZWN0ZWR9KVxuICAgICAgICB9XG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e3NpbmdsZTpmYWxzZX1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDp7cGhvdG9zPVtdfX09dGhpcy5wcm9wc1xuICAgICAgICBzd2l0Y2gocGhvdG9zLmxlbmd0aCl7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8wcGhvdG8oKVxuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8xcGhvdG8oKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzNwaG90bygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfMHBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMFwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdW1tYXJ5XCI+e21vZGVsLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgXzFwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzFcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF8zcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8zXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzFdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1syXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfbW9yZShtb2RlbCl7XG4gICAgICAgIHZhciB0aW1lPXJlbGF0aXZlKG1vZGVsLmNyZWF0ZWRBdHx8bW9kZWwudXBkYXRlZEF0KVxuXG4gICAgICAgIHZhciB6YW49bW9kZWwuemFucyA/ICg8ZGl2PjxJY29uVGh1bWJ1cC8+e21vZGVsLnphbnN9PC9kaXY+KSA6IG51bGxcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lPnt0aW1lfTwvdGltZT5cbiAgICAgICAgICAgICAgICB7emFufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25EZXRhaWwoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpga25vd2xlZGdlLyR7dGhpcy5wcm9wcy5tb2RlbC5faWR9YCxzdGF0ZTp7a25vd2xlZGdlOnRoaXMucHJvcHMubW9kZWx9fSlcbiAgICB9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuIl19