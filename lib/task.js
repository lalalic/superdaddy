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
                var steps = tmpl.contents.map(function (a, i) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRU87SUFBTTtJQUFTO0lBQVM7O0lBRVY7OztBQUNqQixhQURpQixJQUNqQixDQUFZLEtBQVosRUFBa0I7OEJBREQsTUFDQzs7MkVBREQsaUJBRVAsUUFEUTs7QUFFZCxjQUFLLEtBQUwsR0FBVztBQUNQLG9CQUFPLElBQVA7U0FESixDQUZjOztLQUFsQjs7aUJBRGlCOztnQ0FRWixLQUFJOzs7Z0JBQ04sUUFBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQVAsTUFETTs7QUFFWCxnQkFBRyxTQUFTLE1BQU0sSUFBTixFQUNYLEtBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxNQUFNLElBQU4sRUFBdEIsRUFERCxLQUdDLGVBQU8sT0FBUCxDQUFlLEVBQUMsS0FBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLEVBQXBCLEVBQTJDO3VCQUFRLE9BQUssUUFBTCxDQUFjLEVBQUMsY0FBRCxFQUFkO2FBQVIsQ0FBM0MsQ0FIRDs7Ozs0Q0FNcUI7QUFDZixpQkFBSyxPQUFMLENBQWEsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixHQUFsQixDQUFiLENBRGU7Ozs7a0RBSU8sV0FBVTtBQUNoQyxnQkFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLElBQXVCLFVBQVUsTUFBVixDQUFpQixHQUFqQixFQUMvQixLQUFLLE9BQUwsQ0FBYSxVQUFVLE1BQVYsQ0FBaUIsR0FBakIsQ0FBYixDQURLOzs7O2lDQUlJOzs7QUFDQSxnQkFBQyxTQUFRLEtBQUssS0FBTCxDQUFSLE1BQUQsQ0FEQSxJQUNzQixRQUFPLEtBQUssS0FBTCxDQUFQLE1BRHRCOztBQUVKLGdCQUFHLENBQUMsTUFBRCxFQUNDLE9BQVEsNkJBQUMsT0FBRCxPQUFSLENBREo7O2dCQUdLLFVBQThELE9BQTlELFFBTEQ7Z0JBS1UsV0FBcUQsT0FBckQsU0FMVjt3Q0FLK0QsT0FBNUMsVUFBVyxLQUw5QjtnQkFLOEIsNkNBQUssMkJBTG5DO2tDQUsrRCxPQUF4QixRQUx2QztnQkFLdUMsMENBQVEscUJBTC9DO2tDQUsrRCxPQUFaLFFBTG5EO0FBS0EsZ0JBQW1ELDBDQUFRLG9CQUEzRCxDQUxBO0FBTUEsMkJBQVMsT0FBTyxNQUFQLENBQWMsR0FBZCxJQUFtQixjQUFLLE9BQUwsQ0FBYSxHQUFiLENBTjVCO0FBT0EseUJBQU8sV0FBVyxJQUFYLEdBQW1CLFdBQVcsU0FBWCxHQUF3QixVQUFVLFFBQVYsR0FBcUIsT0FBckIsQ0FQbEQ7QUFRQSxrQ0FBZ0IsRUFBQyxVQUFTLE9BQVQsRUFBaUIsWUFBVyxRQUFYLEVBQXFCLFdBQVUsT0FBVixFQUF2RCxDQVJBOztBQVVKLGdCQUFJLFlBQVUsS0FBVjtnQkFBaUIsT0FBSyxLQUFLLElBQUwsR0FBVSxFQUFWO2dCQUN0QixnQkFBYyxvQkFBWSxhQUFaLENBQTBCLE9BQU8sU0FBUCxFQUFpQixJQUEzQyxFQUFpRCxVQUFDLElBQUQsRUFBUTtBQUNuRSxvQkFBSSxRQUFNLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFRO0FBQ2hDLHdCQUFHLE9BQU8sQ0FBUCxJQUFXLFFBQVgsRUFDQyxPQUFPLElBQVAsQ0FESjtBQUVBLGdDQUFVLElBQVYsQ0FIZ0M7d0JBSTNCLE1BQVUsRUFBVixJQUoyQjt3QkFJdEIsTUFBSyxFQUFMLElBSnNCOztBQUtoQyx5QkFBSyxJQUFMLENBQVUsR0FBVixFQUxnQzs7QUFPaEMsMkJBQ0k7OzBCQUFNLEtBQUssR0FBTCxFQUFOO3dCQUNJOzs7NEJBQVksR0FBWjt5QkFESjt3QkFFSTs7OzRCQUNJLGlEQUFRLGlCQUFlLEdBQWYsRUFBc0IsU0FBUyxRQUFRLEdBQVIsQ0FBVCxFQUF1QixZQUFZLENBQUMsUUFBRCxFQUFqRSxDQURKOzRCQUVJLHdDQUZKOzRCQUVTLHdDQUZUO3lCQUZKO3FCQURKLENBUGdDO2lCQUFSLENBQWxCLENBZ0JQLE1BaEJPLENBZ0JBOzJCQUFHO2lCQUFILENBaEJOLENBRCtEOztBQW1CbkUsdUJBQ0k7O3NCQUFTLGFBQVksVUFBWixFQUFUO29CQUNLLEtBREw7aUJBREosQ0FuQm1FO2FBQVIsQ0FBL0QsQ0FYQTtBQW9DSixnQkFBSSxhQUFKLENBcENJO0FBcUNKLGdCQUFHLFFBQVEsTUFBUixJQUFrQixDQUFDLFNBQUQsRUFBVztBQUM1QixnQ0FBZSxpREFBUSxLQUFJLFNBQUosRUFBYyxTQUFTLE9BQVQsRUFBa0IsWUFBWSxDQUFDLFFBQUQsRUFBcEQsQ0FBZixDQUQ0QjtBQUU1QixvQkFBRyxTQUFILEVBQ0ksZ0JBQ0k7O3NCQUFTLE1BQUssTUFBTCxFQUFUO29CQUNJOzs7O3FCQURKO29CQUVLLGFBRkw7aUJBREosQ0FESjthQUZKOztBQVdBLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDSyxhQURMO2dCQUVLLGFBRkw7Z0JBR0ksNkJBQUMsVUFBRDtBQUNJLCtCQUFVLFNBQVY7QUFDQSw4QkFBVTsrQkFBSyxPQUFLLFFBQUwsQ0FBYyxHQUFkO3FCQUFMO0FBQ1YsNkJBQVMsTUFBVDtBQUNBLDJCQUFPLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFDSCw2QkFBQyxXQUFXLE9BQVosSUFBb0Isc0JBQWMsT0FBTyxNQUFQLEVBQWUsS0FBSSxTQUFKLEVBQWpELENBREcsRUFFSCw2QkFBQyxXQUFXLEtBQVosSUFBa0IsU0FBUyxNQUFULEVBQWlCLEtBQUksT0FBSixFQUFuQyxDQUZHLENBQVAsRUFKSixDQUhKO2FBREosQ0FoREk7Ozs7aUNBOERDLFNBQVE7QUFDYixvQkFBTyxPQUFQO0FBQ0EscUJBQUssT0FBTDtBQUNJLG1DQUFPLEtBQVAsQ0FBYSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWIsQ0FDSyxJQURMLENBQ1UsWUFBVTtBQUNaLDZCQUFLLFdBQUwsR0FEWTtxQkFBVixDQUVKLElBRkksQ0FFQyxJQUZELENBRFYsRUFESjtBQUtBLDBCQUxBO0FBREEscUJBT0ssUUFBTDtBQUNJLG1DQUFPLE1BQVAsQ0FBYyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWQsQ0FDSyxJQURMLENBQ1UsWUFBVTtBQUNaLDZCQUFLLFdBQUwsR0FEWTtxQkFBVixDQUVKLElBRkksQ0FFQyxJQUZELENBRFYsRUFESjtBQUtBLDBCQUxBO0FBUEEscUJBYUssTUFBTDtBQUNJLHlCQUFLLE9BQUwsR0FESjtBQUVBLDBCQUZBO0FBYkEsYUFEYTs7OztrQ0FtQlI7OztnQkFDQSxTQUFRLEtBQUssS0FBTCxDQUFSLE9BREE7O0FBRUwsZ0JBQUksVUFBUSxFQUFSLENBRkM7QUFHTCxpQkFBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFDLEdBQUQsRUFBTztBQUNyQixvQkFBSSxTQUFPLE9BQUssSUFBTCxhQUFvQixHQUFwQixDQUFQLENBRGlCO0FBRXJCLHdCQUFRLEdBQVIsSUFBYSxPQUFPLEtBQVAsQ0FGUTtBQUdyQixvQkFBRyxDQUFDLE9BQU8sU0FBUCxFQUNBLE9BQU8sU0FBUCxHQUFpQixPQUFPLFNBQVAsQ0FEckI7YUFIYyxDQUFsQixDQUhLO0FBU0wsbUJBQU8sT0FBUCxHQUFlLE9BQWYsQ0FUSzs7QUFXTCxnQkFBSSxnQkFBYyxLQUFLLElBQUwsQ0FBVSxPQUFWLENBWGI7QUFZTCxnQkFBRyxhQUFILEVBQ0ksT0FBTyxPQUFQLEdBQWUsY0FBYyxLQUFkLENBRG5COztBQUdBLDJCQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCO3VCQUFJLE9BQUssV0FBTDthQUFKLENBQXRCLENBZks7Ozs7V0ExR1E7OztLQTJIYixlQUFhLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBM0hSIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVc2VyLFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBkYlRhc2sgZnJvbSAnLi9kYi90YXNrJ1xuaW1wb3J0IGRiRmFtaWx5IGZyb20gJy4vZGIvZmFtaWx5J1xuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2NvbXBvbmVudHMvZWRpdG9yJ1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vcGFyc2VyL3RlbXBsYXRlJ1xuXG5pbXBvcnQge1N0ZXBwZXIsIFN0ZXAsIFN0ZXBMYWJlbCxTdGVwQ29udGVudH0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIENvbW1lbnQsIENvbW1hbmRCYXJ9PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBlbnRpdHk6bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG5cdGdldERhdGEoX2lkKXtcblx0XHRsZXQge3N0YXRlfT10aGlzLnByb3BzLmxvY2F0aW9uXG5cdFx0aWYoc3RhdGUgJiYgc3RhdGUudGFzaylcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eTpzdGF0ZS50YXNrfSlcblx0XHRlbHNlXG5cdFx0XHRkYlRhc2suZmluZE9uZSh7X2lkOnRoaXMucHJvcHMucGFyYW1zLl9pZH0sZW50aXR5PT50aGlzLnNldFN0YXRlKHtlbnRpdHl9KSlcblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlLCB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoIWVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICB2YXIge3N0YXJ0ZWQsIGZpbmlzaGVkLGtub3dsZWRnZTp7Z29hbD1bXX0sY29udGVudD17fSwgc3VtbWFyeT1bXX09ZW50aXR5LFxuICAgICAgICAgICAgcmVhZG9ubHk9ZW50aXR5LmF1dGhvci5faWQhPVVzZXIuY3VycmVudC5faWQsXG4gICAgICAgICAgICBhY3Rpb249cmVhZG9ubHkgPyBudWxsIDogKGZpbmlzaGVkID8gXCJQdWJsaXNoXCIgOiAoc3RhcnRlZCA/IFwiRmluaXNoXCIgOiBcIlN0YXJ0XCIpKSxcbiAgICAgICAgICAgIHNlbmNvbmRhcnlTdHlsZT17Zm9udFNpemU6J3NtYWxsJyxmb250V2VpZ2h0Oidub3JtYWwnLCB0ZXh0QWxpZ246J3JpZ2h0J307XG5cbiAgICAgICAgdmFyIGhhc0VkaXRvcj1mYWxzZSwga2V5cz10aGlzLmtleXM9W10sXG4gICAgICAgICAgICBjb250ZW50RWRpdG9yPXVpS25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5Lmtub3dsZWRnZSxudWxsLCAodG1wbCk9PntcbiAgICAgICAgICAgICAgICBsZXQgc3RlcHM9dG1wbC5jb250ZW50cy5tYXAoKGEsIGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihhKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICBoYXNFZGl0b3I9dHJ1ZVxuICAgICAgICAgICAgICAgICAgICB2YXIge2tleSwgYWx0fT1hXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGVwIGtleT17a2V5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RlcExhYmVsPntrZXl9PC9TdGVwTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0ZXBDb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RWRpdG9yIHJlZj17YGVkaXRvci0ke2tleX1gfSBjb250ZW50PXtjb250ZW50W2tleV19IGFwcGVuZGFibGU9eyFyZWFkb25seX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdGVwQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU3RlcD5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pLmZpbHRlcihhPT5hKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3N0ZXBzfVxuICAgICAgICAgICAgICAgICAgICA8L1N0ZXBwZXI+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgdmFyIHN1bW1hcnlFZGl0b3JcbiAgICAgICAgaWYoc3VtbWFyeS5sZW5ndGggfHwgIWhhc0VkaXRvcil7XG4gICAgICAgICAgICBzdW1tYXJ5RWRpdG9yPSg8RWRpdG9yIHJlZj1cInN1bW1hcnlcIiBjb250ZW50PXtzdW1tYXJ5fSBhcHBlbmRhYmxlPXshcmVhZG9ubHl9Lz4pXG4gICAgICAgICAgICBpZihoYXNFZGl0b3IpXG4gICAgICAgICAgICAgICAgc3VtbWFyeUVkaXRvcj0oXG4gICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT5zdW1tYXJ5PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAge3N1bW1hcnlFZGl0b3J9XG4gICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAge2NvbnRlbnRFZGl0b3J9XG4gICAgICAgICAgICAgICAge3N1bW1hcnlFZGl0b3J9XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17YWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiU2F2ZVwiLCBhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tZW50IHR5cGU9e2RiVGFza30gbW9kZWw9e2VudGl0eX0ga2V5PVwiY29tbWVudFwiLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5TaGFyZSBtZXNzYWdlPXtlbnRpdHl9IGtleT1cInNoYXJlXCIvPl19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJTdGFydFwiOlxuICAgICAgICAgICAgZGJUYXNrLnN0YXJ0KHRoaXMuc3RhdGUuZW50aXR5KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkZpbmlzaFwiOlxuICAgICAgICAgICAgZGJUYXNrLmZpbmlzaCh0aGlzLnN0YXRlLmVudGl0eSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJTYXZlXCI6XG4gICAgICAgICAgICB0aGlzLl9vblNhdmUoKVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vblNhdmUoKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBjb250ZW50PXt9XG4gICAgICAgIHRoaXMua2V5cy5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgICAgICB2YXIgZWRpdG9yPXRoaXMucmVmc1tgZWRpdG9yLSR7a2V5fWBdO1xuICAgICAgICAgICAgY29udGVudFtrZXldPWVkaXRvci52YWx1ZVxuICAgICAgICAgICAgaWYoIWVudGl0eS50aHVtYm5haWwpXG4gICAgICAgICAgICAgICAgZW50aXR5LnRodW1ibmFpbD1lZGl0b3IudGh1bWJuYWlsXG4gICAgICAgIH0pXG4gICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcblxuICAgICAgICB2YXIgZWRpdG9yU3VtbWFyeT10aGlzLnJlZnMuc3VtbWFyeVxuICAgICAgICBpZihlZGl0b3JTdW1tYXJ5KVxuICAgICAgICAgICAgZW50aXR5LnN1bW1hcnk9ZWRpdG9yU3VtbWFyeS52YWx1ZVxuXG4gICAgICAgIGRiVGFzay51cHNlcnQoZW50aXR5LCAoKT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG4iXX0=