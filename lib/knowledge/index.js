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

var _knowledge = require("../db/knowledge");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _calendar = require("../components/calendar");

var _floatingAdd = require("../components/floating-add");

var _floatingAdd2 = _interopRequireDefault(_floatingAdd);

var _selector = require("../selector");

var _timeManage = require("../time-manage");

var _info = require("./info");

var _info2 = _interopRequireDefault(_info);

var _extract = require("./extract");

var _extract2 = _interopRequireDefault(_extract);

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
                return (0, _extract2.default)(file);
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
                    return docx.upload(a).then(function (_ref) {
                        var content = _ref.content,
                            template = _ref.template;

                        a.photos = docx.getPhotos();
                        a.content = content;
                        a.template = template;
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
    TASK: function TASK(_ref2) {
        var _id = _ref2._id,
            content = _ref2.title,
            score = _ref2.score;
        return function (dispatch) {
            return dispatch(_timeManage.ACTION.ADD({ _id: _id, content: content, score: score }));
        };
    },
    UNTASK: function UNTASK(_ref3) {
        var _id = _ref3._id;
        return function (dispatch) {
            return dispatch(_timeManage.ACTION.REMOVE({ _id: _id }));
        };
    }
};

var REDUCER = exports.REDUCER = function REDUCER() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        payload = _ref4.payload;

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
        var _ref5;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Knowledges);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref5 = Knowledges.__proto__ || (0, _getPrototypeOf2.default)(Knowledges)).call.apply(_ref5, [this].concat(args))), _this), _this.state = { filter: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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

            var _ref6 = this.props.query || {},
                age = _ref6.age,
                gender = _ref6.gender,
                category = _ref6.category;

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
var Content = exports.Content = function Content(_ref7) {
    var _id = _ref7._id,
        title = _ref7.title,
        content = _ref7.content,
        summary = _ref7.summary,
        createdAt = _ref7.createdAt,
        _ref7$category = _ref7.category,
        category = _ref7$category === undefined ? [] : _ref7$category,
        _ref7$keywords = _ref7.keywords,
        keywords = _ref7$keywords === undefined ? [] : _ref7$keywords,
        figure = _ref7.figure,
        author = _ref7.author;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVPO0lBQVk7SUFBTztJQUVuQixnQkFBZSxXQUFmOzs7QUFFUCxJQUFNLFNBQU8sV0FBUDtBQUNOLElBQU0sYUFBVztBQUNoQixnQkFBVyxFQUFYO0NBREs7QUFHQyxJQUFNLDBCQUFPO0FBQ2hCLFdBQU87ZUFBTzttQkFBVSxvQkFBWSxJQUFaLENBQWlCLEtBQWpCLEVBQ25CLEtBRG1CLENBQ2Isc0JBQVk7QUFDeEIsb0JBQUcsY0FBYyxXQUFXLE1BQVgsRUFBa0I7QUFDbEMsd0JBQUksT0FBSywwQkFBVSxVQUFWLEVBQXNCLHdCQUFRLG9CQUFZLE1BQVosQ0FBOUIsQ0FBTCxDQUQ4QjtBQUVsQyw2QkFBUyx1QkFBUyxLQUFLLFFBQUwsQ0FBbEIsRUFGa0M7QUFHbEMsNkJBQVMsRUFBQyxhQUFVLG1CQUFWLEVBQTRCLFNBQVEsS0FBSyxNQUFMLEVBQTlDLEVBSGtDO2lCQUFuQzthQURZO1NBREc7S0FBUDtBQVFOLGlCQUFhO2VBQUc7bUJBQVUsYUFBYSxNQUFiLEdBQzVCLElBRDRCLENBQ3ZCO3VCQUFNLHVCQUFRLElBQVI7YUFBTixDQUR1QixDQUV0QixJQUZzQixDQUVqQjt1QkFBTSxTQUFTLEVBQUMsYUFBVSx3QkFBVixFQUFnQyxTQUFRLElBQVIsRUFBMUM7YUFBTjtTQUZPO0tBQUg7O0FBSWIsWUFBUTtlQUFHLFVBQUMsUUFBRCxFQUFVLFFBQVYsRUFBcUI7QUFDbkMsZ0JBQU0sUUFBTSxVQUFOLENBRDZCO0FBRW5DLGdCQUFNLE9BQUss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LENBRHlCO0tBQTFCOztBQVNBLFFBQUksY0FBWSxJQUFaLENBWnVHO0FBYTNHLFFBQUcsR0FBSCxFQUFPO0FBQ04sc0JBQVksQ0FDVjs7Y0FBSSxLQUFJLE9BQUosRUFBSjtZQUFnQjs7a0JBQU0sb0JBQWtCLEdBQWxCLEVBQU47Z0JBQWdDLEtBQWhDO2FBQWhCO1NBRFUsRUFFVjs7Y0FBRyxLQUFJLFFBQUosRUFBSDtZQUNDLE9BQU8sSUFBUDtpQkFERDtZQUNnQjs7O2dCQUFPLHdCQUFTLFNBQVQsQ0FBUDthQURoQjtTQUZVLENBQVosQ0FETTtLQUFQLE1BT007QUFDTCxzQkFBYTs7Y0FBSSxLQUFJLE9BQUosRUFBSjtZQUFpQixLQUFqQjtTQUFiLENBREs7S0FQTjs7QUFXQSxRQUFHLE1BQUgsRUFDQyxTQUFRLHVDQUFLLEtBQUssTUFBTCxFQUFMLENBQVIsQ0FERDs7QUFHQSxXQUNDOzs7UUFDQzs7O1lBQVMsTUFBVDtTQUREO1FBRUM7OztZQUNFLFdBREY7WUFFQzs7O2dCQUNFLFNBQVMsSUFBVCxDQUFjLElBQWQsQ0FERjs7Z0JBQ3dCLFNBQVMsSUFBVCxDQUFjLElBQWQsQ0FEeEI7YUFGRDtTQUZEO1FBUUM7OztZQUNFLE9BREY7U0FSRDtLQURELENBM0IyRztDQUF2Rjs7a0JBMkNOLHNCQUFjLFVBQWQsRUFBeUIsRUFBQyxjQUFELEVBQVMsZ0JBQVQsRUFBekIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUksIEVOVElUSUVTfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7bm9ybWFsaXplLCBhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0ljb25CdXR0b24sIEFwcEJhciwgVGV4dEZpZWxkLCBQYXBlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvblRodW1idXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdGh1bWItdXBcIlxuaW1wb3J0IEljb25TZWFyY2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2VhcmNoXCJcbmltcG9ydCBJY29uQmFjayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IHtyZWxhdGl2ZX0gZnJvbSAnLi4vY29tcG9uZW50cy9jYWxlbmRhcidcbmltcG9ydCBGbG9hdGluZ0FkZCBmcm9tIFwiLi4vY29tcG9uZW50cy9mbG9hdGluZy1hZGRcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGR9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5pbXBvcnQge0FDVElPTiBhcyBUQVNLX0FDVElPTn0gZnJvbSBcIi4uL3RpbWUtbWFuYWdlXCJcblxuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4vaW5mbydcbmltcG9ydCBleHRyYWN0IGZyb20gJy4vZXh0cmFjdCdcblxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5LCBmaWxlU2VsZWN0b3J9PVVJXG5cbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmNvbnN0IERPTUFJTj1cImtub3dsZWRnZVwiXG5jb25zdCBJTklUX1NUQVRFPXtcblx0a25vd2xlZGdlczpbXVxufVxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG4gICAgRkVUQ0g6IHF1ZXJ5PT5kaXNwYXRjaD0+ZGJLbm93bGVkZ2UuZmluZChxdWVyeSlcbiAgICAgICAgLmZldGNoKGtub3dsZWRnZXM9Pntcblx0XHRcdGlmKGtub3dsZWRnZXMgJiYga25vd2xlZGdlcy5sZW5ndGgpe1xuXHRcdFx0XHRsZXQgZGF0YT1ub3JtYWxpemUoa25vd2xlZGdlcywgYXJyYXlPZihkYktub3dsZWRnZS5zY2hlbWEpKVxuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhkYXRhLmVudGl0aWVzKSlcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLCBwYXlsb2FkOmRhdGEucmVzdWx0fSlcblx0XHRcdH1cbiAgICAgICAgfSlcbiAgICAsU0VMRUNUX0RPQ1g6IGE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0KClcblx0XHQudGhlbihmaWxlPT5leHRyYWN0KGZpbGUpKVxuICAgICAgICAudGhlbihkb2N4PT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vc2VsZWN0ZWREb2N4YCxwYXlsb2FkOmRvY3h9KSlcblxuICAgICxDUkVBVEU6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgZG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2V9PWRvY3hcblx0XHRjb25zdCBwaG90b3M9ZG9jeC5nZXRQaG90b3MoKVxuXHRcdGxldCB1cHNlcnRlZD1udWxsXG5cdFx0aWYocGhvdG9zLmxlbmd0aCl7XG5cdFx0XHRrbm93bGVkZ2UuY29udGVudD1cIlwiXG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoa25vd2xlZGdlKS50aGVuKGE9Pntcblx0XHRcdFx0cmV0dXJuIGRvY3gudXBsb2FkKGEpLnRoZW4oKHtjb250ZW50LHRlbXBsYXRlfSk9Pntcblx0XHRcdFx0XHRhLnBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cdFx0XHRcdFx0YS5jb250ZW50PWNvbnRlbnRcblx0XHRcdFx0XHRhLnRlbXBsYXRlPXRlbXBsYXRlXG5cdFx0XHRcdFx0cmV0dXJuIGRiS25vd2xlZGdlLnVwc2VydChhKVxuXHRcdFx0XHR9LCBhPT57XG5cdFx0XHRcdFx0ZGJLbm93bGVkZ2UucmVtb3ZlKGtub3dsZWRnZSlcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYSlcblx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoa25vd2xlZGdlKVxuXHRcdH1cblxuXHRcdHJldHVybiB1cHNlcnRlZC50aGVuKGtub3dsZWRnZT0+e1xuXHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGtub3dsZWRnZSxkYktub3dsZWRnZS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9jcmVhdGVkYH0pXG5cdFx0XHRyZXR1cm4ga25vd2xlZGdlXG5cdFx0fSlcbiAgICB9XG5cdCxGRVRDSDE6IGE9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IF9pZD1zdGF0ZS5yb3V0aW5nLnBhcmFtcy5faWRcblx0XHRkYktub3dsZWRnZS5maW5kT25lKHtfaWR9LCBrbm93bGVkZ2U9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShrbm93bGVkZ2UsZGJLbm93bGVkZ2Uuc2NoZW1hKS5lbnRpdGllcykpKVxuXHR9XG5cdCxVUERBVEU6IGE9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGRvY3g9c3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxuICAgICAgICBjb25zdCB7a25vd2xlZGdlOm5ld1ZlcnNpb259PWRvY3hcblx0XHRjb25zdCBwaG90b3M9ZG9jeC5nZXRQaG90b3MoKVxuXG5cdFx0Y29uc3QgaWQ9c3RhdGUucm91dGluZy5wYXJhbXMuX2lkXG5cdFx0Y29uc3QgY3VycmVudD1zdGF0ZS5lbnRpdGllc1tkYktub3dsZWRnZS5zY2hlbWEuZ2V0S2V5KCldW2lkXVxuXG5cdFx0bGV0IHVwc2VydGVkPW51bGxcblx0XHRpZihwaG90b3MubGVuZ3RoKXtcblx0XHRcdHVwc2VydGVkPWRvY3gudXBsb2FkKGN1cnJlbnQpLnRoZW4oY29udGVudD0+e1xuXHRcdFx0XHRjdXJyZW50LnBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cdFx0XHRcdGN1cnJlbnQuY29udGVudD1jb250ZW50XG5cdFx0XHRcdHJldHVybiBkYktub3dsZWRnZS51cHNlcnQoY3VycmVudClcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoT2JqZWN0LmFzc2lnbih7fSxjdXJyZW50LCBuZXdWZXJzaW9uKSlcblx0XHR9XG5cblx0XHRyZXR1cm4gdXBzZXJ0ZWQudGhlbihrbm93bGVkZ2U9Pntcblx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShrbm93bGVkZ2UsZGJLbm93bGVkZ2Uuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBkYXRlZGB9KVxuXHRcdFx0cmV0dXJuIGtub3dsZWRnZVxuXHRcdH0pXG5cdH1cblx0LENBTkNFTDogYT0+KHt0eXBlOmBAQCR7RE9NQUlOfS9jYW5jZWxgfSlcblx0LFRBU0s6ICh7X2lkLHRpdGxlOmNvbnRlbnQsc2NvcmV9KT0+ZGlzcGF0Y2g9PmRpc3BhdGNoKFRBU0tfQUNUSU9OLkFERCh7X2lkLGNvbnRlbnQsc2NvcmV9KSlcblx0LFVOVEFTSzogKHtfaWR9KT0+ZGlzcGF0Y2g9PmRpc3BhdGNoKFRBU0tfQUNUSU9OLlJFTU9WRSh7X2lkfSkpXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLCB7dHlwZSwgcGF5bG9hZH0pPT57XG4gICAgc3dpdGNoKHR5cGUpe1xuICAgIGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7a25vd2xlZGdlczpwYXlsb2FkfSlcblxuICAgIGNhc2UgYEBAJHtET01BSU59L3NlbGVjdGVkRG9jeGA6XG4gICAgICAgIGlmKHN0YXRlLnNlbGVjdGVkRG9jeClcbiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkRG9jeC5yZXZva2UoKVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7c2VsZWN0ZWREb2N4OnBheWxvYWR9KVxuICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vY2FuY2VsYDpcblx0XHRpZihzdGF0ZS5zZWxlY3RlZERvY3gpe1xuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXG5cdFx0XHRkZWxldGUgc3RhdGUuc2VsZWN0ZWREb2N4XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpXG5cdFx0fVxuXHRcdGJyZWFrXG5cbiAgICB9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgS25vd2xlZGdlcyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e2ZpbHRlcjpudWxsfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIGNvbnN0IHtsb2NhdGlvbjp7cXVlcnk9e319LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuICAgICAgICBkaXNwYXRjaChBQ1RJT04uRkVUQ0gocXVlcnkpKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG4gICAgICAgIGNvbnN0IHtsb2NhdGlvbjp7cXVlcnl9fT10aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHtsb2NhdGlvbjp7cXVlcnk6bmV4dFF1ZXJ5fSwgZGlzcGF0Y2h9PW5leHRcbiAgICAgICAgaWYocXVlcnkudGl0bGUhPW5leHRRdWVyeS5UaXRsZSlcbiAgICAgICAgICAgIGRpc3BhdGNoKEFDSU9OLkZFVENIKG5leHQubG9jYXRpb24ucXVlcnkpKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZXN9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7ZmlsdGVyfT10aGlzLnN0YXRlXG4gICAgICAgIGxldCByZWZTZWFyY2g9bnVsbFxuICAgICAgICBjb25zdCBzZWFyY2g9dGl0bGU9Pntcblx0XHRcdHJvdXRlci5yZXBsYWNlKGVuY29kZVVSSShgL2tub3dsZWRnZT9xdWVyeT0ke0pTT04uc3RyaW5naWZ5KHt0aXRsZTpyZWZTZWFyY2guZ2V0VmFsdWUoKS50cmltKCl9KX1gKSlcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2ZpbHRlcjpudWxsfSlcblx0XHR9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXHRcdFx0XHQ8UGFwZXI+XG5cdFx0XHRcdFx0PEFwcEJhclxuXHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRMZWZ0PXt0aGlzLmdldExlZnRFbGVtZW50KCl9XG5cdFx0XHRcdFx0XHRpY29uRWxlbWVudFJpZ2h0PXs8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5zZWFyY2goKX0+PEljb25TZWFyY2gvPjwvSWNvbkJ1dHRvbj59XG5cdFx0XHRcdFx0XHR0aXRsZT17PFRleHRGaWVsZCByZWY9e2E9PnJlZlNlYXJjaD1hfVxuXHRcdFx0XHRcdFx0XHRoaW50VGV4dD1cIuafpeivolwiXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSx2YWx1ZSk9PnRoaXMuc2V0U3RhdGUoe2ZpbHRlcjp2YWx1ZX0pfVxuXHRcdFx0XHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09MTMgJiYgc2VhcmNoKCl9XG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1BhcGVyPlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAge2tub3dsZWRnZXMuZmlsdGVyKGE9PmZpbHRlciA/IC0xIT1hLnRpdGxlLmluZGV4T2YoZmlsdGVyKSA6IHRydWUpLm1hcChhPT48SXRlbSBtb2RlbD17YX0ga2V5PXthLl9pZH0vPil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXHRnZXRMZWZ0RWxlbWVudCgpe1xuXHRcdHJldHVybiAoPHNwYW4vPilcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxuXG4gICAgc3RhdGljIENyZWF0YWJsZT1jbGFzcyBleHRlbmRzIEtub3dsZWRnZXN7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgY29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG4gICAgICAgICAgICBjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nQWRkXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0VMRUNUX0RPQ1goKSkudGhlbihhPT5yb3V0ZXIucmVwbGFjZSgnL2tub3dsZWRnZS9jcmVhdGUnKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pPXt0cnVlfS8+XG4gICAgICAgICAgICAgICAgICAgIHtzdXBlci5yZW5kZXIoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgQ291cnNlPWNsYXNzIGV4dGVuZHMgS25vd2xlZGdlc3tcblx0XHRnZXRMZWZ0RWxlbWVudCgpe1xuXHRcdFx0cmV0dXJuICg8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpfT48SWNvbkJhY2svPjwvSWNvbkJ1dHRvbj4pXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FnZSxnZW5kZXIsY2F0ZWdvcnl9PXRoaXMucHJvcHMucXVlcnl8fHt9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJhZ2VcIiBrZXk9XCJBZ2VcIiBsYWJlbD1cIkFnZSAoWWVhcilcIiBzaW5nbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FnZX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCIwLjUsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDEwXCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiZ2VuZGVyXCIga2V5PVwiR2VuZGVyXCIgbGFiZWw9XCJHZW5kZXJcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtnZW5kZXJ9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiR2lybCxCb3lcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJjYXRlZ29yeVwiIGtleT1cIkNhdGVnb3J5XCIgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIk9ic2VydmUsIFN0dWR5LCBTcG9ydFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxkaXYga2V5PVwiYWN0aW9uc1wiIHN0eWxlPXt7cGFkZGluZzoxMCwgdGV4dEFsaWduOidjZW50ZXInfX0+XG4gICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHR2YXIgYWdlPXRoaXMucmVmcy5hZ2Uuc3RhdGUuc2VsZWN0ZWQsXG5cdFx0XHRcdFx0XHRcdGdlbmRlcj1BcnJheS5mcm9tKHRoaXMucmVmcy5nZW5kZXIuc3RhdGUuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yeT1BcnJheS5mcm9tKHRoaXMucmVmcy5jYXRlZ29yeS5zdGF0ZS5zZWxlY3RlZClcblxuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5vblNlYXJjaCh7YWdlLGdlbmRlcixjYXRlZ29yeX0pXG5cdFx0XHRcdFx0fX0+U2VhcmNoPC9SYWlzZWRCdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICBdXG4gICAgfVxufVxuXG5jbGFzcyBDaGVja0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh0aGlzLnByb3BzKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICB2YXIge3NlbGVjdGVkLCBzaW5nbGV9PW5leHRcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPXNlbGVjdGVkO1xuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldChzZWxlY3RlZClcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldCgpXG5cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhcntpdGVtcywgbGFiZWwsIG9uQ2hhbmdlLCBzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZFN0eWxlPXtwYWRkaW5nOjUsIGJvcmRlclJpZ2h0OicxcHggc29saWQgbGlnaHRncmF5JyxcbiAgICAgICAgICAgICAgICBjb2xvcjond2hpdGUnLGJhY2tncm91bmRDb2xvcjoncmVkJ30sXG4gICAgICAgICAgICB1bnNlbGVjdGVkU3R5bGU9T2JqZWN0LmFzc2lnbih7fSxzZWxlY3RlZFN0eWxlLHtjb2xvcjonYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J30pO1xuXG4gICAgICAgIHJldHVybig8ZGl2IHN0eWxlPXt7cGFkZGluZzoxMH19PlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLHBhZGRpbmc6JzVweCAwcHgnLCBib3JkZXI6JzFweCBzb2xpZCBsaWdodGdyYXknLCBib3JkZXJSaWdodDowfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSkhPSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYT1hLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2F9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyhzaW5nbGUgPyBzZWxlY3RlZD09YSA6IHNlbGVjdGVkLmhhcyhhKSkgPyBzZWxlY3RlZFN0eWxlIDogdW5zZWxlY3RlZFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG4gICAgb25TZWxlY3QoaXRlbSwgYT17fSl7XG4gICAgICAgIHZhcntzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6IHNlbGVjdGVkPT1pdGVtID8gdW5kZWZpbmVkIDogaXRlbX0pO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc2VsZWN0ZWRbc2VsZWN0ZWQuaGFzKGl0ZW0pID8gJ2RlbGV0ZScgOiAnYWRkJ10oaXRlbSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOnNlbGVjdGVkfSlcbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtzaW5nbGU6ZmFsc2V9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6e3Bob3Rvcz1bXX19PXRoaXMucHJvcHNcbiAgICAgICAgc3dpdGNoKHBob3Rvcy5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMHBob3RvKClcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMXBob3RvKClcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8zcGhvdG8oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXzBwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzBcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VtbWFyeVwiPnttb2RlbC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIF8xcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfM3Bob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvM1wiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1sxXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMl19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX21vcmUobW9kZWwpe1xuICAgICAgICB2YXIgdGltZT1yZWxhdGl2ZShtb2RlbC5jcmVhdGVkQXR8fG1vZGVsLnVwZGF0ZWRBdClcblxuICAgICAgICB2YXIgemFuPW1vZGVsLnphbnMgPyAoPGRpdj48SWNvblRodW1idXAvPnttb2RlbC56YW5zfTwvZGl2PikgOiBudWxsXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmVcIj5cbiAgICAgICAgICAgICAgICA8dGltZT57dGltZX08L3RpbWU+XG4gICAgICAgICAgICAgICAge3phbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YC9rbm93bGVkZ2UvJHt0aGlzLnByb3BzLm1vZGVsLl9pZH1gLHN0YXRlOntrbm93bGVkZ2U6dGhpcy5wcm9wcy5tb2RlbH19KVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cblxuZXhwb3J0IGNvbnN0IENvbnRlbnQ9KHtfaWQsIHRpdGxlLCBjb250ZW50LCBzdW1tYXJ5LCBjcmVhdGVkQXQsIGNhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXSwgZmlndXJlLCBhdXRob3J9KT0+e1xuXHRjb250ZW50PTxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6Y29udGVudH19Lz5cblxuXHRpZihzdW1tYXJ5ICYmIG9wZW4hPT1udWxsKXtcblx0XHRjb250ZW50PShcblx0XHRcdDxkZXRhaWxzIG9wZW49e29wZW59PlxuXHRcdFx0XHQ8c3VtbWFyeT57c3VtbWFyeX08L3N1bW1hcnk+XG5cdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0PC9kZXRhaWxzPlxuXHRcdClcblx0fVxuXG5cdGxldCBub3ROZXdTdHVmZj1udWxsXG5cdGlmKF9pZCl7XG5cdFx0bm90TmV3U3R1ZmY9W1xuXHRcdFx0KDxoMSBrZXk9XCJsaW5rMFwiPjxMaW5rIHRvPXtgL2tub3dsZWRnZS8ke19pZH1gfT57dGl0bGV9PC9MaW5rPjwvaDE+KSxcblx0XHRcdCg8cCBrZXk9XCJhdXRob3JcIj5cblx0XHRcdFx0e2F1dGhvci5uYW1lfSAtIDx0aW1lPntyZWxhdGl2ZShjcmVhdGVkQXQpfTwvdGltZT5cblx0XHRcdDwvcD4pXG5cdFx0XVxuXHR9ZWxzZSB7XG5cdFx0bm90TmV3U3R1ZmY9KDxoMSBrZXk9XCJsaW5rMVwiPnt0aXRsZX08L2gxPilcblx0fVxuXG5cdGlmKGZpZ3VyZSlcblx0XHRmaWd1cmU9KDxpbWcgc3JjPXtmaWd1cmV9Lz4pXG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZT5cblx0XHRcdDxmaWd1cmU+e2ZpZ3VyZX08L2ZpZ3VyZT5cblx0XHRcdDxoZWFkZXI+XG5cdFx0XHRcdHtub3ROZXdTdHVmZn1cblx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0e2NhdGVnb3J5LmpvaW4oXCIsIFwiKX0ge2tleXdvcmRzLmpvaW4oXCIsIFwiKX1cblx0XHRcdFx0PC9wPlxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHQ8L3NlY3Rpb24+XG5cdFx0PC9hcnRpY2xlPlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oS25vd2xlZGdlcyx7QUNUSU9OLCBSRURVQ0VSfSlcbiJdfQ==