"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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

var List = _qiliApp.UI.List,
    CommandBar = _qiliApp.UI.CommandBar,
    Empty = _qiliApp.UI.Empty;
var DialogCommand = CommandBar.DialogCommand;

var Knowledges = function (_Component) {
    (0, _inherits3.default)(Knowledges, _Component);

    function Knowledges() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Knowledges);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Knowledges.__proto__ || (0, _getPrototypeOf2.default)(Knowledges)).call.apply(_ref, [this].concat(args))), _this), _this.state = { model: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Knowledges, [{
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

            var model = this.state.model,
                _props$location$query = this.props.location.query,
                query = _props$location$query === undefined ? {} : _props$location$query;

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
                        hintText: "\u67E5\u8BE2",
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

            var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(this.refs.byTitle),
                _ReactDOM$findDOMNode2 = _ReactDOM$findDOMNode.value,
                title = _ReactDOM$findDOMNode2 === undefined ? "" : _ReactDOM$findDOMNode2;

            title = title.trim();
            if (title.length) props.title = title;
            this.context.router.replace(this.context.router.createPath("knowledges", props));
        }
    }]);
    return Knowledges;
}(_react.Component);

Knowledges.contextTypes = { router: _react.PropTypes.object };

Knowledges.Creatable = function (_Knowledges) {
    (0, _inherits3.default)(_class, _Knowledges);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_floatingAdd2.default, { onClick: function onClick(e) {
                        return _this5.context.router.push("knowledge");
                    }, mini: true }),
                (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "render", this).call(this)
            );
        }
    }]);
    return _class;
}(Knowledges);

Knowledges.Course = function (_Knowledges2) {
    (0, _inherits3.default)(_class2, _Knowledges2);

    function _class2() {
        (0, _classCallCheck3.default)(this, _class2);
        return (0, _possibleConstructorReturn3.default)(this, (_class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class2, [{
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
    (0, _inherits3.default)(Search, _DialogCommand);

    function Search() {
        (0, _classCallCheck3.default)(this, Search);
        return (0, _possibleConstructorReturn3.default)(this, (Search.__proto__ || (0, _getPrototypeOf2.default)(Search)).apply(this, arguments));
    }

    (0, _createClass3.default)(Search, [{
        key: "renderContent",
        value: function renderContent() {
            var _this9 = this;

            var _ref2 = this.props.query || {},
                age = _ref2.age,
                gender = _ref2.gender,
                category = _ref2.category;

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
                                gender = (0, _from2.default)(_this9.refs.gender.state.selected),
                                category = (0, _from2.default)(_this9.refs.category.state.selected);

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
    (0, _inherits3.default)(CheckGroup, _Component2);

    function CheckGroup(props) {
        (0, _classCallCheck3.default)(this, CheckGroup);

        var _this10 = (0, _possibleConstructorReturn3.default)(this, (CheckGroup.__proto__ || (0, _getPrototypeOf2.default)(CheckGroup)).call(this, props));

        _this10.componentWillReceiveProps(_this10.props);
        return _this10;
    }

    (0, _createClass3.default)(CheckGroup, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next) {
            var selected = next.selected,
                single = next.single;

            this.state = {};
            if (single) this.state.selected = selected;else if (Array.isArray(selected)) {
                this.state.selected = new _set2.default(selected);
            } else this.state.selected = new _set2.default();
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                items = _props.items,
                label = _props.label,
                onChange = _props.onChange,
                single = _props.single,
                selected = this.state.selected,
                selectedStyle = { padding: 5, borderRight: '1px solid lightgray',
                color: 'white', backgroundColor: 'red' },
                unselectedStyle = (0, _assign2.default)({}, selectedStyle, { color: 'black', backgroundColor: 'transparent' });


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
            var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var single = this.props.single,
                selected = this.state.selected;


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
    (0, _inherits3.default)(Item, _Component3);

    function Item() {
        (0, _classCallCheck3.default)(this, Item);
        return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
    }

    (0, _createClass3.default)(Item, [{
        key: "render",
        value: function render() {
            var _props$model$photos = this.props.model.photos,
                photos = _props$model$photos === undefined ? [] : _props$model$photos;

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

            var _props2 = this.props,
                model = _props2.model,
                others = (0, _objectWithoutProperties3.default)(_props2, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo0" }, others, { onClick: function onClick() {
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

            var _props3 = this.props,
                model = _props3.model,
                others = (0, _objectWithoutProperties3.default)(_props3, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo1" }, others, { onClick: function onClick() {
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

            var _props4 = this.props,
                model = _props4.model,
                others = (0, _objectWithoutProperties3.default)(_props4, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo3" }, others, { onClick: function onClick() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2VzLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJDb21tYW5kQmFyIiwiRW1wdHkiLCJEaWFsb2dDb21tYW5kIiwiS25vd2xlZGdlcyIsInN0YXRlIiwibW9kZWwiLCJmaW5kIiwicHJvcHMiLCJsb2NhdGlvbiIsInF1ZXJ5IiwiZmV0Y2giLCJzZXRTdGF0ZSIsImdldERhdGEiLCJnZXRMZWZ0RWxlbWVudCIsInNlYXJjaCIsImUiLCJrZXljb2RlIiwidGFyZ2V0IiwidmFsdWUiLCJ0aXRsZSIsIkl0ZW0iLCJyZWZzIiwiZGlzbWlzcyIsImZpbmRET01Ob2RlIiwiYnlUaXRsZSIsInRyaW0iLCJsZW5ndGgiLCJjb250ZXh0Iiwicm91dGVyIiwicmVwbGFjZSIsImNyZWF0ZVBhdGgiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJDcmVhdGFibGUiLCJwdXNoIiwiQ291cnNlIiwiZ29CYWNrIiwiU2VhcmNoIiwiYWdlIiwiZ2VuZGVyIiwiY2F0ZWdvcnkiLCJzcGxpdCIsInBhZGRpbmciLCJ0ZXh0QWxpZ24iLCJzZWxlY3RlZCIsIm9uU2VhcmNoIiwiQ2hlY2tHcm91cCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0Iiwic2luZ2xlIiwiQXJyYXkiLCJpc0FycmF5IiwiaXRlbXMiLCJsYWJlbCIsIm9uQ2hhbmdlIiwic2VsZWN0ZWRTdHlsZSIsImJvcmRlclJpZ2h0IiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ1bnNlbGVjdGVkU3R5bGUiLCJmbG9hdCIsImJvcmRlciIsIm1hcCIsImEiLCJvblNlbGVjdCIsImhhcyIsImJpbmQiLCJpdGVtIiwidW5kZWZpbmVkIiwiZGVmYXVsdFByb3BzIiwicGhvdG9zIiwiXzBwaG90byIsIl8xcGhvdG8iLCJfM3Bob3RvIiwib3RoZXJzIiwib25EZXRhaWwiLCJzdW1tYXJ5IiwiX21vcmUiLCJ0aW1lIiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0IiwiemFuIiwiemFucyIsInBhdGhu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Q0FBVjtBQUFMLHFCQURKO0FBRUk7QUFBQTtBQUFBO0FBQUssK0RBQUssS0FBS2pFLE1BQU1pRSxNQUFOLENBQWEsQ0FBYixDQUFWO0FBQUwscUJBRko7QUFHSTtBQUFBO0FBQUE7QUFBSywrREFBSyxLQUFLakUsTUFBTWlFLE1BQU4sQ0FBYSxDQUFiLENBQVY7QUFBTDtBQUhKLGlCQUZKO0FBT0MscUJBQUtPLEtBQUwsQ0FBV3hFLEtBQVg7QUFQRCxhQURKO0FBV0g7Ozs4QkFFS0EsSyxFQUFNO0FBQ1IsZ0JBQUl5RSxPQUFLLHdCQUFTekUsTUFBTTBFLFNBQU4sSUFBaUIxRSxNQUFNMkUsU0FBaEMsQ0FBVDs7QUFFQSxnQkFBSUMsTUFBSTVFLE1BQU02RSxJQUFOLEdBQWM7QUFBQTtBQUFBO0FBQUssc0VBQUw7QUFBb0I3RSxzQkFBTTZFO0FBQTFCLGFBQWQsR0FBdUQsSUFBL0Q7QUFDQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxNQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQU9KO0FBQVAsaUJBREo7QUFFS0c7QUFGTCxhQURKO0FBTUg7OzttQ0FDUztBQUNOLGlCQUFLdEQsT0FBTCxDQUFhQyxNQUFiLENBQW9CTSxJQUFwQixDQUF5QixFQUFDaUQseUJBQXNCLEtBQUs1RSxLQUFMLENBQVdGLEtBQVgsQ0FBaUIrRSxHQUF4QyxFQUE4Q2hGLE9BQU0sRUFBQ2lGLFdBQVUsS0FBSzlFLEtBQUwsQ0FBV0YsS0FBdEIsRUFBcEQsRUFBekI7QUFDSDs7Ozs7QUFyRUNlLEksQ0FzRUVXLFksR0FBYSxFQUFDSCxRQUFPLGlCQUFVSSxNQUFsQixFIiwiZmlsZSI6Imtub3dsZWRnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBcHBCYXIsIFRleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvblRodW1idXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdGh1bWItdXBcIlxuaW1wb3J0IEljb25TZWFyY2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2VhcmNoXCJcbmltcG9ydCBJY29uQmFjayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQge3JlbGF0aXZlfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgRmxvYXRpbmdBZGQgZnJvbSBcIi4vY29tcG9uZW50cy9mbG9hdGluZy1hZGRcIlxuXG5jb25zdCB7TGlzdCwgQ29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZXMgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e21vZGVsOm51bGx9XG5cbiAgICBnZXREYXRhKCl7XG4gICAgICAgIGRiS25vd2xlZGdlLmZpbmQodGhpcy5wcm9wcy5sb2NhdGlvbi5xdWVyeSkuZmV0Y2gobW9kZWw9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21vZGVsfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3F1ZXJ5PXt9fT10aGlzLnByb3BzLmxvY2F0aW9uXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxBcHBCYXJcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnRMZWZ0PXt0aGlzLmdldExlZnRFbGVtZW50KCl9XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50UmlnaHQ9ezxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2VhcmNoKCl9PjxJY29uU2VhcmNoLz48L0ljb25CdXR0b24+fVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17PFRleHRGaWVsZCBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnRUZXh0PVwi5p+l6K+iXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+KGUua2V5Y29kZT09MTMgJiYgdGhpcy5zZWFyY2goZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0gZGVmYXVsdFZhbHVlPXtxdWVyeS50aXRsZX0vPn0vPlxuXG4gICAgICAgICAgICAgICAgPExpc3RcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsPXttb2RlbH1cbiAgICAgICAgICAgICAgICAgICAgZW1wdHk9ezxFbXB0eSBpY29uPXs8SWNvbktub3dsZWRnZXMvPn0gdGV4dD1cIk5vIGtub3dsZWRnZSB5ZXQsIFBsZWFzZSBzdGF5IHR1bmVcIi8+fVxuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZT17MjB9XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPXtJdGVtfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0XG5cdGdldExlZnRFbGVtZW50KCl7XG5cdFx0cmV0dXJuICg8c3Bhbi8+KVxuXHR9XG5cbiAgICBzZWFyY2gocHJvcHMpe1xuICAgICAgICB0aGlzLnJlZnMuc2VhcmNoLmRpc21pc3MoKVxuICAgICAgICB2YXIge3ZhbHVlOnRpdGxlPVwiXCJ9PVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5ieVRpdGxlKVxuICAgICAgICB0aXRsZT10aXRsZS50cmltKClcbiAgICAgICAgaWYodGl0bGUubGVuZ3RoKVxuICAgICAgICAgICAgcHJvcHMudGl0bGU9dGl0bGVcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKHRoaXMuY29udGV4dC5yb3V0ZXIuY3JlYXRlUGF0aChcImtub3dsZWRnZXNcIiwgcHJvcHMpKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBDcmVhdGFibGU9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nQWRkIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImtub3dsZWRnZVwiKX0gbWluaT17dHJ1ZX0vPlxuICAgICAgICAgICAgICAgICAgICB7c3VwZXIucmVuZGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cdFxuXHRzdGF0aWMgQ291cnNlPWNsYXNzIGV4dGVuZHMgS25vd2xlZGdlc3tcblx0XHRnZXRMZWZ0RWxlbWVudCgpe1xuXHRcdFx0cmV0dXJuICg8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpfT48SWNvbkJhY2svPjwvSWNvbkJ1dHRvbj4pXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FnZSxnZW5kZXIsY2F0ZWdvcnl9PXRoaXMucHJvcHMucXVlcnl8fHt9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJhZ2VcIiBrZXk9XCJBZ2VcIiBsYWJlbD1cIkFnZSAoWWVhcilcIiBzaW5nbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FnZX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCIwLjUsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDEwXCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiZ2VuZGVyXCIga2V5PVwiR2VuZGVyXCIgbGFiZWw9XCJHZW5kZXJcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtnZW5kZXJ9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiR2lybCxCb3lcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJjYXRlZ29yeVwiIGtleT1cIkNhdGVnb3J5XCIgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIk9ic2VydmUsIFN0dWR5LCBTcG9ydFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxkaXYga2V5PVwiYWN0aW9uc1wiIHN0eWxlPXt7cGFkZGluZzoxMCwgdGV4dEFsaWduOidjZW50ZXInfX0+XG4gICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHR2YXIgYWdlPXRoaXMucmVmcy5hZ2Uuc3RhdGUuc2VsZWN0ZWQsXG5cdFx0XHRcdFx0XHRcdGdlbmRlcj1BcnJheS5mcm9tKHRoaXMucmVmcy5nZW5kZXIuc3RhdGUuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yeT1BcnJheS5mcm9tKHRoaXMucmVmcy5jYXRlZ29yeS5zdGF0ZS5zZWxlY3RlZClcblxuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5vblNlYXJjaCh7YWdlLGdlbmRlcixjYXRlZ29yeX0pXG5cdFx0XHRcdFx0fX0+U2VhcmNoPC9SYWlzZWRCdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICBdXG4gICAgfVxufVxuXG5jbGFzcyBDaGVja0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh0aGlzLnByb3BzKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICB2YXIge3NlbGVjdGVkLCBzaW5nbGV9PW5leHRcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPXNlbGVjdGVkO1xuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldChzZWxlY3RlZClcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldCgpXG5cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhcntpdGVtcywgbGFiZWwsIG9uQ2hhbmdlLCBzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZFN0eWxlPXtwYWRkaW5nOjUsIGJvcmRlclJpZ2h0OicxcHggc29saWQgbGlnaHRncmF5JyxcbiAgICAgICAgICAgICAgICBjb2xvcjond2hpdGUnLGJhY2tncm91bmRDb2xvcjoncmVkJ30sXG4gICAgICAgICAgICB1bnNlbGVjdGVkU3R5bGU9T2JqZWN0LmFzc2lnbih7fSxzZWxlY3RlZFN0eWxlLHtjb2xvcjonYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J30pO1xuXG4gICAgICAgIHJldHVybig8ZGl2IHN0eWxlPXt7cGFkZGluZzoxMH19PlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLHBhZGRpbmc6JzVweCAwcHgnLCBib3JkZXI6JzFweCBzb2xpZCBsaWdodGdyYXknLCBib3JkZXJSaWdodDowfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSkhPSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYT1hLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2F9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyhzaW5nbGUgPyBzZWxlY3RlZD09YSA6IHNlbGVjdGVkLmhhcyhhKSkgPyBzZWxlY3RlZFN0eWxlIDogdW5zZWxlY3RlZFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG4gICAgb25TZWxlY3QoaXRlbSwgYT17fSl7XG4gICAgICAgIHZhcntzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6IHNlbGVjdGVkPT1pdGVtID8gdW5kZWZpbmVkIDogaXRlbX0pO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc2VsZWN0ZWRbc2VsZWN0ZWQuaGFzKGl0ZW0pID8gJ2RlbGV0ZScgOiAnYWRkJ10oaXRlbSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOnNlbGVjdGVkfSlcbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtzaW5nbGU6ZmFsc2V9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6e3Bob3Rvcz1bXX19PXRoaXMucHJvcHNcbiAgICAgICAgc3dpdGNoKHBob3Rvcy5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMHBob3RvKClcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMXBob3RvKClcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8zcGhvdG8oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXzBwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzBcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VtbWFyeVwiPnttb2RlbC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIF8xcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfM3Bob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvM1wiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1sxXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMl19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX21vcmUobW9kZWwpe1xuICAgICAgICB2YXIgdGltZT1yZWxhdGl2ZShtb2RlbC5jcmVhdGVkQXR8fG1vZGVsLnVwZGF0ZWRBdClcblxuICAgICAgICB2YXIgemFuPW1vZGVsLnphbnMgPyAoPGRpdj48SWNvblRodW1idXAvPnttb2RlbC56YW5zfTwvZGl2PikgOiBudWxsXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmVcIj5cbiAgICAgICAgICAgICAgICA8dGltZT57dGltZX08L3RpbWU+XG4gICAgICAgICAgICAgICAge3phbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YGtub3dsZWRnZS8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsc3RhdGU6e2tub3dsZWRnZTp0aGlzLnByb3BzLm1vZGVsfX0pXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==