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
                    _qiliApp.React.createElement(_rewards2.default, null)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVLO0lBQUs7SUFBVzs7SUFFQTs7O0FBQ2pCLGFBRGlCLElBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxNQUNDOzsyRUFERCxpQkFFUCxRQURROztpQ0FFRSxNQUFLLEtBQUwsQ0FBWCxPQUZTO0FBRVYsWUFBQyw0Q0FBTyx1QkFBUixDQUZVO0FBR1YsWUFBSyxXQUFVLE9BQWQsR0FBRCxDQUhVO0FBSVYsMkJBQWEsV0FBUyxZQUFULENBSkg7O21CQUtNLGdCQUFjLEVBQWQsQ0FMTjs7WUFLTCxpQkFBSixJQUxTOzs7QUFPZCxZQUFHLENBQUMsUUFBRCxFQUNDLE1BQUssS0FBTCxHQUFXLEVBQUMsT0FBTSxFQUFOLEVBQVosQ0FESixLQUVLLElBQUcsWUFBVSxTQUFWLEVBQ0osTUFBSyxLQUFMLEdBQVksRUFBQyxPQUFNLFdBQVMsWUFBVCxFQUFuQixDQURDLEtBR0QsV0FBUyxJQUFULENBQWMsRUFBQyxLQUFJLFFBQUosRUFBZixFQUE2QixVQUFDLENBQUQ7bUJBQUssV0FBUyxZQUFULEdBQXNCLENBQXRCO1NBQUwsQ0FBN0IsQ0FIQztxQkFUUztLQUFsQjs7aUJBRGlCOztrREFnQlMsV0FBVTtBQUNoQyxnQkFBRyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQ0MsT0FESjtBQUVJLGdCQUFhLFdBQVcsVUFBdkIsT0FBUSxHQUFULENBSDRCO2dCQUloQixZQUFZLEtBQUssS0FBTCxDQUF2QixNQUFPLElBSm9COzs7QUFNaEMsZ0JBQUcsQ0FBQyxRQUFELEVBQ0MsS0FBSyxRQUFMLENBQWMsRUFBQyxPQUFNLEVBQU4sRUFBZixFQURKLEtBRUssSUFBRyxZQUFVLFNBQVYsRUFDSixPQURDLEtBR0QsV0FBUyxJQUFULENBQWMsRUFBQyxLQUFJLFFBQUosRUFBZixFQUE2QixVQUFDLENBQUQ7dUJBQUssV0FBUyxZQUFULEdBQXNCLENBQXRCO2FBQUwsQ0FBN0IsQ0FIQzs7OztpQ0FNRDs7O3lCQUNpQixLQUFLLEtBQUwsQ0FEakI7Z0JBQ0MscUJBREQ7Z0JBQ08sMkJBRFA7O0FBRUosZ0JBQUcsUUFBSCxFQUNJLE9BQVE7Ozs7YUFBUixDQURKOztBQUdBLGdCQUFJLE9BQUssQ0FBQyxNQUFELENBQUwsQ0FMQTtBQU1KLGlCQUFLLElBQUwsQ0FBVSxNQUFNLEdBQU4sR0FBWSxRQUFaLEdBQXVCLE1BQXZCLENBQVYsQ0FOSTs7QUFRSixtQkFDSTs7O2dCQUNJOztzQkFBSyxXQUFVLE1BQVYsRUFBTDtvQkFDSTs7MEJBQUssV0FBVSxhQUFWLEVBQUw7d0JBQ0ksNkJBQUMsS0FBRCxJQUFPLEtBQUksT0FBSjtBQUNILG1DQUFPLEdBQVA7QUFDQSxvQ0FBUSxHQUFSO0FBQ0EsaUNBQUssTUFBTSxLQUFOLEVBSFQsQ0FESjtxQkFESjtvQkFPSSxzREFBVyxLQUFJLE1BQUosRUFBVyxtQkFBa0IsWUFBbEI7QUFDbEIsbUNBQVcsSUFBWDtBQUNBLGtDQUFVLGtCQUFDLENBQUQ7bUNBQUssT0FBSyxRQUFMLENBQWMsRUFBQyxPQUFNLE9BQU8sTUFBUCxDQUFjLEtBQWQsRUFBb0IsRUFBQyxNQUFLLEVBQUUsTUFBRixDQUFTLEtBQVQsRUFBMUIsQ0FBTixFQUFmO3lCQUFMO0FBQ1YsZ0NBQVE7bUNBQUssTUFBTSxHQUFOLElBQWEsV0FBUyxNQUFULENBQWdCLEtBQWhCLENBQWI7eUJBQUw7QUFDUiwrQkFBTyxNQUFNLElBQU4sRUFKWCxDQVBKO29CQWFJLHVEQUFZLEtBQUksVUFBSixFQUFlLG1CQUFrQixVQUFsQjtBQUN2QixtQ0FBVyxJQUFYO0FBQ0EsZ0NBQVEsSUFBUjtBQUNBLDBDQUFrQixJQUFsQjtBQUNBLGlDQUFTLElBQUksSUFBSixFQUFUO0FBQ0Esa0NBQVUsa0JBQUMsR0FBRCxFQUFNLElBQU47bUNBQWEsT0FBSyxRQUFMLENBQWMsT0FBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixFQUFDLElBQUcsSUFBSCxFQUFyQixDQUFkO3lCQUFiO0FBQ1YsK0JBQU8sTUFBTSxFQUFOLEVBTlgsQ0FiSjtvQkFxQkk7OztBQUNJLG1DQUFPLEVBQUMsV0FBVSxFQUFWLEVBQVI7QUFDQSxrQ0FBSyxRQUFMO0FBQ0Esc0NBQVUsa0JBQUMsQ0FBRCxFQUFHLFFBQUg7dUNBQWMsT0FBSyxRQUFMLENBQWMsT0FBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixFQUFDLFFBQU8sUUFBUCxFQUFyQixDQUFkOzZCQUFkO0FBQ1YsMkNBQWUsTUFBTSxNQUFOLElBQWMsR0FBZCxFQUpuQjt3QkFLSSx3REFBYSxPQUFNLEdBQU4sRUFBVSxPQUFNLE1BQU4sRUFBdkIsQ0FMSjt3QkFNSSx3REFBYSxPQUFNLEdBQU4sRUFBVSxPQUFNLEtBQU4sRUFBdkIsQ0FOSjtxQkFyQko7b0JBOEJJLHFEQTlCSjtpQkFESjtnQkFpQ0ksNkJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVjtBQUNSLDJCQUFPLElBQVA7QUFDQSw4QkFBVSxrQkFBQyxDQUFEOytCQUFLLE9BQUssUUFBTCxDQUFjLENBQWQ7cUJBQUw7aUJBRmQsQ0FqQ0o7YUFESixDQVJJOzs7O2lDQWlEQyxPQUFNO0FBQ1gsaUJBQUssUUFBTCxDQUFjLEVBQUMsWUFBRCxFQUFkLEVBRFc7QUFFWCxnQkFBRyxNQUFNLEdBQU4sRUFDQyxXQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFESjs7OztvQ0FHTzs7O0FBQ1Asc0JBQVUsTUFBVixDQUFpQixVQUFqQixDQUE0QixVQUFDLENBQUQsRUFBSztBQUN6Qix1QkFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixVQUFoQixHQUE2QixHQUE3QixHQUFpQyxDQUFqQyxDQUR5QjthQUFMLEVBRXJCLFVBQUMsS0FBRCxFQUFTLEVBQVQsRUFFQTtBQUNDLHlCQUFRLEVBQVI7QUFDQSxpQ0FBZ0IsT0FBTyxlQUFQLENBQXVCLElBQXZCO2FBTnhCLEVBRE87Ozs7aUNBVUYsU0FBUTs7O2dCQUNSLFFBQU8sS0FBSyxLQUFMLENBQVAsTUFEUTs7QUFFYixvQkFBTyxPQUFQO0FBQ0EscUJBQUssTUFBTDtBQUNJLHlCQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQVMsSUFBVCxFQUFmLEVBREo7QUFFSSwrQkFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXVCLElBQXZCLEVBQTZCLFVBQUMsQ0FBRCxFQUFLO0FBQzlCLCtCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFdBQXBCLENBQWdDLE1BQWhDLEVBQXVDLENBQXZDLEVBRDhCO3FCQUFMLENBQTdCLENBRko7QUFLSSwwQkFMSjtBQURBLHFCQU9LLFFBQUw7QUFDSSx5QkFBSyxRQUFMLENBQWMsRUFBQyxVQUFTLElBQVQsRUFBZixFQURKO0FBRUksK0JBQVMsTUFBVCxDQUFnQixNQUFNLEdBQU4sRUFBVSxZQUFJO0FBQzFCLCtCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFdBQXBCLENBQWdDLEdBQWhDLEVBRDBCO3FCQUFKLENBQTFCLENBRko7QUFLSSwwQkFMSjtBQVBBLGFBRmE7Ozs7V0E5RkE7Ozs7OztBQWlIckIsS0FBSyxZQUFMLEdBQWtCLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBMUIiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LGltbXV0YWJsZSwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgUG9saWN5T2ZSZXdhcmRzIGZyb20gJy4vY29tcG9uZW50cy9yZXdhcmRzJ1xuXG52YXIge0xpc3QsQ29tbWFuZEJhcixQaG90b309VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge3BhcmFtcz17fX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtfaWQ6dGFyZ2V0SWR9PXBhcmFtcyxcbiAgICAgICAgICAgIGN1cnJlbnRDaGlsZD1kYkZhbWlseS5jdXJyZW50Q2hpbGQsXG4gICAgICAgICAgICB7X2lkOmN1cnJlbnRJZH09Y3VycmVudENoaWxkfHx7fVxuXG4gICAgICAgIGlmKCF0YXJnZXRJZClcbiAgICAgICAgICAgIHRoaXMuc3RhdGU9e2NoaWxkOnt9fVxuICAgICAgICBlbHNlIGlmKHRhcmdldElkPT1jdXJyZW50SWQpXG4gICAgICAgICAgICB0aGlzLnN0YXRlPSh7Y2hpbGQ6ZGJGYW1pbHkuY3VycmVudENoaWxkfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGJGYW1pbHkuZmluZCh7X2lkOnRhcmdldElkfSwoYSk9PmRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5jaGFuZ2luZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHtwYXJhbXM6e19pZDp0YXJnZXRJZH19PW5leHRQcm9wcyxcbiAgICAgICAgICAgIHtjaGlsZDp7X2lkOmN1cnJlbnRJZH19PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighdGFyZ2V0SWQpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGlsZDp7fX0pXG4gICAgICAgIGVsc2UgaWYodGFyZ2V0SWQ9PWN1cnJlbnRJZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGJGYW1pbHkuZmluZCh7X2lkOnRhcmdldElkfSwoYSk9PmRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NoaWxkLHJlbW92aW5nfT10aGlzLnN0YXRlXG4gICAgICAgIGlmKHJlbW92aW5nKVxuICAgICAgICAgICAgcmV0dXJuICg8c3Bhbj5cInJlbW92aW5nLi4uXCI8L3NwYW4+KVxuXG4gICAgICAgIHZhciBjbWRzPVtcIkJhY2tcIl07XG4gICAgICAgIGNtZHMucHVzaChjaGlsZC5faWQgPyBcIlJlbW92ZVwiIDogXCJTYXZlXCIpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQaG90byByZWY9XCJwaG90b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezE1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezE1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2NoaWxkLnBob3RvfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCIgZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnRoaXMuc2V0U3RhdGUoe2NoaWxkOk9iamVjdC5hc3NpZ24oY2hpbGQse25hbWU6ZS50YXJnZXQudmFsdWV9KX0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoKT0+KGNoaWxkLl9pZCAmJiBkYkZhbWlseS51cHNlcnQoY2hpbGQpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5uYW1lfS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPERhdGVQaWNrZXIgcmVmPVwiYmlydGhkYXlcIiBmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Paz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dZZWFyU2VsZWN0b3I9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtuZXcgRGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhuaWwsIGRhdGUpPT50aGlzLm9uQ2hhbmdlKE9iamVjdC5hc3NpZ24oY2hpbGQse2JkOmRhdGV9KSl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y2hpbGQuYmR9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b25Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUsc2VsZWN0ZWQpPT50aGlzLm9uQ2hhbmdlKE9iamVjdC5hc3NpZ24oY2hpbGQse2dlbmRlcjpzZWxlY3RlZH0pKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2VsZWN0ZWQ9e2NoaWxkLmdlbmRlcnx8XCJmXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cImJveVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9CdXR0b25Hcm91cD5cblxuICAgICAgICAgICAgICAgICAgICA8UG9saWN5T2ZSZXdhcmRzLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NtZHN9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsoYSk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvbkNoYW5nZShjaGlsZCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoaWxkfSlcbiAgICAgICAgaWYoY2hpbGQuX2lkKVxuICAgICAgICAgICAgZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuICAgIH1cbiAgICB0YWtlUGhvdG8oKXtcbiAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKChwKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcy5waG90by5nZXRET01Ob2RlKCkuc3JjPXBcbiAgICAgICAgICAgIH0sIChlcnJvcik9PntcblxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHF1YWxpdHk6NTAsXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25UeXBlOkNhbWVyYS5EZXN0aW5hdGlvblR5cGUuRklMRVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnN0YXRlXG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoYW5naW5nOnRydWV9KVxuICAgICAgICAgICAgZGJGYW1pbHkudXBzZXJ0KGNoaWxkLCBudWxsLCAoYSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2VXaXRoKFwiYmFieVwiLGEpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlJlbW92ZVwiOlxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVtb3Zpbmc6dHJ1ZX0pXG4gICAgICAgICAgICBkYkZhbWlseS5yZW1vdmUoY2hpbGQuX2lkLCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlV2l0aChcIi9cIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxufVxuXG5CYWJ5LmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuIl19