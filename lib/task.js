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
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            dbTask.findOne({ _id: this.props.params._id }, function (entity) {
                return _this2.setState({ entity: entity });
            });
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
            var _this3 = this;

            var entity = this.state.entity;

            var content = {};
            this.keys.forEach(function (key) {
                var editor = _this3.refs['editor-' + key];
                content[key] = editor.value;
                if (!entity.thumbnail) entity.thumbnail = editor.thumbnail;
            });
            entity.content = content;

            var editorSummary = this.refs.summary;
            if (editorSummary) entity.summary = editorSummary.value;

            dbTask.upsert(entity, function () {
                return _this3.forceUpdate();
            });
        }
    }]);

    return Task;
}(Component);

exports.default = Task;

Task.contextTypes = { router: React.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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RGE7Ozs7a0NBbUJSOzs7Z0JBQ0EsU0FBUSxLQUFLLEtBQUwsQ0FBUixPQURBOztBQUVMLGdCQUFJLFVBQVEsRUFBUixDQUZDO0FBR0wsaUJBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsVUFBQyxHQUFELEVBQU87QUFDckIsb0JBQUksU0FBTyxPQUFLLElBQUwsYUFBb0IsR0FBcEIsQ0FBUCxDQURpQjtBQUVyQix3QkFBUSxHQUFSLElBQWEsT0FBTyxLQUFQLENBRlE7QUFHckIsb0JBQUcsQ0FBQyxPQUFPLFNBQVAsRUFDQSxPQUFPLFNBQVAsR0FBaUIsT0FBTyxTQUFQLENBRHJCO2FBSGMsQ0FBbEIsQ0FISztBQVNMLG1CQUFPLE9BQVAsR0FBZSxPQUFmLENBVEs7O0FBV0wsZ0JBQUksZ0JBQWMsS0FBSyxJQUFMLENBQVUsT0FBVixDQVhiO0FBWUwsZ0JBQUcsYUFBSCxFQUNJLE9BQU8sT0FBUCxHQUFlLGNBQWMsS0FBZCxDQURuQjs7QUFHQSxtQkFBTyxNQUFQLENBQWMsTUFBZCxFQUFzQjt1QkFBSSxPQUFLLFdBQUw7YUFBSixDQUF0QixDQWZLOzs7O1dBckZRO0VBQWE7O2tCQUFiOztBQXVHckIsS0FBSyxZQUFMLEdBQWtCLEVBQUMsUUFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsRUFBMUIiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7UmVhY3QsQ29tcG9uZW50LFVzZXIsVUk6e0xpc3QsIExvYWRpbmcsIENvbW1lbnQsIENvbW1hbmRCYXJ9fT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxuICAgIGRiVGFzaz1yZXF1aXJlKCcuL2RiL3Rhc2snKSxcbiAgICBkYkZhbWlseT1yZXF1aXJlKCcuL2RiL2ZhbWlseScpLFxuICAgIHVpS25vd2xlZGdlPXJlcXVpcmUoJy4va25vd2xlZGdlJyksXG4gICAgRWRpdG9yPXJlcXVpcmUoJy4vZWRpdG9yJyksXG4gICAgVGVtcGxhdGU9cmVxdWlyZSgnLi9wYXJzZXIvdGVtcGxhdGUnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIGVudGl0eTpudWxsXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgZGJUYXNrLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWR9LGVudGl0eT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSkpXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG4gICAgICAgIGlmIChuZXh0LmNoaWxkIT10aGlzLnByb3BzLmNoaWxkKVxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSwge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIHtzdGFydGVkLCBmaW5pc2hlZCxrbm93bGVkZ2U6e2dvYWw9W119LGNvbnRlbnQ9e30sIHN1bW1hcnk9W119PWVudGl0eSxcbiAgICAgICAgICAgIHJlYWRvbmx5PWVudGl0eS5hdXRob3IuX2lkIT1Vc2VyLmN1cnJlbnQuX2lkLFxuICAgICAgICAgICAgYWN0aW9uPXJlYWRvbmx5ID8gbnVsbCA6IChmaW5pc2hlZCA/IFwiUHVibGlzaFwiIDogKHN0YXJ0ZWQgPyBcIkZpbmlzaFwiIDogXCJTdGFydFwiKSksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9O1xuXG4gICAgICAgIHZhciBoYXNFZGl0b3I9ZmFsc2UsIGtleXM9dGhpcy5rZXlzPVtdLFxuICAgICAgICAgICAgY29udGVudEVkaXRvcj11aUtub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eS5rbm93bGVkZ2UsdHJ1ZSwgKHRtcGwpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtcGwuY29udGVudHMubWFwKChhLCBpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSk9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgaGFzRWRpdG9yPXRydWVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrZXksIGFsdH09YVxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMga2V5PXtrZXl9IG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+e2tleX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVkaXRvciByZWY9e2BlZGl0b3ItJHtrZXl9YH0gY29udGVudD17Y29udGVudFtrZXldfSBhcHBlbmRhYmxlPXshcmVhZG9ubHl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB2YXIgc3VtbWFyeUVkaXRvclxuICAgICAgICBpZihzdW1tYXJ5Lmxlbmd0aCB8fCAhaGFzRWRpdG9yKXtcbiAgICAgICAgICAgIHN1bW1hcnlFZGl0b3I9KDxFZGl0b3IgcmVmPVwic3VtbWFyeVwiIGNvbnRlbnQ9e3N1bW1hcnl9IGFwcGVuZGFibGU9eyFyZWFkb25seX0vPilcbiAgICAgICAgICAgIGlmKGhhc0VkaXRvcilcbiAgICAgICAgICAgICAgICBzdW1tYXJ5RWRpdG9yPShcbiAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PnN1bW1hcnk8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3VtbWFyeUVkaXRvcn1cbiAgICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICB7Y29udGVudEVkaXRvcn1cbiAgICAgICAgICAgICAgICB7c3VtbWFyeUVkaXRvcn1cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17YWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLCBcIlNhdmVcIiwgYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWVudCB0eXBlPXtkYlRhc2t9IG1vZGVsPXtlbnRpdHl9IGtleT1cImNvbW1lbnRcIi8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuU2hhcmUgbWVzc2FnZT17ZW50aXR5fSBrZXk9XCJzaGFyZVwiLz5dfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlIFwiU3RhcnRcIjpcbiAgICAgICAgICAgIGRiVGFzay5zdGFydCh0aGlzLnN0YXRlLmVudGl0eSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJGaW5pc2hcIjpcbiAgICAgICAgICAgIGRiVGFzay5maW5pc2godGhpcy5zdGF0ZS5lbnRpdHkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiU2F2ZVwiOlxuICAgICAgICAgICAgdGhpcy5fb25TYXZlKClcbiAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfb25TYXZlKCl7XG4gICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlO1xuICAgICAgICB2YXIgY29udGVudD17fVxuICAgICAgICB0aGlzLmtleXMuZm9yRWFjaCgoa2V5KT0+e1xuICAgICAgICAgICAgdmFyIGVkaXRvcj10aGlzLnJlZnNbYGVkaXRvci0ke2tleX1gXTtcbiAgICAgICAgICAgIGNvbnRlbnRba2V5XT1lZGl0b3IudmFsdWVcbiAgICAgICAgICAgIGlmKCFlbnRpdHkudGh1bWJuYWlsKVxuICAgICAgICAgICAgICAgIGVudGl0eS50aHVtYm5haWw9ZWRpdG9yLnRodW1ibmFpbFxuICAgICAgICB9KVxuICAgICAgICBlbnRpdHkuY29udGVudD1jb250ZW50XG5cbiAgICAgICAgdmFyIGVkaXRvclN1bW1hcnk9dGhpcy5yZWZzLnN1bW1hcnlcbiAgICAgICAgaWYoZWRpdG9yU3VtbWFyeSlcbiAgICAgICAgICAgIGVudGl0eS5zdW1tYXJ5PWVkaXRvclN1bW1hcnkudmFsdWVcblxuICAgICAgICBkYlRhc2sudXBzZXJ0KGVudGl0eSwgKCk9PnRoaXMuZm9yY2VVcGRhdGUoKSlcbiAgICB9XG59XG5UYXNrLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG4iXX0=