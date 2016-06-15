'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _task = require('./db/task');

var _task2 = _interopRequireDefault(_task);

var _family = require('./db/family');

var _family2 = _interopRequireDefault(_family);

var _knowledge = require('./knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _editor = require('./components/editor');

var _editor2 = _interopRequireDefault(_editor);

var _template = require('./parser/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;

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
        key: 'getData',
        value: function getData(_id) {
            var _this2 = this;

            var state = this.props.location.state;

            if (state && state.task) this.setState({ entity: state.task });else _task2.default.findOne({ _id: this.props.params._id }, function (entity) {
                return _this2.setState({ entity: entity });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData(this.props.params._id);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.params._id != nextProps.params._id) this.getData(nextProps.params._id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var entity = this.state.entity;var child = this.props.child;

            if (!entity) return _qiliApp.React.createElement(Loading, null);

            var started = entity.started;
            var finished = entity.finished;
            var _entity$knowledge$goa = entity.knowledge.goal;
            var goal = _entity$knowledge$goa === undefined ? [] : _entity$knowledge$goa;
            var _entity$content = entity.content;
            var content = _entity$content === undefined ? {} : _entity$content;
            var _entity$summary = entity.summary;
            var summary = _entity$summary === undefined ? [] : _entity$summary;
            var readonly = entity.author._id != _qiliApp.User.current._id;
            var action = readonly ? null : finished ? "Publish" : started ? "Finish" : "Start";
            var sencondaryStyle = { fontSize: 'small', fontWeight: 'normal', textAlign: 'right' };

            var hasEditor = false,
                keys = this.keys = [],
                contentEditor = _knowledge2.default.renderContent(entity.knowledge, true, function (tmpl) {
                return tmpl.contents.map(function (a, i) {
                    if (typeof a == 'string') return null;
                    hasEditor = true;
                    var key = a.key;
                    var alt = a.alt;

                    keys.push(key);
                    return _qiliApp.React.createElement(
                        'details',
                        { key: key, open: 'true' },
                        _qiliApp.React.createElement(
                            'summary',
                            null,
                            key
                        ),
                        _qiliApp.React.createElement(_editor2.default, { ref: 'editor-' + key, content: content[key], appendable: !readonly })
                    );
                });
            });
            var summaryEditor;
            if (summary.length || !hasEditor) {
                summaryEditor = _qiliApp.React.createElement(_editor2.default, { ref: 'summary', content: summary, appendable: !readonly });
                if (hasEditor) summaryEditor = _qiliApp.React.createElement(
                    'details',
                    { open: 'true' },
                    _qiliApp.React.createElement(
                        'summary',
                        null,
                        'summary'
                    ),
                    summaryEditor
                );
            }

            return _qiliApp.React.createElement(
                'div',
                { className: 'post' },
                contentEditor,
                summaryEditor,
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    onSelect: function onSelect(cmd) {
                        return _this3.onSelect(cmd);
                    },
                    primary: action,
                    items: ["Save", action, _qiliApp.React.createElement(CommandBar.Comment, { type: _task2.default, model: entity, key: 'comment' }), _qiliApp.React.createElement(CommandBar.Share, { message: entity, key: 'share' })] })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            switch (command) {
                case "Start":
                    _task2.default.start(this.state.entity).then(function () {
                        this.forceUpdate();
                    }.bind(this));
                    break;
                case "Finish":
                    _task2.default.finish(this.state.entity).then(function () {
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
            var _this4 = this;

            var entity = this.state.entity;

            var content = {};
            this.keys.forEach(function (key) {
                var editor = _this4.refs['editor-' + key];
                content[key] = editor.value;
                if (!entity.thumbnail) entity.thumbnail = editor.thumbnail;
            });
            entity.content = content;

            var editorSummary = this.refs.summary;
            if (editorSummary) entity.summary = editorSummary.value;

            _task2.default.upsert(entity, function () {
                return _this4.forceUpdate();
            });
        }
    }]);

    return Task;
}(_qiliApp.Component);

Task.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Task;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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RkQsQ0FEVixFQURKO0FBS0EsMEJBTEE7QUFQQSxxQkFhSyxNQUFMO0FBQ0kseUJBQUssT0FBTCxHQURKO0FBRUEsMEJBRkE7QUFiQSxhQURhOzs7O2tDQW1CUjs7O2dCQUNBLFNBQVEsS0FBSyxLQUFMLENBQVIsT0FEQTs7QUFFTCxnQkFBSSxVQUFRLEVBQVIsQ0FGQztBQUdMLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQUMsR0FBRCxFQUFPO0FBQ3JCLG9CQUFJLFNBQU8sT0FBSyxJQUFMLGFBQW9CLEdBQXBCLENBQVAsQ0FEaUI7QUFFckIsd0JBQVEsR0FBUixJQUFhLE9BQU8sS0FBUCxDQUZRO0FBR3JCLG9CQUFHLENBQUMsT0FBTyxTQUFQLEVBQ0EsT0FBTyxTQUFQLEdBQWlCLE9BQU8sU0FBUCxDQURyQjthQUhjLENBQWxCLENBSEs7QUFTTCxtQkFBTyxPQUFQLEdBQWUsT0FBZixDQVRLOztBQVdMLGdCQUFJLGdCQUFjLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FYYjtBQVlMLGdCQUFHLGFBQUgsRUFDSSxPQUFPLE9BQVAsR0FBZSxjQUFjLEtBQWQsQ0FEbkI7O0FBR0EsMkJBQU8sTUFBUCxDQUFjLE1BQWQsRUFBc0I7dUJBQUksT0FBSyxXQUFMO2FBQUosQ0FBdEIsQ0FmSzs7OztXQWhHUTs7O0tBaUhiLGVBQWEsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQjtrQkFqSFIiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVzZXIsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5pbXBvcnQgZGJGYW1pbHkgZnJvbSAnLi9kYi9mYW1pbHknXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vY29tcG9uZW50cy9lZGl0b3InXG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9wYXJzZXIvdGVtcGxhdGUnXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgZW50aXR5Om51bGxcbiAgICAgICAgfVxuICAgIH1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLnRhc2spXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUudGFza30pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWR9LGVudGl0eT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSkpXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSwge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIHtzdGFydGVkLCBmaW5pc2hlZCxrbm93bGVkZ2U6e2dvYWw9W119LGNvbnRlbnQ9e30sIHN1bW1hcnk9W119PWVudGl0eSxcbiAgICAgICAgICAgIHJlYWRvbmx5PWVudGl0eS5hdXRob3IuX2lkIT1Vc2VyLmN1cnJlbnQuX2lkLFxuICAgICAgICAgICAgYWN0aW9uPXJlYWRvbmx5ID8gbnVsbCA6IChmaW5pc2hlZCA/IFwiUHVibGlzaFwiIDogKHN0YXJ0ZWQgPyBcIkZpbmlzaFwiIDogXCJTdGFydFwiKSksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9O1xuXG4gICAgICAgIHZhciBoYXNFZGl0b3I9ZmFsc2UsIGtleXM9dGhpcy5rZXlzPVtdLFxuICAgICAgICAgICAgY29udGVudEVkaXRvcj11aUtub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eS5rbm93bGVkZ2UsdHJ1ZSwgKHRtcGwpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtcGwuY29udGVudHMubWFwKChhLCBpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSk9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgaGFzRWRpdG9yPXRydWVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrZXksIGFsdH09YVxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMga2V5PXtrZXl9IG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+e2tleX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVkaXRvciByZWY9e2BlZGl0b3ItJHtrZXl9YH0gY29udGVudD17Y29udGVudFtrZXldfSBhcHBlbmRhYmxlPXshcmVhZG9ubHl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB2YXIgc3VtbWFyeUVkaXRvclxuICAgICAgICBpZihzdW1tYXJ5Lmxlbmd0aCB8fCAhaGFzRWRpdG9yKXtcbiAgICAgICAgICAgIHN1bW1hcnlFZGl0b3I9KDxFZGl0b3IgcmVmPVwic3VtbWFyeVwiIGNvbnRlbnQ9e3N1bW1hcnl9IGFwcGVuZGFibGU9eyFyZWFkb25seX0vPilcbiAgICAgICAgICAgIGlmKGhhc0VkaXRvcilcbiAgICAgICAgICAgICAgICBzdW1tYXJ5RWRpdG9yPShcbiAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PnN1bW1hcnk8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3VtbWFyeUVkaXRvcn1cbiAgICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICB7Y29udGVudEVkaXRvcn1cbiAgICAgICAgICAgICAgICB7c3VtbWFyeUVkaXRvcn1cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXthY3Rpb259XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJTYXZlXCIsIGFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1lbnQgdHlwZT17ZGJUYXNrfSBtb2RlbD17ZW50aXR5fSBrZXk9XCJjb21tZW50XCIvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLlNoYXJlIG1lc3NhZ2U9e2VudGl0eX0ga2V5PVwic2hhcmVcIi8+XX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlN0YXJ0XCI6XG4gICAgICAgICAgICBkYlRhc2suc3RhcnQodGhpcy5zdGF0ZS5lbnRpdHkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiRmluaXNoXCI6XG4gICAgICAgICAgICBkYlRhc2suZmluaXNoKHRoaXMuc3RhdGUuZW50aXR5KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIHRoaXMuX29uU2F2ZSgpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uU2F2ZSgpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGNvbnRlbnQ9e31cbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgICAgIHZhciBlZGl0b3I9dGhpcy5yZWZzW2BlZGl0b3ItJHtrZXl9YF07XG4gICAgICAgICAgICBjb250ZW50W2tleV09ZWRpdG9yLnZhbHVlXG4gICAgICAgICAgICBpZighZW50aXR5LnRodW1ibmFpbClcbiAgICAgICAgICAgICAgICBlbnRpdHkudGh1bWJuYWlsPWVkaXRvci50aHVtYm5haWxcbiAgICAgICAgfSlcbiAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuXG4gICAgICAgIHZhciBlZGl0b3JTdW1tYXJ5PXRoaXMucmVmcy5zdW1tYXJ5XG4gICAgICAgIGlmKGVkaXRvclN1bW1hcnkpXG4gICAgICAgICAgICBlbnRpdHkuc3VtbWFyeT1lZGl0b3JTdW1tYXJ5LnZhbHVlXG5cbiAgICAgICAgZGJUYXNrLnVwc2VydChlbnRpdHksICgpPT50aGlzLmZvcmNlVXBkYXRlKCkpXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==