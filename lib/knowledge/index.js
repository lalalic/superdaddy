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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5kZXguanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiZmlsZVNlbGVjdG9yIiwiRGlhbG9nQ29tbWFuZCIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJrbm93bGVkZ2VzIiwiQUNUSU9OIiwiRkVUQ0giLCJmaW5kIiwicXVlcnkiLCJmZXRjaCIsImxlbmd0aCIsImRhdGEiLCJzY2hlbWEiLCJkaXNwYXRjaCIsImVudGl0aWVzIiwidHlwZSIsInBheWxvYWQiLCJyZXN1bHQiLCJTRUxFQ1RfRE9DWCIsInNlbGVjdCIsInRoZW4iLCJmaWxlIiwiZG9jeCIsIkNSRUFURSIsImdldFN0YXRlIiwic3RhdGUiLCJ1aSIsImtub3dsZWRnZSIsInNlbGVjdGVkRG9jeCIsInBob3RvcyIsImdldFBob3RvcyIsInVwc2VydGVkIiwiY29udGVudCIsInVwc2VydCIsInVwbG9hZCIsImEiLCJ0ZW1wbGF0ZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZWplY3QiLCJGRVRDSDEiLCJfaWQiLCJyb3V0aW5nIiwicGFyYW1zIiwiZmluZE9uZSIsIlVQREFURSIsIm5ld1ZlcnNpb24iLCJpZCIsImN1cnJlbnQiLCJnZXRLZXkiLCJPYmplY3QiLCJhc3NpZ24iLCJDQU5DRUwiLCJUQVNLIiwidGl0bGUiLCJzY29yZSIsIkFERCIsIlVOVEFTSyIsIlJFTU9WRSIsIlJFRFVDRVIiLCJyZXZva2UiLCJLbm93bGVkZ2VzIiwiZmlsdGVyIiwicHJvcHMiLCJsb2NhdGlvbiIsIm5leHQiLCJuZXh0UXVlcnkiLCJUaXRsZSIsIkFDSU9OIiwicm91dGVyIiwiY29udGV4dCIsInJlZlNlYXJjaCIsInNlYXJjaCIsInJlcGxhY2UiLCJlbmNvZGVVUkkiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VmFsdWUiLCJ0cmltIiwic2V0U3RhdGUiLCJnZXRMZWZ0RWxlbWVudCIsImUiLCJ2YWx1ZSIsImtleUNvZGUiLCJpbmRleE9mIiwibWFwIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRhYmxlIiwiQ291cnNlIiwiZ29CYWNrIiwiU2VhcmNoIiwiYWdlIiwiZ2VuZGVyIiwiY2F0ZWdvcnkiLCJzcGxpdCIsInBhZGRpbmciLCJ0ZXh0QWxpZ24iLCJyZWZzIiwic2VsZWN0ZWQiLCJBcnJheSIsImZyb20iLCJvblNlYXJjaCIsIkNoZWNrR3JvdXAiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2luZ2xlIiwiaXNBcnJheSIsIlNldCIsIml0ZW1zIiwibGFiZWwiLCJvbkNoYW5nZSIsInNlbGVjdGVkU3R5bGUiLCJib3JkZXJSaWdodCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwidW5zZWxlY3RlZFN0eWxlIiwiZmxvYXQiLCJib3JkZXIiLCJvblNlbGVjdCIsImhhcyIsImJpbmQiLCJpdGVtIiwidW5kZWZpbmVkIiwiZGVmYXVsdFByb3BzIiwiSXRlbSIsIm1vZGVsIiwiXzBwaG90byIsIl8xcGhvdG8iLCJfM3Bob3RvIiwib3RoZXJzIiwib25EZXRhaWwiLCJzdW1tYXJ5IiwiX21vcmUiLCJ0aW1lIiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0IiwiemFuIiwiemFucyIsInB1c2giLCJwYXRobmFtZSIsIkNvbnRlbnQiLCJrZXl3b3JkcyIsImZpZ3VyZSIsImF1dGhvciIsIl9faHRtbCIsIm9wZW4iLCJub3ROZXdTdHVmZiIsIm5hbWUiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPQSxVLGVBQUFBLFU7SUFBWUMsSyxlQUFBQSxLO0lBQU9DLFksZUFBQUEsWTtJQUVuQkMsYSxHQUFlSCxVLENBQWZHLGE7OztBQUVQLElBQU1DLFNBQU8sV0FBYjtBQUNBLElBQU1DLGFBQVc7QUFDaEJDLGdC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QjtBQUNBLFFBQUd6RyxHQUFILEVBQU87QUFDTnlHLHNCQUFZLENBQ1Y7QUFBQTtBQUFBLGNBQUksS0FBSSxPQUFSO0FBQWdCO0FBQUE7QUFBQSxrQkFBTSxvQkFBa0J6RyxHQUF4QjtBQUFnQ2E7QUFBaEM7QUFBaEIsU0FEVSxFQUVWO0FBQUE7QUFBQSxjQUFHLEtBQUksUUFBUDtBQUNDeUYsbUJBQU9JLElBRFI7QUFBQTtBQUNnQjtBQUFBO0FBQUE7QUFBTyx3Q0FBU2IsU0FBVDtBQUFQO0FBRGhCLFNBRlUsQ0FBWjtBQU1BLEtBUEQsTUFPTTtBQUNMWSxzQkFBYTtBQUFBO0FBQUEsY0FBSSxLQUFJLE9BQVI7QUFBaUI1RjtBQUFqQixTQUFiO0FBQ0E7O0FBRUQsUUFBR3dGLE1BQUgsRUFDQ0EsU0FBUSx1Q0FBSyxLQUFLQSxNQUFWLEdBQVI7O0FBRUQsV0FDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFBU0E7QUFBVCxTQUREO0FBRUM7QUFBQTtBQUFBO0FBQ0VJLHVCQURGO0FBRUM7QUFBQTtBQUFBO0FBQ0VwRCx5QkFBU3NELElBQVQsQ0FBYyxJQUFkLENBREY7QUFBQTtBQUN3QlAseUJBQVNPLElBQVQsQ0FBYyxJQUFkO0FBRHhCO0FBRkQsU0FGRDtBQVFDO0FBQUE7QUFBQTtBQUNFcEg7QUFERjtBQVJELEtBREQ7QUFjQSxDQXpDTTs7a0JBMkNRa0IsT0FBT0MsTUFBUCxDQUFjVSxVQUFkLEVBQXlCLEVBQUN4RCxjQUFELEVBQVNzRCxnQkFBVCxFQUF6QixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJLCBFTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge25vcm1hbGl6ZSwgYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBcHBCYXIsIFRleHRGaWVsZCwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25UaHVtYnVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3RodW1iLXVwXCJcbmltcG9ydCBJY29uU2VhcmNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NlYXJjaFwiXG5pbXBvcnQgSWNvbkJhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4uL2RiL2tub3dsZWRnZSdcbmltcG9ydCB7cmVsYXRpdmV9IGZyb20gJy4uL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgRmxvYXRpbmdBZGQgZnJvbSBcIi4uL2NvbXBvbmVudHMvZmxvYXRpbmctYWRkXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi4vc2VsZWN0b3JcIlxuaW1wb3J0IHtBQ1RJT04gYXMgVEFTS19BQ1RJT059IGZyb20gXCIuLi90aW1lLW1hbmFnZVwiXG5cbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2luZm8nXG5pbXBvcnQgZXh0cmFjdCBmcm9tICcuL2V4dHJhY3QnXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBFbXB0eSwgZmlsZVNlbGVjdG9yfT1VSVxuXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5jb25zdCBET01BSU49XCJrbm93bGVkZ2VcIlxuY29uc3QgSU5JVF9TVEFURT17XG5cdGtub3dsZWRnZXM6W11cbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuICAgIEZFVENIOiBxdWVyeT0+ZGlzcGF0Y2g9PmRiS25vd2xlZGdlLmZpbmQocXVlcnkpXG4gICAgICAgIC5mZXRjaChrbm93bGVkZ2VzPT57XG5cdFx0XHRpZihrbm93bGVkZ2VzICYmIGtub3dsZWRnZXMubGVuZ3RoKXtcblx0XHRcdFx0bGV0IGRhdGE9bm9ybWFsaXplKGtub3dsZWRnZXMsIGFycmF5T2YoZGJLbm93bGVkZ2Uuc2NoZW1hKSlcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZGF0YS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCwgcGF5bG9hZDpkYXRhLnJlc3VsdH0pXG5cdFx0XHR9XG4gICAgICAgIH0pXG4gICAgLFNFTEVDVF9ET0NYOiBhPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdCgpXG5cdFx0LnRoZW4oZmlsZT0+ZXh0cmFjdChmaWxlKSlcbiAgICAgICAgLnRoZW4oZG9jeD0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3NlbGVjdGVkRG9jeGAscGF5bG9hZDpkb2N4fSkpXG5cbiAgICAsQ1JFQVRFOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGRvY3g9c3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxuICAgICAgICBjb25zdCB7a25vd2xlZGdlfT1kb2N4XG5cdFx0Y29uc3QgcGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcblx0XHRsZXQgdXBzZXJ0ZWQ9bnVsbFxuXHRcdGlmKHBob3Rvcy5sZW5ndGgpe1xuXHRcdFx0a25vd2xlZGdlLmNvbnRlbnQ9XCJcIlxuXHRcdFx0dXBzZXJ0ZWQ9ZGJLbm93bGVkZ2UudXBzZXJ0KGtub3dsZWRnZSkudGhlbihhPT57XG5cdFx0XHRcdHJldHVybiBkb2N4LnVwbG9hZChhKS50aGVuKCh7Y29udGVudCx0ZW1wbGF0ZX0pPT57XG5cdFx0XHRcdFx0YS5waG90b3M9ZG9jeC5nZXRQaG90b3MoKVxuXHRcdFx0XHRcdGEuY29udGVudD1jb250ZW50XG5cdFx0XHRcdFx0YS50ZW1wbGF0ZT10ZW1wbGF0ZVxuXHRcdFx0XHRcdHJldHVybiBkYktub3dsZWRnZS51cHNlcnQoYSlcblx0XHRcdFx0fSwgYT0+e1xuXHRcdFx0XHRcdGRiS25vd2xlZGdlLnJlbW92ZShrbm93bGVkZ2UpXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGEpXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH1lbHNle1xuXHRcdFx0dXBzZXJ0ZWQ9ZGJLbm93bGVkZ2UudXBzZXJ0KGtub3dsZWRnZSlcblx0XHR9XG5cblx0XHRyZXR1cm4gdXBzZXJ0ZWQudGhlbihrbm93bGVkZ2U9Pntcblx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShrbm93bGVkZ2UsZGJLbm93bGVkZ2Uuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGB9KVxuXHRcdFx0cmV0dXJuIGtub3dsZWRnZVxuXHRcdH0pXG4gICAgfVxuXHQsRkVUQ0gxOiBhPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBfaWQ9c3RhdGUucm91dGluZy5wYXJhbXMuX2lkXG5cdFx0ZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkfSwga25vd2xlZGdlPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKSlcblx0fVxuXHQsVVBEQVRFOiBhPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBkb2N4PXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZTpuZXdWZXJzaW9ufT1kb2N4XG5cdFx0Y29uc3QgcGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcblxuXHRcdGNvbnN0IGlkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxuXHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGUuZW50aXRpZXNbZGJLbm93bGVkZ2Uuc2NoZW1hLmdldEtleSgpXVtpZF1cblxuXHRcdGxldCB1cHNlcnRlZD1udWxsXG5cdFx0aWYocGhvdG9zLmxlbmd0aCl7XG5cdFx0XHR1cHNlcnRlZD1kb2N4LnVwbG9hZChjdXJyZW50KS50aGVuKGNvbnRlbnQ9Pntcblx0XHRcdFx0Y3VycmVudC5waG90b3M9ZG9jeC5nZXRQaG90b3MoKVxuXHRcdFx0XHRjdXJyZW50LmNvbnRlbnQ9Y29udGVudFxuXHRcdFx0XHRyZXR1cm4gZGJLbm93bGVkZ2UudXBzZXJ0KGN1cnJlbnQpXG5cdFx0XHR9KVxuXHRcdH1lbHNle1xuXHRcdFx0dXBzZXJ0ZWQ9ZGJLbm93bGVkZ2UudXBzZXJ0KE9iamVjdC5hc3NpZ24oe30sY3VycmVudCwgbmV3VmVyc2lvbikpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVwc2VydGVkLnRoZW4oa25vd2xlZGdlPT57XG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3VwZGF0ZWRgfSlcblx0XHRcdHJldHVybiBrbm93bGVkZ2Vcblx0XHR9KVxuXHR9XG5cdCxDQU5DRUw6IGE9Pih7dHlwZTpgQEAke0RPTUFJTn0vY2FuY2VsYH0pXG5cdCxUQVNLOiAoe19pZCx0aXRsZTpjb250ZW50LHNjb3JlfSk9PmRpc3BhdGNoPT5kaXNwYXRjaChUQVNLX0FDVElPTi5BREQoe19pZCxjb250ZW50LHNjb3JlfSkpXG5cdCxVTlRBU0s6ICh7X2lkfSk9PmRpc3BhdGNoPT5kaXNwYXRjaChUQVNLX0FDVElPTi5SRU1PVkUoe19pZH0pKVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSwge3R5cGUsIHBheWxvYWR9KT0+e1xuICAgIHN3aXRjaCh0eXBlKXtcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2tub3dsZWRnZXM6cGF5bG9hZH0pXG5cbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9zZWxlY3RlZERvY3hgOlxuICAgICAgICBpZihzdGF0ZS5zZWxlY3RlZERvY3gpXG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZERvY3gucmV2b2tlKClcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3NlbGVjdGVkRG9jeDpwYXlsb2FkfSlcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9jcmVhdGVkYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vdXBkYXRlZGA6XG5cdGNhc2UgYEBAJHtET01BSU59L2NhbmNlbGA6XG5cdFx0aWYoc3RhdGUuc2VsZWN0ZWREb2N4KXtcbiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkRG9jeC5yZXZva2UoKVxuXHRcdFx0ZGVsZXRlIHN0YXRlLnNlbGVjdGVkRG9jeFxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKVxuXHRcdH1cblx0XHRicmVha1xuXG4gICAgfVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIEtub3dsZWRnZXMgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtmaWx0ZXI6bnVsbH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5PXt9fSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHF1ZXJ5KSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5fX09dGhpcy5wcm9wc1xuICAgICAgICBjb25zdCB7bG9jYXRpb246e3F1ZXJ5Om5leHRRdWVyeX0sIGRpc3BhdGNofT1uZXh0XG4gICAgICAgIGlmKHF1ZXJ5LnRpdGxlIT1uZXh0UXVlcnkuVGl0bGUpXG4gICAgICAgICAgICBkaXNwYXRjaChBQ0lPTi5GRVRDSChuZXh0LmxvY2F0aW9uLnF1ZXJ5KSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2VzfT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge2ZpbHRlcn09dGhpcy5zdGF0ZVxuICAgICAgICBsZXQgcmVmU2VhcmNoPW51bGxcbiAgICAgICAgY29uc3Qgc2VhcmNoPXRpdGxlPT57XG5cdFx0XHRyb3V0ZXIucmVwbGFjZShlbmNvZGVVUkkoYC9rbm93bGVkZ2U/cXVlcnk9JHtKU09OLnN0cmluZ2lmeSh7dGl0bGU6cmVmU2VhcmNoLmdldFZhbHVlKCkudHJpbSgpfSl9YCkpXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtmaWx0ZXI6bnVsbH0pXG5cdFx0fVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0PFBhcGVyPlxuXHRcdFx0XHRcdDxBcHBCYXJcblx0XHRcdFx0XHRcdGljb25FbGVtZW50TGVmdD17dGhpcy5nZXRMZWZ0RWxlbWVudCgpfVxuXHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRSaWdodD17PEljb25CdXR0b24gb25DbGljaz17ZT0+c2VhcmNoKCl9PjxJY29uU2VhcmNoLz48L0ljb25CdXR0b24+fVxuXHRcdFx0XHRcdFx0dGl0bGU9ezxUZXh0RmllbGQgcmVmPXthPT5yZWZTZWFyY2g9YX1cblx0XHRcdFx0XHRcdFx0aGludFRleHQ9XCLmn6Xor6JcIlxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsdmFsdWUpPT50aGlzLnNldFN0YXRlKHtmaWx0ZXI6dmFsdWV9KX1cblx0XHRcdFx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PTEzICYmIHNlYXJjaCgpfVxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9QYXBlcj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIHtrbm93bGVkZ2VzLmZpbHRlcihhPT5maWx0ZXIgPyAtMSE9YS50aXRsZS5pbmRleE9mKGZpbHRlcikgOiB0cnVlKS5tYXAoYT0+PEl0ZW0gbW9kZWw9e2F9IGtleT17YS5faWR9Lz4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0Z2V0TGVmdEVsZW1lbnQoKXtcblx0XHRyZXR1cm4gKDxzcGFuLz4pXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBDcmVhdGFibGU9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuICAgICAgICAgICAgY29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0FkZFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNFTEVDVF9ET0NYKCkpLnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoJy9rbm93bGVkZ2UvY3JlYXRlJykpfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaT17dHJ1ZX0vPlxuICAgICAgICAgICAgICAgICAgICB7c3VwZXIucmVuZGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cblx0c3RhdGljIENvdXJzZT1jbGFzcyBleHRlbmRzIEtub3dsZWRnZXN7XG5cdFx0Z2V0TGVmdEVsZW1lbnQoKXtcblx0XHRcdHJldHVybiAoPEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX0+PEljb25CYWNrLz48L0ljb25CdXR0b24+KVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthZ2UsZ2VuZGVyLGNhdGVnb3J5fT10aGlzLnByb3BzLnF1ZXJ5fHx7fVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiYWdlXCIga2V5PVwiQWdlXCIgbGFiZWw9XCJBZ2UgKFllYXIpXCIgc2luZ2xlPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXthZ2V9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiMC41LCAxLCAyLCAzLCA0LCA1LCA2LCA4LCAxMFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImdlbmRlclwiIGtleT1cIkdlbmRlclwiIGxhYmVsPVwiR2VuZGVyXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Z2VuZGVyfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIkdpcmwsQm95XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiY2F0ZWdvcnlcIiBrZXk9XCJDYXRlZ29yeVwiIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJPYnNlcnZlLCBTdHVkeSwgU3BvcnRcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImFjdGlvbnNcIiBzdHlsZT17e3BhZGRpbmc6MTAsIHRleHRBbGlnbjonY2VudGVyJ319PlxuICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gb25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0dmFyIGFnZT10aGlzLnJlZnMuYWdlLnN0YXRlLnNlbGVjdGVkLFxuXHRcdFx0XHRcdFx0XHRnZW5kZXI9QXJyYXkuZnJvbSh0aGlzLnJlZnMuZ2VuZGVyLnN0YXRlLnNlbGVjdGVkKSxcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk9QXJyYXkuZnJvbSh0aGlzLnJlZnMuY2F0ZWdvcnkuc3RhdGUuc2VsZWN0ZWQpXG5cblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub25TZWFyY2goe2FnZSxnZW5kZXIsY2F0ZWdvcnl9KVxuXHRcdFx0XHRcdH19PlNlYXJjaDwvUmFpc2VkQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PilcbiAgICAgICAgXVxuICAgIH1cbn1cblxuY2xhc3MgQ2hlY2tHcm91cCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgdmFyIHtzZWxlY3RlZCwgc2luZ2xlfT1uZXh0XG4gICAgICAgIHRoaXMuc3RhdGU9e31cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1zZWxlY3RlZDtcbiAgICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoc2VsZWN0ZWQpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoKVxuXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXJ7aXRlbXMsIGxhYmVsLCBvbkNoYW5nZSwgc2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgc2VsZWN0ZWRTdHlsZT17cGFkZGluZzo1LCBib3JkZXJSaWdodDonMXB4IHNvbGlkIGxpZ2h0Z3JheScsXG4gICAgICAgICAgICAgICAgY29sb3I6J3doaXRlJyxiYWNrZ3JvdW5kQ29sb3I6J3JlZCd9LFxuICAgICAgICAgICAgdW5zZWxlY3RlZFN0eWxlPU9iamVjdC5hc3NpZ24oe30sc2VsZWN0ZWRTdHlsZSx7Y29sb3I6J2JsYWNrJywgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCd9KTtcblxuICAgICAgICByZXR1cm4oPGRpdiBzdHlsZT17e3BhZGRpbmc6MTB9fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7ZmxvYXQ6J3JpZ2h0JyxwYWRkaW5nOic1cHggMHB4JywgYm9yZGVyOicxcHggc29saWQgbGlnaHRncmF5JywgYm9yZGVyUmlnaHQ6MH19PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGEpIT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGE9YS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXthfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLm9uU2VsZWN0KGEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsoc2luZ2xlID8gc2VsZWN0ZWQ9PWEgOiBzZWxlY3RlZC5oYXMoYSkpID8gc2VsZWN0ZWRTdHlsZSA6IHVuc2VsZWN0ZWRTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2F9PC9zcGFuPilcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxuICAgIG9uU2VsZWN0KGl0ZW0sIGE9e30pe1xuICAgICAgICB2YXJ7c2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBzZWxlY3RlZD09aXRlbSA/IHVuZGVmaW5lZCA6IGl0ZW19KTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNlbGVjdGVkW3NlbGVjdGVkLmhhcyhpdGVtKSA/ICdkZWxldGUnIDogJ2FkZCddKGl0ZW0pXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDpzZWxlY3RlZH0pXG4gICAgICAgIH1cbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17c2luZ2xlOmZhbHNlfVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOntwaG90b3M9W119fT10aGlzLnByb3BzXG4gICAgICAgIHN3aXRjaChwaG90b3MubGVuZ3RoKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzBwaG90bygpXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzFwaG90bygpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fM3Bob3RvKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF8wcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8wXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1bW1hcnlcIj57bW9kZWwuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBfMXBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgXzNwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzNcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMV19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzJdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9tb3JlKG1vZGVsKXtcbiAgICAgICAgdmFyIHRpbWU9cmVsYXRpdmUobW9kZWwuY3JlYXRlZEF0fHxtb2RlbC51cGRhdGVkQXQpXG5cbiAgICAgICAgdmFyIHphbj1tb2RlbC56YW5zID8gKDxkaXY+PEljb25UaHVtYnVwLz57bW9kZWwuemFuc308L2Rpdj4pIDogbnVsbFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3JlXCI+XG4gICAgICAgICAgICAgICAgPHRpbWU+e3RpbWV9PC90aW1lPlxuICAgICAgICAgICAgICAgIHt6YW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvbkRldGFpbCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmAva25vd2xlZGdlLyR7dGhpcy5wcm9wcy5tb2RlbC5faWR9YCxzdGF0ZTp7a25vd2xlZGdlOnRoaXMucHJvcHMubW9kZWx9fSlcbiAgICB9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5cbmV4cG9ydCBjb25zdCBDb250ZW50PSh7X2lkLCB0aXRsZSwgY29udGVudCwgc3VtbWFyeSwgY3JlYXRlZEF0LCBjYXRlZ29yeT1bXSwga2V5d29yZHM9W10sIGZpZ3VyZSwgYXV0aG9yfSk9Pntcblx0Y29udGVudD08ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOmNvbnRlbnR9fS8+XG5cblx0aWYoc3VtbWFyeSAmJiBvcGVuIT09bnVsbCl7XG5cdFx0Y29udGVudD0oXG5cdFx0XHQ8ZGV0YWlscyBvcGVuPXtvcGVufT5cblx0XHRcdFx0PHN1bW1hcnk+e3N1bW1hcnl9PC9zdW1tYXJ5PlxuXHRcdFx0XHR7Y29udGVudH1cblx0XHRcdDwvZGV0YWlscz5cblx0XHQpXG5cdH1cblxuXHRsZXQgbm90TmV3U3R1ZmY9bnVsbFxuXHRpZihfaWQpe1xuXHRcdG5vdE5ld1N0dWZmPVtcblx0XHRcdCg8aDEga2V5PVwibGluazBcIj48TGluayB0bz17YC9rbm93bGVkZ2UvJHtfaWR9YH0+e3RpdGxlfTwvTGluaz48L2gxPiksXG5cdFx0XHQoPHAga2V5PVwiYXV0aG9yXCI+XG5cdFx0XHRcdHthdXRob3IubmFtZX0gLSA8dGltZT57cmVsYXRpdmUoY3JlYXRlZEF0KX08L3RpbWU+XG5cdFx0XHQ8L3A+KVxuXHRcdF1cblx0fWVsc2Uge1xuXHRcdG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGluazFcIj57dGl0bGV9PC9oMT4pXG5cdH1cblxuXHRpZihmaWd1cmUpXG5cdFx0ZmlndXJlPSg8aW1nIHNyYz17ZmlndXJlfS8+KVxuXG5cdHJldHVybiAoXG5cdFx0PGFydGljbGU+XG5cdFx0XHQ8ZmlndXJlPntmaWd1cmV9PC9maWd1cmU+XG5cdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHR7bm90TmV3U3R1ZmZ9XG5cdFx0XHRcdDxwPlxuXHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XG5cdFx0XHRcdDwvcD5cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0PC9zZWN0aW9uPlxuXHRcdDwvYXJ0aWNsZT5cblx0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEtub3dsZWRnZXMse0FDVElPTiwgUkVEVUNFUn0pXG4iXX0=