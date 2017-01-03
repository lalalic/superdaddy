"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Content = exports.Knowledges = exports.REDUCER = exports.ACTION = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                        return Promise.reject(a);
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
                upserted = _knowledge2.default.upsert(Object.assign({}, current, newVersion));
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
            return Object.assign({}, state, { knowledges: payload });

        case "@@" + DOMAIN + "/selectedDocx":
            if (state.selectedDocx) state.selectedDocx.revoke();
            return Object.assign({}, state, { selectedDocx: payload });
        case "@@" + DOMAIN + "/created":
        case "@@" + DOMAIN + "/updated":
        case "@@" + DOMAIN + "/cancel":
            if (state.selectedDocx) {
                state.selectedDocx.revoke();
                delete state.selectedDocx;
                return Object.assign({}, state);
            }
            break;

    }
    return state;
};

var Knowledges = exports.Knowledges = function (_Component) {
    _inherits(Knowledges, _Component);

    function Knowledges() {
        var _ref5;

        var _temp, _this, _ret;

        _classCallCheck(this, Knowledges);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref5 = Knowledges.__proto__ || Object.getPrototypeOf(Knowledges)).call.apply(_ref5, [this].concat(args))), _this), _this.state = { filter: null }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Knowledges, [{
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
                router.replace(encodeURI("/knowledge?query=" + JSON.stringify({ title: refSearch.getValue().trim() })));
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
    _inherits(_class, _Knowledges);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
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
                _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this)
            );
        }
    }]);

    return _class;
}(Knowledges);

Knowledges.Course = function (_Knowledges2) {
    _inherits(_class2, _Knowledges2);

    function _class2() {
        _classCallCheck(this, _class2);

        return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
    }

    _createClass(_class2, [{
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
    _inherits(Search, _DialogCommand);

    function Search() {
        _classCallCheck(this, Search);

        return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));
    }

    _createClass(Search, [{
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
                                gender = Array.from(_this4.refs.gender.state.selected),
                                category = Array.from(_this4.refs.category.state.selected);

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
    _inherits(CheckGroup, _Component2);

    function CheckGroup(props) {
        _classCallCheck(this, CheckGroup);

        var _this5 = _possibleConstructorReturn(this, (CheckGroup.__proto__ || Object.getPrototypeOf(CheckGroup)).call(this, props));

        _this5.componentWillReceiveProps(_this5.props);
        return _this5;
    }

    _createClass(CheckGroup, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next) {
            var selected = next.selected,
                single = next.single;

            this.state = {};
            if (single) this.state.selected = selected;else if (Array.isArray(selected)) {
                this.state.selected = new Set(selected);
            } else this.state.selected = new Set();
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
                unselectedStyle = Object.assign({}, selectedStyle, { color: 'black', backgroundColor: 'transparent' });


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
    _inherits(Item, _Component3);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
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
                others = _objectWithoutProperties(_props3, ["model"]);

            return _react2.default.createElement(
                "div",
                _extends({ className: "li inset photo0" }, others, { onClick: function onClick() {
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
                others = _objectWithoutProperties(_props4, ["model"]);

            return _react2.default.createElement(
                "div",
                _extends({ className: "li inset photo1" }, others, { onClick: function onClick() {
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
                others = _objectWithoutProperties(_props5, ["model"]);

            return _react2.default.createElement(
                "div",
                _extends({ className: "li inset photo3" }, others, { onClick: function onClick() {
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

exports.default = Object.assign(Knowledges, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5kZXguanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiZmlsZVNlbGVjdG9yIiwiRGlhbG9nQ29tbWFuZCIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJrbm93bGVkZ2VzIiwiQUNUSU9OIiwiRkVUQ0giLCJmaW5kIiwicXVlcnkiLCJmZXRjaCIsImxlbmd0aCIsImRhdGEiLCJzY2hlbWEiLCJkaXNwYXRjaCIsImVudGl0aWVzIiwidHlwZSIsInBheWxvYWQiLCJyZXN1bHQiLCJTRUxFQ1RfRE9DWCIsInNlbGVjdCIsInRoZW4iLCJmaWxlIiwiZG9jeCIsIkNSRUFURSIsImdldFN0YXRlIiwic3RhdGUiLCJ1aSIsImtub3dsZWRnZSIsInNlbGVjdGVkRG9jeCIsInBob3RvcyIsImdldFBob3RvcyIsInVwc2VydGVkIiwiY29udGVudCIsInVwc2VydCIsInVwbG9hZCIsImEiLCJ0ZW1wbGF0ZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZWplY3QiLCJGRVRDSDEiLCJfaWQiLCJyb3V0aW5nIiwicGFyYW1zIiwiZmluZE9uZSIsIlVQREFURSIsIm5ld1ZlcnNpb24iLCJpZCIsImN1cnJlbnQiLCJnZXRLZXkiLCJPYmplY3QiLCJhc3NpZ24iLCJDQU5DRUwiLCJUQVNLIiwidGl0bGUiLCJzY29yZSIsIkFERCIsIlVOVEFTSyIsIlJFTU9WRSIsIlJFRFVDRVIiLCJyZXZva2UiLCJLbm93bGVkZ2VzIiwiZmlsdGVyIiwicHJvcHMiLCJsb2NhdGlvbiIsIm5leHQiLCJuZXh0UXVlcnkiLCJUaXRsZSIsIkFDSU9OIiwicm91dGVyIiwiY29udGV4dCIsInJlZlNlYXJjaCIsInNlYXJjaCIsInJlcGxhY2UiLCJlbmNvZGVVUkkiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VmFsdWUiLCJ0cmltIiwic2V0U3RhdGUiLCJnZXRMZWZ0RWxlbWVudCIsImUiLCJ2YWx1ZSIsImtleUNvZGUiLCJpbmRleE9mIiwibWFwIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRhYmxlIiwiQ291cnNlIiwiZ29CYWNrIiwiU2VhcmNoIiwiYWdlIiwiZ2VuZGVyIiwiY2F0ZWdvcnkiLCJzcGxpdCIsInBhZGRpbmciLCJ0ZXh0QWxpZ24iLCJyZWZzIiwic2VsZWN0ZWQiLCJBcnJheSIsImZyb20iLCJvblNlYXJjaCIsIkNoZWNrR3JvdXAiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2luZ2xlIiwiaXNBcnJheSIsIlNldCIsIml0ZW1zIiwibGFiZWwiLCJvbkNoYW5nZSIsInNlbGVjdGVkU3R5bGUiLCJib3JkZXJSaWdodCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwidW5zZWxlY3RlZFN0eWxlIiwiZmxvYXQiLCJib3JkZXIiLCJvblNlbGVjdCIsImhhcyIsImJpbmQiLCJpdGVtIiwidW5kZWZpbmVkIiwiZGVmYXVsdFByb3BzIiwiSXRlbSIsIm1vZGVsIiwiXzBwaG90byIsIl8xcGhvdG8iLCJfM3Bob3RvIiwib3RoZXJzIiwib25EZXRhaWwiLCJzdW1tYXJ5IiwiX21vcmUiLCJ0aW1lIiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0IiwiemFuIiwiemFucyIsInB1c2giLCJwYXRobmFtZSIsIkNvbnRlbnQiLCJrZXl3b3JkcyIsImZpZ3VyZSIsImF1dGhvciIsIl9faHRtbCIsIm9wZW4iLCJub3ROZXdTdHVmZiIsIm5hbWUiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPQSxVLGVBQUFBLFU7SUFBWUMsSyxlQUFBQSxLO0lBQU9DLFksZUFBQUEsWTtJQUVuQkMsYSxHQUFlSCxVLENBQWZHLGE7OztBQUVQLElBQU1DLFNBQU8sV0FBYjtBQUNBLElBQU1DLGFBQVc7QUFDaEJDLGdC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QjtBQUNBLFFBQUd6RyxHQUFILEVBQU87QUFDTnlHLHNCQUFZLENBQ1Y7QUFBQTtBQUFBLGNBQUksS0FBSSxPQUFSO0FBQWdCO0FBQUE7QUFBQSxrQkFBTSxvQkFBa0J6RyxHQUF4QjtBQUFnQ2E7QUFBaEM7QUFBaEIsU0FEVSxFQUVWO0FBQUE7QUFBQSxjQUFHLEtBQUksUUFBUDtBQUNDeUYsbUJBQU9JLElBRFI7QUFBQTtBQUNnQjtBQUFBO0FBQUE7QUFBTyx3Q0FBU2IsU0FBVDtBQUFQO0FBRGhCLFNBRlUsQ0FBWjtBQU1BLEtBUEQsTUFPTTtBQUNMWSxzQkFBYTtBQUFBO0FBQUEsY0FBSSxLQUFJLE9BQVI7QUFBaUI1RjtBQUFqQixTQUFiO0FBQ0E7O0FBRUQsUUFBR3dGLE1BQUgsRUFDQ0EsU0FBUSx1Q0FBSyxLQUFLQSxNQUFWLEdBQVI7O0FBRUQsV0FDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFBU0E7QUFBVCxTQUREO0FBRUM7QUFBQTtBQUFBO0FBQ0VJLHVCQURGO0FBRUM7QUFBQTtBQUFBO0FBQ0VwRCx5QkFBU3NELElBQVQsQ0FBYyxJQUFkLENBREY7QUFBQTtBQUN3QlAseUJBQVNPLElBQVQsQ0FBYyxJQUFkO0FBRHhCO0FBRkQsU0FGRDtBQVFDO0FBQUE7QUFBQTtBQUNFcEg7QUFERjtBQVJELEtBREQ7QUFjQSxDQXpDTTs7a0JBMkNRa0IsT0FBT0MsTUFBUCxDQUFjVSxVQUFkLEVBQXlCLEVBQUN4RCxjQUFELEVBQVNzRCxnQkFBVCxFQUF6QixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUksIEVOVElUSUVTfSBmcm9tICdxaWxpLWFwcCdcclxuaW1wb3J0IHtub3JtYWxpemUsIGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5pbXBvcnQge0ljb25CdXR0b24sIEFwcEJhciwgVGV4dEZpZWxkLCBQYXBlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcblxyXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxyXG5pbXBvcnQgSWNvblRodW1idXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdGh1bWItdXBcIlxyXG5pbXBvcnQgSWNvblNlYXJjaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZWFyY2hcIlxyXG5pbXBvcnQgSWNvbkJhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcclxuXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tICcuLi9kYi9rbm93bGVkZ2UnXHJcbmltcG9ydCB7cmVsYXRpdmV9IGZyb20gJy4uL2NvbXBvbmVudHMvY2FsZW5kYXInXHJcbmltcG9ydCBGbG9hdGluZ0FkZCBmcm9tIFwiLi4vY29tcG9uZW50cy9mbG9hdGluZy1hZGRcIlxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uL3NlbGVjdG9yXCJcclxuaW1wb3J0IHtBQ1RJT04gYXMgVEFTS19BQ1RJT059IGZyb20gXCIuLi90aW1lLW1hbmFnZVwiXHJcblxyXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9pbmZvJ1xyXG5pbXBvcnQgZXh0cmFjdCBmcm9tICcuL2V4dHJhY3QnXHJcblxyXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHksIGZpbGVTZWxlY3Rvcn09VUlcclxuXHJcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXHJcblxyXG5jb25zdCBET01BSU49XCJrbm93bGVkZ2VcIlxyXG5jb25zdCBJTklUX1NUQVRFPXtcclxuXHRrbm93bGVkZ2VzOltdXHJcbn1cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcbiAgICBGRVRDSDogcXVlcnk9PmRpc3BhdGNoPT5kYktub3dsZWRnZS5maW5kKHF1ZXJ5KVxyXG4gICAgICAgIC5mZXRjaChrbm93bGVkZ2VzPT57XHJcblx0XHRcdGlmKGtub3dsZWRnZXMgJiYga25vd2xlZGdlcy5sZW5ndGgpe1xyXG5cdFx0XHRcdGxldCBkYXRhPW5vcm1hbGl6ZShrbm93bGVkZ2VzLCBhcnJheU9mKGRiS25vd2xlZGdlLnNjaGVtYSkpXHJcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZGF0YS5lbnRpdGllcykpXHJcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLCBwYXlsb2FkOmRhdGEucmVzdWx0fSlcclxuXHRcdFx0fVxyXG4gICAgICAgIH0pXHJcbiAgICAsU0VMRUNUX0RPQ1g6IGE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0KClcclxuXHRcdC50aGVuKGZpbGU9PmV4dHJhY3QoZmlsZSkpXHJcbiAgICAgICAgLnRoZW4oZG9jeD0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3NlbGVjdGVkRG9jeGAscGF5bG9hZDpkb2N4fSkpXHJcblxyXG4gICAgLENSRUFURTogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3QgZG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XHJcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZX09ZG9jeFxyXG5cdFx0Y29uc3QgcGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcclxuXHRcdGxldCB1cHNlcnRlZD1udWxsXHJcblx0XHRpZihwaG90b3MubGVuZ3RoKXtcclxuXHRcdFx0a25vd2xlZGdlLmNvbnRlbnQ9XCJcIlxyXG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoa25vd2xlZGdlKS50aGVuKGE9PntcclxuXHRcdFx0XHRyZXR1cm4gZG9jeC51cGxvYWQoYSkudGhlbigoe2NvbnRlbnQsdGVtcGxhdGV9KT0+e1xyXG5cdFx0XHRcdFx0YS5waG90b3M9ZG9jeC5nZXRQaG90b3MoKVxyXG5cdFx0XHRcdFx0YS5jb250ZW50PWNvbnRlbnRcclxuXHRcdFx0XHRcdGEudGVtcGxhdGU9dGVtcGxhdGVcclxuXHRcdFx0XHRcdHJldHVybiBkYktub3dsZWRnZS51cHNlcnQoYSlcclxuXHRcdFx0XHR9LCBhPT57XHJcblx0XHRcdFx0XHRkYktub3dsZWRnZS5yZW1vdmUoa25vd2xlZGdlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGEpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoa25vd2xlZGdlKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cHNlcnRlZC50aGVuKGtub3dsZWRnZT0+e1xyXG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKVxyXG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGB9KVxyXG5cdFx0XHRyZXR1cm4ga25vd2xlZGdlXHJcblx0XHR9KVxyXG4gICAgfVxyXG5cdCxGRVRDSDE6IGE9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXHJcblx0XHRjb25zdCBfaWQ9c3RhdGUucm91dGluZy5wYXJhbXMuX2lkXHJcblx0XHRkYktub3dsZWRnZS5maW5kT25lKHtfaWR9LCBrbm93bGVkZ2U9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShrbm93bGVkZ2UsZGJLbm93bGVkZ2Uuc2NoZW1hKS5lbnRpdGllcykpKVxyXG5cdH1cclxuXHQsVVBEQVRFOiBhPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3QgZG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XHJcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZTpuZXdWZXJzaW9ufT1kb2N4XHJcblx0XHRjb25zdCBwaG90b3M9ZG9jeC5nZXRQaG90b3MoKVxyXG5cclxuXHRcdGNvbnN0IGlkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxyXG5cdFx0Y29uc3QgY3VycmVudD1zdGF0ZS5lbnRpdGllc1tkYktub3dsZWRnZS5zY2hlbWEuZ2V0S2V5KCldW2lkXVxyXG5cclxuXHRcdGxldCB1cHNlcnRlZD1udWxsXHJcblx0XHRpZihwaG90b3MubGVuZ3RoKXtcclxuXHRcdFx0dXBzZXJ0ZWQ9ZG9jeC51cGxvYWQoY3VycmVudCkudGhlbihjb250ZW50PT57XHJcblx0XHRcdFx0Y3VycmVudC5waG90b3M9ZG9jeC5nZXRQaG90b3MoKVxyXG5cdFx0XHRcdGN1cnJlbnQuY29udGVudD1jb250ZW50XHJcblx0XHRcdFx0cmV0dXJuIGRiS25vd2xlZGdlLnVwc2VydChjdXJyZW50KVxyXG5cdFx0XHR9KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHVwc2VydGVkPWRiS25vd2xlZGdlLnVwc2VydChPYmplY3QuYXNzaWduKHt9LGN1cnJlbnQsIG5ld1ZlcnNpb24pKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cHNlcnRlZC50aGVuKGtub3dsZWRnZT0+e1xyXG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKVxyXG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBkYXRlZGB9KVxyXG5cdFx0XHRyZXR1cm4ga25vd2xlZGdlXHJcblx0XHR9KVxyXG5cdH1cclxuXHQsQ0FOQ0VMOiBhPT4oe3R5cGU6YEBAJHtET01BSU59L2NhbmNlbGB9KVxyXG5cdCxUQVNLOiAoe19pZCx0aXRsZTpjb250ZW50LHNjb3JlfSk9PmRpc3BhdGNoPT5kaXNwYXRjaChUQVNLX0FDVElPTi5BREQoe19pZCxjb250ZW50LHNjb3JlfSkpXHJcblx0LFVOVEFTSzogKHtfaWR9KT0+ZGlzcGF0Y2g9PmRpc3BhdGNoKFRBU0tfQUNUSU9OLlJFTU9WRSh7X2lkfSkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLCB7dHlwZSwgcGF5bG9hZH0pPT57XHJcbiAgICBzd2l0Y2godHlwZSl7XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7a25vd2xlZGdlczpwYXlsb2FkfSlcclxuXHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9zZWxlY3RlZERvY3hgOlxyXG4gICAgICAgIGlmKHN0YXRlLnNlbGVjdGVkRG9jeClcclxuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3NlbGVjdGVkRG9jeDpwYXlsb2FkfSlcclxuICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxyXG5cdGNhc2UgYEBAJHtET01BSU59L3VwZGF0ZWRgOlxyXG5cdGNhc2UgYEBAJHtET01BSU59L2NhbmNlbGA6XHJcblx0XHRpZihzdGF0ZS5zZWxlY3RlZERvY3gpe1xyXG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZERvY3gucmV2b2tlKClcclxuXHRcdFx0ZGVsZXRlIHN0YXRlLnNlbGVjdGVkRG9jeFxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpXHJcblx0XHR9XHJcblx0XHRicmVha1xyXG5cclxuICAgIH1cclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtub3dsZWRnZXMgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e2ZpbHRlcjpudWxsfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5PXt9fSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuICAgICAgICBkaXNwYXRjaChBQ1RJT04uRkVUQ0gocXVlcnkpKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XHJcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeX19PXRoaXMucHJvcHNcclxuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5Om5leHRRdWVyeX0sIGRpc3BhdGNofT1uZXh0XHJcbiAgICAgICAgaWYocXVlcnkudGl0bGUhPW5leHRRdWVyeS5UaXRsZSlcclxuICAgICAgICAgICAgZGlzcGF0Y2goQUNJT04uRkVUQ0gobmV4dC5sb2NhdGlvbi5xdWVyeSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZXN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtmaWx0ZXJ9PXRoaXMuc3RhdGVcclxuICAgICAgICBsZXQgcmVmU2VhcmNoPW51bGxcclxuICAgICAgICBjb25zdCBzZWFyY2g9dGl0bGU9PntcclxuXHRcdFx0cm91dGVyLnJlcGxhY2UoZW5jb2RlVVJJKGAva25vd2xlZGdlP3F1ZXJ5PSR7SlNPTi5zdHJpbmdpZnkoe3RpdGxlOnJlZlNlYXJjaC5nZXRWYWx1ZSgpLnRyaW0oKX0pfWApKVxyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtmaWx0ZXI6bnVsbH0pXHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuXHRcdFx0XHQ8UGFwZXI+XHJcblx0XHRcdFx0XHQ8QXBwQmFyXHJcblx0XHRcdFx0XHRcdGljb25FbGVtZW50TGVmdD17dGhpcy5nZXRMZWZ0RWxlbWVudCgpfVxyXG5cdFx0XHRcdFx0XHRpY29uRWxlbWVudFJpZ2h0PXs8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5zZWFyY2goKX0+PEljb25TZWFyY2gvPjwvSWNvbkJ1dHRvbj59XHJcblx0XHRcdFx0XHRcdHRpdGxlPXs8VGV4dEZpZWxkIHJlZj17YT0+cmVmU2VhcmNoPWF9XHJcblx0XHRcdFx0XHRcdFx0aGludFRleHQ9XCLmn6Xor6JcIlxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSx2YWx1ZSk9PnRoaXMuc2V0U3RhdGUoe2ZpbHRlcjp2YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT0xMyAmJiBzZWFyY2goKX1cclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PC9QYXBlcj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtrbm93bGVkZ2VzLmZpbHRlcihhPT5maWx0ZXIgPyAtMSE9YS50aXRsZS5pbmRleE9mKGZpbHRlcikgOiB0cnVlKS5tYXAoYT0+PEl0ZW0gbW9kZWw9e2F9IGtleT17YS5faWR9Lz4pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblx0Z2V0TGVmdEVsZW1lbnQoKXtcclxuXHRcdHJldHVybiAoPHNwYW4vPilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG5cclxuICAgIHN0YXRpYyBDcmVhdGFibGU9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xyXG4gICAgICAgIHJlbmRlcigpe1xyXG4gICAgICAgICAgICBjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuICAgICAgICAgICAgY29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0FkZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0VMRUNUX0RPQ1goKSkudGhlbihhPT5yb3V0ZXIucmVwbGFjZSgnL2tub3dsZWRnZS9jcmVhdGUnKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmk9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICB7c3VwZXIucmVuZGVyKCl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0c3RhdGljIENvdXJzZT1jbGFzcyBleHRlbmRzIEtub3dsZWRnZXN7XHJcblx0XHRnZXRMZWZ0RWxlbWVudCgpe1xyXG5cdFx0XHRyZXR1cm4gKDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9PjxJY29uQmFjay8+PC9JY29uQnV0dG9uPilcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNlYXJjaCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XHJcbiAgICByZW5kZXJDb250ZW50KCl7XHJcbiAgICAgICAgdmFyIHthZ2UsZ2VuZGVyLGNhdGVnb3J5fT10aGlzLnByb3BzLnF1ZXJ5fHx7fVxyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiYWdlXCIga2V5PVwiQWdlXCIgbGFiZWw9XCJBZ2UgKFllYXIpXCIgc2luZ2xlPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FnZX1cclxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIjAuNSwgMSwgMiwgMywgNCwgNSwgNiwgOCwgMTBcIi5zcGxpdCgnLCcpfS8+KSxcclxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImdlbmRlclwiIGtleT1cIkdlbmRlclwiIGxhYmVsPVwiR2VuZGVyXCJcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtnZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICBpdGVtcz17XCJHaXJsLEJveVwiLnNwbGl0KCcsJyl9Lz4pLFxyXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiY2F0ZWdvcnlcIiBrZXk9XCJDYXRlZ29yeVwiIGxhYmVsPVwiQ2F0ZWdvcnlcIlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5fVxyXG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiT2JzZXJ2ZSwgU3R1ZHksIFNwb3J0XCIuc3BsaXQoJywnKX0vPiksXHJcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImFjdGlvbnNcIiBzdHlsZT17e3BhZGRpbmc6MTAsIHRleHRBbGlnbjonY2VudGVyJ319PlxyXG4gICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBvbkNsaWNrPXtlPT57XHJcblx0XHRcdFx0XHRcdHZhciBhZ2U9dGhpcy5yZWZzLmFnZS5zdGF0ZS5zZWxlY3RlZCxcclxuXHRcdFx0XHRcdFx0XHRnZW5kZXI9QXJyYXkuZnJvbSh0aGlzLnJlZnMuZ2VuZGVyLnN0YXRlLnNlbGVjdGVkKSxcclxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yeT1BcnJheS5mcm9tKHRoaXMucmVmcy5jYXRlZ29yeS5zdGF0ZS5zZWxlY3RlZClcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub25TZWFyY2goe2FnZSxnZW5kZXIsY2F0ZWdvcnl9KVxyXG5cdFx0XHRcdFx0fX0+U2VhcmNoPC9SYWlzZWRCdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDaGVja0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh0aGlzLnByb3BzKVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcclxuICAgICAgICB2YXIge3NlbGVjdGVkLCBzaW5nbGV9PW5leHRcclxuICAgICAgICB0aGlzLnN0YXRlPXt9XHJcbiAgICAgICAgaWYoc2luZ2xlKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPXNlbGVjdGVkO1xyXG4gICAgICAgIGVsc2UgaWYoQXJyYXkuaXNBcnJheShzZWxlY3RlZCkpe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoc2VsZWN0ZWQpXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KClcclxuXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXJ7aXRlbXMsIGxhYmVsLCBvbkNoYW5nZSwgc2luZ2xlfT10aGlzLnByb3BzLFxyXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkU3R5bGU9e3BhZGRpbmc6NSwgYm9yZGVyUmlnaHQ6JzFweCBzb2xpZCBsaWdodGdyYXknLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6J3doaXRlJyxiYWNrZ3JvdW5kQ29sb3I6J3JlZCd9LFxyXG4gICAgICAgICAgICB1bnNlbGVjdGVkU3R5bGU9T2JqZWN0LmFzc2lnbih7fSxzZWxlY3RlZFN0eWxlLHtjb2xvcjonYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J30pO1xyXG5cclxuICAgICAgICByZXR1cm4oPGRpdiBzdHlsZT17e3BhZGRpbmc6MTB9fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2Zsb2F0OidyaWdodCcscGFkZGluZzonNXB4IDBweCcsIGJvcmRlcjonMXB4IHNvbGlkIGxpZ2h0Z3JheScsIGJvcmRlclJpZ2h0OjB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKGZ1bmN0aW9uKGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSkhPSdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGE9YS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLm9uU2VsZWN0KGEpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyhzaW5nbGUgPyBzZWxlY3RlZD09YSA6IHNlbGVjdGVkLmhhcyhhKSkgPyBzZWxlY3RlZFN0eWxlIDogdW5zZWxlY3RlZFN0eWxlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthfTwvc3Bhbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+KVxyXG4gICAgfVxyXG4gICAgb25TZWxlY3QoaXRlbSwgYT17fSl7XHJcbiAgICAgICAgdmFye3NpbmdsZX09dGhpcy5wcm9wcyxcclxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICBpZihzaW5nbGUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBzZWxlY3RlZD09aXRlbSA/IHVuZGVmaW5lZCA6IGl0ZW19KTtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBzZWxlY3RlZFtzZWxlY3RlZC5oYXMoaXRlbSkgPyAnZGVsZXRlJyA6ICdhZGQnXShpdGVtKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDpzZWxlY3RlZH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtzaW5nbGU6ZmFsc2V9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIge21vZGVsOntwaG90b3M9W119fT10aGlzLnByb3BzXHJcbiAgICAgICAgc3dpdGNoKHBob3Rvcy5sZW5ndGgpe1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzBwaG90bygpXHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzFwaG90bygpXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzNwaG90bygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF8wcGhvdG8oKXtcclxuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8wXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdW1tYXJ5XCI+e21vZGVsLnN1bW1hcnl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIF8xcGhvdG8oKXtcclxuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgXzNwaG90bygpe1xyXG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzNcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1sxXX0vPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1syXX0vPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIF9tb3JlKG1vZGVsKXtcclxuICAgICAgICB2YXIgdGltZT1yZWxhdGl2ZShtb2RlbC5jcmVhdGVkQXR8fG1vZGVsLnVwZGF0ZWRBdClcclxuXHJcbiAgICAgICAgdmFyIHphbj1tb2RlbC56YW5zID8gKDxkaXY+PEljb25UaHVtYnVwLz57bW9kZWwuemFuc308L2Rpdj4pIDogbnVsbFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZVwiPlxyXG4gICAgICAgICAgICAgICAgPHRpbWU+e3RpbWV9PC90aW1lPlxyXG4gICAgICAgICAgICAgICAge3phbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgb25EZXRhaWwoKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmAva25vd2xlZGdlLyR7dGhpcy5wcm9wcy5tb2RlbC5faWR9YCxzdGF0ZTp7a25vd2xlZGdlOnRoaXMucHJvcHMubW9kZWx9fSlcclxuICAgIH1cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBDb250ZW50PSh7X2lkLCB0aXRsZSwgY29udGVudCwgc3VtbWFyeSwgY3JlYXRlZEF0LCBjYXRlZ29yeT1bXSwga2V5d29yZHM9W10sIGZpZ3VyZSwgYXV0aG9yfSk9PntcclxuXHRjb250ZW50PTxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6Y29udGVudH19Lz5cclxuXHJcblx0aWYoc3VtbWFyeSAmJiBvcGVuIT09bnVsbCl7XHJcblx0XHRjb250ZW50PShcclxuXHRcdFx0PGRldGFpbHMgb3Blbj17b3Blbn0+XHJcblx0XHRcdFx0PHN1bW1hcnk+e3N1bW1hcnl9PC9zdW1tYXJ5PlxyXG5cdFx0XHRcdHtjb250ZW50fVxyXG5cdFx0XHQ8L2RldGFpbHM+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRsZXQgbm90TmV3U3R1ZmY9bnVsbFxyXG5cdGlmKF9pZCl7XHJcblx0XHRub3ROZXdTdHVmZj1bXHJcblx0XHRcdCg8aDEga2V5PVwibGluazBcIj48TGluayB0bz17YC9rbm93bGVkZ2UvJHtfaWR9YH0+e3RpdGxlfTwvTGluaz48L2gxPiksXHJcblx0XHRcdCg8cCBrZXk9XCJhdXRob3JcIj5cclxuXHRcdFx0XHR7YXV0aG9yLm5hbWV9IC0gPHRpbWU+e3JlbGF0aXZlKGNyZWF0ZWRBdCl9PC90aW1lPlxyXG5cdFx0XHQ8L3A+KVxyXG5cdFx0XVxyXG5cdH1lbHNlIHtcclxuXHRcdG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGluazFcIj57dGl0bGV9PC9oMT4pXHJcblx0fVxyXG5cclxuXHRpZihmaWd1cmUpXHJcblx0XHRmaWd1cmU9KDxpbWcgc3JjPXtmaWd1cmV9Lz4pXHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8YXJ0aWNsZT5cclxuXHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxyXG5cdFx0XHQ8aGVhZGVyPlxyXG5cdFx0XHRcdHtub3ROZXdTdHVmZn1cclxuXHRcdFx0XHQ8cD5cclxuXHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XHJcblx0XHRcdFx0PC9wPlxyXG5cdFx0XHQ8L2hlYWRlcj5cclxuXHRcdFx0PHNlY3Rpb24+XHJcblx0XHRcdFx0e2NvbnRlbnR9XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvYXJ0aWNsZT5cclxuXHQpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oS25vd2xlZGdlcyx7QUNUSU9OLCBSRURVQ0VSfSlcclxuIl19