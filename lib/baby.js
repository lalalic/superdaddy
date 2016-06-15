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

    function Baby() {
        _classCallCheck(this, Baby);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Baby).apply(this, arguments));

        _this.state = {};
        return _this;
    }

    _createClass(Baby, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.params.name != newProps.params.name) _db.Family.currentChild = newProps.params.name;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(newProps) {
            if (this.state.frozen) return false;

            return this.props.child != newProps.child;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var child = this.props.child;
            var cmds = [];
            var rewards = void 0;

            cmds.push(child._id ? "Remove" : "Save");

            if (child._id) {
                rewards = _qiliApp.React.createElement(
                    'div',
                    null,
                    _qiliApp.React.createElement('br', null),
                    _qiliApp.React.createElement('br', null),
                    _qiliApp.React.createElement(
                        'div',
                        { style: { fontSize: "smaller", color: "gray", borderBottom: "1px dotted lightgray" } },
                        child.name,
                        '的激励计划'
                    ),
                    _qiliApp.React.createElement(_rewards2.default, {
                        editable: true,
                        style: { marginTop: 30 },
                        child: child })
                );
            }
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
                        value: child.name,
                        onBlur: function onBlur(e) {
                            if (_this2.props.value != e.target.value) {
                                child.name = e.target.value;
                                _this2.onChange(child);
                            }
                        } }),
                    _qiliApp.React.createElement(_materialUi.DatePicker, { ref: 'birthday', floatingLabelText: 'birthday',
                        fullWidth: true,
                        autoOk: true,
                        showYearSelector: true,
                        maxDate: new Date(),
                        value: child.bd,
                        onChange: function onChange(nil, date) {
                            if (_this2.props.value && _this2.props.value.getTime() !== date.getTime()) {
                                child.db = date;
                                _this2.onChange(child);
                            }
                        } }),
                    _qiliApp.React.createElement(
                        _materialUi.RadioButtonGroup,
                        {
                            style: { marginTop: 36 },
                            name: 'gender',
                            onChange: function onChange(e, selected) {
                                if (_this2.props.valueSelected != selected) {
                                    child.gender = selected;
                                    _this2.onChange(child);
                                }
                            },
                            valueSelected: child.gender || "f" },
                        _qiliApp.React.createElement(_materialUi.RadioButton, { value: 'f', label: 'girl' }),
                        _qiliApp.React.createElement(_materialUi.RadioButton, { value: 'm', label: 'boy' })
                    ),
                    rewards
                ),
                _qiliApp.React.createElement(CommandBar, { className: 'footbar',
                    items: cmds,
                    onSelect: function onSelect(cmd) {
                        return _this2.onSelect(cmd);
                    }
                })
            );
        }
    }, {
        key: 'onRewardRule',
        value: function onRewardRule(rule) {
            var child = this.props.child;
            var _child$rewardRules = child.rewardRules;
            var rewardRules = _child$rewardRules === undefined ? [] : _child$rewardRules;

            rewardRules.push(rule);
            child.rewardRules = rewardRules;
            this.onChange(child);
        }
    }, {
        key: 'onReward',
        value: function onReward(reward) {
            var child = this.props.child;
            var _child$rewardDetail = child.rewardDetail;
            var rewardDetail = _child$rewardDetail === undefined ? [] : _child$rewardDetail;

            rewardDetail.push(reward);
            child.rewardDetail = rewardDetail;
            this.onChange(child);
        }
    }, {
        key: 'onChange',
        value: function onChange(child) {
            var _this3 = this;

            if (!child._id) return;
            _db.Family.upsert(child).then(function (a) {
                return _this3.forceUpdate();
            });
        }
    }, {
        key: 'takePhoto',
        value: function takePhoto() {
            var _this4 = this;

            navigator.camera.getPicture(function (p) {
                _this4.refs.photo.getDOMNode().src = p;
            }, function (error) {}, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE
            });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            var _this5 = this;

            var child = this.props.child;

            switch (command) {
                case "Save":
                    _db.Family.upsert(child).then(function (a) {
                        return _this5.context.router.replace('baby/' + child.name);
                    });
                    break;
                case "Remove":
                    this.setState({ frozen: true });
                    _db.Family.remove(child._id).then(function (a) {
                        return _this5.context.router.replace("/");
                    });
                    break;
            }
        }
    }]);

    return Baby;
}(_qiliApp.Component);

Baby.contextTypes = { router: _qiliApp.React.PropTypes.object };

Baby.Creator = function (_Baby) {
    _inherits(_class, _Baby);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (!this.props.child._id) _db.Family.restoreLast();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            return false;
        }
    }]);

    return _class;
}(Baby);

exports.default = Baby;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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YWJsZSwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgUmV3YXJkR29hbCBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcblxuY29uc3Qge0xpc3QsQ29tbWFuZEJhcixQaG90b309VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17fVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyl7XG5cdFx0aWYodGhpcy5wcm9wcy5wYXJhbXMubmFtZSE9bmV3UHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHRkYkZhbWlseS5jdXJyZW50Q2hpbGQ9bmV3UHJvcHMucGFyYW1zLm5hbWVcblx0fVxuXG5cdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXdQcm9wcyl7XG5cdFx0aWYodGhpcy5zdGF0ZS5mcm96ZW4pXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkIT1uZXdQcm9wcy5jaGlsZFxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge2NoaWxkfT10aGlzLnByb3BzXG5cdFx0XHQsY21kcz1bXVxuXHRcdFx0LHJld2FyZHNcblxuICAgICAgICBjbWRzLnB1c2goY2hpbGQuX2lkID8gXCJSZW1vdmVcIiA6IFwiU2F2ZVwiKVxuXG5cdFx0aWYoY2hpbGQuX2lkKXtcblx0XHRcdHJld2FyZHM9KFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e2ZvbnRTaXplOlwic21hbGxlclwiLCBjb2xvcjpcImdyYXlcIiwgYm9yZGVyQm90dG9tOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19PntjaGlsZC5uYW1lfeeahOa/gOWKseiuoeWIkjwvZGl2PlxuXHRcdFx0XHRcdFx0PFJld2FyZEdvYWxcblx0XHRcdFx0XHRcdFx0ZWRpdGFibGU9e3RydWV9XG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjMwfX1cblx0XHRcdFx0XHRcdFx0Y2hpbGQ9e2NoaWxkfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQaG90byByZWY9XCJwaG90b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezE1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezE1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2NoaWxkLnBob3RvfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCIgZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMudmFsdWUhPWUudGFyZ2V0LnZhbHVlKXtcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5uYW1lPWUudGFyZ2V0LnZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vbkNoYW5nZShjaGlsZClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxEYXRlUGlja2VyIHJlZj1cImJpcnRoZGF5XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT2s9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5iZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsobmlsLCBkYXRlKT0+e1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMucHJvcHMudmFsdWUuZ2V0VGltZSgpIT09ZGF0ZS5nZXRUaW1lKCkpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLmRiPWRhdGVcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uQ2hhbmdlKGNoaWxkKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9fS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJnZW5kZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlLHNlbGVjdGVkKT0+e1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLnByb3BzLnZhbHVlU2VsZWN0ZWQhPXNlbGVjdGVkKXtcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5nZW5kZXI9c2VsZWN0ZWRcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uQ2hhbmdlKGNoaWxkKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZWxlY3RlZD17Y2hpbGQuZ2VuZGVyfHxcImZcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0J1dHRvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NtZHN9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uUmV3YXJkUnVsZShydWxlKXtcbiAgICAgICAgbGV0IHtjaGlsZH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtyZXdhcmRSdWxlcz1bXX09Y2hpbGRcbiAgICAgICAgcmV3YXJkUnVsZXMucHVzaChydWxlKVxuICAgICAgICBjaGlsZC5yZXdhcmRSdWxlcz1yZXdhcmRSdWxlc1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKGNoaWxkKVxuICAgIH1cblxuICAgIG9uUmV3YXJkKHJld2FyZCl7XG4gICAgICAgIGxldCB7Y2hpbGR9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7cmV3YXJkRGV0YWlsPVtdfT1jaGlsZFxuICAgICAgICByZXdhcmREZXRhaWwucHVzaChyZXdhcmQpXG4gICAgICAgIGNoaWxkLnJld2FyZERldGFpbD1yZXdhcmREZXRhaWxcbiAgICAgICAgdGhpcy5vbkNoYW5nZShjaGlsZClcbiAgICB9XG5cbiAgICBvbkNoYW5nZShjaGlsZCl7XG4gICAgICAgIGlmKCFjaGlsZC5faWQpXG5cdFx0XHRyZXR1cm5cbiAgICAgICAgZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuICAgIH1cbiAgICB0YWtlUGhvdG8oKXtcbiAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKChwKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcy5waG90by5nZXRET01Ob2RlKCkuc3JjPXBcbiAgICAgICAgICAgIH0sIChlcnJvcik9PntcblxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHF1YWxpdHk6NTAsXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25UeXBlOkNhbWVyYS5EZXN0aW5hdGlvblR5cGUuRklMRVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIGRiRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0LnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBiYWJ5LyR7Y2hpbGQubmFtZX1gKSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJSZW1vdmVcIjpcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Zyb3plbjp0cnVlfSlcbiAgICAgICAgICAgIGRiRmFtaWx5LnJlbW92ZShjaGlsZC5faWQpXG5cdFx0XHRcdC50aGVuKGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShcIi9cIikpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIGV4dGVuZHMgQmFieXtcblx0XHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdFx0aWYoIXRoaXMucHJvcHMuY2hpbGQuX2lkKVxuXHRcdFx0XHRkYkZhbWlseS5yZXN0b3JlTGFzdCgpXG5cdFx0fVxuXG5cdFx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyl7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdH1cbn1cbiJdfQ==