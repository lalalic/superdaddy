'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app');

var React = _require.React;
var Component = _require.Component;
var User = _require.User;
var _require$UI = _require.UI;
var List = _require$UI.List;
var Loading = _require$UI.Loading;
var Comment = _require$UI.Comment;
var CommandBar = _require$UI.CommandBar;
var dbTask = require('./db/task');
var dbFamily = require('./db/family');
var uiKnowledge = require('./knowledge');
var Editor = require('./editor');
var Template = require('./parser/template');
var Task = function (_Component) {
    _inherits(Task, _Component);

    function Task(props) {
        _classCallCheck(this, Task);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Task).call(this, props));

        _this.state = {
            entity: null
        };
        return _this;
    }

    _createClass(Task, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (!this.state.entity) {
                var id = this.props.params._id;
                dbTask.findOne({ _id: id }, function (entity) {
                    this.setState({ entity: entity });
                }.bind(this));
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(next) {
            if (next.child != this.props.child) this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            var entity = this.state.entity;var child = this.props.child;

            if (!entity) return React.createElement(Loading, null);

            var started = entity.started;
            var finished = entity.finished;
            var _entity$knowledge$goa = entity.knowledge.goal;
            var goal = _entity$knowledge$goa === undefined ? [] : _entity$knowledge$goa;
            var _entity$content = entity.content;
            var content = _entity$content === undefined ? {} : _entity$content;
            var _entity$summary = entity.summary;
            var summary = _entity$summary === undefined ? [] : _entity$summary;
            var readonly = entity.author._id != User.current._id;
            var action = readonly ? null : finished ? "Publish" : started ? "Finish" : "Start";
            var sencondaryStyle = { fontSize: 'small', fontWeight: 'normal', textAlign: 'right' };

            var hasEditor = false,
                keys = this.keys = [],
                contentEditor = uiKnowledge.renderContent(entity.knowledge, true, function (tmpl) {
                return tmpl.contents.map(function (a, i) {
                    if (typeof a == 'string') return null;
                    hasEditor = true;
                    var key = a.key;
                    var alt = a.alt;

                    keys.push(key);
                    return React.createElement(
                        'details',
                        { key: key, open: 'true' },
                        React.createElement(
                            'summary',
                            null,
                            key
                        ),
                        React.createElement(Editor, { ref: 'editor-' + key, content: content[key], appendable: !readonly })
                    );
                });
            });
            var summaryEditor;
            if (summary.length || !hasEditor) {
                summaryEditor = React.createElement(Editor, { ref: 'summary', content: summary, appendable: !readonly });
                if (hasEditor) summaryEditor = React.createElement(
                    'details',
                    { open: 'true' },
                    React.createElement(
                        'summary',
                        null,
                        'summary'
                    ),
                    summaryEditor
                );
            }

            return React.createElement(
                'div',
                { className: 'post' },
                contentEditor,
                summaryEditor,
                React.createElement(CommandBar, {
                    className: 'footbar',
                    onSelect: this.onSelect.bind(this),
                    primary: action,
                    items: ["Back", "Save", action, React.createElement(CommandBar.Comment, { type: dbTask, model: entity, key: 'comment' }), React.createElement(CommandBar.Share, { message: entity, key: 'share' })] })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            switch (command) {
                case "Start":
                    dbTask.start(this.state.entity).then(function () {
                        this.forceUpdate();
                    }.bind(this));
                    break;
                case "Finish":
                    dbTask.finish(this.state.entity).then(function () {
                        this.forceUpdate();
                    }.bind(this));
                    break;
                case "Save":
                    this._onSave();
                    break;
            }
        }
    }, {
        key: '_onSave',
        value: function _onSave() {
            var _this2 = this;

            var entity = this.state.entity;

            var content = {};
            this.keys.forEach(function (key) {
                var editor = _this2.refs['editor-' + key];
                content[key] = editor.value;
                if (!entity.thumbnail) entity.thumbnail = editor.thumbnail;
            });
            entity.content = content;

            var editorSummary = this.refs.summary;
            if (editorSummary) entity.summary = editorSummary.value;

            dbTask.upsert(entity, function () {
                return _this2.forceUpdate();
            });
        }
    }]);

    return Task;
}(Component);

exports.default = Task;

Task.contextTypes = {
    router: React.PropTypes.func
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Q1UsWUFBVTtBQUNaLDZCQUFLLFdBQUwsR0FEWTtxQkFBVixDQUVKLElBRkksQ0FFQyxJQUZELENBRFYsRUFESjtBQUtBLDBCQUxBO0FBUEEscUJBYUssTUFBTDtBQUNJLHlCQUFLLE9BQUwsR0FESjtBQUVBLDBCQUZBO0FBYkEsYUFEYTs7OztrQ0FtQlI7OztnQkFDQSxTQUFRLEtBQUssS0FBTCxDQUFSLE9BREE7O0FBRUwsZ0JBQUksVUFBUSxFQUFSLENBRkM7QUFHTCxpQkFBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFDLEdBQUQsRUFBTztBQUNyQixvQkFBSSxTQUFPLE9BQUssSUFBTCxhQUFvQixHQUFwQixDQUFQLENBRGlCO0FBRXJCLHdCQUFRLEdBQVIsSUFBYSxPQUFPLEtBQVAsQ0FGUTtBQUdyQixvQkFBRyxDQUFDLE9BQU8sU0FBUCxFQUNBLE9BQU8sU0FBUCxHQUFpQixPQUFPLFNBQVAsQ0FEckI7YUFIYyxDQUFsQixDQUhLO0FBU0wsbUJBQU8sT0FBUCxHQUFlLE9BQWYsQ0FUSzs7QUFXTCxnQkFBSSxnQkFBYyxLQUFLLElBQUwsQ0FBVSxPQUFWLENBWGI7QUFZTCxnQkFBRyxhQUFILEVBQ0ksT0FBTyxPQUFQLEdBQWUsY0FBYyxLQUFkLENBRG5COztBQUdBLG1CQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCO3VCQUFJLE9BQUssV0FBTDthQUFKLENBQXRCLENBZks7Ozs7V0ExRlE7RUFBYTs7a0JBQWI7O0FBNEdyQixLQUFLLFlBQUwsR0FBa0I7QUFDZCxZQUFPLE1BQU0sU0FBTixDQUFnQixJQUFoQjtDQURYIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1JlYWN0LENvbXBvbmVudCxVc2VyLFVJOntMaXN0LCBMb2FkaW5nLCBDb21tZW50LCBDb21tYW5kQmFyfX09cmVxdWlyZSgncWlsaS1hcHAnKSxcbiAgICBkYlRhc2s9cmVxdWlyZSgnLi9kYi90YXNrJyksXG4gICAgZGJGYW1pbHk9cmVxdWlyZSgnLi9kYi9mYW1pbHknKSxcbiAgICB1aUtub3dsZWRnZT1yZXF1aXJlKCcuL2tub3dsZWRnZScpLFxuICAgIEVkaXRvcj1yZXF1aXJlKCcuL2VkaXRvcicpLFxuICAgIFRlbXBsYXRlPXJlcXVpcmUoJy4vcGFyc2VyL3RlbXBsYXRlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBlbnRpdHk6bnVsbFxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICBpZighdGhpcy5zdGF0ZS5lbnRpdHkpe1xuICAgICAgICAgICAgdmFyIGlkPXRoaXMucHJvcHMucGFyYW1zLl9pZFxuICAgICAgICAgICAgZGJUYXNrLmZpbmRPbmUoe19pZDppZH0sZnVuY3Rpb24oZW50aXR5KXtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRpdHk6ZW50aXR5fSlcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuICAgICAgICBpZiAobmV4dC5jaGlsZCE9dGhpcy5wcm9wcy5jaGlsZClcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGUsIHtjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciB7c3RhcnRlZCwgZmluaXNoZWQsa25vd2xlZGdlOntnb2FsPVtdfSxjb250ZW50PXt9LCBzdW1tYXJ5PVtdfT1lbnRpdHksXG4gICAgICAgICAgICByZWFkb25seT1lbnRpdHkuYXV0aG9yLl9pZCE9VXNlci5jdXJyZW50Ll9pZCxcbiAgICAgICAgICAgIGFjdGlvbj1yZWFkb25seSA/IG51bGwgOiAoZmluaXNoZWQgPyBcIlB1Ymxpc2hcIiA6IChzdGFydGVkID8gXCJGaW5pc2hcIiA6IFwiU3RhcnRcIikpLFxuICAgICAgICAgICAgc2VuY29uZGFyeVN0eWxlPXtmb250U2l6ZTonc21hbGwnLGZvbnRXZWlnaHQ6J25vcm1hbCcsIHRleHRBbGlnbjoncmlnaHQnfTtcblxuICAgICAgICB2YXIgaGFzRWRpdG9yPWZhbHNlLCBrZXlzPXRoaXMua2V5cz1bXSxcbiAgICAgICAgICAgIGNvbnRlbnRFZGl0b3I9dWlLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkua25vd2xlZGdlLHRydWUsICh0bXBsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiB0bXBsLmNvbnRlbnRzLm1hcCgoYSwgaSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGEpPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIGhhc0VkaXRvcj10cnVlXG4gICAgICAgICAgICAgICAgICAgIHZhciB7a2V5LCBhbHR9PWFcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIGtleT17a2V5fSBvcGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PntrZXl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFZGl0b3IgcmVmPXtgZWRpdG9yLSR7a2V5fWB9IGNvbnRlbnQ9e2NvbnRlbnRba2V5XX0gYXBwZW5kYWJsZT17IXJlYWRvbmx5fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgdmFyIHN1bW1hcnlFZGl0b3JcbiAgICAgICAgaWYoc3VtbWFyeS5sZW5ndGggfHwgIWhhc0VkaXRvcil7XG4gICAgICAgICAgICBzdW1tYXJ5RWRpdG9yPSg8RWRpdG9yIHJlZj1cInN1bW1hcnlcIiBjb250ZW50PXtzdW1tYXJ5fSBhcHBlbmRhYmxlPXshcmVhZG9ubHl9Lz4pXG4gICAgICAgICAgICBpZihoYXNFZGl0b3IpXG4gICAgICAgICAgICAgICAgc3VtbWFyeUVkaXRvcj0oXG4gICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT5zdW1tYXJ5PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAge3N1bW1hcnlFZGl0b3J9XG4gICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAge2NvbnRlbnRFZGl0b3J9XG4gICAgICAgICAgICAgICAge3N1bW1hcnlFZGl0b3J9XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e2FjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIiwgXCJTYXZlXCIsIGFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1lbnQgdHlwZT17ZGJUYXNrfSBtb2RlbD17ZW50aXR5fSBrZXk9XCJjb21tZW50XCIvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLlNoYXJlIG1lc3NhZ2U9e2VudGl0eX0ga2V5PVwic2hhcmVcIi8+XX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlN0YXJ0XCI6XG4gICAgICAgICAgICBkYlRhc2suc3RhcnQodGhpcy5zdGF0ZS5lbnRpdHkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiRmluaXNoXCI6XG4gICAgICAgICAgICBkYlRhc2suZmluaXNoKHRoaXMuc3RhdGUuZW50aXR5KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIHRoaXMuX29uU2F2ZSgpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uU2F2ZSgpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGNvbnRlbnQ9e31cbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgICAgIHZhciBlZGl0b3I9dGhpcy5yZWZzW2BlZGl0b3ItJHtrZXl9YF07XG4gICAgICAgICAgICBjb250ZW50W2tleV09ZWRpdG9yLnZhbHVlXG4gICAgICAgICAgICBpZighZW50aXR5LnRodW1ibmFpbClcbiAgICAgICAgICAgICAgICBlbnRpdHkudGh1bWJuYWlsPWVkaXRvci50aHVtYm5haWxcbiAgICAgICAgfSlcbiAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuXG4gICAgICAgIHZhciBlZGl0b3JTdW1tYXJ5PXRoaXMucmVmcy5zdW1tYXJ5XG4gICAgICAgIGlmKGVkaXRvclN1bW1hcnkpXG4gICAgICAgICAgICBlbnRpdHkuc3VtbWFyeT1lZGl0b3JTdW1tYXJ5LnZhbHVlXG5cbiAgICAgICAgZGJUYXNrLnVwc2VydChlbnRpdHksICgpPT50aGlzLmZvcmNlVXBkYXRlKCkpXG4gICAgfVxufVxuVGFzay5jb250ZXh0VHlwZXM9e1xuICAgIHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufVxuIl19