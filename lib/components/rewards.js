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
		return _this;
	}

	_createClass(Rewards, [{
		key: 'onChange',
		value: function onChange() {
			this.forceUpdate();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			_db.Reward.on("change", this.onChange);
			var child = this.props.child;

			Promise.all([_db.Reward.getRewards(child), _db.Reward.getGoals(child)]).then(function (a) {
				var _a = _slicedToArray(a, 2);

				var rewards = _a[0];
				var goals = _a[1];

				_this2.setState({ rewards: rewards, goals: goals });
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_db.Reward.removeListener("change", this.onChange);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this3 = this;

			var newChild = nextProps.child;
			var child = this.props.child;

			if (child != newChild) {
				Promise.all([_db.Reward.getRewards(child), _db.Reward.getGoals(child)]).then(function (a) {
					var _a2 = _slicedToArray(a, 2);

					var rewards = _a2[0];
					var goals = _a2[1];

					_this3.setState({ rewards: rewards, goals: goals });
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state = this.state;
			var goals = _state.goals;
			var rewards = _state.rewards;
			var _props = this.props;
			var height = _props.height;
			var editable = _props.editable;

			var total = 0,
			    max = 0,
			    action = null;
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

			if (editable) action = _qiliApp.React.createElement(PendingGoal, { bottom: (max + 2) * height, current: total, height: height, onPendGoal: function onPendGoal(goal) {
					return _this4.pendGoal(goal);
				} });else action = _qiliApp.React.createElement(Rewardor, { current: total, height: height, onReward: function onReward(amount) {
					return _this4.reward(amount);
				} });

			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards', style: { height: (max + 2) * height } },
				goals,
				rewards,
				action
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
	editable: false,
	height: 20
};
Rewards.propTypes = {
	child: _qiliApp.React.PropTypes.object,
	editable: _qiliApp.React.PropTypes.bool,
	height: _qiliApp.React.PropTypes.number
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
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {}
	}, {
		key: 'render',
		value: function render() {
			var _this7 = this;

			var _props2 = this.props;
			var current = _props2.current;
			var bottom = _props2.bottom;
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
						ref: 'reward',
						defaultValue: reward,
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
			var _props3 = this.props;
			var current = _props3.current;
			var onPendGoal = _props3.onPendGoal;
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
			var _props4 = this.props;
			var reward = _props4.reward;
			var total = _props4.total;
			var height = _props4.height;

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
			var newReason = this.state.newReason;
			var reason = this.refs.reason;

			if (newReason && reason) reason.getDOMNode().focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this10 = this;

			var _props5 = this.props;
			var reason = _props5.reason;
			var amount = _props5.amount;
			var total = _props5.total;
			var height = _props5.height;
			var newReason = this.state.newReason;


			if (newReason) {
				reason = _qiliApp.React.createElement(_materialUi.TextField, { ref: 'reason', defaultValue: reason,
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
			var _props6 = this.props;
			var reason = _props6.reason;
			var onReasonChange = _props6.onReasonChange;

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
			var _props7 = this.props;
			var height = _props7.height;
			var current = _props7.current;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'reward pending' },
				_qiliApp.React.createElement('div', { className: 'icon' }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUE2T0E7Ozs7Ozs7Ozs7OztJQTNPcUI7OztBQVdwQixVQVhvQixPQVdwQixHQUFhO3dCQVhPLFNBV1A7O3FFQVhPLHFCQVlWLFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVc7QUFDVixVQUFNLElBQU47QUFDQSxZQUFRLElBQVI7R0FGRCxDQUZZO0FBTVosUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkLENBTlk7O0VBQWI7O2NBWG9COzs2QkFvQlY7QUFDVCxRQUFLLFdBQUwsR0FEUzs7OztzQ0FJUzs7O0FBQ2xCLGNBQVMsRUFBVCxDQUFZLFFBQVosRUFBc0IsS0FBSyxRQUFMLENBQXRCLENBRGtCO09BRWIsUUFBTyxLQUFLLEtBQUwsQ0FBUCxNQUZhOztBQUdsQixXQUFRLEdBQVIsQ0FBWSxDQUFDLFdBQVMsVUFBVCxDQUFvQixLQUFwQixDQUFELEVBQTZCLFdBQVMsUUFBVCxDQUFrQixLQUFsQixDQUE3QixDQUFaLEVBQ0UsSUFERixDQUNPLGFBQUc7NEJBQ2EsTUFEYjs7UUFDSCxnQkFERztRQUNNLGNBRE47O0FBRVIsV0FBSyxRQUFMLENBQWMsRUFBQyxnQkFBRCxFQUFTLFlBQVQsRUFBZCxFQUZRO0lBQUgsQ0FEUCxDQUhrQjs7Ozt5Q0FVRztBQUNyQixjQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBSyxRQUFMLENBQWxDLENBRHFCOzs7OzRDQUtJLFdBQVU7OztBQUMvQixPQUFPLFdBQVUsVUFBaEIsS0FBRCxDQUQrQjtPQUVqQyxRQUFPLEtBQUssS0FBTCxDQUFQLE1BRmlDOztBQUduQyxPQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNsQixZQUFRLEdBQVIsQ0FBWSxDQUFDLFdBQVMsVUFBVCxDQUFvQixLQUFwQixDQUFELEVBQTZCLFdB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SCIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge1RleHRGaWVsZCwgSWNvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgUGx1c0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tYWRkJ1xuaW1wb3J0IEZvcndhcmRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZm9yd2FyZFwiXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseSwgUmV3YXJkIGFzIGRiUmV3YXJkLCBHb2FsIGFzIGRiR29hbH0gZnJvbSAnLi4vZGInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGVkaXRhYmxlOmZhbHNlLFxuXHRcdGhlaWdodDoyMFxuXHR9XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGNoaWxkOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdGVkaXRhYmxlOlJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGhlaWdodDpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG5cdH1cblx0XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0Z29hbHM6bnVsbCxcblx0XHRcdHJld2FyZHM6bnVsbFxuXHRcdH1cblx0XHR0aGlzLm9uQ2hhbmdlPXRoaXMub25DaGFuZ2UuYmluZCh0aGlzKVxuXHR9XG5cdFxuXHRvbkNoYW5nZSgpe1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKVxuXHR9XG5cdFxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGRiUmV3YXJkLm9uKFwiY2hhbmdlXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0bGV0IHtjaGlsZH09dGhpcy5wcm9wc1xuXHRcdFByb21pc2UuYWxsKFtkYlJld2FyZC5nZXRSZXdhcmRzKGNoaWxkKSwgZGJSZXdhcmQuZ2V0R29hbHMoY2hpbGQpXSlcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0bGV0IFtyZXdhcmRzLCBnb2Fsc109YVxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHRcdH0pXG5cdH1cblx0XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0ZGJSZXdhcmQucmVtb3ZlTGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vbkNoYW5nZSlcblx0fVxuXG5cdFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0bGV0IHtjaGlsZDpuZXdDaGlsZH09bmV4dFByb3BzLFxuXHRcdFx0e2NoaWxkfT10aGlzLnByb3BzXG5cdFx0aWYoY2hpbGQhPW5ld0NoaWxkKXtcblx0XHRcdFByb21pc2UuYWxsKFtkYlJld2FyZC5nZXRSZXdhcmRzKGNoaWxkKSwgZGJSZXdhcmQuZ2V0R29hbHMoY2hpbGQpXSlcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0bGV0IFtyZXdhcmRzLCBnb2Fsc109YVxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cdFxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2dvYWxzLCByZXdhcmRzfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsZWRpdGFibGV9PXRoaXMucHJvcHNcblx0XHRsZXQgdG90YWw9MCwgbWF4PTAsIGFjdGlvbj1udWxsXG5cdFx0Z29hbHM9Z29hbHMgJiYgZ29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH0gXG5cdFx0XHRcdFx0dG90YWw9e21heD1NYXRoLm1heChtYXgsYS50b3RhbCksIGEudG90YWx9Lz4pXG5cdFx0XG5cdFx0cmV3YXJkcz1yZXdhcmRzICYmIHJld2FyZHMubWFwKGE9PjxBUmV3YXJkIFxuXHRcdFx0XHRcdGtleT17YHJld2FyZF8ke3RvdGFsKz1hLmFtb3VudH1gfVxuXHRcdFx0XHRcdG9uUmVhc29uQ2hhbmdlPXtuZXdSZWFzb249PnRoaXMub25SZWFzb25DaGFuZ2UoYSxuZXdSZWFzb24pfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJlYXNvbj17YS5yZWFzb259IFxuXHRcdFx0XHRcdGFtb3VudD17YS5hbW91bnR9IFxuXHRcdFx0XHRcdHRvdGFsPXt0b3RhbH0vPilcblx0XHRcblx0XHRtYXg9TWF0aC5tYXgodG90YWwsbWF4KVxuXHRcdFxuXHRcdGlmKGVkaXRhYmxlKVxuXHRcdFx0YWN0aW9uPSg8UGVuZGluZ0dvYWwgYm90dG9tPXsobWF4KzIpKmhlaWdodH0gY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblBlbmRHb2FsPXtnb2FsPT50aGlzLnBlbmRHb2FsKGdvYWwpfS8+KVxuXHRcdGVsc2Vcblx0XHRcdGFjdGlvbj0oPFJld2FyZG9yIGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25SZXdhcmQ9e2Ftb3VudD0+dGhpcy5yZXdhcmQoYW1vdW50KX0vPilcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRzXCIgc3R5bGU9e3toZWlnaHQ6KG1heCsyKSpoZWlnaHR9fT5cblx0XHRcdFx0e2dvYWxzfVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR7cmV3YXJkc31cblx0XHRcdFx0XG5cdFx0XHRcdHthY3Rpb259XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0XG5cdHBlbmRHb2FsKGdvYWwpe1xuXHRcdGRiUmV3YXJkLmFkZEdvYWwoZ29hbClcblx0fVxuXHRcblx0cmV3YXJkKGFtb3VudCl7XG5cdFx0bGV0IG5ld1Jld2FyZD17YW1vdW50fVxuXHRcdGRiUmV3YXJkLnVwc2VydChuZXdSZXdhcmQpXG5cdH1cblx0XG5cdG9uUmVhc29uQ2hhbmdlKHJld2FyZCwgbmV3UmVhc29uKXtcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxuXHRcdGRiUmV3YXJkLnVwc2VydChyZXdhcmQpXG5cdH1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwXG5cdH1cbn1cblxuY2xhc3MgUGVuZGluZ0dvYWwgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRvblBlbmRHb2FsOmE9PjFcblx0fVxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHJld2FyZDpcIlwiLFxuXHRcdFx0dG90YWw6XCJcIlxuXHRcdH1cblx0fVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdFxuXHR9XG5cdFxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2N1cnJlbnQsIGJvdHRvbX09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWwgcGVuZGluZ1wiIHN0eWxlPXt7Ym90dG9tfX0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHJlZj1cInJld2FyZFwiXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3Jld2FyZH1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInBlbmRpbmdSZXdhcmRcIiBcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiTmV3IFJld2FyZC4uLlwiIFxuXHRcdFx0XHRcdFx0c3R5bGU9e3t0ZXh0QWxpZ246XCJyaWdodFwiLHdpZHRoOlwiMTAwJVwifX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JnJhcXVvOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkJsdXI9e2U9PnRoaXMudHJ5UGVuZCh7dG90YWw6ZS50YXJnZXQudmFsdWV9KX0gXG5cdFx0XHRcdFx0XHRyZWY9XCJnb2FsXCIgXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3RvdGFsfHxcIlwifVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e2BHb2FsOj4ke2N1cnJlbnR9YH1cblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIyLjVlbVwifX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXHRcblx0dHJ5UGVuZChzdGF0ZSl7XG5cdFx0bGV0IHtyZXdhcmQ6bmV3UmV3YXJkLCB0b3RhbDpuZXdUb3RhbH09c3RhdGVcblx0XHRsZXQge2N1cnJlbnQsb25QZW5kR29hbH09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdGlmKG5ld1Jld2FyZClcblx0XHRcdHJld2FyZD1uZXdSZXdhcmRcblx0XHRpZihuZXdUb3RhbClcblx0XHRcdHRvdGFsPW5ld1RvdGFsXG5cdFx0aWYocmV3YXJkLnRyaW0oKSAmJiB0b3RhbC50cmltKCkpe1xuXHRcdFx0dG90YWw9cGFyc2VJbnQodG90YWwudHJpbSgpKVxuXHRcdFx0aWYodG90YWw+Y3VycmVudCl7XG5cdFx0XHRcdHJld2FyZD1yZXdhcmQudHJpbSgpXG5cdFx0XHRcdG9uUGVuZEdvYWwoe3Jld2FyZCx0b3RhbH0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdFVJLk1lc3NhZ2VyLnNob3coYG5ldyBnb2FsIG11c3QgZ3JlYXRlciB0aGFuIGN1cnJlbnQgdG90YWwgJHtjdXJyZW50fWApXG5cdFx0XHRcdHRoaXMucmVmcy5nb2FsLmdldERPTU5vZGUoKS5mb2N1cygpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe3Jld2FyZCx0b3RhbH0pXG5cdH1cbn1cblxuY2xhc3MgQUdvYWwgZXh0ZW5kcyBJdGVte1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3Jld2FyZCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXY+e3Jld2FyZH08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXY+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgQVJld2FyZCBleHRlbmRzIEl0ZW17XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e25ld1JlYXNvbjpudWxsfVxuXHR9XG5cdFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOm51bGx9KVxuXHR9XG5cdFxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRsZXQge25ld1JlYXNvbn09dGhpcy5zdGF0ZVxuXHRcdGxldCB7cmVhc29ufT10aGlzLnJlZnNcblx0XHRpZihuZXdSZWFzb24gJiYgcmVhc29uKVxuXHRcdFx0cmVhc29uLmdldERPTU5vZGUoKS5mb2N1cygpXG5cdH1cblx0XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmVhc29uLGFtb3VudCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQge25ld1JlYXNvbn09dGhpcy5zdGF0ZVxuXG5cdFx0aWYobmV3UmVhc29uKXtcblx0XHRcdHJlYXNvbj0oPFRleHRGaWVsZCByZWY9XCJyZWFzb25cIiBkZWZhdWx0VmFsdWU9e3JlYXNvbn1cblx0XHRcdFx0b25FbnRlcktleURvd249e2U9PmUudGFyZ2V0LmJsdXIoKX1cblx0XHRcdFx0b25CbHVyPXtlPT50aGlzLnJlYXNvbkNoYW5nZWQoZS50YXJnZXQudmFsdWUudHJpbSgpKX0vPilcdFxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCIgb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnJlYXNvbnx8XCIgXCJ9KX0+XG5cdFx0XHRcdHtuZXdSZWFzb258fHJlYXNvbnx8XCIuLi5cIn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXY+K3thbW91bnR9L3t0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG5cdFxuXHRyZWFzb25DaGFuZ2VkKG5ld1JlYXNvbil7XG5cdFx0bGV0IHtyZWFzb24sIG9uUmVhc29uQ2hhbmdlfT10aGlzLnByb3BzXG5cdFx0aWYoIW5ld1JlYXNvbiB8fCBuZXdSZWFzb249PXJlYXNvbil7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246dW5kZWZpbmVkfSlcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0XG5cdFx0b25SZWFzb25DaGFuZ2UgJiYgb25SZWFzb25DaGFuZ2UobmV3UmVhc29uKVxuXHR9XG59XG5cblxuaW1wb3J0IFJld2FyZEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9zb2NpYWwvbW9vZCdcbmNsYXNzIFJld2FyZG9yIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y3VycmVudDpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9uUmV3YXJkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0Y3VycmVudDowLFxuXHRcdG9uUmV3YXJkOiBhPT4xXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtwbHVzOjAsdGlja2VyOm51bGx9XG5cdH1cblx0XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzOjAsdGlja2VyOm51bGx9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtwbHVzfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsY3VycmVudH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZCBwZW5kaW5nXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiPlxuXHRcdFx0XHRcdDxSZXdhcmRJY29uIGNsYXNzTmFtZT1cInJld2FyZGVyXCIgb25DbGljaz17ZT0+dGhpcy5wbHVzKCl9IC8+XG5cdFx0XHRcdFx0PHNwYW4+e2N1cnJlbnR9PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6XCIxMHB0XCJ9fT4re3BsdXN8fCd4J308L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdFxuXHRwbHVzKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHBsdXMrK1xuXHRcdHRpY2tlcj1zZXRUaW1lb3V0KHRoaXMucmV3YXJkLmJpbmQodGhpcyksMTAwMClcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzLHRpY2tlcn0pXG5cdH1cblxuXHRyZXdhcmQoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0dGhpcy5wcm9wcy5vblJld2FyZChwbHVzKVxuXHR9XG59XG4iXX0=