'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app');

var React = _require.React;
var Component = _require.Component;
var _require$UI = _require.UI;
var List = _require$UI.List;
var CommandBar = _require$UI.CommandBar;
var Empty = _require$UI.Empty;
var DialogCommand = CommandBar.DialogCommand;

var _require2 = require('material-ui');

var RaisedButton = _require2.RaisedButton;
var ClearFix = _require2.ClearFix;
var dbKnowledge = require('./db/knowledge');
var uiKnowledge = require('./knowledge');

var IconKnowledges = require("material-ui/lib/svg-icons/communication/dialpad");

var Knowledges = function (_Component) {
    _inherits(Knowledges, _Component);

    function Knowledges(p) {
        _classCallCheck(this, Knowledges);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Knowledges).call(this, p));

        _this.state = { model: dbKnowledge.find(_this.props.query) };
        return _this;
    }

    _createClass(Knowledges, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var model = this.state.model;
            var query = this.props.query;

            return React.createElement(
                'div',
                null,
                React.createElement(List, {
                    ref: 'list',
                    model: model,
                    empty: React.createElement(Empty, { icon: React.createElement(IconKnowledges, null), text: 'No knowledge yet, Please stay tune' }),
                    pageSize: 20,
                    template: Item }),
                React.createElement(CommandBar, {
                    className: 'footbar centerinput',
                    primary: 'Create',
                    items: ["Back", React.createElement('input', {
                        ref: 'byTitle',
                        type: 'search',
                        placeholder: 'Search',
                        defaultValue: query.title,
                        style: { fontSize: 14, padding: 10 },
                        onFocus: function onFocus() {
                            return _this2.refs.search.show();
                        } }), { action: "Create", icon: require("material-ui/lib/svg-icons/content/create") }],
                    onSelect: this.onSelect.bind(this) }),
                React.createElement(Search, { ref: 'search', onSearch: function onSearch() {
                        return _this2.search();
                    } })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            switch (command) {
                case 'Create':
                    this.context.router.transitionTo('create');
                    break;
            }
        }
    }, {
        key: 'search',
        value: function search(props) {
            this.refs.search.dismiss();

            var _refs$byTitle$getDOMN = this.refs.byTitle.getDOMNode();

            var _refs$byTitle$getDOMN2 = _refs$byTitle$getDOMN.value;
            var title = _refs$byTitle$getDOMN2 === undefined ? "" : _refs$byTitle$getDOMN2;

            title = title.trim();
            if (title.length) props.title = title;
            this.context.router.replaceWith("knowledges", null, props);
        }
    }]);

    return Knowledges;
}(Component);

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
            var _context$router$getCu = this.context.router.getCurrentQuery();

            var age = _context$router$getCu.age;
            var gender = _context$router$getCu.gender;
            var category = _context$router$getCu.category;

            return [React.createElement(CheckGroup, { ref: 'age', key: 'Age', label: 'Age (Year)', single: true,
                selected: age,
                items: "0.5, 1, 2, 3, 4, 5, 6, 8, 10".split(',') }), React.createElement(CheckGroup, { ref: 'gender', key: 'Gender', label: 'Gender',
                selected: gender,
                items: "Girl,Boy".split(',') }), React.createElement(CheckGroup, { ref: 'category', key: 'Category', label: 'Category',
                selected: category,
                items: "Observe, Study, Sport".split(',') }), React.createElement(
                'div',
                { key: 'actions', style: { padding: 10, textAlign: 'center' } },
                React.createElement(
                    RaisedButton,
                    { primary: true, onClick: this.search.bind(this) },
                    'Search'
                )
            )];
        }
    }, {
        key: 'search',
        value: function search() {
            var onSearch = this.props.onSearch;
            var age = this.refs.age.state.selected;
            var gender = Array.from(this.refs.gender.state.selected);
            var category = Array.from(this.refs.category.state.selected);
            onSearch && onSearch({ age: age, gender: gender, category: category });
        }
    }]);

    return Search;
}(DialogCommand);

Search.contextTypes = { router: React.PropTypes.func };

var CheckGroup = function (_Component2) {
    _inherits(CheckGroup, _Component2);

    function CheckGroup(props) {
        _classCallCheck(this, CheckGroup);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckGroup).call(this, props));

        _this4.componentWillReceiveProps(_this4.props);
        return _this4;
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

            return React.createElement(
                ClearFix,
                { style: { padding: 10 } },
                React.createElement(
                    'span',
                    null,
                    label
                ),
                React.createElement(
                    'span',
                    { style: { float: 'right', padding: '5px 0px', border: '1px solid lightgray', borderRight: 0 } },
                    items.map(function (a) {
                        var _this5 = this;

                        if (typeof a != 'string') return a;
                        a = a.trim();
                        return React.createElement(
                            'span',
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
}(Component);

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
            var _this7 = this;

            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ['model']);

            return React.createElement(
                'div',
                _extends({ className: 'li inset photo0' }, others, { onClick: function onClick() {
                        return _this7.onDetail();
                    } }),
                React.createElement(
                    'h4',
                    null,
                    model.title
                ),
                React.createElement(
                    'p',
                    null,
                    model.summary
                ),
                this._more(model)
            );
        }
    }, {
        key: '_1photo',
        value: function _1photo() {
            var _this8 = this;

            var _props3 = this.props;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ['model']);

            return React.createElement(
                'div',
                _extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
                        return _this8.onDetail();
                    } }),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        model.title
                    ),
                    this._more(model)
                ),
                React.createElement(
                    'div',
                    { className: 'photos' },
                    React.createElement('img', { src: model.photos[0] })
                )
            );
        }
    }, {
        key: '_3photo',
        value: function _3photo() {
            var _this9 = this;

            var _props4 = this.props;
            var model = _props4.model;

            var others = _objectWithoutProperties(_props4, ['model']);

            return React.createElement(
                'div',
                _extends({ className: 'li inset photo3' }, others, { onClick: function onClick() {
                        return _this9.onDetail();
                    } }),
                React.createElement(
                    'h4',
                    null,
                    model.title
                ),
                React.createElement(
                    'div',
                    { className: 'photos' },
                    React.createElement('img', { src: model.photos[0] }),
                    React.createElement('img', { src: model.photos[1] }),
                    React.createElement('img', { src: model.photos[2] })
                ),
                this._more(model)
            );
        }
    }, {
        key: '_more',
        value: function _more(model) {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    model.createdAt || model.updatedAt
                ),
                React.createElement(
                    'div',
                    null,
                    '赞',
                    model.zans
                )
            );
        }
    }, {
        key: 'onDetail',
        value: function onDetail() {
            this.context.router.transitionTo('knowledge', this.props.model);
        }
    }]);

    return Item;
}(Component);

Item.contextTypes = Knowledges.contextTypes = { router: React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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S0FBTjtpQkFEVDtnQkFFSTs7c0JBQUssV0FBVSxRQUFWLEVBQUw7b0JBQ0ksNkJBQUssS0FBSyxNQUFNLE1BQU4sQ0FBYSxDQUFiLENBQUwsRUFBTCxDQURKO29CQUVJLDZCQUFLLEtBQUssTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFMLEVBQUwsQ0FGSjtvQkFHSSw2QkFBSyxLQUFLLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FBTCxFQUFMLENBSEo7aUJBRko7Z0JBT0MsS0FBSyxLQUFMLENBQVcsS0FBWCxDQVBEO2FBREosQ0FGSzs7Ozs4QkFlSCxPQUFNO0FBQ1IsbUJBQ0k7OztnQkFDSTs7O29CQUFNLE1BQU0sU0FBTixJQUFpQixNQUFNLFNBQU47aUJBRDNCO2dCQUVJOzs7O29CQUFPLE1BQU0sSUFBTjtpQkFGWDthQURKLENBRFE7Ozs7bUNBUUY7QUFDTixpQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixZQUFwQixDQUFpQyxXQUFqQyxFQUE2QyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQTdDLENBRE07Ozs7V0E5RFI7RUFBYTs7QUFrRW5CLEtBQUssWUFBTCxHQUFrQixXQUFXLFlBQVgsR0FBd0IsRUFBQyxRQUFPLE1BQU0sU0FBTixDQUFnQixJQUFoQixFQUFoQyIsImZpbGUiOiJrbm93bGVkZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtSZWFjdCxDb21wb25lbnQsVUk6e0xpc3QsIENvbW1hbmRCYXIsIEVtcHR5fX09cmVxdWlyZSgncWlsaS1hcHAnKSxcbiAgICB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhcixcbiAgICB7UmFpc2VkQnV0dG9uLENsZWFyRml4fT1yZXF1aXJlKCdtYXRlcmlhbC11aScpLFxuICAgIGRiS25vd2xlZGdlPXJlcXVpcmUoJy4vZGIva25vd2xlZGdlJyksXG4gICAgdWlLbm93bGVkZ2U9cmVxdWlyZSgnLi9rbm93bGVkZ2UnKTtcblxudmFyIEljb25Lbm93bGVkZ2VzPXJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2VzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHApe1xuICAgICAgICBzdXBlcihwKVxuICAgICAgICB0aGlzLnN0YXRlPXttb2RlbDpkYktub3dsZWRnZS5maW5kKHRoaXMucHJvcHMucXVlcnkpfVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtxdWVyeX09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8TGlzdFxuICAgICAgICAgICAgICAgICAgICByZWY9XCJsaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw9e21vZGVsfVxuICAgICAgICAgICAgICAgICAgICBlbXB0eT17PEVtcHR5IGljb249ezxJY29uS25vd2xlZGdlcy8+fSB0ZXh0PVwiTm8ga25vd2xlZGdlIHlldCwgUGxlYXNlIHN0YXkgdHVuZVwiLz59XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplPXsyMH1cbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU9e0l0ZW19Lz5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwiQ3JlYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICg8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJieVRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtxdWVyeS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2ZvbnRTaXplOjE0LHBhZGRpbmc6MTB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9eygpPT50aGlzLnJlZnMuc2VhcmNoLnNob3coKX0vPiksXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQ3JlYXRlXCIsIGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvY29udGVudC9jcmVhdGVcIil9XG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9Lz5cblxuICAgICAgICAgICAgICAgIDxTZWFyY2ggcmVmPVwic2VhcmNoXCIgb25TZWFyY2g9eygpPT50aGlzLnNlYXJjaCgpfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdDcmVhdGUnOlxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2NyZWF0ZScpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoKHByb3BzKXtcbiAgICAgICAgdGhpcy5yZWZzLnNlYXJjaC5kaXNtaXNzKClcbiAgICAgICAgdmFyIHt2YWx1ZTp0aXRsZT1cIlwifT10aGlzLnJlZnMuYnlUaXRsZS5nZXRET01Ob2RlKClcbiAgICAgICAgdGl0bGU9dGl0bGUudHJpbSgpXG4gICAgICAgIGlmKHRpdGxlLmxlbmd0aClcbiAgICAgICAgICAgIHByb3BzLnRpdGxlPXRpdGxlXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZVdpdGgoXCJrbm93bGVkZ2VzXCIsbnVsbCwgcHJvcHMpXG4gICAgfVxufVxuXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthZ2UsZ2VuZGVyLGNhdGVnb3J5fT10aGlzLmNvbnRleHQucm91dGVyLmdldEN1cnJlbnRRdWVyeSgpXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiYWdlXCIga2V5PVwiQWdlXCIgbGFiZWw9XCJBZ2UgKFllYXIpXCIgc2luZ2xlPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXthZ2V9XG4gICAgICAgICAgICAgICAgaXRlbXM9e1wiMC41LCAxLCAyLCAzLCA0LCA1LCA2LCA4LCAxMFwiLnNwbGl0KCcsJyl9Lz4pLFxuICAgICAgICAgICAgKDxDaGVja0dyb3VwIHJlZj1cImdlbmRlclwiIGtleT1cIkdlbmRlclwiIGxhYmVsPVwiR2VuZGVyXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17Z2VuZGVyfVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtcIkdpcmwsQm95XCIuc3BsaXQoJywnKX0vPiksXG4gICAgICAgICAgICAoPENoZWNrR3JvdXAgcmVmPVwiY2F0ZWdvcnlcIiBrZXk9XCJDYXRlZ29yeVwiIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBpdGVtcz17XCJPYnNlcnZlLCBTdHVkeSwgU3BvcnRcIi5zcGxpdCgnLCcpfS8+KSxcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImFjdGlvbnNcIiBzdHlsZT17e3BhZGRpbmc6MTAsIHRleHRBbGlnbjonY2VudGVyJ319PlxuICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gcHJpbWFyeT17dHJ1ZX0gb25DbGljaz17dGhpcy5zZWFyY2guYmluZCh0aGlzKX0+U2VhcmNoPC9SYWlzZWRCdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICBdXG4gICAgfVxuXG4gICAgc2VhcmNoKCl7XG4gICAgICAgIHZhciB7b25TZWFyY2h9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBhZ2U9dGhpcy5yZWZzLmFnZS5zdGF0ZS5zZWxlY3RlZCxcbiAgICAgICAgICAgIGdlbmRlcj1BcnJheS5mcm9tKHRoaXMucmVmcy5nZW5kZXIuc3RhdGUuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgY2F0ZWdvcnk9QXJyYXkuZnJvbSh0aGlzLnJlZnMuY2F0ZWdvcnkuc3RhdGUuc2VsZWN0ZWQpO1xuICAgICAgICBvblNlYXJjaCAmJiBvblNlYXJjaCh7YWdlOmFnZSxnZW5kZXI6Z2VuZGVyLGNhdGVnb3J5OmNhdGVnb3J5fSlcbiAgICB9XG59XG5cblNlYXJjaC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuY2xhc3MgQ2hlY2tHcm91cCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcbiAgICAgICAgdmFyIHtzZWxlY3RlZCwgc2luZ2xlfT1uZXh0XG4gICAgICAgIHRoaXMuc3RhdGU9e31cbiAgICAgICAgaWYoc2luZ2xlKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZD1zZWxlY3RlZDtcbiAgICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoc2VsZWN0ZWQpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkPW5ldyBTZXQoKVxuXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXJ7aXRlbXMsIGxhYmVsLCBvbkNoYW5nZSwgc2luZ2xlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3NlbGVjdGVkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgc2VsZWN0ZWRTdHlsZT17cGFkZGluZzo1LCBib3JkZXJSaWdodDonMXB4IHNvbGlkIGxpZ2h0Z3JheScsXG4gICAgICAgICAgICAgICAgY29sb3I6J3doaXRlJyxiYWNrZ3JvdW5kQ29sb3I6J3JlZCd9LFxuICAgICAgICAgICAgdW5zZWxlY3RlZFN0eWxlPU9iamVjdC5hc3NpZ24oe30sc2VsZWN0ZWRTdHlsZSx7Y29sb3I6J2JsYWNrJywgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCd9KTtcblxuICAgICAgICByZXR1cm4oPENsZWFyRml4IHN0eWxlPXt7cGFkZGluZzoxMH19PlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLHBhZGRpbmc6JzVweCAwcHgnLCBib3JkZXI6JzFweCBzb2xpZCBsaWdodGdyYXknLCBib3JkZXJSaWdodDowfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSkhPSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYT1hLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2F9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyhzaW5nbGUgPyBzZWxlY3RlZD09YSA6IHNlbGVjdGVkLmhhcyhhKSkgPyBzZWxlY3RlZFN0eWxlIDogdW5zZWxlY3RlZFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvQ2xlYXJGaXg+KVxuICAgIH1cbiAgICBvblNlbGVjdChpdGVtLCBhPXt9KXtcbiAgICAgICAgdmFye3NpbmdsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtzZWxlY3RlZH09dGhpcy5zdGF0ZTtcblxuICAgICAgICBpZihzaW5nbGUpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWQ9PWl0ZW0gPyB1bmRlZmluZWQgOiBpdGVtfSk7XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzZWxlY3RlZFtzZWxlY3RlZC5oYXMoaXRlbSkgPyAnZGVsZXRlJyA6ICdhZGQnXShpdGVtKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6c2VsZWN0ZWR9KVxuICAgICAgICB9XG4gICAgfVxufVxuQ2hlY2tHcm91cC5kZWZhdWx0UHJvcHM9e3NpbmdsZTpmYWxzZX1cblxuY2xhc3MgSXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDp7cGhvdG9zPVtdfX09dGhpcy5wcm9wc1xuICAgICAgICBzd2l0Y2gocGhvdG9zLmxlbmd0aCl7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8wcGhvdG8oKVxuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8xcGhvdG8oKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXzNwaG90bygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfMHBob3RvKCl7XG4gICAgICAgIHZhciB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpIGluc2V0IHBob3RvMFwiIHsuLi5vdGhlcnN9IG9uQ2xpY2s9eygpPT50aGlzLm9uRGV0YWlsKCl9PlxuICAgICAgICAgICAgICAgIDxoND57bW9kZWwudGl0bGV9PC9oND5cbiAgICAgICAgICAgICAgICA8cD57bW9kZWwuc3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAge3RoaXMuX21vcmUobW9kZWwpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgXzFwaG90bygpe1xuICAgICAgICB2YXIge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaSBpbnNldCBwaG90bzFcIiB7Li4ub3RoZXJzfSBvbkNsaWNrPXsoKT0+dGhpcy5vbkRldGFpbCgpfT5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDQ+e21vZGVsLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9tb3JlKG1vZGVsKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17bW9kZWwucGhvdG9zWzBdfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF8zcGhvdG8oKXtcbiAgICAgICAgdmFyIHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8zXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG4gICAgICAgICAgICAgICAgPGg0Pnttb2RlbC50aXRsZX08L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXttb2RlbC5waG90b3NbMF19Lz5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e21vZGVsLnBob3Rvc1sxXX0vPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17bW9kZWwucGhvdG9zWzJdfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5fbW9yZShtb2RlbCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9tb3JlKG1vZGVsKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57bW9kZWwuY3JlYXRlZEF0fHxtb2RlbC51cGRhdGVkQXR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj7otZ57bW9kZWwuemFuc308L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2UnLHRoaXMucHJvcHMubW9kZWwpXG4gICAgfVxufVxuSXRlbS5jb250ZXh0VHlwZXM9S25vd2xlZGdlcy5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cbiJdfQ==