'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Rewards).apply(this, arguments));
	}

	_createClass(Rewards, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.forceUpdate();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var goals = _props.goals;
			var rewards = _props.rewards;
			var height = _props.height;

			var total = 0,
			    max = 0;
			goals = goals.map(function (a) {
				return _qiliApp.React.createElement(AGoal, {
					key: 'goal_' + a.total,
					height: height,
					reward: a.reward,
					total: (max = Math.max(max, a.total), a.total) });
			});

			rewards = rewards.map(function (a) {
				return _qiliApp.React.createElement(AReward, {
					key: 'reward_' + (total += a.amount),
					onReasonChange: function onReasonChange(newReason) {
						return _this2.onReasonChange(a, newReason);
					},
					height: height,
					reason: a.reason,
					amount: a.amount,
					total: total });
			});

			max = Math.max(total, max);

			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards', style: { height: max * 20 + 40 } },
				goals,
				rewards,
				_qiliApp.React.createElement(Rewardor, { current: total, height: height, onReward: function onReward(amount) {
						return _this2.reward(amount);
					} }),
				_qiliApp.React.createElement(PendingGoal, { current: total, height: height, onPendGoal: function onPendGoal(goal) {
						return _this2.pendGoal(goal);
					} })
			);
		}
	}, {
		key: 'pendGoal',
		value: function pendGoal(goal) {
			_db.Reward.addGoal(goal);
		}
	}, {
		key: 'reward',
		value: function reward(amount) {
			var newReward = { amount: amount };
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
	height: 20,
	goals: [{ total: 5, reward: "hug" }, { total: 10, reward: "pencil" }, { total: 20, reward: "pencil sharpener" }],
	rewards: [{ amount: 1, reason: "smile" }, { amount: 5, reason: "reading" }, { amount: 10, reason: "english speaking" }]
};
Rewards.propTypes = {
	goals: _qiliApp.React.PropTypes.array,
	rewards: _qiliApp.React.PropTypes.array
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

		var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(PendingGoal).apply(this, arguments));

		_this4.state = {
			reward: "",
			total: ""
		};
		return _this4;
	}

	_createClass(PendingGoal, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var current = this.props.current;
			var _state = this.state;
			var reward = _state.reward;
			var total = _state.total;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'goal pending' },
				_qiliApp.React.createElement(
					'div',
					null,
					_qiliApp.React.createElement('input', { onBlur: function onBlur(e) {
							return _this5.tryPend({ reward: e.target.value });
						},
						ref: 'reward',
						defaultValue: reward,
						className: 'pendingReward',
						placeholder: 'New Reward...',
						style: { textAlign: "right" } })
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
							return _this5.tryPend({ total: e.target.value });
						},
						ref: 'goal',
						defaultValue: total || "",
						placeholder: 'Goal:>' + current,
						style: { width: "2.5em" } })
				)
			);
		}
	}, {
		key: 'tryPend',
		value: function tryPend(state) {
			var newReward = state.reward;
			var newTotal = state.total;
			var _props2 = this.props;
			var current = _props2.current;
			var onPendGoal = _props2.onPendGoal;
			var _state2 = this.state;
			var reward = _state2.reward;
			var total = _state2.total;

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
					this.refs.goal.getDOMNode().focus();
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
			var _props3 = this.props;
			var reward = _props3.reward;
			var total = _props3.total;
			var height = _props3.height;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'goal', style: { bottom: height * total } },
				_qiliApp.React.createElement(
					'div',
					null,
					reward
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'icon' },
					'•'
				),
				_qiliApp.React.createElement('div', null)
			);
		}
	}]);

	return AGoal;
}(Item);

var AReward = function (_Item3) {
	_inherits(AReward, _Item3);

	function AReward() {
		_classCallCheck(this, AReward);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(AReward).apply(this, arguments));

		_this7.state = { newReason: null };
		return _this7;
	}

	_createClass(AReward, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ newReason: null });
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var newReason = this.state.newReason;
			var reason = this.refs.reason;

			if (newReason && reason) reason.getDOMNode().focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this8 = this;

			var _props4 = this.props;
			var reason = _props4.reason;
			var amount = _props4.amount;
			var total = _props4.total;
			var height = _props4.height;
			var newReason = this.state.newReason;


			if (newReason) {
				reason = _qiliApp.React.createElement(_materialUi.TextField, { ref: 'reason', defaultValue: reason,
					onEnterKeyDown: function onEnterKeyDown(e) {
						return e.target.blur();
					},
					onBlur: function onBlur(e) {
						return _this8.reasonChanged(e.target.value.trim());
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
							return _this8.setState({ newReason: reason || " " });
						} },
					newReason || reason || "..."
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
			var _props5 = this.props;
			var reason = _props5.reason;
			var onReasonChange = _props5.onReasonChange;

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

		var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewardor).apply(this, arguments));

		_this9.state = { plus: 0, ticker: null };
		return _this9;
	}

	_createClass(Rewardor, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ plus: 0, ticker: null });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this10 = this;

			var plus = this.state.plus;
			var _props6 = this.props;
			var height = _props6.height;
			var current = _props6.current;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'reward pending' },
				_qiliApp.React.createElement('div', { className: 'icon' }),
				_qiliApp.React.createElement(
					'div',
					{ className: 'reason' },
					_qiliApp.React.createElement(_mood2.default, { style: { width: 50, height: 50 }, color: "green", onClick: function onClick(e) {
							return _this10.plus();
						} }),
					_qiliApp.React.createElement(
						'span',
						null,
						current
					),
					_qiliApp.React.createElement(
						'span',
						{ style: { fontSize: "10pt" } },
						'+',
						plus || 'x'
					)
				)
			);
		}
	}, {
		key: 'plus',
		value: function plus() {
			var _state3 = this.state;
			var plus = _state3.plus;
			var ticker = _state3.ticker;

			ticker && clearTimeout(ticker);
			plus++;
			ticker = setTimeout(this.reward.bind(this), 1000);
			this.setState({ plus: plus, ticker: ticker });
		}
	}, {
		key: 'reward',
		value: function reward() {
			var _state4 = this.state;
			var plus = _state4.plus;
			var ticker = _state4.ticker;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBcU1BOzs7Ozs7Ozs7Ozs7SUFuTXFCOzs7Ozs7Ozs7Ozs4Q0FXTztBQUMxQixRQUFLLFdBQUwsR0FEMEI7Ozs7MkJBSW5COzs7Z0JBQ3FCLEtBQUssS0FBTCxDQURyQjtPQUNGLHFCQURFO09BQ0sseUJBREw7T0FDYSx1QkFEYjs7QUFFUCxPQUFJLFFBQU0sQ0FBTjtPQUFTLE1BQUksQ0FBSixDQUZOO0FBR1AsV0FBTSxNQUFNLEdBQU4sQ0FBVTtXQUFHLDZCQUFDLEtBQUQ7QUFDaEIsb0JBQWEsRUFBRSxLQUFGO0FBQ2IsYUFBUSxNQUFSO0FBQ0EsYUFBUSxFQUFFLE1BQUY7QUFDUixhQUFPLE1BQUksS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFhLEVBQUUsS0FBRixDQUFqQixFQUEyQixFQUFFLEtBQUYsQ0FBbEMsRUFKZ0I7SUFBSCxDQUFoQixDQUhPOztBQVNQLGFBQVEsUUFBUSxHQUFSLENBQVk7V0FBRyw2QkFBQyxPQUFEO0FBQ3BCLHVCQUFlLFNBQU8sRUFBRSxNQUFGLENBQXRCO0FBQ0EscUJBQWdCO2FBQVcsT0FBSyxjQUFMLENBQW9CLENBQXBCLEVBQXNCLFNBQXRCO01BQVg7QUFDaEIsYUFBUSxNQUFSO0FBQ0EsYUFBUSxFQUFFLE1BQUY7QUFDUixhQUFRLEVBQUUsTUFBRjtBQUNSLFlBQU8sS0FBUCxFQU5vQjtJQUFILENBQXBCLENBVE87O0FBaUJQLFNBQUksS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFlLEdBQWYsQ0FBSixDQWpCTzs7QUFtQlAsVUFDQzs7TUFBSyxXQUFVLFNBQVYsRUFBb0IsT0FBTyxFQUFDLFFBQU8sTUFBSSxFQUFKLEdBQU8sRUFBUCxFQUFmLEVBQXpCO0lBQ0UsS0FERjtJQUdFLE9BSEY7SUFLQyw2QkFBQyxRQUFELElBQVUsU0FBUyxLQUFU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TSxTQUFOLENBQWdCLE1BQWhCO0FBQ1IsV0FBVSxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7O0FBSE4sU0FNRSxlQUFhO0FBQ25CLFVBQVEsQ0FBUjtBQUNBLFdBQVU7U0FBRztFQUFIIiwiZmlsZSI6InJld2FyZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBVSX0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBJY29uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBQbHVzSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1hZGQnXG5pbXBvcnQgRm9yd2FyZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1mb3J3YXJkXCJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5LCBSZXdhcmQgYXMgZGJSZXdhcmQsIEdvYWwgYXMgZGJHb2FsfSBmcm9tICcuLi9kYidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwLFxuXHRcdGdvYWxzOlt7dG90YWw6NSwgcmV3YXJkOlwiaHVnXCJ9LHt0b3RhbDoxMCwgcmV3YXJkOlwicGVuY2lsXCJ9LCB7dG90YWw6MjAsIHJld2FyZDpcInBlbmNpbCBzaGFycGVuZXJcIn1dLFxuXHRcdHJld2FyZHM6W3thbW91bnQ6MSwgcmVhc29uOlwic21pbGVcIn0sIHthbW91bnQ6NSwgcmVhc29uOlwicmVhZGluZ1wifSwge2Ftb3VudDoxMCxyZWFzb246XCJlbmdsaXNoIHNwZWFraW5nXCJ9XVxuXHR9XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGdvYWxzOlJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0XHRyZXdhcmRzOlJlYWN0LlByb3BUeXBlcy5hcnJheVxuXHR9XG5cdFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpXG5cdH1cblx0XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7Z29hbHMsIHJld2FyZHMsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHRvdGFsPTAsIG1heD0wXG5cdFx0Z29hbHM9Z29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH0gXG5cdFx0XHRcdFx0dG90YWw9e21heD1NYXRoLm1heChtYXgsYS50b3RhbCksIGEudG90YWx9Lz4pXG5cdFx0XG5cdFx0cmV3YXJkcz1yZXdhcmRzLm1hcChhPT48QVJld2FyZCBcblx0XHRcdFx0XHRrZXk9e2ByZXdhcmRfJHt0b3RhbCs9YS5hbW91bnR9YH1cblx0XHRcdFx0XHRvblJlYXNvbkNoYW5nZT17bmV3UmVhc29uPT50aGlzLm9uUmVhc29uQ2hhbmdlKGEsbmV3UmVhc29uKX1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHRyZWFzb249e2EucmVhc29ufSBcblx0XHRcdFx0XHRhbW91bnQ9e2EuYW1vdW50fSBcblx0XHRcdFx0XHR0b3RhbD17dG90YWx9Lz4pXG5cdFx0XG5cdFx0bWF4PU1hdGgubWF4KHRvdGFsLG1heClcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRzXCIgc3R5bGU9e3toZWlnaHQ6bWF4KjIwKzQwfX0+XG5cdFx0XHRcdHtnb2Fsc31cblx0XHRcdFx0XHRcblx0XHRcdFx0e3Jld2FyZHN9XG5cdFx0XHRcdFxuXHRcdFx0XHQ8UmV3YXJkb3IgY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblJld2FyZD17YW1vdW50PT50aGlzLnJld2FyZChhbW91bnQpfS8+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8UGVuZGluZ0dvYWwgY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblBlbmRHb2FsPXtnb2FsPT50aGlzLnBlbmRHb2FsKGdvYWwpfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0XG5cdHBlbmRHb2FsKGdvYWwpe1xuXHRcdGRiUmV3YXJkLmFkZEdvYWwoZ29hbClcblx0fVxuXHRcblx0cmV3YXJkKGFtb3VudCl7XG5cdFx0bGV0IG5ld1Jld2FyZD17YW1vdW50fVxuXHRcdGRiUmV3YXJkLnVwc2VydChuZXdSZXdhcmQpXG5cdH1cblx0XG5cdG9uUmVhc29uQ2hhbmdlKHJld2FyZCwgbmV3UmVhc29uKXtcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxuXHRcdGRiUmV3YXJkLnVwc2VydChyZXdhcmQpXG5cdH1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwXG5cdH1cbn1cblxuY2xhc3MgUGVuZGluZ0dvYWwgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRvblBlbmRHb2FsOmE9PjFcblx0fVxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHJld2FyZDpcIlwiLFxuXHRcdFx0dG90YWw6XCJcIlxuXHRcdH1cblx0fVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdFxuXHR9XG5cdFxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2N1cnJlbnR9PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsIHBlbmRpbmdcIj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3Jld2FyZDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0cmVmPVwicmV3YXJkXCJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17cmV3YXJkfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwicGVuZGluZ1Jld2FyZFwiIFxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJOZXcgUmV3YXJkLi4uXCIgXG5cdFx0XHRcdFx0XHRzdHlsZT17e3RleHRBbGlnbjpcInJpZ2h0XCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mcmFxdW87PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfSBcblx0XHRcdFx0XHRcdHJlZj1cImdvYWxcIiBcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dG90YWx8fFwiXCJ9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17YEdvYWw6PiR7Y3VycmVudH1gfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjIuNWVtXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdFxuXHR0cnlQZW5kKHN0YXRlKXtcblx0XHRsZXQge3Jld2FyZDpuZXdSZXdhcmQsIHRvdGFsOm5ld1RvdGFsfT1zdGF0ZVxuXHRcdGxldCB7Y3VycmVudCxvblBlbmRHb2FsfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyZXdhcmQsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0aWYobmV3UmV3YXJkKVxuXHRcdFx0cmV3YXJkPW5ld1Jld2FyZFxuXHRcdGlmKG5ld1RvdGFsKVxuXHRcdFx0dG90YWw9bmV3VG90YWxcblx0XHRpZihyZXdhcmQudHJpbSgpICYmIHRvdGFsLnRyaW0oKSl7XG5cdFx0XHR0b3RhbD1wYXJzZUludCh0b3RhbC50cmltKCkpXG5cdFx0XHRpZih0b3RhbD5jdXJyZW50KXtcblx0XHRcdFx0cmV3YXJkPXJld2FyZC50cmltKClcblx0XHRcdFx0b25QZW5kR29hbCh7cmV3YXJkLHRvdGFsfSlcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0VUkuTWVzc2FnZXIuc2hvdyhgbmV3IGdvYWwgbXVzdCBncmVhdGVyIHRoYW4gY3VycmVudCB0b3RhbCAke2N1cnJlbnR9YClcblx0XHRcdFx0dGhpcy5yZWZzLmdvYWwuZ2V0RE9NTm9kZSgpLmZvY3VzKClcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkLHRvdGFsfSlcblx0fVxufVxuXG5jbGFzcyBBR29hbCBleHRlbmRzIEl0ZW17XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmV3YXJkLHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWxcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdj57cmV3YXJkfTwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBBUmV3YXJkIGV4dGVuZHMgSXRlbXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17bmV3UmVhc29uOm51bGx9XG5cdH1cblx0XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246bnVsbH0pXG5cdH1cblx0XG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGxldCB7bmV3UmVhc29ufT10aGlzLnN0YXRlXG5cdFx0bGV0IHtyZWFzb259PXRoaXMucmVmc1xuXHRcdGlmKG5ld1JlYXNvbiAmJiByZWFzb24pXG5cdFx0XHRyZWFzb24uZ2V0RE9NTm9kZSgpLmZvY3VzKClcblx0fVxuXHRcblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZWFzb24sYW1vdW50LHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCB7bmV3UmVhc29ufT10aGlzLnN0YXRlXG5cblx0XHRpZihuZXdSZWFzb24pe1xuXHRcdFx0cmVhc29uPSg8VGV4dEZpZWxkIHJlZj1cInJlYXNvblwiIGRlZmF1bHRWYWx1ZT17cmVhc29ufVxuXHRcdFx0XHRvbkVudGVyS2V5RG93bj17ZT0+ZS50YXJnZXQuYmx1cigpfVxuXHRcdFx0XHRvbkJsdXI9e2U9PnRoaXMucmVhc29uQ2hhbmdlZChlLnRhcmdldC52YWx1ZS50cmltKCkpfS8+KVx0XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWFzb25cIiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHtuZXdSZWFzb246cmVhc29ufHxcIiBcIn0pfT5cblx0XHRcdFx0e25ld1JlYXNvbnx8cmVhc29ufHxcIi4uLlwifVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj4re2Ftb3VudH0ve3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cblx0XG5cdHJlYXNvbkNoYW5nZWQobmV3UmVhc29uKXtcblx0XHRsZXQge3JlYXNvbiwgb25SZWFzb25DaGFuZ2V9PXRoaXMucHJvcHNcblx0XHRpZighbmV3UmVhc29uIHx8IG5ld1JlYXNvbj09cmVhc29uKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjp1bmRlZmluZWR9KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHRvblJlYXNvbkNoYW5nZSAmJiBvblJlYXNvbkNoYW5nZShuZXdSZWFzb24pXG5cdH1cbn1cblxuXG5pbXBvcnQgUmV3YXJkSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL3NvY2lhbC9tb29kJ1xuY2xhc3MgUmV3YXJkb3IgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjdXJyZW50OlJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0b25SZXdhcmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRjdXJyZW50OjAsXG5cdFx0b25SZXdhcmQ6IGE9PjFcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e3BsdXM6MCx0aWNrZXI6bnVsbH1cblx0fVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXM6MCx0aWNrZXI6bnVsbH0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3BsdXN9PXRoaXMuc3RhdGVcblx0XHRsZXQge2hlaWdodCxjdXJyZW50fT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkIHBlbmRpbmdcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCI+XG5cdFx0XHRcdFx0PFJld2FyZEljb24gc3R5bGU9e3t3aWR0aDo1MCxoZWlnaHQ6NTB9fSBjb2xvcj17XCJncmVlblwifSBvbkNsaWNrPXtlPT50aGlzLnBsdXMoKX0gLz5cblx0XHRcdFx0XHQ8c3Bhbj57Y3VycmVudH08L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3tmb250U2l6ZTpcIjEwcHRcIn19Pit7cGx1c3x8J3gnfTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdFxuXHRwbHVzKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHBsdXMrK1xuXHRcdHRpY2tlcj1zZXRUaW1lb3V0KHRoaXMucmV3YXJkLmJpbmQodGhpcyksMTAwMClcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzLHRpY2tlcn0pXG5cdH1cblxuXHRyZXdhcmQoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0dGhpcy5wcm9wcy5vblJld2FyZChwbHVzKVxuXHR9XG59XG4iXX0=