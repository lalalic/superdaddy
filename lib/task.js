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
                    i++;
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
                    { orientation: 'vertical', className: 'stepper' },
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
//# sourceMappingURL=data:application/json;base64,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SjtBQUtBLDBCQUxBO0FBREEscUJBT0ssUUFBTDtBQUNJLG1DQUFPLE1BQVAsQ0FBYyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWQsQ0FDSyxJQURMLENBQ1UsWUFBVTtBQUNaLDZCQUFLLFdBQUwsR0FEWTtxQkFBVixDQUVKLElBRkksQ0FFQyxJQUZELENBRFYsRUFESjtBQUtBLDBCQUxBO0FBUEEscUJBYUssTUFBTDtBQUNJLHlCQUFLLE9BQUwsR0FESjtBQUVBLDBCQUZBO0FBYkEsYUFEYTs7OztrQ0FtQlI7OztnQkFDQSxTQUFRLEtBQUssS0FBTCxDQUFSLE9BREE7O0FBRUwsZ0JBQUksVUFBUSxFQUFSLENBRkM7QUFHTCxpQkFBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFDLEdBQUQsRUFBTztBQUNyQixvQkFBSSxTQUFPLE9BQUssSUFBTCxhQUFvQixHQUFwQixDQUFQLENBRGlCO0FBRXJCLHdCQUFRLEdBQVIsSUFBYSxPQUFPLEtBQVAsQ0FGUTtBQUdyQixvQkFBRyxDQUFDLE9BQU8sU0FBUCxFQUNBLE9BQU8sU0FBUCxHQUFpQixPQUFPLFNBQVAsQ0FEckI7YUFIYyxDQUFsQixDQUhLO0FBU0wsbUJBQU8sT0FBUCxHQUFlLE9BQWYsQ0FUSzs7QUFXTCxnQkFBSSxnQkFBYyxLQUFLLElBQUwsQ0FBVSxPQUFWLENBWGI7QUFZTCxnQkFBRyxhQUFILEVBQ0ksT0FBTyxPQUFQLEdBQWUsY0FBYyxLQUFkLENBRG5COztBQUdBLDJCQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCO3VCQUFJLE9BQUssV0FBTDthQUFKLENBQXRCLENBZks7Ozs7V0E3R1E7OztLQThIYixlQUFhLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBOUhSIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVc2VyLFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBkYlRhc2sgZnJvbSAnLi9kYi90YXNrJ1xuaW1wb3J0IGRiRmFtaWx5IGZyb20gJy4vZGIvZmFtaWx5J1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2NvbXBvbmVudHMvZWRpdG9yJ1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vcGFyc2VyL3RlbXBsYXRlJ1xuXG5pbXBvcnQge1N0ZXBwZXIsIFN0ZXAsIFN0ZXBMYWJlbCxTdGVwQ29udGVudH0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIENvbW1lbnQsIENvbW1hbmRCYXJ9PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBlbnRpdHk6bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG5cdGdldERhdGEoX2lkKXtcblx0XHRsZXQge3N0YXRlfT10aGlzLnByb3BzLmxvY2F0aW9uXG5cdFx0aWYoc3RhdGUgJiYgc3RhdGUudGFzaylcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eTpzdGF0ZS50YXNrfSlcblx0XHRlbHNlXG5cdFx0XHRkYlRhc2suZmluZE9uZSh7X2lkOnRoaXMucHJvcHMucGFyYW1zLl9pZH0sZW50aXR5PT50aGlzLnNldFN0YXRlKHtlbnRpdHl9KSlcblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlLCB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoIWVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICB2YXIge3N0YXJ0ZWQsIGZpbmlzaGVkLGtub3dsZWRnZTp7Z29hbD1bXX0sY29udGVudD17fSwgc3VtbWFyeT1bXX09ZW50aXR5LFxuICAgICAgICAgICAgcmVhZG9ubHk9ZW50aXR5LmF1dGhvci5faWQhPVVzZXIuY3VycmVudC5faWQsXG4gICAgICAgICAgICBhY3Rpb249cmVhZG9ubHkgPyBudWxsIDogKGZpbmlzaGVkID8gXCJQdWJsaXNoXCIgOiAoc3RhcnRlZCA/IFwiRmluaXNoXCIgOiBcIlN0YXJ0XCIpKSxcbiAgICAgICAgICAgIHNlbmNvbmRhcnlTdHlsZT17Zm9udFNpemU6J3NtYWxsJyxmb250V2VpZ2h0Oidub3JtYWwnLCB0ZXh0QWxpZ246J3JpZ2h0J307XG5cbiAgICAgICAgdmFyIGhhc0VkaXRvcj1mYWxzZSwga2V5cz10aGlzLmtleXM9W10sXG4gICAgICAgICAgICBjb250ZW50RWRpdG9yPXVpS25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5Lmtub3dsZWRnZSxudWxsLCAodG1wbCk9PntcblxuICAgICAgICAgICAgICAgIGxldCBpPTAsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzPXRtcGwuY29udGVudHMubWFwKGE9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihhKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0VkaXRvcj10cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB7a2V5LCBhbHR9PWFcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXAga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntrZXl9PC9TdGVwTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGVwQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFZGl0b3IgcmVmPXtgZWRpdG9yLSR7a2V5fWB9IGNvbnRlbnQ9e2NvbnRlbnRba2V5XX0gYXBwZW5kYWJsZT17IXJlYWRvbmx5fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGVwQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N0ZXA+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcihhPT5hKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGNsYXNzTmFtZT1cInN0ZXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzdGVwc31cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwcGVyPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIHZhciBzdW1tYXJ5RWRpdG9yXG4gICAgICAgIGlmKHN1bW1hcnkubGVuZ3RoIHx8ICFoYXNFZGl0b3Ipe1xuICAgICAgICAgICAgc3VtbWFyeUVkaXRvcj0oPEVkaXRvciByZWY9XCJzdW1tYXJ5XCIgY29udGVudD17c3VtbWFyeX0gYXBwZW5kYWJsZT17IXJlYWRvbmx5fS8+KVxuICAgICAgICAgICAgaWYoaGFzRWRpdG9yKVxuICAgICAgICAgICAgICAgIHN1bW1hcnlFZGl0b3I9KFxuICAgICAgICAgICAgICAgICAgICA8ZGV0YWlscyBvcGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+c3VtbWFyeTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzdW1tYXJ5RWRpdG9yfVxuICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIHtjb250ZW50RWRpdG9yfVxuICAgICAgICAgICAgICAgIHtzdW1tYXJ5RWRpdG9yfVxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJTYXZlXCIsIGFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1lbnQgdHlwZT17ZGJUYXNrfSBtb2RlbD17ZW50aXR5fSBrZXk9XCJjb21tZW50XCIvPixcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLlNoYXJlIG1lc3NhZ2U9e2VudGl0eX0ga2V5PVwic2hhcmVcIi8+XX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlN0YXJ0XCI6XG4gICAgICAgICAgICBkYlRhc2suc3RhcnQodGhpcy5zdGF0ZS5lbnRpdHkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiRmluaXNoXCI6XG4gICAgICAgICAgICBkYlRhc2suZmluaXNoKHRoaXMuc3RhdGUuZW50aXR5KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIHRoaXMuX29uU2F2ZSgpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uU2F2ZSgpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGNvbnRlbnQ9e31cbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgICAgIHZhciBlZGl0b3I9dGhpcy5yZWZzW2BlZGl0b3ItJHtrZXl9YF07XG4gICAgICAgICAgICBjb250ZW50W2tleV09ZWRpdG9yLnZhbHVlXG4gICAgICAgICAgICBpZighZW50aXR5LnRodW1ibmFpbClcbiAgICAgICAgICAgICAgICBlbnRpdHkudGh1bWJuYWlsPWVkaXRvci50aHVtYm5haWxcbiAgICAgICAgfSlcbiAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuXG4gICAgICAgIHZhciBlZGl0b3JTdW1tYXJ5PXRoaXMucmVmcy5zdW1tYXJ5XG4gICAgICAgIGlmKGVkaXRvclN1bW1hcnkpXG4gICAgICAgICAgICBlbnRpdHkuc3VtbWFyeT1lZGl0b3JTdW1tYXJ5LnZhbHVlXG5cbiAgICAgICAgZGJUYXNrLnVwc2VydChlbnRpdHksICgpPT50aGlzLmZvcmNlVXBkYXRlKCkpXG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==