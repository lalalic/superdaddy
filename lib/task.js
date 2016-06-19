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

            var knowledge = entity.knowledge;

            return _qiliApp.React.createElement(
                'div',
                { className: 'post' },
                _qiliApp.React.createElement(
                    _Stepper.Stepper,
                    null,
                    knowledge.steps.map(function (_ref) {
                        var key = _ref.key;
                        var alt = _ref.alt;
                        return _qiliApp.React.createElement(
                            _Stepper.Step,
                            null,
                            _qiliApp.React.createElement(
                                _Stepper.StepLabel,
                                null,
                                key
                            ),
                            _qiliApp.React.createElement(
                                _Stepper.StepContent,
                                null,
                                _qiliApp.React.createElement(
                                    'p',
                                    null,
                                    alt
                                )
                            )
                        );
                    })
                ),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    onSelect: function onSelect(cmd) {
                        return _this3.onSelect(cmd);
                    },
                    items: ["Back", "Save", action, _qiliApp.React.createElement(CommandBar.Comment, { type: _task2.default, model: entity, key: 'comment' }), _qiliApp.React.createElement(CommandBar.Share, { message: entity, key: 'share' })] })
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
//# sourceMappingURL=data:application/json;base64,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O2FBSGMsQ0FBbEIsQ0FISztBQVNMLG1CQUFPLE9BQVAsR0FBZSxPQUFmLENBVEs7O0FBV0wsZ0JBQUksZ0JBQWMsS0FBSyxJQUFMLENBQVUsT0FBVixDQVhiO0FBWUwsZ0JBQUcsYUFBSCxFQUNJLE9BQU8sT0FBUCxHQUFlLGNBQWMsS0FBZCxDQURuQjs7QUFHQSwyQkFBTyxNQUFQLENBQWMsTUFBZCxFQUFzQjt1QkFBSSxPQUFLLFdBQUw7YUFBSixDQUF0QixDQWZLOzs7O1dBNURROzs7S0E2RWIsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQTdFUiIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsVXNlcixVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcbmltcG9ydCBkYkZhbWlseSBmcm9tICcuL2RiL2ZhbWlseSdcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9jb21wb25lbnRzL2VkaXRvcidcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL3BhcnNlci90ZW1wbGF0ZSdcblxuaW1wb3J0IHtTdGVwcGVyLCBTdGVwLCBTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtlbnRpdHk6bnVsbH1cblxuXHRnZXREYXRhKF9pZCl7XG5cdFx0bGV0IHtzdGF0ZX09dGhpcy5wcm9wcy5sb2NhdGlvblxuXHRcdGlmKHN0YXRlICYmIHN0YXRlLnRhc2spXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHk6c3RhdGUudGFza30pXG5cdFx0ZWxzZVxuXHRcdFx0ZGJUYXNrLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWR9LGVudGl0eT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSkpXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7ZW50aXR5fT10aGlzLnN0YXRlLCB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoIWVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICBjb25zdCB7a25vd2xlZGdlfT1lbnRpdHlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxTdGVwcGVyPlxuICAgICAgICAgICAgICAgIHtrbm93bGVkZ2Uuc3RlcHMubWFwKCh7a2V5LGFsdH0pPT4oXG4gICAgICAgICAgICAgICAgICAgIDxTdGVwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBMYWJlbD57a2V5fTwvU3RlcExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBDb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnthbHR9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGVwQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGVwPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvU3RlcHBlcj5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLCBcIlNhdmVcIiwgYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWVudCB0eXBlPXtkYlRhc2t9IG1vZGVsPXtlbnRpdHl9IGtleT1cImNvbW1lbnRcIi8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuU2hhcmUgbWVzc2FnZT17ZW50aXR5fSBrZXk9XCJzaGFyZVwiLz5dfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlIFwiU3RhcnRcIjpcbiAgICAgICAgICAgIGRiVGFzay5zdGFydCh0aGlzLnN0YXRlLmVudGl0eSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJTYXZlXCI6XG4gICAgICAgICAgICB0aGlzLl9vblNhdmUoKVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vblNhdmUoKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBjb250ZW50PXt9XG4gICAgICAgIHRoaXMua2V5cy5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgICAgICB2YXIgZWRpdG9yPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdO1xuICAgICAgICAgICAgY29udGVudFtrZXldPWVkaXRvci52YWx1ZVxuICAgICAgICAgICAgaWYoIWVudGl0eS50aHVtYm5haWwpXG4gICAgICAgICAgICAgICAgZW50aXR5LnRodW1ibmFpbD1lZGl0b3IudGh1bWJuYWlsXG4gICAgICAgIH0pXG4gICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcblxuICAgICAgICB2YXIgZWRpdG9yU3VtbWFyeT10aGlzLnJlZnMuc3VtbWFyeVxuICAgICAgICBpZihlZGl0b3JTdW1tYXJ5KVxuICAgICAgICAgICAgZW50aXR5LnN1bW1hcnk9ZWRpdG9yU3VtbWFyeS52YWx1ZVxuXG4gICAgICAgIGRiVGFzay51cHNlcnQoZW50aXR5LCAoKT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG4iXX0=