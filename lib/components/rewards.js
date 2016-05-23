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
		key: 'componentDidMount',
		value: function componentDidMount() {
			_db.Reward.on("upserted", this.onChange);
			_db.Goal.on("upserted", this.onChange);
			this.onChange({ child: this.props.child._id });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_db.Reward.removeListener("upserted", this.onChange);
			_db.Goal.removeListener("upserted", this.onChange);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var newChild = nextProps.child;
			var child = this.props.child;


			if (child != newChild) this.onChange({ child: newChild._id });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state = this.state;
			var goals = _state.goals;
			var rewards = _state.rewards;
			var _props = this.props;
			var height = _props.height;
			var editable = _props.editable;
			var _props$style = _props.style;
			var style = _props$style === undefined ? {} : _props$style;

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
						return _this3.onReasonChange(a, newReason);
					},
					height: height,
					reason: a.reason,
					amount: a.amount,
					total: total });
			});

			max = Math.max(total, max);

			if (editable) action = _qiliApp.React.createElement(PendingGoal, { bottom: (max + buf) * height, current: total, height: height, onPendGoal: function onPendGoal(goal) {
					return _this3.pendGoal(goal);
				} });else action = _qiliApp.React.createElement(Rewardor, { current: total, height: height, onReward: function onReward(amount) {
					return _this3.reward(amount);
				} });

			style.height = (max + buf) * height;
			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards', style: style },
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

		var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(PendingGoal).apply(this, arguments));

		_this5.state = {
			reward: "",
			total: ""
		};
		return _this5;
	}

	_createClass(PendingGoal, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({
				reward: "",
				total: ""
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

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
							return _this6.tryPend({ reward: e.target.value });
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
							return _this6.tryPend({ total: e.target.value });
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

		var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(AReward).apply(this, arguments));

		_this8.state = { newReason: null };
		return _this8;
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
			var _this9 = this;

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
						return _this9.reasonChanged(e.target.value.trim());
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
							return _this9.setState({ newReason: reason || " " });
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

		var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewardor).apply(this, arguments));

		_this10.state = { plus: 0, ticker: null };
		return _this10;
	}

	_createClass(Rewardor, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ plus: 0, ticker: null });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this11 = this;

			var plus = this.state.plus;
			var _props7 = this.props;
			var height = _props7.height;
			var current = _props7.current;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'reward pending' },
				_qiliApp.React.createElement(
					'div',
					{ className: 'reason' },
					_qiliApp.React.createElement(_mood2.default, { className: 'rewarder', onClick: function onClick(e) {
							return _this11.plus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFvUEE7Ozs7Ozs7Ozs7OztJQWxQcUI7OztBQVdwQixVQVhvQixPQVdwQixHQUFhO3dCQVhPLFNBV1A7O3FFQVhPLHFCQVlWLFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVc7QUFDVixVQUFNLElBQU47QUFDQSxZQUFRLElBQVI7R0FGRCxDQUZZO0FBTVosUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkLENBTlk7O0VBQWI7O2NBWG9COzsyQkFvQlgsV0FBVTs7O0FBQ2xCLGVBQVUsRUFBQyxPQUFNLFVBQVUsS0FBVixFQUFqQixDQURrQjs7QUFHbEIsV0FBUSxHQUFSLENBQVksQ0FDWCxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBUyxNQUFUO1dBQWtCLFdBQVMsSUFBVCxDQUFjLFNBQWQsRUFBeUIsS0FBekIsQ0FBK0IsT0FBL0IsRUFBdUMsTUFBdkM7SUFBbEIsQ0FERCxFQUVYLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0IsU0FBTyxJQUFQLENBQVksU0FBWixFQUF1QixLQUF2QixDQUE2QixPQUE3QixFQUFxQyxNQUFyQztJQUFsQixDQUZELENBQVosRUFHRyxJQUhILENBR1EsYUFBRzs0QkFDVyxNQURYOztRQUNMLGdCQURLO1FBQ0ksY0FESjs7QUFFVixXQUFLLFFBQUwsQ0FBYyxFQUFDLGdCQUFELEVBQVMsWUFBVCxFQUFkLEVBRlU7SUFBSCxDQUhSLENBSGtCOzs7O3NDQVlBO0FBQ2xCLGNBQVMsRUFBVCxDQUFZLFVBQVosRUFBd0IsS0FBSyxRQUFMLENBQXhCLENBRGtCO0FBRWxCLFlBQU8sRUFBUCxDQUFVLFVBQVYsRUFBc0IsS0FBSyxRQUFMLENBQXRCLENBRmtCO0FBR2xCLFFBQUssUUFBTCxDQUFjLEVB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SE87Ozs7eUJBY0Y7aUJBQ2EsS0FBSyxLQUFMLENBRGI7T0FDQSxvQkFEQTtPQUNLLHdCQURMOztBQUVMLGFBQVUsYUFBYSxNQUFiLENBQVYsQ0FGSztBQUdMLFVBSEs7QUFJTCxZQUFPLFdBQVcsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFYLEVBQWtDLElBQWxDLENBQVAsQ0FKSztBQUtMLFFBQUssUUFBTCxDQUFjLEVBQUMsVUFBRCxFQUFNLGNBQU4sRUFBZCxFQUxLOzs7OzJCQVFFO2lCQUNXLEtBQUssS0FBTCxDQURYO09BQ0Ysb0JBREU7T0FDRyx3QkFESDs7QUFFUCxhQUFVLGFBQWEsTUFBYixDQUFWLENBRk87QUFHUCxRQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLElBQXBCLEVBSE87Ozs7UUExQ0g7RUFBaUI7O0FBQWpCLFNBQ0UsWUFBVTtBQUNoQixVQUFRLGVBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNSLFdBQVUsZUFBTSxTQUFOLENBQWdCLElBQWhCOztBQUhOLFNBTUUsZUFBYTtBQUNuQixVQUFRLENBQVI7QUFDQSxXQUFVO1NBQUc7RUFBSCIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge1RleHRGaWVsZCwgSWNvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBQbHVzSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1hZGQnXG5pbXBvcnQgRm9yd2FyZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1mb3J3YXJkXCJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5LCBSZXdhcmQgYXMgZGJSZXdhcmQsIEdvYWwgYXMgZGJHb2FsfSBmcm9tICcuLi9kYidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0ZWRpdGFibGU6ZmFsc2UsXG5cdFx0aGVpZ2h0OjIwXG5cdH1cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y2hpbGQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0ZWRpdGFibGU6UmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0aGVpZ2h0OlJlYWN0LlByb3BUeXBlcy5udW1iZXJcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0Z29hbHM6bnVsbCxcblx0XHRcdHJld2FyZHM6bnVsbFxuXHRcdH1cblx0XHR0aGlzLm9uQ2hhbmdlPXRoaXMub25DaGFuZ2UuYmluZCh0aGlzKVxuXHR9XG5cblx0b25DaGFuZ2UoY29uZGl0aW9uKXtcblx0XHRjb25kaXRpb249e2NoaWxkOmNvbmRpdGlvbi5jaGlsZH1cblx0XHRcblx0XHRQcm9taXNlLmFsbChbIFxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJSZXdhcmQuZmluZChjb25kaXRpb24pLmZldGNoKHJlc29sdmUscmVqZWN0KSksIFxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJHb2FsLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXG5cdFx0XSkudGhlbihhPT57XG5cdFx0XHRsZXQgW3Jld2FyZHMsIGdvYWxzXT1hXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHR9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRkYlJld2FyZC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0ZGJHb2FsLm9uKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDp0aGlzLnByb3BzLmNoaWxkLl9pZH0pXG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdGRiUmV3YXJkLnJlbW92ZUxpc3RlbmVyKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHRkYkdvYWwucmVtb3ZlTGlzdGVuZXIoXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHR9XG5cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0bGV0IHtjaGlsZDpuZXdDaGlsZH09bmV4dFByb3BzLFxuXHRcdFx0e2NoaWxkfT10aGlzLnByb3BzXG5cdFx0XHRcblx0XHRpZihjaGlsZCE9bmV3Q2hpbGQpXG5cdFx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDpuZXdDaGlsZC5faWR9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtnb2FscywgcmV3YXJkc309dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGVkaXRhYmxlLCBzdHlsZT17fX09dGhpcy5wcm9wc1xuXHRcdGxldCB0b3RhbD0wLCBtYXg9MCwgYWN0aW9uPW51bGwsIGJ1Zj03XG5cdFx0Z29hbHM9Z29hbHMgJiYgZ29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH1cblx0XHRcdFx0XHR0b3RhbD17bWF4PU1hdGgubWF4KG1heCxhLnRvdGFsKSwgYS50b3RhbH0vPilcblxuXHRcdHJld2FyZHM9cmV3YXJkcyAmJiByZXdhcmRzLm1hcChhPT48QVJld2FyZFxuXHRcdFx0XHRcdGtleT17YHJld2FyZF8ke3RvdGFsKz1hLmFtb3VudH1gfVxuXHRcdFx0XHRcdG9uUmVhc29uQ2hhbmdlPXtuZXdSZWFzb249PnRoaXMub25SZWFzb25DaGFuZ2UoYSxuZXdSZWFzb24pfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJlYXNvbj17YS5yZWFzb259XG5cdFx0XHRcdFx0YW1vdW50PXthLmFtb3VudH1cblx0XHRcdFx0XHR0b3RhbD17dG90YWx9Lz4pXG5cblx0XHRtYXg9TWF0aC5tYXgodG90YWwsbWF4KVxuXG5cdFx0aWYoZWRpdGFibGUpXG5cdFx0XHRhY3Rpb249KDxQZW5kaW5nR29hbCBib3R0b209eyhtYXgrYnVmKSpoZWlnaHR9IGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25QZW5kR29hbD17Z29hbD0+dGhpcy5wZW5kR29hbChnb2FsKX0vPilcblx0XHRlbHNlXG5cdFx0XHRhY3Rpb249KDxSZXdhcmRvciBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUmV3YXJkPXthbW91bnQ9PnRoaXMucmV3YXJkKGFtb3VudCl9Lz4pXG5cblx0XHRzdHlsZS5oZWlnaHQ9KG1heCtidWYpKmhlaWdodFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZHNcIiBzdHlsZT17c3R5bGV9PlxuXHRcdFx0XHR7Z29hbHN9XG5cblx0XHRcdFx0e3Jld2FyZHN9XG5cblx0XHRcdFx0e2FjdGlvbn1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBlbmRHb2FsKGdvYWwpe1xuXHRcdGdvYWwuY2hpbGQ9dGhpcy5wcm9wcy5jaGlsZC5faWRcblx0XHRkYkdvYWwudXBzZXJ0KGdvYWwpXG5cdH1cblxuXHRyZXdhcmQoYW1vdW50KXtcblx0XHRsZXQgbmV3UmV3YXJkPXthbW91bnQsIGNoaWxkOnRoaXMucHJvcHMuY2hpbGQuX2lkfVxuXHRcdGRiUmV3YXJkLnVwc2VydChuZXdSZXdhcmQpXG5cdH1cblxuXHRvblJlYXNvbkNoYW5nZShyZXdhcmQsIG5ld1JlYXNvbil7XG5cdFx0cmV3YXJkLnJlYXNvbj1uZXdSZWFzb25cblx0XHRkYlJld2FyZC51cHNlcnQocmV3YXJkKVxuXHR9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGhlaWdodDoyMFxuXHR9XG59XG5cbmNsYXNzIFBlbmRpbmdHb2FsIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0b25QZW5kR29hbDphPT4xXG5cdH1cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRyZXdhcmQ6XCJcIixcblx0XHRcdHRvdGFsOlwiXCJcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRyZXdhcmQ6XCJcIixcblx0XHRcdHRvdGFsOlwiXCJcblx0XHR9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtjdXJyZW50LCBib3R0b219PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsIHBlbmRpbmdcIiBzdHlsZT17e2JvdHRvbX19PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkJsdXI9e2U9PnRoaXMudHJ5UGVuZCh7cmV3YXJkOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRyZWY9XCJyZXdhcmRcIlxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtyZXdhcmR9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJwZW5kaW5nUmV3YXJkXCJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiTmV3IFJld2FyZC4uLlwiXG5cdFx0XHRcdFx0XHRzdHlsZT17e3RleHRBbGlnbjpcInJpZ2h0XCIsd2lkdGg6XCIxMDAlXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mcmFxdW87PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0cmVmPVwiZ29hbFwiXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3RvdGFsfHxcIlwifVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e2BHb2FsOj4ke2N1cnJlbnR9YH1cblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIyLjVlbVwifX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHRyeVBlbmQoc3RhdGUpe1xuXHRcdGxldCB7cmV3YXJkOm5ld1Jld2FyZCwgdG90YWw6bmV3VG90YWx9PXN0YXRlXG5cdFx0bGV0IHtjdXJyZW50LG9uUGVuZEdvYWx9PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRpZihuZXdSZXdhcmQpXG5cdFx0XHRyZXdhcmQ9bmV3UmV3YXJkXG5cdFx0aWYobmV3VG90YWwpXG5cdFx0XHR0b3RhbD1uZXdUb3RhbFxuXHRcdGlmKHJld2FyZC50cmltKCkgJiYgdG90YWwudHJpbSgpKXtcblx0XHRcdHRvdGFsPXBhcnNlSW50KHRvdGFsLnRyaW0oKSlcblx0XHRcdGlmKHRvdGFsPmN1cnJlbnQpe1xuXHRcdFx0XHRyZXdhcmQ9cmV3YXJkLnRyaW0oKVxuXHRcdFx0XHRvblBlbmRHb2FsKHtyZXdhcmQsdG90YWx9KVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRVSS5NZXNzYWdlci5zaG93KGBuZXcgZ29hbCBtdXN0IGdyZWF0ZXIgdGhhbiBjdXJyZW50IHRvdGFsICR7Y3VycmVudH1gKVxuXHRcdFx0XHR0aGlzLnJlZnMuZ29hbC5nZXRET01Ob2RlKCkuZm9jdXMoKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmQsdG90YWx9KVxuXHR9XG59XG5cbmNsYXNzIEFHb2FsIGV4dGVuZHMgSXRlbXtcblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZXdhcmQsdG90YWwsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHN0eWxlPXtmb250U2l6ZTpcIngtc21hbGxcIiwgd2hpdGVTcGFjZTpcIm5vd3JhcFwiLGJhY2tncm91bmRDb2xvcjpcImxpZ2h0Z3JlZW5cIn1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXY+PEF2YXRhciBzdHlsZT17c3R5bGV9PntyZXdhcmR9PC9BdmF0YXI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2Pnt0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBBUmV3YXJkIGV4dGVuZHMgSXRlbXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17bmV3UmVhc29uOm51bGx9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOm51bGx9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0bGV0IHtuZXdSZWFzb259PXRoaXMuc3RhdGVcblx0XHRsZXQge3JlYXNvbn09dGhpcy5yZWZzXG5cdFx0aWYobmV3UmVhc29uICYmIHJlYXNvbilcblx0XHRcdHJlYXNvbi5nZXRET01Ob2RlKCkuZm9jdXMoKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZWFzb24sYW1vdW50LHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCB7bmV3UmVhc29ufT10aGlzLnN0YXRlXG5cblx0XHRpZihuZXdSZWFzb24pe1xuXHRcdFx0cmVhc29uPSg8VGV4dEZpZWxkIHJlZj1cInJlYXNvblwiIGRlZmF1bHRWYWx1ZT17cmVhc29ufVxuXHRcdFx0XHRvbkVudGVyS2V5RG93bj17ZT0+ZS50YXJnZXQuYmx1cigpfVxuXHRcdFx0XHRvbkJsdXI9e2U9PnRoaXMucmVhc29uQ2hhbmdlZChlLnRhcmdldC52YWx1ZS50cmltKCkpfS8+KVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWFzb25cIiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHtuZXdSZWFzb246cmVhc29ufHxcIiBcIn0pfT5cblx0XHRcdFx0e25ld1JlYXNvbnx8cmVhc29ufHxcIi4uLlwifVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj4re2Ftb3VudH0ve3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cblxuXHRyZWFzb25DaGFuZ2VkKG5ld1JlYXNvbil7XG5cdFx0bGV0IHtyZWFzb24sIG9uUmVhc29uQ2hhbmdlfT10aGlzLnByb3BzXG5cdFx0aWYoIW5ld1JlYXNvbiB8fCBuZXdSZWFzb249PXJlYXNvbil7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246dW5kZWZpbmVkfSlcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRvblJlYXNvbkNoYW5nZSAmJiBvblJlYXNvbkNoYW5nZShuZXdSZWFzb24pXG5cdH1cbn1cblxuXG5pbXBvcnQgUmV3YXJkSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL3NvY2lhbC9tb29kJ1xuY2xhc3MgUmV3YXJkb3IgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjdXJyZW50OlJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0b25SZXdhcmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRjdXJyZW50OjAsXG5cdFx0b25SZXdhcmQ6IGE9PjFcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e3BsdXM6MCx0aWNrZXI6bnVsbH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzOjAsdGlja2VyOm51bGx9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtwbHVzfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsY3VycmVudH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZCBwZW5kaW5nXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCI+XG5cdFx0XHRcdFx0PFJld2FyZEljb24gY2xhc3NOYW1lPVwicmV3YXJkZXJcIiBvbkNsaWNrPXtlPT50aGlzLnBsdXMoKX0gLz5cblx0XHRcdFx0XHQ8c3Bhbj57Y3VycmVudH08L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgcGx1cyAke3BsdXMgPyBcInBsdXNpbmdcIiA6IFwiXCJ9YH0+K3twbHVzfHwneCd9PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBsdXMoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0cGx1cysrXG5cdFx0dGlja2VyPXNldFRpbWVvdXQodGhpcy5yZXdhcmQuYmluZCh0aGlzKSwxMDAwKVxuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXMsdGlja2VyfSlcblx0fVxuXG5cdHJld2FyZCgpe1xuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcblx0XHR0aWNrZXIgJiYgY2xlYXJUaW1lb3V0KHRpY2tlcilcblx0XHR0aGlzLnByb3BzLm9uUmV3YXJkKHBsdXMpXG5cdH1cbn1cbiJdfQ==