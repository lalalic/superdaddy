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
                        child: child })
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
        key: 'onRewardRule',
        value: function onRewardRule(rule) {
            var child = this.state.child;
            var _child$rewardRules = child.rewardRules;
            var rewardRules = _child$rewardRules === undefined ? [] : _child$rewardRules;

            rewardRules.push(rule);
            child.rewardRules = rewardRules;
            this.onChange(child);
        }
    }, {
        key: 'onReward',
        value: function onReward(reward) {
            var child = this.state.child;
            var _child$rewardDetail = child.rewardDetail;
            var rewardDetail = _child$rewardDetail === undefined ? [] : _child$rewardDetail;

            rewardDetail.push(reward);
            child.rewardDetail = rewardDetail;
            this.onChange(child);
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
//# sourceMappingURL=data:application/json;base64,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QiIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsaW1tdXRhYmxlLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBQb2xpY3lPZlJld2FyZHMgZnJvbSAnLi9jb21wb25lbnRzL3Jld2FyZHMnXG5cbnZhciB7TGlzdCxDb21tYW5kQmFyLFBob3RvfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWJ5IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHZhciB7cGFyYW1zPXt9fT10aGlzLnByb3BzLFxuICAgICAgICAgICAge19pZDp0YXJnZXRJZH09cGFyYW1zLFxuICAgICAgICAgICAgY3VycmVudENoaWxkPWRiRmFtaWx5LmN1cnJlbnRDaGlsZCxcbiAgICAgICAgICAgIHtfaWQ6Y3VycmVudElkfT1jdXJyZW50Q2hpbGR8fHt9XG5cbiAgICAgICAgaWYoIXRhcmdldElkKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZT17Y2hpbGQ6e319XG4gICAgICAgIGVsc2UgaWYodGFyZ2V0SWQ9PWN1cnJlbnRJZClcbiAgICAgICAgICAgIHRoaXMuc3RhdGU9KHtjaGlsZDpkYkZhbWlseS5jdXJyZW50Q2hpbGR9KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkYkZhbWlseS5maW5kKHtfaWQ6dGFyZ2V0SWR9LChhKT0+ZGJGYW1pbHkuY3VycmVudENoaWxkPWEpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnN0YXRlLmNoYW5naW5nKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIge3BhcmFtczp7X2lkOnRhcmdldElkfX09bmV4dFByb3BzLFxuICAgICAgICAgICAge2NoaWxkOntfaWQ6Y3VycmVudElkfX09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCF0YXJnZXRJZClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoaWxkOnt9fSlcbiAgICAgICAgZWxzZSBpZih0YXJnZXRJZD09Y3VycmVudElkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkYkZhbWlseS5maW5kKHtfaWQ6dGFyZ2V0SWR9LChhKT0+ZGJGYW1pbHkuY3VycmVudENoaWxkPWEpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGQscmVtb3Zpbmd9PXRoaXMuc3RhdGVcbiAgICAgICAgaWYocmVtb3ZpbmcpXG4gICAgICAgICAgICByZXR1cm4gKDxzcGFuPlwicmVtb3ZpbmcuLi5cIjwvc3Bhbj4pXG5cbiAgICAgICAgdmFyIGNtZHM9W1wiQmFja1wiXTtcbiAgICAgICAgY21kcy5wdXNoKGNoaWxkLl9pZCA/IFwiUmVtb3ZlXCIgOiBcIlNhdmVcIilcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBob3RvIHJlZj1cInBob3RvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17Y2hpbGQucGhvdG99IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+dGhpcy5zZXRTdGF0ZSh7Y2hpbGQ6T2JqZWN0LmFzc2lnbihjaGlsZCx7bmFtZTplLnRhcmdldC52YWx1ZX0pfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eygpPT4oY2hpbGQuX2lkICYmIGRiRmFtaWx5LnVwc2VydChjaGlsZCkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoaWxkLm5hbWV9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlciByZWY9XCJiaXJ0aGRheVwiIGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b09rPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1llYXJTZWxlY3Rvcj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KG5pbCwgZGF0ZSk9PnRoaXMub25DaGFuZ2UoT2JqZWN0LmFzc2lnbihjaGlsZCx7YmQ6ZGF0ZX0pKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5iZH0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbkdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e21hcmdpblRvcDozNn19XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSxzZWxlY3RlZCk9PnRoaXMub25DaGFuZ2UoT2JqZWN0LmFzc2lnbihjaGlsZCx7Z2VuZGVyOnNlbGVjdGVkfSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZWxlY3RlZD17Y2hpbGQuZ2VuZGVyfHxcImZcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0J1dHRvbkdyb3VwPlxuXG4gICAgICAgICAgICAgICAgICAgIDxQb2xpY3lPZlJld2FyZHNcblx0XHRcdFx0XHRcdGVkaXRhYmxlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQ9e2NoaWxkfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjbWRzfVxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17KGEpPT50aGlzLm9uU2VsZWN0KGEpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25SZXdhcmRSdWxlKHJ1bGUpe1xuICAgICAgICBsZXQge2NoaWxkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3Jld2FyZFJ1bGVzPVtdfT1jaGlsZFxuICAgICAgICByZXdhcmRSdWxlcy5wdXNoKHJ1bGUpXG4gICAgICAgIGNoaWxkLnJld2FyZFJ1bGVzPXJld2FyZFJ1bGVzXG4gICAgICAgIHRoaXMub25DaGFuZ2UoY2hpbGQpXG4gICAgfVxuXG4gICAgb25SZXdhcmQocmV3YXJkKXtcbiAgICAgICAgbGV0IHtjaGlsZH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtyZXdhcmREZXRhaWw9W119PWNoaWxkXG4gICAgICAgIHJld2FyZERldGFpbC5wdXNoKHJld2FyZClcbiAgICAgICAgY2hpbGQucmV3YXJkRGV0YWlsPXJld2FyZERldGFpbFxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGNoaWxkKVxuICAgIH1cblxuICAgIG9uQ2hhbmdlKGNoaWxkKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hpbGR9KVxuICAgICAgICBpZihjaGlsZC5faWQpXG4gICAgICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG4gICAgfVxuICAgIHRha2VQaG90bygpe1xuICAgICAgICBuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUoKHApPT57XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnBob3RvLmdldERPTU5vZGUoKS5zcmM9cFxuICAgICAgICAgICAgfSwgKGVycm9yKT0+e1xuXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcXVhbGl0eTo1MCxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblR5cGU6Q2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMuc3RhdGVcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlIFwiU2F2ZVwiOlxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbmdpbmc6dHJ1ZX0pXG4gICAgICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQsIG51bGwsIChhKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZVdpdGgoXCJiYWJ5XCIsYSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZW1vdmluZzp0cnVlfSlcbiAgICAgICAgICAgIGRiRmFtaWx5LnJlbW92ZShjaGlsZC5faWQsKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2VXaXRoKFwiL1wiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJhYnkuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG4iXX0=