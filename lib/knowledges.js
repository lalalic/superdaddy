'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _materialUi = require('material-ui');

var _dialpad = require('material-ui/svg-icons/communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

var _thumbUp = require('material-ui/svg-icons/action/thumb-up');

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _create = require('material-ui/svg-icons/content/create');

var _create2 = _interopRequireDefault(_create);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _calendar = require('./components/calendar');

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

    function Knowledges(p) {
        _classCallCheck(this, Knowledges);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Knowledges).call(this, p));

        _this.state = { model: _knowledge2.default.find(_this.props.location.query) };
        return _this;
    }

    _createClass(Knowledges, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var model = this.state.model;
            var _props$location$query = this.props.location.query;
            var query = _props$location$query === undefined ? {} : _props$location$query;

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(List, {
                    ref: 'list',
                    model: model,
                    empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_dialpad2.default, null), text: 'No knowledge yet, Please stay tune' }),
                    pageSize: 20,
                    template: Item }),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar centerinput',
                    primary: 'Create',
                    items: [_qiliApp.React.createElement('input', {
                        ref: 'byTitle',
                        type: 'search',
                        placeholder: 'Search',
                        defaultValue: query.title,
                        style: { fontSize: 14, padding: 10 },
                        onFocus: function onFocus(e) {
                            return _this2.refs.search.show();
                        } }), { action: "Create", icon: _create2.default }],
                    onSelect: function onSelect(cmd) {
                        return _this2.onSelect(cmd);
                    } }),
                _qiliApp.React.createElement(Search, { ref: 'search', onSearch: function onSearch(query) {
                        return _this2.search(query);
                    }, query: query })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            switch (command) {
                case 'Create':
                    this.context.router.push('knowledge');
                    break;
            }
        }
    }, {
        key: 'search',
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
}(_qiliApp.Component);

Knowledges.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Knowledges;

var Search = function (_DialogCommand) {
    _inherits(Search, _DialogCommand);

    function Search() {
        _classCallCheck(this, Search);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
    }

    _createClass(Search, [{
        key: 'renderContent',
        value: function renderContent() {
            var _this4 = this;

            var _ref = this.props.query || {};

            var age = _ref.age;
            var gender = _ref.gender;
            var category = _ref.category;


            return [_qiliApp.React.createElement(CheckGroup, { ref: 'age', key: 'Age', label: 'Age (Year)', single: true,
                selected: age,
                items: "0.5, 1, 2, 3, 4, 5, 6, 8, 10".split(',') }), _qiliApp.React.createElement(CheckGroup, { ref: 'gender', key: 'Gender', label: 'Gender',
                selected: gender,
                items: "Girl,Boy".split(',') }), _qiliApp.React.createElement(CheckGroup, { ref: 'category', key: 'Category', label: 'Category',
                selected: category,
                items: "Observe, Study, Sport".split(',') }), _qiliApp.React.createElement(
                'div',
                { key: 'actions', style: { padding: 10, textAlign: 'center' } },
                _qiliApp.React.createElement(
                    _materialUi.RaisedButton,
                    { primary: true, onClick: function onClick(e) {
                            var age = _this4.refs.age.state.selected,
                                gender = Array.from(_this4.refs.gender.state.selected),
                                category = Array.from(_this4.refs.category.state.selected);

                            _this4.props.onSearch({ age: age, gender: gender, category: category });
                        } },
                    'Search'
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

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckGroup).call(this, props));

        _this5.componentWillReceiveProps(_this5.props);
        return _this5;
    }

    _createClass(CheckGroup, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(next) {
            var selected = next.selected;
            var single = next.single;

            this.state = {};
            if (single) this.state.selected = selected;else if (Array.isArray(selected)) {
                this.state.selected = new Set(selected);
            } else this.state.selected = new Set();
        }
    }, {
        key: 'render',
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

            return _qiliApp.React.createElement(
                'div',
                { style: { padding: 10 } },
                _qiliApp.React.createElement(
                    'span',
                    null,
                    label
                ),
                _qiliApp.React.createElement(
                    'span',
                    { style: { float: 'right', padding: '5px 0px', border: '1px solid lightgray', borderRight: 0 } },
                    items.map(function (a) {
                        var _this6 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return _qiliApp.React.createElement(
                            'span',
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
        key: 'onSelect',
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
}(_qiliApp.Component);

CheckGroup.defaultProps = { single: false };

var Item = function (_Component3) {
    _inherits(Item, _Component3);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
    }

    _createClass(Item, [{
        key: 'render',
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
        key: '_0photo',
        value: function _0photo() {
            var _this8 = this;

            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo0' }, others, { onClick: function onClick() {
                        return _this8.onDetail();
                    } }),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'title' },
                    model.title
                ),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'summary' },
                    model.summary
                ),
                this._more(model)
            );
        }
    }, {
        key: '_1photo',
        value: function _1photo() {
            var _this9 = this;

            var _props3 = this.props;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
                        return _this9.onDetail();
                    } }),
                _qiliApp.React.createElement(
                    'div',
                    null,
                    _qiliApp.React.createElement(
                        'div',
                        { className: 'title' },
                        model.title
                    ),
                    this._more(model)
                ),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'photos' },
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[0] })
                    )
                )
            );
        }
    }, {
        key: '_3photo',
        value: function _3photo() {
            var _this10 = this;

            var _props4 = this.props;
            var model = _props4.model;

            var others = _objectWithoutProperties(_props4, ['model']);

            return _qiliApp.React.createElement(
                'div',
                _extends({ className: 'li inset photo3' }, others, { onClick: function onClick() {
                        return _this10.onDetail();
                    } }),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'title' },
                    model.title
                ),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'photos' },
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[0] })
                    ),
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[1] })
                    ),
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement('img', { src: model.photos[2] })
                    )
                ),
                this._more(model)
            );
        }
    }, {
        key: '_more',
        value: function _more(model) {
            var time = (0, _calendar.relative)(model.createdAt || model.updatedAt);

            var zan = model.zans ? _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(_thumbUp2.default, null),
                model.zans
            ) : null;
            return _qiliApp.React.createElement(
                'div',
                { className: 'more' },
                _qiliApp.React.createElement(
                    'time',
                    null,
                    time
                ),
                zan
            );
        }
    }, {
        key: 'onDetail',
        value: function onDetail() {
            this.context.router.push({ pathname: 'knowledge/' + this.props.model._id, state: { knowledge: this.props.model } });
        }
    }]);

    return Item;
}(_qiliApp.Component);

Item.contextTypes = { router: _qiliApp.React.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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TDtxQkFESjtvQkFFSTs7O3dCQUFLLHNDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFGSjtvQkFHSTs7O3dCQUFLLHNDQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FBTDtxQkFISjtpQkFGSjtnQkFPQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBUEQ7YUFESixDQUZLOzs7OzhCQWVILE9BQU07QUFDUixnQkFBSSxPQUFLLHdCQUFTLE1BQU0sU0FBTixJQUFpQixNQUFNLFNBQU4sQ0FBL0IsQ0FESTs7QUFHUixnQkFBSSxNQUFJLE1BQU0sSUFBTixHQUFjOzs7Z0JBQUsscURBQUw7Z0JBQW9CLE1BQU0sSUFBTjthQUFsQyxHQUF1RCxJQUF2RCxDQUhBO0FBSVIsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNJOzs7b0JBQU8sSUFBUDtpQkFESjtnQkFFSyxHQUZMO2FBREosQ0FKUTs7OzttQ0FXRjtBQUNOLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEVBQUMseUJBQXNCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBdUIsT0FBTSxFQUFDLFdBQVUsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFqQixFQUF2RSxFQURNOzs7O1dBakVSOzs7S0FvRUUsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCIiwiZmlsZSI6Imtub3dsZWRnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge1JhaXNlZEJ1dHRvbixDbGVhckZpeH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvblRodW1idXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdGh1bWItdXBcIlxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2NyZWF0ZVwiXG5cbmltcG9ydCBkYktub3dsZWRnZSBmcm9tICcuL2RiL2tub3dsZWRnZSdcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCB7cmVsYXRpdmV9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcblxuY29uc3Qge0xpc3QsIENvbW1hbmRCYXIsIEVtcHR5fT1VSVxuXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2VzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHApe1xuICAgICAgICBzdXBlcihwKVxuICAgICAgICB0aGlzLnN0YXRlPXttb2RlbDpkYktub3dsZWRnZS5maW5kKHRoaXMucHJvcHMubG9jYXRpb24ucXVlcnkpfVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtxdWVyeT17fX09dGhpcy5wcm9wcy5sb2NhdGlvblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8TGlzdFxuICAgICAgICAgICAgICAgICAgICByZWY9XCJsaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw9e21vZGVsfVxuICAgICAgICAgICAgICAgICAgICBlbXB0eT17PEVtcHR5IGljb249ezxJY29uS25vd2xlZGdlcy8+fSB0ZXh0PVwiTm8ga25vd2xlZGdlIHlldCwgUGxlYXNlIHN0YXkgdHVuZVwiLz59XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplPXsyMH1cbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU9e0l0ZW19Lz5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwiQ3JlYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICg8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJieVRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtxdWVyeS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2ZvbnRTaXplOjE0LHBhZGRpbmc6MTB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e2U9PnRoaXMucmVmcy5zZWFyY2guc2hvdygpfS8+KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJDcmVhdGVcIiwgaWNvbjpJY29uQ3JlYXRlIH1cbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfS8+XG5cblx0XHRcdFx0PFNlYXJjaCByZWY9XCJzZWFyY2hcIiBvblNlYXJjaD17cXVlcnk9PnRoaXMuc2VhcmNoKHF1ZXJ5KX0gcXVlcnk9e3F1ZXJ5fS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ0NyZWF0ZSc6XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ2tub3dsZWRnZScpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoKHByb3BzKXtcbiAgICAgICAgdGhpcy5yZWZzLnNlYXJjaC5kaXNtaXNzKClcbiAgICAgICAgdmFyIHt2YWx1ZTp0aXRsZT1cIlwifT1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuYnlUaXRsZSlcbiAgICAgICAgdGl0bGU9dGl0bGUudHJpbSgpXG4gICAgICAgIGlmKHRpdGxlLmxlbmd0aClcbiAgICAgICAgICAgIHByb3BzLnRpdGxlPXRpdGxlXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZSh0aGlzLmNvbnRleHQucm91dGVyLmNyZWF0ZVBhdGgoXCJrbm93bGVkZ2VzXCIsIHByb3BzKSlcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FnZSxnZW5kZXIsY2F0ZWdvcnl9PXRoaXMucHJvcHMucXVlcnl8fHt9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJhZ2VcIiBrZXk9XCJBZ2VcIiBsYWJlbD1cIkFnZSAoWWVhcilcIiBzaW5nbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2FnZX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCIwLjUsIDEsIDIsIDMsIDQsIDUsIDYsIDgsIDEwXCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiZ2VuZGVyXCIga2V5PVwiR2VuZGVyXCIgbGFiZWw9XCJHZW5kZXJcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtnZW5kZXJ9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiR2lybCxCb3lcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8Q2hlY2tHcm91cCByZWY9XCJjYXRlZ29yeVwiIGtleT1cIkNhdGVnb3J5XCIgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIk9ic2VydmUsIFN0dWR5LCBTcG9ydFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxkaXYga2V5PVwiYWN0aW9uc1wiIHN0eWxlPXt7cGFkZGluZzoxMCwgdGV4dEFsaWduOidjZW50ZXInfX0+XG4gICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBwcmltYXJ5PXt0cnVlfSBvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHR2YXIgYWdlPXRoaXMucmVmcy5hZ2Uuc3RhdGUuc2VsZWN0ZWQsXG5cdFx0XHRcdFx0XHRcdGdlbmRlcj1BcnJheS5mcm9tKHRoaXMucmVmcy5nZW5kZXIuc3RhdGUuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRjYXRlZ29yeT1BcnJheS5mcm9tKHRoaXMucmVmcy5jYXRlZ29yeS5zdGF0ZS5zZWxlY3RlZClcblxuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5vblNlYXJjaCh7YWdlLGdlbmRlcixjYXRlZ29yeX0pXG5cdFx0XHRcdFx0fX0+U2VhcmNoPC9SYWlzZWRCdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICBdXG4gICAgfVxufVxuXG5jbGFzcyBDaGVja0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh0aGlzLnByb3BzKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICB2YXIge3NlbGVjdGVkLCBzaW5nbGV9PW5leHRcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPXNlbGVjdGVkO1xuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldChzZWxlY3RlZClcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQ9bmV3IFNldCgpXG5cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhcntpdGVtcywgbGFiZWwsIG9uQ2hhbmdlLCBzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZFN0eWxlPXtwYWRkaW5nOjUsIGJvcmRlclJpZ2h0OicxcHggc29saWQgbGlnaHRncmF5JyxcbiAgICAgICAgICAgICAgICBjb2xvcjond2hpdGUnLGJhY2tncm91bmRDb2xvcjoncmVkJ30sXG4gICAgICAgICAgICB1bnNlbGVjdGVkU3R5bGU9T2JqZWN0LmFzc2lnbih7fSxzZWxlY3RlZFN0eWxlLHtjb2xvcjonYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J30pO1xuXG4gICAgICAgIHJldHVybig8ZGl2IHN0eWxlPXt7cGFkZGluZzoxMH19PlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLHBhZGRpbmc6JzVweCAwcHgnLCBib3JkZXI6JzFweCBzb2xpZCBsaWdodGdyYXknLCBib3JkZXJSaWdodDowfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSkhPSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYT1hLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2F9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyhzaW5nbGUgPyBzZWxlY3RlZD09YSA6IHNlbGVjdGVkLmhhcyhhKSkgPyBzZWxlY3RlZFN0eWxlIDogdW5zZWxlY3RlZFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG4gICAgb25TZWxlY3QoaXRlbSwgYT17fSl7XG4gICAgICAgIHZhcntzaW5nbGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7c2VsZWN0ZWR9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6IHNlbGVjdGVkPT1pdGVtID8gdW5kZWZpbmVkIDogaXRlbX0pO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc2VsZWN0ZWRbc2VsZWN0ZWQuaGFzKGl0ZW0pID8gJ2RlbGV0ZScgOiAnYWRkJ10oaXRlbSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOnNlbGVjdGVkfSlcbiAgICAgICAgfVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtzaW5nbGU6ZmFsc2V9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6e3Bob3Rvcz1bXX19PXRoaXMucHJvcHNcbiAgICAgICAgc3dpdGNoKHBob3Rvcy5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMHBob3RvKClcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fMXBob3RvKClcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8zcGhvdG8oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXzBwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzBcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e21vZGVsLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VtbWFyeVwiPnttb2RlbC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIF8xcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPnttb2RlbC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1swXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfM3Bob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvM1wiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57bW9kZWwudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnBob3Rvc1sxXX0vPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxpbWcgc3JjPXttb2RlbC5waG90b3NbMl19Lz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX21vcmUobW9kZWwpe1xuICAgICAgICB2YXIgdGltZT1yZWxhdGl2ZShtb2RlbC5jcmVhdGVkQXR8fG1vZGVsLnVwZGF0ZWRBdClcblxuICAgICAgICB2YXIgemFuPW1vZGVsLnphbnMgPyAoPGRpdj48SWNvblRodW1idXAvPnttb2RlbC56YW5zfTwvZGl2PikgOiBudWxsXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vcmVcIj5cbiAgICAgICAgICAgICAgICA8dGltZT57dGltZX08L3RpbWU+XG4gICAgICAgICAgICAgICAge3phbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YGtub3dsZWRnZS8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsc3RhdGU6e2tub3dsZWRnZTp0aGlzLnByb3BzLm1vZGVsfX0pXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==