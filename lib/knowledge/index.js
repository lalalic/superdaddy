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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvaW5kZXguanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiZmlsZVNlbGVjdG9yIiwiRGlhbG9nQ29tbWFuZCIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJrbm93bGVkZ2VzIiwiQUNUSU9OIiwiRkVUQ0giLCJmaW5kIiwicXVlcnkiLCJmZXRjaCIsImxlbmd0aCIsImRhdGEiLCJzY2hlbWEiLCJkaXNwYXRjaCIsImVudGl0aWVzIiwidHlwZSIsInBheWxvYWQiLCJyZXN1bHQiLCJTRUxFQ1RfRE9DWCIsInNlbGVjdCIsInRoZW4iLCJmaWxlIiwiZG9jeCIsIkNSRUFURSIsImdldFN0YXRlIiwic3RhdGUiLCJ1aSIsImtub3dsZWRnZSIsInNlbGVjdGVkRG9jeCIsInBob3RvcyIsImdldFBob3RvcyIsInVwc2VydGVkIiwiY29udGVudCIsInVwc2VydCIsInVwbG9hZCIsImEiLCJ0ZW1wbGF0ZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZWplY3QiLCJGRVRDSDEiLCJfaWQiLCJyb3V0aW5nIiwicGFyYW1zIiwiZmluZE9uZSIsIlVQREFURSIsIm5ld1ZlcnNpb24iLCJpZCIsImN1cnJlbnQiLCJnZXRLZXkiLCJPYmplY3QiLCJhc3NpZ24iLCJDQU5DRUwiLCJUQVNLIiwiQUREIiwiVU5UQVNLIiwiUkVNT1ZFIiwiUkVEVUNFUiIsInJldm9rZSIsIktub3dsZWRnZXMiLCJmaWx0ZXIiLCJwcm9wcyIsImxvY2F0aW9uIiwibmV4dCIsIm5leHRRdWVyeSIsInRpdGxlIiwiVGl0bGUiLCJBQ0lPTiIsInJvdXRlciIsImNvbnRleHQiLCJyZWZTZWFyY2giLCJzZWFyY2giLCJyZXBsYWNlIiwiZW5jb2RlVVJJIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbHVlIiwidHJpbSIsInNldFN0YXRlIiwiZ2V0TGVmdEVsZW1lbnQiLCJlIiwidmFsdWUiLCJrZXlDb2RlIiwiaW5kZXhPZiIsIm1hcCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0YWJsZSIsIkNvdXJzZSIsImdvQmFjayIsIlNlYXJjaCIsImFnZSIsImdlbmRlciIsImNhdGVnb3J5Iiwic3BsaXQiLCJwYWRkaW5nIiwidGV4dEFsaWduIiwicmVmcyIsInNlbGVjdGVkIiwiQXJyYXkiLCJmcm9tIiwib25TZWFyY2giLCJDaGVja0dyb3VwIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNpbmdsZSIsImlzQXJyYXkiLCJTZXQiLCJpdGVtcyIsImxhYmVsIiwib25DaGFuZ2UiLCJzZWxlY3RlZFN0eWxlIiwiYm9yZGVyUmlnaHQiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsInVuc2VsZWN0ZWRTdHlsZSIsImZsb2F0IiwiYm9yZGVyIiwib25TZWxlY3QiLCJoYXMiLCJiaW5kIiwiaXRlbSIsInVuZGVmaW5lZCIsImRlZmF1bHRQcm9wcyIsIkl0ZW0iLCJtb2RlbCIsIl8wcGhvdG8iLCJfMXBob3RvIiwiXzNwaG90byIsIm90aGVycyIsIm9uRGV0YWlsIiwic3VtbWFyeSIsIl9tb3JlIiwidGltZSIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsInphbiIsInphbnMiLCJwdXNoIiwicGF0aG5hbWUiLCJDb250ZW50Iiwia2V5d29yZHMiLCJmaWd1cmUiLCJhdXRob3IiLCJfX2h0bWwiLCJvcGVuIiwibm90TmV3U3R1ZmYiLCJuYW1lIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFT0EsVSxlQUFBQSxVO0lBQVlDLEssZUFBQUEsSztJQUFPQyxZLGVBQUFBLFk7SUFFbkJDLGEsR0FBZUgsVSxDQUFmRyxhOzs7QUFFUCxJQUFNQyxTQUFPLFdBQWI7QUFDQSxJQUFNQyxhQUFXO0FBQ2hCQyxnQkFBVztBQURLLENBQWpCO0FBR08sSUFBTUMsMEJBQU87QUFDaEJDLFdBQU87QUFBQSxlQUFPO0FBQUEsbUJBQVUsb0JBQVlDLElBQVosQ0FBaUJDLEtBQWpCLEVBQ25CQyxLQURtQixDQUNiLHNCQUFZO0FBQ3hCLG9CQUFHTCxjQUFjQSxXQUFXTSxNQUE1QixFQUFtQztBQUNsQyx3QkFBSUMsT0FBSywwQkFBVVAsVUFBVixFQUFzQix3QkFBUSxvQkFBWVEsTUFBcEIsQ0FBdEIsQ0FBVDtBQUNBQyw2QkFBUyx1QkFBU0YsS0FBS0csUUFBZCxDQUFUO0FBQ0FELDZCQUFTLEVBQUNFLGFBQVViLE1BQVYsYUFBRCxFQUE2QmMsU0FBUUwsS0FBS00sTUFBMUMsRUFBVDtBQUNBO0FBQ0ssYUFQbUIsQ0FBVjtBQUFBLFNBQVA7QUFBQSxLQURTO0FBU2ZDLGlCQUFhO0FBQUEsZUFBRztBQUFBLG1CQUFVbEIsYUFBYW1CLE1BQWIsR0FDNUJDLElBRDRCLENBQ3ZCO0FBQUEsdUJBQU0sdUJBQVFDLElBQVIsQ0FBTjtBQUFBLGFBRHVCLEVBRXRCRCxJQUZzQixDQUVqQjtBQUFBLHVCQUFNUCxTQUFTLEVBQUNFLGFBQVViLE1BQVYsa0JBQUQsRUFBaUNjLFNBQVFNLElBQXpDLEVBQVQsQ0FBTjtBQUFBLGFBRmlCLENBQVY7QUFBQSxTQUFIO0FBQUEsS0FURTs7QUFhZkMsWUFBUTtBQUFBLGVBQUcsVUFBQ1YsUUFBRCxFQUFVVyxRQUFWLEVBQXFCO0FBQ25DLGdCQUFNQyxRQUFNRCxVQUFaO0FBQ0EsZ0JBQU1GLE9BQUtHLE1BQU1DLEVBQU4sQ0FBU0MsU0FBVCxDQUFtQkMsWUFBOUI7QUFGbUMsZ0JBR3RCRCxTQUhzQixHQUdYTCxJQUhXLENBR3RCSyxTQUhzQjs7QUFJbkMsZ0JBQU1FLFNBQU9QLEtBQUtRLFNBQUwsRUFBYjtBQUNBLGdCQUFJQyxXQUFTLElBQWI7QUFDQSxnQkFBR0YsT0FBT25CLE1BQVYsRUFBaUI7QUFDaEJpQiwwQkFBVUssT0FBVixHQUFrQixFQUFsQjtBQUNBRCwyQkFBUyxvQkFBWUUsTUFBWixDQUFtQk4sU0FBbkIsRUFBOEJQLElBQTlCLENBQW1DLGFBQUc7QUFDOUMsMkJBQU9FLEtBQUtZLE1BQUwsQ0FBWUMsQ0FBWixFQUFlZixJQUFmLENBQW9CLGdCQUFzQjtBQUFBLDRCQUFwQlksT0FBb0IsUUFBcEJBLE9BQW9CO0FBQUEsNEJBQVpJLFFBQVksUUFBWkEsUUFBWTs7QUFDaERELDBCQUFFTixNQUFGLEdBQVNQLEtBQUtRLFNBQUwsRUFBVDtBQUNBSywwQkFBRUgsT0FBRixHQUFVQSxPQUFWO0FBQ0FHLDBCQUFFQyxRQUFGLEdBQVdBLFFBQVg7QUFDQSwrQkFBTyxvQkFBWUgsTUFBWixDQUFtQkUsQ0FBbkIsQ0FBUDtBQUNBLHFCQUxNLEVBS0osYUFBRztBQUNMLDRDQUFZRSxNQUFaLENBQW1CVixTQUFuQjtBQUNBLCtCQUFPVyxRQUFRQyxNQUFSLENBQWVKLENBQWYsQ0FBUDtBQUNBLHFCQVJNLENBQVA7QUFTQSxpQkFWUSxDQUFUO0FBV0EsYUFiRCxNQWFLO0FBQ0pKLDJCQUFTLG9CQUFZRSxNQUFaLENBQW1CTixTQUFuQixDQUFUO0FBQ0E7O0FBRUQsbUJBQU9JLFNBQVNYLElBQVQsQ0FBYyxxQkFBVztBQUMvQlAseUJBQVMsdUJBQVMsMEJBQVVjLFNBQVYsRUFBb0Isb0JBQVlmLE1BQWhDLEVBQXdDRSxRQUFqRCxDQUFUO0FBQ0FELHlCQUFTLEVBQUNFLGFBQVViLE1BQVYsYUFBRCxFQUFUO0FBQ0EsdUJBQU95QixTQUFQO0FBQ0EsYUFKTSxDQUFQO0FBS0csU0E1QlE7QUFBQSxLQWJPO0FBMENsQmEsWUFBUTtBQUFBLGVBQUcsVUFBQzNCLFFBQUQsRUFBV1csUUFBWCxFQUFzQjtBQUNqQyxnQkFBTUMsUUFBTUQsVUFBWjtBQUNBLGdCQUFNaUIsTUFBSWhCLE1BQU1pQixPQUFOLENBQWNDLE1BQWQsQ0FBcUJGLEdBQS9CO0FBQ0EsZ0NBQVlHLE9BQVosQ0FBb0IsRUFBQ0gsUUFBRCxFQUFwQixFQUEyQjtBQUFBLHVCQUFXNUIsU0FBUyx1QkFBUywwQkFBVWMsU0FBVixFQUFvQixvQkFBWWYsTUFBaEMsRUFBd0NFLFFBQWpELENBQVQsQ0FBWDtBQUFBLGFBQTNCO0FBQ0EsU0FKUTtBQUFBLEtBMUNVO0FBK0NsQitCLFlBQVE7QUFBQSxlQUFHLFVBQUNoQyxRQUFELEVBQVdXLFFBQVgsRUFBc0I7QUFDakMsZ0JBQU1DLFFBQU1ELFVBQVo7QUFDQSxnQkFBTUYsT0FBS0csTUFBTUMsRUFBTixDQUFTQyxTQUFULENBQW1CQyxZQUE5QjtBQUZpQyxnQkFHVmtCLFVBSFUsR0FHRXhCLElBSEYsQ0FHcEJLLFNBSG9COztBQUlqQyxnQkFBTUUsU0FBT1AsS0FBS1EsU0FBTCxFQUFiOztBQUVBLGdCQUFNaUIsS0FBR3RCLE1BQU1pQixPQUFOLENBQWNDLE1BQWQsQ0FBcUJGLEdBQTlCO0FBQ0EsZ0JBQU1PLFVBQVF2QixNQUFNWCxRQUFOLENBQWUsb0JBQVlGLE1BQVosQ0FBbUJxQyxNQUFuQixFQUFmLEVBQTRDRixFQUE1QyxDQUFkOztBQUVBLGdCQUFJaEIsV0FBUyxJQUFiO0FBQ0EsZ0JBQUdGLE9BQU9uQixNQUFWLEVBQWlCO0FBQ2hCcUIsMkJBQVNULEtBQUtZLE1BQUwsQ0FBWWMsT0FBWixFQUFxQjVCLElBQXJCLENBQTBCLG1CQUFTO0FBQzNDNEIsNEJBQVFuQixNQUFSLEdBQWVQLEtBQUtRLFNBQUwsRUFBZjtBQUNBa0IsNEJBQVFoQixPQUFSLEdBQWdCQSxPQUFoQjtBQUNBLDJCQUFPLG9CQUFZQyxNQUFaLENBQW1CZSxPQUFuQixDQUFQO0FBQ0EsaUJBSlEsQ0FBVDtBQUtBLGFBTkQsTUFNSztBQUNKakIsMkJBQVMsb0JBQVlFLE1BQVosQ0FBbUJpQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQkgsT0FBakIsRUFBMEJGLFVBQTFCLENBQW5CLENBQVQ7QUFDQTs7QUFFRCxtQkFBT2YsU0FBU1gsSUFBVCxDQUFjLHFCQUFXO0FBQy9CUCx5QkFBUyx1QkFBUywwQkFBVWMsU0FBVixFQUFvQixvQkFBWWYsTUFBaEMsRUFBd0NFLFFBQWpELENBQVQ7QUFDQUQseUJBQVMsRUFBQ0UsYUFBVWIsTUFBVixhQUFELEVBQVQ7QUFDQSx1QkFBT3lCLFNBQVA7QUFDQSxhQUpNLENBQVA7QUFLQSxTQXpCUTtBQUFBLEtBL0NVO0FBeUVsQnlCLFlBQVE7QUFBQSxlQUFJLEVBQUNyQyxhQUFVYixNQUFWLFlBQUQsRUFBSjtBQUFBLEtBekVVO0FBMEVsQm1ELFVBQU0sY0FBQzFCLFNBQUQ7QUFBQSxlQUFhO0FBQUEsbUJBQVVkLFNBQVMsbUJBQVl5QyxHQUFaLENBQWdCM0IsU0FBaEIsQ0FBVCxDQUFWO0FBQUEsU0FBYjtBQUFBLEtBMUVZO0FBMkVsQjRCLFlBQVEsZ0JBQUM1QixTQUFEO0FBQUEsZUFBYTtBQUFBLG1CQUFVZCxTQUFTLG1CQUFZMkMsTUFBWixDQUFtQjdCLFNBQW5CLENBQVQsQ0FBVjtBQUFBLFNBQWI7QUFBQTtBQTNFVSxDQUFiOztBQThFQSxJQUFNOEIsNEJBQVEsU0FBUkEsT0FBUSxHQUFxQztBQUFBLFFBQXBDaEMsS0FBb0MsdUVBQTlCdEIsVUFBOEI7QUFBQTtBQUFBLFFBQWpCWSxJQUFpQixTQUFqQkEsSUFBaUI7QUFBQSxRQUFYQyxPQUFXLFNBQVhBLE9BQVc7O0FBQ3RELFlBQU9ELElBQVA7QUFDQSxvQkFBVWIsTUFBVjtBQUNJLG1CQUFPZ0QsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUIxQixLQUFqQixFQUF1QixFQUFDckIsWUFBV1ksT0FBWixFQUF2QixDQUFQOztBQUVKLG9CQUFVZCxNQUFWO0FBQ0ksZ0JBQUd1QixNQUFNRyxZQUFULEVBQ0lILE1BQU1HLFlBQU4sQ0FBbUI4QixNQUFuQjtBQUNKLG1CQUFPUixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQjFCLEtBQWpCLEVBQXVCLEVBQUNHLGNBQWFaLE9BQWQsRUFBdkIsQ0FBUDtBQUNKLG9CQUFVZCxNQUFWO0FBQ0gsb0JBQVVBLE1BQVY7QUFDQSxvQkFBVUEsTUFBVjtBQUNDLGdCQUFHdUIsTUFBTUcsWUFBVCxFQUFzQjtBQUNaSCxzQkFBTUcsWUFBTixDQUFtQjhCLE1BQW5CO0FBQ1QsdUJBQU9qQyxNQUFNRyxZQUFiO0FBQ0EsdUJBQU9zQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjFCLEtBQWxCLENBQVA7QUFDQTtBQUNEOztBQWhCRTtBQW1CSCxXQUFPQSxLQUFQO0FBQ0EsQ0FyQk07O0lBdUJNa0MsVSxXQUFBQSxVOzs7Ozs7Ozs7Ozs7OztvTUFDWmxDLEssR0FBTSxFQUFDbUMsUUFBTyxJQUFSLEU7Ozs7OzRDQUNnQjtBQUFBLHlCQUN1QixLQUFLQyxLQUQ1QjtBQUFBLCtDQUNSQyxRQURRLENBQ0V0RCxLQURGO0FBQUEsZ0JBQ0VBLEtBREYseUNBQ1EsRUFEUjtBQUFBLGdCQUNhSyxRQURiLFVBQ2FBLFFBRGI7O0FBRWZBLHFCQUFTUixPQUFPQyxLQUFQLENBQWFFLEtBQWIsQ0FBVDtBQUNIOzs7a0RBRXlCdUQsSSxFQUFLO0FBQUEsZ0JBQ1Z2RCxLQURVLEdBQ0YsS0FBS3FELEtBREgsQ0FDcEJDLFFBRG9CLENBQ1Z0RCxLQURVO0FBQUEsZ0JBRUp3RCxTQUZJLEdBRWtCRCxJQUZsQixDQUVwQkQsUUFGb0IsQ0FFVnRELEtBRlU7QUFBQSxnQkFFUUssUUFGUixHQUVrQmtELElBRmxCLENBRVFsRCxRQUZSOztBQUczQixnQkFBR0wsTUFBTXlELEtBQU4sSUFBYUQsVUFBVUUsS0FBMUIsRUFDSXJELFNBQVNzRCxNQUFNN0QsS0FBTixDQUFZeUQsS0FBS0QsUUFBTCxDQUFjdEQsS0FBMUIsQ0FBVDtBQUNQOzs7aUNBRU87QUFBQTs7QUFBQSxnQkFDRzRELE1BREgsR0FDVyxLQUFLQyxPQURoQixDQUNHRCxNQURIO0FBQUEsZ0JBRUdoRSxVQUZILEdBRWUsS0FBS3lELEtBRnBCLENBRUd6RCxVQUZIO0FBQUEsZ0JBR0h3RCxNQUhHLEdBR0ssS0FBS25DLEtBSFYsQ0FHSG1DLE1BSEc7O0FBSUosZ0JBQUlVLFlBQVUsSUFBZDtBQUNBLGdCQUFNQyxTQUFPLFNBQVBBLE1BQU8sUUFBTztBQUN6QkgsdUJBQU9JLE9BQVAsQ0FBZUMsZ0NBQThCQyxLQUFLQyxTQUFMLENBQWUsRUFBQ1YsT0FBTUssVUFBVU0sUUFBVixHQUFxQkMsSUFBckIsRUFBUCxFQUFmLENBQTlCLENBQWY7QUFDQSx1QkFBS0MsUUFBTCxDQUFjLEVBQUNsQixRQUFPLElBQVIsRUFBZDtBQUNBLGFBSEs7QUFJQSxtQkFDSTtBQUFBO0FBQUE7QUFDUjtBQUFBO0FBQUE7QUFDQztBQUNDLHlDQUFpQixLQUFLbUIsY0FBTCxFQURsQjtBQUVDLDBDQUFrQjtBQUFBO0FBQUEsOEJBQVksU0FBUztBQUFBLDJDQUFHUixRQUFIO0FBQUEsaUNBQXJCO0FBQWtDO0FBQWxDLHlCQUZuQjtBQUdDLCtCQUFPLHVEQUFXLEtBQUs7QUFBQSx1Q0FBR0QsWUFBVW5DLENBQWI7QUFBQSw2QkFBaEI7QUFDTixzQ0FBUyxjQURIO0FBRU4sc0NBQVUsa0JBQUM2QyxDQUFELEVBQUdDLEtBQUg7QUFBQSx1Q0FBVyxPQUFLSCxRQUFMLENBQWMsRUFBQ2xCLFFBQU9xQixLQUFSLEVBQWQsQ0FBWDtBQUFBLDZCQUZKO0FBR04sdUNBQVc7QUFBQSx1Q0FBR0QsRUFBRUUsT0FBRixJQUFXLEVBQVgsSUFBaUJYLFFBQXBCO0FBQUEsNkJBSEw7QUFJTix1Q0FBVyxJQUpMO0FBSFI7QUFERCxpQkFEUTtBQWNJO0FBQUE7QUFBQTtBQUNLbkUsK0JBQVd3RCxNQUFYLENBQWtCO0FBQUEsK0JBQUdBLFNBQVMsQ0FBQyxDQUFELElBQUl6QixFQUFFOEIsS0FBRixDQUFRa0IsT0FBUixDQUFnQnZCLE1BQWhCLENBQWIsR0FBdUMsSUFBMUM7QUFBQSxxQkFBbEIsRUFBa0V3QixHQUFsRSxDQUFzRTtBQUFBLCtCQUFHLDhCQUFDLElBQUQsSUFBTSxPQUFPakQsQ0FBYixFQUFnQixLQUFLQSxFQUFFTSxHQUF2QixHQUFIO0FBQUEscUJBQXRFO0FBREw7QUFkSixhQURKO0FBb0JIOzs7eUNBRVk7QUFDZixtQkFBUSwyQ0FBUjtBQUNBOzs7Ozs7QUEvQ1drQixVLENBaURMMEIsWSxHQUFhLEVBQUNqQixRQUFPLGlCQUFVa0IsTUFBbEIsRTs7QUFqRFIzQixVLENBbURGNEIsUzs7Ozs7Ozs7Ozs7aUNBQ0s7QUFBQSxnQkFDRzFFLFFBREgsR0FDYSxLQUFLZ0QsS0FEbEIsQ0FDR2hELFFBREg7QUFBQSxnQkFFR3VELE1BRkgsR0FFVyxLQUFLQyxPQUZoQixDQUVHRCxNQUZIOztBQUdKLG1CQUNJO0FBQUE7QUFBQTtBQUNJO0FBQ0ksNkJBQVM7QUFBQSwrQkFBR3ZELFNBQVNSLE9BQU9hLFdBQVAsRUFBVCxFQUErQkUsSUFBL0IsQ0FBb0M7QUFBQSxtQ0FBR2dELE9BQU9JLE9BQVAsQ0FBZSxtQkFBZixDQUFIO0FBQUEseUJBQXBDLENBQUg7QUFBQSxxQkFEYjtBQUVJLDBCQUFNLElBRlYsR0FESjtBQUFBO0FBQUEsYUFESjtBQVFIOzs7O0VBWjBCYixVOztBQW5EdEJBLFUsQ0FrRUw2QixNOzs7Ozs7Ozs7Ozt5Q0FDVTtBQUFBOztBQUNmLG1CQUFRO0FBQUE7QUFBQSxrQkFBWSxTQUFTO0FBQUEsK0JBQUcsUUFBS25CLE9BQUwsQ0FBYUQsTUFBYixDQUFvQnFCLE1BQXBCLEVBQUg7QUFBQSxxQkFBckI7QUFBc0Q7QUFBdEQsYUFBUjtBQUNBOzs7O0VBSDBCOUIsVTs7SUFPdkIrQixNOzs7Ozs7Ozs7Ozt3Q0FDYTtBQUFBOztBQUFBLHdCQUNlLEtBQUs3QixLQUFMLENBQVdyRCxLQUFYLElBQWtCLEVBRGpDO0FBQUEsZ0JBQ05tRixHQURNLFNBQ05BLEdBRE07QUFBQSxnQkFDRkMsTUFERSxTQUNGQSxNQURFO0FBQUEsZ0JBQ0tDLFFBREwsU0FDS0EsUUFETDs7QUFHWCxtQkFBTyxDQUNGLDhCQUFDLFVBQUQsSUFBWSxLQUFJLEtBQWhCLEVBQXNCLEtBQUksS0FBMUIsRUFBZ0MsT0FBTSxZQUF0QyxFQUFtRCxRQUFRLElBQTNEO0FBQ0csMEJBQVVGLEdBRGI7QUFFRyx1QkFBTywrQkFBK0JHLEtBQS9CLENBQXFDLEdBQXJDLENBRlYsR0FERSxFQUlGLDhCQUFDLFVBQUQsSUFBWSxLQUFJLFFBQWhCLEVBQXlCLEtBQUksUUFBN0IsRUFBc0MsT0FBTSxRQUE1QztBQUNHLDBCQUFVRixNQURiO0FBRUcsdUJBQU8sV0FBV0UsS0FBWCxDQUFpQixHQUFqQixDQUZWLEdBSkUsRUFPRiw4QkFBQyxVQUFELElBQVksS0FBSSxVQUFoQixFQUEyQixLQUFJLFVBQS9CLEVBQTBDLE9BQU0sVUFBaEQ7QUFDRywwQkFBVUQsUUFEYjtBQUVHLHVCQUFPLHdCQUF3QkMsS0FBeEIsQ0FBOEIsR0FBOUIsQ0FGVixHQVBFLEVBVUY7QUFBQTtBQUFBLGtCQUFLLEtBQUksU0FBVCxFQUFtQixPQUFPLEVBQUNDLFNBQVEsRUFBVCxFQUFhQyxXQUFVLFFBQXZCLEVBQTFCO0FBQ0c7QUFBQyxnQ0FBRDtBQUFBLHNCQUFjLFNBQVMsSUFBdkIsRUFBNkIsU0FBUyxvQkFBRztBQUNuRCxnQ0FBSUwsTUFBSSxPQUFLTSxJQUFMLENBQVVOLEdBQVYsQ0FBY2xFLEtBQWQsQ0FBb0J5RSxRQUE1QjtBQUFBLGdDQUNDTixTQUFPTyxNQUFNQyxJQUFOLENBQVcsT0FBS0gsSUFBTCxDQUFVTCxNQUFWLENBQWlCbkUsS0FBakIsQ0FBdUJ5RSxRQUFsQyxDQURSO0FBQUEsZ0NBRUNMLFdBQVNNLE1BQU1DLElBQU4sQ0FBVyxPQUFLSCxJQUFMLENBQVVKLFFBQVYsQ0FBbUJwRSxLQUFuQixDQUF5QnlFLFFBQXBDLENBRlY7O0FBSUEsbUNBQUtyQyxLQUFMLENBQVd3QyxRQUFYLENBQW9CLEVBQUNWLFFBQUQsRUFBS0MsY0FBTCxFQUFZQyxrQkFBWixFQUFwQjtBQUNBLHlCQU5VO0FBQUE7QUFBQTtBQURILGFBVkUsQ0FBUDtBQW9CSDs7OztFQXhCZ0I1RixhOztJQTJCZnFHLFU7OztBQUNGLHdCQUFZekMsS0FBWixFQUFrQjtBQUFBOztBQUFBLDZIQUNSQSxLQURROztBQUVkLGVBQUswQyx5QkFBTCxDQUErQixPQUFLMUMsS0FBcEM7QUFGYztBQUdqQjs7OztrREFDeUJFLEksRUFBSztBQUFBLGdCQUN0Qm1DLFFBRHNCLEdBQ0puQyxJQURJLENBQ3RCbUMsUUFEc0I7QUFBQSxnQkFDWk0sTUFEWSxHQUNKekMsSUFESSxDQUNaeUMsTUFEWTs7QUFFM0IsaUJBQUsvRSxLQUFMLEdBQVcsRUFBWDtBQUNBLGdCQUFHK0UsTUFBSCxFQUNJLEtBQUsvRSxLQUFMLENBQVd5RSxRQUFYLEdBQW9CQSxRQUFwQixDQURKLEtBRUssSUFBR0MsTUFBTU0sT0FBTixDQUFjUCxRQUFkLENBQUgsRUFBMkI7QUFDNUIscUJBQUt6RSxLQUFMLENBQVd5RSxRQUFYLEdBQW9CLElBQUlRLEdBQUosQ0FBUVIsUUFBUixDQUFwQjtBQUNILGFBRkksTUFHRCxLQUFLekUsS0FBTCxDQUFXeUUsUUFBWCxHQUFvQixJQUFJUSxHQUFKLEVBQXBCO0FBRVA7OztpQ0FDTztBQUFBLDBCQUNnQyxLQUFLN0MsS0FEckM7QUFBQSxnQkFDQThDLEtBREEsV0FDQUEsS0FEQTtBQUFBLGdCQUNPQyxLQURQLFdBQ09BLEtBRFA7QUFBQSxnQkFDY0MsUUFEZCxXQUNjQSxRQURkO0FBQUEsZ0JBQ3dCTCxNQUR4QixXQUN3QkEsTUFEeEI7QUFBQSxnQkFFQ04sUUFGRCxHQUVXLEtBQUt6RSxLQUZoQixDQUVDeUUsUUFGRDtBQUFBLGdCQUdBWSxhQUhBLEdBR2MsRUFBQ2YsU0FBUSxDQUFULEVBQVlnQixhQUFZLHFCQUF4QjtBQUNWQyx1QkFBTSxPQURJLEVBQ0lDLGlCQUFnQixLQURwQixFQUhkO0FBQUEsZ0JBS0FDLGVBTEEsR0FLZ0JoRSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQjJELGFBQWpCLEVBQStCLEVBQUNFLE9BQU0sT0FBUCxFQUFnQkMsaUJBQWdCLGFBQWhDLEVBQS9CLENBTGhCOzs7QUFPSixtQkFBTztBQUFBO0FBQUEsa0JBQUssT0FBTyxFQUFDbEIsU0FBUSxFQUFULEVBQVo7QUFDQztBQUFBO0FBQUE7QUFBT2E7QUFBUCxpQkFERDtBQUVDO0FBQUE7QUFBQSxzQkFBTSxPQUFPLEVBQUNPLE9BQU0sT0FBUCxFQUFlcEIsU0FBUSxTQUF2QixFQUFrQ3FCLFFBQU8scUJBQXpDLEVBQWdFTCxhQUFZLENBQTVFLEVBQWI7QUFDS0osMEJBQU12QixHQUFOLENBQVUsVUFBU2pELENBQVQsRUFBVztBQUFBOztBQUNsQiw0QkFBRyxPQUFPQSxDQUFQLElBQVcsUUFBZCxFQUNJLE9BQU9BLENBQVA7QUFDSkEsNEJBQUVBLEVBQUUwQyxJQUFGLEVBQUY7QUFDQSwrQkFBUTtBQUFBO0FBQUE7QUFDSixxQ0FBSzFDLENBREQ7QUFFSix5Q0FBUztBQUFBLDJDQUFJLE9BQUtrRixRQUFMLENBQWNsRixDQUFkLENBQUo7QUFBQSxpQ0FGTDtBQUdKLHVDQUFPLENBQUNxRSxTQUFTTixZQUFVL0QsQ0FBbkIsR0FBdUIrRCxTQUFTb0IsR0FBVCxDQUFhbkYsQ0FBYixDQUF4QixJQUEyQzJFLGFBQTNDLEdBQTJESSxlQUg5RDtBQUlIL0U7QUFKRyx5QkFBUjtBQUtILHFCQVRVLENBU1RvRixJQVRTLENBU0osSUFUSSxDQUFWO0FBREw7QUFGRCxhQUFQO0FBZUg7OztpQ0FDUUMsSSxFQUFXO0FBQUEsZ0JBQUxyRixDQUFLLHVFQUFILEVBQUc7QUFDYixnQkFBQ3FFLE1BQUQsR0FBUyxLQUFLM0MsS0FBZCxDQUFDMkMsTUFBRDtBQUFBLGdCQUNFTixRQURGLEdBQ1ksS0FBS3pFLEtBRGpCLENBQ0V5RSxRQURGOzs7QUFHSCxnQkFBR00sTUFBSCxFQUNJLEtBQUsxQixRQUFMLENBQWMsRUFBQ29CLFVBQVVBLFlBQVVzQixJQUFWLEdBQWlCQyxTQUFqQixHQUE2QkQsSUFBeEMsRUFBZCxFQURKLEtBRUk7QUFDQXRCLHlCQUFTQSxTQUFTb0IsR0FBVCxDQUFhRSxJQUFiLElBQXFCLFFBQXJCLEdBQWdDLEtBQXpDLEVBQWdEQSxJQUFoRDtBQUNBLHFCQUFLMUMsUUFBTCxDQUFjLEVBQUNvQixVQUFTQSxRQUFWLEVBQWQ7QUFDSDtBQUNKOzs7Ozs7QUFqRENJLFUsQ0FtREVvQixZLEdBQWEsRUFBQ2xCLFFBQU8sS0FBUixFOztJQUdmbUIsSTs7Ozs7Ozs7Ozs7aUNBQ007QUFBQSxzQ0FDb0IsS0FBSzlELEtBRHpCLENBQ0MrRCxLQURELENBQ1EvRixNQURSO0FBQUEsZ0JBQ1FBLE1BRFIsdUNBQ2UsRUFEZjs7QUFFSixvQkFBT0EsT0FBT25CLE1BQWQ7QUFDQSxxQkFBSyxDQUFMO0FBQ0ksMkJBQU8sS0FBS21ILE9BQUwsRUFBUDtBQUNKLHFCQUFLLENBQUw7QUFDQSxxQkFBSyxDQUFMO0FBQ0ksMkJBQU8sS0FBS0MsT0FBTCxFQUFQO0FBQ0o7QUFDSSwyQkFBTyxLQUFLQyxPQUFMLEVBQVA7QUFQSjtBQVNIOzs7a0NBRVE7QUFBQTs7QUFBQSwwQkFDaUIsS0FBS2xFLEtBRHRCO0FBQUEsZ0JBQ0ErRCxLQURBLFdBQ0FBLEtBREE7QUFBQSxnQkFDU0ksTUFEVDs7QUFFTCxtQkFDSTtBQUFBO0FBQUEsMkJBQUssV0FBVSxpQkFBZixJQUFxQ0EsTUFBckMsSUFBNkMsU0FBUztBQUFBLCtCQUFJLE9BQUtDLFFBQUwsRUFBSjtBQUFBLHFCQUF0RDtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLE9BQWY7QUFBd0JMLDBCQUFNM0Q7QUFBOUIsaUJBREo7QUFFSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxTQUFmO0FBQTBCMkQsMEJBQU1NO0FBQWhDLGlCQUZKO0FBR0sscUJBQUtDLEtBQUwsQ0FBV1AsS0FBWDtBQUhMLGFBREo7QUFPSDs7O2tDQUNRO0FBQUE7O0FBQUEsMEJBQ2lCLEtBQUsvRCxLQUR0QjtBQUFBLGdCQUNBK0QsS0FEQSxXQUNBQSxLQURBO0FBQUEsZ0JBQ1NJLE1BRFQ7O0FBRUwsbUJBQ0k7QUFBQTtBQUFBLDJCQUFLLFdBQVUsaUJBQWYsSUFBcUNBLE1BQXJDLElBQTZDLFNBQVM7QUFBQSwrQkFBSSxPQUFLQyxRQUFMLEVBQUo7QUFBQSxxQkFBdEQ7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxRQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsT0FBZjtBQUF3Qkwsa0NBQU0zRDtBQUE5Qix5QkFESjtBQUVLLDZCQUFLa0UsS0FBTCxDQUFXUCxLQUFYO0FBRkwscUJBREo7QUFLSTtBQUFBO0FBQUEsMEJBQUssV0FBVSxRQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUssbUVBQUssS0FBS0EsTUFBTS9GLE1BQU4sQ0FBYSxDQUFiLENBQVY7QUFBTDtBQURKO0FBTEo7QUFESixhQURKO0FBYUg7OztrQ0FFUTtBQUFBOztBQUFBLDBCQUNpQixLQUFLZ0MsS0FEdEI7QUFBQSxnQkFDQStELEtBREEsV0FDQUEsS0FEQTtBQUFBLGdCQUNTSSxNQURUOztBQUVMLG1CQUNJO0FBQUE7QUFBQSwyQkFBSyxXQUFVLGlCQUFmLElBQXFDQSxNQUFyQyxJQUE2QyxTQUFTO0FBQUEsK0JBQUksUUFBS0MsUUFBTCxFQUFKO0FBQUEscUJBQXREO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsT0FBZjtBQUF3QkwsMEJBQU0zRDtBQUE5QixpQkFESjtBQUVJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFFBQWY7QUFDSTtBQUFBO0FBQUE7QUFBSywrREFBSyxLQUFLMkQsTUFBTS9GLE1BQU4sQ0FBYSxDQUFiLENBQVY7QUFBTCxxQkFESjtBQUVJO0FBQUE7QUFBQTtBQUFLLCtEQUFLLEtBQUsrRixNQUFNL0YsTUFBTixDQUFhLENBQWIsQ0FBVjtBQUFMLHFCQUZKO0FBR0k7QUFBQTtBQUFBO0FBQUssK0RBQUssS0FBSytGLE1BQU0vRixNQUFOLENBQWEsQ0FBYixDQUFWO0FBQUw7QUFISixpQkFGSjtBQU9DLHFCQUFLc0csS0FBTCxDQUFXUCxLQUFYO0FBUEQsYUFESjtBQVdIOzs7OEJBRUtBLEssRUFBTTtBQUNSLGdCQUFJUSxPQUFLLHdCQUFTUixNQUFNUyxTQUFOLElBQWlCVCxNQUFNVSxTQUFoQyxDQUFUOztBQUVBLGdCQUFJQyxNQUFJWCxNQUFNWSxJQUFOLEdBQWM7QUFBQTtBQUFBO0FBQUssc0VBQUw7QUFBb0JaLHNCQUFNWTtBQUExQixhQUFkLEdBQXVELElBQS9EO0FBQ0EsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsTUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFPSjtBQUFQLGlCQURKO0FBRUtHO0FBRkwsYUFESjtBQU1IOzs7bUNBQ1M7QUFDTixpQkFBS2xFLE9BQUwsQ0FBYUQsTUFBYixDQUFvQnFFLElBQXBCLENBQXlCLEVBQUNDLDBCQUF1QixLQUFLN0UsS0FBTCxDQUFXK0QsS0FBWCxDQUFpQm5GLEdBQXpDLEVBQStDaEIsT0FBTSxFQUFDRSxXQUFVLEtBQUtrQyxLQUFMLENBQVcrRCxLQUF0QixFQUFyRCxFQUF6QjtBQUNIOzs7Ozs7QUFyRUNELEksQ0FzRUV0QyxZLEdBQWEsRUFBQ2pCLFFBQU8saUJBQVVrQixNQUFsQixFO0FBSWQsSUFBTXFELDRCQUFRLFNBQVJBLE9BQVEsUUFBdUY7QUFBQSxRQUFyRmxHLEdBQXFGLFNBQXJGQSxHQUFxRjtBQUFBLFFBQWhGd0IsS0FBZ0YsU0FBaEZBLEtBQWdGO0FBQUEsUUFBekVqQyxPQUF5RSxTQUF6RUEsT0FBeUU7QUFBQSxRQUFoRWtHLE9BQWdFLFNBQWhFQSxPQUFnRTtBQUFBLFFBQXZERyxTQUF1RCxTQUF2REEsU0FBdUQ7QUFBQSwrQkFBNUN4QyxRQUE0QztBQUFBLFFBQTVDQSxRQUE0QyxrQ0FBbkMsRUFBbUM7QUFBQSwrQkFBL0IrQyxRQUErQjtBQUFBLFFBQS9CQSxRQUErQixrQ0FBdEIsRUFBc0I7QUFBQSxRQUFsQkMsTUFBa0IsU0FBbEJBLE1BQWtCO0FBQUEsUUFBVkMsTUFBVSxTQUFWQSxNQUFVOztBQUMzRzlHLGNBQVEsdUNBQUsseUJBQXlCLEVBQUMrRyxRQUFPL0csT0FBUixFQUE5QixHQUFSOztBQUVBLFFBQUdrRyxXQUFXYyxTQUFPLElBQXJCLEVBQTBCO0FBQ3pCaEgsa0JBQ0M7QUFBQTtBQUFBLGNBQVMsTUFBTWdILElBQWY7QUFDQztBQUFBO0FBQUE7QUFBVWQ7QUFBVixhQUREO0FBRUVsRztBQUZGLFNBREQ7QUFNQTs7QUFFRCxRQUFJaUgsY0FBWSxJQUFoQjtBQUNBLFFBQUd4RyxHQUFILEVBQU87QUFDTndHLHNCQUFZLENBQ1Y7QUFBQTtBQUFBLGNBQUksS0FBSSxPQUFSO0FBQWdCO0FBQUE7QUFBQSxrQkFBTSxvQkFBa0J4RyxHQUF4QjtBQUFnQ3dCO0FBQWhDO0FBQWhCLFNBRFUsRUFFVjtBQUFBO0FBQUEsY0FBRyxLQUFJLFFBQVA7QUFDQzZFLG1CQUFPSSxJQURSO0FBQUE7QUFDZ0I7QUFBQTtBQUFBO0FBQU8sd0NBQVNiLFNBQVQ7QUFBUDtBQURoQixTQUZVLENBQVo7QUFNQSxLQVBELE1BT007QUFDTFksc0JBQWE7QUFBQTtBQUFBLGNBQUksS0FBSSxPQUFSO0FBQWlCaEY7QUFBakIsU0FBYjtBQUNBOztBQUVELFFBQUc0RSxNQUFILEVBQ0NBLFNBQVEsdUNBQUssS0FBS0EsTUFBVixHQUFSOztBQUVELFdBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQVNBO0FBQVQsU0FERDtBQUVDO0FBQUE7QUFBQTtBQUNFSSx1QkFERjtBQUVDO0FBQUE7QUFBQTtBQUNFcEQseUJBQVNzRCxJQUFULENBQWMsSUFBZCxDQURGO0FBQUE7QUFDd0JQLHlCQUFTTyxJQUFULENBQWMsSUFBZDtBQUR4QjtBQUZELFNBRkQ7QUFRQztBQUFBO0FBQUE7QUFDRW5IO0FBREY7QUFSRCxLQUREO0FBY0EsQ0F6Q007O2tCQTJDUWtCLE9BQU9DLE1BQVAsQ0FBY1EsVUFBZCxFQUF5QixFQUFDdEQsY0FBRCxFQUFTb0QsZ0JBQVQsRUFBekIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSSwgRU5USVRJRVN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtub3JtYWxpemUsIGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7SWNvbkJ1dHRvbiwgQXBwQmFyLCBUZXh0RmllbGQsIFBhcGVyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uVGh1bWJ1cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi90aHVtYi11cFwiXG5pbXBvcnQgSWNvblNlYXJjaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZWFyY2hcIlxuaW1wb3J0IEljb25CYWNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCBkYktub3dsZWRnZSBmcm9tICcuLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQge3JlbGF0aXZlfSBmcm9tICcuLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IEZsb2F0aW5nQWRkIGZyb20gXCIuLi9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZFwiXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uL3NlbGVjdG9yXCJcbmltcG9ydCB7QUNUSU9OIGFzIFRBU0tfQUNUSU9OfSBmcm9tIFwiLi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9pbmZvJ1xuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9leHRyYWN0J1xuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHksIGZpbGVTZWxlY3Rvcn09VUlcblxuY29uc3Qge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuY29uc3QgRE9NQUlOPVwia25vd2xlZGdlXCJcbmNvbnN0IElOSVRfU1RBVEU9e1xuXHRrbm93bGVkZ2VzOltdXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcbiAgICBGRVRDSDogcXVlcnk9PmRpc3BhdGNoPT5kYktub3dsZWRnZS5maW5kKHF1ZXJ5KVxuICAgICAgICAuZmV0Y2goa25vd2xlZGdlcz0+e1xuXHRcdFx0aWYoa25vd2xlZGdlcyAmJiBrbm93bGVkZ2VzLmxlbmd0aCl7XG5cdFx0XHRcdGxldCBkYXRhPW5vcm1hbGl6ZShrbm93bGVkZ2VzLCBhcnJheU9mKGRiS25vd2xlZGdlLnNjaGVtYSkpXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGRhdGEuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAsIHBheWxvYWQ6ZGF0YS5yZXN1bHR9KVxuXHRcdFx0fVxuICAgICAgICB9KVxuICAgICxTRUxFQ1RfRE9DWDogYT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuXHRcdC50aGVuKGZpbGU9PmV4dHJhY3QoZmlsZSkpXG4gICAgICAgIC50aGVuKGRvY3g9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9zZWxlY3RlZERvY3hgLHBheWxvYWQ6ZG9jeH0pKVxuXG4gICAgLENSRUFURTogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBkb2N4PXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcbiAgICAgICAgY29uc3Qge2tub3dsZWRnZX09ZG9jeFxuXHRcdGNvbnN0IHBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cdFx0bGV0IHVwc2VydGVkPW51bGxcblx0XHRpZihwaG90b3MubGVuZ3RoKXtcblx0XHRcdGtub3dsZWRnZS5jb250ZW50PVwiXCJcblx0XHRcdHVwc2VydGVkPWRiS25vd2xlZGdlLnVwc2VydChrbm93bGVkZ2UpLnRoZW4oYT0+e1xuXHRcdFx0XHRyZXR1cm4gZG9jeC51cGxvYWQoYSkudGhlbigoe2NvbnRlbnQsdGVtcGxhdGV9KT0+e1xuXHRcdFx0XHRcdGEucGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcblx0XHRcdFx0XHRhLmNvbnRlbnQ9Y29udGVudFxuXHRcdFx0XHRcdGEudGVtcGxhdGU9dGVtcGxhdGVcblx0XHRcdFx0XHRyZXR1cm4gZGJLbm93bGVkZ2UudXBzZXJ0KGEpXG5cdFx0XHRcdH0sIGE9Pntcblx0XHRcdFx0XHRkYktub3dsZWRnZS5yZW1vdmUoa25vd2xlZGdlKVxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhKVxuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdHVwc2VydGVkPWRiS25vd2xlZGdlLnVwc2VydChrbm93bGVkZ2UpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVwc2VydGVkLnRoZW4oa25vd2xlZGdlPT57XG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoa25vd2xlZGdlLGRiS25vd2xlZGdlLnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgfSlcblx0XHRcdHJldHVybiBrbm93bGVkZ2Vcblx0XHR9KVxuICAgIH1cblx0LEZFVENIMTogYT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgX2lkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxuXHRcdGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZH0sIGtub3dsZWRnZT0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGtub3dsZWRnZSxkYktub3dsZWRnZS5zY2hlbWEpLmVudGl0aWVzKSkpXG5cdH1cblx0LFVQREFURTogYT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgZG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG4gICAgICAgIGNvbnN0IHtrbm93bGVkZ2U6bmV3VmVyc2lvbn09ZG9jeFxuXHRcdGNvbnN0IHBob3Rvcz1kb2N4LmdldFBob3RvcygpXG5cblx0XHRjb25zdCBpZD1zdGF0ZS5yb3V0aW5nLnBhcmFtcy5faWRcblx0XHRjb25zdCBjdXJyZW50PXN0YXRlLmVudGl0aWVzW2RiS25vd2xlZGdlLnNjaGVtYS5nZXRLZXkoKV1baWRdXG5cblx0XHRsZXQgdXBzZXJ0ZWQ9bnVsbFxuXHRcdGlmKHBob3Rvcy5sZW5ndGgpe1xuXHRcdFx0dXBzZXJ0ZWQ9ZG9jeC51cGxvYWQoY3VycmVudCkudGhlbihjb250ZW50PT57XG5cdFx0XHRcdGN1cnJlbnQucGhvdG9zPWRvY3guZ2V0UGhvdG9zKClcblx0XHRcdFx0Y3VycmVudC5jb250ZW50PWNvbnRlbnRcblx0XHRcdFx0cmV0dXJuIGRiS25vd2xlZGdlLnVwc2VydChjdXJyZW50KVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdHVwc2VydGVkPWRiS25vd2xlZGdlLnVwc2VydChPYmplY3QuYXNzaWduKHt9LGN1cnJlbnQsIG5ld1ZlcnNpb24pKVxuXHRcdH1cblxuXHRcdHJldHVybiB1cHNlcnRlZC50aGVuKGtub3dsZWRnZT0+e1xuXHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGtub3dsZWRnZSxkYktub3dsZWRnZS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pXG5cdFx0XHRyZXR1cm4ga25vd2xlZGdlXG5cdFx0fSlcblx0fVxuXHQsQ0FOQ0VMOiBhPT4oe3R5cGU6YEBAJHtET01BSU59L2NhbmNlbGB9KVxuXHQsVEFTSzogKGtub3dsZWRnZSk9PmRpc3BhdGNoPT5kaXNwYXRjaChUQVNLX0FDVElPTi5BREQoa25vd2xlZGdlKSlcblx0LFVOVEFTSzogKGtub3dsZWRnZSk9PmRpc3BhdGNoPT5kaXNwYXRjaChUQVNLX0FDVElPTi5SRU1PVkUoa25vd2xlZGdlKSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUsIHt0eXBlLCBwYXlsb2FkfSk9PntcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtrbm93bGVkZ2VzOnBheWxvYWR9KVxuXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vc2VsZWN0ZWREb2N4YDpcbiAgICAgICAgaWYoc3RhdGUuc2VsZWN0ZWREb2N4KVxuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWREb2N4LnJldm9rZSgpXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzZWxlY3RlZERvY3g6cGF5bG9hZH0pXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG5cdGNhc2UgYEBAJHtET01BSU59L3VwZGF0ZWRgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS9jYW5jZWxgOlxuXHRcdGlmKHN0YXRlLnNlbGVjdGVkRG9jeCl7XG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZERvY3gucmV2b2tlKClcblx0XHRcdGRlbGV0ZSBzdGF0ZS5zZWxlY3RlZERvY3hcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSlcblx0XHR9XG5cdFx0YnJlYWtcblxuICAgIH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjbGFzcyBLbm93bGVkZ2VzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17ZmlsdGVyOm51bGx9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeT17fX0sIGRpc3BhdGNofT10aGlzLnByb3BzXG4gICAgICAgIGRpc3BhdGNoKEFDVElPTi5GRVRDSChxdWVyeSkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeX19PXRoaXMucHJvcHNcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uOntxdWVyeTpuZXh0UXVlcnl9LCBkaXNwYXRjaH09bmV4dFxuICAgICAgICBpZihxdWVyeS50aXRsZSE9bmV4dFF1ZXJ5LlRpdGxlKVxuICAgICAgICAgICAgZGlzcGF0Y2goQUNJT04uRkVUQ0gobmV4dC5sb2NhdGlvbi5xdWVyeSkpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuICAgICAgICBjb25zdCB7a25vd2xlZGdlc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtmaWx0ZXJ9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IHJlZlNlYXJjaD1udWxsXG4gICAgICAgIGNvbnN0IHNlYXJjaD10aXRsZT0+e1xuXHRcdFx0cm91dGVyLnJlcGxhY2UoZW5jb2RlVVJJKGAva25vd2xlZGdlP3F1ZXJ5PSR7SlNPTi5zdHJpbmdpZnkoe3RpdGxlOnJlZlNlYXJjaC5nZXRWYWx1ZSgpLnRyaW0oKX0pfWApKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOm51bGx9KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cdFx0XHRcdDxQYXBlcj5cblx0XHRcdFx0XHQ8QXBwQmFyXG5cdFx0XHRcdFx0XHRpY29uRWxlbWVudExlZnQ9e3RoaXMuZ2V0TGVmdEVsZW1lbnQoKX1cblx0XHRcdFx0XHRcdGljb25FbGVtZW50UmlnaHQ9ezxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnNlYXJjaCgpfT48SWNvblNlYXJjaC8+PC9JY29uQnV0dG9uPn1cblx0XHRcdFx0XHRcdHRpdGxlPXs8VGV4dEZpZWxkIHJlZj17YT0+cmVmU2VhcmNoPWF9XG5cdFx0XHRcdFx0XHRcdGhpbnRUZXh0PVwi5p+l6K+iXCJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHZhbHVlKT0+dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT0xMyAmJiBzZWFyY2goKX1cblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvUGFwZXI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7a25vd2xlZGdlcy5maWx0ZXIoYT0+ZmlsdGVyID8gLTEhPWEudGl0bGUuaW5kZXhPZihmaWx0ZXIpIDogdHJ1ZSkubWFwKGE9PjxJdGVtIG1vZGVsPXthfSBrZXk9e2EuX2lkfS8+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdGdldExlZnRFbGVtZW50KCl7XG5cdFx0cmV0dXJuICg8c3Bhbi8+KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG5cbiAgICBzdGF0aWMgQ3JlYXRhYmxlPWNsYXNzIGV4dGVuZHMgS25vd2xlZGdlc3tcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICBjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdBZGRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKS50aGVuKGE9PnJvdXRlci5yZXBsYWNlKCcva25vd2xlZGdlL2NyZWF0ZScpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmk9e3RydWV9Lz5cbiAgICAgICAgICAgICAgICAgICAge3N1cGVyLnJlbmRlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxuXG5cdHN0YXRpYyBDb3Vyc2U9Y2xhc3MgZXh0ZW5kcyBLbm93bGVkZ2Vze1xuXHRcdGdldExlZnRFbGVtZW50KCl7XG5cdFx0XHRyZXR1cm4gKDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9PjxJY29uQmFjay8+PC9JY29uQnV0dG9uPilcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgU2VhcmNoIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7YWdlLGdlbmRlcixjYXRlZ29yeX09dGhpcy5wcm9wcy5xdWVyeXx8e31cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImFnZVwiIGtleT1cIkFnZVwiIGxhYmVsPVwiQWdlIChZZWFyKVwiIHNpbmdsZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17YWdlfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIjAuNSwgMSwgMiwgMywgNCwgNSwgNiwgOCwgMTBcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJnZW5kZXJcIiBrZXk9XCJHZW5kZXJcIiBsYWJlbD1cIkdlbmRlclwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2dlbmRlcn1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJHaXJsLEJveVwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImNhdGVnb3J5XCIga2V5PVwiQ2F0ZWdvcnlcIiBsYWJlbD1cIkNhdGVnb3J5XCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiT2JzZXJ2ZSwgU3R1ZHksIFNwb3J0XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPGRpdiBrZXk9XCJhY3Rpb25zXCIgc3R5bGU9e3twYWRkaW5nOjEwLCB0ZXh0QWxpZ246J2NlbnRlcid9fT5cbiAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIHByaW1hcnk9e3RydWV9IG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdHZhciBhZ2U9dGhpcy5yZWZzLmFnZS5zdGF0ZS5zZWxlY3RlZCxcblx0XHRcdFx0XHRcdFx0Z2VuZGVyPUFycmF5LmZyb20odGhpcy5yZWZzLmdlbmRlci5zdGF0ZS5zZWxlY3RlZCksXG5cdFx0XHRcdFx0XHRcdGNhdGVnb3J5PUFycmF5LmZyb20odGhpcy5yZWZzLmNhdGVnb3J5LnN0YXRlLnNlbGVjdGVkKVxuXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLm9uU2VhcmNoKHthZ2UsZ2VuZGVyLGNhdGVnb3J5fSlcblx0XHRcdFx0XHR9fT5TZWFyY2g8L1JhaXNlZEJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXG4gICAgICAgIF1cbiAgICB9XG59XG5cbmNsYXNzIENoZWNrR3JvdXAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHRoaXMucHJvcHMpXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG4gICAgICAgIHZhciB7c2VsZWN0ZWQsIHNpbmdsZX09bmV4dFxuICAgICAgICB0aGlzLnN0YXRlPXt9XG4gICAgICAgIGlmKHNpbmdsZSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9c2VsZWN0ZWQ7XG4gICAgICAgIGVsc2UgaWYoQXJyYXkuaXNBcnJheShzZWxlY3RlZCkpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KHNlbGVjdGVkKVxuICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1uZXcgU2V0KClcblxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFye2l0ZW1zLCBsYWJlbCwgb25DaGFuZ2UsIHNpbmdsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkU3R5bGU9e3BhZGRpbmc6NSwgYm9yZGVyUmlnaHQ6JzFweCBzb2xpZCBsaWdodGdyYXknLFxuICAgICAgICAgICAgICAgIGNvbG9yOid3aGl0ZScsYmFja2dyb3VuZENvbG9yOidyZWQnfSxcbiAgICAgICAgICAgIHVuc2VsZWN0ZWRTdHlsZT1PYmplY3QuYXNzaWduKHt9LHNlbGVjdGVkU3R5bGUse2NvbG9yOidibGFjaycsIGJhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnfSk7XG5cbiAgICAgICAgcmV0dXJuKDxkaXYgc3R5bGU9e3twYWRkaW5nOjEwfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2Zsb2F0OidyaWdodCcscGFkZGluZzonNXB4IDBweCcsIGJvcmRlcjonMXB4IHNvbGlkIGxpZ2h0Z3JheScsIGJvcmRlclJpZ2h0OjB9fT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihhKSE9J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhPWEudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdChhKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17KHNpbmdsZSA/IHNlbGVjdGVkPT1hIDogc2VsZWN0ZWQuaGFzKGEpKSA/IHNlbGVjdGVkU3R5bGUgOiB1bnNlbGVjdGVkU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthfTwvc3Bhbj4pXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+KVxuICAgIH1cbiAgICBvblNlbGVjdChpdGVtLCBhPXt9KXtcbiAgICAgICAgdmFye3NpbmdsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZTtcblxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWQ9PWl0ZW0gPyB1bmRlZmluZWQgOiBpdGVtfSk7XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzZWxlY3RlZFtzZWxlY3RlZC5oYXMoaXRlbSkgPyAnZGVsZXRlJyA6ICdhZGQnXShpdGVtKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6c2VsZWN0ZWR9KVxuICAgICAgICB9XG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e3NpbmdsZTpmYWxzZX1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDp7cGhvdG9zPVtdfX09dGhpcy5wcm9wc1xuICAgICAgICBzd2l0Y2gocGhvdG9zLmxlbmd0aCl7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8wcGhvdG8oKVxuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8xcGhvdG8oKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzNwaG90bygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfMHBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMFwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdW1tYXJ5XCI+e21vZGVsLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgXzFwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzFcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF8zcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8zXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzFdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1syXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfbW9yZShtb2RlbCl7XG4gICAgICAgIHZhciB0aW1lPXJlbGF0aXZlKG1vZGVsLmNyZWF0ZWRBdHx8bW9kZWwudXBkYXRlZEF0KVxuXG4gICAgICAgIHZhciB6YW49bW9kZWwuemFucyA/ICg8ZGl2PjxJY29uVGh1bWJ1cC8+e21vZGVsLnphbnN9PC9kaXY+KSA6IG51bGxcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9yZVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lPnt0aW1lfTwvdGltZT5cbiAgICAgICAgICAgICAgICB7emFufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25EZXRhaWwoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpgL2tub3dsZWRnZS8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsc3RhdGU6e2tub3dsZWRnZTp0aGlzLnByb3BzLm1vZGVsfX0pXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cbn1cblxuXG5leHBvcnQgY29uc3QgQ29udGVudD0oe19pZCwgdGl0bGUsIGNvbnRlbnQsIHN1bW1hcnksIGNyZWF0ZWRBdCwgY2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmUsIGF1dGhvcn0pPT57XG5cdGNvbnRlbnQ9PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDpjb250ZW50fX0vPlxuXG5cdGlmKHN1bW1hcnkgJiYgb3BlbiE9PW51bGwpe1xuXHRcdGNvbnRlbnQ9KFxuXHRcdFx0PGRldGFpbHMgb3Blbj17b3Blbn0+XG5cdFx0XHRcdDxzdW1tYXJ5PntzdW1tYXJ5fTwvc3VtbWFyeT5cblx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHQ8L2RldGFpbHM+XG5cdFx0KVxuXHR9XG5cblx0bGV0IG5vdE5ld1N0dWZmPW51bGxcblx0aWYoX2lkKXtcblx0XHRub3ROZXdTdHVmZj1bXG5cdFx0XHQoPGgxIGtleT1cImxpbmswXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7X2lkfWB9Pnt0aXRsZX08L0xpbms+PC9oMT4pLFxuXHRcdFx0KDxwIGtleT1cImF1dGhvclwiPlxuXHRcdFx0XHR7YXV0aG9yLm5hbWV9IC0gPHRpbWU+e3JlbGF0aXZlKGNyZWF0ZWRBdCl9PC90aW1lPlxuXHRcdFx0PC9wPilcblx0XHRdXG5cdH1lbHNlIHtcblx0XHRub3ROZXdTdHVmZj0oPGgxIGtleT1cImxpbmsxXCI+e3RpdGxlfTwvaDE+KVxuXHR9XG5cblx0aWYoZmlndXJlKVxuXHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlPlxuXHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxuXHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0e25vdE5ld1N0dWZmfVxuXHRcdFx0XHQ8cD5cblx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuXHRcdFx0XHQ8L3A+XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHR7Y29udGVudH1cblx0XHRcdDwvc2VjdGlvbj5cblx0XHQ8L2FydGljbGU+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihLbm93bGVkZ2VzLHtBQ1RJT04sIFJFRFVDRVJ9KVxuIl19