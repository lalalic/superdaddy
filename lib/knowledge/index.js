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
                            hintText: "\u67E5\u8BE2",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5kZXguanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiZmlsZVNlbGVjdG9yIiwiRGlhbG9nQ29tbWFuZCIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJrbm93bGVkZ2VzIiwiQUNUSU9OIiwiRkVUQ0giLCJmaW5kIiwicXVlcnkiLCJmZXRjaCIsImxlbmd0aCIsImRhdGEiLCJzY2hlbWEiLCJkaXNwYXRjaCIsImVudGl0aWVzIiwidHlwZSIsInBheWxvYWQiLCJyZXN1bHQiLCJTRUxFQ1RfRE9DWCIsInNlbGVjdCIsInRoZW4iLCJmaWxlIiwiZG9jeCIsIkNSRUFURSIsImdldFN0YXRlIiwic3RhdGUiLCJ1aSIsImtub3dsZWRnZSIsInNlbGVjdGVkRG9jeCIsInBob3RvcyIsImdldFBob3RvcyIsInVwc2VydGVkIiwiY29udGVudCIsInVwc2VydCIsInVwbG9hZCIsImEiLCJyZW1vdmUiLCJyZWplY3QiLCJGRVRDSDEiLCJfaWQiLCJyb3V0aW5nIiwicGFyYW1zIiwiZmluZE9uZSIsIlVQREFURSIsIm5ld1ZlcnNpb24iLCJpZCIsImN1cnJlbnQiLCJnZXRLZXkiLCJDQU5DRUwiLCJUQVNLIiwidGl0bGUiLCJzY29yZSIsIkFERCIsIlVOVEFTSyIsIlJFTU9WRSIsIlJFRFVDRVIiLCJyZXZva2UiLCJLbm93bGVkZ2VzIiwiZmlsdGVyIiwicHJvcHMiLCJsb2NhdGlvbiIsIm5leHQiLCJuZXh0UXVlcnkiLCJUaXRsZSIsIkFDSU9OIiwicm91dGVyIiwiY29udGV4dCIsInJlZlNlYXJjaCIsInNlYXJjaCIsInJlcGxhY2UiLCJlbmNvZGVVUkkiLCJnZXRWYWx1ZSIsInRyaW0iLCJzZXRTdGF0ZSIsImdldExlZnRFbGVtZW50IiwiZSIsInZhbHVlIiwia2V5Q29kZSIsImluZGV4T2YiLCJtYXAiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJDcmVhdGFibGUiLCJDb3Vyc2UiLCJnb0JhY2siLCJTZWFyY2giLCJhZ2UiLCJnZW5kZXIiLCJjYXRlZ29yeSIsInNwbGl0IiwicGFkZGluZyIsInRleHRBbGlnbiIsInJlZnMiLCJzZWxlY3RlZCIsIm9uU2VhcmNoIiwiQ2hlY2tHcm91cCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJzaW5nbGUiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtcyIsImxhYmVsIiwib25DaGFuZ2UiLCJzZWxlY3RlZFN0eWxlIiwiYm9yZGVyUmlnaHQiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsInVuc2VsZWN0ZWRTdHlsZSIsImZsb2F0IiwiYm9yZGVyIiwib25TZWxlY3QiLCJoYXMiLCJiaW5kIiwiaXRlbSIsInVuZGVmaW5lZCIsImRlZmF1bHRQcm9wcyIsIkl0ZW0iLCJtb2RlbCIsIl8wcGhvdG8iLCJfMXBob3RvIiwiXzNwaG90byIsIm90aGVycyIsIm9uRGV0YWlsIiwic3VtbWFyeSIsIl9tb3JlIiwidGltZSIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsInphbiIsInphbnMiLCJwdXNoIiwicGF0aG5hbWUiLCJDb250ZW50Iiwia2V5d29yZHMiLCJmaWd1cmUiLCJhdXRob3IiLCJfX2h0bWwiLCJvcGVuIiwibm90TmV3U3R1ZmYiLCJuYW1lIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVPQSxVLGVBQUFBLFU7SUFBWUMsSyxlQUFBQSxLO0lBQU9DLFksZUFBQUEsWTtJQUVuQkMsYSxHQUFlSCxVLENBQWZHLGE7OztBQUVQLElBQU1DLFNBQU8sV0FBYjtBQUNBLElBQU1DLGFBQVc7QUFDaEJDLGdCQUFXO0FBREssQ0FBakI7QUFHTyxJQUFNQywwQkFBTztB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QUE7QUFBQSxjQUFJLEtBQUksT0FBUjtBQUFpQnhGO0FBQWpCLFNBQWI7QUFDQTs7QUFFRCxRQUFHb0YsTUFBSCxFQUNDQSxTQUFRLHVDQUFLLEtBQUtBLE1BQVYsR0FBUjs7QUFFRCxXQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUFTQTtBQUFULFNBREQ7QUFFQztBQUFBO0FBQUE7QUFDRUksdUJBREY7QUFFQztBQUFBO0FBQUE7QUFDRWxELHlCQUFTb0QsSUFBVCxDQUFjLElBQWQsQ0FERjtBQUFBO0FBQ3dCUCx5QkFBU08sSUFBVCxDQUFjLElBQWQ7QUFEeEI7QUFGRCxTQUZEO0FBUUM7QUFBQTtBQUFBO0FBQ0U1RztBQURGO0FBUkQsS0FERDtBQWNBLENBekNNOztrQkEyQ1Esc0JBQWN5QixVQUFkLEVBQXlCLEVBQUNwRCxjQUFELEVBQVNrRCxnQkFBVCxFQUF6QixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJLCBFTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge25vcm1hbGl6ZSwgYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBcHBCYXIsIFRleHRGaWVsZCwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25UaHVtYnVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3RodW1iLXVwXCJcbmltcG9ydCBJY29uU2VhcmNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NlYXJjaFwiXG5pbXBvcnQgSWNvbkJhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4uL2RiL2tub3dsZWRnZSdcbmltcG9ydCB7cmVsYXRpdmV9IGZyb20gJy4uL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgRmxvYXRpbmdBZGQgZnJvbSBcIi4uL2NvbXBvbmVudHMvZmxvYXRpbmctYWRkXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi4vc2VsZWN0b3JcIlxuaW1wb3J0IHtBQ1RJT04gYXMgVEFTS19BQ1RJT059IGZyb20gXCIuLi90aW1lLW1hbmFnZVwiXG5cbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2luZm8nXG5pbXBvcnQgZXh0cmFjdCBmcm9tICcuL2V4dHJhY3QnXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBFbXB0eSwgZmlsZVNlbGVjdG9yfT1VSVxuXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5jb25zdCBET01BSU49XCJrbm93bGVkZ2VcIlxuY29uc3QgSU5JVF9TVEFURT17XG5cdGtub3dsZWRnZXM6W11cbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuICAgIEZFVENIOiBxdWVyeT0+ZGlzcGF0Y2g9PmRiS25vd2xlZGdlLmZpbmQocXVlcnkpXG4gICAgICAgIC5mZXRjaChrbm93bGVkZ2VzPT57XG5cdFx0XHRpZihrbm93bGVkZ2VzICYmIGtub3dsZWRnZXMubGVuZ3RoKXtcblx0XHRcdFx0bGV0IGRhdGE9bm9ybWFsaXplKGtub3dsZWRnZXMsIGFycmF5T2YoZGJLbm93bGVkZ2Uuc2NoZW1hKSlcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZGF0YS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCwgcGF5bG9hZDpkYXRhLnJlc3VsdH0pXG5cdFx0XHR9XG4gICAgICAgIH0pXG4gICAgLFNFTEVDVF9ET0NYOiBhPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdCgpXG5cdFx0LnRoZW4oZmlsZT0+ZXh0cmFjdChmaWxlKSlcbiAgICAgICAgLnRoZW4oZG9jeD0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3NlbGVjdGVkRG9jeGAscGF5bG9hZDpkb2N4fSkpXG5cbiAgICAsQ1JFQVRFOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGRvY3g9c3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxuICAgICAgICBjb25zdCB7a25vd2xlZGdlfT1kb2N4XG5cdFx0Y29uc3QgcGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcblx0XHRsZXQgdXBzZXJ0ZWQ9bnVsbFxuXHRcdGlmKHBob3Rvcy5sZW5ndGgpe1xuXHRcdFx0a25vd2xlZGdlLmNvbnRlbnQ9XCJcIlxuXHRcdFx0dXBzZXJ0ZWQ9ZGJLbm93bGVkZ2UudXBzZXJ0KGtub3dsZWRnZSkudGhlbihhPT57XG5cdFx0XHRcdHJldHVybiBkb2N4LnVwbG9hZChhKS50aGVuKGNvbnRlbnQ9Pntcblx0XHRcdFx0XHRhLnBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cdFx0XHRcdFx0YS5jb250ZW50PWNvbnRlbnRcblx0XHRcdFx0XHRyZXR1cm4gZGJLbm93bGVkZ2UudXBzZXJ0KGEpXG5cdFx0XHRcdH0sIGE9Pntcblx0XHRcdFx0XHRkYktub3dsZWRnZS5yZW1vdmUoa25vd2xlZGdlKVxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhKVxuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdHVwc2VydGVkPWRiS25vd2xlZGdlLnVwc2VydChrbm93bGVkZ2UpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVwc2VydGVkLnRoZW4oa25vd2xlZGdlPT57XG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgfSlcblx0XHRcdHJldHVybiBrbm93bGVkZ2Vcblx0XHR9KVxuICAgIH1cblx0LEZFVENIMTogYT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgX2lkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxuXHRcdGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZH0sIGtub3dsZWRnZT0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGtub3dsZWRnZSxkYktub3dsZWRnZS5zY2hlbWEpLmVudGl0aWVzKSkpXG5cdH1cblx0LFVQREFURTogYT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgZG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2U6bmV3VmVyc2lvbn09ZG9jeFxuXHRcdGNvbnN0IHBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cblx0XHRjb25zdCBpZD1zdGF0ZS5yb3V0aW5nLnBhcmFtcy5faWRcblx0XHRjb25zdCBjdXJyZW50PXN0YXRlLmVudGl0aWVzW2RiS25vd2xlZGdlLnNjaGVtYS5nZXRLZXkoKV1baWRdXG5cblx0XHRsZXQgdXBzZXJ0ZWQ9bnVsbFxuXHRcdGlmKHBob3Rvcy5sZW5ndGgpe1xuXHRcdFx0dXBzZXJ0ZWQ9ZG9jeC51cGxvYWQoY3VycmVudCkudGhlbihjb250ZW50PT57XG5cdFx0XHRcdGN1cnJlbnQucGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcblx0XHRcdFx0Y3VycmVudC5jb250ZW50PWNvbnRlbnRcblx0XHRcdFx0cmV0dXJuIGRiS25vd2xlZGdlLnVwc2VydChjdXJyZW50KVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdHVwc2VydGVkPWRiS25vd2xlZGdlLnVwc2VydChPYmplY3QuYXNzaWduKHt9LGN1cnJlbnQsIG5ld1ZlcnNpb24pKVxuXHRcdH1cblxuXHRcdHJldHVybiB1cHNlcnRlZC50aGVuKGtub3dsZWRnZT0+e1xuXHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGtub3dsZWRnZSxkYktub3dsZWRnZS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pXG5cdFx0XHRyZXR1cm4ga25vd2xlZGdlXG5cdFx0fSlcblx0fVxuXHQsQ0FOQ0VMOiBhPT4oe3R5cGU6YEBAJHtET01BSU59L2NhbmNlbGB9KVxuXHQsVEFTSzogKHtfaWQsdGl0bGU6Y29udGVudCxzY29yZX0pPT5kaXNwYXRjaD0+ZGlzcGF0Y2goVEFTS19BQ1RJT04uQUREKHtfaWQsY29udGVudCxzY29yZX0pKVxuXHQsVU5UQVNLOiAoe19pZH0pPT5kaXNwYXRjaD0+ZGlzcGF0Y2goVEFTS19BQ1RJT04uUkVNT1ZFKHtfaWR9KSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUsIHt0eXBlLCBwYXlsb2FkfSk9PntcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtrbm93bGVkZ2VzOnBheWxvYWR9KVxuXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vc2VsZWN0ZWREb2N4YDpcbiAgICAgICAgaWYoc3RhdGUuc2VsZWN0ZWREb2N4KVxuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzZWxlY3RlZERvY3g6cGF5bG9hZH0pXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG5cdGNhc2UgYEBAJHtET01BSU59L3VwZGF0ZWRgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS9jYW5jZWxgOlxuXHRcdGlmKHN0YXRlLnNlbGVjdGVkRG9jeCl7XG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZERvY3gucmV2b2tlKClcblx0XHRcdGRlbGV0ZSBzdGF0ZS5zZWxlY3RlZERvY3hcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSlcblx0XHR9XG5cdFx0YnJlYWtcblxuICAgIH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjbGFzcyBLbm93bGVkZ2VzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17ZmlsdGVyOm51bGx9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeT17fX0sIGRpc3BhdGNofT10aGlzLnByb3BzXG4gICAgICAgIGRpc3BhdGNoKEFDVElPTi5GRVRDSChxdWVyeSkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeX19PXRoaXMucHJvcHNcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeTpuZXh0UXVlcnl9LCBkaXNwYXRjaH09bmV4dFxuICAgICAgICBpZihxdWVyeS50aXRsZSE9bmV4dFF1ZXJ5LlRpdGxlKVxuICAgICAgICAgICAgZGlzcGF0Y2goQUNJT04uRkVUQ0gobmV4dC5sb2NhdGlvbi5xdWVyeSkpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuICAgICAgICBjb25zdCB7a25vd2xlZGdlc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtmaWx0ZXJ9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IHJlZlNlYXJjaD1udWxsXG4gICAgICAgIGNvbnN0IHNlYXJjaD10aXRsZT0+e1xuXHRcdFx0cm91dGVyLnJlcGxhY2UoZW5jb2RlVVJJKGAva25vd2xlZGdlP3F1ZXJ5PSR7SlNPTi5zdHJpbmdpZnkoe3RpdGxlOnJlZlNlYXJjaC5nZXRWYWx1ZSgpLnRyaW0oKX0pfWApKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOm51bGx9KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cdFx0XHRcdDxQYXBlcj5cblx0XHRcdFx0XHQ8QXBwQmFyXG5cdFx0XHRcdFx0XHRpY29uRWxlbWVudExlZnQ9e3RoaXMuZ2V0TGVmdEVsZW1lbnQoKX1cblx0XHRcdFx0XHRcdGljb25FbGVtZW50UmlnaHQ9ezxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnNlYXJjaCgpfT48SWNvblNlYXJjaC8+PC9JY29uQnV0dG9uPn1cblx0XHRcdFx0XHRcdHRpdGxlPXs8VGV4dEZpZWxkIHJlZj17YT0+cmVmU2VhcmNoPWF9XG5cdFx0XHRcdFx0XHRcdGhpbnRUZXh0PVwi5p+l6K+iXCJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHZhbHVlKT0+dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT0xMyAmJiBzZWFyY2goKX1cblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvUGFwZXI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7a25vd2xlZGdlcy5maWx0ZXIoYT0+ZmlsdGVyID8gLTEhPWEudGl0bGUuaW5kZXhPZihmaWx0ZXIpIDogdHJ1ZSkubWFwKGE9PjxJdGVtIG1vZGVsPXthfSBrZXk9e2EuX2lkfS8+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdGdldExlZnRFbGVtZW50KCl7XG5cdFx0cmV0dXJuICg8c3Bhbi8+KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG5cbiAgICBzdGF0aWMgQ3JlYXRhYmxlPWNsYXNzIGV4dGVuZHMgS25vd2xlZGdlc3tcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICBjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdBZGRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKS50aGVuKGE9PnJvdXRlci5yZXBsYWNlKCcva25vd2xlZGdlL2NyZWF0ZScpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmk9e3RydWV9Lz5cbiAgICAgICAgICAgICAgICAgICAge3N1cGVyLnJlbmRlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxuXG5cdHN0YXRpYyBDb3Vyc2U9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuXHRcdGdldExlZnRFbGVtZW50KCl7XG5cdFx0XHRyZXR1cm4gKDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9PjxJY29uQmFjay8+PC9JY29uQnV0dG9uPilcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgU2VhcmNoIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7YWdlLGdlbmRlcixjYXRlZ29yeX09dGhpcy5wcm9wcy5xdWVyeXx8e31cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImFnZVwiIGtleT1cIkFnZVwiIGxhYmVsPVwiQWdlIChZZWFyKVwiIHNpbmdsZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17YWdlfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIjAuNSwgMSwgMiwgMywgNCwgNSwgNiwgOCwgMTBcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJnZW5kZXJcIiBrZXk9XCJHZW5kZXJcIiBsYWJlbD1cIkdlbmRlclwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2dlbmRlcn1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJHaXJsLEJveVwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImNhdGVnb3J5XCIga2V5PVwiQ2F0ZWdvcnlcIiBsYWJlbD1cIkNhdGVnb3J5XCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiT2JzZXJ2ZSwgU3R1ZHksIFNwb3J0XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPGRpdiBrZXk9XCJhY3Rpb25zXCIgc3R5bGU9e3twYWRkaW5nOjEwLCB0ZXh0QWxpZ246J2NlbnRlcid9fT5cbiAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIHByaW1hcnk9e3RydWV9IG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdHZhciBhZ2U9dGhpcy5yZWZzLmFnZS5zdGF0ZS5zZWxlY3RlZCxcblx0XHRcdFx0XHRcdFx0Z2VuZGVyPUFycmF5LmZyb20odGhpcy5yZWZzLmdlbmRlci5zdGF0ZS5zZWxlY3RlZCksXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5PUFycmF5LmZyb20odGhpcy5yZWZzLmNhdGVnb3J5LnN0YXRlLnNlbGVjdGVkKVxuXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2VhcmNoKHthZ2UsZ2VuZGVyLGNhdGVnb3J5fSlcblx0XHRcdFx0XHR9fT5TZWFyY2g8L1JhaXNlZEJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXG4gICAgICAgIF1cbiAgICB9XG59XG5cbmNsYXNzIENoZWNrR3JvdXAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHRoaXMucHJvcHMpXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG4gICAgICAgIHZhciB7c2VsZWN0ZWQsIHNpbmdsZX09bmV4dFxuICAgICAgICB0aGlzLnN0YXRlPXt9XG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9c2VsZWN0ZWQ7XG4gICAgICAgIGVsc2UgaWYoQXJyYXkuaXNBcnJheShzZWxlY3RlZCkpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KHNlbGVjdGVkKVxuICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KClcblxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFye2l0ZW1zLCBsYWJlbCwgb25DaGFuZ2UsIHNpbmdsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkU3R5bGU9e3BhZGRpbmc6NSwgYm9yZGVyUmlnaHQ6JzFweCBzb2xpZCBsaWdodGdyYXknLFxuICAgICAgICAgICAgICAgIGNvbG9yOid3aGl0ZScsYmFja2dyb3VuZENvbG9yOidyZWQnfSxcbiAgICAgICAgICAgIHVuc2VsZWN0ZWRTdHlsZT1PYmplY3QuYXNzaWduKHt9LHNlbGVjdGVkU3R5bGUse2NvbG9yOidibGFjaycsIGJhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnfSk7XG5cbiAgICAgICAgcmV0dXJuKDxkaXYgc3R5bGU9e3twYWRkaW5nOjEwfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2Zsb2F0OidyaWdodCcscGFkZGluZzonNXB4IDBweCcsIGJvcmRlcjonMXB4IHNvbGlkIGxpZ2h0Z3JheScsIGJvcmRlclJpZ2h0OjB9fT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihhKSE9J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhPWEudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdChhKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17KHNpbmdsZSA/IHNlbGVjdGVkPT1hIDogc2VsZWN0ZWQuaGFzKGEpKSA/IHNlbGVjdGVkU3R5bGUgOiB1bnNlbGVjdGVkU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthfTwvc3Bhbj4pXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+KVxuICAgIH1cbiAgICBvblNlbGVjdChpdGVtLCBhPXt9KXtcbiAgICAgICAgdmFye3NpbmdsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZTtcblxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWQ9PWl0ZW0gPyB1bmRlZmluZWQgOiBpdGVtfSk7XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzZWxlY3RlZFtzZWxlY3RlZC5oYXMoaXRlbSkgPyAnZGVsZXRlJyA6ICdhZGQnXShpdGVtKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6c2VsZWN0ZWR9KVxuICAgICAgICB9XG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e3NpbmdsZTpmYWxzZX1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDp7cGhvdG9zPVtdfX09dGhpcy5wcm9wc1xuICAgICAgICBzd2l0Y2gocGhvdG9zLmxlbmd0aCl7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8wcGhvdG8oKVxuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8xcGhvdG8oKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzNwaG90bygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfMHBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMFwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdW1tYXJ5XCI+e21vZGVsLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgXzFwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzFcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF8zcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8zXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzFdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1syXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfbW9yZShtb2RlbCl7XG4gICAgICAgIHZhciB0aW1lPXJlbGF0aXZlKG1vZGVsLmNyZWF0ZWRBdHx8bW9kZWwudXBkYXRlZEF0KVxuXG4gICAgICAgIHZhciB6YW49bW9kZWwuemFucyA/ICg8ZGl2PjxJY29uVGh1bWJ1cC8+e21vZGVsLnphbnN9PC9kaXY+KSA6IG51bGxcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lPnt0aW1lfTwvdGltZT5cbiAgICAgICAgICAgICAgICB7emFufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25EZXRhaWwoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpgL2tub3dsZWRnZS8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsc3RhdGU6e2tub3dsZWRnZTp0aGlzLnByb3BzLm1vZGVsfX0pXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cbn1cblxuXG5leHBvcnQgY29uc3QgQ29udGVudD0oe19pZCwgdGl0bGUsIGNvbnRlbnQsIHN1bW1hcnksIGNyZWF0ZWRBdCwgY2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmUsIGF1dGhvcn0pPT57XG5cdGNvbnRlbnQ9PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDpjb250ZW50fX0vPlxuXG5cdGlmKHN1bW1hcnkgJiYgb3BlbiE9PW51bGwpe1xuXHRcdGNvbnRlbnQ9KFxuXHRcdFx0PGRldGFpbHMgb3Blbj17b3Blbn0+XG5cdFx0XHRcdDxzdW1tYXJ5PntzdW1tYXJ5fTwvc3VtbWFyeT5cblx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHQ8L2RldGFpbHM+XG5cdFx0KVxuXHR9XG5cblx0bGV0IG5vdE5ld1N0dWZmPW51bGxcblx0aWYoX2lkKXtcblx0XHRub3ROZXdTdHVmZj1bXG5cdFx0XHQoPGgxIGtleT1cImxpbmswXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7X2lkfWB9Pnt0aXRsZX08L0xpbms+PC9oMT4pLFxuXHRcdFx0KDxwIGtleT1cImF1dGhvclwiPlxuXHRcdFx0XHR7YXV0aG9yLm5hbWV9IC0gPHRpbWU+e3JlbGF0aXZlKGNyZWF0ZWRBdCl9PC90aW1lPlxuXHRcdFx0PC9wPilcblx0XHRdXG5cdH1lbHNlIHtcblx0XHRub3ROZXdTdHVmZj0oPGgxIGtleT1cImxpbmsxXCI+e3RpdGxlfTwvaDE+KVxuXHR9XG5cblx0aWYoZmlndXJlKVxuXHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlPlxuXHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxuXHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0e25vdE5ld1N0dWZmfVxuXHRcdFx0XHQ8cD5cblx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuXHRcdFx0XHQ8L3A+XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHR7Y29udGVudH1cblx0XHRcdDwvc2VjdGlvbj5cblx0XHQ8L2FydGljbGU+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihLbm93bGVkZ2VzLHtBQ1RJT04sIFJFRFVDRVJ9KVxuIl19