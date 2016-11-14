"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Knowledges = exports.REDUCER = exports.ACTION = undefined;

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

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

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

var CommandBar = _qiliApp.UI.CommandBar,
    Empty = _qiliApp.UI.Empty;
var DialogCommand = CommandBar.DialogCommand;


var DOMAIN = "knowledge";
var INIT_STATE = {
    query: {
        title: ""
    },
    knowledges: []
};
var ACTION = exports.ACTION = {
    FETCH: function FETCH(query) {
        return function (dispatch) {
            return _knowledge2.default.find(query).fetch(function (knowledges) {
                dispatch({ type: "@@" + DOMAIN + "/fetched", payload: { query: query, knowledges: knowledges } });
            });
        };
    },
    SELECT_DOCX: function SELECT_DOCX(a) {
        return function (dispatch) {
            return _knowledge4.default.selectDocx().then(function (docx) {
                return dispatch({ type: "@@" + DOMAIN + "/selectedDocx", payload: docx });
            });
        };
    },

    CREATE: function CREATE(docx) {
        return function (dispatch) {
            var entity = docx.entity;

            entity.content = "";
            return _knowledge2.default.upsert(entity).then(function (a) {
                return docx.upload(entity).then(function (content) {
                    entity.photos = docx.getPhotos();
                    entity.content = content;
                    return _knowledge2.default.upsert(entity);
                }, function (a) {
                    _knowledge2.default.remove(entity);
                    return a;
                });
            });
        };
    },
    CLEAR: { type: "@@" + DOMAIN + "/clear" }
};

var REDUCER = exports.REDUCER = function REDUCER() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case "@@" + DOMAIN + "/fetched":
            return (0, _assign2.default)({}, state, payload);
        case "@@" + DOMAIN + "/selectedDocx":
            if (state.selectedDocx) state.selectedDocx.revoke();
            return (0, _assign2.default)({}, state, { selectedDocx: payload });
        case "@@" + DOMAIN + "/clear":
            if (state.selectedDocx) {
                state.selectedDocx.revoke();
                delete state.selectedDocx;
            }
            return state;
        default:
            return state;
    }
};

var Knowledges = exports.Knowledges = function (_Component) {
    (0, _inherits3.default)(Knowledges, _Component);

    function Knowledges() {
        (0, _classCallCheck3.default)(this, Knowledges);
        return (0, _possibleConstructorReturn3.default)(this, (Knowledges.__proto__ || (0, _getPrototypeOf2.default)(Knowledges)).apply(this, arguments));
    }

    (0, _createClass3.default)(Knowledges, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props = this.props,
                _props$location$query = _props.location.query,
                query = _props$location$query === undefined ? {} : _props$location$query,
                dispatch = _props.dispatch;

            dispatch(ACTION.FETCH(query));
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next) {
            var query = this.props.location.query;
            var nextQuery = next.location.query,
                dispatch = next.dispatch;

            if (query.title != nextQuery.Title) dispatch(ACION.FETCH(next.location.query));
        }
    }, {
        key: "render",
        value: function render() {
            var router = this.context.router;
            var knowledges = this.props.knowledges;

            var refSearch = null;
            var search = function search(title) {
                return router.replace("/knowledge?" + (0, _stringify2.default)({ title: refSearch.getValue().trim() }));
            };
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_materialUi.AppBar, {
                    iconElementLeft: this.getLeftElement(),
                    iconElementRight: _react2.default.createElement(
                        _materialUi.IconButton,
                        { onClick: function onClick(e) {
                                return search();
                            } },
                        _react2.default.createElement(_search2.default, null)
                    ),
                    title: _react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
                            return refSearch = a;
                        },
                        hintText: "\u67E5\u8BE2",
                        onKeyDown: function onKeyDown(e) {
                            return e.keycode == 13 && search();
                        },
                        fullWidth: true })
                }),
                _react2.default.createElement(
                    "div",
                    null,
                    knowledges.map(function (a) {
                        return _react2.default.createElement(Item, { model: a, key: a._id });
                    })
                )
            );
        }
    }, {
        key: "getLeftElement",
        value: function getLeftElement() {
            return _react2.default.createElement("span", null);
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
            var dispatch = this.props.dispatch;
            var router = this.context.router;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_floatingAdd2.default, {
                    onClick: function onClick(e) {
                        return dispatch(ACTION.SELECT_DOCX()).then(router.push("/knowledge/create"));
                    },
                    mini: true }),
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
            var _this12 = this;

            return _react2.default.createElement(
                _materialUi.IconButton,
                { onClick: function onClick(e) {
                        return _this12.context.router.goBack();
                    } },
                _react2.default.createElement(_keyboardArrowLeft2.default, null)
            );
        }
    }]);
    return _class2;
}(Knowledges);

var Search = function (_DialogCommand) {
    (0, _inherits3.default)(Search, _DialogCommand);

    function Search() {
        (0, _classCallCheck3.default)(this, Search);
        return (0, _possibleConstructorReturn3.default)(this, (Search.__proto__ || (0, _getPrototypeOf2.default)(Search)).apply(this, arguments));
    }

    (0, _createClass3.default)(Search, [{
        key: "renderContent",
        value: function renderContent() {
            var _this3 = this;

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
                            var age = _this3.refs.age.state.selected,
                                gender = (0, _from2.default)(_this3.refs.gender.state.selected),
                                category = (0, _from2.default)(_this3.refs.category.state.selected);

                            _this3.props.onSearch({ age: age, gender: gender, category: category });
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

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (CheckGroup.__proto__ || (0, _getPrototypeOf2.default)(CheckGroup)).call(this, props));

        _this4.componentWillReceiveProps(_this4.props);
        return _this4;
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
            var _props2 = this.props,
                items = _props2.items,
                label = _props2.label,
                onChange = _props2.onChange,
                single = _props2.single,
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
                        var _this5 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _react2.default.createElement(
                            "span",
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
            var _this7 = this;

            var _props3 = this.props,
                model = _props3.model,
                others = (0, _objectWithoutProperties3.default)(_props3, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo0" }, others, { onClick: function onClick() {
                        return _this7.onDetail();
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
            var _this8 = this;

            var _props4 = this.props,
                model = _props4.model,
                others = (0, _objectWithoutProperties3.default)(_props4, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo1" }, others, { onClick: function onClick() {
                        return _this8.onDetail();
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
            var _this9 = this;

            var _props5 = this.props,
                model = _props5.model,
                others = (0, _objectWithoutProperties3.default)(_props5, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo3" }, others, { onClick: function onClick() {
                        return _this9.onDetail();
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
            this.context.router.push({ pathname: "/knowledge/" + this.props.model._id, state: { knowledge: this.props.model } });
        }
    }]);
    return Item;
}(_react.Component);

Item.contextTypes = { router: _react.PropTypes.object };
exports.default = (0, _assign2.default)(Knowledges, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2VzLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJFbXB0eSIsIkRpYWxvZ0NvbW1hbmQiLCJET01BSU4iLCJJTklUX1NUQVRFIiwicXVlcnkiLCJ0aXRsZSIsImtub3dsZWRnZXMiLCJBQ1RJT04iLCJGRVRDSCIsImZpbmQiLCJmZXRjaCIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJTRUxFQ1RfRE9DWCIsInNlbGVjdERvY3giLCJ0aGVuIiwiZG9jeCIsIkNSRUFURSIsImVudGl0eSIsImNvbnRlbnQiLCJ1cHNlcnQiLCJ1cGxvYWQiLCJwaG90b3MiLCJnZXRQaG90b3MiLCJyZW1vdmUiLCJhIiwiQ0xFQVIiLCJSRURVQ0VSIiwic3RhdGUiLCJzZWxlY3RlZERvY3giLCJyZXZva2UiLCJLbm93bGVkZ2VzIiwicHJvcHMiLCJsb2NhdGlvbiIsIm5leHQiLCJuZXh0UXVlcnkiLCJUaXRsZSIsIkFDSU9OIiwicm91dGVyIiwiY29udGV4dCIsInJlZlNlYXJjaCIsInNlYXJjaCIsInJlcGxhY2UiLCJnZXRWYWx1ZSIsInRyaW0iLCJnZXRMZWZ0RWxlbWVudCIsImUiLCJrZXljb2RlIiwibWFwIiwiX2lkIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRhYmxlIiwicHVzaCIsIkNvdXJzZSIsImdvQmFjayIsIlNlYXJjaCIsImFnZSIsImdlbmRlciIsImNhdGVnb3J5Iiwic3BsaXQiLCJwYWRkaW5nIiwidGV4dEFsaWduIiwicmVmcyIsInNlbGVjdGVkIiwib25TZWFyY2giLCJDaGVja0dyb3VwIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNpbmdsZSIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW1zIiwibGFiZWwiLCJvbkNoYW5nZSIsInNlbGVjdGVkU3R5bGUiLCJib3JkZXJSaWdodCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwidW5zZWxlY3RlZFN0eWxlIiwiZmxvYXQiLCJib3JkZXIiLCJvblNlbGVjdCIsImhhcyIsImJpbmQiLCJpdGVtIiwic2V0U3RhdGUiLCJ1bmRlZmluZWQiLCJkZWZhdWx0UHJvcHMiLCJJdGVtIiwibW9kZWwiLCJsZW5ndGgiLCJfMHBob3RvIiwiXzFwaG90byIsIl8zcGhvdG8iLCJvdGhlcnMiLCJvbkRldGFpbCIsInN1bW1hcnkiLCJfbW9yZSIsInRpbWUiLCJjcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJ6YW4iLCJ6YW5zIiwicGF0aG5hbWUiLCJrbm93bGVkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztJQUVPQSxVLGVBQUFBLFU7SUFBWUMsSyxlQUFBQSxLO0lBRVpDLGEsR0FBZUYsVSxDQUFmRSxhOzs7QUFFUCxJQUFNQyxTQUFPLFdBQWI7QUFDQSxJQUFNQyxhQUFXO0FBQ2JDLFdBQU07QUFDRkMsZUFBTTtBQURKLEtBRE87QUFJWkMsZ0JBQVc7QUFKQyxDQUFqQjtBQU1PLElBQU1DLDBCQUFPO0FBQ2hCQyxXQUFPO0FBQUEsZUFBTztBQUFBLG1CQUFVLG9CQUFZQyxJQUFaLENBQWlCTCxLQUFqQixFQUNuQk0sS0FEbUIsQ0FDYixzQkFBWTtBQUNmQyx5QkFBUyxFQUFDQyxhQUFVVixNQUFWLGFBQUQsRUFBNkJXLFNBQVEsRUFBQ1QsWUFBRCxFQUFPRSxzQkFBUCxFQUFyQyxFQUFUO0FBQ0gsYUFIbUIsQ0FBVjtBQUFBLFNBQVA7QUFBQSxLQURTO0FBS2ZRLGlCQUFhO0FBQUEsZUFBRztBQUFBLG1CQUFVLG9CQUFZQyxVQUFaLEdBQ3RCQyxJQURzQixDQUNqQjtBQUFBLHVCQUFNTCxTQUFTLEVBQUNDLGFBQVVWLE1BQVYsa0JBQUQsRUFBaUNXLFNBQVFJLElBQXpDLEVBQVQsQ0FBTjtBQUFBLGFBRGlCLENBQVY7QUFB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LE1BQU4sQ0FBYSxDQUFiLENBQVY7QUFBTCxxQkFGSjtBQUdJO0FBQUE7QUFBQTtBQUFLLCtEQUFLLEtBQUttRSxNQUFNbkUsTUFBTixDQUFhLENBQWIsQ0FBVjtBQUFMO0FBSEosaUJBRko7QUFPQyxxQkFBSzJFLEtBQUwsQ0FBV1IsS0FBWDtBQVBELGFBREo7QUFXSDs7OzhCQUVLQSxLLEVBQU07QUFDUixnQkFBSVMsT0FBSyx3QkFBU1QsTUFBTVUsU0FBTixJQUFpQlYsTUFBTVcsU0FBaEMsQ0FBVDs7QUFFQSxnQkFBSUMsTUFBSVosTUFBTWEsSUFBTixHQUFjO0FBQUE7QUFBQTtBQUFLLHNFQUFMO0FBQW9CYixzQkFBTWE7QUFBMUIsYUFBZCxHQUF1RCxJQUEvRDtBQUNBLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLE1BQWY7QUFDSTtBQUFBO0FBQUE7QUFBT0o7QUFBUCxpQkFESjtBQUVLRztBQUZMLGFBREo7QUFNSDs7O21DQUNTO0FBQ04saUJBQUs5RCxPQUFMLENBQWFELE1BQWIsQ0FBb0JlLElBQXBCLENBQXlCLEVBQUNrRCwwQkFBdUIsS0FBS3ZFLEtBQUwsQ0FBV3lELEtBQVgsQ0FBaUJ4QyxHQUF6QyxFQUErQ3JCLE9BQU0sRUFBQzRFLFdBQVUsS0FBS3hFLEtBQUwsQ0FBV3lELEtBQXRCLEVBQXJELEVBQXpCO0FBQ0g7Ozs7O0FBckVDRCxJLENBc0VFdEMsWSxHQUFhLEVBQUNaLFFBQU8saUJBQVVhLE1BQWxCLEU7a0JBR04sc0JBQWNwQixVQUFkLEVBQXlCLEVBQUN6QixjQUFELEVBQVNxQixnQkFBVCxFQUF6QixDIiwiZmlsZSI6Imtub3dsZWRnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBcHBCYXIsIFRleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvblRodW1idXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdGh1bWItdXBcIlxuaW1wb3J0IEljb25TZWFyY2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2VhcmNoXCJcbmltcG9ydCBJY29uQmFjayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQge3JlbGF0aXZlfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgRmxvYXRpbmdBZGQgZnJvbSBcIi4vY29tcG9uZW50cy9mbG9hdGluZy1hZGRcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmNvbnN0IERPTUFJTj1cImtub3dsZWRnZVwiXG5jb25zdCBJTklUX1NUQVRFPXtcbiAgICBxdWVyeTp7XG4gICAgICAgIHRpdGxlOlwiXCJcbiAgICB9XG4gICAgLGtub3dsZWRnZXM6W11cbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuICAgIEZFVENIOiBxdWVyeT0+ZGlzcGF0Y2g9PmRiS25vd2xlZGdlLmZpbmQocXVlcnkpXG4gICAgICAgIC5mZXRjaChrbm93bGVkZ2VzPT57XG4gICAgICAgICAgICBkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAsIHBheWxvYWQ6e3F1ZXJ5LGtub3dsZWRnZXN9fSlcbiAgICAgICAgfSlcbiAgICAsU0VMRUNUX0RPQ1g6IGE9PmRpc3BhdGNoPT51aUtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgLnRoZW4oZG9jeD0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3NlbGVjdGVkRG9jeGAscGF5bG9hZDpkb2N4fSkpXG5cbiAgICAsQ1JFQVRFOiBkb2N4PT5kaXNwYXRjaD0+e1xuICAgICAgICBjb25zdCB7ZW50aXR5fT1kb2N4XG4gICAgICAgIGVudGl0eS5jb250ZW50PVwiXCJcbiAgICAgICAgcmV0dXJuIGRiS25vd2xlZGdlLnVwc2VydChlbnRpdHkpLnRoZW4oYT0+e1xuICAgICAgICAgICAgcmV0dXJuIGRvY3gudXBsb2FkKGVudGl0eSkudGhlbihjb250ZW50PT57XG4gICAgICAgICAgICAgICAgZW50aXR5LnBob3Rvcz1kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIHJldHVybiBkYktub3dsZWRnZS51cHNlcnQoZW50aXR5KVxuICAgICAgICAgICAgfSwgYT0+e1xuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnJlbW92ZShlbnRpdHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgICxDTEVBUjoge3R5cGU6YEBAJHtET01BSU59L2NsZWFyYH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUsIHt0eXBlLCBwYXlsb2FkfSk9PntcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHBheWxvYWQpXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vc2VsZWN0ZWREb2N4YDpcbiAgICAgICAgaWYoc3RhdGUuc2VsZWN0ZWREb2N4KVxuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzZWxlY3RlZERvY3g6cGF5bG9hZH0pXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY2xlYXJgOlxuICAgICAgICBpZihzdGF0ZS5zZWxlY3RlZERvY3gpe1xuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXG4gICAgICAgICAgICBkZWxldGUgc3RhdGUuc2VsZWN0ZWREb2N4XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgS25vd2xlZGdlcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5PXt9fSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHF1ZXJ5KSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5fX09dGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5Om5leHRRdWVyeX0sIGRpc3BhdGNofT1uZXh0XG4gICAgICAgIGlmKHF1ZXJ5LnRpdGxlIT1uZXh0UXVlcnkuVGl0bGUpXG4gICAgICAgICAgICBkaXNwYXRjaChBQ0lPTi5GRVRDSChuZXh0LmxvY2F0aW9uLnF1ZXJ5KSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2VzfT10aGlzLnByb3BzXG4gICAgICAgIGxldCByZWZTZWFyY2g9bnVsbFxuICAgICAgICBjb25zdCBzZWFyY2g9dGl0bGU9PnJvdXRlci5yZXBsYWNlKGAva25vd2xlZGdlP2ArSlNPTi5zdHJpbmdpZnkoe3RpdGxlOnJlZlNlYXJjaC5nZXRWYWx1ZSgpLnRyaW0oKX0pKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8QXBwQmFyXG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50TGVmdD17dGhpcy5nZXRMZWZ0RWxlbWVudCgpfVxuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudFJpZ2h0PXs8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5zZWFyY2goKX0+PEljb25TZWFyY2gvPjwvSWNvbkJ1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXs8VGV4dEZpZWxkIHJlZj17YT0+cmVmU2VhcmNoPWF9XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50VGV4dD1cIuafpeivolwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PihlLmtleWNvZGU9PTEzICYmIHNlYXJjaCgpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7a25vd2xlZGdlcy5tYXAoYT0+PEl0ZW0gbW9kZWw9e2F9IGtleT17YS5faWR9Lz4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0Z2V0TGVmdEVsZW1lbnQoKXtcblx0XHRyZXR1cm4gKDxzcGFuLz4pXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBDcmVhdGFibGU9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0FkZFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNFTEVDVF9ET0NYKCkpLnRoZW4ocm91dGVyLnB1c2goXCIva25vd2xlZGdlL2NyZWF0ZVwiKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pPXt0cnVlfS8+XG4gICAgICAgICAgICAgICAgICAgIHtzdXBlci5yZW5kZXIoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgQ291cnNlPWNsYXNzIGV4dGVuZHMgS25vd2xlZGdlc3tcblx0XHRnZXRMZWZ0RWxlbWVudCgpe1xuXHRcdFx0cmV0dXJuICg8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpfT48SWNvbkJhY2svPjwvSWNvbkJ1dHRvbj4pXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FnZSxnZW5kZXIsY2F0ZWdvcnl9PXRoaXMucHJvcHMucXVlcnl8fHt9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJhZ2VcIiBrZXk9XCJBZ2VcIiBsYWJlbD1cIkFnZSAoWWVhcilcIiBzaW5nbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FnZX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCIwLjUsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDEwXCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiZ2VuZGVyXCIga2V5PVwiR2VuZGVyXCIgbGFiZWw9XCJHZW5kZXJcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtnZW5kZXJ9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiR2lybCxCb3lcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJjYXRlZ29yeVwiIGtleT1cIkNhdGVnb3J5XCIgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIk9ic2VydmUsIFN0dWR5LCBTcG9ydFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxkaXYga2V5PVwiYWN0aW9uc1wiIHN0eWxlPXt7cGFkZGluZzoxMCwgdGV4dEFsaWduOidjZW50ZXInfX0+XG4gICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHR2YXIgYWdlPXRoaXMucmVmcy5hZ2Uuc3RhdGUuc2VsZWN0ZWQsXG5cdFx0XHRcdFx0XHRcdGdlbmRlcj1BcnJheS5mcm9tKHRoaXMucmVmcy5nZW5kZXIuc3RhdGUuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yeT1BcnJheS5mcm9tKHRoaXMucmVmcy5jYXRlZ29yeS5zdGF0ZS5zZWxlY3RlZClcblxuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5vblNlYXJjaCh7YWdlLGdlbmRlcixjYXRlZ29yeX0pXG5cdFx0XHRcdFx0fX0+U2VhcmNoPC9SYWlzZWRCdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICBdXG4gICAgfVxufVxuXG5jbGFzcyBDaGVja0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh0aGlzLnByb3BzKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICB2YXIge3NlbGVjdGVkLCBzaW5nbGV9PW5leHRcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPXNlbGVjdGVkO1xuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldChzZWxlY3RlZClcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldCgpXG5cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhcntpdGVtcywgbGFiZWwsIG9uQ2hhbmdlLCBzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZFN0eWxlPXtwYWRkaW5nOjUsIGJvcmRlclJpZ2h0OicxcHggc29saWQgbGlnaHRncmF5JyxcbiAgICAgICAgICAgICAgICBjb2xvcjond2hpdGUnLGJhY2tncm91bmRDb2xvcjoncmVkJ30sXG4gICAgICAgICAgICB1bnNlbGVjdGVkU3R5bGU9T2JqZWN0LmFzc2lnbih7fSxzZWxlY3RlZFN0eWxlLHtjb2xvcjonYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J30pO1xuXG4gICAgICAgIHJldHVybig8ZGl2IHN0eWxlPXt7cGFkZGluZzoxMH19PlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLHBhZGRpbmc6JzVweCAwcHgnLCBib3JkZXI6JzFweCBzb2xpZCBsaWdodGdyYXknLCBib3JkZXJSaWdodDowfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSkhPSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYT1hLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2F9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyhzaW5nbGUgPyBzZWxlY3RlZD09YSA6IHNlbGVjdGVkLmhhcyhhKSkgPyBzZWxlY3RlZFN0eWxlIDogdW5zZWxlY3RlZFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG4gICAgb25TZWxlY3QoaXRlbSwgYT17fSl7XG4gICAgICAgIHZhcntzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6IHNlbGVjdGVkPT1pdGVtID8gdW5kZWZpbmVkIDogaXRlbX0pO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc2VsZWN0ZWRbc2VsZWN0ZWQuaGFzKGl0ZW0pID8gJ2RlbGV0ZScgOiAnYWRkJ10oaXRlbSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOnNlbGVjdGVkfSlcbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtzaW5nbGU6ZmFsc2V9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6e3Bob3Rvcz1bXX19PXRoaXMucHJvcHNcbiAgICAgICAgc3dpdGNoKHBob3Rvcy5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMHBob3RvKClcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMXBob3RvKClcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8zcGhvdG8oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXzBwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzBcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VtbWFyeVwiPnttb2RlbC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIF8xcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfM3Bob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvM1wiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1sxXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMl19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX21vcmUobW9kZWwpe1xuICAgICAgICB2YXIgdGltZT1yZWxhdGl2ZShtb2RlbC5jcmVhdGVkQXR8fG1vZGVsLnVwZGF0ZWRBdClcblxuICAgICAgICB2YXIgemFuPW1vZGVsLnphbnMgPyAoPGRpdj48SWNvblRodW1idXAvPnttb2RlbC56YW5zfTwvZGl2PikgOiBudWxsXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmVcIj5cbiAgICAgICAgICAgICAgICA8dGltZT57dGltZX08L3RpbWU+XG4gICAgICAgICAgICAgICAge3phbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YC9rbm93bGVkZ2UvJHt0aGlzLnByb3BzLm1vZGVsLl9pZH1gLHN0YXRlOntrbm93bGVkZ2U6dGhpcy5wcm9wcy5tb2RlbH19KVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oS25vd2xlZGdlcyx7QUNUSU9OLCBSRURVQ0VSfSlcbiJdfQ==