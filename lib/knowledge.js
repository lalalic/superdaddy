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
var File = _require.File;
var _require$UI = _require.UI;
var List = _require$UI.List;
var Loading = _require$UI.Loading;
var Comment = _require$UI.Comment;
var CommandBar = _require$UI.CommandBar;
var fileSelector = _require$UI.fileSelector;
var Link = _require.Router.Link;
var User = _require.User;
var DialogCommand = CommandBar.DialogCommand;
var dbKnowledge = require('./db/knowledge');
var dbTask = require('./db/task');

var _require2 = require('material-ui');

var RaisedButton = _require2.RaisedButton;
var extract = require('./extractor');
var Knowledge = function (_Component) {
    _inherits(Knowledge, _Component);

    function Knowledge(props) {
        _classCallCheck(this, Knowledge);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Knowledge).call(this, props));

        _this.state = {};
        var id = _this.props.params._id;

        dbKnowledge.findOne({ _id: id }, function (entity) {
            return _this.setState({ entity: entity });
        });
        return _this;
    }

    _createClass(Knowledge, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var lastId = this.props.params._id;
            var id = nextProps.params._id;


            if (id != lastId) dbKnowledge.findOne({ _id: id }, function (entity) {
                return _this2.setState({ entity: entity });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.docx && this.docx.revoke();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state;
            var entity = _state.entity;
            var status = _state.status;
            var planing = _state.planing;


            if (!entity) return React.createElement(Loading, null);

            var commands = ["Back"],
                primary,
                planCommand;
            if (true || User.current._id == entity.author._id) commands.push({ action: "New Version", icon: require("material-ui/lib/svg-icons/editor/border-color") });

            switch (status) {
                case 'revising':
                    commands.push("Save");
                    commands.push({ action: "Cancel",
                        onSelect: function onSelect() {
                            return _this3.setState({ entity: _this3.origin, status: undefined });
                        },
                        icon: require("material-ui/lib/svg-icons/navigation/cancel") });
                    primary = "Save";
                    break;
                default:
                    this.origin = entity;
                    commands.push({ action: "Plan", onSelect: function onSelect() {
                            return _this3.refs.plan.show();
                        } });
                    planCommand = React.createElement(PlanCommand, { ref: 'plan', onDismiss: function onDismiss() {
                            return _this3.createPlan();
                        } });

                    commands.push(React.createElement(CommandBar.Comment, { key: 'Comment', type: dbKnowledge, model: entity }));
                    commands.push(React.createElement(CommandBar.Share, { key: 'Share', message: entity }));
                    primary = "Plan";
            }

            return React.createElement(
                'div',
                { className: 'post' },
                React.createElement(
                    'div',
                    { className: 'knowledge' },
                    Knowledge.renderContent(entity)
                ),
                React.createElement(Plan, { style: { padding: 10 }, open: planing, entity: entity }),
                React.createElement(CommandBar, {
                    className: 'footbar',
                    primary: primary,
                    onSelect: this.onSelect.bind(this),
                    items: commands }),
                planCommand
            );
        }
    }, {
        key: 'getExperience',
        value: function getExperience() {}
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            var _this4 = this;

            switch (command) {
                case 'New Version':
                    Knowledge.selectDocx().then(function (docx) {
                        _this4.docx && _this4.docx.revoke();
                        delete _this4.docx;

                        _this4.docx = docx;
                        var knowledge = docx.knowledge;

                        var pending = Object.assign({}, _this4.state.entity, knowledge);
                        _this4.setState({ entity: pending, status: 'revising' });
                    });
                    break;
                case 'Save':
                    var entity = this.state.entity;

                    this.docx.upload(entity).then(function (content) {
                        entity.photos = _this4.docx.getPhotos();
                        entity.content = content;
                        dbKnowledge.upsert(_this4.state.entity, _this4.origin, function () {
                            return _this4.setState({ status: undefined });
                        });
                    });
                    break;
            }
        }
    }, {
        key: 'createPlan',
        value: function createPlan() {
            var entity = this.state.entity;
            var selectedDays = this.refs.plan.state.selectedDays;


            dbTask.plan(entity, selectedDays);
        }
    }], [{
        key: 'renderContent',
        value: function renderContent(entity) {
            var open = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
            var templateRender = arguments[2];
            var _entity$category = entity.category;
            var category = _entity$category === undefined ? [] : _entity$category;
            var _entity$keywords = entity.keywords;
            var keywords = _entity$keywords === undefined ? [] : _entity$keywords;
            var sencondaryStyle = { fontSize: 'small', fontWeight: 'normal', textAlign: 'right' };
            var template = new extract.Template(entity.content);

            var content = (templateRender || function (tpl) {
                var __html = tpl.contents.map(function (section, i) {
                    if (typeof section == 'string') return section;
                    return '\n                        <details open="true">\n                            <summary>' + section.key + '</summary>\n                            <p>' + section.alt + '</p>\n                        </details>\n                    ';
                }).join("");
                return React.createElement('div', { dangerouslySetInnerHTML: { __html: __html } });
            })(template);

            if (entity.summary) {
                content = React.createElement(
                    'details',
                    { style: { padding: 10 }, open: open },
                    React.createElement(
                        'summary',
                        null,
                        entity.summary
                    ),
                    content
                );
            }

            var notNewStuff;
            if (entity._id) {
                notNewStuff = [React.createElement(
                    'li',
                    { key: 'link' },
                    React.createElement(
                        Link,
                        { to: '/knowledge/' + entity._id },
                        entity.title
                    )
                ), React.createElement(
                    'li',
                    { key: 'author', style: sencondaryStyle },
                    entity.author.name,
                    ' - ',
                    React.createElement(
                        'time',
                        null,
                        entity.createdAt
                    )
                )];
            } else {
                notNewStuff = React.createElement(
                    'li',
                    { key: 'link' },
                    entity.title
                );
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    { style: { padding: 10 } },
                    React.createElement(
                        'ul',
                        { style: { listStyle: 'none', margin: 0, padding: 0 } },
                        notNewStuff,
                        React.createElement(
                            'li',
                            { style: sencondaryStyle },
                            category.join(", "),
                            ' ',
                            keywords.join(", ")
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'inset' },
                    content
                )
            );
        }
    }, {
        key: 'selectDocx',
        value: function selectDocx() {
            return fileSelector.select().then(extract, console.error);
        }
    }]);

    return Knowledge;
}(Component);

exports.default = Knowledge;


Knowledge.contextTypes = {
    router: React.PropTypes.func
};

var Plan = function (_Component2) {
    _inherits(Plan, _Component2);

    function Plan() {
        _classCallCheck(this, Plan);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Plan).apply(this, arguments));
    }

    _createClass(Plan, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var open = _props.open;

            var others = _objectWithoutProperties(_props, ['className', 'open']);

            return React.createElement('div', _extends({ className: className + ' ' + (!open && "hidden" || "") }, others));
        }
    }]);

    return Plan;
}(Component);

var PlanCommand = function (_CommandBar$DialogCom) {
    _inherits(PlanCommand, _CommandBar$DialogCom);

    function PlanCommand(props) {
        _classCallCheck(this, PlanCommand);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(PlanCommand).call(this, props));

        _this6.state = {
            selectedDays: []
        };
        return _this6;
    }

    _createClass(PlanCommand, [{
        key: 'renderContent',
        value: function renderContent() {
            var everydays = "week,weekend,weekday,month".split(",").map(function (a) {
                var _this7 = this;

                return React.createElement(
                    RaisedButton,
                    { key: a, onClick: function onClick() {
                            return _this7.selectDays(a);
                        } },
                    a
                );
            }.bind(this));
            var now = new Date();
            var Calendar = require('./components/calendar');
            var selectedDays = this.state.selectedDays;


            return [React.createElement(
                'div',
                { key: 'everydays', style: { textAlign: 'center', padding: 10 } },
                everydays
            ), React.createElement(
                'div',
                { key: 'calender' },
                React.createElement(Calendar, {
                    ref: 'calendar',
                    minDate: now,
                    maxDate: Date.Helper.addDays(now, 31),
                    displayDate: now })
            )];
        }
    }, {
        key: 'selectDays',
        value: function selectDays(a) {}
    }]);

    return PlanCommand;
}(CommandBar.DialogCommand);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFkLGFBTk07OztBQVFYLG1CQUFPLENBQUU7O2tCQUFLLEtBQUksV0FBSixFQUFnQixPQUFPLEVBQUMsV0FBVSxRQUFWLEVBQW1CLFNBQVEsRUFBUixFQUEzQixFQUFyQjtnQkFBOEQsU0FBOUQ7YUFBRixFQUNFOztrQkFBSyxLQUFJLFVBQUosRUFBTDtnQkFDRyxvQkFBQyxRQUFEO0FBQ0kseUJBQUksVUFBSjtBQUNBLDZCQUFTLEdBQVQ7QUFDQSw2QkFBUyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLEdBQXBCLEVBQXdCLEVBQXhCLENBQVQ7QUFDQSxpQ0FBYSxHQUFiLEVBSkosQ0FESDthQURGLENBQVAsQ0FSVzs7OzttQ0FrQkosR0FBRTs7O1dBekJYO0VBQW9CLFdBQVcsYUFBWCIsImZpbGUiOiJrbm93bGVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1JlYWN0LENvbXBvbmVudCwgRmlsZSxVSTp7TGlzdCxMb2FkaW5nLENvbW1lbnQsQ29tbWFuZEJhcixmaWxlU2VsZWN0b3J9LFJvdXRlcjp7TGlua30sIFVzZXJ9PXJlcXVpcmUoJ3FpbGktYXBwJyksXG4gICAge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXIsXG4gICAgZGJLbm93bGVkZ2U9cmVxdWlyZSgnLi9kYi9rbm93bGVkZ2UnKSxcbiAgICBkYlRhc2s9cmVxdWlyZSgnLi9kYi90YXNrJyksXG4gICAge1JhaXNlZEJ1dHRvbn09cmVxdWlyZSgnbWF0ZXJpYWwtdWknKSxcbiAgICBleHRyYWN0PXJlcXVpcmUoJy4vZXh0cmFjdG9yJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXt9XG4gICAgICAgIHZhciB7cGFyYW1zOntfaWQ6aWR9fT10aGlzLnByb3BzXG4gICAgICAgIGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZDppZH0sKGVudGl0eSk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTplbnRpdHl9KSlcbiAgICB9XG5cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcyl7XG4gICAgICAgIHZhciB7cGFyYW1zOntfaWQ6bGFzdElkfX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtwYXJhbXM6e19pZDppZH19PW5leHRQcm9wc1xuXG4gICAgICAgIGlmKGlkIT1sYXN0SWQpXG4gICAgICAgICAgICBkYktub3dsZWRnZS5maW5kT25lKHtfaWQ6aWR9LChlbnRpdHkpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6ZW50aXR5fSkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2VudGl0eSwgc3RhdHVzLCBwbGFuaW5nfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIWVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICB2YXIgY29tbWFuZHM9W1wiQmFja1wiXSwgcHJpbWFyeSwgcGxhbkNvbW1hbmQ7XG4gICAgICAgIGlmKHRydWUgfHwgVXNlci5jdXJyZW50Ll9pZD09ZW50aXR5LmF1dGhvci5faWQpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiKX0pXG5cbiAgICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgJ3JldmlzaW5nJzpcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goXCJTYXZlXCIpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnRoaXMub3JpZ2luLHN0YXR1czp1bmRlZmluZWR9KSxcbiAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL25hdmlnYXRpb24vY2FuY2VsXCIpfSlcbiAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcbiAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMub3JpZ2luPWVudGl0eVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiUGxhblwiLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLnBsYW4uc2hvdygpfSlcbiAgICAgICAgICAgIHBsYW5Db21tYW5kPSg8UGxhbkNvbW1hbmQgcmVmPVwicGxhblwiIG9uRGlzbWlzcz17KCk9PnRoaXMuY3JlYXRlUGxhbigpfS8+KVxuXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLkNvbW1lbnQga2V5PVwiQ29tbWVudFwiIHR5cGU9e2RiS25vd2xlZGdlfSBtb2RlbD17ZW50aXR5fS8+KVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5TaGFyZSBrZXk9XCJTaGFyZVwiIG1lc3NhZ2U9e2VudGl0eX0vPilcbiAgICAgICAgICAgIHByaW1hcnk9XCJQbGFuXCJcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7S25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8UGxhbiBzdHlsZT17e3BhZGRpbmc6MTB9fSBvcGVuPXtwbGFuaW5nfSBlbnRpdHk9e2VudGl0eX0vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e3ByaW1hcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPlxuXG4gICAgICAgICAgICAgICAge3BsYW5Db21tYW5kfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyQ29udGVudChlbnRpdHksIG9wZW49dHJ1ZSwgdGVtcGxhdGVSZW5kZXIpe1xuICAgICAgICB2YXIge2NhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXX09ZW50aXR5LFxuICAgICAgICAgICAgc2VuY29uZGFyeVN0eWxlPXtmb250U2l6ZTonc21hbGwnLGZvbnRXZWlnaHQ6J25vcm1hbCcsIHRleHRBbGlnbjoncmlnaHQnfSxcbiAgICAgICAgICAgIHRlbXBsYXRlPW5ldyBleHRyYWN0LlRlbXBsYXRlKGVudGl0eS5jb250ZW50KTtcblxuICAgICAgICB2YXIgY29udGVudD0odGVtcGxhdGVSZW5kZXJ8fGZ1bmN0aW9uKHRwbCl7XG4gICAgICAgICAgICAgICAgdmFyIF9faHRtbD10cGwuY29udGVudHMubWFwKChzZWN0aW9uLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihzZWN0aW9uKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT4ke3NlY3Rpb24ua2V5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke3NlY3Rpb24uYWx0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWx9fS8+XG4gICAgICAgICAgICB9KSh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgaWYoZW50aXR5LnN1bW1hcnkpe1xuICAgICAgICAgICAgY29udGVudD0oXG4gICAgICAgICAgICAgICAgPGRldGFpbHMgc3R5bGU9e3twYWRkaW5nOjEwfX0gb3Blbj17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PntlbnRpdHkuc3VtbWFyeX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3ROZXdTdHVmZlxuICAgICAgICBpZihlbnRpdHkuX2lkKXtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPVtcbiAgICAgICAgICAgICAgICAoPGxpIGtleT1cImxpbmtcIj48TGluayB0bz17YC9rbm93bGVkZ2UvJHtlbnRpdHkuX2lkfWB9PntlbnRpdHkudGl0bGV9PC9MaW5rPjwvbGk+KSxcbiAgICAgICAgICAgICAgICAoPGxpIGtleT1cImF1dGhvclwiIHN0eWxlPXtzZW5jb25kYXJ5U3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5LmF1dGhvci5uYW1lfSAtIDx0aW1lPntlbnRpdHkuY3JlYXRlZEF0fTwvdGltZT5cbiAgICAgICAgICAgICAgICA8L2xpPilcbiAgICAgICAgICAgIF1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9KDxsaSBrZXk9XCJsaW5rXCI+e2VudGl0eS50aXRsZX08L2xpPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMSBzdHlsZT17e3BhZGRpbmc6MTB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7bGlzdFN0eWxlOidub25lJyxtYXJnaW46MCwgcGFkZGluZzowfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bm90TmV3U3R1ZmZ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgc3R5bGU9e3NlbmNvbmRhcnlTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NhdGVnb3J5LmpvaW4oXCIsIFwiKX0ge2tleXdvcmRzLmpvaW4oXCIsIFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc2V0XCI+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBnZXRFeHBlcmllbmNlKCl7XG5cbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdOZXcgVmVyc2lvbic6XG4gICAgICAgICAgICBLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRvY3gpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZG9jeFxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeD1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciB7a25vd2xlZGdlfT1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZW5kaW5nPU9iamVjdC5hc3NpZ24oe30sdGhpcy5zdGF0ZS5lbnRpdHksa25vd2xlZGdlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRpdHk6cGVuZGluZywgc3RhdHVzOidyZXZpc2luZyd9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdTYXZlJzpcbiAgICAgICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlXG4gICAgICAgICAgICB0aGlzLmRvY3gudXBsb2FkKGVudGl0eSkudGhlbigoY29udGVudCk9PntcbiAgICAgICAgICAgICAgICBlbnRpdHkucGhvdG9zPXRoaXMuZG9jeC5nZXRQaG90b3MoKVxuICAgICAgICAgICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcbiAgICAgICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQodGhpcy5zdGF0ZS5lbnRpdHksIHRoaXMub3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICAoKT0+dGhpcy5zZXRTdGF0ZSh7c3RhdHVzOnVuZGVmaW5lZH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVQbGFuKCl7XG4gICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3NlbGVjdGVkRGF5c309dGhpcy5yZWZzLnBsYW4uc3RhdGVcblxuICAgICAgICBkYlRhc2sucGxhbihlbnRpdHksc2VsZWN0ZWREYXlzKVxuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3REb2N4KCl7XG4gICAgICAgIHJldHVybiBmaWxlU2VsZWN0b3Iuc2VsZWN0KClcbiAgICAgICAgICAgIC50aGVuKGV4dHJhY3QsY29uc29sZS5lcnJvcilcbiAgICB9XG59XG5cbktub3dsZWRnZS5jb250ZXh0VHlwZXM9e1xuICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbn1cblxuY2xhc3MgUGxhbiBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjbGFzc05hbWUsb3BlbiwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake2NsYXNzTmFtZX0gJHshb3BlbiAmJiBcImhpZGRlblwiIHx8XCJcIn1gfSB7Li4ub3RoZXJzfT5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNsYXNzIFBsYW5Db21tYW5kIGV4dGVuZHMgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5ke1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgc2VsZWN0ZWREYXlzOltdXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIgZXZlcnlkYXlzPVwid2Vlayx3ZWVrZW5kLHdlZWtkYXksbW9udGhcIi5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiAoPFJhaXNlZEJ1dHRvbiBrZXk9e2F9IG9uQ2xpY2s9eygpPT50aGlzLnNlbGVjdERheXMoYSl9PnthfTwvUmFpc2VkQnV0dG9uPilcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSksXG4gICAgICAgICAgICBub3c9bmV3IERhdGUoKSxcbiAgICAgICAgICAgIENhbGVuZGFyPXJlcXVpcmUoJy4vY29tcG9uZW50cy9jYWxlbmRhcicpLFxuICAgICAgICAgICAge3NlbGVjdGVkRGF5c309dGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gWyg8ZGl2IGtleT1cImV2ZXJ5ZGF5c1wiIHN0eWxlPXt7dGV4dEFsaWduOidjZW50ZXInLHBhZGRpbmc6MTB9fT57ZXZlcnlkYXlzfTwvZGl2PiksXG4gICAgICAgICAgICAgICAgKDxkaXYga2V5PVwiY2FsZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJjYWxlbmRhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlPXtub3d9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKG5vdywzMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZT17bm93fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PildXG4gICAgfVxuXG4gICAgc2VsZWN0RGF5cyhhKXtcblxuICAgIH1cbn1cbiJdfQ==