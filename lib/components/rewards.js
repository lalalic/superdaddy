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
				{ className: 'rewards page', style: style },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFvUEE7Ozs7Ozs7Ozs7OztJQWxQcUI7OztBQVdwQixVQVhvQixPQVdwQixHQUFhO3dCQVhPLFNBV1A7O3FFQVhPLHFCQVlWLFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVc7QUFDVixVQUFNLElBQU47QUFDQSxZQUFRLElBQVI7R0FGRCxDQUZZO0FBTVosUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkLENBTlk7O0VBQWI7O2NBWG9COzsyQkFvQlgsV0FBVTs7O0FBQ2xCLGVBQVUsRUFBQyxPQUFNLFVBQVUsS0FBVixFQUFqQixDQURrQjs7QUFHbEIsV0FBUSxHQUFSLENBQVksQ0FDWCxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBUyxNQUFUO1dBQWtCLFdBQVMsSUFBVCxDQUFjLFNBQWQsRUFBeUIsS0FBekIsQ0FBK0IsT0FBL0IsRUFBdUMsTUFBdkM7SUFBbEIsQ0FERCxFQUVYLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0IsU0FBTyxJQUFQLENBQVksU0FBWixFQUF1QixLQUF2QixDQUE2QixPQUE3QixFQUFxQyxNQUFyQztJQUFsQixDQUZELENBQVosRUFHRyxJQUhILENBR1EsYUFBRzs0QkFDVyxNQURYOztRQUNMLGdCQURLO1FBQ0ksY0FESjs7QUFFVixXQUFLLFFBQUwsQ0FBYyxFQUFDLGdCQUFELEVBQVMsWUFBVCxFQUFkLEVBRlU7SUFBSCxDQUhSLENBSGtCOzs7O3NDQVlBO0FBQ2xCLGNBQVMsRUFBVCxDQUFZLFVBQVosRUFBd0IsS0FBSyxRQUFMLENBQXhCLENBRGtCO0FBRWxCLFlBQU8sRUFBUCxDQUFVLFVBQVYsRUFBc0IsS0FBSyxRQUFMLENBQXRCLENBRmtCO0FBR2xCLFFBQUssUUFBTCxDQUFjLEVBQUMsT0FBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLEVBQXJCLEVBSGtCOzs7O3lDQU1HO0FBQ3JCLGNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxLQUFLLFFBQUwsQ0FBcEMsQ0FEcUI7QUFFckIsWUFBTyxjQUFQLENBQXNCLFVBQXRCLEVBQWtDLEtBQUssUUFBTCxDQUFsQyxDQUZxQjs7Ozs0Q0FNSSxXQUFVO0FBQy9CLE9BQU8sV0FBVSxVQUFoQixLQUFELENBRCtCO09BRWpDLFFBQU8sS0FBSyxLQUFMLENBQVAsTUFGaUM7OztBQUluQyxPQUFHLFNBQU8sUUFBUCxFQUNGLEtBQUssUUFBTCxDQUFjLEVBQUMsT0FBTSxTQUFTLEdBQVQsRUFBckIsRUFERDs7OzsyQkFJTzs7O2dCQUNjLEtBQUssS0FBTCxDQURkO09BQ0YscUJBREU7T0FDSyx5QkFETDtnQkFFeUIsS0FBSyxLQUFMLENBRnpCO09BRUYsdUJBRkU7T0FFSywyQkFGTDs2QkFFZSxNQUZmO09BRWUscUNBQU0sa0JBRnJCOztBQUdQLE9BQUksUUFBTSxDQUFOO09BQVMsTUFBSSxDQUFKO09BQU8sU0FBTyxJQUFQO09BQWEsTUFBSSxDQUFKLENBSDFCO0FBSVAsV0FBTSxTQUFTLE1BQU0sR0FBTixDQUFVO1dBQUcsNkJBQUMsS0FBRDtBQUN6QixvQkFBYSxFQUFFLEtBQUY7QUFDYixhQUFRLE1BQVI7QUFDQSxhQUFRLEVBQUUsTUFBRjtBQUNSLGFBQU8sTUFBSSxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWEsRUFBRSxLQUFGLENBQWpCLEVBQTJCLEVBQUUsS0FBRixDQUFsQyxFQUp5QjtJQUFILENBQW5CLENBSkM7O0FBVVAsYUFBUSxXQUFXLFFBQVEsR0FBUixDQUFZO1dBQUcsNkJBQUMsT0FBRDtBQUMvQix1QkFBZSxTQUFPLEVBQUUsTUFBRixDQUF0QjtBQUNBLHFCQUFnQjthQUFXLE9BQUssY0FBTCxDQUFvQixDQUFwQixFQUFzQixTQUF0QjtNQUFYO0FBQ2hCLGFBQVEsTUFBUjtBQUNBLGFBQVEsRUFBRSxNQUFGO0FBQ1IsYUFBUSxFQUFFLE1BQUY7QUFDUixZQUFPLEtBQVAsRUFOK0I7SUFBSCxDQUF2QixDQVZEOztBQWtCUCxTQUFJLEtBQUssR0FBTCxDQUFTLEtBQVQsRUFBZSxHQUFmLENBQUosQ0FsQk87O0FBb0JQLE9BQUcsUUFBSCxFQUNDLFNBQVEsNkJBQUMsV0FBRCxJQUFhLFFBQVEsQ0FBQyxNQUFJLEdBQUosQ0FBRCxHQUFVLE1BQVYsRUFBa0IsU0FBUyxLQUFULEVBQWdCLFFBQVEsTUFBUixFQUFnQixZQUFZO1lBQU0sT0FBSyxRQUFMLENBQWMsSUFBZDtLQUFOLEVBQW5GLENBQVIsQ0FERCxLQUdDLFNBQVEsNkJBQUMsUUFBRCxJQUFVLFNBQVMsS0FBVCxFQUFnQixRQUFRLE1BQVIsRUFBZ0IsVUFBVTtZQUFRLE9BQUssTUFBTCxDQUFZLE1BQVo7S0FBUixFQUFwRCxDQUFSLENBSEQ7O0FBS0EsU0FBTSxNQUFOLEdBQWEsQ0FBQyxNQUFJLEdBQUosQ0FBRCxHQUFVLE1BQVYsQ0F6Qk47QUEwQlAsVUFDQzs7TUFBSyxXQUFVLGNBQVYsRUFBeUIsT0FBTyxLQUFQLEVBQTlCO0lBQ0UsS0FERjtJQUdFLE9BSEY7SUFLRSxNQUxGO0lBREQsQ0ExQk87Ozs7MkJBcUNDLE1BQUs7QUFDYixRQUFLLEtBQUwsR0FBVyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBREU7QUFFYixZQUFPLE1BQVAsQ0FBYyxJQUFkLEVBRmE7Ozs7eUJBS1AsUUFBTztBQUNiLE9BQUksWUFBVSxFQUFDLGNBQUQsRUFBUyxPQUFNLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBekIsQ0FEUztBQUViLGNBQVMsTUFBVCxDQUFnQixTQUFoQixFQUZhOzs7O2lDQUtDLFFBQVEsV0FBVTtBQUNoQyxVQUFPLE1BQVAsR0FBYyxTQUFkLENBRGdDO0FBRWhDLGNBQVMsTUFBVCxDQUFnQixNQUFoQixFQUZnQzs7OztRQW5HYjtFQUFnQixlQUFNLFNBQU47O0FBQWhCLFFBQ2IsZUFBYTtBQUNuQixXQUFTLEtBQVQ7QUFDQSxTQUFPLEVBQVA7O0FBSG1CLFFBS2IsWUFBVTtBQUNoQixRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNQLFdBQVMsZUFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ1QsU0FBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7O2tCQVJZOztJQXlHZjs7Ozs7Ozs7OztFQUFhLGVBQU0sU0FBTjs7QUFBYixLQUNFLGVBQWE7QUFDbkIsU0FBTyxFQUFQOzs7SUFJSTs7O0FBSUwsVUFKSyxXQUlMLEdBQWE7d0JBSlIsYUFJUTs7c0VBSlIseUJBS0ssWUFERzs7QUFFWixTQUFLLEtBQUwsR0FBVztBQUNWLFdBQU8sRUFBUDtBQUNBLFVBQU0sRUFBTjtHQUZELENBRlk7O0VBQWI7O2NBSks7OzhDQVlzQjtBQUMxQixRQUFLLFFBQUwsQ0FBYztBQUNiLFlBQU8sRUFBUDtBQUNBLFdBQU0sRUFBTjtJQUZELEVBRDBCOzs7OzJCQU9uQjs7O2lCQUNlLEtBQUssS0FBTCxDQURmO09BQ0YsMEJBREU7T0FDTyx3QkFEUDtpQkFFYSxLQUFLLEtBQUwsQ0FGYjtPQUVGLHdCQUZFO09BRU0sc0JBRk47O0FBR1AsVUFDQzs7TUFBSyxXQUFVLGNBQVYsRUFBeUIsT0FBTyxFQUFDLGNBQUQsRUFBUCxFQUE5QjtJQUNDOzs7S0FDQyx3Q0FBTyxRQUFRO2NBQUcsT0FBSyxPQUFMLENBQWEsRUFBQyxRQUFPLEVBQUUsTUFBRixDQUFTLEtBQVQsRUFBckI7T0FBSDtBQUNkLFdBQUksUUFBSjtBQUNBLG9CQUFjLE1BQWQ7QUFDQSxpQkFBVSxlQUFWO0FBQ0EsbUJBQVksZUFBWjtBQUNBLGFBQU8sRUFBQyxXQUFVLE9BQVYsRUFBa0IsT0FBTSxNQUFOLEVBQTFCLEVBTEQsQ0FERDtLQUREO0lBU0M7O09BQUssV0FBVSxNQUFWLEVBQUw7O0tBVEQ7SUFVQzs7O0tBQ0Msd0NBQU8sUUFBUTtjQUFHLE9BQUssT0FBTCxDQUFhLEVBQUMsT0FBTSxFQUFFLE1BQUYsQ0FBUyxLQUFULEVBQXBCO09BQUg7QUFDZCxXQUFJLE1BQUo7QUFDQSxvQkFBYyxTQUFPLEVBQVA7QUFDZCw4QkFBc0IsT0FBdEI7QUFDQSxhQUFPLEVBQUMsT0FBTSxPQUFOLEVBQVIsRUFKRCxDQUREO0tBVkQ7SUFERCxDQUhPOzs7OzBCQXlCQSxPQUFNO09BQ0QsWUFBMkIsTUFBbEMsT0FEUTtPQUNnQixXQUFVLE1BQWhCLE1BRFY7aUJBRVksS0FBSyxLQUFMLENBRlo7T0FFUiwwQkFGUTtPQUVBLGdDQUZBO2lCQUdPLEtBQUssS0FBTCxDQUhQO09BR1Isd0JBSFE7T0FHQSxzQkFIQTs7QUFJYixPQUFHLFNBQUgsRUFDQyxTQUFPLFNBQVAsQ0FERDtBQUVBLE9BQUcsUUFBSCxFQUNDLFFBQU0sUUFBTixDQUREO0FBRUEsT0FBRyxPQUFPLElBQVAsTUFBaUIsTUFBTSxJQUFOLEVBQWpCLEVBQThCO0FBQ2hDLFlBQU0sU0FBUyxNQUFNLElBQU4sRUFBVCxDQUFOLENBRGdDO0FBRWhDLFFBQUcsUUFBTSxPQUFOLEVBQWM7QUFDaEIsY0FBTyxPQUFPLElBQVAsRUFBUCxDQURnQjtBQUVoQixnQkFBVyxFQUFDLGNBQUQsRUFBUSxZQUFSLEVBQVgsRUFGZ0I7QUFHaEIsWUFIZ0I7S0FBakIsTUFJSztBQUNKLGlCQUFHLFFBQUgsQ0FBWSxJQUFaLCtDQUE2RCxPQUE3RCxFQURJO0FBRUosVUFBSyxJQUFMLENBQVUsSUFBVixDQUFlLFVBQWYsR0FBNEIsS0FBNUIsR0FGSTtLQUpMO0lBRkQ7QUFXQSxRQUFLLFFBQUwsQ0FBYyxFQUFDLGNBQUQsRUFBUSxZQUFSLEVBQWQsRUFuQmE7Ozs7UUE1Q1Q7RUFBb0I7O0FBQXBCLFlBQ0UsZUFBYTtBQUNuQixhQUFXO1NBQUc7RUFBSDs7O0lBaUVQOzs7Ozs7Ozs7OzsyQkFDRztpQkFDbUIsS0FBSyxLQUFMLENBRG5CO09BQ0Ysd0JBREU7T0FDSyxzQkFETDtPQUNXLHdCQURYOztBQUVQLE9BQUksUUFBTSxFQUFDLFVBQVMsU0FBVCxFQUFvQixZQUFXLFFBQVgsRUFBb0IsaUJBQWdCLFlBQWhCLEVBQS9DLENBRkc7QUFHUCxVQUNDOztNQUFLLFdBQVUsTUFBVixFQUFpQixPQUFPLEVBQUMsUUFBTyxTQUFPLEtBQVAsRUFBZixFQUF0QjtJQUNDOzs7S0FBSzs7UUFBUSxPQUFPLEtBQVAsRUFBUjtNQUF1QixNQUF2QjtNQUFMO0tBREQ7SUFFQzs7T0FBSyxXQUFVLE1BQVYsRUFBTDs7S0FGRDtJQUdDOzs7S0FBTSxLQUFOO0tBSEQ7SUFERCxDQUhPOzs7O1FBREg7RUFBYzs7SUFjZDs7O0FBQ0wsVUFESyxPQUNMLEdBQWE7d0JBRFIsU0FDUTs7c0VBRFIscUJBRUssWUFERzs7QUFFWixTQUFLLEtBQUwsR0FBVyxFQUFDLFdBQVUsSUFBVixFQUFaLENBRlk7O0VBQWI7O2NBREs7OzhDQU1zQjtBQUMxQixRQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsSUFBVixFQUFmLEVBRDBCOzs7O3VDQUlQO09BQ2QsWUFBVyxLQUFLLEtBQUwsQ0FBWCxVQURjO09BRWQsU0FBUSxLQUFLLElBQUwsQ0FBUixPQUZjOztBQUduQixPQUFHLGFBQWEsTUFBYixFQUNGLE9BQU8sVUFBUCxHQUFvQixLQUFwQixHQUREOzs7OzJCQUlPOzs7aUJBQzBCLEtBQUssS0FBTCxDQUQxQjtPQUNGLHdCQURFO09BQ0ssd0JBREw7T0FDWSxzQkFEWjtPQUNrQix3QkFEbEI7T0FFRixZQUFXLEtBQUssS0FBTCxDQUFYLFVBRkU7OztBQUlQLE9BQUcsU0FBSCxFQUFhO0FBQ1osYUFBUSxzREFBVyxLQUFJLFFBQUosRUFBYSxjQUFjLE1BQWQ7QUFDL0IscUJBQWdCO2FBQUcsRUFBRSxNQUFGLENBQVMsSUFBVDtNQUFIO0FBQ2hCLGFBQVE7YUFBRyxPQUFLLGFBQUwsQ0FBbUIsRUFBRSxNQUFGLENBQVMsS0FBVCxDQUFlLElBQWYsRUFBbkI7TUFBSCxFQUZELENBQVIsQ0FEWTtJQUFiOztBQU1BLFVBQ0M7O01BQUssV0FBVSxRQUFWLEVBQW1CLE9BQU8sRUFBQyxRQUFPLFNBQU8sS0FBUCxFQUFmLEVBQXhCO0lBQ0M7O09BQUssV0FBVSxNQUFWLEVBQUw7O0tBREQ7SUFFQzs7T0FBSyxXQUFVLFFBQVYsRUFBbUIsU0FBUztjQUFHLE9BQUssUUFBTCxDQUFjLEVBQUMsV0FBVSxVQUFRLEdBQVIsRUFBekI7T0FBSCxFQUFqQztLQUNDLGFBQVcsTUFBWCxJQUFtQixLQUFuQjtLQUhGO0lBS0M7Ozs7S0FBTyxNQUFQOztLQUFnQixLQUFoQjtLQUxEO0lBREQsQ0FWTzs7OztnQ0FxQk0sV0FBVTtpQkFDTSxLQUFLLEtBQUwsQ0FETjtPQUNsQix3QkFEa0I7T0FDVix3Q0FEVTs7QUFFdkIsT0FBRyxDQUFDLFNBQUQsSUFBYyxhQUFXLE1BQVgsRUFBa0I7QUFDbEMsU0FBSyxRQUFMLENBQWMsRUFBQyxXQUFVLFNBQVYsRUFBZixFQURrQztBQUVsQyxXQUZrQztJQUFuQzs7QUFLQSxxQkFBa0IsZUFBZSxTQUFmLENBQWxCLENBUHVCOzs7O1FBdENuQjtFQUFnQjs7SUFtRGhCOzs7QUFXTCxVQVhLLFFBV0wsR0FBYTt3QkFYUixVQVdROzt1RUFYUixzQkFZSyxZQURHOztBQUVaLFVBQUssS0FBTCxHQUFXLEVBQUMsTUFBSyxDQUFMLEVBQU8sUUFBTyxJQUFQLEVBQW5CLENBRlk7O0VBQWI7O2NBWEs7OzhDQWdCc0I7QUFDMUIsUUFBSyxRQUFMLENBQWMsRUFBQyxNQUFLLENBQUwsRUFBTyxRQUFPLElBQVAsRUFBdEIsRUFEMEI7Ozs7MkJBSW5COzs7T0FDRixPQUFNLEtBQUssS0FBTCxDQUFOLEtBREU7aUJBRWMsS0FBSyxLQUFMLENBRmQ7T0FFRix3QkFGRTtPQUVLLDBCQUZMOztBQUdQLFVBQ0M7O01BQUssV0FBVSxnQkFBVixFQUFMO0lBQ0M7O09BQUssV0FBVSxRQUFWLEVBQUw7S0FDQywrQ0FBWSxXQUFVLFVBQVYsRUFBcUIsU0FBUztjQUFHLFFBQUssSUFBTDtPQUFILEVBQTFDLENBREQ7S0FFQzs7O01BQU8sT0FBUDtNQUZEO0tBR0M7O1FBQU0sc0JBQW1CLE9BQU8sU0FBUCxHQUFtQixFQUFuQixDQUFuQixFQUFOOztNQUFvRCxRQUFNLEdBQU47TUFIckQ7S0FERDtJQURELENBSE87Ozs7eUJBY0Y7aUJBQ2EsS0FBSyxLQUFMLENBRGI7T0FDQSxvQkFEQTtPQUNLLHdCQURMOztBQUVMLGFBQVUsYUFBYSxNQUFiLENBQVYsQ0FGSztBQUdMLFVBSEs7QUFJTCxZQUFPLFdBQVcsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFYLEVBQWtDLElBQWxDLENBQVAsQ0FKSztBQUtMLFFBQUssUUFBTCxDQUFjLEVBQUMsVUFBRCxFQUFNLGNBQU4sRUFBZCxFQUxLOzs7OzJCQVFFO2lCQUNXLEtBQUssS0FBTCxDQURYO09BQ0Ysb0JBREU7T0FDRyx3QkFESDs7QUFFUCxhQUFVLGFBQWEsTUFBYixDQUFWLENBRk87QUFHUCxRQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLElBQXBCLEVBSE87Ozs7UUExQ0g7RUFBaUI7O0FBQWpCLFNBQ0UsWUFBVTtBQUNoQixVQUFRLGVBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNSLFdBQVUsZUFBTSxTQUFOLENBQWdCLElBQWhCOztBQUhOLFNBTUUsZUFBYTtBQUNuQixVQUFRLENBQVI7QUFDQSxXQUFVO1NBQUc7RUFBSCIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge1RleHRGaWVsZCwgSWNvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBQbHVzSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1hZGQnXG5pbXBvcnQgRm9yd2FyZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1mb3J3YXJkXCJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5LCBSZXdhcmQgYXMgZGJSZXdhcmQsIEdvYWwgYXMgZGJHb2FsfSBmcm9tICcuLi9kYidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0ZWRpdGFibGU6ZmFsc2UsXG5cdFx0aGVpZ2h0OjIwXG5cdH1cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y2hpbGQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0ZWRpdGFibGU6UmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0aGVpZ2h0OlJlYWN0LlByb3BUeXBlcy5udW1iZXJcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0Z29hbHM6bnVsbCxcblx0XHRcdHJld2FyZHM6bnVsbFxuXHRcdH1cblx0XHR0aGlzLm9uQ2hhbmdlPXRoaXMub25DaGFuZ2UuYmluZCh0aGlzKVxuXHR9XG5cblx0b25DaGFuZ2UoY29uZGl0aW9uKXtcblx0XHRjb25kaXRpb249e2NoaWxkOmNvbmRpdGlvbi5jaGlsZH1cblxuXHRcdFByb21pc2UuYWxsKFtcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiUmV3YXJkLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpLFxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJHb2FsLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXG5cdFx0XSkudGhlbihhPT57XG5cdFx0XHRsZXQgW3Jld2FyZHMsIGdvYWxzXT1hXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHR9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRkYlJld2FyZC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0ZGJHb2FsLm9uKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDp0aGlzLnByb3BzLmNoaWxkLl9pZH0pXG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdGRiUmV3YXJkLnJlbW92ZUxpc3RlbmVyKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHRkYkdvYWwucmVtb3ZlTGlzdGVuZXIoXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHR9XG5cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0bGV0IHtjaGlsZDpuZXdDaGlsZH09bmV4dFByb3BzLFxuXHRcdFx0e2NoaWxkfT10aGlzLnByb3BzXG5cblx0XHRpZihjaGlsZCE9bmV3Q2hpbGQpXG5cdFx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDpuZXdDaGlsZC5faWR9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtnb2FscywgcmV3YXJkc309dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGVkaXRhYmxlLCBzdHlsZT17fX09dGhpcy5wcm9wc1xuXHRcdGxldCB0b3RhbD0wLCBtYXg9MCwgYWN0aW9uPW51bGwsIGJ1Zj03XG5cdFx0Z29hbHM9Z29hbHMgJiYgZ29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH1cblx0XHRcdFx0XHR0b3RhbD17bWF4PU1hdGgubWF4KG1heCxhLnRvdGFsKSwgYS50b3RhbH0vPilcblxuXHRcdHJld2FyZHM9cmV3YXJkcyAmJiByZXdhcmRzLm1hcChhPT48QVJld2FyZFxuXHRcdFx0XHRcdGtleT17YHJld2FyZF8ke3RvdGFsKz1hLmFtb3VudH1gfVxuXHRcdFx0XHRcdG9uUmVhc29uQ2hhbmdlPXtuZXdSZWFzb249PnRoaXMub25SZWFzb25DaGFuZ2UoYSxuZXdSZWFzb24pfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJlYXNvbj17YS5yZWFzb259XG5cdFx0XHRcdFx0YW1vdW50PXthLmFtb3VudH1cblx0XHRcdFx0XHR0b3RhbD17dG90YWx9Lz4pXG5cblx0XHRtYXg9TWF0aC5tYXgodG90YWwsbWF4KVxuXG5cdFx0aWYoZWRpdGFibGUpXG5cdFx0XHRhY3Rpb249KDxQZW5kaW5nR29hbCBib3R0b209eyhtYXgrYnVmKSpoZWlnaHR9IGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25QZW5kR29hbD17Z29hbD0+dGhpcy5wZW5kR29hbChnb2FsKX0vPilcblx0XHRlbHNlXG5cdFx0XHRhY3Rpb249KDxSZXdhcmRvciBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUmV3YXJkPXthbW91bnQ9PnRoaXMucmV3YXJkKGFtb3VudCl9Lz4pXG5cblx0XHRzdHlsZS5oZWlnaHQ9KG1heCtidWYpKmhlaWdodFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZHMgcGFnZVwiIHN0eWxlPXtzdHlsZX0+XG5cdFx0XHRcdHtnb2Fsc31cblxuXHRcdFx0XHR7cmV3YXJkc31cblxuXHRcdFx0XHR7YWN0aW9ufVxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cGVuZEdvYWwoZ29hbCl7XG5cdFx0Z29hbC5jaGlsZD10aGlzLnByb3BzLmNoaWxkLl9pZFxuXHRcdGRiR29hbC51cHNlcnQoZ29hbClcblx0fVxuXG5cdHJld2FyZChhbW91bnQpe1xuXHRcdGxldCBuZXdSZXdhcmQ9e2Ftb3VudCwgY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWR9XG5cdFx0ZGJSZXdhcmQudXBzZXJ0KG5ld1Jld2FyZClcblx0fVxuXG5cdG9uUmVhc29uQ2hhbmdlKHJld2FyZCwgbmV3UmVhc29uKXtcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxuXHRcdGRiUmV3YXJkLnVwc2VydChyZXdhcmQpXG5cdH1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwXG5cdH1cbn1cblxuY2xhc3MgUGVuZGluZ0dvYWwgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRvblBlbmRHb2FsOmE9PjFcblx0fVxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHJld2FyZDpcIlwiLFxuXHRcdFx0dG90YWw6XCJcIlxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHJld2FyZDpcIlwiLFxuXHRcdFx0dG90YWw6XCJcIlxuXHRcdH0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2N1cnJlbnQsIGJvdHRvbX09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWwgcGVuZGluZ1wiIHN0eWxlPXt7Ym90dG9tfX0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHJlZj1cInJld2FyZFwiXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3Jld2FyZH1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInBlbmRpbmdSZXdhcmRcIlxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJOZXcgUmV3YXJkLi4uXCJcblx0XHRcdFx0XHRcdHN0eWxlPXt7dGV4dEFsaWduOlwicmlnaHRcIix3aWR0aDpcIjEwMCVcIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZyYXF1bzs8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3RvdGFsOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRyZWY9XCJnb2FsXCJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dG90YWx8fFwiXCJ9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17YEdvYWw6PiR7Y3VycmVudH1gfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjIuNWVtXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0dHJ5UGVuZChzdGF0ZSl7XG5cdFx0bGV0IHtyZXdhcmQ6bmV3UmV3YXJkLCB0b3RhbDpuZXdUb3RhbH09c3RhdGVcblx0XHRsZXQge2N1cnJlbnQsb25QZW5kR29hbH09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdGlmKG5ld1Jld2FyZClcblx0XHRcdHJld2FyZD1uZXdSZXdhcmRcblx0XHRpZihuZXdUb3RhbClcblx0XHRcdHRvdGFsPW5ld1RvdGFsXG5cdFx0aWYocmV3YXJkLnRyaW0oKSAmJiB0b3RhbC50cmltKCkpe1xuXHRcdFx0dG90YWw9cGFyc2VJbnQodG90YWwudHJpbSgpKVxuXHRcdFx0aWYodG90YWw+Y3VycmVudCl7XG5cdFx0XHRcdHJld2FyZD1yZXdhcmQudHJpbSgpXG5cdFx0XHRcdG9uUGVuZEdvYWwoe3Jld2FyZCx0b3RhbH0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdFVJLk1lc3NhZ2VyLnNob3coYG5ldyBnb2FsIG11c3QgZ3JlYXRlciB0aGFuIGN1cnJlbnQgdG90YWwgJHtjdXJyZW50fWApXG5cdFx0XHRcdHRoaXMucmVmcy5nb2FsLmdldERPTU5vZGUoKS5mb2N1cygpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe3Jld2FyZCx0b3RhbH0pXG5cdH1cbn1cblxuY2xhc3MgQUdvYWwgZXh0ZW5kcyBJdGVte1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3Jld2FyZCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQgc3R5bGU9e2ZvbnRTaXplOlwieC1zbWFsbFwiLCB3aGl0ZVNwYWNlOlwibm93cmFwXCIsYmFja2dyb3VuZENvbG9yOlwibGlnaHRncmVlblwifVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWxcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdj48QXZhdGFyIHN0eWxlPXtzdHlsZX0+e3Jld2FyZH08L0F2YXRhcj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXY+e3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmNsYXNzIEFSZXdhcmQgZXh0ZW5kcyBJdGVte1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtuZXdSZWFzb246bnVsbH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246bnVsbH0pXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRsZXQge25ld1JlYXNvbn09dGhpcy5zdGF0ZVxuXHRcdGxldCB7cmVhc29ufT10aGlzLnJlZnNcblx0XHRpZihuZXdSZWFzb24gJiYgcmVhc29uKVxuXHRcdFx0cmVhc29uLmdldERPTU5vZGUoKS5mb2N1cygpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3JlYXNvbixhbW91bnQsdG90YWwsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHtuZXdSZWFzb259PXRoaXMuc3RhdGVcblxuXHRcdGlmKG5ld1JlYXNvbil7XG5cdFx0XHRyZWFzb249KDxUZXh0RmllbGQgcmVmPVwicmVhc29uXCIgZGVmYXVsdFZhbHVlPXtyZWFzb259XG5cdFx0XHRcdG9uRW50ZXJLZXlEb3duPXtlPT5lLnRhcmdldC5ibHVyKCl9XG5cdFx0XHRcdG9uQmx1cj17ZT0+dGhpcy5yZWFzb25DaGFuZ2VkKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9Lz4pXG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpyZWFzb258fFwiIFwifSl9PlxuXHRcdFx0XHR7bmV3UmVhc29ufHxyZWFzb258fFwiLi4uXCJ9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2Pit7YW1vdW50fS97dG90YWx9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxuXG5cdHJlYXNvbkNoYW5nZWQobmV3UmVhc29uKXtcblx0XHRsZXQge3JlYXNvbiwgb25SZWFzb25DaGFuZ2V9PXRoaXMucHJvcHNcblx0XHRpZighbmV3UmVhc29uIHx8IG5ld1JlYXNvbj09cmVhc29uKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjp1bmRlZmluZWR9KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG9uUmVhc29uQ2hhbmdlICYmIG9uUmVhc29uQ2hhbmdlKG5ld1JlYXNvbilcblx0fVxufVxuXG5cbmltcG9ydCBSZXdhcmRJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvc29jaWFsL21vb2QnXG5jbGFzcyBSZXdhcmRvciBleHRlbmRzIEl0ZW17XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGN1cnJlbnQ6UmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblx0XHRvblJld2FyZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGN1cnJlbnQ6MCxcblx0XHRvblJld2FyZDogYT0+MVxuXHR9XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17cGx1czowLHRpY2tlcjpudWxsfVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXM6MCx0aWNrZXI6bnVsbH0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3BsdXN9PXRoaXMuc3RhdGVcblx0XHRsZXQge2hlaWdodCxjdXJyZW50fT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkIHBlbmRpbmdcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWFzb25cIj5cblx0XHRcdFx0XHQ8UmV3YXJkSWNvbiBjbGFzc05hbWU9XCJyZXdhcmRlclwiIG9uQ2xpY2s9e2U9PnRoaXMucGx1cygpfSAvPlxuXHRcdFx0XHRcdDxzcGFuPntjdXJyZW50fTwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2BwbHVzICR7cGx1cyA/IFwicGx1c2luZ1wiIDogXCJcIn1gfT4re3BsdXN8fCd4J308L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cGx1cygpe1xuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcblx0XHR0aWNrZXIgJiYgY2xlYXJUaW1lb3V0KHRpY2tlcilcblx0XHRwbHVzKytcblx0XHR0aWNrZXI9c2V0VGltZW91dCh0aGlzLnJld2FyZC5iaW5kKHRoaXMpLDEwMDApXG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGx1cyx0aWNrZXJ9KVxuXHR9XG5cblx0cmV3YXJkKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHRoaXMucHJvcHMub25SZXdhcmQocGx1cylcblx0fVxufVxuIl19