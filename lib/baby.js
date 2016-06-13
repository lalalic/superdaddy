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
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (!this.props.child._id) _db.Family.restoreLast();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(newProps) {
            if (this.state.removing) return false;

            if (this.props.params.name != newProps.params.name) {
                _db.Family.currentChild = newProps.params.name;
                return true;
            }

            return this.props.child != newProps.child;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var child = this.props.child;
            var cmds = ["Back"];
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
                    this.setState({ removing: true });
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

    return _class;
}(Baby);

exports.default = Baby;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFHLENBQUMsTUFBTSxHQUFOLEVBQ1QsT0FESztBQUVBLHVCQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFDSixJQURJLENBQ0M7dUJBQUcsT0FBSyxXQUFMO2FBQUgsQ0FERCxDQUhXOzs7O29DQU1KOzs7QUFDUCxzQkFBVSxNQUFWLENBQWlCLFVBQWpCLENBQTRCLFVBQUMsQ0FBRCxFQUFLO0FBQ3pCLHVCQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLFVBQWhCLEdBQTZCLEdBQTdCLEdBQWlDLENBQWpDLENBRHlCO2FBQUwsRUFFckIsVUFBQyxLQUFELEVBQVMsRUFBVCxFQUVBO0FBQ0MseUJBQVEsRUFBUjtBQUNBLGlDQUFnQixPQUFPLGVBQVAsQ0FBdUIsSUFBdkI7YUFOeEIsRUFETzs7OztpQ0FVRixTQUFROzs7Z0JBQ1IsUUFBTyxLQUFLLEtBQUwsQ0FBUCxNQURROztBQUViLG9CQUFPLE9BQVA7QUFDQSxxQkFBSyxNQUFMO0FBQ0ksK0JBQVMsTUFBVCxDQUFnQixLQUFoQixFQUNQLElBRE8sQ0FDRjsrQkFBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLFdBQW9DLE1BQU0sSUFBTjtxQkFBdkMsQ0FERSxDQURKO0FBR0ksMEJBSEo7QUFEQSxxQkFLSyxRQUFMO0FBQ0kseUJBQUssUUFBTCxDQUFjLEVBQUMsVUFBUyxJQUFULEVBQWYsRUFESjtBQUVJLCtCQUFTLE1BQVQsQ0FBZ0IsTUFBTSxHQUFOLENBQWhCLENBQ1AsSUFETyxDQUNGOytCQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsQ0FBNEIsR0FBNUI7cUJBQUgsQ0FERSxDQUZKO0FBSUksMEJBSko7QUFMQSxhQUZhOzs7O1dBaElBOzs7S0ErSWIsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCOztBQS9JUixLQWlKYjs7Ozs7Ozs7OztFQUFzQjs7a0JBakpUIiwiZmlsZSI6ImJhYnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxpbW11dGFibGUsIFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7VGV4dEZpZWxkLCBSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbixEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IFJld2FyZEdvYWwgZnJvbSAnLi9jb21wb25lbnRzL3Jld2FyZHMnXG5cbmNvbnN0IHtMaXN0LENvbW1hbmRCYXIsUGhvdG99PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e31cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdGlmKCF0aGlzLnByb3BzLmNoaWxkLl9pZClcblx0XHRcdGRiRmFtaWx5LnJlc3RvcmVMYXN0KClcblx0fVxuXHRcblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5ld1Byb3BzKXtcblx0XHRpZih0aGlzLnN0YXRlLnJlbW92aW5nKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRpZih0aGlzLnByb3BzLnBhcmFtcy5uYW1lIT1uZXdQcm9wcy5wYXJhbXMubmFtZSl7XG5cdFx0XHRkYkZhbWlseS5jdXJyZW50Q2hpbGQ9bmV3UHJvcHMucGFyYW1zLm5hbWVcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGQhPW5ld1Byb3BzLmNoaWxkXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2hpbGR9PXRoaXMucHJvcHNcblx0XHRcdCxjbWRzPVtcIkJhY2tcIl1cblx0XHRcdCxyZXdhcmRzXG5cdFx0XHRcbiAgICAgICAgY21kcy5wdXNoKGNoaWxkLl9pZCA/IFwiUmVtb3ZlXCIgOiBcIlNhdmVcIilcblx0XHRcblx0XHRpZihjaGlsZC5faWQpe1xuXHRcdFx0cmV3YXJkcz0oXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7Zm9udFNpemU6XCJzbWFsbGVyXCIsIGNvbG9yOlwiZ3JheVwiLCBib3JkZXJCb3R0b206XCIxcHggZG90dGVkIGxpZ2h0Z3JheVwifX0+e2NoaWxkLm5hbWV955qE5r+A5Yqx6K6h5YiSPC9kaXY+XG5cdFx0XHRcdFx0XHQ8UmV3YXJkR29hbFxuXHRcdFx0XHRcdFx0XHRlZGl0YWJsZT17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzB9fVxuXHRcdFx0XHRcdFx0XHRjaGlsZD17Y2hpbGR9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBob3RvIHJlZj1cInBob3RvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17Y2hpbGQucGhvdG99IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoaWxkLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2U9Pntcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5wcm9wcy52YWx1ZSE9ZS50YXJnZXQudmFsdWUpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLm5hbWU9ZS50YXJnZXQudmFsdWVcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uQ2hhbmdlKGNoaWxkKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9fS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPERhdGVQaWNrZXIgcmVmPVwiYmlydGhkYXlcIiBmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Paz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dZZWFyU2VsZWN0b3I9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtuZXcgRGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoaWxkLmJkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhuaWwsIGRhdGUpPT57XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5wcm9wcy52YWx1ZS5nZXRUaW1lKCkhPT1kYXRlLmdldFRpbWUoKSl7XG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQuZGI9ZGF0ZVxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub25DaGFuZ2UoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH19Lz5cblxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b25Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUsc2VsZWN0ZWQpPT57XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMudmFsdWVTZWxlY3RlZCE9c2VsZWN0ZWQpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLmdlbmRlcj1zZWxlY3RlZFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub25DaGFuZ2UoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH19XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNlbGVjdGVkPXtjaGlsZC5nZW5kZXJ8fFwiZlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvQnV0dG9uR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIHtyZXdhcmRzfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y21kc31cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25SZXdhcmRSdWxlKHJ1bGUpe1xuICAgICAgICBsZXQge2NoaWxkfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3Jld2FyZFJ1bGVzPVtdfT1jaGlsZFxuICAgICAgICByZXdhcmRSdWxlcy5wdXNoKHJ1bGUpXG4gICAgICAgIGNoaWxkLnJld2FyZFJ1bGVzPXJld2FyZFJ1bGVzXG4gICAgICAgIHRoaXMub25DaGFuZ2UoY2hpbGQpXG4gICAgfVxuXG4gICAgb25SZXdhcmQocmV3YXJkKXtcbiAgICAgICAgbGV0IHtjaGlsZH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtyZXdhcmREZXRhaWw9W119PWNoaWxkXG4gICAgICAgIHJld2FyZERldGFpbC5wdXNoKHJld2FyZClcbiAgICAgICAgY2hpbGQucmV3YXJkRGV0YWlsPXJld2FyZERldGFpbFxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGNoaWxkKVxuICAgIH1cblxuICAgIG9uQ2hhbmdlKGNoaWxkKXtcbiAgICAgICAgaWYoIWNoaWxkLl9pZClcblx0XHRcdHJldHVyblxuICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHQudGhlbihhPT50aGlzLmZvcmNlVXBkYXRlKCkpXG4gICAgfVxuICAgIHRha2VQaG90bygpe1xuICAgICAgICBuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUoKHApPT57XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnBob3RvLmdldERPTU5vZGUoKS5zcmM9cFxuICAgICAgICAgICAgfSwgKGVycm9yKT0+e1xuXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcXVhbGl0eTo1MCxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblR5cGU6Q2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlIFwiU2F2ZVwiOlxuICAgICAgICAgICAgZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGJhYnkvJHtjaGlsZC5uYW1lfWApKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlJlbW92ZVwiOlxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVtb3Zpbmc6dHJ1ZX0pXG4gICAgICAgICAgICBkYkZhbWlseS5yZW1vdmUoY2hpbGQuX2lkKVxuXHRcdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHRcblx0c3RhdGljIENyZWF0b3I9Y2xhc3MgZXh0ZW5kcyBCYWJ5e1xuXHRcdFxuXHR9XG59XG4iXX0=