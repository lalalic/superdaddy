'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _db = require('./db');

var _rewards = require('./components/rewards');

var _rewards2 = _interopRequireDefault(_rewards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var CommandBar = _qiliApp.UI.CommandBar;
var Photo = _qiliApp.UI.Photo;

var Baby = function (_Component) {
    _inherits(Baby, _Component);

    function Baby(props) {
        _classCallCheck(this, Baby);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Baby).call(this, props));

        var _this$props$params = _this.props.params;
        var params = _this$props$params === undefined ? {} : _this$props$params;
        var targetId = params._id;
        var currentChild = _db.Family.currentChild;

        var _ref = currentChild || {};

        var currentId = _ref._id;


        if (!targetId) _this.state = { child: {} };else if (targetId == currentId) _this.state = { child: _db.Family.currentChild };else _db.Family.find({ _id: targetId }, function (a) {
            return _db.Family.currentChild = a;
        });
        return _this;
    }

    _createClass(Baby, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.changing) return;
            var targetId = nextProps.params._id;
            var currentId = this.state.child._id;


            if (!targetId) this.setState({ child: {} });else if (targetId == currentId) return;else _db.Family.find({ _id: targetId }, function (a) {
                return _db.Family.currentChild = a;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state;
            var child = _state.child;
            var removing = _state.removing;

            if (removing) return _qiliApp.React.createElement(
                'span',
                null,
                '"removing..."'
            );

            var cmds = ["Back"];
            cmds.push(child._id ? "Remove" : "Save");

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(
                    'div',
                    { className: 'form' },
                    _qiliApp.React.createElement(
                        'div',
                        { className: 'child-photo' },
                        _qiliApp.React.createElement(Photo, { ref: 'photo',
                            width: 150,
                            height: 150,
                            src: child.photo })
                    ),
                    _qiliApp.React.createElement(_materialUi.TextField, { ref: 'name', floatingLabelText: 'child name',
                        fullWidth: true,
                        onChange: function onChange(e) {
                            return _this2.setState({ child: Object.assign(child, { name: e.target.value }) });
                        },
                        onBlur: function onBlur() {
                            return child._id && _db.Family.upsert(child);
                        },
                        value: child.name }),
                    _qiliApp.React.createElement(_materialUi.DatePicker, { ref: 'birthday', floatingLabelText: 'birthday',
                        fullWidth: true,
                        autoOk: true,
                        showYearSelector: true,
                        maxDate: new Date(),
                        onChange: function onChange(nil, date) {
                            return _this2.onChange(Object.assign(child, { bd: date }));
                        },
                        value: child.bd }),
                    _qiliApp.React.createElement(
                        _materialUi.RadioButtonGroup,
                        {
                            style: { marginTop: 36 },
                            name: 'gender',
                            onChange: function onChange(e, selected) {
                                return _this2.onChange(Object.assign(child, { gender: selected }));
                            },
                            valueSelected: child.gender || "f" },
                        _qiliApp.React.createElement(_materialUi.RadioButton, { value: 'f', label: 'girl' }),
                        _qiliApp.React.createElement(_materialUi.RadioButton, { value: 'm', label: 'boy' })
                    ),
                    _qiliApp.React.createElement(_rewards2.default, {
                        editable: true,
                        onRule: function onRule(e, rewardRules) {
                            return _this2.onChange(Object.assign(child, { rewardRules: rewardRules }));
                        },
                        rewardDetail: child.rewardDetail || [{
                            count: 1, comment: 'polite', createdAt: new Date() }, { count: 5, comment: 'kind to sister', createdAt: new Date() }, { count: 10, comment: 'finish homework', createdAt: new Date() }]
                    })
                ),
                _qiliApp.React.createElement(CommandBar, { className: 'footbar',
                    items: cmds,
                    onSelect: function onSelect(a) {
                        return _this2.onSelect(a);
                    }
                })
            );
        }
    }, {
        key: 'onChange',
        value: function onChange(child) {
            this.setState({ child: child });
            if (child._id) _db.Family.upsert(child);
        }
    }, {
        key: 'takePhoto',
        value: function takePhoto() {
            var _this3 = this;

            navigator.camera.getPicture(function (p) {
                _this3.refs.photo.getDOMNode().src = p;
            }, function (error) {}, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE
            });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            var _this4 = this;

            var child = this.state.child;

            switch (command) {
                case "Save":
                    this.setState({ changing: true });
                    _db.Family.upsert(child, null, function (a) {
                        _this4.context.router.replaceWith("baby", a);
                    });
                    break;
                case "Remove":
                    this.setState({ removing: true });
                    _db.Family.remove(child._id, function () {
                        _this4.context.router.replaceWith("/");
                    });
                    break;
            }
        }
    }]);

    return Baby;
}(_qiliApp.Component);

exports.default = Baby;


Baby.contextTypes = { router: _qiliApp.React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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e1JlYWN0LENvbXBvbmVudCxpbW11dGFibGUsIFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7VGV4dEZpZWxkLCBSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbixEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IFBvbGljeU9mUmV3YXJkcyBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcblxudmFyIHtMaXN0LENvbW1hbmRCYXIsUGhvdG99PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHtwYXJhbXM9e319PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7X2lkOnRhcmdldElkfT1wYXJhbXMsXG4gICAgICAgICAgICBjdXJyZW50Q2hpbGQ9ZGJGYW1pbHkuY3VycmVudENoaWxkLFxuICAgICAgICAgICAge19pZDpjdXJyZW50SWR9PWN1cnJlbnRDaGlsZHx8e31cblxuICAgICAgICBpZighdGFyZ2V0SWQpXG4gICAgICAgICAgICB0aGlzLnN0YXRlPXtjaGlsZDp7fX1cbiAgICAgICAgZWxzZSBpZih0YXJnZXRJZD09Y3VycmVudElkKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZT0oe2NoaWxkOmRiRmFtaWx5LmN1cnJlbnRDaGlsZH0pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRiRmFtaWx5LmZpbmQoe19pZDp0YXJnZXRJZH0sKGEpPT5kYkZhbWlseS5jdXJyZW50Q2hpbGQ9YSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuY2hhbmdpbmcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB7cGFyYW1zOntfaWQ6dGFyZ2V0SWR9fT1uZXh0UHJvcHMsXG4gICAgICAgICAgICB7Y2hpbGQ6e19pZDpjdXJyZW50SWR9fT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIXRhcmdldElkKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hpbGQ6e319KVxuICAgICAgICBlbHNlIGlmKHRhcmdldElkPT1jdXJyZW50SWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRiRmFtaWx5LmZpbmQoe19pZDp0YXJnZXRJZH0sKGEpPT5kYkZhbWlseS5jdXJyZW50Q2hpbGQ9YSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjaGlsZCxyZW1vdmluZ309dGhpcy5zdGF0ZVxuICAgICAgICBpZihyZW1vdmluZylcbiAgICAgICAgICAgIHJldHVybiAoPHNwYW4+XCJyZW1vdmluZy4uLlwiPC9zcGFuPilcblxuICAgICAgICB2YXIgY21kcz1bXCJCYWNrXCJdO1xuICAgICAgICBjbWRzLnB1c2goY2hpbGQuX2lkID8gXCJSZW1vdmVcIiA6IFwiU2F2ZVwiKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGhvdG8gcmVmPVwicGhvdG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxNTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsxNTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtjaGlsZC5waG90b30gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwibmFtZVwiIGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT50aGlzLnNldFN0YXRlKHtjaGlsZDpPYmplY3QuYXNzaWduKGNoaWxkLHtuYW1lOmUudGFyZ2V0LnZhbHVlfSl9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KCk9PihjaGlsZC5faWQgJiYgZGJGYW1pbHkudXBzZXJ0KGNoaWxkKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y2hpbGQubmFtZX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxEYXRlUGlja2VyIHJlZj1cImJpcnRoZGF5XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT2s9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsobmlsLCBkYXRlKT0+dGhpcy5vbkNoYW5nZShPYmplY3QuYXNzaWduKGNoaWxkLHtiZDpkYXRlfSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoaWxkLmJkfS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJnZW5kZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlLHNlbGVjdGVkKT0+dGhpcy5vbkNoYW5nZShPYmplY3QuYXNzaWduKGNoaWxkLHtnZW5kZXI6c2VsZWN0ZWR9KSl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNlbGVjdGVkPXtjaGlsZC5nZW5kZXJ8fFwiZlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvQnV0dG9uR3JvdXA+XG5cbiAgICAgICAgICAgICAgICAgICAgPFBvbGljeU9mUmV3YXJkcyBcblx0XHRcdFx0XHRcdGVkaXRhYmxlPXt0cnVlfVxuXHRcdFx0XHRcdFx0b25SdWxlPXsoZSxyZXdhcmRSdWxlcyk9PnRoaXMub25DaGFuZ2UoT2JqZWN0LmFzc2lnbihjaGlsZCx7cmV3YXJkUnVsZXN9KSl9XG5cdFx0XHRcdFx0XHRyZXdhcmREZXRhaWw9e2NoaWxkLnJld2FyZERldGFpbHx8W3tcblx0XHRcdFx0XHRcdFx0Y291bnQ6MSxjb21tZW50Oidwb2xpdGUnLGNyZWF0ZWRBdDpuZXcgRGF0ZSgpfVxuXHRcdFx0XHRcdFx0XHQse2NvdW50OjUsY29tbWVudDona2luZCB0byBzaXN0ZXInLGNyZWF0ZWRBdDpuZXcgRGF0ZSgpfVxuXHRcdFx0XHRcdFx0XHQse2NvdW50OjEwLGNvbW1lbnQ6J2ZpbmlzaCBob21ld29yaycsY3JlYXRlZEF0Om5ldyBEYXRlKCl9XG5cdFx0XHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0XHQvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y21kc31cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eyhhKT0+dGhpcy5vblNlbGVjdChhKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uQ2hhbmdlKGNoaWxkKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hpbGR9KVxuICAgICAgICBpZihjaGlsZC5faWQpXG4gICAgICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG4gICAgfVxuICAgIHRha2VQaG90bygpe1xuICAgICAgICBuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUoKHApPT57XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnBob3RvLmdldERPTU5vZGUoKS5zcmM9cFxuICAgICAgICAgICAgfSwgKGVycm9yKT0+e1xuXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcXVhbGl0eTo1MCxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblR5cGU6Q2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMuc3RhdGVcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlIFwiU2F2ZVwiOlxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbmdpbmc6dHJ1ZX0pXG4gICAgICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQsIG51bGwsIChhKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZVdpdGgoXCJiYWJ5XCIsYSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZW1vdmluZzp0cnVlfSlcbiAgICAgICAgICAgIGRiRmFtaWx5LnJlbW92ZShjaGlsZC5faWQsKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2VXaXRoKFwiL1wiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJhYnkuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG4iXX0=