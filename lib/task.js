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

    function Task() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Task);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Task)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { entity: null }, _temp), _possibleConstructorReturn(_this, _ret);
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
                            { onClick: true },
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
//# sourceMappingURL=data:application/json;base64,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QVgsQ0FBZCxDQUNLLElBREwsQ0FDVSxZQUFVO0FBQ1osNkJBQUssV0FBTCxHQURZO3FCQUFWLENBRUosSUFGSSxDQUVDLElBRkQsQ0FEVixFQURKO0FBS0EsMEJBTEE7QUFQQSxxQkFhSyxNQUFMO0FBQ0kseUJBQUssT0FBTCxHQURKO0FBRUEsMEJBRkE7QUFiQSxhQURhOzs7O2tDQW1CUjs7O2dCQUNBLFNBQVEsS0FBSyxLQUFMLENBQVIsT0FEQTs7QUFFTCxnQkFBSSxVQUFRLEVBQVIsQ0FGQztBQUdMLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQUMsR0FBRCxFQUFPO0FBQ3JCLG9CQUFJLFNBQU8sT0FBSyxJQUFMLGFBQW9CLEdBQXBCLENBQVAsQ0FEaUI7QUFFckIsd0JBQVEsR0FBUixJQUFhLE9BQU8sS0FBUCxDQUZRO0FBR3JCLG9CQUFHLENBQUMsT0FBTyxTQUFQLEVBQ0EsT0FBTyxTQUFQLEdBQWlCLE9BQU8sU0FBUCxDQURyQjthQUhjLENBQWxCLENBSEs7QUFTTCxtQkFBTyxPQUFQLEdBQWUsT0FBZixDQVRLOztBQVdMLGdCQUFJLGdCQUFjLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FYYjtBQVlMLGdCQUFHLGFBQUgsRUFDSSxPQUFPLE9BQVAsR0FBZSxjQUFjLEtBQWQsQ0FEbkI7O0FBR0EsMkJBQU8sTUFBUCxDQUFjLE1BQWQsRUFBc0I7dUJBQUksT0FBSyxXQUFMO2FBQUosQ0FBdEIsQ0FmSzs7OztXQXhHUTs7O0tBeUhiLGVBQWEsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQjtrQkF6SFIiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVzZXIsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5pbXBvcnQgZGJGYW1pbHkgZnJvbSAnLi9kYi9mYW1pbHknXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vY29tcG9uZW50cy9lZGl0b3InXG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnLi9wYXJzZXIvdGVtcGxhdGUnXG5cbmltcG9ydCB7U3RlcHBlciwgU3RlcCwgU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZW50aXR5Om51bGx9XG5cblx0Z2V0RGF0YShfaWQpe1xuXHRcdGxldCB7c3RhdGV9PXRoaXMucHJvcHMubG9jYXRpb25cblx0XHRpZihzdGF0ZSAmJiBzdGF0ZS50YXNrKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnN0YXRlLnRhc2t9KVxuXHRcdGVsc2Vcblx0XHRcdGRiVGFzay5maW5kT25lKHtfaWQ6dGhpcy5wcm9wcy5wYXJhbXMuX2lkfSxlbnRpdHk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eX0pKVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGUsIHtjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICBpZighZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuICg8TG9hZGluZy8+KVxuXG4gICAgICAgIHZhciB7c3RhcnRlZCwgZmluaXNoZWQsa25vd2xlZGdlOntnb2FsPVtdfSxjb250ZW50PXt9LCBzdW1tYXJ5PVtdfT1lbnRpdHksXG4gICAgICAgICAgICByZWFkb25seT1lbnRpdHkuYXV0aG9yLl9pZCE9VXNlci5jdXJyZW50Ll9pZCxcbiAgICAgICAgICAgIGFjdGlvbj1yZWFkb25seSA/IG51bGwgOiAoZmluaXNoZWQgPyBcIlB1Ymxpc2hcIiA6IChzdGFydGVkID8gXCJGaW5pc2hcIiA6IFwiU3RhcnRcIikpLFxuICAgICAgICAgICAgc2VuY29uZGFyeVN0eWxlPXtmb250U2l6ZTonc21hbGwnLGZvbnRXZWlnaHQ6J25vcm1hbCcsIHRleHRBbGlnbjoncmlnaHQnfTtcblxuICAgICAgICB2YXIgaGFzRWRpdG9yPWZhbHNlLCBrZXlzPXRoaXMua2V5cz1bXSxcbiAgICAgICAgICAgIGNvbnRlbnRFZGl0b3I9dWlLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkua25vd2xlZGdlLG51bGwsICh0bXBsKT0+e1xuXG4gICAgICAgICAgICAgICAgbGV0IGk9MCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM9dG1wbC5jb250ZW50cy5tYXAoYT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGEpPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRWRpdG9yPXRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHtrZXksIGFsdH09YVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RlcCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGVwTGFiZWwgb25DbGljaz57a2V5fTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RlcENvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RWRpdG9yIHJlZj17YGVkaXRvci0ke2tleX1gfSBjb250ZW50PXtjb250ZW50W2tleV19IGFwcGVuZGFibGU9eyFyZWFkb25seX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU3RlcENvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KS5maWx0ZXIoYT0+YSlcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBjbGFzc05hbWU9XCJzdGVwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RlcHN9XG4gICAgICAgICAgICAgICAgICAgIDwvU3RlcHBlcj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICB2YXIgc3VtbWFyeUVkaXRvclxuICAgICAgICBpZihzdW1tYXJ5Lmxlbmd0aCB8fCAhaGFzRWRpdG9yKXtcbiAgICAgICAgICAgIHN1bW1hcnlFZGl0b3I9KDxFZGl0b3IgcmVmPVwic3VtbWFyeVwiIGNvbnRlbnQ9e3N1bW1hcnl9IGFwcGVuZGFibGU9eyFyZWFkb25seX0vPilcbiAgICAgICAgICAgIGlmKGhhc0VkaXRvcilcbiAgICAgICAgICAgICAgICBzdW1tYXJ5RWRpdG9yPShcbiAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PnN1bW1hcnk8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3VtbWFyeUVkaXRvcn1cbiAgICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICB7Y29udGVudEVkaXRvcn1cbiAgICAgICAgICAgICAgICB7c3VtbWFyeUVkaXRvcn1cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiU2F2ZVwiLCBhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tZW50IHR5cGU9e2RiVGFza30gbW9kZWw9e2VudGl0eX0ga2V5PVwiY29tbWVudFwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5TaGFyZSBtZXNzYWdlPXtlbnRpdHl9IGtleT1cInNoYXJlXCIvPl19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJTdGFydFwiOlxuICAgICAgICAgICAgZGJUYXNrLnN0YXJ0KHRoaXMuc3RhdGUuZW50aXR5KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkZpbmlzaFwiOlxuICAgICAgICAgICAgZGJUYXNrLmZpbmlzaCh0aGlzLnN0YXRlLmVudGl0eSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJTYXZlXCI6XG4gICAgICAgICAgICB0aGlzLl9vblNhdmUoKVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vblNhdmUoKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBjb250ZW50PXt9XG4gICAgICAgIHRoaXMua2V5cy5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgICAgICB2YXIgZWRpdG9yPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdO1xuICAgICAgICAgICAgY29udGVudFtrZXldPWVkaXRvci52YWx1ZVxuICAgICAgICAgICAgaWYoIWVudGl0eS50aHVtYm5haWwpXG4gICAgICAgICAgICAgICAgZW50aXR5LnRodW1ibmFpbD1lZGl0b3IudGh1bWJuYWlsXG4gICAgICAgIH0pXG4gICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcblxuICAgICAgICB2YXIgZWRpdG9yU3VtbWFyeT10aGlzLnJlZnMuc3VtbWFyeVxuICAgICAgICBpZihlZGl0b3JTdW1tYXJ5KVxuICAgICAgICAgICAgZW50aXR5LnN1bW1hcnk9ZWRpdG9yU3VtbWFyeS52YWx1ZVxuXG4gICAgICAgIGRiVGFzay51cHNlcnQoZW50aXR5LCAoKT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG4iXX0=