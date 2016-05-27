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
var extract = require('./parser/extractor');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQWtHLFFBQVEsVUFBUjs7SUFBN0Y7SUFBTTtJQUFXOzJCQUFLO0lBQUk7SUFBSztJQUFRO0lBQVE7SUFBVztJQUFzQixnQkFBUixPQUFRO0FBQWpGLElBQXdGLG9CQUF4RjtBQUNBLElBQUMsZ0JBQWUsV0FBZixhQUFEO0FBQ0Esa0JBQVksUUFBUSxnQkFBUixDQUFaO0FBQ0EsYUFBTyxRQUFRLFdBQVIsQ0FBUDs7Z0JBQ2UsUUFBUSxhQUFSOztBQUFmLElBQUMscUNBQUQ7QUFDQSxjQUFRLFFBQVEsb0JBQVIsQ0FBUjtJQUVpQjs7O0FBQ2pCLGFBRGlCLFNBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxXQUNDOzsyRUFERCxzQkFFUCxRQURROztBQUVkLGNBQUssS0FBTCxHQUFXLEVBQVgsQ0FGYztZQUdHLEtBQUssTUFBSyxLQUFMLENBQWpCLE9BQVEsSUFIQzs7QUFJZCxvQkFBWSxPQUFaLENBQW9CLEVBQUMsS0FBSSxFQUFKLEVBQXJCLEVBQTZCLFVBQUMsTUFBRDttQkFBVSxNQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sTUFBUCxFQUFmO1NBQVYsQ0FBN0IsQ0FKYzs7S0FBbEI7O2lCQURpQjs7a0RBU1UsV0FBVTs7O0FBQzdCLGdCQUFhLFNBQVMsS0FBSyxLQUFMLENBQXJCLE9BQVEsR0FBVCxDQUQ2QjtnQkFFaEIsS0FBSyxVQUFqQixPQUFRLElBRm9COzs7QUFJakMsZ0JBQUcsTUFBSSxNQUFKLEVBQ0MsWUFBWSxPQUFaLENBQW9CLEVBQUMsS0FBSSxFQUFKLEVBQXJCLEVBQTZCLFVBQUMsTUFBRDt1QkFBVSxPQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sTUFBUCxFQUFmO2FBQVYsQ0FBN0IsQ0FESjs7OzsrQ0FJa0I7QUFDbEIsaUJBQUssSUFBTCxJQUFhLEtBQUssSUFBTCxDQUFVLE1BQVYsRUFBYixDQURrQjs7OztpQ0FJZDs7O3lCQUMwQixLQUFLLEtBQUwsQ0FEMUI7Z0JBQ0MsdUJBREQ7Z0JBQ1MsdUJBRFQ7Z0JBQ2lCLHlCQURqQjs7O0FBR0osZ0JBQUcsQ0FBQyxNQUFELEVBQ0MsT0FBUSxvQkFBQyxPQUFELE9BQVIsQ0FESjs7QUFHQSxnQkFBSSxXQUFTLENBQUMsTUFBRCxDQUFUO2dCQUFtQixPQUF2QjtnQkFBZ0MsV0FBaEMsQ0FOSTtBQU9KLGdCQUFHLFFBQVEsS0FBSyxPQUFMLENBQWEsR0FBYixJQUFrQixPQUFPLE1BQVAsQ0FBYyxHQUFkLEVBQ3pCLFNBQVMsSUFBVCxDQUFjLEVBQUMsUUFBTyxhQUFQLEVBQXFCLE1BQUssUUFBUSwrQ0FBUixDQUFMLEVBQXBDLEVBREo7O0FBR0Esb0JBQU8sTUFBUDtBQUNBLHFCQUFLLFVBQUw7QUFDSSw2QkFBUyxJQUFULENBQWMsTUFBZCxFQURKO0FBRUksNkJBQVMsSUFBVCxDQUFjLEVBQUMsUUFBTyxRQUFQO0FBQ1gsa0NBQVM7bUNBQUksT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFPLE9BQUssTUFBTCxFQUFZLFFBQU8sU0FBUCxFQUFsQzt5QkFBSjtBQUNULDhCQUFLLFFBQVEsNkNBQVIsQ0FBTCxFQUZKLEVBRko7QUFLSSw4QkFBUSxNQUFSLENBTEo7QUFNQSwwQkFOQTtBQURBO0FBU0kseUJBQUssTUFBTCxHQUFZLE1BQVosQ0FESjtBQUVJLDZCQUFTLElBQVQsQ0FBYyxFQUFDLFFBQU8sTUFBUCxFQUFlLFVBQVM7bUNBQUksT0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWY7eUJBQUosRUFBdkMsRUFGSjtBQUdJLGtDQUFhLG9CQUFDLFdBQUQsSUFBYSxLQUFJLE1BQUosRUFBVyxXQUFXO21DQUFJLE9BQUssVUFBTDt5QkFBSixFQUFuQyxDQUFiLENBSEo7O0FBS0ksNkJBQVMsSUFBVCxDQUFjLG9CQUFDLFdBQVcsT0FBWixJQUFvQixLQUFJLFNBQUosRUFBYyxNQUFNLFdBQU4sRUFBbUIsT0FBTyxNQUFQLEVBQXJELENBQWQsRUFMSjtBQU1JLDZCQUFTLElBQVQsQ0FBYyxvQkFBQyxXQUFXLEtBQVosSUFBa0IsS0FBSSxPQUFKLEVBQVksU0FBUyxNQUFULEVBQTlCLENBQWQsRUFOSjtBQU9JLDhCQUFRLE1BQVIsQ0FQSjtBQVJBLGFBVkk7O0FBNEJKLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDSTs7c0JBQUssV0FBVSxXQUFWLEVBQUw7b0JBQ0ssVUFBVSxhQUFWLENBQXdCLE1BQXhCLENBREw7aUJBREo7Z0JBSUksb0JBQUMsSUFBRCxJQUFNLE9BQU8sRUFBQyxTQUFRLEVBQVIsRUFBUixFQUFxQixNQUFNLE9BQU4sRUFBZSxRQUFRLE1BQVIsRUFBMUMsQ0FKSjtnQkFNSSxvQkFBQyxVQUFEO0FBQ0ksK0JBQVUsU0FBVjtBQUNBLDZCQUFTLE9BQVQ7QUFDQSw4QkFBVSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQVY7QUFDQSwyQkFBTyxRQUFQLEVBSkosQ0FOSjtnQkFZSyxXQVpMO2FBREosQ0E1Qkk7Ozs7d0NBdUdPOzs7aUNBSU4sU0FBUTs7O0FBQ2Isb0JBQU8sT0FBUDtBQUNBLHFCQUFLLGFBQUw7QUFDSSw4QkFBVSxVQUFWLEdBQ0ssSUFETCxDQUNVLFVBQUMsSUFBRCxFQUFRO0FBQ1YsK0JBQUssSUFBTCxJQUFhLE9BQUssSUFBTCxDQUFVLE1BQVYsRUFBYixDQURVO0FBRVYsK0JBQU8sT0FBSyxJQUFMLENBRkc7O0FBSVYsK0JBQUssSUFBTCxHQUFVLElBQVYsQ0FKVTs0QkFLTCxZQUFXLEtBQVgsVUFMSzs7QUFNViw0QkFBSSxVQUFRLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBaUIsT0FBSyxLQUFMLENBQVcsTUFBWCxFQUFrQixTQUFuQyxDQUFSLENBTk07QUFPViwrQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLE9BQVAsRUFBZ0IsUUFBTyxVQUFQLEVBQS9CLEVBUFU7cUJBQVIsQ0FEVixDQURKO0FBV0ksMEJBWEo7QUFEQSxxQkFhSyxNQUFMO3dCQUNTLFNBQVEsS0FBSyxLQUFMLENBQVIsT0FEVDs7QUFFSSx5QkFBSyxJQUFMLENBQVUsTUFBVixDQUFpQixNQUFqQixFQUF5QixJQUF6QixDQUE4QixVQUFDLE9BQUQsRUFBVztBQUNyQywrQkFBTyxNQUFQLEdBQWMsT0FBSyxJQUFMLENBQVUsU0FBVixFQUFkLENBRHFDO0FBRXJDLCtCQUFPLE9BQVAsR0FBZSxPQUFmLENBRnFDO0FBR3JDLG9DQUFZLE1BQVosQ0FBbUIsT0FBSyxLQUFMLENBQVcsTUFBWCxFQUFtQixPQUFLLE1BQUwsRUFDbEM7bUNBQUksT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFPLFNBQVAsRUFBZjt5QkFBSixDQURKLENBSHFDO3FCQUFYLENBQTlCLENBRko7QUFRSSwwQkFSSjtBQWJBLGFBRGE7Ozs7cUNBMEJMO0FBQ0osZ0JBQUMsU0FBUSxLQUFLLEtBQUwsQ0FBUixNQUFELENBREk7Z0JBRUgsZUFBYyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsS0FBZixDQUFkLGFBRkc7OztBQUlSLG1CQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW1CLFlBQW5CLEVBSlE7Ozs7c0NBdkZTLFFBQWtDO2dCQUExQiw2REFBSyxvQkFBcUI7Z0JBQWYsOEJBQWU7bUNBQ3BCLE9BQTFCLFNBRDhDO2dCQUM5Qyw0Q0FBUyxzQkFEcUM7bUNBQ3BCLE9BQWIsU0FEaUM7QUFDL0MsZ0JBQWMsNENBQVMscUJBQXZCLENBRCtDO0FBRS9DLGtDQUFnQixFQUFDLFVBQVMsT0FBVCxFQUFpQixZQUFXLFFBQVgsRUFBcUIsV0FBVSxPQUFWLEVBQXZELENBRitDO0FBRy9DLDJCQUFTLElBQUksUUFBUSxRQUFSLENBQWlCLE9BQU8sT0FBUCxDQUE5QixDQUgrQzs7QUFLbkQsZ0JBQUksVUFBUSxDQUFDLGtCQUFnQixVQUFTLEdBQVQsRUFBYTtBQUNsQyxvQkFBSSxTQUFPLElBQUksUUFBSixDQUFhLEdBQWIsQ0FBaUIsVUFBQyxPQUFELEVBQVMsQ0FBVCxFQUFhO0FBQ3JDLHdCQUFHLE9BQU8sT0FBUCxJQUFpQixRQUFqQixFQUNDLE9BQU8sT0FBUCxDQURKO0FBRUEsc0hBRW1CLFFBQVEsR0FBUixtREFDTixRQUFRLEdBQVIsbUVBSGIsQ0FIcUM7aUJBQWIsQ0FBakIsQ0FTUixJQVRRLENBU0gsRUFURyxDQUFQLENBRDhCO0FBV2xDLHVCQUFPLDZCQUFLLHlCQUF5QixFQUFDLGNBQUQsRUFBekIsRUFBTCxDQUFQLENBWGtDO2FBQWIsQ0FBakIsQ0FZTCxRQVpLLENBQVIsQ0FMK0M7O0FBbUJuRCxnQkFBRyxPQUFPLE9BQVAsRUFBZTtBQUNkLDBCQUNJOztzQkFBUyxPQUFPLEVBQUMsU0FBUSxFQUFSLEVBQVIsRUFBcUIsTUFBTSxJQUFOLEVBQTlCO29CQUNJOzs7d0JBQVUsT0FBTyxPQUFQO3FCQURkO29CQUVLLE9BRkw7aUJBREosQ0FEYzthQUFsQjs7QUFTQSxnQkFBSSxXQUFKLENBNUJtRDtBQTZCbkQsZ0JBQUcsT0FBTyxHQUFQLEVBQVc7QUFDViw4QkFBWSxDQUNQOztzQkFBSSxLQUFJLE1BQUosRUFBSjtvQkFBZTtBQUFDLDRCQUFEOzBCQUFNLG9CQUFrQixPQUFPLEdBQVAsRUFBeEI7d0JBQXVDLE9BQU8sS0FBUDtxQkFBdEQ7aUJBRE8sRUFFUDs7c0JBQUksS0FBSSxRQUFKLEVBQWEsT0FBTyxlQUFQLEVBQWpCO29CQUNJLE9BQU8sTUFBUCxDQUFjLElBQWQ7eUJBREo7b0JBQzBCOzs7d0JBQU8sT0FBTyxTQUFQO3FCQURqQztpQkFGTyxDQUFaLENBRFU7YUFBZCxNQU9NO0FBQ0YsOEJBQWE7O3NCQUFJLEtBQUksTUFBSixFQUFKO29CQUFnQixPQUFPLEtBQVA7aUJBQTdCLENBREU7YUFQTjs7QUFXQSxtQkFDSTs7O2dCQUNJOztzQkFBSSxPQUFPLEVBQUMsU0FBUSxFQUFSLEVBQVIsRUFBSjtvQkFDSTs7MEJBQUksT0FBTyxFQUFDLFdBQVUsTUFBVixFQUFpQixRQUFPLENBQVAsRUFBVSxTQUFRLENBQVIsRUFBbkMsRUFBSjt3QkFDSyxXQURMO3dCQUVJOzs4QkFBSSxPQUFPLGVBQVAsRUFBSjs0QkFDSyxTQUFTLElBQVQsQ0FBYyxJQUFkLENBREw7OzRCQUMyQixTQUFTLElBQVQsQ0FBYyxJQUFkLENBRDNCO3lCQUZKO3FCQURKO2lCQURKO2dCQVNJOztzQkFBSyxXQUFVLE9BQVYsRUFBTDtvQkFDSyxPQURMO2lCQVRKO2FBREosQ0F4Q21EOzs7O3FDQThGcEM7QUFDZixtQkFBTyxhQUFhLE1BQWIsR0FDRixJQURFLENBQ0csT0FESCxFQUNXLFFBQVEsS0FBUixDQURsQixDQURlOzs7O1dBaktGO0VBQWtCOztrQkFBbEI7OztBQXVLckIsVUFBVSxZQUFWLEdBQXVCO0FBQ25CLFlBQVEsTUFBTSxTQUFOLENBQWdCLElBQWhCO0NBRFo7O0lBSU07Ozs7Ozs7Ozs7O2lDQUNNO3lCQUMyQixLQUFLLEtBQUwsQ0FEM0I7Z0JBQ0MsNkJBREQ7Z0JBQ1csbUJBRFg7O2dCQUNtQixpRUFEbkI7O0FBR0osbUJBQ0ksc0NBQUssV0FBYyxtQkFBYSxDQUFDLElBQUQsSUFBUyxRQUFULElBQW9CLEVBQXBCLENBQTNCLElBQXlELE9BQTlELENBREosQ0FISTs7OztXQUROO0VBQWE7O0lBWWI7OztBQUNGLGFBREUsV0FDRixDQUFZLEtBQVosRUFBa0I7OEJBRGhCLGFBQ2dCOzs0RUFEaEIsd0JBRVEsUUFEUTs7QUFFZCxlQUFLLEtBQUwsR0FBVztBQUNQLDBCQUFhLEVBQWI7U0FESixDQUZjOztLQUFsQjs7aUJBREU7O3dDQU9hO0FBQ1AsNEJBQVUsNkJBQTZCLEtBQTdCLENBQW1DLEdBQW5DLEVBQXdDLEdBQXhDLENBQTRDLFVBQVMsQ0FBVCxFQUFXOzs7QUFDN0QsdUJBQVE7QUFBQyxnQ0FBRDtzQkFBYyxLQUFLLENBQUwsRUFBUSxTQUFTO21DQUFJLE9BQUssVUFBTCxDQUFnQixDQUFoQjt5QkFBSixFQUEvQjtvQkFBd0QsQ0FBeEQ7aUJBQVIsQ0FENkQ7YUFBWCxDQUVwRCxJQUZvRCxDQUUvQyxJQUYrQyxDQUE1QyxDQUFWLENBRE87QUFJUCxzQkFBSSxJQUFJLElBQUosRUFBSixDQUpPO0FBS1AsMkJBQVMsUUFBUSx1QkFBUixDQUFULENBTE87Z0JBTU4sZUFBYyxLQUFLLEtBQUwsQ0FBZCxhQU5NOzs7QUFRWCxtQkFBTyxDQUFFOztrQkFBSyxLQUFJLFdBQUosRUFBZ0IsT0FBTyxFQUFDLFdBQVUsUUFBVixFQUFtQixTQUFRLEVBQVIsRUFBM0IsRUFBckI7Z0JBQThELFNBQTlEO2FBQUYsRUFDRTs7a0JBQUssS0FBSSxVQUFKLEVBQUw7Z0JBQ0csb0JBQUMsUUFBRDtBQUNJLHlCQUFJLFVBQUo7QUFDQSw2QkFBUyxHQUFUO0FBQ0EsNkJBQVMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixHQUFwQixFQUF3QixFQUF4QixDQUFUO0FBQ0EsaUNBQWEsR0FBYixFQUpKLENBREg7YUFERixDQUFQLENBUlc7Ozs7bUNBa0JKLEdBQUU7OztXQXpCWDtFQUFvQixXQUFXLGFBQVgiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUk6e0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yfSxSb3V0ZXI6e0xpbmt9LCBVc2VyfT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxuICAgIHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyLFxuICAgIGRiS25vd2xlZGdlPXJlcXVpcmUoJy4vZGIva25vd2xlZGdlJyksXG4gICAgZGJUYXNrPXJlcXVpcmUoJy4vZGIvdGFzaycpLFxuICAgIHtSYWlzZWRCdXR0b259PXJlcXVpcmUoJ21hdGVyaWFsLXVpJyksXG4gICAgZXh0cmFjdD1yZXF1aXJlKCcuL3BhcnNlci9leHRyYWN0b3InKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS25vd2xlZGdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e31cbiAgICAgICAgdmFyIHtwYXJhbXM6e19pZDppZH19PXRoaXMucHJvcHNcbiAgICAgICAgZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkOmlkfSwoZW50aXR5KT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OmVudGl0eX0pKVxuICAgIH1cblxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKXtcbiAgICAgICAgdmFyIHtwYXJhbXM6e19pZDpsYXN0SWR9fT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3BhcmFtczp7X2lkOmlkfX09bmV4dFByb3BzXG5cbiAgICAgICAgaWYoaWQhPWxhc3RJZClcbiAgICAgICAgICAgIGRiS25vd2xlZGdlLmZpbmRPbmUoe19pZDppZH0sKGVudGl0eSk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTplbnRpdHl9KSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7ZW50aXR5LCBzdGF0dXMsIHBsYW5pbmd9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciBjb21tYW5kcz1bXCJCYWNrXCJdLCBwcmltYXJ5LCBwbGFuQ29tbWFuZDtcbiAgICAgICAgaWYodHJ1ZSB8fCBVc2VyLmN1cnJlbnQuX2lkPT1lbnRpdHkuYXV0aG9yLl9pZClcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIk5ldyBWZXJzaW9uXCIsaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCIpfSlcblxuICAgICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAncmV2aXNpbmcnOlxuICAgICAgICAgICAgY29tbWFuZHMucHVzaChcIlNhdmVcIilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6dGhpcy5vcmlnaW4sc3RhdHVzOnVuZGVmaW5lZH0pLFxuICAgICAgICAgICAgICAgIGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIil9KVxuICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxuICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5vcmlnaW49ZW50aXR5XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJQbGFuXCIsIG9uU2VsZWN0OigpPT50aGlzLnJlZnMucGxhbi5zaG93KCl9KVxuICAgICAgICAgICAgcGxhbkNvbW1hbmQ9KDxQbGFuQ29tbWFuZCByZWY9XCJwbGFuXCIgb25EaXNtaXNzPXsoKT0+dGhpcy5jcmVhdGVQbGFuKCl9Lz4pXG5cbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLlNoYXJlIGtleT1cIlNoYXJlXCIgbWVzc2FnZT17ZW50aXR5fS8+KVxuICAgICAgICAgICAgcHJpbWFyeT1cIlBsYW5cIlxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxQbGFuIHN0eWxlPXt7cGFkZGluZzoxMH19IG9wZW49e3BsYW5pbmd9IGVudGl0eT17ZW50aXR5fS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cHJpbWFyeX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG5cbiAgICAgICAgICAgICAgICB7cGxhbkNvbW1hbmR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdfT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9LFxuICAgICAgICAgICAgdGVtcGxhdGU9bmV3IGV4dHJhY3QuVGVtcGxhdGUoZW50aXR5LmNvbnRlbnQpO1xuXG4gICAgICAgIHZhciBjb250ZW50PSh0ZW1wbGF0ZVJlbmRlcnx8ZnVuY3Rpb24odHBsKXtcbiAgICAgICAgICAgICAgICB2YXIgX19odG1sPXRwbC5jb250ZW50cy5tYXAoKHNlY3Rpb24saSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKHNlY3Rpb24pPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGV0YWlscyBvcGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PiR7c2VjdGlvbi5rZXl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7c2VjdGlvbi5hbHR9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgfSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbH19Lz5cbiAgICAgICAgICAgIH0pKHRlbXBsYXRlKTtcblxuICAgICAgICBpZihlbnRpdHkuc3VtbWFyeSl7XG4gICAgICAgICAgICBjb250ZW50PShcbiAgICAgICAgICAgICAgICA8ZGV0YWlscyBzdHlsZT17e3BhZGRpbmc6MTB9fSBvcGVuPXtvcGVufT5cbiAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+e2VudGl0eS5zdW1tYXJ5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vdE5ld1N0dWZmXG4gICAgICAgIGlmKGVudGl0eS5faWQpe1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9W1xuICAgICAgICAgICAgICAgICg8bGkga2V5PVwibGlua1wiPjxMaW5rIHRvPXtgL2tub3dsZWRnZS8ke2VudGl0eS5faWR9YH0+e2VudGl0eS50aXRsZX08L0xpbms+PC9saT4pLFxuICAgICAgICAgICAgICAgICg8bGkga2V5PVwiYXV0aG9yXCIgc3R5bGU9e3NlbmNvbmRhcnlTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgIHtlbnRpdHkuYXV0aG9yLm5hbWV9IC0gPHRpbWU+e2VudGl0eS5jcmVhdGVkQXR9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvbGk+KVxuICAgICAgICAgICAgXVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj0oPGxpIGtleT1cImxpbmtcIj57ZW50aXR5LnRpdGxlfTwvbGk+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgxIHN0eWxlPXt7cGFkZGluZzoxMH19PlxuICAgICAgICAgICAgICAgICAgICA8dWwgc3R5bGU9e3tsaXN0U3R5bGU6J25vbmUnLG1hcmdpbjowLCBwYWRkaW5nOjB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtub3ROZXdTdHVmZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17c2VuY29uZGFyeVN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zZXRcIj5cbiAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGdldEV4cGVyaWVuY2UoKXtcblxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVBsYW4oKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7c2VsZWN0ZWREYXlzfT10aGlzLnJlZnMucGxhbi5zdGF0ZVxuXG4gICAgICAgIGRiVGFzay5wbGFuKGVudGl0eSxzZWxlY3RlZERheXMpXG4gICAgfVxuXG4gICAgc3RhdGljIHNlbGVjdERvY3goKXtcbiAgICAgICAgcmV0dXJuIGZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuICAgICAgICAgICAgLnRoZW4oZXh0cmFjdCxjb25zb2xlLmVycm9yKVxuICAgIH1cbn1cblxuS25vd2xlZGdlLmNvbnRleHRUeXBlcz17XG4gICAgcm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufVxuXG5jbGFzcyBQbGFuIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NsYXNzTmFtZSxvcGVuLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7Y2xhc3NOYW1lfSAkeyFvcGVuICYmIFwiaGlkZGVuXCIgfHxcIlwifWB9IHsuLi5vdGhlcnN9PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY2xhc3MgUGxhbkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBzZWxlY3RlZERheXM6W11cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciBldmVyeWRheXM9XCJ3ZWVrLHdlZWtlbmQsd2Vla2RheSxtb250aFwiLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UmFpc2VkQnV0dG9uIGtleT17YX0gb25DbGljaz17KCk9PnRoaXMuc2VsZWN0RGF5cyhhKX0+e2F9PC9SYWlzZWRCdXR0b24+KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG5vdz1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAgQ2FsZW5kYXI9cmVxdWlyZSgnLi9jb21wb25lbnRzL2NhbGVuZGFyJyksXG4gICAgICAgICAgICB7c2VsZWN0ZWREYXlzfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiBbKDxkaXYga2V5PVwiZXZlcnlkYXlzXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2NlbnRlcicscGFkZGluZzoxMH19PntldmVyeWRheXN9PC9kaXY+KSxcbiAgICAgICAgICAgICAgICAoPGRpdiBrZXk9XCJjYWxlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNhbGVuZGFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGU9e25vd31cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e0RhdGUuSGVscGVyLmFkZERheXMobm93LDMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlPXtub3d9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+KV1cbiAgICB9XG5cbiAgICBzZWxlY3REYXlzKGEpe1xuXG4gICAgfVxufVxuIl19