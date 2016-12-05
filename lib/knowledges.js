"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Content = exports.Knowledges = exports.REDUCER = exports.ACTION = undefined;

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

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _reactRouter = require("react-router");

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

var _extractor = require("./parser/extractor");

var _extractor2 = _interopRequireDefault(_extractor);

var _selector = require("./selector");

var _timeManage = require("./time-manage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommandBar = _qiliApp.UI.CommandBar,
    Empty = _qiliApp.UI.Empty,
    fileSelector = _qiliApp.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;


var DOMAIN = "knowledge";
var INIT_STATE = {
    knowledges: []
};
var ACTION = exports.ACTION = {
    FETCH: function FETCH(query) {
        return function (dispatch) {
            return _knowledge2.default.find(query).fetch(function (knowledges) {
                if (knowledges && knowledges.length) {
                    var data = (0, _normalizr.normalize)(knowledges, (0, _normalizr.arrayOf)(_knowledge2.default.schema));
                    dispatch((0, _qiliApp.ENTITIES)(data.entities));
                    dispatch({ type: "@@" + DOMAIN + "/fetched", payload: data.result });
                }
            });
        };
    },
    SELECT_DOCX: function SELECT_DOCX(a) {
        return function (dispatch) {
            return fileSelector.select().then(function (file) {
                return (0, _extractor2.default)(file);
            }).then(function (docx) {
                return dispatch({ type: "@@" + DOMAIN + "/selectedDocx", payload: docx });
            });
        };
    },

    CREATE: function CREATE(a) {
        return function (dispatch, getState) {
            var state = getState();
            var docx = state.ui.knowledge.selectedDocx;
            var knowledge = docx.knowledge;

            var photos = docx.getPhotos();
            var upserted = null;
            if (photos.length) {
                knowledge.content = "";
                upserted = _knowledge2.default.upsert(knowledge).then(function (a) {
                    return docx.upload(a).then(function (content) {
                        a.photos = docx.getPhotos();
                        a.content = content;
                        return _knowledge2.default.upsert(a);
                    }, function (a) {
                        _knowledge2.default.remove(knowledge);
                        return _promise2.default.reject(a);
                    });
                });
            } else {
                upserted = _knowledge2.default.upsert(knowledge);
            }

            return upserted.then(function (knowledge) {
                dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(knowledge, _knowledge2.default.schema).entities));
                dispatch({ type: "@@" + DOMAIN + "/created" });
                return knowledge;
            });
        };
    },
    FETCH1: function FETCH1(a) {
        return function (dispatch, getState) {
            var state = getState();
            var _id = state.routing.params._id;
            _knowledge2.default.findOne({ _id: _id }, function (knowledge) {
                return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(knowledge, _knowledge2.default.schema).entities));
            });
        };
    },
    UPDATE: function UPDATE(a) {
        return function (dispatch, getState) {
            var state = getState();
            var docx = state.ui.knowledge.selectedDocx;
            var newVersion = docx.knowledge;

            var photos = docx.getPhotos();

            var id = state.routing.params._id;
            var current = state.entities[_knowledge2.default.schema.getKey()][id];

            var upserted = null;
            if (photos.length) {
                upserted = docx.upload(current).then(function (content) {
                    current.photos = docx.getPhotos();
                    current.content = content;
                    return _knowledge2.default.upsert(current);
                });
            } else {
                upserted = _knowledge2.default.upsert((0, _assign2.default)({}, current, newVersion));
            }

            return upserted.then(function (knowledge) {
                dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(knowledge, _knowledge2.default.schema).entities));
                dispatch({ type: "@@" + DOMAIN + "/updated" });
                return knowledge;
            });
        };
    },
    CANCEL: function CANCEL(a) {
        return { type: "@@" + DOMAIN + "/cancel" };
    },
    TASK: function TASK(_ref) {
        var _id = _ref._id,
            content = _ref.title,
            score = _ref.score;
        return function (dispatch) {
            return dispatch(_timeManage.ACTION.ADD({ _id: _id, content: content, score: score }));
        };
    },
    UNTASK: function UNTASK(_ref2) {
        var _id = _ref2._id;
        return function (dispatch) {
            return dispatch(_timeManage.ACTION.REMOVE({ _id: _id }));
        };
    }
};

var REDUCER = exports.REDUCER = function REDUCER() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        payload = _ref3.payload;

    switch (type) {
        case "@@" + DOMAIN + "/fetched":
            return (0, _assign2.default)({}, state, { knowledges: payload });

        case "@@" + DOMAIN + "/selectedDocx":
            if (state.selectedDocx) state.selectedDocx.revoke();
            return (0, _assign2.default)({}, state, { selectedDocx: payload });
        case "@@" + DOMAIN + "/created":
        case "@@" + DOMAIN + "/updated":
        case "@@" + DOMAIN + "/cancel":
            if (state.selectedDocx) {
                state.selectedDocx.revoke();
                delete state.selectedDocx;
                return (0, _assign2.default)({}, state);
            }
            break;

    }
    return state;
};

var Knowledges = exports.Knowledges = function (_Component) {
    (0, _inherits3.default)(Knowledges, _Component);

    function Knowledges() {
        var _ref4;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Knowledges);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref4 = Knowledges.__proto__ || (0, _getPrototypeOf2.default)(Knowledges)).call.apply(_ref4, [this].concat(args))), _this), _this.state = { filter: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
            var _this2 = this;

            var router = this.context.router;
            var knowledges = this.props.knowledges;
            var filter = this.state.filter;

            var refSearch = null;
            var search = function search(title) {
                router.replace(encodeURI("/knowledge?query=" + (0, _stringify2.default)({ title: refSearch.getValue().trim() })));
                _this2.setState({ filter: null });
            };
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _materialUi.Paper,
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
                            hintText: "查询",
                            onChange: function onChange(e, value) {
                                return _this2.setState({ filter: value });
                            },
                            onKeyDown: function onKeyDown(e) {
                                return e.keyCode == 13 && search();
                            },
                            fullWidth: true })
                    })
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    knowledges.filter(function (a) {
                        return filter ? -1 != a.title.indexOf(filter) : true;
                    }).map(function (a) {
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
                        return dispatch(ACTION.SELECT_DOCX()).then(function (a) {
                            return router.replace('/knowledge/create');
                        });
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
            var _this13 = this;

            return _react2.default.createElement(
                _materialUi.IconButton,
                { onClick: function onClick(e) {
                        return _this13.context.router.goBack();
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
            var _this4 = this;

            var _ref5 = this.props.query || {},
                age = _ref5.age,
                gender = _ref5.gender,
                category = _ref5.category;

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
                            var age = _this4.refs.age.state.selected,
                                gender = (0, _from2.default)(_this4.refs.gender.state.selected),
                                category = (0, _from2.default)(_this4.refs.category.state.selected);

                            _this4.props.onSearch({ age: age, gender: gender, category: category });
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

        var _this5 = (0, _possibleConstructorReturn3.default)(this, (CheckGroup.__proto__ || (0, _getPrototypeOf2.default)(CheckGroup)).call(this, props));

        _this5.componentWillReceiveProps(_this5.props);
        return _this5;
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
                        var _this6 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _react2.default.createElement(
                            "span",
                            {
                                key: a,
                                onClick: function onClick() {
                                    return _this6.onSelect(a);
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
            var _this8 = this;

            var _props3 = this.props,
                model = _props3.model,
                others = (0, _objectWithoutProperties3.default)(_props3, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo0" }, others, { onClick: function onClick() {
                        return _this8.onDetail();
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
            var _this9 = this;

            var _props4 = this.props,
                model = _props4.model,
                others = (0, _objectWithoutProperties3.default)(_props4, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo1" }, others, { onClick: function onClick() {
                        return _this9.onDetail();
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
            var _this10 = this;

            var _props5 = this.props,
                model = _props5.model,
                others = (0, _objectWithoutProperties3.default)(_props5, ["model"]);

            return _react2.default.createElement(
                "div",
                (0, _extends3.default)({ className: "li inset photo3" }, others, { onClick: function onClick() {
                        return _this10.onDetail();
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
var Content = exports.Content = function Content(_ref6) {
    var _id = _ref6._id,
        title = _ref6.title,
        content = _ref6.content,
        summary = _ref6.summary,
        createdAt = _ref6.createdAt,
        _ref6$category = _ref6.category,
        category = _ref6$category === undefined ? [] : _ref6$category,
        _ref6$keywords = _ref6.keywords,
        keywords = _ref6$keywords === undefined ? [] : _ref6$keywords,
        figure = _ref6.figure,
        author = _ref6.author;

    content = _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: content } });

    if (summary && open !== null) {
        content = _react2.default.createElement(
            "details",
            { open: open },
            _react2.default.createElement(
                "summary",
                null,
                summary
            ),
            content
        );
    }

    var notNewStuff = null;
    if (_id) {
        notNewStuff = [_react2.default.createElement(
            "h1",
            { key: "link0" },
            _react2.default.createElement(
                _reactRouter.Link,
                { to: "/knowledge/" + _id },
                title
            )
        ), _react2.default.createElement(
            "p",
            { key: "author" },
            author.name,
            " - ",
            _react2.default.createElement(
                "time",
                null,
                (0, _calendar.relative)(createdAt)
            )
        )];
    } else {
        notNewStuff = _react2.default.createElement(
            "h1",
            { key: "link1" },
            title
        );
    }

    if (figure) figure = _react2.default.createElement("img", { src: figure });

    return _react2.default.createElement(
        "article",
        null,
        _react2.default.createElement(
            "figure",
            null,
            figure
        ),
        _react2.default.createElement(
            "header",
            null,
            notNewStuff,
            _react2.default.createElement(
                "p",
                null,
                category.join(", "),
                " ",
                keywords.join(", ")
            )
        ),
        _react2.default.createElement(
            "section",
            null,
            content
        )
    );
};

exports.default = (0, _assign2.default)(Knowledges, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7SUFFTztJQUFZO0lBQU87SUFFbkIsZ0JBQWUsV0FBZjs7O0FBRVAsSUFBTSxTQUFPLFdBQVA7QUFDTixJQUFNLGFBQVc7QUFDaEIsZ0JBQVcsRUFBWDtDQURLO0FBR0MsSUFBTSwwQkFBTztBQUNoQixXQUFPO2VBQU87bUJBQVUsb0JBQVksSUFBWixDQUFpQixLQUFqQixFQUNuQixLQURtQixDQUNiLHNCQUFZO0FBQ3hCLG9CQUFHLGNBQWMsV0FBVyxNQUFYLEVBQWtCO0FBQ2xDLHdCQUFJLE9BQUssMEJBQVUsVUFBVixFQUFzQix3QkFBUSxvQkFBWSxNQUFaLENBQTlCLENBQUwsQ0FEOEI7QUFFbEMsNkJBQVMsdUJBQVMsS0FBSyxRQUFMLENBQWxCLEVBRmtDO0FBR2xDLDZCQUFTLEVBQUMsYUFBVSxtQkFBVixFQUE0QixTQUFRLEtBQUssTUFBTCxFQUE5QyxFQUhrQztpQkFBbkM7YUFEWTtTQURHO0tBQVA7QUFRTixpQkFBYTtlQUFHO21CQUFVLGFBQWEsTUFBYixHQUM1QixJQUQ0QixDQUN2Qjt1QkFBTSx5QkFBUSxJQUFSO2FBQU4sQ0FEdUIsQ0FFdEIsSUFGc0IsQ0FFakI7dUJBQU0sU0FBUyxFQUFDLGFBQVUsd0JBQVYsRUFBZ0MsU0FBUSxJQUFSLEVBQTFDO2FBQU47U0FGTztLQUFIOztBQUliLFlBQVE7ZUFBRyxVQUFDLFFBQUQsRUFBVSxRQUFWLEVBQXFCO0FBQ25DLGdCQUFNLFFBQU0sVUFBTixDQUQ2QjtBQUVuQyxnQkFBTSxPQUFLLE1BQU0sRUFB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TixzQkFBWSxDQUNWOztjQUFJLEtBQUksT0FBSixFQUFKO1lBQWdCOztrQkFBTSxvQkFBa0IsR0FBbEIsRUFBTjtnQkFBZ0MsS0FBaEM7YUFBaEI7U0FEVSxFQUVWOztjQUFHLEtBQUksUUFBSixFQUFIO1lBQ0MsT0FBTyxJQUFQO2lCQUREO1lBQ2dCOzs7Z0JBQU8sd0JBQVMsU0FBVCxDQUFQO2FBRGhCO1NBRlUsQ0FBWixDQURNO0tBQVAsTUFPTTtBQUNMLHNCQUFhOztjQUFJLEtBQUksT0FBSixFQUFKO1lBQWlCLEtBQWpCO1NBQWIsQ0FESztLQVBOOztBQVdBLFFBQUcsTUFBSCxFQUNDLFNBQVEsdUNBQUssS0FBSyxNQUFMLEVBQUwsQ0FBUixDQUREOztBQUdBLFdBQ0M7OztRQUNDOzs7WUFBUyxNQUFUO1NBREQ7UUFFQzs7O1lBQ0UsV0FERjtZQUVDOzs7Z0JBQ0UsU0FBUyxJQUFULENBQWMsSUFBZCxDQURGOztnQkFDd0IsU0FBUyxJQUFULENBQWMsSUFBZCxDQUR4QjthQUZEO1NBRkQ7UUFRQzs7O1lBQ0UsT0FERjtTQVJEO0tBREQsQ0EzQjJHO0NBQXZGOztrQkEyQ04sc0JBQWMsVUFBZCxFQUF5QixFQUFDLGNBQUQsRUFBUyxnQkFBVCxFQUF6QiIsImZpbGUiOiJrbm93bGVkZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJLCBFTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge25vcm1hbGl6ZSwgYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBcHBCYXIsIFRleHRGaWVsZCwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25UaHVtYnVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3RodW1iLXVwXCJcbmltcG9ydCBJY29uU2VhcmNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NlYXJjaFwiXG5pbXBvcnQgSWNvbkJhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IHtyZWxhdGl2ZX0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IEZsb2F0aW5nQWRkIGZyb20gXCIuL2NvbXBvbmVudHMvZmxvYXRpbmctYWRkXCJcbmltcG9ydCBleHRyYWN0IGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0FDVElPTiBhcyBUQVNLX0FDVElPTn0gZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHksIGZpbGVTZWxlY3Rvcn09VUlcblxuY29uc3Qge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuY29uc3QgRE9NQUlOPVwia25vd2xlZGdlXCJcbmNvbnN0IElOSVRfU1RBVEU9e1xuXHRrbm93bGVkZ2VzOltdXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcbiAgICBGRVRDSDogcXVlcnk9PmRpc3BhdGNoPT5kYktub3dsZWRnZS5maW5kKHF1ZXJ5KVxuICAgICAgICAuZmV0Y2goa25vd2xlZGdlcz0+e1xuXHRcdFx0aWYoa25vd2xlZGdlcyAmJiBrbm93bGVkZ2VzLmxlbmd0aCl7XG5cdFx0XHRcdGxldCBkYXRhPW5vcm1hbGl6ZShrbm93bGVkZ2VzLCBhcnJheU9mKGRiS25vd2xlZGdlLnNjaGVtYSkpXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGRhdGEuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAsIHBheWxvYWQ6ZGF0YS5yZXN1bHR9KVxuXHRcdFx0fVxuICAgICAgICB9KVxuICAgICxTRUxFQ1RfRE9DWDogYT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuXHRcdC50aGVuKGZpbGU9PmV4dHJhY3QoZmlsZSkpXG4gICAgICAgIC50aGVuKGRvY3g9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9zZWxlY3RlZERvY3hgLHBheWxvYWQ6ZG9jeH0pKVxuXG4gICAgLENSRUFURTogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBkb2N4PXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZX09ZG9jeFxuXHRcdGNvbnN0IHBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cdFx0bGV0IHVwc2VydGVkPW51bGxcblx0XHRpZihwaG90b3MubGVuZ3RoKXtcblx0XHRcdGtub3dsZWRnZS5jb250ZW50PVwiXCJcblx0XHRcdHVwc2VydGVkPWRiS25vd2xlZGdlLnVwc2VydChrbm93bGVkZ2UpLnRoZW4oYT0+e1xuXHRcdFx0XHRyZXR1cm4gZG9jeC51cGxvYWQoYSkudGhlbihjb250ZW50PT57XG5cdFx0XHRcdFx0YS5waG90b3M9ZG9jeC5nZXRQaG90b3MoKVxuXHRcdFx0XHRcdGEuY29udGVudD1jb250ZW50XG5cdFx0XHRcdFx0cmV0dXJuIGRiS25vd2xlZGdlLnVwc2VydChhKVxuXHRcdFx0XHR9LCBhPT57XG5cdFx0XHRcdFx0ZGJLbm93bGVkZ2UucmVtb3ZlKGtub3dsZWRnZSlcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYSlcblx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoa25vd2xlZGdlKVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gdXBzZXJ0ZWQudGhlbihrbm93bGVkZ2U9Pntcblx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShrbm93bGVkZ2UsZGJLbm93bGVkZ2Uuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGB9KVxuXHRcdFx0cmV0dXJuIGtub3dsZWRnZVxuXHRcdH0pXG4gICAgfVxuXHQsRkVUQ0gxOiBhPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBfaWQ9c3RhdGUucm91dGluZy5wYXJhbXMuX2lkXG5cdFx0ZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkfSwga25vd2xlZGdlPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKSlcblx0fVxuXHQsVVBEQVRFOiBhPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBkb2N4PXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZTpuZXdWZXJzaW9ufT1kb2N4XG5cdFx0Y29uc3QgcGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcblx0XHRcblx0XHRjb25zdCBpZD1zdGF0ZS5yb3V0aW5nLnBhcmFtcy5faWRcblx0XHRjb25zdCBjdXJyZW50PXN0YXRlLmVudGl0aWVzW2RiS25vd2xlZGdlLnNjaGVtYS5nZXRLZXkoKV1baWRdXG5cdFx0XG5cdFx0bGV0IHVwc2VydGVkPW51bGxcblx0XHRpZihwaG90b3MubGVuZ3RoKXtcblx0XHRcdHVwc2VydGVkPWRvY3gudXBsb2FkKGN1cnJlbnQpLnRoZW4oY29udGVudD0+e1xuXHRcdFx0XHRjdXJyZW50LnBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cdFx0XHRcdGN1cnJlbnQuY29udGVudD1jb250ZW50XG5cdFx0XHRcdHJldHVybiBkYktub3dsZWRnZS51cHNlcnQoY3VycmVudClcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoT2JqZWN0LmFzc2lnbih7fSxjdXJyZW50LCBuZXdWZXJzaW9uKSlcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHVwc2VydGVkLnRoZW4oa25vd2xlZGdlPT57XG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3VwZGF0ZWRgfSlcblx0XHRcdHJldHVybiBrbm93bGVkZ2Vcblx0XHR9KVxuXHR9XG5cdCxDQU5DRUw6IGE9Pih7dHlwZTpgQEAke0RPTUFJTn0vY2FuY2VsYH0pIFxuXHQsVEFTSzogKHtfaWQsdGl0bGU6Y29udGVudCxzY29yZX0pPT5kaXNwYXRjaD0+ZGlzcGF0Y2goVEFTS19BQ1RJT04uQUREKHtfaWQsY29udGVudCxzY29yZX0pKVxuXHQsVU5UQVNLOiAoe19pZH0pPT5kaXNwYXRjaD0+ZGlzcGF0Y2goVEFTS19BQ1RJT04uUkVNT1ZFKHtfaWR9KSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUsIHt0eXBlLCBwYXlsb2FkfSk9PntcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtrbm93bGVkZ2VzOnBheWxvYWR9KVxuXHRcdFxuICAgIGNhc2UgYEBAJHtET01BSU59L3NlbGVjdGVkRG9jeGA6XG4gICAgICAgIGlmKHN0YXRlLnNlbGVjdGVkRG9jeClcbiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkRG9jeC5yZXZva2UoKVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7c2VsZWN0ZWREb2N4OnBheWxvYWR9KVxuICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vY2FuY2VsYDpcblx0XHRpZihzdGF0ZS5zZWxlY3RlZERvY3gpe1xuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXG5cdFx0XHRkZWxldGUgc3RhdGUuc2VsZWN0ZWREb2N4XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpXG5cdFx0fVxuXHRcdGJyZWFrXG5cdFxuICAgIH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjbGFzcyBLbm93bGVkZ2VzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17ZmlsdGVyOm51bGx9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeT17fX0sIGRpc3BhdGNofT10aGlzLnByb3BzXG4gICAgICAgIGRpc3BhdGNoKEFDVElPTi5GRVRDSChxdWVyeSkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeX19PXRoaXMucHJvcHNcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeTpuZXh0UXVlcnl9LCBkaXNwYXRjaH09bmV4dFxuICAgICAgICBpZihxdWVyeS50aXRsZSE9bmV4dFF1ZXJ5LlRpdGxlKVxuICAgICAgICAgICAgZGlzcGF0Y2goQUNJT04uRkVUQ0gobmV4dC5sb2NhdGlvbi5xdWVyeSkpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuICAgICAgICBjb25zdCB7a25vd2xlZGdlc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtmaWx0ZXJ9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IHJlZlNlYXJjaD1udWxsXG4gICAgICAgIGNvbnN0IHNlYXJjaD10aXRsZT0+e1xuXHRcdFx0cm91dGVyLnJlcGxhY2UoZW5jb2RlVVJJKGAva25vd2xlZGdlP3F1ZXJ5PSR7SlNPTi5zdHJpbmdpZnkoe3RpdGxlOnJlZlNlYXJjaC5nZXRWYWx1ZSgpLnRyaW0oKX0pfWApKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOm51bGx9KVx0XG5cdFx0fVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0PFBhcGVyPlxuXHRcdFx0XHRcdDxBcHBCYXJcblx0XHRcdFx0XHRcdGljb25FbGVtZW50TGVmdD17dGhpcy5nZXRMZWZ0RWxlbWVudCgpfVxuXHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRSaWdodD17PEljb25CdXR0b24gb25DbGljaz17ZT0+c2VhcmNoKCl9PjxJY29uU2VhcmNoLz48L0ljb25CdXR0b24+fVxuXHRcdFx0XHRcdFx0dGl0bGU9ezxUZXh0RmllbGQgcmVmPXthPT5yZWZTZWFyY2g9YX1cblx0XHRcdFx0XHRcdFx0aGludFRleHQ9XCLmn6Xor6JcIlxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsdmFsdWUpPT50aGlzLnNldFN0YXRlKHtmaWx0ZXI6dmFsdWV9KX1cblx0XHRcdFx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PTEzICYmIHNlYXJjaCgpfVxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9QYXBlcj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIHtrbm93bGVkZ2VzLmZpbHRlcihhPT5maWx0ZXIgPyAtMSE9YS50aXRsZS5pbmRleE9mKGZpbHRlcikgOiB0cnVlKS5tYXAoYT0+PEl0ZW0gbW9kZWw9e2F9IGtleT17YS5faWR9Lz4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0Z2V0TGVmdEVsZW1lbnQoKXtcblx0XHRyZXR1cm4gKDxzcGFuLz4pXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBDcmVhdGFibGU9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0FkZFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNFTEVDVF9ET0NYKCkpLnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoJy9rbm93bGVkZ2UvY3JlYXRlJykpfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaT17dHJ1ZX0vPlxuICAgICAgICAgICAgICAgICAgICB7c3VwZXIucmVuZGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cblx0c3RhdGljIENvdXJzZT1jbGFzcyBleHRlbmRzIEtub3dsZWRnZXN7XG5cdFx0Z2V0TGVmdEVsZW1lbnQoKXtcblx0XHRcdHJldHVybiAoPEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX0+PEljb25CYWNrLz48L0ljb25CdXR0b24+KVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthZ2UsZ2VuZGVyLGNhdGVnb3J5fT10aGlzLnByb3BzLnF1ZXJ5fHx7fVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiYWdlXCIga2V5PVwiQWdlXCIgbGFiZWw9XCJBZ2UgKFllYXIpXCIgc2luZ2xlPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXthZ2V9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiMC41LCAxLCAyLCAzLCA0LCA1LCA2LCA4LCAxMFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImdlbmRlclwiIGtleT1cIkdlbmRlclwiIGxhYmVsPVwiR2VuZGVyXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Z2VuZGVyfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIkdpcmwsQm95XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiY2F0ZWdvcnlcIiBrZXk9XCJDYXRlZ29yeVwiIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJPYnNlcnZlLCBTdHVkeSwgU3BvcnRcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImFjdGlvbnNcIiBzdHlsZT17e3BhZGRpbmc6MTAsIHRleHRBbGlnbjonY2VudGVyJ319PlxuICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gb25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0dmFyIGFnZT10aGlzLnJlZnMuYWdlLnN0YXRlLnNlbGVjdGVkLFxuXHRcdFx0XHRcdFx0XHRnZW5kZXI9QXJyYXkuZnJvbSh0aGlzLnJlZnMuZ2VuZGVyLnN0YXRlLnNlbGVjdGVkKSxcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk9QXJyYXkuZnJvbSh0aGlzLnJlZnMuY2F0ZWdvcnkuc3RhdGUuc2VsZWN0ZWQpXG5cblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub25TZWFyY2goe2FnZSxnZW5kZXIsY2F0ZWdvcnl9KVxuXHRcdFx0XHRcdH19PlNlYXJjaDwvUmFpc2VkQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PilcbiAgICAgICAgXVxuICAgIH1cbn1cblxuY2xhc3MgQ2hlY2tHcm91cCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgdmFyIHtzZWxlY3RlZCwgc2luZ2xlfT1uZXh0XG4gICAgICAgIHRoaXMuc3RhdGU9e31cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1zZWxlY3RlZDtcbiAgICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoc2VsZWN0ZWQpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoKVxuXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXJ7aXRlbXMsIGxhYmVsLCBvbkNoYW5nZSwgc2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgc2VsZWN0ZWRTdHlsZT17cGFkZGluZzo1LCBib3JkZXJSaWdodDonMXB4IHNvbGlkIGxpZ2h0Z3JheScsXG4gICAgICAgICAgICAgICAgY29sb3I6J3doaXRlJyxiYWNrZ3JvdW5kQ29sb3I6J3JlZCd9LFxuICAgICAgICAgICAgdW5zZWxlY3RlZFN0eWxlPU9iamVjdC5hc3NpZ24oe30sc2VsZWN0ZWRTdHlsZSx7Y29sb3I6J2JsYWNrJywgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCd9KTtcblxuICAgICAgICByZXR1cm4oPGRpdiBzdHlsZT17e3BhZGRpbmc6MTB9fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7ZmxvYXQ6J3JpZ2h0JyxwYWRkaW5nOic1cHggMHB4JywgYm9yZGVyOicxcHggc29saWQgbGlnaHRncmF5JywgYm9yZGVyUmlnaHQ6MH19PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGEpIT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE9YS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXthfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLm9uU2VsZWN0KGEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsoc2luZ2xlID8gc2VsZWN0ZWQ9PWEgOiBzZWxlY3RlZC5oYXMoYSkpID8gc2VsZWN0ZWRTdHlsZSA6IHVuc2VsZWN0ZWRTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2F9PC9zcGFuPilcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxuICAgIG9uU2VsZWN0KGl0ZW0sIGE9e30pe1xuICAgICAgICB2YXJ7c2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBzZWxlY3RlZD09aXRlbSA/IHVuZGVmaW5lZCA6IGl0ZW19KTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNlbGVjdGVkW3NlbGVjdGVkLmhhcyhpdGVtKSA/ICdkZWxldGUnIDogJ2FkZCddKGl0ZW0pXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDpzZWxlY3RlZH0pXG4gICAgICAgIH1cbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17c2luZ2xlOmZhbHNlfVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOntwaG90b3M9W119fT10aGlzLnByb3BzXG4gICAgICAgIHN3aXRjaChwaG90b3MubGVuZ3RoKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzBwaG90bygpXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzFwaG90bygpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fM3Bob3RvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF8wcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8wXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1bW1hcnlcIj57bW9kZWwuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBfMXBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgXzNwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzNcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMV19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzJdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9tb3JlKG1vZGVsKXtcbiAgICAgICAgdmFyIHRpbWU9cmVsYXRpdmUobW9kZWwuY3JlYXRlZEF0fHxtb2RlbC51cGRhdGVkQXQpXG5cbiAgICAgICAgdmFyIHphbj1tb2RlbC56YW5zID8gKDxkaXY+PEljb25UaHVtYnVwLz57bW9kZWwuemFuc308L2Rpdj4pIDogbnVsbFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlXCI+XG4gICAgICAgICAgICAgICAgPHRpbWU+e3RpbWV9PC90aW1lPlxuICAgICAgICAgICAgICAgIHt6YW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvbkRldGFpbCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmAva25vd2xlZGdlLyR7dGhpcy5wcm9wcy5tb2RlbC5faWR9YCxzdGF0ZTp7a25vd2xlZGdlOnRoaXMucHJvcHMubW9kZWx9fSlcbiAgICB9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5cbmV4cG9ydCBjb25zdCBDb250ZW50PSh7X2lkLCB0aXRsZSwgY29udGVudCwgc3VtbWFyeSwgY3JlYXRlZEF0LCBjYXRlZ29yeT1bXSwga2V5d29yZHM9W10sIGZpZ3VyZSwgYXV0aG9yfSk9Pntcblx0Y29udGVudD08ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOmNvbnRlbnR9fS8+XG5cblx0aWYoc3VtbWFyeSAmJiBvcGVuIT09bnVsbCl7XG5cdFx0Y29udGVudD0oXG5cdFx0XHQ8ZGV0YWlscyBvcGVuPXtvcGVufT5cblx0XHRcdFx0PHN1bW1hcnk+e3N1bW1hcnl9PC9zdW1tYXJ5PlxuXHRcdFx0XHR7Y29udGVudH1cblx0XHRcdDwvZGV0YWlscz5cblx0XHQpXG5cdH1cblxuXHRsZXQgbm90TmV3U3R1ZmY9bnVsbFxuXHRpZihfaWQpe1xuXHRcdG5vdE5ld1N0dWZmPVtcblx0XHRcdCg8aDEga2V5PVwibGluazBcIj48TGluayB0bz17YC9rbm93bGVkZ2UvJHtfaWR9YH0+e3RpdGxlfTwvTGluaz48L2gxPiksXG5cdFx0XHQoPHAga2V5PVwiYXV0aG9yXCI+XG5cdFx0XHRcdHthdXRob3IubmFtZX0gLSA8dGltZT57cmVsYXRpdmUoY3JlYXRlZEF0KX08L3RpbWU+XG5cdFx0XHQ8L3A+KVxuXHRcdF1cblx0fWVsc2Uge1xuXHRcdG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGluazFcIj57dGl0bGV9PC9oMT4pXG5cdH1cblxuXHRpZihmaWd1cmUpXG5cdFx0ZmlndXJlPSg8aW1nIHNyYz17ZmlndXJlfS8+KVxuXG5cdHJldHVybiAoXG5cdFx0PGFydGljbGU+XG5cdFx0XHQ8ZmlndXJlPntmaWd1cmV9PC9maWd1cmU+XG5cdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHR7bm90TmV3U3R1ZmZ9XG5cdFx0XHRcdDxwPlxuXHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XG5cdFx0XHRcdDwvcD5cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0PC9zZWN0aW9uPlxuXHRcdDwvYXJ0aWNsZT5cblx0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEtub3dsZWRnZXMse0FDVElPTiwgUkVEVUNFUn0pXG4iXX0=