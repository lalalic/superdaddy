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

var _Stepper = require('material-ui/Stepper');

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
                contentEditor = _knowledge2.default.renderContent(entity.knowledge, null, function (tmpl) {

                var i = 0,
                    steps = tmpl.contents.map(function (a) {
                    if (typeof a == 'string') return null;
                    hasEditor = true;
                    var key = a.key;
                    var alt = a.alt;

                    keys.push(key);

                    return _qiliApp.React.createElement(
                        _Stepper.Step,
                        { key: key },
                        _qiliApp.React.createElement(
                            _Stepper.StepLabel,
                            null,
                            key
                        ),
                        _qiliApp.React.createElement(
                            _Stepper.StepContent,
                            null,
                            _qiliApp.React.createElement(_editor2.default, { ref: 'editor-' + key, content: content[key], appendable: !readonly }),
                            _qiliApp.React.createElement('br', null),
                            _qiliApp.React.createElement('br', null)
                        )
                    );
                }).filter(function (a) {
                    return a;
                });

                return _qiliApp.React.createElement(
                    _Stepper.Stepper,
                    { orientation: 'vertical' },
                    steps
                );
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
//# sourceMappingURL=data:application/json;base64,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QURBLHFCQU9LLFFBQUw7QUFDSSxtQ0FBTyxNQUFQLENBQWMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFkLENBQ0ssSUFETCxDQUNVLFlBQVU7QUFDWiw2QkFBSyxXQUFMLEdBRFk7cUJBQVYsQ0FFSixJQUZJLENBRUMsSUFGRCxDQURWLEVBREo7QUFLQSwwQkFMQTtBQVBBLHFCQWFLLE1BQUw7QUFDSSx5QkFBSyxPQUFMLEdBREo7QUFFQSwwQkFGQTtBQWJBLGFBRGE7Ozs7a0NBbUJSOzs7Z0JBQ0EsU0FBUSxLQUFLLEtBQUwsQ0FBUixPQURBOztBQUVMLGdCQUFJLFVBQVEsRUFBUixDQUZDO0FBR0wsaUJBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsVUFBQyxHQUFELEVBQU87QUFDckIsb0JBQUksU0FBTyxPQUFLLElBQUwsYUFBb0IsR0FBcEIsQ0FBUCxDQURpQjtBQUVyQix3QkFBUSxHQUFSLElBQWEsT0FBTyxLQUFQLENBRlE7QUFHckIsb0JBQUcsQ0FBQyxPQUFPLFNBQVAsRUFDQSxPQUFPLFNBQVAsR0FBaUIsT0FBTyxTQUFQLENBRHJCO2FBSGMsQ0FBbEIsQ0FISztBQVNMLG1CQUFPLE9BQVAsR0FBZSxPQUFmLENBVEs7O0FBV0wsZ0JBQUksZ0JBQWMsS0FBSyxJQUFMLENBQVUsT0FBVixDQVhiO0FBWUwsZ0JBQUcsYUFBSCxFQUNJLE9BQU8sT0FBUCxHQUFlLGNBQWMsS0FBZCxDQURuQjs7QUFHQSwyQkFBTyxNQUFQLENBQWMsTUFBZCxFQUFzQjt1QkFBSSxPQUFLLFdBQUw7YUFBSixDQUF0QixDQWZLOzs7O1dBNUdROzs7S0E2SGIsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQTdIUiIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsVXNlcixVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcbmltcG9ydCBkYkZhbWlseSBmcm9tICcuL2RiL2ZhbWlseSdcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9jb21wb25lbnRzL2VkaXRvcidcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL3BhcnNlci90ZW1wbGF0ZSdcblxuaW1wb3J0IHtTdGVwcGVyLCBTdGVwLCBTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgZW50aXR5Om51bGxcbiAgICAgICAgfVxuICAgIH1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLnRhc2spXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUudGFza30pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWR9LGVudGl0eT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSkpXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSwge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIHtzdGFydGVkLCBmaW5pc2hlZCxrbm93bGVkZ2U6e2dvYWw9W119LGNvbnRlbnQ9e30sIHN1bW1hcnk9W119PWVudGl0eSxcbiAgICAgICAgICAgIHJlYWRvbmx5PWVudGl0eS5hdXRob3IuX2lkIT1Vc2VyLmN1cnJlbnQuX2lkLFxuICAgICAgICAgICAgYWN0aW9uPXJlYWRvbmx5ID8gbnVsbCA6IChmaW5pc2hlZCA/IFwiUHVibGlzaFwiIDogKHN0YXJ0ZWQgPyBcIkZpbmlzaFwiIDogXCJTdGFydFwiKSksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9O1xuXG4gICAgICAgIHZhciBoYXNFZGl0b3I9ZmFsc2UsIGtleXM9dGhpcy5rZXlzPVtdLFxuICAgICAgICAgICAgY29udGVudEVkaXRvcj11aUtub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eS5rbm93bGVkZ2UsbnVsbCwgKHRtcGwpPT57XG5cbiAgICAgICAgICAgICAgICBsZXQgaT0wLFxuICAgICAgICAgICAgICAgICAgICBzdGVwcz10bXBsLmNvbnRlbnRzLm1hcChhPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYSk9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFZGl0b3I9dHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHtrZXksIGFsdH09YVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGVwTGFiZWw+e2tleX08L1N0ZXBMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBDb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVkaXRvciByZWY9e2BlZGl0b3ItJHtrZXl9YH0gY29udGVudD17Y29udGVudFtrZXldfSBhcHBlbmRhYmxlPXshcmVhZG9ubHl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGVwQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcihhPT5hKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3N0ZXBzfVxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXBwZXI+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgdmFyIHN1bW1hcnlFZGl0b3JcbiAgICAgICAgaWYoc3VtbWFyeS5sZW5ndGggfHwgIWhhc0VkaXRvcil7XG4gICAgICAgICAgICBzdW1tYXJ5RWRpdG9yPSg8RWRpdG9yIHJlZj1cInN1bW1hcnlcIiBjb250ZW50PXtzdW1tYXJ5fSBhcHBlbmRhYmxlPXshcmVhZG9ubHl9Lz4pXG4gICAgICAgICAgICBpZihoYXNFZGl0b3IpXG4gICAgICAgICAgICAgICAgc3VtbWFyeUVkaXRvcj0oXG4gICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT5zdW1tYXJ5PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAge3N1bW1hcnlFZGl0b3J9XG4gICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAge2NvbnRlbnRFZGl0b3J9XG4gICAgICAgICAgICAgICAge3N1bW1hcnlFZGl0b3J9XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17YWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiU2F2ZVwiLCBhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tZW50IHR5cGU9e2RiVGFza30gbW9kZWw9e2VudGl0eX0ga2V5PVwiY29tbWVudFwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5TaGFyZSBtZXNzYWdlPXtlbnRpdHl9IGtleT1cInNoYXJlXCIvPl19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJTdGFydFwiOlxuICAgICAgICAgICAgZGJUYXNrLnN0YXJ0KHRoaXMuc3RhdGUuZW50aXR5KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkZpbmlzaFwiOlxuICAgICAgICAgICAgZGJUYXNrLmZpbmlzaCh0aGlzLnN0YXRlLmVudGl0eSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJTYXZlXCI6XG4gICAgICAgICAgICB0aGlzLl9vblNhdmUoKVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vblNhdmUoKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBjb250ZW50PXt9XG4gICAgICAgIHRoaXMua2V5cy5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgICAgICB2YXIgZWRpdG9yPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdO1xuICAgICAgICAgICAgY29udGVudFtrZXldPWVkaXRvci52YWx1ZVxuICAgICAgICAgICAgaWYoIWVudGl0eS50aHVtYm5haWwpXG4gICAgICAgICAgICAgICAgZW50aXR5LnRodW1ibmFpbD1lZGl0b3IudGh1bWJuYWlsXG4gICAgICAgIH0pXG4gICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcblxuICAgICAgICB2YXIgZWRpdG9yU3VtbWFyeT10aGlzLnJlZnMuc3VtbWFyeVxuICAgICAgICBpZihlZGl0b3JTdW1tYXJ5KVxuICAgICAgICAgICAgZW50aXR5LnN1bW1hcnk9ZWRpdG9yU3VtbWFyeS52YWx1ZVxuXG4gICAgICAgIGRiVGFzay51cHNlcnQoZW50aXR5LCAoKT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG4iXX0=