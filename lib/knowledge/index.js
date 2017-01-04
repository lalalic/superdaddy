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
    TASK: function TASK(knowledge) {
        return function (dispatch) {
            return dispatch(_timeManage.ACTION.ADD(knowledge));
        };
    },
    UNTASK: function UNTASK(knowledge) {
        return function (dispatch) {
            return dispatch(_timeManage.ACTION.REMOVE(knowledge));
        };
    }
};

var REDUCER = exports.REDUCER = function REDUCER() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        payload = _ref2.payload;

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
        var _ref3;

        var _temp, _this, _ret;

        _classCallCheck(this, Knowledges);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = Knowledges.__proto__ || Object.getPrototypeOf(Knowledges)).call.apply(_ref3, [this].concat(args))), _this), _this.state = { filter: null }, _temp), _possibleConstructorReturn(_this, _ret);
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

            var _ref4 = this.props.query || {},
                age = _ref4.age,
                gender = _ref4.gender,
                category = _ref4.category;

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
var Content = exports.Content = function Content(_ref5) {
    var _id = _ref5._id,
        title = _ref5.title,
        content = _ref5.content,
        summary = _ref5.summary,
        createdAt = _ref5.createdAt,
        _ref5$category = _ref5.category,
        category = _ref5$category === undefined ? [] : _ref5$category,
        _ref5$keywords = _ref5.keywords,
        keywords = _ref5$keywords === undefined ? [] : _ref5$keywords,
        figure = _ref5.figure,
        author = _ref5.author;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5kZXguanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiZmlsZVNlbGVjdG9yIiwiRGlhbG9nQ29tbWFuZCIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJrbm93bGVkZ2VzIiwiQUNUSU9OIiwiRkVUQ0giLCJmaW5kIiwicXVlcnkiLCJmZXRjaCIsImxlbmd0aCIsImRhdGEiLCJzY2hlbWEiLCJkaXNwYXRjaCIsImVudGl0aWVzIiwidHlwZSIsInBheWxvYWQiLCJyZXN1bHQiLCJTRUxFQ1RfRE9DWCIsInNlbGVjdCIsInRoZW4iLCJmaWxlIiwiZG9jeCIsIkNSRUFURSIsImdldFN0YXRlIiwic3RhdGUiLCJ1aSIsImtub3dsZWRnZSIsInNlbGVjdGVkRG9jeCIsInBob3RvcyIsImdldFBob3RvcyIsInVwc2VydGVkIiwiY29udGVudCIsInVwc2VydCIsInVwbG9hZCIsImEiLCJ0ZW1wbGF0ZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZWplY3QiLCJGRVRDSDEiLCJfaWQiLCJyb3V0aW5nIiwicGFyYW1zIiwiZmluZE9uZSIsIlVQREFURSIsIm5ld1ZlcnNpb24iLCJpZCIsImN1cnJlbnQiLCJnZXRLZXkiLCJPYmplY3QiLCJhc3NpZ24iLCJDQU5DRUwiLCJUQVNLIiwiQUREIiwiVU5UQVNLIiwiUkVNT1ZFIiwiUkVEVUNFUiIsInJldm9rZSIsIktub3dsZWRnZXMiLCJmaWx0ZXIiLCJwcm9wcyIsImxvY2F0aW9uIiwibmV4dCIsIm5leHRRdWVyeSIsInRpdGxlIiwiVGl0bGUiLCJBQ0lPTiIsInJvdXRlciIsImNvbnRleHQiLCJyZWZTZWFyY2giLCJzZWFyY2giLCJyZXBsYWNlIiwiZW5jb2RlVVJJIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbHVlIiwidHJpbSIsInNldFN0YXRlIiwiZ2V0TGVmdEVsZW1lbnQiLCJlIiwidmFsdWUiLCJrZXlDb2RlIiwiaW5kZXhPZiIsIm1hcCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0YWJsZSIsIkNvdXJzZSIsImdvQmFjayIsIlNlYXJjaCIsImFnZSIsImdlbmRlciIsImNhdGVnb3J5Iiwic3BsaXQiLCJwYWRkaW5nIiwidGV4dEFsaWduIiwicmVmcyIsInNlbGVjdGVkIiwiQXJyYXkiLCJmcm9tIiwib25TZWFyY2giLCJDaGVja0dyb3VwIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNpbmdsZSIsImlzQXJyYXkiLCJTZXQiLCJpdGVtcyIsImxhYmVsIiwib25DaGFuZ2UiLCJzZWxlY3RlZFN0eWxlIiwiYm9yZGVyUmlnaHQiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsInVuc2VsZWN0ZWRTdHlsZSIsImZsb2F0IiwiYm9yZGVyIiwib25TZWxlY3QiLCJoYXMiLCJiaW5kIiwiaXRlbSIsInVuZGVmaW5lZCIsImRlZmF1bHRQcm9wcyIsIkl0ZW0iLCJtb2RlbCIsIl8wcGhvdG8iLCJfMXBob3RvIiwiXzNwaG90byIsIm90aGVycyIsIm9uRGV0YWlsIiwic3VtbWFyeSIsIl9tb3JlIiwidGltZSIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsInphbiIsInphbnMiLCJwdXNoIiwicGF0aG5hbWUiLCJDb250ZW50Iiwia2V5d29yZHMiLCJmaWd1cmUiLCJhdXRob3IiLCJfX2h0bWwiLCJvcGVuIiwibm90TmV3U3R1ZmYiLCJuYW1lIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFT0EsVSxlQUFBQSxVO0lBQVlDLEssZUFBQUEsSztJQUFPQyxZLGVBQUFBLFk7SUFFbkJDLGEsR0FBZUgsVSxDQUFmRyxhOzs7QUFFUCxJQUFNQyxTQUFPLFdBQWI7QUFDQSxJQUFNQyxhQUFXO0FBQ2hCQyxnQkFBVztBQURL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Y0FBRyxLQUFJLFFBQVA7QUFDQzZFLG1CQUFPSSxJQURSO0FBQUE7QUFDZ0I7QUFBQTtBQUFBO0FBQU8sd0NBQVNiLFNBQVQ7QUFBUDtBQURoQixTQUZVLENBQVo7QUFNQSxLQVBELE1BT007QUFDTFksc0JBQWE7QUFBQTtBQUFBLGNBQUksS0FBSSxPQUFSO0FBQWlCaEY7QUFBakIsU0FBYjtBQUNBOztBQUVELFFBQUc0RSxNQUFILEVBQ0NBLFNBQVEsdUNBQUssS0FBS0EsTUFBVixHQUFSOztBQUVELFdBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQVNBO0FBQVQsU0FERDtBQUVDO0FBQUE7QUFBQTtBQUNFSSx1QkFERjtBQUVDO0FBQUE7QUFBQTtBQUNFcEQseUJBQVNzRCxJQUFULENBQWMsSUFBZCxDQURGO0FBQUE7QUFDd0JQLHlCQUFTTyxJQUFULENBQWMsSUFBZDtBQUR4QjtBQUZELFNBRkQ7QUFRQztBQUFBO0FBQUE7QUFDRW5IO0FBREY7QUFSRCxLQUREO0FBY0EsQ0F6Q007O2tCQTJDUWtCLE9BQU9DLE1BQVAsQ0FBY1EsVUFBZCxFQUF5QixFQUFDdEQsY0FBRCxFQUFTb0QsZ0JBQVQsRUFBekIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJLCBFTlRJVElFU30gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCB7bm9ybWFsaXplLCBhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuaW1wb3J0IHtJY29uQnV0dG9uLCBBcHBCYXIsIFRleHRGaWVsZCwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5cclxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcclxuaW1wb3J0IEljb25UaHVtYnVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3RodW1iLXVwXCJcclxuaW1wb3J0IEljb25TZWFyY2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2VhcmNoXCJcclxuaW1wb3J0IEljb25CYWNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXHJcblxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi4vZGIva25vd2xlZGdlJ1xyXG5pbXBvcnQge3JlbGF0aXZlfSBmcm9tICcuLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xyXG5pbXBvcnQgRmxvYXRpbmdBZGQgZnJvbSBcIi4uL2NvbXBvbmVudHMvZmxvYXRpbmctYWRkXCJcclxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGR9IGZyb20gXCIuLi9zZWxlY3RvclwiXHJcbmltcG9ydCB7QUNUSU9OIGFzIFRBU0tfQUNUSU9OfSBmcm9tIFwiLi4vdGltZS1tYW5hZ2VcIlxyXG5cclxuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4vaW5mbydcclxuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9leHRyYWN0J1xyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5LCBmaWxlU2VsZWN0b3J9PVVJXHJcblxyXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxyXG5cclxuY29uc3QgRE9NQUlOPVwia25vd2xlZGdlXCJcclxuY29uc3QgSU5JVF9TVEFURT17XHJcblx0a25vd2xlZGdlczpbXVxyXG59XHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG4gICAgRkVUQ0g6IHF1ZXJ5PT5kaXNwYXRjaD0+ZGJLbm93bGVkZ2UuZmluZChxdWVyeSlcclxuICAgICAgICAuZmV0Y2goa25vd2xlZGdlcz0+e1xyXG5cdFx0XHRpZihrbm93bGVkZ2VzICYmIGtub3dsZWRnZXMubGVuZ3RoKXtcclxuXHRcdFx0XHRsZXQgZGF0YT1ub3JtYWxpemUoa25vd2xlZGdlcywgYXJyYXlPZihkYktub3dsZWRnZS5zY2hlbWEpKVxyXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGRhdGEuZW50aXRpZXMpKVxyXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCwgcGF5bG9hZDpkYXRhLnJlc3VsdH0pXHJcblx0XHRcdH1cclxuICAgICAgICB9KVxyXG4gICAgLFNFTEVDVF9ET0NYOiBhPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdCgpXHJcblx0XHQudGhlbihmaWxlPT5leHRyYWN0KGZpbGUpKVxyXG4gICAgICAgIC50aGVuKGRvY3g9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9zZWxlY3RlZERvY3hgLHBheWxvYWQ6ZG9jeH0pKVxyXG5cclxuICAgICxDUkVBVEU6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcclxuXHRcdGNvbnN0IGRvY3g9c3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxyXG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2V9PWRvY3hcclxuXHRcdGNvbnN0IHBob3Rvcz1kb2N4LmdldFBob3RvcygpXHJcblx0XHRsZXQgdXBzZXJ0ZWQ9bnVsbFxyXG5cdFx0aWYocGhvdG9zLmxlbmd0aCl7XHJcblx0XHRcdGtub3dsZWRnZS5jb250ZW50PVwiXCJcclxuXHRcdFx0dXBzZXJ0ZWQ9ZGJLbm93bGVkZ2UudXBzZXJ0KGtub3dsZWRnZSkudGhlbihhPT57XHJcblx0XHRcdFx0cmV0dXJuIGRvY3gudXBsb2FkKGEpLnRoZW4oKHtjb250ZW50LHRlbXBsYXRlfSk9PntcclxuXHRcdFx0XHRcdGEucGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcclxuXHRcdFx0XHRcdGEuY29udGVudD1jb250ZW50XHJcblx0XHRcdFx0XHRhLnRlbXBsYXRlPXRlbXBsYXRlXHJcblx0XHRcdFx0XHRyZXR1cm4gZGJLbm93bGVkZ2UudXBzZXJ0KGEpXHJcblx0XHRcdFx0fSwgYT0+e1xyXG5cdFx0XHRcdFx0ZGJLbm93bGVkZ2UucmVtb3ZlKGtub3dsZWRnZSlcclxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dXBzZXJ0ZWQ9ZGJLbm93bGVkZ2UudXBzZXJ0KGtub3dsZWRnZSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXBzZXJ0ZWQudGhlbihrbm93bGVkZ2U9PntcclxuXHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGtub3dsZWRnZSxkYktub3dsZWRnZS5zY2hlbWEpLmVudGl0aWVzKSlcclxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgfSlcclxuXHRcdFx0cmV0dXJuIGtub3dsZWRnZVxyXG5cdFx0fSlcclxuICAgIH1cclxuXHQsRkVUQ0gxOiBhPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3QgX2lkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxyXG5cdFx0ZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkfSwga25vd2xlZGdlPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcblx0LFVQREFURTogYT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcclxuXHRcdGNvbnN0IGRvY3g9c3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxyXG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2U6bmV3VmVyc2lvbn09ZG9jeFxyXG5cdFx0Y29uc3QgcGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcclxuXHJcblx0XHRjb25zdCBpZD1zdGF0ZS5yb3V0aW5nLnBhcmFtcy5faWRcclxuXHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGUuZW50aXRpZXNbZGJLbm93bGVkZ2Uuc2NoZW1hLmdldEtleSgpXVtpZF1cclxuXHJcblx0XHRsZXQgdXBzZXJ0ZWQ9bnVsbFxyXG5cdFx0aWYocGhvdG9zLmxlbmd0aCl7XHJcblx0XHRcdHVwc2VydGVkPWRvY3gudXBsb2FkKGN1cnJlbnQpLnRoZW4oY29udGVudD0+e1xyXG5cdFx0XHRcdGN1cnJlbnQucGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcclxuXHRcdFx0XHRjdXJyZW50LmNvbnRlbnQ9Y29udGVudFxyXG5cdFx0XHRcdHJldHVybiBkYktub3dsZWRnZS51cHNlcnQoY3VycmVudClcclxuXHRcdFx0fSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR1cHNlcnRlZD1kYktub3dsZWRnZS51cHNlcnQoT2JqZWN0LmFzc2lnbih7fSxjdXJyZW50LCBuZXdWZXJzaW9uKSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXBzZXJ0ZWQudGhlbihrbm93bGVkZ2U9PntcclxuXHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGtub3dsZWRnZSxkYktub3dsZWRnZS5zY2hlbWEpLmVudGl0aWVzKSlcclxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3VwZGF0ZWRgfSlcclxuXHRcdFx0cmV0dXJuIGtub3dsZWRnZVxyXG5cdFx0fSlcclxuXHR9XHJcblx0LENBTkNFTDogYT0+KHt0eXBlOmBAQCR7RE9NQUlOfS9jYW5jZWxgfSlcclxuXHQsVEFTSzogKGtub3dsZWRnZSk9PmRpc3BhdGNoPT5kaXNwYXRjaChUQVNLX0FDVElPTi5BREQoa25vd2xlZGdlKSlcclxuXHQsVU5UQVNLOiAoa25vd2xlZGdlKT0+ZGlzcGF0Y2g9PmRpc3BhdGNoKFRBU0tfQUNUSU9OLlJFTU9WRShrbm93bGVkZ2UpKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG4gICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2tub3dsZWRnZXM6cGF5bG9hZH0pXHJcblxyXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vc2VsZWN0ZWREb2N4YDpcclxuICAgICAgICBpZihzdGF0ZS5zZWxlY3RlZERvY3gpXHJcbiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkRG9jeC5yZXZva2UoKVxyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzZWxlY3RlZERvY3g6cGF5bG9hZH0pXHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9jcmVhdGVkYDpcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9jYW5jZWxgOlxyXG5cdFx0aWYoc3RhdGUuc2VsZWN0ZWREb2N4KXtcclxuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXHJcblx0XHRcdGRlbGV0ZSBzdGF0ZS5zZWxlY3RlZERvY3hcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKVxyXG5cdFx0fVxyXG5cdFx0YnJlYWtcclxuXHJcbiAgICB9XHJcblx0cmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLbm93bGVkZ2VzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtmaWx0ZXI6bnVsbH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeT17fX0sIGRpc3BhdGNofT10aGlzLnByb3BzXHJcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHF1ZXJ5KSlcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xyXG4gICAgICAgIGNvbnN0IHtsb2NhdGlvbjp7cXVlcnl9fT10aGlzLnByb3BzXHJcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeTpuZXh0UXVlcnl9LCBkaXNwYXRjaH09bmV4dFxyXG4gICAgICAgIGlmKHF1ZXJ5LnRpdGxlIT1uZXh0UXVlcnkuVGl0bGUpXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEFDSU9OLkZFVENIKG5leHQubG9jYXRpb24ucXVlcnkpKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxyXG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2VzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7ZmlsdGVyfT10aGlzLnN0YXRlXHJcbiAgICAgICAgbGV0IHJlZlNlYXJjaD1udWxsXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoPXRpdGxlPT57XHJcblx0XHRcdHJvdXRlci5yZXBsYWNlKGVuY29kZVVSSShgL2tub3dsZWRnZT9xdWVyeT0ke0pTT04uc3RyaW5naWZ5KHt0aXRsZTpyZWZTZWFyY2guZ2V0VmFsdWUoKS50cmltKCl9KX1gKSlcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOm51bGx9KVxyXG5cdFx0fVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcblx0XHRcdFx0PFBhcGVyPlxyXG5cdFx0XHRcdFx0PEFwcEJhclxyXG5cdFx0XHRcdFx0XHRpY29uRWxlbWVudExlZnQ9e3RoaXMuZ2V0TGVmdEVsZW1lbnQoKX1cclxuXHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRSaWdodD17PEljb25CdXR0b24gb25DbGljaz17ZT0+c2VhcmNoKCl9PjxJY29uU2VhcmNoLz48L0ljb25CdXR0b24+fVxyXG5cdFx0XHRcdFx0XHR0aXRsZT17PFRleHRGaWVsZCByZWY9e2E9PnJlZlNlYXJjaD1hfVxyXG5cdFx0XHRcdFx0XHRcdGhpbnRUZXh0PVwi5p+l6K+iXCJcclxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsdmFsdWUpPT50aGlzLnNldFN0YXRlKHtmaWx0ZXI6dmFsdWV9KX1cclxuXHRcdFx0XHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09MTMgJiYgc2VhcmNoKCl9XHJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdDwvUGFwZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7a25vd2xlZGdlcy5maWx0ZXIoYT0+ZmlsdGVyID8gLTEhPWEudGl0bGUuaW5kZXhPZihmaWx0ZXIpIDogdHJ1ZSkubWFwKGE9PjxJdGVtIG1vZGVsPXthfSBrZXk9e2EuX2lkfS8+KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdGdldExlZnRFbGVtZW50KCl7XHJcblx0XHRyZXR1cm4gKDxzcGFuLz4pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cclxuXHJcbiAgICBzdGF0aWMgQ3JlYXRhYmxlPWNsYXNzIGV4dGVuZHMgS25vd2xlZGdlc3tcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgY29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXHJcbiAgICAgICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdBZGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNFTEVDVF9ET0NYKCkpLnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoJy9rbm93bGVkZ2UvY3JlYXRlJykpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAge3N1cGVyLnJlbmRlcigpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBDb3Vyc2U9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xyXG5cdFx0Z2V0TGVmdEVsZW1lbnQoKXtcclxuXHRcdFx0cmV0dXJuICg8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpfT48SWNvbkJhY2svPjwvSWNvbkJ1dHRvbj4pXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xyXG4gICAgcmVuZGVyQ29udGVudCgpe1xyXG4gICAgICAgIHZhciB7YWdlLGdlbmRlcixjYXRlZ29yeX09dGhpcy5wcm9wcy5xdWVyeXx8e31cclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImFnZVwiIGtleT1cIkFnZVwiIGxhYmVsPVwiQWdlIChZZWFyKVwiIHNpbmdsZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXthZ2V9XHJcbiAgICAgICAgICAgICAgICBpdGVtcz17XCIwLjUsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDEwXCIuc3BsaXQoJywnKX0vPiksXHJcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJnZW5kZXJcIiBrZXk9XCJHZW5kZXJcIiBsYWJlbD1cIkdlbmRlclwiXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Z2VuZGVyfVxyXG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiR2lybCxCb3lcIi5zcGxpdCgnLCcpfS8+KSxcclxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImNhdGVnb3J5XCIga2V5PVwiQ2F0ZWdvcnlcIiBsYWJlbD1cIkNhdGVnb3J5XCJcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeX1cclxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIk9ic2VydmUsIFN0dWR5LCBTcG9ydFwiLnNwbGl0KCcsJyl9Lz4pLFxyXG4gICAgICAgICAgICAoPGRpdiBrZXk9XCJhY3Rpb25zXCIgc3R5bGU9e3twYWRkaW5nOjEwLCB0ZXh0QWxpZ246J2NlbnRlcid9fT5cclxuICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gb25DbGljaz17ZT0+e1xyXG5cdFx0XHRcdFx0XHR2YXIgYWdlPXRoaXMucmVmcy5hZ2Uuc3RhdGUuc2VsZWN0ZWQsXHJcblx0XHRcdFx0XHRcdFx0Z2VuZGVyPUFycmF5LmZyb20odGhpcy5yZWZzLmdlbmRlci5zdGF0ZS5zZWxlY3RlZCksXHJcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk9QXJyYXkuZnJvbSh0aGlzLnJlZnMuY2F0ZWdvcnkuc3RhdGUuc2VsZWN0ZWQpXHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2VhcmNoKHthZ2UsZ2VuZGVyLGNhdGVnb3J5fSlcclxuXHRcdFx0XHRcdH19PlNlYXJjaDwvUmFpc2VkQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2hlY2tHcm91cCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XHJcbiAgICAgICAgdmFyIHtzZWxlY3RlZCwgc2luZ2xlfT1uZXh0XHJcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxyXG4gICAgICAgIGlmKHNpbmdsZSlcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1zZWxlY3RlZDtcclxuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KHNlbGVjdGVkKVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldCgpXHJcblxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFye2l0ZW1zLCBsYWJlbCwgb25DaGFuZ2UsIHNpbmdsZX09dGhpcy5wcm9wcyxcclxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFN0eWxlPXtwYWRkaW5nOjUsIGJvcmRlclJpZ2h0OicxcHggc29saWQgbGlnaHRncmF5JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOid3aGl0ZScsYmFja2dyb3VuZENvbG9yOidyZWQnfSxcclxuICAgICAgICAgICAgdW5zZWxlY3RlZFN0eWxlPU9iamVjdC5hc3NpZ24oe30sc2VsZWN0ZWRTdHlsZSx7Y29sb3I6J2JsYWNrJywgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCd9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuKDxkaXYgc3R5bGU9e3twYWRkaW5nOjEwfX0+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLHBhZGRpbmc6JzVweCAwcHgnLCBib3JkZXI6JzFweCBzb2xpZCBsaWdodGdyYXknLCBib3JkZXJSaWdodDowfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcChmdW5jdGlvbihhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGEpIT0nc3RyaW5nJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhPWEudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2F9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdChhKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsoc2luZ2xlID8gc2VsZWN0ZWQ9PWEgOiBzZWxlY3RlZC5oYXMoYSkpID8gc2VsZWN0ZWRTdHlsZSA6IHVuc2VsZWN0ZWRTdHlsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YX08L3NwYW4+KVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PilcclxuICAgIH1cclxuICAgIG9uU2VsZWN0KGl0ZW0sIGE9e30pe1xyXG4gICAgICAgIHZhcntzaW5nbGV9PXRoaXMucHJvcHMsXHJcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgaWYoc2luZ2xlKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWQ9PWl0ZW0gPyB1bmRlZmluZWQgOiBpdGVtfSk7XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRbc2VsZWN0ZWQuaGFzKGl0ZW0pID8gJ2RlbGV0ZScgOiAnYWRkJ10oaXRlbSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6c2VsZWN0ZWR9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17c2luZ2xlOmZhbHNlfVxyXG59XHJcblxyXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFyIHttb2RlbDp7cGhvdG9zPVtdfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIHN3aXRjaChwaG90b3MubGVuZ3RoKXtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8wcGhvdG8oKVxyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8xcGhvdG8oKVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8zcGhvdG8oKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfMHBob3RvKCl7XHJcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMFwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VtbWFyeVwiPnttb2RlbC5zdW1tYXJ5fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICBfMXBob3RvKCl7XHJcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMVwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIF8zcGhvdG8oKXtcclxuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8zXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMV19Lz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMl19Lz48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBfbW9yZShtb2RlbCl7XHJcbiAgICAgICAgdmFyIHRpbWU9cmVsYXRpdmUobW9kZWwuY3JlYXRlZEF0fHxtb2RlbC51cGRhdGVkQXQpXHJcblxyXG4gICAgICAgIHZhciB6YW49bW9kZWwuemFucyA/ICg8ZGl2PjxJY29uVGh1bWJ1cC8+e21vZGVsLnphbnN9PC9kaXY+KSA6IG51bGxcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmVcIj5cclxuICAgICAgICAgICAgICAgIDx0aW1lPnt0aW1lfTwvdGltZT5cclxuICAgICAgICAgICAgICAgIHt6YW59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIG9uRGV0YWlsKCl7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpgL2tub3dsZWRnZS8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsc3RhdGU6e2tub3dsZWRnZTp0aGlzLnByb3BzLm1vZGVsfX0pXHJcbiAgICB9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgQ29udGVudD0oe19pZCwgdGl0bGUsIGNvbnRlbnQsIHN1bW1hcnksIGNyZWF0ZWRBdCwgY2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmUsIGF1dGhvcn0pPT57XHJcblx0Y29udGVudD08ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOmNvbnRlbnR9fS8+XHJcblxyXG5cdGlmKHN1bW1hcnkgJiYgb3BlbiE9PW51bGwpe1xyXG5cdFx0Y29udGVudD0oXHJcblx0XHRcdDxkZXRhaWxzIG9wZW49e29wZW59PlxyXG5cdFx0XHRcdDxzdW1tYXJ5PntzdW1tYXJ5fTwvc3VtbWFyeT5cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0PC9kZXRhaWxzPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0bGV0IG5vdE5ld1N0dWZmPW51bGxcclxuXHRpZihfaWQpe1xyXG5cdFx0bm90TmV3U3R1ZmY9W1xyXG5cdFx0XHQoPGgxIGtleT1cImxpbmswXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7X2lkfWB9Pnt0aXRsZX08L0xpbms+PC9oMT4pLFxyXG5cdFx0XHQoPHAga2V5PVwiYXV0aG9yXCI+XHJcblx0XHRcdFx0e2F1dGhvci5uYW1lfSAtIDx0aW1lPntyZWxhdGl2ZShjcmVhdGVkQXQpfTwvdGltZT5cclxuXHRcdFx0PC9wPilcclxuXHRcdF1cclxuXHR9ZWxzZSB7XHJcblx0XHRub3ROZXdTdHVmZj0oPGgxIGtleT1cImxpbmsxXCI+e3RpdGxlfTwvaDE+KVxyXG5cdH1cclxuXHJcblx0aWYoZmlndXJlKVxyXG5cdFx0ZmlndXJlPSg8aW1nIHNyYz17ZmlndXJlfS8+KVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGFydGljbGU+XHJcblx0XHRcdDxmaWd1cmU+e2ZpZ3VyZX08L2ZpZ3VyZT5cclxuXHRcdFx0PGhlYWRlcj5cclxuXHRcdFx0XHR7bm90TmV3U3R1ZmZ9XHJcblx0XHRcdFx0PHA+XHJcblx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxyXG5cdFx0XHRcdDwvcD5cclxuXHRcdFx0PC9oZWFkZXI+XHJcblx0XHRcdDxzZWN0aW9uPlxyXG5cdFx0XHRcdHtjb250ZW50fVxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHQ8L2FydGljbGU+XHJcblx0KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEtub3dsZWRnZXMse0FDVElPTiwgUkVEVUNFUn0pXHJcbiJdfQ==