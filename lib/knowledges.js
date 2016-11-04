"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _materialUi = require("material-ui");

var _dialpad = require("material-ui/svg-icons/communication/dialpad");

var _dialpad2 = _interopRequireDefault(_dialpad);

var _thumbUp = require("material-ui/svg-icons/action/thumb-up");

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _search = require("material-ui/svg-icons/action/search");

var _search2 = _interopRequireDefault(_search);

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _knowledge = require("./db/knowledge");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require("./knowledge");

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _calendar = require("./components/calendar");

var _floatingAdd = require("./components/floating-add");

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
        key: "getData",
        value: function getData() {
            var _this2 = this;

            _knowledge2.default.find(this.props.location.query).fetch(function (model) {
                _this2.setState({ model: model });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getData();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var model = this.state.model;
            var _props$location$query = this.props.location.query;
            var query = _props$location$query === undefined ? {} : _props$location$query;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_materialUi.AppBar, {
                    iconElementLeft: this.getLeftElement(),
                    iconElementRight: _react2.default.createElement(
                        _materialUi.IconButton,
                        { onClick: function onClick(e) {
                                return _this3.search();
                            } },
                        _react2.default.createElement(_search2.default, null)
                    ),
                    title: _react2.default.createElement(_materialUi.TextField, { name: "search",
                        hintText: "查询",
                        onKeyDown: function onKeyDown(e) {
                            return e.keycode == 13 && _this3.search(e.target.value);
                        },
                        fullWidth: true, defaultValue: query.title }) }),
                _react2.default.createElement(List, {
                    ref: "list",
                    model: model,
                    empty: _react2.default.createElement(Empty, { icon: _react2.default.createElement(_dialpad2.default, null), text: "No knowledge yet, Please stay tune" }),
                    pageSize: 20,
                    template: Item })
            );
        }
    }, {
        key: "getLeftElement",
        value: function getLeftElement() {
            return _react2.default.createElement("span", null);
        }
    }, {
        key: "search",
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
}(_react.Component);

Knowledges.contextTypes = { router: _react.PropTypes.object };

Knowledges.Creatable = function (_Knowledges) {
    _inherits(_class, _Knowledges);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_floatingAdd2.default, { onClick: function onClick(e) {
                        return _this5.context.router.push("knowledge");
                    }, mini: true }),
                _get(Object.getPrototypeOf(_class.prototype), "render", this).call(this)
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
        key: "getLeftElement",
        value: function getLeftElement() {
            var _this7 = this;

            return _react2.default.createElement(
                _materialUi.IconButton,
                { onClick: function onClick(e) {
                        return _this7.context.router.goBack();
                    } },
                _react2.default.createElement(_keyboardArrowLeft2.default, null)
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
        key: "renderContent",
        value: function renderContent() {
            var _this9 = this;

            var _ref = this.props.query || {};

            var age = _ref.age;
            var gender = _ref.gender;
            var category = _ref.category;


            return [_react2.default.createElement(CheckGroup, { ref: "age", key: "Age", label: "Age (Year)", single: true,
                selected: age,
                items: "0.5, 1, 2, 3, 4, 5, 6, 8, 10".split(',') }), _react2.default.createElement(CheckGroup, { ref: "gender", key: "Gender", label: "Gender",
                selected: gender,
                items: "Girl,Boy".split(',') }), _react2.default.createElement(CheckGroup, { ref: "category", key: "Category", label: "Category",
                selected: category,
                items: "Observe, Study, Sport".split(',') }), _react2.default.createElement(
                "div",
                { key: "actions", style: { padding: 10, textAlign: 'center' } },
                _react2.default.createElement(
                    RaisedButton,
                    { primary: true, onClick: function onClick(e) {
                            var age = _this9.refs.age.state.selected,
                                gender = Array.from(_this9.refs.gender.state.selected),
                                category = Array.from(_this9.refs.category.state.selected);

                            _this9.props.onSearch({ age: age, gender: gender, category: category });
                        } },
                    "Search"
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
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next) {
            var selected = next.selected;
            var single = next.single;

            this.state = {};
            if (single) this.state.selected = selected;else if (Array.isArray(selected)) {
                this.state.selected = new Set(selected);
            } else this.state.selected = new Set();
        }
    }, {
        key: "render",
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

            return _react2.default.createElement(
                "div",
                { style: { padding: 10 } },
                _react2.default.createElement(
                    "span",
                    null,
                    label
                ),
                _react2.default.createElement(
                    "span",
                    { style: { float: 'right', padding: '5px 0px', border: '1px solid lightgray', borderRight: 0 } },
                    items.map(function (a) {
                        var _this11 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _react2.default.createElement(
                            "span",
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
        key: "onSelect",
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
}(_react.Component);

CheckGroup.defaultProps = { single: false };

var Item = function (_Component3) {
    _inherits(Item, _Component3);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
    }

    _createClass(Item, [{
        key: "render",
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
        key: "_0photo",
        value: function _0photo() {
            var _this13 = this;

            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ["model"]);

            return _react2.default.createElement(
                "div",
                _extends({ className: "li inset photo0" }, others, { onClick: function onClick() {
                        return _this13.onDetail();
                    } }),
                _react2.default.createElement(
                    "div",
                    { className: "title" },
                    model.title
                ),
                _react2.default.createElement(
                    "div",
                    { className: "summary" },
                    model.summary
                ),
                this._more(model)
            );
        }
    }, {
        key: "_1photo",
        value: function _1photo() {
            var _this14 = this;

            var _props3 = this.props;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ["model"]);

            return _react2.default.createElement(
                "div",
                _extends({ className: "li inset photo1" }, others, { onClick: function onClick() {
                        return _this14.onDetail();
                    } }),
                _react2.default.createElement(
                    "div",
                    { className: "layout" },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "title" },
                            model.title
                        ),
                        this._more(model)
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "photos" },
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement("img", { src: model.photos[0] })
                        )
                    )
                )
            );
        }
    }, {
        key: "_3photo",
        value: function _3photo() {
            var _this15 = this;

            var _props4 = this.props;
            var model = _props4.model;

            var others = _objectWithoutProperties(_props4, ["model"]);

            return _react2.default.createElement(
                "div",
                _extends({ className: "li inset photo3" }, others, { onClick: function onClick() {
                        return _this15.onDetail();
                    } }),
                _react2.default.createElement(
                    "div",
                    { className: "title" },
                    model.title
                ),
                _react2.default.createElement(
                    "div",
                    { className: "photos" },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("img", { src: model.photos[0] })
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("img", { src: model.photos[1] })
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("img", { src: model.photos[2] })
                    )
                ),
                this._more(model)
            );
        }
    }, {
        key: "_more",
        value: function _more(model) {
            var time = (0, _calendar.relative)(model.createdAt || model.updatedAt);

            var zan = model.zans ? _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_thumbUp2.default, null),
                model.zans
            ) : null;
            return _react2.default.createElement(
                "div",
                { className: "more" },
                _react2.default.createElement(
                    "time",
                    null,
                    time
                ),
                zan
            );
        }
    }, {
        key: "onDetail",
        value: function onDetail() {
            this.context.router.push({ pathname: "knowledge/" + this.props.model._id, state: { knowledge: this.props.model } });
        }
    }]);

    return Item;
}(_react.Component);

Item.contextTypes = { router: _react.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTztJQUFNO0lBQVk7SUFFbEIsZ0JBQWUsV0FBZjs7SUFFYzs7Ozs7Ozs7Ozs7Ozs7NE1BQ2pCLFFBQU0sRUFBQyxPQUFNLElBQU47OztpQkFEVTs7a0NBR1I7OztBQUNMLGdDQUFZLElBQVosQ0FBaUIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFwQixDQUFqQixDQUE0QyxLQUE1QyxDQUFrRCxpQkFBTztBQUNyRCx1QkFBSyxRQUFMLENBQWMsRUFBQyxZQUFELEVBQWQsRUFEcUQ7YUFBUCxDQUFsRCxDQURLOzs7OzRDQU1VO0FBQ2YsaUJBQUssT0FBTCxHQURlOzs7O2lDQUlYOzs7QUFDQSxnQkFBQyxRQUFPLEtBQUssS0FBTCxDQUFQLEtBQUQsQ0FEQTt3Q0FFVyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQVYsTUFGRDtnQkFFQyw4Q0FBTSwyQkFGUDs7QUFHSixtQkFDSTs7O2dCQUNJO0FBQ0kscUNBQWlCLEtBQUssY0FBTCxFQUFqQjtBQUNBLHNDQUFrQjs7MEJBQVksU0FBUzt1Q0FBRyxPQUFLLE1BQUw7NkJBQUgsRUFBckI7d0JBQXVDLHFEQUF2QztxQkFBbEI7QUFDQSwyQkFBTyx1REFBVyxNQUFLLFFBQUw7QUFDZCxrQ0FBUyxJQUFUO0FBQ0EsbUNBQVc7bUNBQUksRUFBRSxPQUFGLElBQVcsRUFBWCxJQUFpQixPQUFLLE1BQUwsQ0FBWSxFQUFFLE1BQUYsQ0FBUyxLQUFULENBQTdCO3lCQUFKO0FBQ1gsbUNBQVcsSUFBWCxFQUFpQixjQUFjLE1BQU0sS0FBTixFQUg1QixDQUFQLEVBSEosQ0FESjtnQkFTSSw4QkFBQyxJQUFEO0FBQ0kseUJBQUksTUFB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LElBQWdDLFVBQVEsU0FBUzsrQkFBSSxRQUFLLFFBQUw7cUJBQUosR0FBdEQ7Z0JBQ0k7O3NCQUFLLFdBQVUsT0FBVixFQUFMO29CQUF3QixNQUFNLEtBQU47aUJBRDVCO2dCQUVJOztzQkFBSyxXQUFVLFFBQVYsRUFBTDtvQkFDSTs7O3dCQUFLLHVDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFESjtvQkFFSTs7O3dCQUFLLHVDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFGSjtvQkFHSTs7O3dCQUFLLHVDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFISjtpQkFGSjtnQkFPQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBUEQ7YUFESixDQUZLOzs7OzhCQWVILE9BQU07QUFDUixnQkFBSSxPQUFLLHdCQUFTLE1BQU0sU0FBTixJQUFpQixNQUFNLFNBQU4sQ0FBL0IsQ0FESTs7QUFHUixnQkFBSSxNQUFJLE1BQU0sSUFBTixHQUFjOzs7Z0JBQUssc0RBQUw7Z0JBQW9CLE1BQU0sSUFBTjthQUFsQyxHQUF1RCxJQUF2RCxDQUhBO0FBSVIsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNJOzs7b0JBQU8sSUFBUDtpQkFESjtnQkFFSyxHQUZMO2FBREosQ0FKUTs7OzttQ0FXRjtBQUNOLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEVBQUMseUJBQXNCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBdUIsT0FBTSxFQUFDLFdBQVUsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFqQixFQUF2RSxFQURNOzs7O1dBbkVSOzs7S0FzRUUsZUFBYSxFQUFDLFFBQU8saUJBQVUsTUFBViIsImZpbGUiOiJrbm93bGVkZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7SWNvbkJ1dHRvbiwgQXBwQmFyLCBUZXh0RmllbGR9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25UaHVtYnVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3RodW1iLXVwXCJcbmltcG9ydCBJY29uU2VhcmNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NlYXJjaFwiXG5pbXBvcnQgSWNvbkJhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IHtyZWxhdGl2ZX0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IEZsb2F0aW5nQWRkIGZyb20gXCIuL2NvbXBvbmVudHMvZmxvYXRpbmctYWRkXCJcblxuY29uc3Qge0xpc3QsIENvbW1hbmRCYXIsIEVtcHR5fT1VSVxuXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2VzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXttb2RlbDpudWxsfVxuXG4gICAgZ2V0RGF0YSgpe1xuICAgICAgICBkYktub3dsZWRnZS5maW5kKHRoaXMucHJvcHMubG9jYXRpb24ucXVlcnkpLmZldGNoKG1vZGVsPT57XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHttb2RlbH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtxdWVyeT17fX09dGhpcy5wcm9wcy5sb2NhdGlvblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8QXBwQmFyXG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50TGVmdD17dGhpcy5nZXRMZWZ0RWxlbWVudCgpfVxuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudFJpZ2h0PXs8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLnNlYXJjaCgpfT48SWNvblNlYXJjaC8+PC9JY29uQnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9ezxUZXh0RmllbGQgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50VGV4dD1cIuafpeivolwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PihlLmtleWNvZGU9PTEzICYmIHRoaXMuc2VhcmNoKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9IGRlZmF1bHRWYWx1ZT17cXVlcnkudGl0bGV9Lz59Lz5cblxuICAgICAgICAgICAgICAgIDxMaXN0XG4gICAgICAgICAgICAgICAgICAgIHJlZj1cImxpc3RcIlxuICAgICAgICAgICAgICAgICAgICBtb2RlbD17bW9kZWx9XG4gICAgICAgICAgICAgICAgICAgIGVtcHR5PXs8RW1wdHkgaWNvbj17PEljb25Lbm93bGVkZ2VzLz59IHRleHQ9XCJObyBrbm93bGVkZ2UgeWV0LCBQbGVhc2Ugc3RheSB0dW5lXCIvPn1cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU9ezIwfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT17SXRlbX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cdFxuXHRnZXRMZWZ0RWxlbWVudCgpe1xuXHRcdHJldHVybiAoPHNwYW4vPilcblx0fVxuXG4gICAgc2VhcmNoKHByb3BzKXtcbiAgICAgICAgdGhpcy5yZWZzLnNlYXJjaC5kaXNtaXNzKClcbiAgICAgICAgdmFyIHt2YWx1ZTp0aXRsZT1cIlwifT1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuYnlUaXRsZSlcbiAgICAgICAgdGl0bGU9dGl0bGUudHJpbSgpXG4gICAgICAgIGlmKHRpdGxlLmxlbmd0aClcbiAgICAgICAgICAgIHByb3BzLnRpdGxlPXRpdGxlXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZSh0aGlzLmNvbnRleHQucm91dGVyLmNyZWF0ZVBhdGgoXCJrbm93bGVkZ2VzXCIsIHByb3BzKSlcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG5cbiAgICBzdGF0aWMgQ3JlYXRhYmxlPWNsYXNzIGV4dGVuZHMgS25vd2xlZGdlc3tcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0FkZCBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJrbm93bGVkZ2VcIil9IG1pbmk9e3RydWV9Lz5cbiAgICAgICAgICAgICAgICAgICAge3N1cGVyLnJlbmRlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxuXHRcblx0c3RhdGljIENvdXJzZT1jbGFzcyBleHRlbmRzIEtub3dsZWRnZXN7XG5cdFx0Z2V0TGVmdEVsZW1lbnQoKXtcblx0XHRcdHJldHVybiAoPEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX0+PEljb25CYWNrLz48L0ljb25CdXR0b24+KVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthZ2UsZ2VuZGVyLGNhdGVnb3J5fT10aGlzLnByb3BzLnF1ZXJ5fHx7fVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiYWdlXCIga2V5PVwiQWdlXCIgbGFiZWw9XCJBZ2UgKFllYXIpXCIgc2luZ2xlPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXthZ2V9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiMC41LCAxLCAyLCAzLCA0LCA1LCA2LCA4LCAxMFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImdlbmRlclwiIGtleT1cIkdlbmRlclwiIGxhYmVsPVwiR2VuZGVyXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Z2VuZGVyfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIkdpcmwsQm95XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiY2F0ZWdvcnlcIiBrZXk9XCJDYXRlZ29yeVwiIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJPYnNlcnZlLCBTdHVkeSwgU3BvcnRcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImFjdGlvbnNcIiBzdHlsZT17e3BhZGRpbmc6MTAsIHRleHRBbGlnbjonY2VudGVyJ319PlxuICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gb25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0dmFyIGFnZT10aGlzLnJlZnMuYWdlLnN0YXRlLnNlbGVjdGVkLFxuXHRcdFx0XHRcdFx0XHRnZW5kZXI9QXJyYXkuZnJvbSh0aGlzLnJlZnMuZ2VuZGVyLnN0YXRlLnNlbGVjdGVkKSxcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk9QXJyYXkuZnJvbSh0aGlzLnJlZnMuY2F0ZWdvcnkuc3RhdGUuc2VsZWN0ZWQpXG5cblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub25TZWFyY2goe2FnZSxnZW5kZXIsY2F0ZWdvcnl9KVxuXHRcdFx0XHRcdH19PlNlYXJjaDwvUmFpc2VkQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PilcbiAgICAgICAgXVxuICAgIH1cbn1cblxuY2xhc3MgQ2hlY2tHcm91cCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgdmFyIHtzZWxlY3RlZCwgc2luZ2xlfT1uZXh0XG4gICAgICAgIHRoaXMuc3RhdGU9e31cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1zZWxlY3RlZDtcbiAgICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoc2VsZWN0ZWQpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoKVxuXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXJ7aXRlbXMsIGxhYmVsLCBvbkNoYW5nZSwgc2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgc2VsZWN0ZWRTdHlsZT17cGFkZGluZzo1LCBib3JkZXJSaWdodDonMXB4IHNvbGlkIGxpZ2h0Z3JheScsXG4gICAgICAgICAgICAgICAgY29sb3I6J3doaXRlJyxiYWNrZ3JvdW5kQ29sb3I6J3JlZCd9LFxuICAgICAgICAgICAgdW5zZWxlY3RlZFN0eWxlPU9iamVjdC5hc3NpZ24oe30sc2VsZWN0ZWRTdHlsZSx7Y29sb3I6J2JsYWNrJywgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCd9KTtcblxuICAgICAgICByZXR1cm4oPGRpdiBzdHlsZT17e3BhZGRpbmc6MTB9fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7ZmxvYXQ6J3JpZ2h0JyxwYWRkaW5nOic1cHggMHB4JywgYm9yZGVyOicxcHggc29saWQgbGlnaHRncmF5JywgYm9yZGVyUmlnaHQ6MH19PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGEpIT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE9YS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXthfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLm9uU2VsZWN0KGEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsoc2luZ2xlID8gc2VsZWN0ZWQ9PWEgOiBzZWxlY3RlZC5oYXMoYSkpID8gc2VsZWN0ZWRTdHlsZSA6IHVuc2VsZWN0ZWRTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2F9PC9zcGFuPilcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxuICAgIG9uU2VsZWN0KGl0ZW0sIGE9e30pe1xuICAgICAgICB2YXJ7c2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBzZWxlY3RlZD09aXRlbSA/IHVuZGVmaW5lZCA6IGl0ZW19KTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNlbGVjdGVkW3NlbGVjdGVkLmhhcyhpdGVtKSA/ICdkZWxldGUnIDogJ2FkZCddKGl0ZW0pXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDpzZWxlY3RlZH0pXG4gICAgICAgIH1cbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17c2luZ2xlOmZhbHNlfVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOntwaG90b3M9W119fT10aGlzLnByb3BzXG4gICAgICAgIHN3aXRjaChwaG90b3MubGVuZ3RoKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzBwaG90bygpXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzFwaG90bygpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fM3Bob3RvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF8wcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8wXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1bW1hcnlcIj57bW9kZWwuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBfMXBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgXzNwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzNcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMV19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzJdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9tb3JlKG1vZGVsKXtcbiAgICAgICAgdmFyIHRpbWU9cmVsYXRpdmUobW9kZWwuY3JlYXRlZEF0fHxtb2RlbC51cGRhdGVkQXQpXG5cbiAgICAgICAgdmFyIHphbj1tb2RlbC56YW5zID8gKDxkaXY+PEljb25UaHVtYnVwLz57bW9kZWwuemFuc308L2Rpdj4pIDogbnVsbFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlXCI+XG4gICAgICAgICAgICAgICAgPHRpbWU+e3RpbWV9PC90aW1lPlxuICAgICAgICAgICAgICAgIHt6YW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvbkRldGFpbCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmBrbm93bGVkZ2UvJHt0aGlzLnByb3BzLm1vZGVsLl9pZH1gLHN0YXRlOntrbm93bGVkZ2U6dGhpcy5wcm9wcy5tb2RlbH19KVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG4iXX0=