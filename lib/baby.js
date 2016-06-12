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
            return _db.Family.currentChild = a[0];
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
                return _db.Family.currentChild = a[0];
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

            var cmds = ["Back"],
                rewards;
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
                    rewards
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


Baby.contextTypes = { router: _qiliApp.React.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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TDtBQUNJLHlCQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQVMsSUFBVCxFQUFmLEVBREo7QUFFSSwrQkFBUyxNQUFULENBQWdCLE1BQU0sR0FBTixFQUFVLFlBQUk7QUFDMUIsK0JBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsV0FBcEIsQ0FBZ0MsR0FBaEMsRUFEMEI7cUJBQUosQ0FBMUIsQ0FGSjtBQUtJLDBCQUxKO0FBUEEsYUFGYTs7OztXQXpIQTs7Ozs7O0FBNElyQixLQUFLLFlBQUwsR0FBa0IsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQixFQUExQiIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsaW1tdXRhYmxlLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBSZXdhcmRHb2FsIGZyb20gJy4vY29tcG9uZW50cy9yZXdhcmRzJ1xuXG52YXIge0xpc3QsQ29tbWFuZEJhcixQaG90b309VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge3BhcmFtcz17fX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtfaWQ6dGFyZ2V0SWR9PXBhcmFtcyxcbiAgICAgICAgICAgIGN1cnJlbnRDaGlsZD1kYkZhbWlseS5jdXJyZW50Q2hpbGQsXG4gICAgICAgICAgICB7X2lkOmN1cnJlbnRJZH09Y3VycmVudENoaWxkfHx7fVxuXG4gICAgICAgIGlmKCF0YXJnZXRJZClcbiAgICAgICAgICAgIHRoaXMuc3RhdGU9e2NoaWxkOnt9fVxuICAgICAgICBlbHNlIGlmKHRhcmdldElkPT1jdXJyZW50SWQpXG4gICAgICAgICAgICB0aGlzLnN0YXRlPSh7Y2hpbGQ6ZGJGYW1pbHkuY3VycmVudENoaWxkfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGJGYW1pbHkuZmluZCh7X2lkOnRhcmdldElkfSwoYSk9PmRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hWzBdKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5jaGFuZ2luZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHtwYXJhbXM6e19pZDp0YXJnZXRJZH19PW5leHRQcm9wcyxcbiAgICAgICAgICAgIHtjaGlsZDp7X2lkOmN1cnJlbnRJZH19PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighdGFyZ2V0SWQpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGlsZDp7fX0pXG4gICAgICAgIGVsc2UgaWYodGFyZ2V0SWQ9PWN1cnJlbnRJZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGJGYW1pbHkuZmluZCh7X2lkOnRhcmdldElkfSwoYSk9PmRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hWzBdKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NoaWxkLHJlbW92aW5nfT10aGlzLnN0YXRlXG4gICAgICAgIGlmKHJlbW92aW5nKVxuICAgICAgICAgICAgcmV0dXJuICg8c3Bhbj5cInJlbW92aW5nLi4uXCI8L3NwYW4+KVxuXG4gICAgICAgIHZhciBjbWRzPVtcIkJhY2tcIl0sIHJld2FyZHNcbiAgICAgICAgY21kcy5wdXNoKGNoaWxkLl9pZCA/IFwiUmVtb3ZlXCIgOiBcIlNhdmVcIilcblx0XHRpZihjaGlsZC5faWQpe1xuXHRcdFx0cmV3YXJkcz0oXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7Zm9udFNpemU6XCJzbWFsbGVyXCIsIGNvbG9yOlwiZ3JheVwiLCBib3JkZXJCb3R0b206XCIxcHggZG90dGVkIGxpZ2h0Z3JheVwifX0+e2NoaWxkLm5hbWV955qE5r+A5Yqx6K6h5YiSPC9kaXY+XG5cdFx0XHRcdFx0XHQ8UmV3YXJkR29hbFxuXHRcdFx0XHRcdFx0XHRlZGl0YWJsZT17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzB9fVxuXHRcdFx0XHRcdFx0XHRjaGlsZD17Y2hpbGR9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBob3RvIHJlZj1cInBob3RvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17Y2hpbGQucGhvdG99IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+dGhpcy5zZXRTdGF0ZSh7Y2hpbGQ6T2JqZWN0LmFzc2lnbihjaGlsZCx7bmFtZTplLnRhcmdldC52YWx1ZX0pfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eygpPT4oY2hpbGQuX2lkICYmIGRiRmFtaWx5LnVwc2VydChjaGlsZCkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoaWxkLm5hbWV9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlciByZWY9XCJiaXJ0aGRheVwiIGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b09rPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1llYXJTZWxlY3Rvcj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KG5pbCwgZGF0ZSk9PnRoaXMub25DaGFuZ2UoT2JqZWN0LmFzc2lnbihjaGlsZCx7YmQ6ZGF0ZX0pKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5iZH0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbkdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e21hcmdpblRvcDozNn19XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSxzZWxlY3RlZCk9PnRoaXMub25DaGFuZ2UoT2JqZWN0LmFzc2lnbihjaGlsZCx7Z2VuZGVyOnNlbGVjdGVkfSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZWxlY3RlZD17Y2hpbGQuZ2VuZGVyfHxcImZcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0J1dHRvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NtZHN9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsoYSk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvblJld2FyZFJ1bGUocnVsZSl7XG4gICAgICAgIGxldCB7Y2hpbGR9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7cmV3YXJkUnVsZXM9W119PWNoaWxkXG4gICAgICAgIHJld2FyZFJ1bGVzLnB1c2gocnVsZSlcbiAgICAgICAgY2hpbGQucmV3YXJkUnVsZXM9cmV3YXJkUnVsZXNcbiAgICAgICAgdGhpcy5vbkNoYW5nZShjaGlsZClcbiAgICB9XG5cbiAgICBvblJld2FyZChyZXdhcmQpe1xuICAgICAgICBsZXQge2NoaWxkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3Jld2FyZERldGFpbD1bXX09Y2hpbGRcbiAgICAgICAgcmV3YXJkRGV0YWlsLnB1c2gocmV3YXJkKVxuICAgICAgICBjaGlsZC5yZXdhcmREZXRhaWw9cmV3YXJkRGV0YWlsXG4gICAgICAgIHRoaXMub25DaGFuZ2UoY2hpbGQpXG4gICAgfVxuXG4gICAgb25DaGFuZ2UoY2hpbGQpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGlsZH0pXG4gICAgICAgIGlmKGNoaWxkLl9pZClcbiAgICAgICAgICAgIGRiRmFtaWx5LnVwc2VydChjaGlsZClcbiAgICB9XG4gICAgdGFrZVBob3RvKCl7XG4gICAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZSgocCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMucGhvdG8uZ2V0RE9NTm9kZSgpLnNyYz1wXG4gICAgICAgICAgICB9LCAoZXJyb3IpPT57XG5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBxdWFsaXR5OjUwLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uVHlwZTpDYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgdmFyIHtjaGlsZH09dGhpcy5zdGF0ZVxuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJTYXZlXCI6XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGFuZ2luZzp0cnVlfSlcbiAgICAgICAgICAgIGRiRmFtaWx5LnVwc2VydChjaGlsZCwgbnVsbCwgKGEpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlV2l0aChcImJhYnlcIixhKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJSZW1vdmVcIjpcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlbW92aW5nOnRydWV9KVxuICAgICAgICAgICAgZGJGYW1pbHkucmVtb3ZlKGNoaWxkLl9pZCwoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZVdpdGgoXCIvXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQmFieS5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuIl19