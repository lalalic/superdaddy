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
						return _this4.onReasonChange(a, newReason);
					},
					height: height,
					reason: a.reason,
					amount: a.amount,
					total: total });
			});

			max = Math.max(total, max);

			if (editable) action = _qiliApp.React.createElement(PendingGoal, { bottom: (max + buf) * height, current: total, height: height, onPendGoal: function onPendGoal(goal) {
					return _this4.pendGoal(goal);
				} });else action = _qiliApp.React.createElement(Rewardor, { current: total, height: height, onReward: function onReward(amount) {
					return _this4.reward(amount);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUErT0E7Ozs7Ozs7Ozs7OztJQTdPcUI7OztBQVdwQixVQVhvQixPQVdwQixHQUFhO3dCQVhPLFNBV1A7O3FFQVhPLHFCQVlWLFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVc7QUFDVixVQUFNLElBQU47QUFDQSxZQUFRLElBQVI7R0FGRCxDQUZZO0FBTVosUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkLENBTlk7O0VBQWI7O2NBWG9COzs2QkFvQlY7QUFDVCxRQUFLLFdBQUwsR0FEUzs7OztzQ0FJUzs7O0FBQ2xCLGNBQVMsRUFBVCxDQUFZLFFBQVosRUFBc0IsS0FBSyxRQUFMLENBQXRCLENBRGtCO09BRWIsUUFBTyxLQUFLLEtBQUwsQ0FBUCxNQUZhOztBQUdsQixXQUFRLEdBQVIsQ0FBWSxDQUFDLFdBQVMsVUFBVCxDQUFvQixLQUFwQixDQUFELEVBQTZCLFdBQVMsUUFBVCxDQUFrQixLQUFsQixDQUE3QixDQUFaLEVBQ0UsSUFERixDQUNPLGFBQUc7NEJBQ2EsTUFEYjs7UUFDSCxnQkFERztRQUNNLGNBRE47O0FBRVIsV0FBSyxRQUFMLENBQWMsRUFBQyxnQkFBRCxFQUFTLFlBQVQsRUFBZCxFQUZRO0lBQUgsQ0FEUCxDQUhrQjs7Ozt5Q0FVRztBQUNyQixjQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBSyxRQUFMLENBQWxDLENBRHFCOzs7OzRDQUtJLFdBQVU7OztBQUMvQixPQUFPLFdBQVUsVUFBaEIsS0FBRCxDQUQrQjtPQUVqQyxRQUFPLEtBQUssS0FBTCxDQUFQLE1BRmlDOztBQUduQyxPQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNsQixZQUFRLEdBQVIsQ0FBWSxDQUFDLFdBQVMsVUFBVCxDQUFvQixLQUFwQixDQUFELEVBQTZCLFdB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RUFITzs7OztRQTFDSDtFQUFpQjs7QUFBakIsU0FDRSxZQUFVO0FBQ2hCLFVBQVEsZUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1IsV0FBVSxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7O0FBSE4sU0FNRSxlQUFhO0FBQ25CLFVBQVEsQ0FBUjtBQUNBLFdBQVU7U0FBRztFQUFIIiwiZmlsZSI6InJld2FyZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBVSX0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBJY29uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IFBsdXNJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2FsYXJtLWFkZCdcbmltcG9ydCBGb3J3YXJkSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWZvcndhcmRcIlxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHksIFJld2FyZCBhcyBkYlJld2FyZCwgR29hbCBhcyBkYkdvYWx9IGZyb20gJy4uL2RiJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRlZGl0YWJsZTpmYWxzZSxcblx0XHRoZWlnaHQ6MjBcblx0fVxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjaGlsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRlZGl0YWJsZTpSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRoZWlnaHQ6UmVhY3QuUHJvcFR5cGVzLm51bWJlclxuXHR9XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRnb2FsczpudWxsLFxuXHRcdFx0cmV3YXJkczpudWxsXG5cdFx0fVxuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpXG5cdH1cblxuXHRvbkNoYW5nZSgpe1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRkYlJld2FyZC5vbihcImNoYW5nZVwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGxldCB7Y2hpbGR9PXRoaXMucHJvcHNcblx0XHRQcm9taXNlLmFsbChbZGJSZXdhcmQuZ2V0UmV3YXJkcyhjaGlsZCksIGRiUmV3YXJkLmdldEdvYWxzKGNoaWxkKV0pXG5cdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdGxldCBbcmV3YXJkcywgZ29hbHNdPWFcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkcyxnb2Fsc30pXG5cdFx0XHR9KVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHRkYlJld2FyZC5yZW1vdmVMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uQ2hhbmdlKVxuXHR9XG5cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0bGV0IHtjaGlsZDpuZXdDaGlsZH09bmV4dFByb3BzLFxuXHRcdFx0e2NoaWxkfT10aGlzLnByb3BzXG5cdFx0aWYoY2hpbGQhPW5ld0NoaWxkKXtcblx0XHRcdFByb21pc2UuYWxsKFtkYlJld2FyZC5nZXRSZXdhcmRzKGNoaWxkKSwgZGJSZXdhcmQuZ2V0R29hbHMoY2hpbGQpXSlcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0bGV0IFtyZXdhcmRzLCBnb2Fsc109YVxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtnb2FscywgcmV3YXJkc309dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGVkaXRhYmxlLCBzdHlsZT17fX09dGhpcy5wcm9wc1xuXHRcdGxldCB0b3RhbD0wLCBtYXg9MCwgYWN0aW9uPW51bGwsIGJ1Zj03XG5cdFx0Z29hbHM9Z29hbHMgJiYgZ29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH1cblx0XHRcdFx0XHR0b3RhbD17bWF4PU1hdGgubWF4KG1heCxhLnRvdGFsKSwgYS50b3RhbH0vPilcblxuXHRcdHJld2FyZHM9cmV3YXJkcyAmJiByZXdhcmRzLm1hcChhPT48QVJld2FyZFxuXHRcdFx0XHRcdGtleT17YHJld2FyZF8ke3RvdGFsKz1hLmFtb3VudH1gfVxuXHRcdFx0XHRcdG9uUmVhc29uQ2hhbmdlPXtuZXdSZWFzb249PnRoaXMub25SZWFzb25DaGFuZ2UoYSxuZXdSZWFzb24pfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJlYXNvbj17YS5yZWFzb259XG5cdFx0XHRcdFx0YW1vdW50PXthLmFtb3VudH1cblx0XHRcdFx0XHR0b3RhbD17dG90YWx9Lz4pXG5cblx0XHRtYXg9TWF0aC5tYXgodG90YWwsbWF4KVxuXG5cdFx0aWYoZWRpdGFibGUpXG5cdFx0XHRhY3Rpb249KDxQZW5kaW5nR29hbCBib3R0b209eyhtYXgrYnVmKSpoZWlnaHR9IGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25QZW5kR29hbD17Z29hbD0+dGhpcy5wZW5kR29hbChnb2FsKX0vPilcblx0XHRlbHNlXG5cdFx0XHRhY3Rpb249KDxSZXdhcmRvciBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUmV3YXJkPXthbW91bnQ9PnRoaXMucmV3YXJkKGFtb3VudCl9Lz4pXG5cblx0XHRzdHlsZS5oZWlnaHQ9KG1heCtidWYpKmhlaWdodFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZHNcIiBzdHlsZT17c3R5bGV9PlxuXHRcdFx0XHR7Z29hbHN9XG5cblx0XHRcdFx0e3Jld2FyZHN9XG5cblx0XHRcdFx0e2FjdGlvbn1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBlbmRHb2FsKGdvYWwpe1xuXHRcdGRiUmV3YXJkLmFkZEdvYWwoZ29hbClcblx0fVxuXG5cdHJld2FyZChhbW91bnQpe1xuXHRcdGxldCBuZXdSZXdhcmQ9e2Ftb3VudH1cblx0XHRkYlJld2FyZC51cHNlcnQobmV3UmV3YXJkKVxuXHR9XG5cblx0b25SZWFzb25DaGFuZ2UocmV3YXJkLCBuZXdSZWFzb24pe1xuXHRcdHJld2FyZC5yZWFzb249bmV3UmVhc29uXG5cdFx0ZGJSZXdhcmQudXBzZXJ0KHJld2FyZClcblx0fVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRoZWlnaHQ6MjBcblx0fVxufVxuXG5jbGFzcyBQZW5kaW5nR29hbCBleHRlbmRzIEl0ZW17XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdG9uUGVuZEdvYWw6YT0+MVxuXHR9XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0cmV3YXJkOlwiXCIsXG5cdFx0XHR0b3RhbDpcIlwiXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2N1cnJlbnQsIGJvdHRvbX09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWwgcGVuZGluZ1wiIHN0eWxlPXt7Ym90dG9tfX0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHJlZj1cInJld2FyZFwiXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3Jld2FyZH1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInBlbmRpbmdSZXdhcmRcIlxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJOZXcgUmV3YXJkLi4uXCJcblx0XHRcdFx0XHRcdHN0eWxlPXt7dGV4dEFsaWduOlwicmlnaHRcIix3aWR0aDpcIjEwMCVcIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZyYXF1bzs8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3RvdGFsOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRyZWY9XCJnb2FsXCJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dG90YWx8fFwiXCJ9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17YEdvYWw6PiR7Y3VycmVudH1gfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjIuNWVtXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0dHJ5UGVuZChzdGF0ZSl7XG5cdFx0bGV0IHtyZXdhcmQ6bmV3UmV3YXJkLCB0b3RhbDpuZXdUb3RhbH09c3RhdGVcblx0XHRsZXQge2N1cnJlbnQsb25QZW5kR29hbH09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdGlmKG5ld1Jld2FyZClcblx0XHRcdHJld2FyZD1uZXdSZXdhcmRcblx0XHRpZihuZXdUb3RhbClcblx0XHRcdHRvdGFsPW5ld1RvdGFsXG5cdFx0aWYocmV3YXJkLnRyaW0oKSAmJiB0b3RhbC50cmltKCkpe1xuXHRcdFx0dG90YWw9cGFyc2VJbnQodG90YWwudHJpbSgpKVxuXHRcdFx0aWYodG90YWw+Y3VycmVudCl7XG5cdFx0XHRcdHJld2FyZD1yZXdhcmQudHJpbSgpXG5cdFx0XHRcdG9uUGVuZEdvYWwoe3Jld2FyZCx0b3RhbH0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdFVJLk1lc3NhZ2VyLnNob3coYG5ldyBnb2FsIG11c3QgZ3JlYXRlciB0aGFuIGN1cnJlbnQgdG90YWwgJHtjdXJyZW50fWApXG5cdFx0XHRcdHRoaXMucmVmcy5nb2FsLmdldERPTU5vZGUoKS5mb2N1cygpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe3Jld2FyZCx0b3RhbH0pXG5cdH1cbn1cblxuY2xhc3MgQUdvYWwgZXh0ZW5kcyBJdGVte1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3Jld2FyZCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQgc3R5bGU9e2ZvbnRTaXplOlwieC1zbWFsbFwiLCB3aGl0ZVNwYWNlOlwibm93cmFwXCIsYmFja2dyb3VuZENvbG9yOlwibGlnaHRncmVlblwifVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWxcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdj48QXZhdGFyIHN0eWxlPXtzdHlsZX0+e3Jld2FyZH08L0F2YXRhcj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXY+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgQVJld2FyZCBleHRlbmRzIEl0ZW17XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e25ld1JlYXNvbjpudWxsfVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpudWxsfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGxldCB7bmV3UmVhc29ufT10aGlzLnN0YXRlXG5cdFx0bGV0IHtyZWFzb259PXRoaXMucmVmc1xuXHRcdGlmKG5ld1JlYXNvbiAmJiByZWFzb24pXG5cdFx0XHRyZWFzb24uZ2V0RE9NTm9kZSgpLmZvY3VzKClcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmVhc29uLGFtb3VudCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQge25ld1JlYXNvbn09dGhpcy5zdGF0ZVxuXG5cdFx0aWYobmV3UmVhc29uKXtcblx0XHRcdHJlYXNvbj0oPFRleHRGaWVsZCByZWY9XCJyZWFzb25cIiBkZWZhdWx0VmFsdWU9e3JlYXNvbn1cblx0XHRcdFx0b25FbnRlcktleURvd249e2U9PmUudGFyZ2V0LmJsdXIoKX1cblx0XHRcdFx0b25CbHVyPXtlPT50aGlzLnJlYXNvbkNoYW5nZWQoZS50YXJnZXQudmFsdWUudHJpbSgpKX0vPilcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCIgb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnJlYXNvbnx8XCIgXCJ9KX0+XG5cdFx0XHRcdHtuZXdSZWFzb258fHJlYXNvbnx8XCIuLi5cIn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXY+K3thbW91bnR9L3t0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG5cblx0cmVhc29uQ2hhbmdlZChuZXdSZWFzb24pe1xuXHRcdGxldCB7cmVhc29uLCBvblJlYXNvbkNoYW5nZX09dGhpcy5wcm9wc1xuXHRcdGlmKCFuZXdSZWFzb24gfHwgbmV3UmVhc29uPT1yZWFzb24pe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnVuZGVmaW5lZH0pXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0b25SZWFzb25DaGFuZ2UgJiYgb25SZWFzb25DaGFuZ2UobmV3UmVhc29uKVxuXHR9XG59XG5cblxuaW1wb3J0IFJld2FyZEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9zb2NpYWwvbW9vZCdcbmNsYXNzIFJld2FyZG9yIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y3VycmVudDpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9uUmV3YXJkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0Y3VycmVudDowLFxuXHRcdG9uUmV3YXJkOiBhPT4xXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtwbHVzOjAsdGlja2VyOm51bGx9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGx1czowLHRpY2tlcjpudWxsfSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cGx1c309dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGN1cnJlbnR9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmQgcGVuZGluZ1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiPlxuXHRcdFx0XHRcdDxSZXdhcmRJY29uIGNsYXNzTmFtZT1cInJld2FyZGVyXCIgb25DbGljaz17ZT0+dGhpcy5wbHVzKCl9IC8+XG5cdFx0XHRcdFx0PHNwYW4+e2N1cnJlbnR9PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YHBsdXMgJHtwbHVzID8gXCJwbHVzaW5nXCIgOiBcIlwifWB9Pit7cGx1c3x8J3gnfTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRwbHVzKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHBsdXMrK1xuXHRcdHRpY2tlcj1zZXRUaW1lb3V0KHRoaXMucmV3YXJkLmJpbmQodGhpcyksMTAwMClcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzLHRpY2tlcn0pXG5cdH1cblxuXHRyZXdhcmQoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0dGhpcy5wcm9wcy5vblJld2FyZChwbHVzKVxuXHR9XG59XG4iXX0=