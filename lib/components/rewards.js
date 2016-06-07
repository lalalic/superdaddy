'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _alarmAdd = require('material-ui/lib/svg-icons/action/alarm-add');

var _alarmAdd2 = _interopRequireDefault(_alarmAdd);

var _arrowForward = require('material-ui/lib/svg-icons/navigation/arrow-forward');

var _arrowForward2 = _interopRequireDefault(_arrowForward);

var _db = require('../db');

var _mood = require('material-ui/lib/svg-icons/social/mood');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFtUkE7Ozs7Ozs7Ozs7OztJQWpScUI7OztBQWVwQixVQWZvQixPQWVwQixHQUFhO3dCQWZPLFNBZVA7O3FFQWZPLHFCQWdCVixZQURHOztBQUVaLFFBQUssS0FBTCxHQUFXO0FBQ1YsVUFBTSxJQUFOO0FBQ0EsWUFBUSxJQUFSO0dBRkQsQ0FGWTtBQU1aLFFBQUssUUFBTCxHQUFjLE1BQUssUUFBTCxDQUFjLElBQWQsT0FBZCxDQU5ZO0FBT1osUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkLENBUFk7O0VBQWI7O2NBZm9COzsyQkF5QlgsV0FBVTs7O0FBQ2xCLGVBQVUsRUFBQyxPQUFNLFVBQVUsS0FBVixFQUFqQixDQURrQjs7QUFHbEIsV0FBUSxHQUFSLENBQVksQ0FDWCxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBUyxNQUFUO1dBQWtCLFdBQVMsSUFBVCxDQUFjLFNBQWQsRUFBeUIsS0FBekIsQ0FBK0IsT0FBL0IsRUFBdUMsTUFBdkM7SUFBbEIsQ0FERCxFQUVYLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0IsU0FBTyxJQUFQLENBQVksU0FBWixFQUF1QixLQUF2QixDQUE2QixPQUE3QixFQUFxQyxNQUFyQztJQUFsQixDQUZELENBQVosRUFHRyxJQUhILENBR1EsYUFBRzs0QkFDVyxNQURYOztRQUNMLGdCQURLO1FBQ0ksY0FESjs7QUFFVixXQUFLLFFBQUwsQ0FBYyxFQUFDLGdCQUFELEVBQVMsWUFBVCxFQUFkLEVBRlU7SUFBSCxDQUhSLENBSGtCOzs7OzJCQVlWLEdBQUU7OztBQUNWLE9BQUcsS0FBSyxZQUFMLEVBQ0YsYUFBYSxLQUFLLFlBQUwsQ0FBYixDQUREO0FBRUEsUUFBSyxZQUFMLEdBQWtCLFdB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QixJQUFoQjs7QUFITixTQU1FLGVBQWE7QUFDbkIsVUFBUSxDQUFSO0FBQ0EsV0FBVTtTQUFHO0VBQUgiLCJmaWxlIjoicmV3YXJkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtUZXh0RmllbGQsIEljb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgUGx1c0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tYWRkJ1xuaW1wb3J0IEZvcndhcmRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZm9yd2FyZFwiXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseSwgUmV3YXJkIGFzIGRiUmV3YXJkLCBHb2FsIGFzIGRiR29hbH0gZnJvbSAnLi4vZGInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGVkaXRhYmxlOmZhbHNlLFxuXHRcdGhlaWdodDoyMCxcblx0XHRtaW5ZOjAsXG5cdFx0bWF4WTp3aW5kb3cuaW5uZXJIZWlnaHRcblx0fVxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjaGlsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRlZGl0YWJsZTpSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRoZWlnaHQ6UmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblx0XHRtYXhZOlJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0bWluWTpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGdvYWxzOm51bGwsXG5cdFx0XHRyZXdhcmRzOm51bGxcblx0XHR9XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcylcblx0XHR0aGlzLm9uU2Nyb2xsPXRoaXMub25TY3JvbGwuYmluZCh0aGlzKVxuXHR9XG5cblx0b25DaGFuZ2UoY29uZGl0aW9uKXtcblx0XHRjb25kaXRpb249e2NoaWxkOmNvbmRpdGlvbi5jaGlsZH1cblxuXHRcdFByb21pc2UuYWxsKFtcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiUmV3YXJkLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpLFxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJHb2FsLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXG5cdFx0XSkudGhlbihhPT57XG5cdFx0XHRsZXQgW3Jld2FyZHMsIGdvYWxzXT1hXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHR9KVxuXHR9XG5cdFxuXHRvblNjcm9sbChlKXtcblx0XHRpZih0aGlzLl9zY3JvbGxUaW1lcilcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9zY3JvbGxUaW1lcilcblx0XHR0aGlzLl9zY3JvbGxUaW1lcj1zZXRUaW1lb3V0KGU9Pntcblx0XHRcdHZhciB7dG9wLGhlaWdodH09UmVhY3QuZmluZERPTU5vZGUodGhpcykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRcdCxib3R0b209dG9wK2hlaWdodFxuXHRcdFx0LHttaW5ZLG1heFksZWRpdGFibGV9PXRoaXMucHJvcHNcblx0XHRcdCx7cGVuZGluZ0dvYWwsIHJld2FyZG9yfT10aGlzLnJlZnNcblx0XHRcdFxuXHRcdFx0aWYocGVuZGluZ0dvYWwpe1xuXHRcdFx0XHRsZXQgY2xhc3Nlcz1SZWFjdC5maW5kRE9NTm9kZShwZW5kaW5nR29hbCkuY2xhc3NMaXN0XG5cdFx0XHRcdGxldCBhY3Q9dG9wPD1taW5ZID8gXCJhZGRcIiA6IFwicmVtb3ZlXCI7XG5cdFx0XHRcdFwic3RpY2t5IHRvcCBsZWZ0XCIuc3BsaXQoXCIgXCIpLmZvckVhY2goYT0+Y2xhc3Nlc1thY3RdKGEpKVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZihyZXdhcmRvcil7XG5cdFx0XHRcdGxldCBjbGFzc2VzPVJlYWN0LmZpbmRET01Ob2RlKHJld2FyZG9yKS5jbGFzc0xpc3Rcblx0XHRcdFx0bGV0IGFjdD0odG9wPm1heFkgfHwgYm90dG9tPG1pblkpID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJcblx0XHRcdFx0Y2xhc3Nlc1thY3RdKFwiaGlkZVwiKVxuXHRcdFx0fVxuXHRcdH0sMzAwKVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRkYlJld2FyZC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0ZGJHb2FsLm9uKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXG5cdFx0dGhpcy5vbkNoYW5nZSh7Y2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWR9KVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHRkYlJld2FyZC5yZW1vdmVMaXN0ZW5lcihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0ZGJHb2FsLnJlbW92ZUxpc3RlbmVyKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXG5cdH1cblxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblx0XHRsZXQge2NoaWxkOm5ld0NoaWxkfT1uZXh0UHJvcHMsXG5cdFx0XHR7Y2hpbGR9PXRoaXMucHJvcHNcblxuXHRcdGlmKGNoaWxkIT1uZXdDaGlsZClcblx0XHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOm5ld0NoaWxkLl9pZH0pXG5cdH1cblx0XG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGlmKHRoaXMucmVmcy5wZW5kaW5nR29hbClcblx0XHRcdHRoaXMucmVmcy5wZW5kaW5nR29hbC5zZXRTdGF0ZSh7cmV3YXJkOlwiXCIsdG90YWw6XCJcIn0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2dvYWxzLCByZXdhcmRzLCBvdXRWaWV3LCBvdXRUb3B9PXRoaXMuc3RhdGVcblx0XHRsZXQge2hlaWdodCxlZGl0YWJsZSwgc3R5bGU9e319PXRoaXMucHJvcHNcblx0XHRsZXQgdG90YWw9MCwgbWF4PTAsIGFjdGlvbj1udWxsLCBidWY9N1xuXHRcdGdvYWxzPWdvYWxzICYmIGdvYWxzLm1hcChhPT48QUdvYWxcblx0XHRcdFx0XHRrZXk9e2Bnb2FsXyR7YS50b3RhbH1gfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJld2FyZD17YS5yZXdhcmR9XG5cdFx0XHRcdFx0dG90YWw9e21heD1NYXRoLm1heChtYXgsYS50b3RhbCksIGEudG90YWx9Lz4pXG5cblx0XHRyZXdhcmRzPXJld2FyZHMgJiYgcmV3YXJkcy5tYXAoYT0+PEFSZXdhcmRcblx0XHRcdFx0XHRrZXk9e2ByZXdhcmRfJHt0b3RhbCs9YS5hbW91bnR9YH1cblx0XHRcdFx0XHRvblJlYXNvbkNoYW5nZT17bmV3UmVhc29uPT50aGlzLm9uUmVhc29uQ2hhbmdlKGEsbmV3UmVhc29uKX1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHRyZWFzb249e2EucmVhc29ufVxuXHRcdFx0XHRcdGFtb3VudD17YS5hbW91bnR9XG5cdFx0XHRcdFx0dG90YWw9e3RvdGFsfS8+KVxuXG5cdFx0bWF4PU1hdGgubWF4KHRvdGFsLG1heClcblxuXHRcdGlmKGVkaXRhYmxlKXtcblx0XHRcdGFjdGlvbj0oPFBlbmRpbmdHb2FsIHJlZj1cInBlbmRpbmdHb2FsXCIgYm90dG9tPXsobWF4K2J1ZikqaGVpZ2h0fSBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUGVuZEdvYWw9e2dvYWw9PnRoaXMucGVuZEdvYWwoZ29hbCl9Lz4pXG5cdFx0fWVsc2UgaWYoIW91dFZpZXcpe1xuXHRcdFx0YWN0aW9uPSg8UmV3YXJkb3IgcmVmPVwicmV3YXJkb3JcIiBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUmV3YXJkPXthbW91bnQ9PnRoaXMucmV3YXJkKGFtb3VudCl9Lz4pXG5cdFx0fVxuXG5cdFx0c3R5bGUuaGVpZ2h0PShtYXgrYnVmKSpoZWlnaHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRzIHBhZ2VcIiBzdHlsZT17c3R5bGV9PlxuXHRcdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cImFycm93XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTAgMTBcIj5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTAsMTAgTDUsMCBMMTAsMTBcIiBzdHJva2Utd2lkdGg9XCIwLjJcIi8+XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHR7Z29hbHN9XG5cblx0XHRcdFx0e3Jld2FyZHN9XG5cblx0XHRcdFx0e2FjdGlvbn1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBlbmRHb2FsKGdvYWwpe1xuXHRcdGdvYWwuY2hpbGQ9dGhpcy5wcm9wcy5jaGlsZC5faWRcblx0XHRkYkdvYWwudXBzZXJ0KGdvYWwpXG5cdH1cblxuXHRyZXdhcmQoYW1vdW50KXtcblx0XHRsZXQgbmV3UmV3YXJkPXthbW91bnQsIGNoaWxkOnRoaXMucHJvcHMuY2hpbGQuX2lkfVxuXHRcdGRiUmV3YXJkLnVwc2VydChuZXdSZXdhcmQpXG5cdH1cblxuXHRvblJlYXNvbkNoYW5nZShyZXdhcmQsIG5ld1JlYXNvbil7XG5cdFx0cmV3YXJkLnJlYXNvbj1uZXdSZWFzb25cblx0XHRkYlJld2FyZC51cHNlcnQocmV3YXJkKVxuXHR9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGhlaWdodDoyMFxuXHR9XG59XG5cbmNsYXNzIFBlbmRpbmdHb2FsIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0b25QZW5kR29hbDphPT4xXG5cdH1cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRyZXdhcmQ6XCJcIixcblx0XHRcdHRvdGFsOlwiXCJcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2N1cnJlbnQsIGJvdHRvbX09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWwgcGVuZGluZ1wiIHN0eWxlPXt7Ym90dG9tfX0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHZhbHVlPXtyZXdhcmR8fFwiXCJ9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5zZXRTdGF0ZSh7cmV3YXJkOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJwZW5kaW5nUmV3YXJkXCJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiTmV3IFJld2FyZC4uLlwiXG5cdFx0XHRcdFx0XHRzdHlsZT17e3RleHRBbGlnbjpcInJpZ2h0XCIsd2lkdGg6XCIxMDAlXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mcmFxdW87PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0dHlwZT1cIm51bWJlclwiXG5cdFx0XHRcdFx0XHR2YWx1ZT17dG90YWx8fFwiXCJ9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5zZXRTdGF0ZSh7dG90YWw6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtgR29hbDo+JHtjdXJyZW50fWB9XG5cdFx0XHRcdFx0XHRzdHlsZT17e3dpZHRoOlwiNmVtXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0dHJ5UGVuZChzdGF0ZSl7XG5cdFx0bGV0IHtyZXdhcmQ6bmV3UmV3YXJkLCB0b3RhbDpuZXdUb3RhbH09c3RhdGVcblx0XHRsZXQge2N1cnJlbnQsb25QZW5kR29hbH09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdGlmKG5ld1Jld2FyZClcblx0XHRcdHJld2FyZD1uZXdSZXdhcmRcblx0XHRpZihuZXdUb3RhbClcblx0XHRcdHRvdGFsPW5ld1RvdGFsXG5cdFx0aWYocmV3YXJkLnRyaW0oKSAmJiB0b3RhbC50cmltKCkpe1xuXHRcdFx0dG90YWw9cGFyc2VJbnQodG90YWwudHJpbSgpKVxuXHRcdFx0aWYodG90YWw+Y3VycmVudCl7XG5cdFx0XHRcdHJld2FyZD1yZXdhcmQudHJpbSgpXG5cdFx0XHRcdG9uUGVuZEdvYWwoe3Jld2FyZCx0b3RhbH0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdFVJLk1lc3NhZ2VyLnNob3coYG5ldyBnb2FsIG11c3QgZ3JlYXRlciB0aGFuIGN1cnJlbnQgdG90YWwgJHtjdXJyZW50fWApXG5cdFx0XHRcdFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5nb2FsKS5mb2N1cygpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe3Jld2FyZCx0b3RhbH0pXG5cdH1cbn1cblxuY2xhc3MgQUdvYWwgZXh0ZW5kcyBJdGVte1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3Jld2FyZCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQgc3R5bGU9e2ZvbnRTaXplOlwieC1zbWFsbFwiLCB3aGl0ZVNwYWNlOlwibm93cmFwXCIsYmFja2dyb3VuZENvbG9yOlwibGlnaHRncmVlblwifVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWxcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdj48QXZhdGFyIHN0eWxlPXtzdHlsZX0+e3Jld2FyZH08L0F2YXRhcj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXY+e3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmNsYXNzIEFSZXdhcmQgZXh0ZW5kcyBJdGVte1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtuZXdSZWFzb246bnVsbH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246bnVsbH0pXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRsZXQge3JlYXNvbn09dGhpcy5yZWZzXG5cdFx0cmVhc29uICYmIHJlYXNvbi5mb2N1cygpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3JlYXNvbixhbW91bnQsdG90YWwsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHtuZXdSZWFzb259PXRoaXMuc3RhdGVcblxuXHRcdGlmKG5ld1JlYXNvbil7XG5cdFx0XHRyZWFzb249KDxUZXh0RmllbGQgcmVmPVwicmVhc29uXCIgZGVmYXVsdFZhbHVlPXtuZXdSZWFzb259XG5cdFx0XHRcdG9uRW50ZXJLZXlEb3duPXtlPT5lLnRhcmdldC5ibHVyKCl9XG5cdFx0XHRcdG9uQmx1cj17ZT0+dGhpcy5yZWFzb25DaGFuZ2VkKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9Lz4pXG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpyZWFzb258fFwiIFwifSl9PlxuXHRcdFx0XHR7cmVhc29ufHxcIi4uLlwifVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj4re2Ftb3VudH0ve3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cblxuXHRyZWFzb25DaGFuZ2VkKG5ld1JlYXNvbil7XG5cdFx0bGV0IHtyZWFzb24sIG9uUmVhc29uQ2hhbmdlfT10aGlzLnByb3BzXG5cdFx0aWYoIW5ld1JlYXNvbiB8fCBuZXdSZWFzb249PXJlYXNvbil7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246dW5kZWZpbmVkfSlcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRvblJlYXNvbkNoYW5nZSAmJiBvblJlYXNvbkNoYW5nZShuZXdSZWFzb24pXG5cdH1cbn1cblxuXG5pbXBvcnQgUmV3YXJkSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL3NvY2lhbC9tb29kJ1xuY2xhc3MgUmV3YXJkb3IgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjdXJyZW50OlJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0b25SZXdhcmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRjdXJyZW50OjAsXG5cdFx0b25SZXdhcmQ6IGE9PjFcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e3BsdXM6MCx0aWNrZXI6bnVsbH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzOjAsdGlja2VyOm51bGx9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtwbHVzfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsY3VycmVudH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZCBwZW5kaW5nXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCI+XG5cdFx0XHRcdFx0PFJld2FyZEljb24gY2xhc3NOYW1lPVwicmV3YXJkZXJcIiBvbkNsaWNrPXtlPT50aGlzLnBsdXMoKX0gLz5cblx0XHRcdFx0XHQ8c3Bhbj57Y3VycmVudH08L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgcGx1cyAke3BsdXMgPyBcInBsdXNpbmdcIiA6IFwiXCJ9YH0+K3twbHVzfHwneCd9PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBsdXMoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0cGx1cysrXG5cdFx0dGlja2VyPXNldFRpbWVvdXQodGhpcy5yZXdhcmQuYmluZCh0aGlzKSwxMDAwKVxuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXMsdGlja2VyfSlcblx0fVxuXG5cdHJld2FyZCgpe1xuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcblx0XHR0aWNrZXIgJiYgY2xlYXJUaW1lb3V0KHRpY2tlcilcblx0XHR0aGlzLnByb3BzLm9uUmV3YXJkKHBsdXMpXG5cdH1cbn1cbiJdfQ==