'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _alarmAdd = require('material-ui/svg-icons/action/alarm-add');

var _alarmAdd2 = _interopRequireDefault(_alarmAdd);

var _arrowForward = require('material-ui/svg-icons/navigation/arrow-forward');

var _arrowForward2 = _interopRequireDefault(_arrowForward);

var _db = require('../db');

var _mood = require('material-ui/svg-icons/social/mood');

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rewards = function (_React$Component) {
	_inherits(Rewards, _React$Component);

	function Rewards() {
		_classCallCheck(this, Rewards);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewards).apply(this, arguments));

		_this.state = {
			goals: null,
			rewards: null
		};
		_this.onChange = _this.onChange.bind(_this);
		_this.onScroll = _this.onScroll.bind(_this);
		return _this;
	}

	_createClass(Rewards, [{
		key: 'onChange',
		value: function onChange(condition) {
			var _this2 = this;

			condition = { child: condition.child };

			Promise.all([new Promise(function (resolve, reject) {
				return _db.Reward.find(condition).fetch(resolve, reject);
			}), new Promise(function (resolve, reject) {
				return _db.Goal.find(condition).fetch(resolve, reject);
			})]).then(function (a) {
				var _a = _slicedToArray(a, 2);

				var rewards = _a[0];
				var goals = _a[1];

				_this2.setState({ rewards: rewards, goals: goals });
			});
		}
	}, {
		key: 'onScroll',
		value: function onScroll(e) {
			var _this3 = this;

			if (this._scrollTimer) clearTimeout(this._scrollTimer);
			this._scrollTimer = setTimeout(function (e) {
				var _React$findDOMNode$ge = _qiliApp.React.findDOMNode(_this3).getBoundingClientRect();

				var top = _React$findDOMNode$ge.top;
				var height = _React$findDOMNode$ge.height;
				var bottom = top + height;
				var _props = _this3.props;
				var minY = _props.minY;
				var maxY = _props.maxY;
				var editable = _props.editable;
				var _refs = _this3.refs;
				var pendingGoal = _refs.pendingGoal;
				var rewardor = _refs.rewardor;


				if (pendingGoal) {
					(function () {
						var classes = _qiliApp.React.findDOMNode(pendingGoal).classList;
						var act = top <= minY ? "add" : "remove";
						"sticky top left".split(" ").forEach(function (a) {
							return classes[act](a);
						});
					})();
				}

				if (rewardor) {
					var _classes = _qiliApp.React.findDOMNode(rewardor).classList;
					var _act = top > maxY || bottom < minY ? "add" : "remove";
					_classes[_act]("hide");
				}
			}, 300);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_db.Reward.on("upserted", this.onChange);
			_db.Goal.on("upserted", this.onChange);
			window.addEventListener("scroll", this.onScroll);
			this.onChange({ child: this.props.child._id });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_db.Reward.removeListener("upserted", this.onChange);
			_db.Goal.removeListener("upserted", this.onChange);
			window.removeEventListener("scroll", this.onScroll);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var newChild = nextProps.child;
			var child = this.props.child;


			if (child != newChild) this.onChange({ child: newChild._id });
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.refs.pendingGoal) this.refs.pendingGoal.setState({ reward: "", total: "" });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state = this.state;
			var goals = _state.goals;
			var rewards = _state.rewards;
			var outView = _state.outView;
			var outTop = _state.outTop;
			var _props2 = this.props;
			var height = _props2.height;
			var editable = _props2.editable;
			var _props2$style = _props2.style;
			var style = _props2$style === undefined ? {} : _props2$style;

			var total = 0,
			    max = 0,
			    action = null,
			    buf = 7;
			goals = goals && goals.map(function (a) {
				return _qiliApp.React.createElement(AGoal, {
					key: 'goal_' + a.total,
					height: height,
					reward: a.reward,
					total: (max = Math.max(max, a.total), a.total) });
			});

			rewards = rewards && rewards.map(function (a) {
				return _qiliApp.React.createElement(AReward, {
					key: 'reward_' + (total += a.amount),
					onReasonChange: function onReasonChange(newReason) {
						return _this4.onReasonChange(a, newReason);
					},
					height: height,
					reason: a.reason,
					amount: a.amount,
					total: total });
			});

			max = Math.max(total, max);

			if (editable) {
				action = _qiliApp.React.createElement(PendingGoal, { ref: 'pendingGoal', bottom: (max + buf) * height, current: total, height: height, onPendGoal: function onPendGoal(goal) {
						return _this4.pendGoal(goal);
					} });
			} else if (!outView) {
				action = _qiliApp.React.createElement(Rewardor, { ref: 'rewardor', current: total, height: height, onReward: function onReward(amount) {
						return _this4.reward(amount);
					} });
			}

			style.height = (max + buf) * height;
			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards page', style: style },
				_qiliApp.React.createElement(
					'svg',
					{ className: 'arrow', width: '100%', height: '100%', viewBox: '0 0 10 10' },
					_qiliApp.React.createElement('path', { d: 'M0,10 L5,0 L10,10', 'stroke-width': '0.2' })
				),
				goals,
				rewards,
				action
			);
		}
	}, {
		key: 'pendGoal',
		value: function pendGoal(goal) {
			goal.child = this.props.child._id;
			_db.Goal.upsert(goal);
		}
	}, {
		key: 'reward',
		value: function reward(amount) {
			var newReward = { amount: amount, child: this.props.child._id };
			_db.Reward.upsert(newReward);
		}
	}, {
		key: 'onReasonChange',
		value: function onReasonChange(reward, newReason) {
			reward.reason = newReason;
			_db.Reward.upsert(reward);
		}
	}]);

	return Rewards;
}(_qiliApp.React.Component);

Rewards.defaultProps = {
	editable: false,
	height: 20,
	minY: 0,
	maxY: window.innerHeight
};
Rewards.propTypes = {
	child: _qiliApp.React.PropTypes.object,
	editable: _qiliApp.React.PropTypes.bool,
	height: _qiliApp.React.PropTypes.number,
	maxY: _qiliApp.React.PropTypes.number,
	minY: _qiliApp.React.PropTypes.number
};
exports.default = Rewards;

var Item = function (_React$Component2) {
	_inherits(Item, _React$Component2);

	function Item() {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
	}

	return Item;
}(_qiliApp.React.Component);

Item.defaultProps = {
	height: 20
};

var PendingGoal = function (_Item) {
	_inherits(PendingGoal, _Item);

	function PendingGoal() {
		_classCallCheck(this, PendingGoal);

		var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(PendingGoal).apply(this, arguments));

		_this6.state = {
			reward: "",
			total: ""
		};
		return _this6;
	}

	_createClass(PendingGoal, [{
		key: 'render',
		value: function render() {
			var _this7 = this;

			var _props3 = this.props;
			var current = _props3.current;
			var bottom = _props3.bottom;
			var _state2 = this.state;
			var reward = _state2.reward;
			var total = _state2.total;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'goal pending', style: { bottom: bottom } },
				_qiliApp.React.createElement(
					'div',
					null,
					_qiliApp.React.createElement('input', { onBlur: function onBlur(e) {
							return _this7.tryPend({ reward: e.target.value });
						},
						value: reward || "",
						onChange: function onChange(e) {
							return _this7.setState({ reward: e.target.value });
						},
						className: 'pendingReward',
						placeholder: 'New Reward...',
						style: { textAlign: "right", width: "100%" } })
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'icon' },
					'»'
				),
				_qiliApp.React.createElement(
					'div',
					null,
					_qiliApp.React.createElement('input', { onBlur: function onBlur(e) {
							return _this7.tryPend({ total: e.target.value });
						},
						type: 'number',
						value: total || "",
						onChange: function onChange(e) {
							return _this7.setState({ total: e.target.value });
						},
						placeholder: 'Goal:>' + current,
						style: { width: "6em" } })
				)
			);
		}
	}, {
		key: 'tryPend',
		value: function tryPend(state) {
			var newReward = state.reward;
			var newTotal = state.total;
			var _props4 = this.props;
			var current = _props4.current;
			var onPendGoal = _props4.onPendGoal;
			var _state3 = this.state;
			var reward = _state3.reward;
			var total = _state3.total;

			if (newReward) reward = newReward;
			if (newTotal) total = newTotal;
			if (reward.trim() && total.trim()) {
				total = parseInt(total.trim());
				if (total > current) {
					reward = reward.trim();
					onPendGoal({ reward: reward, total: total });
					return;
				} else {
					_qiliApp.UI.Messager.show('new goal must greater than current total ' + current);
					_qiliApp.React.findDOMNode(this.refs.goal).focus();
				}
			}
			this.setState({ reward: reward, total: total });
		}
	}]);

	return PendingGoal;
}(Item);

PendingGoal.defaultProps = {
	onPendGoal: function onPendGoal(a) {
		return 1;
	}
};

var AGoal = function (_Item2) {
	_inherits(AGoal, _Item2);

	function AGoal() {
		_classCallCheck(this, AGoal);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(AGoal).apply(this, arguments));
	}

	_createClass(AGoal, [{
		key: 'render',
		value: function render() {
			var _props5 = this.props;
			var reward = _props5.reward;
			var total = _props5.total;
			var height = _props5.height;

			var style = { fontSize: "x-small", whiteSpace: "nowrap", backgroundColor: "lightgreen" };
			return _qiliApp.React.createElement(
				'div',
				{ className: 'goal', style: { bottom: height * total } },
				_qiliApp.React.createElement(
					'div',
					null,
					_qiliApp.React.createElement(
						_materialUi.Avatar,
						{ style: style },
						reward
					)
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'icon' },
					'•'
				),
				_qiliApp.React.createElement(
					'div',
					null,
					total
				)
			);
		}
	}]);

	return AGoal;
}(Item);

var AReward = function (_Item3) {
	_inherits(AReward, _Item3);

	function AReward() {
		_classCallCheck(this, AReward);

		var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(AReward).apply(this, arguments));

		_this9.state = { newReason: null };
		return _this9;
	}

	_createClass(AReward, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ newReason: null });
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var reason = this.refs.reason;

			reason && reason.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this10 = this;

			var _props6 = this.props;
			var reason = _props6.reason;
			var amount = _props6.amount;
			var total = _props6.total;
			var height = _props6.height;
			var newReason = this.state.newReason;


			if (newReason) {
				reason = _qiliApp.React.createElement(_materialUi.TextField, { ref: 'reason', defaultValue: newReason,
					onEnterKeyDown: function onEnterKeyDown(e) {
						return e.target.blur();
					},
					onBlur: function onBlur(e) {
						return _this10.reasonChanged(e.target.value.trim());
					} });
			}

			return _qiliApp.React.createElement(
				'div',
				{ className: 'reward', style: { bottom: height * total } },
				_qiliApp.React.createElement(
					'div',
					{ className: 'icon' },
					'•'
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'reason', onClick: function onClick(e) {
							return _this10.setState({ newReason: reason || " " });
						} },
					reason || "..."
				),
				_qiliApp.React.createElement(
					'div',
					null,
					'+',
					amount,
					'/',
					total
				)
			);
		}
	}, {
		key: 'reasonChanged',
		value: function reasonChanged(newReason) {
			var _props7 = this.props;
			var reason = _props7.reason;
			var onReasonChange = _props7.onReasonChange;

			if (!newReason || newReason == reason) {
				this.setState({ newReason: undefined });
				return;
			}

			onReasonChange && onReasonChange(newReason);
		}
	}]);

	return AReward;
}(Item);

var Rewardor = function (_Item4) {
	_inherits(Rewardor, _Item4);

	function Rewardor() {
		_classCallCheck(this, Rewardor);

		var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewardor).apply(this, arguments));

		_this11.state = { plus: 0, ticker: null };
		return _this11;
	}

	_createClass(Rewardor, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ plus: 0, ticker: null });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this12 = this;

			var plus = this.state.plus;
			var _props8 = this.props;
			var height = _props8.height;
			var current = _props8.current;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'reward pending' },
				_qiliApp.React.createElement(
					'div',
					{ className: 'reason' },
					_qiliApp.React.createElement(_mood2.default, { className: 'rewarder', onClick: function onClick(e) {
							return _this12.plus();
						} }),
					_qiliApp.React.createElement(
						'span',
						null,
						current
					),
					_qiliApp.React.createElement(
						'span',
						{ className: 'plus ' + (plus ? "plusing" : "") },
						'+',
						plus || 'x'
					)
				)
			);
		}
	}, {
		key: 'plus',
		value: function plus() {
			var _state4 = this.state;
			var plus = _state4.plus;
			var ticker = _state4.ticker;

			ticker && clearTimeout(ticker);
			plus++;
			ticker = setTimeout(this.reward.bind(this), 1000);
			this.setState({ plus: plus, ticker: ticker });
		}
	}, {
		key: 'reward',
		value: function reward() {
			var _state5 = this.state;
			var plus = _state5.plus;
			var ticker = _state5.ticker;

			ticker && clearTimeout(ticker);
			this.props.onReward(plus);
		}
	}]);

	return Rewardor;
}(Item);

Rewardor.propTypes = {
	current: _qiliApp.React.PropTypes.number,
	onReward: _qiliApp.React.PropTypes.func
};
Rewardor.defaultProps = {
	current: 0,
	onReward: function onReward(a) {
		return 1;
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFtUkE7Ozs7Ozs7Ozs7OztJQWpScUI7OztBQWVwQixVQWZvQixPQWVwQixHQUFhO3dCQWZPLFNBZVA7O3FFQWZPLHFCQWdCVixZQURHOztBQUVaLFFBQUssS0FBTCxHQUFXO0FBQ1YsVUFBTSxJQUFOO0FBQ0EsWUFBUSxJQUFSO0dBRkQsQ0FGWTtBQU1aLFFBQUssUUFBTCxHQUFjLE1BQUssUUFBTCxDQUFjLElBQWQsT0FBZCxDQU5ZO0FBT1osUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkLENBUFk7O0VBQWI7O2NBZm9COzsyQkF5QlgsV0FBVTs7O0FBQ2xCLGVBQVUsRUFBQyxPQUFNLFVBQVUsS0FBVixFQUFqQixDQURrQjs7QUFHbEIsV0FBUSxHQUFSLENBQVksQ0FDWCxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBUyxNQUFUO1dBQWtCLFdBQVMsSUFBVCxDQUFjLFNBQWQsRUFBeUIsS0FBekIsQ0FBK0IsT0FBL0IsRUFBdUMsTUFBdkM7SUFBbEIsQ0FERCxFQUVYLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0IsU0FBTyxJQUFQLENBQVksU0FBWixFQUF1QixLQUF2QixDQUE2QixPQUE3QixFQUFxQyxNQUFyQztJQUFsQixDQUZELENBQVosRUFHRyxJQUhILENBR1EsYUFBRzs0QkFDVyxNQURYOztRQUNMLGdCQURLO1FBQ0ksY0FESjs7QUFFVixXQUFLLFFBQUwsQ0FBYyxFQUFDLGdCQUFELEVBQVMsWUFBVCxFQUFkLEVBRlU7SUFBSCxDQUhSLENBSGtCOzs7OzJCQVlWLEdBQUU7OztBQUNWLE9BQUcsS0FBSyxZQUFMLEVBQ0YsYUFBYSxLQUFLLFlBQUwsQ0FBYixDQUREO0FBRUEsUUFBSyxZQUFMLEdBQWtCLFdB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QixJQUFoQjs7QUFITixTQU1FLGVBQWE7QUFDbkIsVUFBUSxDQUFSO0FBQ0EsV0FBVTtTQUFHO0VBQUgiLCJmaWxlIjoicmV3YXJkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtUZXh0RmllbGQsIEljb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgUGx1c0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1hZGQnXG5pbXBvcnQgRm9yd2FyZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWZvcndhcmRcIlxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHksIFJld2FyZCBhcyBkYlJld2FyZCwgR29hbCBhcyBkYkdvYWx9IGZyb20gJy4uL2RiJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRlZGl0YWJsZTpmYWxzZSxcblx0XHRoZWlnaHQ6MjAsXG5cdFx0bWluWTowLFxuXHRcdG1heFk6d2luZG93LmlubmVySGVpZ2h0XG5cdH1cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y2hpbGQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0ZWRpdGFibGU6UmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0aGVpZ2h0OlJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0bWF4WTpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdG1pblk6UmVhY3QuUHJvcFR5cGVzLm51bWJlclxuXHR9XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRnb2FsczpudWxsLFxuXHRcdFx0cmV3YXJkczpudWxsXG5cdFx0fVxuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5vblNjcm9sbD10aGlzLm9uU2Nyb2xsLmJpbmQodGhpcylcblx0fVxuXG5cdG9uQ2hhbmdlKGNvbmRpdGlvbil7XG5cdFx0Y29uZGl0aW9uPXtjaGlsZDpjb25kaXRpb24uY2hpbGR9XG5cblx0XHRQcm9taXNlLmFsbChbXG5cdFx0XHRuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5kYlJld2FyZC5maW5kKGNvbmRpdGlvbikuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKSxcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiR29hbC5maW5kKGNvbmRpdGlvbikuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKVxuXHRcdF0pLnRoZW4oYT0+e1xuXHRcdFx0bGV0IFtyZXdhcmRzLCBnb2Fsc109YVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkcyxnb2Fsc30pXG5cdFx0fSlcblx0fVxuXHRcblx0b25TY3JvbGwoZSl7XG5cdFx0aWYodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0dGhpcy5fc2Nyb2xsVGltZXI9c2V0VGltZW91dChlPT57XG5cdFx0XHR2YXIge3RvcCxoZWlnaHR9PVJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0XHQsYm90dG9tPXRvcCtoZWlnaHRcblx0XHRcdCx7bWluWSxtYXhZLGVkaXRhYmxlfT10aGlzLnByb3BzXG5cdFx0XHQse3BlbmRpbmdHb2FsLCByZXdhcmRvcn09dGhpcy5yZWZzXG5cdFx0XHRcblx0XHRcdGlmKHBlbmRpbmdHb2FsKXtcblx0XHRcdFx0bGV0IGNsYXNzZXM9UmVhY3QuZmluZERPTU5vZGUocGVuZGluZ0dvYWwpLmNsYXNzTGlzdFxuXHRcdFx0XHRsZXQgYWN0PXRvcDw9bWluWSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiO1xuXHRcdFx0XHRcInN0aWNreSB0b3AgbGVmdFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGE9PmNsYXNzZXNbYWN0XShhKSlcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYocmV3YXJkb3Ipe1xuXHRcdFx0XHRsZXQgY2xhc3Nlcz1SZWFjdC5maW5kRE9NTm9kZShyZXdhcmRvcikuY2xhc3NMaXN0XG5cdFx0XHRcdGxldCBhY3Q9KHRvcD5tYXhZIHx8IGJvdHRvbTxtaW5ZKSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXG5cdFx0XHRcdGNsYXNzZXNbYWN0XShcImhpZGVcIilcblx0XHRcdH1cblx0XHR9LDMwMClcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0ZGJSZXdhcmQub24oXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGRiR29hbC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuXHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOnRoaXMucHJvcHMuY2hpbGQuX2lkfSlcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0ZGJSZXdhcmQucmVtb3ZlTGlzdGVuZXIoXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGRiR29hbC5yZW1vdmVMaXN0ZW5lcihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuXHR9XG5cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0bGV0IHtjaGlsZDpuZXdDaGlsZH09bmV4dFByb3BzLFxuXHRcdFx0e2NoaWxkfT10aGlzLnByb3BzXG5cblx0XHRpZihjaGlsZCE9bmV3Q2hpbGQpXG5cdFx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDpuZXdDaGlsZC5faWR9KVxuXHR9XG5cdFxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRpZih0aGlzLnJlZnMucGVuZGluZ0dvYWwpXG5cdFx0XHR0aGlzLnJlZnMucGVuZGluZ0dvYWwuc2V0U3RhdGUoe3Jld2FyZDpcIlwiLHRvdGFsOlwiXCJ9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtnb2FscywgcmV3YXJkcywgb3V0Vmlldywgb3V0VG9wfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsZWRpdGFibGUsIHN0eWxlPXt9fT10aGlzLnByb3BzXG5cdFx0bGV0IHRvdGFsPTAsIG1heD0wLCBhY3Rpb249bnVsbCwgYnVmPTdcblx0XHRnb2Fscz1nb2FscyAmJiBnb2Fscy5tYXAoYT0+PEFHb2FsXG5cdFx0XHRcdFx0a2V5PXtgZ29hbF8ke2EudG90YWx9YH1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHRyZXdhcmQ9e2EucmV3YXJkfVxuXHRcdFx0XHRcdHRvdGFsPXttYXg9TWF0aC5tYXgobWF4LGEudG90YWwpLCBhLnRvdGFsfS8+KVxuXG5cdFx0cmV3YXJkcz1yZXdhcmRzICYmIHJld2FyZHMubWFwKGE9PjxBUmV3YXJkXG5cdFx0XHRcdFx0a2V5PXtgcmV3YXJkXyR7dG90YWwrPWEuYW1vdW50fWB9XG5cdFx0XHRcdFx0b25SZWFzb25DaGFuZ2U9e25ld1JlYXNvbj0+dGhpcy5vblJlYXNvbkNoYW5nZShhLG5ld1JlYXNvbil9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmVhc29uPXthLnJlYXNvbn1cblx0XHRcdFx0XHRhbW91bnQ9e2EuYW1vdW50fVxuXHRcdFx0XHRcdHRvdGFsPXt0b3RhbH0vPilcblxuXHRcdG1heD1NYXRoLm1heCh0b3RhbCxtYXgpXG5cblx0XHRpZihlZGl0YWJsZSl7XG5cdFx0XHRhY3Rpb249KDxQZW5kaW5nR29hbCByZWY9XCJwZW5kaW5nR29hbFwiIGJvdHRvbT17KG1heCtidWYpKmhlaWdodH0gY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblBlbmRHb2FsPXtnb2FsPT50aGlzLnBlbmRHb2FsKGdvYWwpfS8+KVxuXHRcdH1lbHNlIGlmKCFvdXRWaWV3KXtcblx0XHRcdGFjdGlvbj0oPFJld2FyZG9yIHJlZj1cInJld2FyZG9yXCIgY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblJld2FyZD17YW1vdW50PT50aGlzLnJld2FyZChhbW91bnQpfS8+KVxuXHRcdH1cblxuXHRcdHN0eWxlLmhlaWdodD0obWF4K2J1ZikqaGVpZ2h0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkcyBwYWdlXCIgc3R5bGU9e3N0eWxlfT5cblx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJhcnJvd1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDEwIDEwXCI+XG5cdFx0XHRcdFx0PHBhdGggZD1cIk0wLDEwIEw1LDAgTDEwLDEwXCIgc3Ryb2tlLXdpZHRoPVwiMC4yXCIvPlxuXHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0e2dvYWxzfVxuXG5cdFx0XHRcdHtyZXdhcmRzfVxuXG5cdFx0XHRcdHthY3Rpb259XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRwZW5kR29hbChnb2FsKXtcblx0XHRnb2FsLmNoaWxkPXRoaXMucHJvcHMuY2hpbGQuX2lkXG5cdFx0ZGJHb2FsLnVwc2VydChnb2FsKVxuXHR9XG5cblx0cmV3YXJkKGFtb3VudCl7XG5cdFx0bGV0IG5ld1Jld2FyZD17YW1vdW50LCBjaGlsZDp0aGlzLnByb3BzLmNoaWxkLl9pZH1cblx0XHRkYlJld2FyZC51cHNlcnQobmV3UmV3YXJkKVxuXHR9XG5cblx0b25SZWFzb25DaGFuZ2UocmV3YXJkLCBuZXdSZWFzb24pe1xuXHRcdHJld2FyZC5yZWFzb249bmV3UmVhc29uXG5cdFx0ZGJSZXdhcmQudXBzZXJ0KHJld2FyZClcblx0fVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRoZWlnaHQ6MjBcblx0fVxufVxuXG5jbGFzcyBQZW5kaW5nR29hbCBleHRlbmRzIEl0ZW17XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdG9uUGVuZEdvYWw6YT0+MVxuXHR9XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0cmV3YXJkOlwiXCIsXG5cdFx0XHR0b3RhbDpcIlwiXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtjdXJyZW50LCBib3R0b219PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsIHBlbmRpbmdcIiBzdHlsZT17e2JvdHRvbX19PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkJsdXI9e2U9PnRoaXMudHJ5UGVuZCh7cmV3YXJkOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cmV3YXJkfHxcIlwifVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e2U9PnRoaXMuc2V0U3RhdGUoe3Jld2FyZDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwicGVuZGluZ1Jld2FyZFwiXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk5ldyBSZXdhcmQuLi5cIlxuXHRcdFx0XHRcdFx0c3R5bGU9e3t0ZXh0QWxpZ246XCJyaWdodFwiLHdpZHRoOlwiMTAwJVwifX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JnJhcXVvOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkJsdXI9e2U9PnRoaXMudHJ5UGVuZCh7dG90YWw6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHR5cGU9XCJudW1iZXJcIlxuXHRcdFx0XHRcdFx0dmFsdWU9e3RvdGFsfHxcIlwifVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e2U9PnRoaXMuc2V0U3RhdGUoe3RvdGFsOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17YEdvYWw6PiR7Y3VycmVudH1gfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjZlbVwifX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHRyeVBlbmQoc3RhdGUpe1xuXHRcdGxldCB7cmV3YXJkOm5ld1Jld2FyZCwgdG90YWw6bmV3VG90YWx9PXN0YXRlXG5cdFx0bGV0IHtjdXJyZW50LG9uUGVuZEdvYWx9PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRpZihuZXdSZXdhcmQpXG5cdFx0XHRyZXdhcmQ9bmV3UmV3YXJkXG5cdFx0aWYobmV3VG90YWwpXG5cdFx0XHR0b3RhbD1uZXdUb3RhbFxuXHRcdGlmKHJld2FyZC50cmltKCkgJiYgdG90YWwudHJpbSgpKXtcblx0XHRcdHRvdGFsPXBhcnNlSW50KHRvdGFsLnRyaW0oKSlcblx0XHRcdGlmKHRvdGFsPmN1cnJlbnQpe1xuXHRcdFx0XHRyZXdhcmQ9cmV3YXJkLnRyaW0oKVxuXHRcdFx0XHRvblBlbmRHb2FsKHtyZXdhcmQsdG90YWx9KVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRVSS5NZXNzYWdlci5zaG93KGBuZXcgZ29hbCBtdXN0IGdyZWF0ZXIgdGhhbiBjdXJyZW50IHRvdGFsICR7Y3VycmVudH1gKVxuXHRcdFx0XHRSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZ29hbCkuZm9jdXMoKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmQsdG90YWx9KVxuXHR9XG59XG5cbmNsYXNzIEFHb2FsIGV4dGVuZHMgSXRlbXtcblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZXdhcmQsdG90YWwsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHN0eWxlPXtmb250U2l6ZTpcIngtc21hbGxcIiwgd2hpdGVTcGFjZTpcIm5vd3JhcFwiLGJhY2tncm91bmRDb2xvcjpcImxpZ2h0Z3JlZW5cIn1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXY+PEF2YXRhciBzdHlsZT17c3R5bGV9PntyZXdhcmR9PC9BdmF0YXI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2Pnt0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBBUmV3YXJkIGV4dGVuZHMgSXRlbXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17bmV3UmVhc29uOm51bGx9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOm51bGx9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0bGV0IHtyZWFzb259PXRoaXMucmVmc1xuXHRcdHJlYXNvbiAmJiByZWFzb24uZm9jdXMoKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZWFzb24sYW1vdW50LHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCB7bmV3UmVhc29ufT10aGlzLnN0YXRlXG5cblx0XHRpZihuZXdSZWFzb24pe1xuXHRcdFx0cmVhc29uPSg8VGV4dEZpZWxkIHJlZj1cInJlYXNvblwiIGRlZmF1bHRWYWx1ZT17bmV3UmVhc29ufVxuXHRcdFx0XHRvbkVudGVyS2V5RG93bj17ZT0+ZS50YXJnZXQuYmx1cigpfVxuXHRcdFx0XHRvbkJsdXI9e2U9PnRoaXMucmVhc29uQ2hhbmdlZChlLnRhcmdldC52YWx1ZS50cmltKCkpfS8+KVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWFzb25cIiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHtuZXdSZWFzb246cmVhc29ufHxcIiBcIn0pfT5cblx0XHRcdFx0e3JlYXNvbnx8XCIuLi5cIn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXY+K3thbW91bnR9L3t0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG5cblx0cmVhc29uQ2hhbmdlZChuZXdSZWFzb24pe1xuXHRcdGxldCB7cmVhc29uLCBvblJlYXNvbkNoYW5nZX09dGhpcy5wcm9wc1xuXHRcdGlmKCFuZXdSZWFzb24gfHwgbmV3UmVhc29uPT1yZWFzb24pe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnVuZGVmaW5lZH0pXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0b25SZWFzb25DaGFuZ2UgJiYgb25SZWFzb25DaGFuZ2UobmV3UmVhc29uKVxuXHR9XG59XG5cblxuaW1wb3J0IFJld2FyZEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kJ1xuY2xhc3MgUmV3YXJkb3IgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjdXJyZW50OlJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0b25SZXdhcmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRjdXJyZW50OjAsXG5cdFx0b25SZXdhcmQ6IGE9PjFcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e3BsdXM6MCx0aWNrZXI6bnVsbH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzOjAsdGlja2VyOm51bGx9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtwbHVzfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsY3VycmVudH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZCBwZW5kaW5nXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCI+XG5cdFx0XHRcdFx0PFJld2FyZEljb24gY2xhc3NOYW1lPVwicmV3YXJkZXJcIiBvbkNsaWNrPXtlPT50aGlzLnBsdXMoKX0gLz5cblx0XHRcdFx0XHQ8c3Bhbj57Y3VycmVudH08L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgcGx1cyAke3BsdXMgPyBcInBsdXNpbmdcIiA6IFwiXCJ9YH0+K3twbHVzfHwneCd9PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBsdXMoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0cGx1cysrXG5cdFx0dGlja2VyPXNldFRpbWVvdXQodGhpcy5yZXdhcmQuYmluZCh0aGlzKSwxMDAwKVxuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXMsdGlja2VyfSlcblx0fVxuXG5cdHJld2FyZCgpe1xuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcblx0XHR0aWNrZXIgJiYgY2xlYXJUaW1lb3V0KHRpY2tlcilcblx0XHR0aGlzLnByb3BzLm9uUmV3YXJkKHBsdXMpXG5cdH1cbn1cbiJdfQ==